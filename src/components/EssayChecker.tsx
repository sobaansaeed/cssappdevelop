'use client';

import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Upload, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  Trash2,
  Star,
  TrendingUp,
  Target,
  Lightbulb,
  BookOpen,
  FileUp,
  X
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { PDFTextExtractor } from '@/lib/pdf-utils';

interface EssayAnalysisResult {
  corrected_text: string;
  mistakes: Array<{
    original: string;
    correction: string;
    explanation: string;
  }>;
  suggestions: string[];
  score: number;
  userType: string;
  stored: boolean;
  totalMarks?: number;
  isOutlineOnly?: boolean;
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
  examinerRemarks?: {
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
  };
}

interface EssayCheckerProps {
  onAnalysisComplete?: (result: EssayAnalysisResult) => void;
}

const EssayChecker: React.FC<EssayCheckerProps> = ({ onAnalysisComplete }) => {
  const { user, session } = useAuth();
  const [inputType, setInputType] = useState<'text' | 'pdf'>('text');
  const [essayText, setEssayText] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<EssayAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (text: string) => {
    setEssayText(text);
    setWordCount(text.trim() ? text.trim().split(/\s+/).length : 0);
    setCharCount(text.length);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validation = PDFTextExtractor.validateFile(file);
      if (validation.valid) {
        setPdfFile(file);
        setError(null);
      } else {
        setError(validation.error || 'Invalid PDF file');
      }
    }
  };

  const removePdfFile = () => {
    setPdfFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const extractTextFromPDF = async (file: File): Promise<string> => {
    try {
      const result = await PDFTextExtractor.extractText(file);
      if (result.success) {
        return result.text;
      } else {
        throw new Error(result.error || 'Failed to extract text from PDF');
      }
    } catch (error) {
      throw new Error(`PDF text extraction failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const analyzeEssay = async () => {
    if (!user || !session) {
      setError('Please sign in to use the essay checker');
      return;
    }

    let content = '';
    let type: 'text' | 'pdf' = 'text';

    if (inputType === 'text') {
      if (!essayText.trim()) {
        setError('Please enter your essay text');
        return;
      }
      content = essayText;
      type = 'text';
    } else {
      if (!pdfFile) {
        setError('Please select a PDF file');
        return;
      }
      content = await extractTextFromPDF(pdfFile);
      type = 'pdf';
    }

    if (content.length < 100) {
      setError('Essay is too short. Minimum 100 characters required.');
      return;
    }

    if (content.length > 15000) {
      setError('Essay is too long. Maximum 15,000 characters allowed.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await fetch('/api/check-essay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          type,
          essay: type === 'text' ? content : undefined,
          pdfContent: type === 'pdf' ? content : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 403) {
          setError('Pro subscription required. Please upgrade to access the essay checker.');
        } else {
          setError(data.error || 'Failed to analyze essay');
        }
        return;
      }

      setAnalysisResult(data);
      if (onAnalysisComplete) {
        onAnalysisComplete(data);
      }
    } catch {
      setError('Failed to connect to the server. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };





  const resetForm = () => {
    setEssayText('');
    setPdfFile(null);
    setAnalysisResult(null);
    setError(null);
    setWordCount(0);
    setCharCount(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!user || !session) {
    return (
      <div className="text-center py-12">
        <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Sign In Required</h3>
        <p className="text-gray-600 mb-6">Please sign in to access the essay checker tool.</p>
        <a
          href="/auth/signin"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Sign In
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Input Section */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Essay Checker</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Pro User</span>
            <Star className="h-5 w-5 text-yellow-500 fill-current" />
          </div>
        </div>

        {/* Input Type Toggle */}
        <div className="flex space-x-2 mb-6">
          <button
            onClick={() => setInputType('text')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              inputType === 'text'
                ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <FileText className="h-4 w-4 inline mr-2" />
            Text Input
          </button>
          <button
            onClick={() => setInputType('pdf')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              inputType === 'pdf'
                ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <FileUp className="h-4 w-4 inline mr-2" />
            PDF Upload
          </button>
        </div>

        {/* Text Input */}
        {inputType === 'text' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Essay Text
              </label>
              <textarea
                value={essayText}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder="Paste your essay here... (100-15,000 characters)"
                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Words: {wordCount}</span>
              <span>Characters: {charCount}</span>
            </div>
          </div>
        )}

        {/* PDF Upload */}
        {inputType === 'pdf' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload PDF
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                                 {pdfFile ? (
                   <div className="space-y-4">
                     <div className="flex items-center justify-center space-x-2">
                       <FileText className="h-8 w-8 text-blue-500" />
                       <div className="text-center">
                         <div className="font-medium text-gray-900">{pdfFile.name}</div>
                         <div className="text-sm text-gray-500">{PDFTextExtractor.formatFileSize(pdfFile.size)}</div>
                       </div>
                     </div>
                     <button
                       onClick={removePdfFile}
                       className="inline-flex items-center px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                     >
                       <Trash2 className="h-4 w-4 mr-2" />
                       Remove
                     </button>
                   </div>
                 ) : (
                  <div>
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">
                      Click to upload or drag and drop your PDF file
                    </p>
                    <p className="text-sm text-gray-500">Maximum file size: 10MB</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Choose PDF
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {/* Analyze Button */}
        <div className="mt-6">
          <button
            onClick={analyzeEssay}
            disabled={isAnalyzing || (inputType === 'text' && !essayText.trim()) || (inputType === 'pdf' && !pdfFile)}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg"
          >
            {isAnalyzing ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Analyzing Essay...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>Analyze Essay</span>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Analysis Results */}
      {analysisResult && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Analysis Results</h3>
            <button
              onClick={resetForm}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <X className="h-4 w-4 mr-2" />
              New Analysis
            </button>
          </div>

          {/* Score Display */}
          <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-8 mb-8 border border-gray-200 shadow-lg relative overflow-hidden">
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-60" style={{ animationDelay: '0s' }}></div>
              <div className="absolute top-8 right-8 w-3 h-3 bg-purple-400 rounded-full animate-ping opacity-50" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-6 left-12 w-2 h-2 bg-pink-400 rounded-full animate-ping opacity-70" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-12 right-4 w-2 h-2 bg-blue-300 rounded-full animate-ping opacity-40" style={{ animationDelay: '1.5s' }}></div>
            </div>
            
            <div className="text-center relative z-10">
              {/* Main score circle with advanced animations */}
              <div className="relative inline-flex items-center justify-center w-36 h-36 mb-6">
                {/* Outer rotating ring */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-spin" style={{ animationDuration: '8s' }}></div>
                
                {/* Middle pulsing ring */}
                <div className="absolute inset-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full animate-pulse" style={{ animationDuration: '2s' }}></div>
                
                {/* Inner core */}
                <div className="absolute inset-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full shadow-2xl transform hover:scale-105 transition-transform duration-300"></div>
                
                {/* Floating particles around the circle */}
                <div className="absolute -top-2 -left-2 w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="absolute -top-2 -right-2 w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
                <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.8s' }}></div>
                
                {/* Score number with typewriter effect */}
                <span className="relative text-5xl font-bold text-white drop-shadow-lg animate-pulse" style={{ animationDuration: '1.5s' }}>
                  {analysisResult.totalMarks || analysisResult.score}
                </span>
                
                {/* Glowing effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full opacity-30 blur-xl animate-pulse"></div>
              </div>
              
              {/* Animated title */}
              <h4 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 animate-pulse" style={{ animationDuration: '2s' }}>
                Score
              </h4>
              
              {/* Subtitle with slide-in animation */}
              <p className="text-xl text-gray-700 font-semibold animate-bounce" style={{ animationDelay: '0.5s' }}>
                out of 100 points
              </p>
              
              {/* Advanced progress bar */}
              <div className="mt-6 flex justify-center">
                <div className="w-56 h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner relative">
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full"></div>
                  
                  {/* Animated progress fill */}
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full relative overflow-hidden transition-all duration-3000 ease-out"
                    style={{ width: `${(analysisResult.totalMarks || analysisResult.score)}%` }}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse" style={{ animationDuration: '2s' }}></div>
                    
                    {/* Moving dots */}
                    <div className="absolute top-1 left-2 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
                    <div className="absolute top-1 left-8 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute top-1 left-14 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                  </div>
                  
                  {/* Progress percentage */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-white drop-shadow-sm">
                      {Math.round(analysisResult.totalMarks || analysisResult.score)}%
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Animated performance indicator */}
              <div className="mt-4">
                {(() => {
                  const score = analysisResult.totalMarks || analysisResult.score;
                  let grade, color, emoji;
                  
                  if (score >= 91) {
                    grade = 'Outstanding';
                    color = 'text-purple-600';
                    emoji = '🌟';
                  } else if (score >= 71) {
                    grade = 'Excellent';
                    color = 'text-green-600';
                    emoji = '✅';
                  } else if (score >= 61) {
                    grade = 'Very Good';
                    color = 'text-blue-600';
                    emoji = '👍';
                  } else if (score >= 51) {
                    grade = 'Good';
                    color = 'text-yellow-600';
                    emoji = '🙂';
                  } else if (score >= 41) {
                    grade = 'Fair';
                    color = 'text-orange-600';
                    emoji = '😐';
                  } else if (score >= 31) {
                    grade = 'Needs Improvement';
                    color = 'text-red-500';
                    emoji = '⚠️';
                  } else {
                    grade = 'Poor';
                    color = 'text-red-600';
                    emoji = '❌';
                  }
                  
                  return (
                    <p className={`text-lg font-bold animate-bounce ${color}`} style={{ animationDelay: '1s' }}>
                      {emoji} {grade}!
                    </p>
                  );
                })()}
              </div>
              
              {/* Floating achievement badges */}
              {(() => {
                const score = analysisResult.totalMarks || analysisResult.score;
                
                if (score >= 91) {
                  return (
                    <div className="mt-4 flex justify-center space-x-2">
                      <div className="bg-purple-100 border border-purple-300 rounded-full px-3 py-1 text-purple-800 text-sm font-medium animate-bounce" style={{ animationDelay: '1.5s' }}>
                        🌟 Outstanding
                      </div>
                      <div className="bg-yellow-100 border border-yellow-300 rounded-full px-3 py-1 text-yellow-800 text-sm font-medium animate-bounce" style={{ animationDelay: '2s' }}>
                        🏆 Exceptional
                      </div>
                    </div>
                  );
                } else if (score >= 71) {
                  return (
                    <div className="mt-4 flex justify-center space-x-2">
                      <div className="bg-green-100 border border-green-300 rounded-full px-3 py-1 text-green-800 text-sm font-medium animate-bounce" style={{ animationDelay: '1.5s' }}>
                        ✅ Excellent
                      </div>
                      <div className="bg-blue-100 border border-blue-300 rounded-full px-3 py-1 text-blue-800 text-sm font-medium animate-bounce" style={{ animationDelay: '2s' }}>
                        🎯 High Achiever
                      </div>
                    </div>
                  );
                } else if (score >= 61) {
                  return (
                    <div className="mt-4 flex justify-center space-x-2">
                      <div className="bg-blue-100 border border-blue-300 rounded-full px-3 py-1 text-blue-800 text-sm font-medium animate-bounce" style={{ animationDelay: '1.5s' }}>
                        👍 Very Good
                      </div>
                    </div>
                  );
                } else if (score >= 51) {
                  return (
                    <div className="mt-4 flex justify-center space-x-2">
                      <div className="bg-yellow-100 border border-yellow-300 rounded-full px-3 py-1 text-yellow-800 text-sm font-medium animate-bounce" style={{ animationDelay: '1.5s' }}>
                        🙂 Good
                      </div>
                    </div>
                  );
                }
                return null;
              })()}
            </div>
          </div>

          {/* Strengths and Weaknesses */}
          {analysisResult.examinerRemarks && (
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <BookOpen className="h-5 w-5 text-purple-500 mr-2" />
                Examiner&apos;s Remarks
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Strengths */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h5 className="font-semibold text-green-900 mb-3 flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Strengths
                  </h5>
                  {analysisResult.examinerRemarks.strengths.length > 0 ? (
                    <ul className="space-y-2">
                      {analysisResult.examinerRemarks.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-green-600 mt-1">•</span>
                          <span className="text-green-800">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-green-700 italic">No significant strengths identified</p>
                  )}
                </div>

                {/* Weaknesses */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h5 className="font-semibold text-red-900 mb-3 flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                    Areas for Improvement
                  </h5>
                  {analysisResult.examinerRemarks.weaknesses.length > 0 ? (
                    <ul className="space-y-2">
                      {analysisResult.examinerRemarks.weaknesses.map((weakness, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-red-600 mt-1">•</span>
                          <span className="text-red-800">{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-red-700 italic">No major weaknesses identified</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Detailed Evaluation */}
          {analysisResult.evaluation && (
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Target className="h-5 w-5 text-blue-500 mr-2" />
                Detailed Evaluation
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Thesis Statement */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="font-medium text-blue-900">Thesis Statement & Topic Understanding</h5>
                    <span className="text-lg font-bold text-blue-700">{analysisResult.evaluation.thesisStatement.score}/10</span>
                  </div>
                  <p className="text-blue-800 text-sm">{analysisResult.evaluation.thesisStatement.comment}</p>
                </div>

                {/* Outline */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="font-medium text-green-900">Outline: Clarity, Logic, and Direction</h5>
                    <span className="text-lg font-bold text-green-700">{analysisResult.evaluation.outline.score}/10</span>
                  </div>
                  <p className="text-green-800 text-sm">{analysisResult.evaluation.outline.comment}</p>
                </div>

                {/* Structure */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="font-medium text-purple-900">Structure & Coherence</h5>
                    <span className="text-lg font-bold text-purple-700">{analysisResult.evaluation.structure.score}/15</span>
                  </div>
                  <p className="text-purple-800 text-sm">{analysisResult.evaluation.structure.comment}</p>
                </div>

                {/* Content */}
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="font-medium text-indigo-900">Content Depth, Balance & Relevance</h5>
                    <span className="text-lg font-bold text-indigo-700">{analysisResult.evaluation.content.score}/20</span>
                  </div>
                  <p className="text-indigo-800 text-sm">{analysisResult.evaluation.content.comment}</p>
                </div>

                {/* Language */}
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="font-medium text-teal-900">Language Proficiency & Expression</h5>
                    <span className="text-lg font-bold text-teal-700">{analysisResult.evaluation.language.score}/15</span>
                  </div>
                  <p className="text-teal-800 text-sm">{analysisResult.evaluation.language.comment}</p>
                </div>

                {/* Critical Thinking */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="font-medium text-orange-900">Critical Thinking & Analytical Reasoning</h5>
                    <span className="text-lg font-bold text-orange-700">{analysisResult.evaluation.criticalThinking.score}/5</span>
                  </div>
                  <p className="text-orange-800 text-sm">{analysisResult.evaluation.criticalThinking.comment}</p>
                </div>

                {/* Conclusion */}
                <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="font-medium text-pink-900">Conclusion</h5>
                    <span className="text-lg font-bold text-pink-700">{analysisResult.evaluation.conclusion.score}/10</span>
                  </div>
                  <p className="text-pink-800 text-sm">{analysisResult.evaluation.conclusion.comment}</p>
                </div>

                {/* Word Count */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="font-medium text-amber-900">Word Count & Length Control</h5>
                    <span className="text-lg font-bold text-amber-700">{analysisResult.evaluation.wordCount.score}/15</span>
                  </div>
                  <p className="text-amber-800 text-sm">{analysisResult.evaluation.wordCount.comment}</p>
                </div>
              </div>
            </div>
          )}

          {/* Examiner Remarks */}
          {analysisResult.examinerRemarks && (
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <BookOpen className="h-5 w-5 text-purple-500 mr-2" />
                Examiner&apos;s Remarks
              </h4>
              
              {/* Strengths */}
              {analysisResult.examinerRemarks.strengths.length > 0 && (
                <div className="mb-4">
                  <h5 className="font-medium text-green-700 mb-2 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Strengths
                  </h5>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <ul className="space-y-2">
                      {analysisResult.examinerRemarks.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-green-600 text-sm">•</span>
                          <span className="text-green-800 text-sm">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Weaknesses */}
              {analysisResult.examinerRemarks.weaknesses.length > 0 && (
                <div className="mb-4">
                  <h5 className="font-medium text-red-700 mb-2 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Areas for Improvement
                  </h5>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <ul className="space-y-2">
                      {analysisResult.examinerRemarks.weaknesses.map((weakness, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-red-600 text-sm">•</span>
                          <span className="text-red-800 text-sm">{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {analysisResult.examinerRemarks.suggestions.length > 0 && (
                <div className="mb-4">
                  <h5 className="font-medium text-blue-700 mb-2 flex items-center">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Suggestions for Improvement
                  </h5>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <ul className="space-y-2">
                      {analysisResult.examinerRemarks.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-blue-600 text-sm">•</span>
                          <span className="text-blue-800 text-sm">{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}





          {/* Suggestions */}
          {analysisResult.suggestions.length > 0 && (
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
                General Suggestions ({analysisResult.suggestions.length})
              </h4>
              <div className="space-y-3">
                {analysisResult.suggestions.map((suggestion, index) => (
                  <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <p className="text-gray-800">{suggestion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analysis Info */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-blue-500" />
                <span className="text-gray-600">User Type: <span className="font-medium text-gray-900">{analysisResult.userType}</span></span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-green-500" />
                <span className="text-gray-600">Stored: <span className="font-medium text-gray-900">{analysisResult.stored ? 'Yes' : 'No'}</span></span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-purple-500" />
                <span className="text-gray-600">Analysis Complete</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EssayChecker;
