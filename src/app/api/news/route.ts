import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/mongodb';
import News from '@/lib/models/News';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';
const UPLOAD_DIR = join(process.cwd(), 'public', 'images', 'news');

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

// Save image file
async function saveImageFile(file: File): Promise<{ fileName: string; filePath: string }> {
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
    throw new Error(`Failed to save image file: ${error}`);
  }
}

// Extract YouTube video ID
function extractYouTubeId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
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
    const mainHeading = formData.get('mainHeading') as string;
    const subHeading = formData.get('subHeading') as string;
    const date = formData.get('date') as string;
    const pressReleaseLink = formData.get('pressReleaseLink') as string;
    const videoUrl = formData.get('videoUrl') as string;
    const content = formData.get('content') as string;
    const uploadImage = formData.get('uploadImage') as File | null;

    // Validate required fields
    if (!mainHeading || !subHeading || !date || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: mainHeading, subHeading, date, content' },
        { status: 400 }
      );
    }
    
    // Handle image file upload
    let imageUrl = null;
    let fileName = null;
    let fileSize = null;

    if (uploadImage && uploadImage.size > 0) {
      // Validate file type
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validImageTypes.includes(uploadImage.type)) {
        return NextResponse.json(
          { error: 'Only image files (JPEG, PNG, GIF, WebP) are allowed' },
          { status: 400 }
        );
      }

      // Validate file size (max 10MB for images)
      if (uploadImage.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { error: 'Image file size cannot exceed 10MB' },
          { status: 400 }
        );
      }

      try {
        const { fileName: savedFileName } = await saveImageFile(uploadImage);
        imageUrl = savedFileName;
        fileName = uploadImage.name;
        fileSize = uploadImage.size;
      } catch (error) {
        return NextResponse.json(
          { error: `Failed to upload image: ${error}` },
          { status: 500 }
        );
      }
    }

    // Create news document
    const news = new News({
      mainHeading: mainHeading.trim(),
      subHeading: subHeading.trim(),
      date: new Date(date),
      pressReleaseLink: pressReleaseLink.trim() || null,
      imageUrl,
      fileName,
      fileSize,
      videoUrl: videoUrl.trim() || null,
      content: content.trim(),
      uploadedBy: decoded.id,
      isPublished: true
    });

    // Save to database
    await news.save();

    return NextResponse.json(
      {
        success: true,
        message: 'News created successfully',
        data: {
          id: news._id,
          mainHeading: news.mainHeading,
          subHeading: news.subHeading,
          date: news.date,
          imageUrl: news.imageUrl,
          videoUrl: news.videoUrl
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('News creation error:', error);
    return NextResponse.json(
      { error: `Internal server error: ${error}` },
      { status: 500 }
    );
  }
}

// GET - Fetch all news
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Get query parameters for pagination and filtering
    const searchParams = request.nextUrl.searchParams;
    const pageParam = searchParams.get('page');
    const limitParam = searchParams.get('limit');
    const searchParam = searchParams.get('search');

    // Check if pagination parameters are provided
    const hasPaginationParams = pageParam || limitParam;

    let query = News.find({ isPublished: true }).select('-uploadedBy').sort({ date: -1 });

    // Apply search filter if provided
    if (searchParam) {
      query = query.find({
        $or: [
          { title: { $regex: searchParam, $options: 'i' } },
          { content: { $regex: searchParam, $options: 'i' } },
          { description: { $regex: searchParam, $options: 'i' } }
        ]
      });
    }

    // If pagination parameters are provided, apply pagination
    if (hasPaginationParams) {
      const page = Math.max(1, parseInt(pageParam || '1'));
      const limit = Math.max(1, parseInt(limitParam || '10'));
      const skip = (page - 1) * limit;

      const newsList = await query
        .skip(skip)
        .limit(limit)
        .lean();

      // Get total count for pagination metadata
      const total = await News.countDocuments({
        isPublished: true,
        ...(searchParam && {
          $or: [
            { title: { $regex: searchParam, $options: 'i' } },
            { content: { $regex: searchParam, $options: 'i' } },
            { description: { $regex: searchParam, $options: 'i' } }
          ]
        })
      });

      return NextResponse.json(
        {
          success: true,
          data: newsList,
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
    const newsList = await query.lean();

    return NextResponse.json(
      {
        success: true,
        data: newsList,
        pagination: {
          total: newsList.length,
          page: 1,
          limit: newsList.length,
          pages: 1,
          hasNextPage: false,
          hasPreviousPage: false
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Fetch news error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}

// GET by ID - Fetch single news
export async function GET_BY_ID(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    const news = await News.findById(params.id)
      .select('-uploadedBy')
      .lean();

    if (!news) {
      return NextResponse.json(
        { error: 'News not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: news
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Fetch news error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}