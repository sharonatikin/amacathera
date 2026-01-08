import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/mongodb';
import Publication from '@/lib/models/Publication';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';
const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads', 'publications');

// Verify JWT token
function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
}

// Get token from request
function getTokenFromRequest(request: NextRequest): string | null {
  const token = request.cookies.get('adminToken')?.value;
  return token || null;
}

// Save PDF file
async function savePdfFile(file: File): Promise<{ fileName: string; filePath: string }> {
  try {
    // Create directory if it doesn't exist
    if (!existsSync(UPLOAD_DIR)) {
      await mkdir(UPLOAD_DIR, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
    const fileName = `${timestamp}_${originalName}`;
    const filePath = join(UPLOAD_DIR, fileName);

    // Read file as buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Write file
    await writeFile(filePath, buffer);

    return {
      fileName,
      filePath
    };
  } catch (error) {
    throw new Error(`Failed to save PDF file: ${error}`);
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized - No token provided' },
        { status: 401 }
      );
    }

    const decoded : any = verifyToken(token);
    if (!decoded || !decoded.id) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid token' },
        { status: 401 }
      );
    }

    await connectDB();

    // Parse form data
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const authorsString = formData.get('authors') as string;
    const journal = formData.get('journal') as string;
    const date = formData.get('date') as string;
    const category = formData.get('category') as string;
    const abstract = formData.get('abstract') as string;
    const pdfFile = formData.get('pdfFile') as File | null;

    // Validate required fields
    if (!title || !authorsString || !journal || !date || !abstract) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Parse authors
    const authors = authorsString
      .split(',')
      .map(author => author.trim())
      .filter(author => author.length > 0);

    if (authors.length === 0) {
      return NextResponse.json(
        { error: 'At least one author is required' },
        { status: 400 }
      );
    }

    // Handle PDF file upload
    let pdfUrl = null;
    let fileName = null;
    let fileSize = null;

    if (pdfFile && pdfFile.size > 0) {
      // Validate file type
      if (pdfFile.type !== 'application/pdf') {
        return NextResponse.json(
          { error: 'Only PDF files are allowed' },
          { status: 400 }
        );
      }

      // Validate file size (max 50MB)
      if (pdfFile.size > 50 * 1024 * 1024) {
        return NextResponse.json(
          { error: 'File size cannot exceed 50MB' },
          { status: 400 }
        );
      }

      try {
        const { fileName: savedFileName } = await savePdfFile(pdfFile);
        pdfUrl = `/uploads/publications/${savedFileName}`;
        fileName = pdfFile.name;
        fileSize = pdfFile.size;
      } catch (error) {
        return NextResponse.json(
          { error: `Failed to upload PDF: ${error}` },
          { status: 500 }
        );
      }
    }

    // Create publication document
    const publication = new Publication({
      title: title.trim(),
      authors,
      journal: journal.trim(),
      publicationDate: new Date(date),
      category,
      abstract: abstract.trim(),
      pdfUrl,
      fileName,
      fileSize,
      uploadedBy: decoded.id,
      isPublished: true
    });

    // Save to database
    await publication.save();

    return NextResponse.json(
      {
        success: true,
        message: 'Publication created successfully',
        data: {
          id: publication._id,
          title: publication.title,
          authors: publication.authors,
          journal: publication.journal,
          category: publication.category,
          pdfUrl: publication.pdfUrl
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Publication creation error:', error);
    return NextResponse.json(
      { error: `Internal server error: ${error}` },
      { status: 500 }
    );
  }
}

// GET - Fetch all publications with optional pagination
export async function GET(request: NextRequest) {
  try {
    console.log('Fetching publications...');
    await connectDB();

    // Get query parameters for pagination and filtering
    const searchParams = request.nextUrl.searchParams;
    const pageParam = searchParams.get('page');
    const limitParam = searchParams.get('limit');
    const searchParam = searchParams.get('search');

    // Check if pagination parameters are provided
    const hasPaginationParams = pageParam || limitParam;

    let query = Publication.find({ isPublished: true })
      .select('-uploadedBy')
      .sort({ createdAt: -1 });

    // Apply search filter if provided
    if (searchParam) {
      query = query.find({
        $or: [
          { title: { $regex: searchParam, $options: 'i' } },
          { category: { $regex: searchParam, $options: 'i' } },
          { authors: { $regex: searchParam, $options: 'i' } },
          { journal: { $regex: searchParam, $options: 'i' } }
        ]
      });
    }

    // If pagination parameters are provided, apply pagination
    if (hasPaginationParams) {
      const page = Math.max(1, parseInt(pageParam || '1'));
      const limit = Math.max(1, parseInt(limitParam || '10'));
      const skip = (page - 1) * limit;

      const publications = await query
        .skip(skip)
        .limit(limit)
        .lean();

      // Get total count for pagination metadata
      const total = await Publication.countDocuments({
        isPublished: true,
        ...(searchParam && {
          $or: [
            { title: { $regex: searchParam, $options: 'i' } },
            { category: { $regex: searchParam, $options: 'i' } },
            { authors: { $regex: searchParam, $options: 'i' } },
            { journal: { $regex: searchParam, $options: 'i' } }
          ]
        })
      });

      return NextResponse.json(
        {
          success: true,
          data: publications,
          pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit),
            hasNextPage: page < Math.ceil(total / limit),
            hasPreviousPage: page > 1
          }
        },
        { status: 200 }
      );
    }

    // If no pagination parameters, return all data
    const publications = await query.lean();

    return NextResponse.json(
      {
        success: true,
        data: publications,
        pagination: {
          total: publications.length,
          page: 1,
          limit: publications.length,
          pages: 1,
          hasNextPage: false,
          hasPreviousPage: false
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Fetch publications error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch publications' },
      { status: 500 }
    );
  }
}