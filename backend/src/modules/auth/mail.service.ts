import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  async sendPasswordResetEmail(
    to: string,
    name: string,
    resetUrl: string,
  ): Promise<void> {
    const from = process.env.MAIL_FROM ?? process.env.SMTP_USER ?? '';
    const subject = 'Reset your Career AI password';
    const html = `
      <div style="font-family:Arial, sans-serif; line-height:1.6; color:#111;">
        <h2 style="margin:0 0 12px;">Reset your password</h2>
        <p>Hi ${name},</p>
        <p>We received a request to reset your Career AI password.</p>
        <p>
          <a href="${resetUrl}" style="display:inline-block; padding:10px 16px; background:#111; color:#fff; text-decoration:none; border-radius:8px;">
            Reset Password
          </a>
        </p>
        <p>If the button does not work, copy and paste this link:</p>
        <p style="word-break:break-all;">${resetUrl}</p>
        <p>This link expires in 1 hour. If you did not request this, you can ignore this email.</p>
      </div>
    `;

    await this.transporter.sendMail({
      from,
      to,
      subject,
      html,
    });
  }
}
