import nodemailer from 'nodemailer';

export async function sendEmail(
  to: string,
  subject: string,
  html: string
) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error('Email error:', error);
    throw new Error('Failed to send email');
  }
}