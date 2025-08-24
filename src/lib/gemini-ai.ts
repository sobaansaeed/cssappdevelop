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
    console.log('=== STARTING ESSAY ANALYSIS ===');
    console.log('Essay word count:', essay.split(' ').length);
    console.log('API Key available:', !!(process.env.GOOGLE_AI_API_KEY || process.env.AI_API_KEY));
    
    try {
      // Check if API key is available
      if (!process.env.GOOGLE_AI_API_KEY && !process.env.AI_API_KEY) {
        console.error('❌ Gemini AI API key not found. Using fallback analysis.');
        return this.createFallbackAnalysis(essay);
      }

      const prompt = this.buildPrompt(essay);
      console.log('✅ Prompt built, sending to Gemini AI...');
      console.log('Prompt length:', prompt.length);
      
      // Add retry logic
      let lastError: Error | null = null;
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          console.log(`🔄 Attempt ${attempt}/3 to contact Gemini AI...`);
          
          const result = await this.model.generateContent(prompt);
          const response = await result.response;
          const text = response.text();
          
          if (text && text.trim().length > 0) {
            console.log('✅ AI Response received on attempt', attempt);
            console.log('Response length:', text.length);
            console.log('Response preview:', text.substring(0, 200));
            
            const parsedResult = this.parseGeminiResponse(text, essay);
            
            // Log the analysis result for debugging
            console.log('✅ Analysis completed successfully:', {
              totalMarks: parsedResult.totalMarks,
              outlineScore: parsedResult.evaluation.outline.score,
              isOutlineOnly: parsedResult.isOutlineOnly,
              thesisScore: parsedResult.evaluation.thesisStatement.score,
              contentScore: parsedResult.evaluation.content.score,
              source: 'AI_ANALYSIS',
              attempt: attempt
            });
            
            return parsedResult;
          } else {
            throw new Error('Empty response from AI');
          }
          
        } catch (attemptError) {
          lastError = attemptError instanceof Error ? attemptError : new Error('Unknown error');
          console.warn(`⚠️ Attempt ${attempt}/3 failed:`, lastError.message);
          
          if (attempt < 3) {
            // Wait before retry
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
          }
        }
      }
      
      // If all attempts failed, throw the last error
      throw lastError || new Error('All AI attempts failed');
    } catch (error) {
      console.error('❌ Gemini AI Error:', error);
      console.error('Error type:', error?.constructor?.name);
      console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
      
      // Check for specific error types
      if (error instanceof Error) {
        if (error.message.includes('API_KEY') || error.message.includes('authentication')) {
          console.error('❌ API key issue detected. Using fallback analysis.');
          return this.createFallbackAnalysis(essay);
        }
        
        if (error.message.includes('quota') || error.message.includes('limit')) {
          console.error('❌ Rate limit/quota exceeded. Using fallback analysis.');
          return this.createFallbackAnalysis(essay);
        }
        
        if (error.message.includes('network') || error.message.includes('fetch')) {
          console.error('❌ Network issue detected. Using fallback analysis.');
          return this.createFallbackAnalysis(essay);
        }
        
        if (error.message.includes('safety') || error.message.includes('blocked')) {
          console.error('❌ Content safety issue detected. Using fallback analysis.');
          return this.createFallbackAnalysis(essay);
        }
      }
      
      // For any other errors, use fallback instead of throwing
      console.error('❌ Unknown Gemini AI error. Using fallback analysis.');
      const fallbackResult = this.createFallbackAnalysis(essay);
      console.log('📋 Fallback analysis result:', {
        totalMarks: fallbackResult.totalMarks,
        outlineScore: fallbackResult.evaluation.outline.score,
        source: 'FALLBACK_ANALYSIS'
      });
      return fallbackResult;
    }
  }

  private buildPrompt(essay: string): string {
    return `You are a Senior CSS Essay Examiner (FPSC Pakistan). Evaluate strictly according to FPSC standards.

INSTRUCTIONS:
1. Check if essay has an explicit outline (labeled "Outline" or numbered sections before introduction)
2. If NO outline signals → outline score = 0
3. Be extremely strict with scoring (most essays score below 50)
4. Count words and penalize short essays heavily

MARKING SCHEME (Total = 100):
- Thesis & Topic Understanding: 10 marks
- Outline Quality: 10 marks (0 if no outline present)
- Structure & Coherence: 15 marks  
- Content Depth & Relevance: 20 marks
- Language Proficiency: 15 marks
- Critical Thinking: 5 marks
- Conclusion: 10 marks
- Word Count Control: 15 marks (0 if under 800 words)

ESSAY TO ANALYZE:
${essay}

Return ONLY this JSON format:
{
  "corrected_text": "essay with minor corrections",
  "mistakes": [{"original": "text", "correction": "fixed", "explanation": "reason"}],
  "suggestions": ["suggestion 1", "suggestion 2"],
  "score": 35,
  "evaluation": {
    "thesisStatement": {"score": 4, "comment": "weak thesis"},
    "outline": {"score": 0, "comment": "no outline present"},
    "structure": {"score": 8, "comment": "basic structure"},
    "content": {"score": 10, "comment": "shallow content"},
    "language": {"score": 7, "comment": "adequate language"},
    "criticalThinking": {"score": 2, "comment": "limited analysis"},
    "conclusion": {"score": 4, "comment": "weak conclusion"},
    "wordCount": {"score": 0, "comment": "too short"}
  },
  "totalMarks": 35,
  "isOutlineOnly": false,
  "examinerRemarks": {
    "strengths": ["basic structure"],
    "weaknesses": ["no outline", "too short", "weak analysis"],
    "suggestions": ["add outline", "expand content", "improve analysis"]
  }
}`;
  }

  private parseGeminiResponse(response: string, originalEssay: string): EssayAnalysisResult {
    try {
      console.log('Raw AI response:', response.substring(0, 500) + '...');
      
      // Clean the response to extract JSON
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error('No JSON found in AI response');
        throw new Error('Invalid response format from AI');
      }

      const parsed = JSON.parse(jsonMatch[0]);
      console.log('Parsed AI response:', JSON.stringify(parsed, null, 2));
      
      // Validate the response structure
      if (!this.isValidAnalysisResult(parsed)) {
        console.error('Invalid analysis result structure:', parsed);
        throw new Error('Invalid analysis result structure');
      }

      // Handle outline-only submissions
      if (parsed.isOutlineOnly) {
        console.log('Detected outline-only submission');
        return this.createOutlineOnlyAnalysis(parsed, originalEssay);
      }

      const result = {
        corrected_text: parsed.corrected_text || originalEssay,
        mistakes: parsed.mistakes || [],
        suggestions: parsed.suggestions || [],
        score: parsed.totalMarks || parsed.score || 70,
        evaluation: parsed.evaluation || this.createDefaultEvaluation(),
        totalMarks: parsed.totalMarks || parsed.score || 70,
        isOutlineOnly: parsed.isOutlineOnly || false,
        examinerRemarks: parsed.examinerRemarks || this.createDefaultRemarks()
      };
      
      console.log('Successfully parsed AI response with total marks:', result.totalMarks);
      return result;
    } catch (error) {
      console.error('Error parsing Gemini response:', error);
      console.error('Response that caused error:', response);
      
      // Fallback to basic analysis if parsing fails
      console.log('Using fallback analysis due to parsing error');
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
    const isValid = (
      typeof result === 'object' &&
      result !== null &&
      Array.isArray(result.mistakes) &&
      Array.isArray(result.suggestions) &&
      (typeof result.score === 'number' || typeof result.totalMarks === 'number') &&
      result.evaluation &&
      typeof result.evaluation === 'object'
    );
    
    if (!isValid) {
      console.error('❌ Invalid analysis result structure:', {
        hasObject: typeof result === 'object' && result !== null,
        hasMistakes: Array.isArray(result.mistakes),
        hasSuggestions: Array.isArray(result.suggestions),
        hasScore: typeof result.score === 'number' || typeof result.totalMarks === 'number',
        hasEvaluation: result.evaluation && typeof result.evaluation === 'object'
      });
    }
    
    return isValid;
  }

  private createFallbackAnalysis(essay: string): EssayAnalysisResult {
    console.log('🔄 Creating fallback analysis (AI failed to respond)');
    
    // Simple but variable content analysis
    const words = essay.split(' ').filter(word => word.length > 0);
    const wordCount = words.length;
    const paragraphs = essay.split('\n\n').filter(p => p.trim().length > 10);
    const essayLower = essay.toLowerCase();
    
    // Create unique hash-based variation to ensure different results
    const essayHash = this.simpleHash(essay);
    const variationFactor = (essayHash % 100) / 100; // 0-1 variation factor
    
    // Enhanced outline detection
    const hasExplicitOutline = essayLower.includes('outline') || 
                              /^[ivxlcdm]+\./i.test(essay) || 
                              /^\d+\./i.test(essay) ||
                              /^[a-z]\./i.test(essay);
    
    // Content analysis with variation
    const hasIntroduction = essayLower.includes('introduction') || paragraphs[0]?.length > 100;
    const hasConclusion = essayLower.includes('conclusion') || paragraphs[paragraphs.length - 1]?.length > 50;
    const hasExamples = essayLower.includes('example') || essayLower.includes('instance');
    const hasAnalysis = essayLower.includes('analysis') || essayLower.includes('discuss');
    const hasEvidence = essayLower.includes('evidence') || essayLower.includes('research');
    
    // Variable scoring based on content AND hash variation
    const baseThesis = hasIntroduction ? 6 : 2;
    const thesisScore = Math.round(baseThesis + (variationFactor * 3)); // 2-9 range
    
    const outlineScore = hasExplicitOutline ? Math.round(4 + (variationFactor * 6)) : 0; // 0 or 4-10
    
    const baseStructure = paragraphs.length >= 4 ? 8 : paragraphs.length >= 2 ? 5 : 2;
    const structureScore = Math.round(baseStructure + (variationFactor * 7)); // Variable based on content
    
    const baseContent = hasExamples ? 12 : hasEvidence ? 10 : 6;
    const contentScore = Math.round(baseContent + (variationFactor * 8)); // Highly variable
    
    const baseLanguage = 6;
    const languageScore = Math.round(baseLanguage + (variationFactor * 9)); // 6-15 range
    
    const baseCritical = hasAnalysis ? 3 : 1;
    const criticalThinkingScore = Math.round(baseCritical + (variationFactor * 2)); // 1-5 range
    
    const baseConclusion = hasConclusion ? 6 : 2;
    const conclusionScore = Math.round(baseConclusion + (variationFactor * 4)); // 2-10 range
    
    // Word count scoring (strict)
    let wordCountScore = 0;
    if (wordCount < 800) {
      wordCountScore = 0;
    } else if (wordCount >= 2500) {
      wordCountScore = 15;
    } else if (wordCount >= 1500) {
      wordCountScore = 12;
    } else if (wordCount >= 1000) {
      wordCountScore = 8;
    } else {
      wordCountScore = 5;
    }
    
    const totalMarks = thesisScore + outlineScore + structureScore + contentScore + 
                      languageScore + criticalThinkingScore + conclusionScore + wordCountScore;
    
    console.log('📊 Fallback analysis scores:', {
      thesis: thesisScore,
      outline: outlineScore,
      structure: structureScore,
      content: contentScore,
      language: languageScore,
      critical: criticalThinkingScore,
      conclusion: conclusionScore,
      wordCount: wordCountScore,
      total: totalMarks,
      variation: Math.round(variationFactor * 100) + '%'
    });
    
    return {
      corrected_text: essay,
      mistakes: [
        {
          original: "AI analysis unavailable",
          correction: "Using fallback analysis",
          explanation: "The AI service is currently unavailable. This is a basic analysis."
        }
      ],
      suggestions: [
        'Ensure your essay has a clear thesis statement',
        'Include specific examples to support your arguments',
        'Use proper paragraph structure with transitions',
        'Write a strong conclusion',
        `Current word count: ${wordCount} words (CSS requires 2500-3000 words)`
      ],
      score: totalMarks,
      evaluation: {
        thesisStatement: { 
          score: thesisScore, 
          comment: hasIntroduction ? 'Thesis structure present' : 'No clear thesis statement' 
        },
        outline: { 
          score: outlineScore, 
          comment: hasExplicitOutline ? 'Outline structure detected' : 'No outline present' 
        },
        structure: { 
          score: structureScore, 
          comment: `${paragraphs.length} paragraphs detected` 
        },
        content: { 
          score: contentScore, 
          comment: hasExamples ? 'Some examples present' : 'Content needs more depth' 
        },
        language: { 
          score: languageScore, 
          comment: 'Language proficiency varies' 
        },
        criticalThinking: { 
          score: criticalThinkingScore, 
          comment: hasAnalysis ? 'Some analytical content' : 'Limited critical analysis' 
        },
        conclusion: { 
          score: conclusionScore, 
          comment: hasConclusion ? 'Conclusion present' : 'No clear conclusion' 
        },
        wordCount: { 
          score: wordCountScore, 
          comment: wordCount < 800 ? `${wordCount} words - too short for CSS` : `${wordCount} words` 
        }
      },
      totalMarks: totalMarks,
      isOutlineOnly: hasExplicitOutline && wordCount < 300,
      examinerRemarks: {
        strengths: [
          hasIntroduction ? 'Introduction present' : '',
          hasConclusion ? 'Conclusion present' : '',
          hasExplicitOutline ? 'Outline detected' : '',
          hasExamples ? 'Examples included' : '',
          hasAnalysis ? 'Analytical content' : ''
        ].filter(Boolean),
        weaknesses: [
          wordCount < 800 ? 'Too short for CSS standards' : '',
          !hasIntroduction ? 'Missing introduction' : '',
          !hasConclusion ? 'Missing conclusion' : '',
          !hasExamples ? 'Lacks specific examples' : '',
          !hasAnalysis ? 'Limited analysis' : '',
          'AI analysis unavailable - using basic evaluation'
        ].filter(Boolean),
        suggestions: [
          'Aim for 2500-3000 words for CSS exam',
          'Include clear thesis statement',
          'Add specific examples and evidence',
          'Improve paragraph structure and transitions',
          'Develop stronger analytical arguments'
        ]
      }
    };
  }
  
  private simpleHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }
}

export const geminiAIService = new GeminiAIService();
