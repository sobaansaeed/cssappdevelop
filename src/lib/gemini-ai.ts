import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || process.env.AI_API_KEY!);

export interface EssayAnalysisResult {
  corrected_text: string;
  mistakes: Array<{
    original: string;
    correction: string;
    explanation: string;
  }>;
  suggestions: string[];
  score: number;
  // New CSS exam specific fields
  evaluation: {
    thesisStatement: { score: number; comment: string };
    outline: { score: number; comment: string };
    structure: { score: number; comment: string };
    content: { score: number; comment: string };
    language: { score: number; comment: string };
    criticalThinking: { score: number; comment: string };
    conclusion: { score: number; comment: string };
    wordCount: { score: number; comment: string };
  };
  totalMarks: number;
  isOutlineOnly: boolean;
  examinerRemarks: {
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
  };
}

// Interface for parsed AI response
interface ParsedAIResponse {
  corrected_text?: string;
  mistakes?: Array<{
    original: string;
    correction: string;
    explanation: string;
  }>;
  suggestions?: string[];
  score?: number;
  evaluation?: {
    thesisStatement: { score: number; comment: string };
    outline: { score: number; comment: string };
    structure: { score: number; comment: string };
    content: { score: number; comment: string };
    language: { score: number; comment: string };
    criticalThinking: { score: number; comment: string };
    conclusion: { score: number; comment: string };
    wordCount: { score: number; comment: string };
  };
  totalMarks?: number;
  isOutlineOnly?: boolean;
  examinerRemarks?: {
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
  };
}

export class GeminiAIService {
  private model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  async analyzeEssay(essay: string): Promise<EssayAnalysisResult> {
    try {
      // Check if API key is available
      if (!process.env.GOOGLE_AI_API_KEY && !process.env.AI_API_KEY) {
        console.error('Gemini AI API key not found. Using fallback analysis.');
        return this.createFallbackAnalysis(essay);
      }

      const prompt = this.buildPrompt(essay);
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return this.parseGeminiResponse(text, essay);
    } catch (error) {
      console.error('Gemini AI Error:', error);
      
      // Check for specific error types
      if (error instanceof Error) {
        if (error.message.includes('API_KEY') || error.message.includes('authentication')) {
          console.error('API key issue detected. Using fallback analysis.');
          return this.createFallbackAnalysis(essay);
        }
        
        if (error.message.includes('quota') || error.message.includes('limit')) {
          console.error('Rate limit/quota exceeded. Using fallback analysis.');
          return this.createFallbackAnalysis(essay);
        }
        
        if (error.message.includes('network') || error.message.includes('fetch')) {
          console.error('Network issue detected. Using fallback analysis.');
          return this.createFallbackAnalysis(essay);
        }
      }
      
      // For any other errors, use fallback instead of throwing
      console.error('Unknown Gemini AI error. Using fallback analysis.');
      return this.createFallbackAnalysis(essay);
    }
  }

