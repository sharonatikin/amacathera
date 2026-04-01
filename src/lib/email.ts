import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  replyto?: string,
): Promise<{ success: boolean }> {
  const { data, error } = await resend.emails.send({
    from: `No Reply <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
    ...(replyto && { replyTo: replyto }),
  });

  if (error) {
    console.error('Resend error:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }

  console.log('Email sent successfully:', data?.id);
  return { success: true };
}