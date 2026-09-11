import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // In production, forward to admin notification or sendgrid/resend
    console.log('[Contact Submission]', {
      name,
      email,
      subject: subject || 'General Inquiry',
      message,
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been received. Our team will get back to you within 24 hours.',
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or reach out via email directly.' },
      { status: 500 }
    );
  }
}
