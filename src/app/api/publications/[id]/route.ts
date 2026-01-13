import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Publication from '@/lib/models/Publication';
import mongoose from 'mongoose';
import { writeFile, mkdir, unlink } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads', 'publications');

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

// Delete old PDF file
async function deletePdfFile(fileName: string): Promise<void> {
  try {
    if (!fileName) return;

    const filePath = join(UPLOAD_DIR, fileName);
    if (existsSync(filePath)) {
      await unlink(filePath);

    }
  } catch (error) {
    console.error('Error deleting old PDF:', error);
    // Don't throw, just log the error
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const unwrappedParams = await params;
    const publicationId = unwrappedParams.id;
    
    if (!mongoose.Types.ObjectId.isValid(publicationId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid publication ID' },
        { status: 400 }
      );
    }

    const publication = await Publication.findById(publicationId)
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
    const publicationId = unwrappedParams.id;
    
    if (!mongoose.Types.ObjectId.isValid(publicationId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid publication ID' },
        { status: 400 }
      );
    }

    // Fetch existing publication first
    const existingPublication = await Publication.findById(publicationId);
    if (!existingPublication) {
      return NextResponse.json(
        { success: false, error: 'Publication not found' },
        { status: 404 }
      );
    }

    // Parse form data to handle file uploads
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const authorsString = formData.get('authors') as string;
    const journal = formData.get('journal') as string;
    const date = formData.get('date') as string;
    const category = formData.get('category') as string;
    const abstract = formData.get('abstract') as string;
    const isPublished = formData.get('isPublished');
    const pdfFile = formData.get('pdfFile') as File | null;

    const updateData: any = {};

    if (title !== null && title !== undefined) {
      updateData.title = title.trim();
    }
    
    if (authorsString !== null && authorsString !== undefined) {
      const authors = authorsString
        .split(',')
        .map(author => author.trim())
        .filter(author => author.length > 0);
      if (authors.length > 0) {
        updateData.authors = authors;
      }
    }
    
    if (journal !== null && journal !== undefined) {
      updateData.journal = journal.trim();
    }
    
    if (date !== null && date !== undefined) {
      updateData.publicationDate = new Date(date);
    }
    
    if (category !== null && category !== undefined) {
      updateData.category = category;
    }
    
    if (abstract !== null && abstract !== undefined) {
      updateData.abstract = abstract.trim();
    }
    
    if (isPublished !== null && isPublished !== undefined) {
      updateData.isPublished = isPublished == 'true' ? true : false;
    }

    // Handle PDF file upload
    if (pdfFile && pdfFile.size > 0) {
      // Validate file type
      if (pdfFile.type !== 'application/pdf') {
        return NextResponse.json(
          { success: false, error: 'Only PDF files are allowed' },
          { status: 400 }
        );
      }

      // Validate file size (max 50MB)
      if (pdfFile.size > 50 * 1024 * 1024) {
        return NextResponse.json(
          { success: false, error: 'File size cannot exceed 50MB' },
          { status: 400 }
        );
      }

      try {
        // Delete old PDF if it exists
        if (existingPublication.fileName) {
          await deletePdfFile(existingPublication.fileName);
        }

        // Save new PDF
        const { fileName } = await savePdfFile(pdfFile);
        updateData.pdfUrl = `/uploads/publications/${fileName}`;
        updateData.fileName = fileName;
        updateData.fileSize = pdfFile.size;
      } catch (error) {
        return NextResponse.json(
          { success: false, error: `Failed to upload PDF: ${error}` },
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

    const updatedPublication = await Publication.findByIdAndUpdate(
      publicationId,
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
    const publicationId = unwrappedParams.id;
    
    if (!mongoose.Types.ObjectId.isValid(publicationId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid publication ID' },
        { status: 400 }
      );
    }

    // Fetch publication to get fileName before deleting
    const publication = await Publication.findById(publicationId);
    
    if (!publication) {
      return NextResponse.json(
        { success: false, error: 'Publication not found' },
        { status: 404 }
      );
    }

    // Delete PDF file if it exists
    if (publication.fileName) {
      await deletePdfFile(publication.fileName);
    }

    const deletedPublication = await Publication.findByIdAndDelete(publicationId);

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