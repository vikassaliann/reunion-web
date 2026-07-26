import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const {
      firstName = '',
      lastName = '',
      email = '',
      phone = '',
      location = '',
      propertyType = '',
      rooms = '',
      source = '',
      link = '',
      description = ''
    } = data;

    const emailSubject = `Partner With Us Request from ${firstName} ${lastName}`;
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #C9A84C;">
        <h2 style="color: #C9A84C; border-bottom: 1px solid #eee; padding-bottom: 10px;">Partner With Us Request — Reunion</h2>
        
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Last Name:</strong> ${lastName}</p>
        <p><strong>Email ID:</strong> ${email}</p>
        <p><strong>Mobile Phone:</strong> +91 ${phone}</p>
        <p><strong>Property Location:</strong> ${location}</p>
        <p><strong>Property Type:</strong> ${propertyType}</p>
        <p><strong>Room Count:</strong> ${rooms || 'Not specified'}</p>
        <p><strong>Referral Source:</strong> ${source}</p>
        <p><strong>Photos/Website Link:</strong> ${link ? `<a href="${link}">${link}</a>` : 'N/A'}</p>
        <p><strong>Property Description:</strong></p>
        <blockquote style="background: #f9f9f9; border-left: 3px solid #C9A84C; margin: 10px 0; padding: 10px;">
          ${description || 'No description provided'}
        </blockquote>
        <hr style="border: 0; border-top: 1px solid #eee; margin-top: 20px;" />
        <p style="font-size: 12px; color: #777;">Sent via Reunion Web Partner Inquiry Form</p>
      </div>
    `;

    // Configure Nodemailer transporter (environment variables or default fallback)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER || process.env.EMAIL_USER || 'reunionrevenue@gmail.com',
        pass: process.env.SMTP_PASS || process.env.EMAIL_PASS || '',
      },
    });

    // Send Mail (if credentials present) or log payload in dev
    if (process.env.SMTP_PASS || process.env.EMAIL_PASS) {
      await transporter.sendMail({
        from: `"Reunion Partner Form" <${process.env.SMTP_USER || 'reunionrevenue@gmail.com'}>`,
        to: process.env.PARTNER_EMAIL || 'reunionrevenue@gmail.com',
        subject: emailSubject,
        html: htmlContent,
      });
    } else {
      console.log('Partner Inquiry Received (Set SMTP_PASS in env to enable live delivery):', data);
    }

    return NextResponse.json({ success: true, message: 'Partner inquiry received successfully.' });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error sending partner email:', errMessage);
    return NextResponse.json({ success: false, error: errMessage }, { status: 500 });
  }
}
