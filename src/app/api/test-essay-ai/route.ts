import { NextResponse } from 'next/server';
import { geminiAIService } from '@/lib/gemini-ai';

export async function GET() {
  try {
    console.log('=== TESTING AI ESSAY ANALYSIS ===');
    
    // Test with a simple essay
    const testEssay = `Introduction
    Education is the cornerstone of societal development and individual growth. In today's rapidly evolving world, the importance of quality education cannot be overstated. This essay examines the role of education in modern society.
    
    Body Paragraph 1
    Education serves as the foundation for economic development. Countries with higher literacy rates tend to have stronger economies. For example, South Korea's investment in education has led to remarkable economic growth.
    
    Body Paragraph 2
    Furthermore, education promotes social equality by providing opportunities for all individuals regardless of their background. It breaks the cycle of poverty and enables social mobility.
    
    Conclusion
    In conclusion, education remains the most powerful tool for personal and societal transformation. Governments must prioritize educational investments for sustainable development.`;
    
    console.log('Test essay word count:', testEssay.split(' ').length);
    
    const result = await geminiAIService.analyzeEssay(testEssay);
    
    return NextResponse.json({
      success: true,
      testData: {
        essayWordCount: testEssay.split(' ').length,
        hasOutline: testEssay.toLowerCase().includes('outline'),
        hasIntroduction: testEssay.toLowerCase().includes('introduction'),
        hasConclusion: testEssay.toLowerCase().includes('conclusion')
      },
      result: {
        score: result.score,
        totalMarks: result.totalMarks,
        evaluation: result.evaluation,
        isOutlineOnly: result.isOutlineOnly,
        mistakeCount: result.mistakes.length,
        suggestionCount: result.suggestions.length
      },
      analysis: {
        source: result.mistakes.length === 0 ? 'LIKELY_FALLBACK' : 'LIKELY_AI',
        outlineScore: result.evaluation.outline.score,
        thesisScore: result.evaluation.thesisStatement.score,
        contentScore: result.evaluation.content.score
      }
    });

  } catch (error) {
    console.error('Test AI Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      environment: {
        hasGoogleKey: !!process.env.GOOGLE_AI_API_KEY,
        hasAIKey: !!process.env.AI_API_KEY,
        nodeEnv: process.env.NODE_ENV
      }
    }, { status: 500 });
  }
}
