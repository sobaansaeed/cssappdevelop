import { NextResponse } from 'next/server';
import { geminiAIService } from '@/lib/gemini-ai';

export async function GET() {
  try {
    // Check environment variables
    const hasGoogleKey = !!process.env.GOOGLE_AI_API_KEY;
    const hasAIKey = !!process.env.AI_API_KEY;
    const googleKeyLength = process.env.GOOGLE_AI_API_KEY?.length || 0;
    const aiKeyLength = process.env.AI_API_KEY?.length || 0;

    console.log('AI API Key Check:', {
      hasGoogleKey,
      hasAIKey,
      googleKeyLength,
      aiKeyLength
    });

    // Test with a simple essay
    const testEssay = "This is a test essay about education. Education is very important for society. It helps people develop skills and knowledge. In conclusion, education is essential for progress.";
    
    const result = await geminiAIService.analyzeEssay(testEssay);
    
    return NextResponse.json({
      success: true,
      environment: {
        hasGoogleKey,
        hasAIKey,
        googleKeyLength,
        aiKeyLength
      },
      testResult: {
        score: result.score,
        totalMarks: result.totalMarks,
        isUsingFallback: result.mistakes[0]?.explanation?.includes('unavailable') || false,
        mistakeCount: result.mistakes.length,
        suggestionCount: result.suggestions.length
      },
      message: result.mistakes[0]?.explanation?.includes('unavailable') 
        ? 'Using fallback analysis - AI service unavailable'
        : 'AI service working correctly'
    });

  } catch (error) {
    console.error('AI Test Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      environment: {
        hasGoogleKey: !!process.env.GOOGLE_AI_API_KEY,
        hasAIKey: !!process.env.AI_API_KEY,
        googleKeyLength: process.env.GOOGLE_AI_API_KEY?.length || 0,
        aiKeyLength: process.env.AI_API_KEY?.length || 0
      }
    }, { status: 500 });
  }
}
