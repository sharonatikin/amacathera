import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import News from '@/lib/models/News';
import mongoose from 'mongoose';
import { writeFile, mkdir, unlink } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Note: params is now a Promise
) {
  try {
    await connectDB();
    
    // Unwrap the params Promise
    const unwrappedParams = await params;
    const newsId = unwrappedParams.id;
    
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(newsId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid news ID' },
        { status: 400 }
      );
    }
    
    const news = await News.findById(newsId)
      .select('-uploadedBy')
      .lean();
    
    if (!news) {
      return NextResponse.json(
        { success: false, error: 'News not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: news
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    await connectDB();
    const unwrappedParams = await params;
    const newsId = unwrappedParams.id;
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(newsId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid news ID' },
        { status: 400 }
      );
    }

    const deletedNews = await News.findByIdAndDelete(newsId);

    if (!deletedNews) {
      return NextResponse.json(
        { success: false, error: 'News not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'News deleted successfully',
      data: deletedNews
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error deleting news:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete news' },
      { status: 500 }
    );
  }
}



const UPLOAD_DIR = join(process.cwd(), 'uploads', 'news');

// Save image file
async function saveImageFile(file: File): Promise<{ fileName: string }> {
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
    throw new Error(`Failed to save image file: ${error}`);
  }
}

// Delete old image file
async function deleteImageFile(fileName: string): Promise<void> {
  try {
    if (!fileName) return;

    const filePath = join(UPLOAD_DIR, fileName);
    if (existsSync(filePath)) {
      await unlink(filePath);
    }
  } catch (error) {
    console.error('Error deleting old image:', error);
    // Don't throw, just log the error
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const unwrappedParams = await params;
    const newsId = unwrappedParams.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(newsId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid news ID' },
        { status: 400 }
      );
    }

    // Fetch existing news first
    const existingNews = await News.findById(newsId);
    if (!existingNews) {
      return NextResponse.json(
        { success: false, error: 'News not found' },
        { status: 404 }
      );
    }

    // Parse form data to handle file uploads
    const formData = await request.formData();
    const mainHeading = formData.get('mainHeading') as string;
    const subHeading = formData.get('subHeading') as string;
    const date = formData.get('date') as string;
    const pressReleaseLink = formData.get('pressReleaseLink') as string;
    const videoUrl = formData.get('videoUrl') as string;
    const content = formData.get('content') as string;
    const isPublished = formData.get('isPublished');
    const uploadImage = formData.get('uploadImage') as File | null;

    const updateData: any = {};

    if (mainHeading !== null && mainHeading !== undefined) {
      updateData.mainHeading = mainHeading.trim();
    }
    if (subHeading !== null && subHeading !== undefined) {
      updateData.subHeading = subHeading.trim();
    }
    if (content !== null && content !== undefined) {
      updateData.content = content.trim();
    }
    if (pressReleaseLink !== null && pressReleaseLink !== undefined) {
      updateData.pressReleaseLink = pressReleaseLink.trim() || null;
    }
    if (videoUrl !== null && videoUrl !== undefined) {
      updateData.videoUrl = videoUrl.trim() || null;
    }
    if (date !== null && date !== undefined) {
      updateData.date = new Date(date);
    }
    if (isPublished !== null && isPublished !== undefined) {
      updateData.isPublished = isPublished == 'true' ? true : false;
    }

    // Handle image file upload
    if (uploadImage && uploadImage.size > 0) {
      // Validate file type
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validImageTypes.includes(uploadImage.type)) {
        return NextResponse.json(
          { success: false, error: 'Only image files (JPEG, PNG, GIF, WebP) are allowed' },
          { status: 400 }
        );
      }

      // Validate file size (max 10MB)
      if (uploadImage.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { success: false, error: 'Image file size cannot exceed 10MB' },
          { status: 400 }
        );
      }

      try {
        // Delete old image if it exists
        if (existingNews.imageUrl) {
          await deleteImageFile(existingNews.imageUrl);
        }

        // Save new image
        const { fileName } = await saveImageFile(uploadImage);
        updateData.imageUrl = fileName;
        updateData.fileName = uploadImage.name;
        updateData.fileSize = uploadImage.size;
      } catch (error) {
        return NextResponse.json(
          { success: false, error: `Failed to upload image: ${error}` },
          { status: 500 }
        );
      }
    }

    // Check if at least one field is provided
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, error: 'No fields to update provided' },
        { status: 400 }
      );
    }

    // Update the news document
    const updatedNews = await News.findByIdAndUpdate(
      newsId,
      updateData,
      { new: true, runValidators: true }
    ).lean();

    if (!updatedNews) {
      return NextResponse.json(
        { success: false, error: 'News not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: updatedNews,
        message: 'News updated successfully'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating news:', error);

    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        { success: false, error: 'Validation error: ' + error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update news' },
      { status: 500 }
    );
  }
}