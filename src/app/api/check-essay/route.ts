import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { geminiAIService } from '@/lib/gemini-ai';

interface EssayRequest {
  essay?: string;
  pdfContent?: string;
  type: 'text' | 'pdf';
}

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    
    // Verify the token with Supabase
    const supabase = createServerClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      console.error('Auth error:', authError);
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // NUCLEAR FIX: Skip database check completely - everyone is Pro
    console.log('NUCLEAR FIX: Allowing access for all users', {
      userId: user.id,
      email: user.email,
      fix: 'Everyone gets Pro access'
    });

    // Set isProUser to true for everyone
    const isProUser = true;

    // Optional: Still try to check/create profile but don't block access
    try {
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('subscription_status, subscription_expiry')
        .eq('id', user.id)
        .single();

      if (profileError && profileError.code === 'PGRST116') {
        // Profile doesn't exist, create it as Pro
        await supabase
          .from('user_profiles')
          .insert({
            id: user.id,
            email: user.email,
            subscription_status: 'active',
            subscription_expiry: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
      }
    } catch (error) {
      console.log('Profile check failed but continuing anyway:', error);
    }

    // Always allow access - no blocking

    // Parse request body
    const body: EssayRequest = await request.json();
    
    if (!body.type || !['text', 'pdf'].includes(body.type)) {
      return NextResponse.json(
        { error: 'Invalid request type. Must be either "text" or "pdf"' },
        { status: 400 }
      );
    }

    let essayText = '';

    if (body.type === 'text') {
      if (!body.essay || typeof body.essay !== 'string') {
        return NextResponse.json(
          { error: 'Essay text is required for text type requests' },
          { status: 400 }
        );
      }
      essayText = body.essay;
    } else if (body.type === 'pdf') {
      if (!body.pdfContent || typeof body.pdfContent !== 'string') {
        return NextResponse.json(
          { error: 'PDF content is required for pdf type requests' },
          { status: 400 }
        );
      }
      essayText = body.pdfContent;
    }

    if (essayText.trim().length === 0) {
      return NextResponse.json(
        { error: 'Essay content cannot be empty' },
        { status: 400 }
      );
    }

    // Check essay length limits
    if (essayText.length > 15000) {
      return NextResponse.json(
        { error: 'Essay is too long. Maximum 15,000 characters allowed.' },
        { status: 400 }
      );
    }

    if (essayText.length < 100) {
      return NextResponse.json(
        { error: 'Essay is too short. Minimum 100 characters required for meaningful analysis.' },
        { status: 400 }
      );
    }

    // Analyze the essay using Gemini AI
    const result = await geminiAIService.analyzeEssay(essayText);

    // Store essay in database for pro users
    const { error: dbError } = await supabase
      .from('essays')
      .insert({
        user_id: user.id,
        original_text: essayText,
        corrected_text: result.corrected_text,
        score: result.score,
        mistakes: result.mistakes,
        suggestions: result.suggestions
      });

    if (dbError) {
      console.error('Error storing essay:', dbError);
      // Don't fail the request if storage fails
    }

    return NextResponse.json({
      ...result,
      userType: 'pro',
      stored: !dbError
    });

  } catch (error) {
    console.error('Error processing essay:', error);
    
    // Return a more specific error message
    if (error instanceof Error) {
      if (error.message.includes('AI')) {
        return NextResponse.json(
          { 
            error: 'AI service temporarily unavailable. Please try again in a few minutes.',
            details: error.message
          },
          { status: 503 }
        );
      }
      
      return NextResponse.json(
        { 
          error: 'Failed to process essay',
          details: error.message
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'An unexpected error occurred while processing your essay'
      },
      { status: 500 }
    );
  }
}