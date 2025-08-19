import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY!);

export interface EssayAnalysisResult {
  corrected_text: string;
  mistakes: Array<{
    original: string;
    correction: string;
    explanation: string;
  }>;
  suggestions: string[];
  score: number;
}

export class GeminiAIService {
  private model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  async analyzeEssay(essay: string): Promise<EssayAnalysisResult> {
    try {
      const prompt = this.buildPrompt(essay);
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return this.parseGeminiResponse(text, essay);
    } catch (error) {
      console.error('Gemini AI Error:', error);
      throw new Error('Failed to analyze essay with AI');
    }
  }

  private buildPrompt(essay: string): string {
    return `You are an expert CSS (Central Superior Services) exam essay evaluator. Analyze the following essay and provide detailed feedback.

ESSAY TO ANALYZE:
${essay}

Please provide your analysis in the following JSON format ONLY (no other text):

{
  "corrected_text": "The corrected version of the essay with proper grammar, spelling, and structure",
  "mistakes": [
    {
      "original": "incorrect text",
      "correction": "corrected text", 
      "explanation": "Brief explanation of the mistake and why it's wrong"
    }
  ],
  "suggestions": [
    "Specific suggestion for improvement 1",
    "Specific suggestion for improvement 2",
    "Specific suggestion for improvement 3"
  ],
  "score": 85
}

IMPORTANT GUIDELINES:
1. Score should be 0-100 based on: grammar (25%), structure (25%), content quality (25%), CSS exam relevance (25%)
2. Focus on CSS exam writing standards
3. Provide specific, actionable feedback
4. Corrected text should maintain the original meaning while fixing errors
5. Mistakes should include common CSS exam writing errors
6. Suggestions should be practical and specific
7. Return ONLY valid JSON, no markdown or additional text

ANALYZE NOW:`;
  }

  private parseGeminiResponse(response: string, originalEssay: string): EssayAnalysisResult {
    try {
      // Clean the response to extract JSON
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format from AI');
      }

      const parsed = JSON.parse(jsonMatch[0]);
      
      // Validate the response structure
      if (!this.isValidAnalysisResult(parsed)) {
        throw new Error('Invalid analysis result structure');
      }

      return {
        corrected_text: parsed.corrected_text || originalEssay,
        mistakes: parsed.mistakes || [],
        suggestions: parsed.suggestions || [],
        score: Math.max(0, Math.min(100, parsed.score || 70))
      };
    } catch (error) {
      console.error('Error parsing Gemini response:', error);
      
      // Fallback to basic analysis if parsing fails
      return this.createFallbackAnalysis(originalEssay);
    }
  }

  private isValidAnalysisResult(result: EssayAnalysisResult): boolean {
    return (
      typeof result === 'object' &&
      result !== null &&
      Array.isArray(result.mistakes) &&
      Array.isArray(result.suggestions) &&
      typeof result.score === 'number'
    );
  }

  private createFallbackAnalysis(essay: string): EssayAnalysisResult {
    // Basic fallback analysis if AI fails
    const words = essay.split(' ');
    const score = Math.max(50, Math.min(90, 70 + (words.length / 10)));
    
    return {
      corrected_text: essay,
      mistakes: [
        {
          original: 'Sample',
          correction: 'Sample',
          explanation: 'AI analysis temporarily unavailable. Please try again.'
        }
      ],
      suggestions: [
        'Ensure your essay has a clear introduction, body, and conclusion',
        'Use topic sentences for each paragraph',
        'Include specific examples to support your arguments',
        'Maintain consistent formatting and structure'
      ],
      score: Math.round(score)
    };
  }
}

export const geminiAIService = new GeminiAIService();
