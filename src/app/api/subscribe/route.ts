import { NextRequest, NextResponse } from 'next/server';
import { isValidEmail, createSubscriber, checkRateLimit } from '@/lib/email';
import { addSubscriberToStorage, isEmailDuplicateInStorage } from '@/lib/vercel-storage';
import { SubscribeRequest, SubscribeResponse } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json({
        success: false,
        message: 'Too many subscription attempts. Please try again later.'
      } as SubscribeResponse, { status: 429 });
    }

    // Parse request body
    const body: SubscribeRequest = await request.json();
    const { email, source, preferences } = body;

    // Validate email
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({
        success: false,
        message: 'Please provide a valid email address.'
      } as SubscribeResponse, { status: 400 });
    }

    // Validate source
    if (!source || !['resources', 'timeline', 'manual'].includes(source)) {
      return NextResponse.json({
        success: false,
        message: 'Invalid subscription source.'
      } as SubscribeResponse, { status: 400 });
    }

    // Check for duplicates
    if (isEmailDuplicateInStorage(email)) {
      return NextResponse.json({
        success: false,
        message: 'This email is already subscribed to our newsletter.'
      } as SubscribeResponse, { status: 409 });
    }

    // Create new subscriber
    const subscriber = createSubscriber({ email, source, preferences });
    
    // Save to storage
    const success = addSubscriberToStorage(subscriber);
    
    if (!success) {
      return NextResponse.json({
        success: false,
        message: 'Failed to save subscription. Please try again.'
      } as SubscribeResponse, { status: 500 });
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to our newsletter!',
      subscriber
    } as SubscribeResponse, { status: 201 });

  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json({
      success: false,
      message: 'An error occurred while processing your subscription.'
    } as SubscribeResponse, { status: 500 });
  }
} 