export function getConfirmationEmail(name: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #003260 0%, #004a8f 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 28px;">Thank You, ${name}!</h1>
      </div>
      <div style="background: #f5f5f5; padding: 30px; border-radius: 0 0 8px 8px;">
        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          We've received your message and will get back to you as soon as possible.
        </p>
        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          Our team at AmacaThera is committed to providing fast and clear support.
        </p>
        <p style="font-size: 14px; color: #666; margin-top: 20px; border-top: 1px solid #ddd; padding-top: 20px;">
          Best regards,<br/>
          <strong>AmacaThera Team</strong>
        </p>
      </div>
    </div>
  `;
}

export function getAdminNotificationEmail(
  name: string,
  email: string,
  message: string
): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #003260;">New Contact Form Submission</h2>
      <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #003260; margin: 20px 0;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      </div>
      <p style="font-size: 12px; color: #666; margin-top: 20px;">
        This is an automated message from your contact form.
      </p>
    </div>
  `;
}