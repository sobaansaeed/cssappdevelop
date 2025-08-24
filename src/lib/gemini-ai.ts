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
      score: Math.round(score),
      evaluation: this.createDefaultEvaluation(),
      totalMarks: Math.round(score),
      isOutlineOnly: false,
      examinerRemarks: this.createDefaultRemarks()
    };
  }
}

export const geminiAIService = new GeminiAIService();
