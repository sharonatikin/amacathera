import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Publication from '@/lib/models/Publication';
import mongoose from 'mongoose';

export async function GET(
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
        { success: false, error: 'Invalid publication ID' },
        { status: 400 }
      );
    }

    const publication = await Publication.findById(newsId)
      .select('-uploadedBy')
      .lean();

    if (!publication) {
      return NextResponse.json(
        { success: false, error: 'Publication not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: publication
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching publication:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch publication' },
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
        { success: false, error: 'Invalid publication ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { title, authors, journal, date, category, abstract, isPublished } = body;

    // Validate required fields for update
    const updateData: any = {};

    if (title !== undefined) updateData.title = title;
    if (authors !== undefined) updateData.authors = authors;
    if (journal !== undefined) updateData.journal = journal;
    if (date !== undefined) updateData.date = date;
    if (category !== undefined) updateData.category = category;
    if (abstract !== undefined) updateData.abstract = abstract;
    if (typeof isPublished === 'boolean') updateData.isPublished = isPublished;

    // Check if at least one field is provided
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, error: 'No fields to update provided' },
        { status: 400 }
      );
    }

    const updatedPublication = await Publication.findByIdAndUpdate(
      newsId,
      updateData,
      { new: true, runValidators: true }
    ).lean();

    if (!updatedPublication) {
      return NextResponse.json(
        { success: false, error: 'Publication not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedPublication,
      message: 'Publication updated successfully'
    }, { status: 200 });

  } catch (error) {
    console.error('Error updating publication:', error);

    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        { success: false, error: 'Validation error: ' + error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update publication' },
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
        { success: false, error: 'Invalid publication ID' },
        { status: 400 }
      );
    }

    const deletedPublication = await Publication.findByIdAndDelete(newsId);

    if (!deletedPublication) {
      return NextResponse.json(
        { success: false, error: 'Publication not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Publication deleted successfully',
      data: deletedPublication
    }, { status: 200 });

  } catch (error) {
    console.error('Error deleting publication:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete publication' },
      { status: 500 }
    );
  }
}