import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { geminiAIService } from '@/lib/gemini-ai';

interface EssayRequest {
  essay: string;
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
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Parse request body
    const body: EssayRequest = await request.json();
    
    if (!body.essay || typeof body.essay !== 'string') {
      return NextResponse.json(
        { error: 'Essay text is required' },
        { status: 400 }
      );
    }

    if (body.essay.trim().length === 0) {
      return NextResponse.json(
        { error: 'Essay text cannot be empty' },
        { status: 400 }
      );
    }

    // Check essay length limits
    if (body.essay.length > 10000) {
      return NextResponse.json(
        { error: 'Essay is too long. Maximum 10,000 characters allowed.' },
        { status: 400 }
      );
    }

    if (body.essay.length < 100) {
      return NextResponse.json(
        { error: 'Essay is too short. Minimum 100 characters required for meaningful analysis.' },
        { status: 400 }
      );
    }

    // TODO: Check subscription status here
    // For now, allow all authenticated users

    // Analyze the essay using Gemini AI
    const result = await geminiAIService.analyzeEssay(body.essay);

    // TODO: Store essay in database for history
    // const { error: dbError } = await supabase
    //   .from('essays')
    //   .insert({
    //     user_id: user.id,
    //     original_text: body.essay,
    //     corrected_text: result.corrected_text,
    //     score: result.score,
    //     mistakes: result.mistakes,
    //     suggestions: result.suggestions
    //   });

    // if (dbError) {
    //   console.error('Error storing essay:', dbError);
    //   // Don't fail the request if storage fails
    // }

    return NextResponse.json(result);

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
