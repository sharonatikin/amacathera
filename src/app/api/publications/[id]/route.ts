import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Publication from '@/lib/models/Publication';
import mongoose from 'mongoose';
import { writeFile, mkdir, unlink } from 'fs/promises';
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

// Delete PDF file
async function deletePdfFile(fileName: string): Promise<void> {
  try {
    if (!fileName) return;

    const filePath = join(UPLOAD_DIR, fileName);
    if (existsSync(filePath)) {
      await unlink(filePath);
    }
  } catch (error) {
    console.error('Error deleting PDF file:', error);
    // Don't throw, just log the error
  }
}

// Validate URL format
function isValidUrl(urlString: string): boolean {
  if (!urlString || urlString.trim() === '') return true; // Allow empty strings
  try {
    new URL(urlString);
    return true;
  } catch (_) {
    return false;
  }
}

// GET - Fetch single publication by ID
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

    const publication = await Publication.findById(publicationId).lean();

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

// DELETE - Delete publication by ID
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

    const publication = await Publication.findById(publicationId);

    if (!publication) {
      return NextResponse.json(
        { success: false, error: 'Publication not found' },
        { status: 404 }
      );
    }

    // Delete associated PDF file if exists
    if (publication.fileName) {
      await deletePdfFile(publication.fileName);
    }

    // Delete from database
    await Publication.findByIdAndDelete(publicationId);

    return NextResponse.json({
      success: true,
      message: 'Publication deleted successfully'
    }, { status: 200 });

  } catch (error) {
    console.error('Error deleting publication:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete publication' },
      { status: 500 }
    );
  }
}

// PATCH - Update publication by ID
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

    const existingPublication = await Publication.findById(publicationId);

    if (!existingPublication) {
      return NextResponse.json(
        { success: false, error: 'Publication not found' },
        { status: 404 }
      );
    }

    const formData = await request.formData();
    const title = formData.get('title') as string;
    const authors = formData.get('authors') as string;
    const journal = formData.get('journal') as string;
    const date = formData.get('date') as string;
    const category = formData.get('category') as string;
    const abstract = formData.get('abstract') as string;
    const abstractUrl = formData.get('abstractUrl') as string;
    const isPublished = formData.get('isPublished') as string;
    const pdfRemoved = formData.get('pdfRemoved') === 'true';
    const pdfFile = formData.get('pdfFile') as File | null;

    const updateData: any = {};

    // Update fields if provided
    if (title !== null && title !== undefined) {
      updateData.title = title.trim();
    }
    if (authors !== null && authors !== undefined) {
      updateData.authors = authors.trim().split(',').map(a => a.trim());
    }
    if (journal !== null && journal !== undefined) {
      updateData.journal = journal.trim();
    }
    if (date !== null && date !== undefined) {
      updateData.publicationDate = new Date(date);
    }
    if (category !== null && category !== undefined) {
      updateData.category = category.trim();
    }
    if (abstract !== null && abstract !== undefined) {
      updateData.abstract = abstract.trim();
    }

    // Handle abstractUrl - IMPORTANT: Check if it's explicitly provided
    if (abstractUrl !== null && abstractUrl !== undefined) {
      const trimmedUrl = abstractUrl.trim();
      if (!isValidUrl(trimmedUrl)) {
        return NextResponse.json(
          { success: false, error: 'Invalid abstract URL format' },
          { status: 400 }
        );
      }
      // Set to null if empty, otherwise set the URL
      updateData.abstractUrl = trimmedUrl === '' ? null : trimmedUrl;
      console.log('Updated abstractUrl:', updateData.abstractUrl); // Debug log
    }

    if (isPublished !== null && isPublished !== undefined) {
      updateData.isPublished = isPublished === 'true' ? true : false;
    }

    // Handle PDF removal
    if (pdfRemoved && !pdfFile) {
      if (existingPublication.fileName) {
        await deletePdfFile(existingPublication.fileName);
      }
      updateData.fileName = null;
      updateData.fileSize = null;
      updateData.pdfUrl = null;
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
          { success: false, error: 'PDF file size cannot exceed 50MB' },
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

    console.log('Update data being sent to DB:', updateData); // Debug log

    // Get the document first
    let publication = await Publication.findById(publicationId);
    
    if (!publication) {
      return NextResponse.json(
        { success: false, error: 'Publication not found' },
        { status: 404 }
      );
    }

    // Update fields directly on the document
    Object.assign(publication, updateData);

    // Explicitly set abstractUrl if it was provided (in case field doesn't exist)
    if (abstractUrl !== null && abstractUrl !== undefined) {
      publication.abstractUrl = updateData.abstractUrl;
    }

    // Save the document
    const updatedPublication = await publication.save();

    console.log('Updated publication from DB:', updatedPublication); // Debug log
    console.log('AbstractUrl in updated publication:', updatedPublication.abstractUrl); // Debug log

    // Convert to plain object for response
    const response = updatedPublication.toObject();

    return NextResponse.json(
      {
        success: true,
        data: response,
        message: 'Publication updated successfully'
      },
      { status: 200 }
    );
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