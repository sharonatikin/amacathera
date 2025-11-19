import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Contact } from '@/lib/models/Contact';
import { sendEmail } from '@/lib/email';
import { getConfirmationEmail, getAdminNotificationEmail } from '@/lib/emailTemplates';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (name.length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectDB();

    // Save to database
    const contact = new Contact({ name, email, message });
    await contact.save();

    // Send confirmation email to user
    await sendEmail(
      email,
      'We Received Your Message - AmacaThera',
      getConfirmationEmail(name)
    );

    // Send notification email to admin
    await sendEmail(
      process.env.ADMIN_EMAIL!,
      `New Contact Form Submission from ${name}`,
      getAdminNotificationEmail(name, email, message)
    );

    return NextResponse.json(
      { success: true, message: 'Your message has been sent successfully!' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again.' },
      { status: 500 }
    );
  }
}