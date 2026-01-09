import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Admin from '@/lib/models/Admin';
import Publication from '@/lib/models/Publication';
import News from '@/lib/models/News';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const totalAdmins = await Admin.countDocuments();
    const totalPublications = await Publication.countDocuments({ isPublished: true });
    const totalNews = await News.countDocuments({ isPublished: true });

    return NextResponse.json({
      success: true,
      data: {
        totalAdmins,
        totalPublications,
        totalNews
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}