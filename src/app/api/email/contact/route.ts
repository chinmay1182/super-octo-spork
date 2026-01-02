import { NextRequest, NextResponse } from 'next/server';
import { emailService } from '../../../services/emailService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, companyEmail, companyName, projectDescription } = body;

    // Validate required fields
    if (!fullName || !companyEmail || !companyName || !projectDescription) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(companyEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Generate email template
    const emailTemplate = emailService.generateContactEmailTemplate({
      fullName,
      companyEmail,
      companyName,
      projectDescription
    });

    // Send email (you'll need to implement actual email sending)
    // For now, we'll just log it and return success
    console.log('Contact form submission:', {
      fullName,
      companyEmail,
      companyName,
      projectDescription,
      emailTemplate: emailTemplate.substring(0, 100) + '...', // Log first 100 chars of template
      timestamp: new Date().toISOString()
    });

    // Here you would integrate with your email service (SendGrid, AWS SES, etc.)
    // Example with SendGrid:
    /*
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    const msg = {
      to: 'contact@omodigital.com',
      from: 'noreply@omodigital.com',
      subject: `New Contact Form Submission from ${fullName}`,
      html: emailTemplate,
    };
    
    await sgMail.send(msg);
    */

    return NextResponse.json(
      { message: 'Contact form submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}