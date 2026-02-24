import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params; // await params

    const filePath = path.join(process.cwd(), 'uploads', 'news', filename);

    console.log('Looking for file at:', filePath);

    if (!fs.existsSync(filePath)) {
      console.log('File not found:', filePath);
      return new NextResponse('Not found', { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    const ext = path.extname(filename).toLowerCase();

    const mimeTypes: Record<string, string> = {
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.webp': 'image/webp',
      '.gif': 'image/gif',
    };

    const contentType = mimeTypes[ext] ?? 'application/octet-stream';

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    console.error('Image serve error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}