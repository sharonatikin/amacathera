import nodemailer from 'nodemailer';

function createTransporter() {
  return nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 2525,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    connectionTimeout: 10000,  // 10s to establish connection
    greetingTimeout: 10000,    // 10s to receive SMTP greeting
    socketTimeout: 15000,      // 15s of inactivity before timeout
    logger: process.env.NODE_ENV === 'development', // logs SMTP dialogue in dev
    debug: process.env.NODE_ENV === 'development',
  });
}

export async function verifyEmailConnection(): Promise<boolean> {
  const transporter = createTransporter();
  try {
    await transporter.verify();
    console.log('SMTP connection verified successfully');
    return true;
  } catch (error) {
    console.error('SMTP verification failed:', error);
    return false;
  } finally {
    transporter.close();
  }
}

export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  replyto?: string,
  retries = 2,
): Promise<{ success: boolean }> {
  const transporter = createTransporter();

  // Verify connection before attempting to send
  try {
    await transporter.verify();
  } catch (verifyError: any) {
    transporter.close();
    console.error('SMTP connection failed during verify:', {
      message: verifyError?.message,
      code: verifyError?.code,
      command: verifyError?.command,
    });
    throw new Error(`SMTP connection failed: ${verifyError?.message}`);
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const info = await transporter.sendMail({
        from: `"No Reply" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html,
        ...(replyto && { replyTo: replyto }),
      });

      console.log(`Email sent (attempt ${attempt}):`, {
        messageId: info.messageId,
        accepted: info.accepted,
        rejected: info.rejected,
        response: info.response,
      });

      // Check if actually accepted by server
      if (info.rejected && info.rejected.length > 0) {
        throw new Error(`Recipient rejected by server: ${info.rejected.join(', ')}`);
      }

      transporter.close();
      return { success: true };
    } catch (error: any) {
      console.error(`Email attempt ${attempt} failed:`, {
        message: error?.message,
        code: error?.code,       // e.g. ECONNREFUSED, ETIMEDOUT
        command: error?.command, // which SMTP command failed
        response: error?.response,
        responseCode: error?.responseCode,
      });

      if (attempt === retries) {
        transporter.close();
        throw new Error(`Failed to send email after ${retries} attempts: ${error?.message}`);
      }

      // Wait 2s before retrying
      await new Promise((res) => setTimeout(res, 2000));
    }
  }

  transporter.close();
  throw new Error('Unexpected error in sendEmail');
}