  private buildPrompt(essay: string): string {
    return `You are an expert CSS (Central Superior Services) exam essay evaluator. Analyze the following essay according to the official CSS exam evaluation criteria.

ESSAY TO ANALYZE:
${essay}

EVALUATION CRITERIA:
1. Thesis Statement & Topic Understanding (10 marks)
2. Outline: Clarity, Logic, and Direction (10 marks)
3. Structure & Coherence (15 marks)
4. Content Depth, Balance & Relevance (20 marks)
5. Language Proficiency & Expression (15 marks)
6. Critical Thinking & Analytical Reasoning (5 marks)
7. Conclusion (10 marks)
8. Word Count & Length Control (15 marks)

SPECIAL RULE: If the submission contains only an outline without a full essay body, evaluate ONLY Section 2 (Outline Quality) out of 10 marks. All other sections = 0 marks.

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
  "score": 85,
  "evaluation": {
    "thesisStatement": { "score": 8, "comment": "Clear and focused thesis statement" },
    "outline": { "score": 9, "comment": "Well-structured outline with logical flow" },
    "structure": { "score": 13, "comment": "Good paragraph organization and coherence" },
    "content": { "score": 17, "comment": "Relevant content with good depth" },
    "language": { "score": 13, "comment": "Good language proficiency with minor errors" },
    "criticalThinking": { "score": 4, "comment": "Demonstrates analytical reasoning" },
    "conclusion": { "score": 8, "comment": "Effective conclusion that ties ideas together" },
    "wordCount": { "score": 13, "comment": "Appropriate length for the topic" }
  },
  "totalMarks": 85,
  "isOutlineOnly": false,
  "examinerRemarks": {
    "strengths": ["Clear argument structure", "Good use of examples", "Logical flow"],
    "weaknesses": ["Some grammatical errors", "Could use more specific evidence"],
    "suggestions": ["Proofread for grammar", "Include more concrete examples", "Strengthen conclusion"]
  }
}

IMPORTANT GUIDELINES:
1. Score each section according to the marks allocation above
2. If it's outline-only: set isOutlineOnly=true, score only outline section, others=0, totalMarks=outline score
3. Focus on CSS exam writing standards and requirements
4. Provide specific, actionable feedback for each section
5. Corrected text should maintain the original meaning while fixing errors
6. Mistakes should include common CSS exam writing errors
7. Return ONLY valid JSON, no markdown or additional text
8. Word count should be appropriate for CSS exam essays (typically 1000-1500 words)

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

      // Handle outline-only submissions
      if (parsed.isOutlineOnly) {
        return this.createOutlineOnlyAnalysis(parsed, originalEssay);
      }

      return {
        corrected_text: parsed.corrected_text || originalEssay,
        mistakes: parsed.mistakes || [],
        suggestions: parsed.suggestions || [],
        score: parsed.totalMarks || parsed.score || 70,
        evaluation: parsed.evaluation || this.createDefaultEvaluation(),
        totalMarks: parsed.totalMarks || parsed.score || 70,
        isOutlineOnly: parsed.isOutlineOnly || false,
        examinerRemarks: parsed.examinerRemarks || this.createDefaultRemarks()
      };
    } catch (error) {
      console.error('Error parsing Gemini response:', error);
      
      // Fallback to basic analysis if parsing fails
      return this.createFallbackAnalysis(originalEssay);
    }
  }

  private createOutlineOnlyAnalysis(parsed: ParsedAIResponse, originalEssay: string): EssayAnalysisResult {
    const outlineScore = parsed.evaluation?.outline?.score || 5;
    
    return {
      corrected_text: originalEssay,
      mistakes: parsed.mistakes || [],
      suggestions: parsed.suggestions || [],
      score: outlineScore,
      evaluation: {
        thesisStatement: { score: 0, comment: "Not applicable for outline-only submission" },
        outline: { score: outlineScore, comment: parsed.evaluation?.outline?.comment || "Outline evaluation" },
        structure: { score: 0, comment: "Not applicable for outline-only submission" },
        content: { score: 0, comment: "Not applicable for outline-only submission" },
        language: { score: 0, comment: "Not applicable for outline-only submission" },
        criticalThinking: { score: 0, comment: "Not applicable for outline-only submission" },
        conclusion: { score: 0, comment: "Not applicable for outline-only submission" },
        wordCount: { score: 0, comment: "Not applicable for outline-only submission" }
      },
      totalMarks: outlineScore,
      isOutlineOnly: true,
      examinerRemarks: {
        strengths: parsed.examinerRemarks?.strengths || ["Outline structure"],
        weaknesses: ["Outline without essay body is an incomplete attempt"],
        suggestions: ["Complete the essay with full body paragraphs", "In FPSC exam, such an attempt is considered a failure"]
      }
    };
  }

  private createDefaultEvaluation() {
    return {
      thesisStatement: { score: 7, comment: "Standard thesis statement" },
      outline: { score: 7, comment: "Basic outline structure" },
      structure: { score: 10, comment: "Standard essay structure" },
      content: { score: 14, comment: "Adequate content coverage" },
      language: { score: 11, comment: "Acceptable language use" },
      criticalThinking: { score: 3, comment: "Basic analytical thinking" },
      conclusion: { score: 7, comment: "Standard conclusion" },
      wordCount: { score: 11, comment: "Appropriate length" }
    };
  }

  private createDefaultRemarks() {
    return {
      strengths: ["Clear structure", "Relevant content"],
      weaknesses: ["Could improve language", "More examples needed"],
      suggestions: ["Enhance vocabulary", "Add specific examples", "Strengthen arguments"]
    };
  }

  private isValidAnalysisResult(result: ParsedAIResponse): boolean {
    return (
      typeof result === 'object' &&
      result !== null &&
      Array.isArray(result.mistakes) &&
      Array.isArray(result.suggestions) &&
      typeof result.score === 'number'
    );
  }

  private createFallbackAnalysis(essay: string): EssayAnalysisResult {
    // Enhanced fallback analysis if AI fails
    const words = essay.split(' ').filter(word => word.length > 0);
    const wordCount = words.length;
    const sentences = essay.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const paragraphs = essay.split('\n\n').filter(p => p.trim().length > 0);
    
    // Calculate a basic score based on essay structure
    let baseScore = 60;
    
    // Word count scoring
    if (wordCount >= 800) baseScore += 10;
    else if (wordCount >= 500) baseScore += 5;
    else if (wordCount < 200) baseScore -= 10;
    
    // Paragraph structure
    if (paragraphs.length >= 4) baseScore += 5;
    else if (paragraphs.length < 3) baseScore -= 5;
    
    // Basic checks
    const hasIntroduction = essay.toLowerCase().includes('introduction') || 
                           paragraphs[0]?.length > 100;
    const hasConclusion = essay.toLowerCase().includes('conclusion') || 
                         essay.toLowerCase().includes('to conclude') ||
                         paragraphs[paragraphs.length - 1]?.length > 50;
    
    if (hasIntroduction) baseScore += 5;
    if (hasConclusion) baseScore += 5;
    
    const finalScore = Math.max(40, Math.min(85, baseScore));
    
    return {
      corrected_text: essay,
      mistakes: [
        {
          original: 'Note',
          correction: 'Note',
          explanation: '⚠️ AI analysis is temporarily unavailable. This is a basic structural analysis. Please try again later for detailed AI feedback.'
        }
      ],
      suggestions: [
        'Ensure your essay has a clear thesis statement in the introduction',
        'Use topic sentences to begin each body paragraph',
        'Include specific examples and evidence to support your arguments',
        'Maintain logical flow between paragraphs with transition words',
        'Write a strong conclusion that summarizes your main points',
        `Current word count: ${wordCount} words (recommended: 800-1200 for CSS essays)`
      ],
      score: Math.round(finalScore),
      evaluation: {
        thesisStatement: { score: Math.round(finalScore * 0.15), comment: 'Basic structural analysis - AI unavailable' },
        outline: { score: Math.round(finalScore * 0.1), comment: 'Please try again for detailed AI feedback' },
        structure: { score: Math.round(finalScore * 0.2), comment: `${paragraphs.length} paragraphs detected` },
        content: { score: Math.round(finalScore * 0.25), comment: 'Content analysis requires AI service' },
        language: { score: Math.round(finalScore * 0.15), comment: 'Language analysis requires AI service' },
        criticalThinking: { score: Math.round(finalScore * 0.1), comment: 'Critical thinking analysis requires AI service' },
        conclusion: { score: Math.round(finalScore * 0.05), comment: hasConclusion ? 'Conclusion detected' : 'No clear conclusion found' },
        wordCount: { score: wordCount >= 800 ? 10 : wordCount >= 500 ? 7 : 5, comment: `${wordCount} words` }
      },
      totalMarks: Math.round(finalScore),
      isOutlineOnly: wordCount < 100,
      examinerRemarks: {
        strengths: [
          hasIntroduction ? 'Clear introduction structure' : '',
          hasConclusion ? 'Conclusion present' : '',
          wordCount >= 500 ? 'Adequate length' : ''
        ].filter(Boolean),
        weaknesses: [
          '⚠️ Detailed AI analysis unavailable',
          wordCount < 500 ? 'Essay length could be improved' : '',
          paragraphs.length < 3 ? 'More paragraph structure needed' : ''
        ].filter(Boolean),
        suggestions: [
          'Try again later for detailed AI-powered analysis',
          'Focus on clear paragraph structure and transitions',
          'Ensure strong thesis statement and conclusion'
        ]
      }
    };
  }
}

export const geminiAIService = new GeminiAIService();
