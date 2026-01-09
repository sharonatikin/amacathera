import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import ChartData from '@/lib/models/ChartData';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const data = await ChartData.find()
      .sort({ createdAt: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      data
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching chart data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch chart data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { time, requests, visitors } = body;

    // Validation
    if (!time || requests === undefined || visitors === undefined) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: time, requests, visitors' },
        { status: 400 }
      );
    }

    if (isNaN(Number(requests)) || isNaN(Number(visitors))) {
      return NextResponse.json(
        { success: false, error: 'Requests and visitors must be valid numbers' },
        { status: 400 }
      );
    }

    // Check if time already exists
    const existing = await ChartData.findOne({ time });
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Data point for this time already exists' },
        { status: 400 }
      );
    }

    const chartData = new ChartData({
      time: time.trim(),
      requests: Number(requests),
      visitors: Number(visitors)
    });

    await chartData.save();

    return NextResponse.json(
      {
        success: true,
        message: 'Chart data created successfully',
        data: chartData
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating chart data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create chart data' },
      { status: 500 }
    );
  }
}

