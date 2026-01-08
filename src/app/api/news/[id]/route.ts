import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import News from '@/lib/models/News';
import mongoose from 'mongoose';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Note: params is now a Promise
) {
  try {
    await connectDB();
    
    // Unwrap the params Promise
    const unwrappedParams = await params;
    const newsId = unwrappedParams.id;
    
    console.log('Fetching news with ID:', newsId);
    
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
    
    const body = await request.json();
    const { mainHeading, subHeading, content, imageUrl, isPublished, date } = body;
    
    // Validate required fields for update
    const updateData: any = {};
    
    if (mainHeading !== undefined) updateData.mainHeading = mainHeading;
    if (subHeading !== undefined) updateData.subHeading = subHeading;
    if (content !== undefined) updateData.content = content;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
    if (date !== undefined) updateData.date = date;
    if (typeof isPublished === 'boolean') updateData.isPublished = isPublished;
    
    // Check if at least one field is provided
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, error: 'No fields to update provided' },
        { status: 400 }
      );
    }
    
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
    
    return NextResponse.json({
      success: true,
      data: updatedNews,
      message: 'News updated successfully'
    }, { status: 200 });
    
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