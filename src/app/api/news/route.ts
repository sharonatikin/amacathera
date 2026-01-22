import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Publication from '@/lib/models/Publication';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const UPLOAD_DIR = join(process.cwd(), 'public', 'pdfs', 'publications');

// Save PDF file
async function savePdfFile(file: File): Promise<{ fileName: string }> {
  try {
    if (!existsSync(UPLOAD_DIR)) {
      await mkdir(UPLOAD_DIR, { recursive: true });
    }

    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
    const fileName = `${timestamp}_${originalName}`;
    const filePath = join(UPLOAD_DIR, fileName);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await writeFile(filePath, buffer);

    return { fileName };
  } catch (error) {
    throw new Error(`Failed to save PDF file: ${error}`);
  }
}

// Validate URL format
function isValidUrl(urlString: string): boolean {
  try {
    new URL(urlString);
    return true;
  } catch (_) {
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const formData = await request.formData();
    const title = formData.get('title') as string;
    const authors = formData.get('authors') as string;
    const journal = formData.get('journal') as string;
    const date = formData.get('date') as string;
    const category = formData.get('category') as string;
    const abstract = formData.get('abstract') as string;
    const abstractUrl = formData.get('abstractUrl') as string;
    const pdfFile = formData.get('pdfFile') as File | null;

    // Validate required fields
    if (!title || !authors || !journal || !date || !abstract) {
      return NextResponse.json(
        { error: 'Missing required fields: title, authors, journal, date, abstract' },
        { status: 400 }
      );
    }

    // Validate abstract URL if provided
    if (abstractUrl && abstractUrl.trim()) {
      if (!isValidUrl(abstractUrl)) {
        return NextResponse.json(
          { error: 'Invalid abstract URL format' },
          { status: 400 }
        );
      }
    }

    // Handle PDF file upload
    let pdfFileName = null;
    let pdfFileSize = null;

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
          { error: 'PDF file size cannot exceed 50MB' },
          { status: 400 }
        );
      }

      try {
        const { fileName } = await savePdfFile(pdfFile);
        pdfFileName = fileName;
        pdfFileSize = pdfFile.size;
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
      authors: authors.trim(),
      journal: journal.trim(),
      category: category || 'AmacaGel Platform',
      abstract: abstract.trim(),
      abstractUrl: abstractUrl.trim() || null,
      pdfFileName,
      pdfFileSize,
      publicationDate: new Date(date),
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
          publicationDate: publication.publicationDate,
          abstractUrl: publication.abstractUrl
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

// GET - Fetch all publications with pagination and search
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const pageParam = searchParams.get('page');
    const limitParam = searchParams.get('limit');
    const searchParam = searchParams.get('search');

    const page = Math.max(1, parseInt(pageParam || '1'));
    const limit = Math.max(1, parseInt(limitParam || '10'));
    const skip = (page - 1) * limit;

    // Build search query
    let searchQuery: any = { isPublished: true };

    if (searchParam) {
      searchQuery = {
        isPublished: true,
        $or: [
          { title: { $regex: searchParam, $options: 'i' } },
          { authors: { $regex: searchParam, $options: 'i' } },
          { category: { $regex: searchParam, $options: 'i' } },
          { journal: { $regex: searchParam, $options: 'i' } },
          { abstract: { $regex: searchParam, $options: 'i' } }
        ]
      };
    }

    // Fetch publications with pagination
    const publications = await Publication.find(searchQuery)
      .select('-pdfFileName')
      .sort({ publicationDate: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination metadata
    const total = await Publication.countDocuments(searchQuery);

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
  } catch (error) {
    console.error('Fetch publications error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch publications' },
      { status: 500 }
    );
  }
}