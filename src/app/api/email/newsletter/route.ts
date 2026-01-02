import { NextRequest, NextResponse } from 'next/server';
import { emailService } from '../../../services/emailService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, language = 'EN' } = body;

    // Validate email
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Generate welcome email
    const welcomeTemplate = emailService.generateNewsletterWelcomeTemplate(email);

    // Check if email already exists (you'd implement this with your database)
    // For now, we'll just log it
    console.log('Newsletter subscription:', {
      email,
      language,
      welcomeTemplate: welcomeTemplate.substring(0, 100) + '...', // Log first 100 chars of template
      timestamp: new Date().toISOString()
    });

    // Here you would:
    // 1. Add email to your newsletter database/service
    // 2. Send welcome email
    // 3. Integrate with services like Mailchimp, ConvertKit, etc.

    /*
    // Example with Mailchimp
    const mailchimp = require('@mailchimp/mailchimp_marketing');
    mailchimp.setConfig({
      apiKey: process.env.MAILCHIMP_API_KEY,
      server: process.env.MAILCHIMP_SERVER_PREFIX,
    });

    await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        LANGUAGE: language
      }
    });
    */

    return NextResponse.json(
      { message: 'Successfully subscribed to newsletter' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}