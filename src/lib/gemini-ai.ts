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
    return `Role: You are a Senior CSS Essay Examiner (FPSC Pakistan). Evaluate strictly according to FPSC standards. High marks must be earned, not granted. Most candidates fail; scores above 50 are rare and exceptional.

---

Step 1 — Detect Submission Type

Classify the essay first:

Type A: Outline-Only → Contains an outline but no essay body paragraphs.

Type B: Outline + Essay → Contains an outline and full essay (intro, body, conclusion).

Type C: Essay Without Outline → Contains essay body but no outline section.

Type D: Intro-Only / Fragment → Contains only introduction or 1–2 paragraphs.

Type E: Short Essay (<800 words) → Full essay attempt but too short for CSS standards.

Type F: Nonsense/Irrelevant → Gibberish, filler, or completely off-topic.

---

Step 2 — Enhanced Outline Detection Rule ✅

Before evaluation, always check for an outline explicitly.
Consider outline "present" if any of the following signals exist:

1.⁠ ⁠The essay explicitly labels a section "Outline", OR

2.⁠ ⁠The essay shows structured numbering (I, II, III / 1, 2, 3 / a, b, c / bullet points) before the Introduction, OR

3.⁠ ⁠The essay presents a clear section of short, sequential points before the essay paragraphs.

👉 If any of these signals exist → evaluate Outline (0–10).
👉 If none exist → mark Outline = 0 and classify accordingly.
👉 Never ignore outline if present, even if formatting is plain text.

---

Step 3 — Apply Rules

1.⁠ ⁠Type A (Outline-Only):

Evaluate only Outline Quality (10 marks).

All other sections = 0.

Final total = /10 only (not scaled).

Remarks: "Outline without essay body is incomplete; CSS failure."

2.⁠ ⁠Type B (Outline + Essay):

Evaluate fully across all sections.

3.⁠ ⁠Type C (Essay Without Outline):

Outline = 0.

Evaluate rest normally.

Remarks: "Outline missing — weakens CSS attempt."

4.⁠ ⁠Type D (Intro-Only / Fragment):

Evaluate only Thesis (10 marks).

All else = 0.

Remarks: "Fragmentary essay; CSS considers this a failure."

5.⁠ ⁠Type E (Short Essay <800 words):

Evaluate normally but Word Count = 0/15.

Remarks: "Too short; CSS requires ~2500–3000 words. Fail."

6.⁠ ⁠Type F (Nonsense/Irrelevant):

Assign 0 overall.

Remarks: "Irrelevant/incoherent submission. Automatic fail."

---

Step 4 — Scoring Thresholds

Apply strictly (do not inflate marks):

Above 50 = Excellent (rare, exceptional attempt).

40–50 = Passable (borderline success).

Below 40 = Fail (most common outcome in CSS).

---

Step 5 — Marking Scheme (Total = 100)

1.⁠ ⁠Thesis & Topic Understanding — 10

2.⁠ ⁠Outline Quality — 10

3.⁠ ⁠Structure & Coherence — 15

4.⁠ ⁠Content Depth, Balance & Relevance — 20

5.⁠ ⁠Language Proficiency & Expression — 15

6.⁠ ⁠Critical Thinking & Analytical Reasoning — 5

7.⁠ ⁠Conclusion — 10

8.⁠ ⁠Word Count & Length Control — 15

---

Step 6 — Mandatory Output Format

Total Marks: /100

1.⁠ ⁠Thesis: x/10 — Comment: …

2.⁠ ⁠Outline: x/10 — Comment: …

3.⁠ ⁠Structure: x/15 — Comment: …

4.⁠ ⁠Content: x/20 — Comment: …

5.⁠ ⁠Language: x/15 — Comment: …

6.⁠ ⁠Critical Thinking: x/5 — Comment: …

7.⁠ ⁠Conclusion: x/10 — Comment: …

8.⁠ ⁠Word Count: x/15 — Comment: …

Final Remarks:
Strengths: …
Weaknesses: …
Suggestions: …

---

Step 7 — Special Instructions

Always detect type first.

Always apply Enhanced Outline Detection Rule.

Never skip comments; every section must have one, even if scored 0.

Penalize verbosity, clichés, filler, or mechanical style.

Reward originality, argumentation, and discursive variety.

Tone must be strict, examiner-like, and detached (not motivational).

---

ESSAY TO ANALYZE:
${essay}

Provide analysis in this exact JSON format:

{
  "corrected_text": "The corrected version of the essay with minor grammatical fixes",
  "mistakes": [
    {
      "original": "incorrect text",
      "correction": "corrected text", 
      "explanation": "Brief explanation of the error"
    }
  ],
  "suggestions": [
    "Specific suggestion for improvement",
    "Another suggestion"
  ],
  "score": 45,
  "evaluation": {
    "thesisStatement": { "score": 6, "comment": "Clear thesis statement with good topic understanding" },
    "outline": { "score": 5, "comment": "Basic outline structure present" },
    "structure": { "score": 10, "comment": "Some organization but needs improvement" },
    "content": { "score": 12, "comment": "Relevant content but lacks depth" },
    "language": { "score": 9, "comment": "Adequate language proficiency" },
    "criticalThinking": { "score": 3, "comment": "Some analytical thinking demonstrated" },
    "conclusion": { "score": 6, "comment": "Basic conclusion present" },
    "wordCount": { "score": 8, "comment": "Length needs improvement" }
  },
  "totalMarks": 45,
  "isOutlineOnly": false,
  "examinerRemarks": {
    "strengths": ["Clear thesis statement", "Relevant content"],
    "weaknesses": ["Insufficient depth", "Poor structure"],
    "suggestions": ["Expand content depth", "Improve organization"]
  }
}

Be extremely strict. Most essays should score below 50. Only award high marks for exceptional work. Return ONLY valid JSON.`;
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
    // Strict CSS examiner fallback analysis
    const words = essay.split(' ').filter(word => word.length > 0);
    const wordCount = words.length;
    const paragraphs = essay.split('\n\n').filter(p => p.trim().length > 0);
    
    // Check if it's outline-only or fragmentary
    const isOutlineOnly = wordCount < 100 || essay.toLowerCase().includes('outline') && !essay.toLowerCase().includes('introduction');
    const isFragmentary = wordCount < 200 && !isOutlineOnly;
    
    // Strict scoring based on CSS examiner rules
    let thesisScore = 0, outlineScore = 0, structureScore = 0, contentScore = 0;
    let languageScore = 0, criticalThinkingScore = 0, conclusionScore = 0, wordCountScore = 0;
    
    // Word count scoring (strict)
    if (wordCount < 800) {
      wordCountScore = 0; // CSS failure for short essays
    } else if (wordCount >= 2500) {
      wordCountScore = 15;
    } else if (wordCount >= 1500) {
      wordCountScore = 12;
    } else if (wordCount >= 1000) {
      wordCountScore = 8;
    } else {
      wordCountScore = 5;
    }
    
    // Basic structure analysis
    const hasIntroduction = essay.toLowerCase().includes('introduction') || paragraphs[0]?.length > 100;
    const hasConclusion = essay.toLowerCase().includes('conclusion') || 
                         essay.toLowerCase().includes('to conclude') ||
                         paragraphs[paragraphs.length - 1]?.length > 50;
    const hasOutline = essay.toLowerCase().includes('outline') || essay.toLowerCase().includes('structure');
    
    if (isOutlineOnly) {
      // Only evaluate outline quality
      outlineScore = Math.min(10, Math.max(0, Math.round(wordCount / 10)));
      thesisScore = 0;
      structureScore = 0;
      contentScore = 0;
      languageScore = 0;
      criticalThinkingScore = 0;
      conclusionScore = 0;
      wordCountScore = 0;
    } else if (isFragmentary) {
      // Only evaluate thesis
      thesisScore = hasIntroduction ? Math.min(10, Math.max(0, Math.round(wordCount / 20))) : 0;
      outlineScore = 0;
      structureScore = 0;
      contentScore = 0;
      languageScore = 0;
      criticalThinkingScore = 0;
      conclusionScore = 0;
      wordCountScore = 0;
    } else {
      // Full evaluation with strict scoring
      thesisScore = hasIntroduction ? 6 : 2;
      outlineScore = hasOutline ? 5 : 0;
      structureScore = paragraphs.length >= 4 ? 10 : paragraphs.length >= 2 ? 7 : 3;
      contentScore = wordCount >= 1000 ? 12 : wordCount >= 500 ? 8 : 4;
      languageScore = 8; // Basic language assessment
      criticalThinkingScore = 2; // Minimal for fallback
      conclusionScore = hasConclusion ? 6 : 2;
    }
    
    const totalMarks = thesisScore + outlineScore + structureScore + contentScore + 
                      languageScore + criticalThinkingScore + conclusionScore + wordCountScore;
    
    // Determine if it's a fail based on CSS standards
    const isFail = totalMarks < 40 || wordCount < 800;
    
    return {
      corrected_text: essay,
      mistakes: [], // No mistakes shown in fallback mode
      suggestions: [
        'Ensure your essay has a clear thesis statement in the introduction',
        'Use topic sentences to begin each body paragraph',
        'Include specific examples and evidence to support your arguments',
        'Maintain logical flow between paragraphs with transition words',
        'Write a strong conclusion that summarizes your main points',
        `Current word count: ${wordCount} words (CSS requires 2500-3000 words)`
      ],
      score: totalMarks,
      evaluation: {
        thesisStatement: { score: thesisScore, comment: hasIntroduction ? 'Basic thesis structure present' : 'No clear thesis statement' },
        outline: { score: outlineScore, comment: hasOutline ? 'Outline structure detected' : 'No clear outline present' },
        structure: { score: structureScore, comment: `${paragraphs.length} paragraphs detected` },
        content: { score: contentScore, comment: 'Content depth needs improvement' },
        language: { score: languageScore, comment: 'Basic language proficiency' },
        criticalThinking: { score: criticalThinkingScore, comment: 'Limited critical analysis' },
        conclusion: { score: conclusionScore, comment: hasConclusion ? 'Conclusion present' : 'No clear conclusion' },
        wordCount: { score: wordCountScore, comment: `${wordCount} words (CSS requires 2500-3000)` }
      },
      totalMarks: totalMarks,
      isOutlineOnly: isOutlineOnly,
      examinerRemarks: {
        strengths: [
          hasIntroduction ? 'Clear introduction structure' : '',
          hasConclusion ? 'Conclusion present' : '',
          hasOutline ? 'Outline structure present' : '',
          wordCount >= 1000 ? 'Adequate length for basic analysis' : ''
        ].filter(Boolean),
        weaknesses: [
          wordCount < 800 ? 'Too short; CSS essays require 2500-3000 words. Fail.' : '',
          wordCount < 1500 ? 'Essay length needs significant improvement' : '',
          paragraphs.length < 3 ? 'Insufficient paragraph structure' : '',
          !hasIntroduction ? 'Introduction needs improvement' : '',
          !hasConclusion ? 'Conclusion needs improvement' : '',
          isFail ? 'Overall performance below CSS passing standards' : ''
        ].filter(Boolean),
        suggestions: [
          'Aim for 2500-3000 words for CSS exam standards',
          'Focus on clear paragraph structure and transitions',
          'Ensure strong thesis statement and conclusion',
          'Include more specific examples to support your arguments',
          'Develop deeper critical analysis of the topic'
        ]
      }
    };
  }
}

export const geminiAIService = new GeminiAIService();
