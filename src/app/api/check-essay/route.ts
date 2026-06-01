import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

const SYSTEM_PROMPT = `You are an expert CSS (Central Superior Services Pakistan) exam evaluator with years of experience grading essays.

Analyze the submitted essay and return ONLY valid JSON with this exact structure (no markdown, no code blocks, just raw JSON):

{
  "score": number (0-100),
  "grade": string (A/A-/B+/B/B-/C+/C/D),
  "summary": string (2-3 sentences summarizing overall performance),
  "contentScore": number (0-35),
  "structureScore": number (0-30),
  "languageScore": number (0-25),
  "strengths": [string, string, string] (3 specific strengths),
  "improvements": [string, string, string] (3 specific areas to improve),
  "contentFeedback": [string, string, string] (3 bullet points on content quality),
  "structureFeedback": [string, string, string] (3 bullet points on structure),
  "languageFeedback": [string, string, string] (3 bullet points on language),
  "examinerNotes": [string, string] (2-3 CSS-specific examiner observations),
  "paragraphFeedback": [
    { "preview": string (first 50 chars), "rating": number (1-10), "note": string (brief feedback) }
  ]
}

Evaluation criteria:
- Content (35 marks): Argument strength, evidence quality, depth of analysis, relevance to CSS
- Structure (30 marks): Introduction clarity, logical flow, paragraph transitions, conclusion strength
- Language (25 marks): Grammar, vocabulary, sentence variety, formal tone
- CSS-specific: Policy recommendations, current affairs awareness, balanced argumentation

Be constructive but honest. Provide specific, actionable feedback.`;

export async function POST(request: NextRequest) {
  try {
    const { essay, topic } = await request.json();

    if (!essay || essay.trim().length < 50) {
      return NextResponse.json(
        { error: 'Essay must be at least 50 characters long' },
        { status: 400 }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const userMessage = topic
      ? `Topic: ${topic}\n\nEssay:\n${essay}`
      : `Essay:\n${essay}`;

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: userMessage,
        },
      ],
    });

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
    
    // Clean up response - remove markdown code blocks if present
    let cleanedResponse = responseText.trim();
    if (cleanedResponse.startsWith('```json')) {
      cleanedResponse = cleanedResponse.replace(/```json\n?/g, '').replace(/```\n?$/g, '');
    } else if (cleanedResponse.startsWith('```')) {
      cleanedResponse = cleanedResponse.replace(/```\n?/g, '').replace(/```\n?$/g, '');
    }

    const feedback = JSON.parse(cleanedResponse);

    return NextResponse.json(feedback);
  } catch (error) {
    console.error('Error analyzing essay:', error);
    return NextResponse.json(
      { error: 'Failed to analyze essay. Please try again.' },
      { status: 500 }
    );
  }
}
