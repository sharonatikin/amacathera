import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDB } from '@/lib/mongodb';
import ChartData from '@/lib/models/ChartData';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const unwrappedParams = await params;
    const chartDataId = unwrappedParams.id;

    if (!mongoose.Types.ObjectId.isValid(chartDataId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid chart data ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { time, requests, visitors } = body;

    const updateData: any = {};

    if (time !== undefined) updateData.time = time.trim();
    if (requests !== undefined) updateData.requests = Number(requests);
    if (visitors !== undefined) updateData.visitors = Number(visitors);

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, error: 'No fields to update' },
        { status: 400 }
      );
    }

    // If time is being updated, check if new time already exists
    if (updateData.time) {
      const existing = await ChartData.findOne({
        time: updateData.time,
        _id: { $ne: chartDataId }
      });

      if (existing) {
        return NextResponse.json(
          { success: false, error: 'Data point for this time already exists' },
          { status: 400 }
        );
      }
    }

    const updatedData = await ChartData.findByIdAndUpdate(
      chartDataId,
      updateData,
      { new: true, runValidators: true }
    ).lean();

    if (!updatedData) {
      return NextResponse.json(
        { success: false, error: 'Chart data not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Chart data updated successfully',
        data: updatedData
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating chart data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update chart data' },
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
    const chartDataId = unwrappedParams.id;

    if (!mongoose.Types.ObjectId.isValid(chartDataId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid chart data ID' },
        { status: 400 }
      );
    }

    const deletedData = await ChartData.findByIdAndDelete(chartDataId);

    if (!deletedData) {
      return NextResponse.json(
        { success: false, error: 'Chart data not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Chart data deleted successfully',
        data: deletedData
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting chart data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete chart data' },
      { status: 500 }
    );
  }
}
