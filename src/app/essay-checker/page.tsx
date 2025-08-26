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
  X,
  Download,
  Copy,
  Brain,
  Award,
  Clock
} from 'lucide-react';

interface EssayAnalysisResult {
  essay_id: string;
  overall_score: number;
  category_scores: {
    [key: string]: {
      score: number;
      feedback: string;
    };
  };
  summary_feedback: string;
  submission_type: string;
  word_count: number;
  examiner_remarks: {
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
  };
}

const EssayCheckerPage: React.FC = () => {
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
      if (file.type !== 'application/pdf') {
        setError('Please upload a PDF file');
        return;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setError('File size must be less than 10MB');
        return;
      }
      setPdfFile(file);
      setError(null);
    }
  };

  const removePdfFile = () => {
    setPdfFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const analyzeEssay = async () => {
    setIsAnalyzing(true);
    setError(null);
    setAnalysisResult(null);

    try {
      let essayContent = '';
      
      if (inputType === 'text') {
        if (!essayText.trim()) {
          throw new Error('Please enter your essay text');
        }
        essayContent = essayText;
      } else {
        if (!pdfFile) {
          throw new Error('Please upload a PDF file');
        }
        // For now, we'll use a simple text extraction
        // In production, you'd want to use a proper PDF parsing library
        essayContent = await extractTextFromPDF(pdfFile);
      }

      if (essayContent.length < 100) {
        throw new Error('Essay must be at least 100 characters long');
      }

      if (essayContent.length > 15000) {
        throw new Error('Essay must be less than 15,000 characters');
      }

      // Call the Python FastAPI backend
      const response = await fetch('http://localhost:8000/upload-essay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          essay_text: essayContent
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to analyze essay');
      }

      const result = await response.json();
      setAnalysisResult(result);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const extractTextFromPDF = async (file: File): Promise<string> => {
    // This is a placeholder implementation
    // In production, you'd want to use a proper PDF parsing library
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        // For now, we'll just return a placeholder
        // You should implement proper PDF text extraction here
        resolve('PDF content placeholder - implement proper extraction');
      };
      reader.onerror = () => reject(new Error('Failed to read PDF file'));
      reader.readAsText(file);
    });
  };

  const downloadPDF = async () => {
    if (!analysisResult) return;
    
    try {
      const response = await fetch(`http://localhost:8000/results/${analysisResult.essay_id}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `essay-analysis-${analysisResult.essay_id}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (err) {
      setError('Failed to download PDF');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              CSS Essay Checker
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional AI-powered essay analysis using the official CSS FPSC Pakistan rubric
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!analysisResult ? (
          /* Input Section */
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Upload Your Essay</h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">AI Powered</span>
                <Brain className="h-5 w-5 text-purple-500" />
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
                    placeholder="Paste your essay here... (Minimum 100 characters, Maximum 15,000 characters)"
                    className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    disabled={isAnalyzing}
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
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {pdfFile ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-center space-x-2">
                          <FileText className="h-8 w-8 text-blue-500" />
                          <span className="font-medium">{pdfFile.name}</span>
                        </div>
                        <button
                          onClick={removePdfFile}
                          className="inline-flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-sm text-gray-500">
                          PDF files only, max 10MB
                        </p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Choose File
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                  <span className="text-red-700">{error}</span>
                </div>
              </div>
            )}

            {/* Analyze Button */}
            <div className="mt-6">
              <button
                onClick={analyzeEssay}
                disabled={isAnalyzing || (!essayText.trim() && !pdfFile)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Analyzing Essay...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Analyze Essay
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Results Section */
          <div className="space-y-8">
            {/* Header Actions */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Analysis Results</h2>
              <div className="flex space-x-3">
                <button
                  onClick={downloadPDF}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </button>
                <button
                  onClick={resetForm}
                  className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <X className="h-4 w-4 mr-2" />
                  New Essay
                </button>
              </div>
            </div>

            {/* Overall Score */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Overall Score</h3>
                <div className="text-6xl font-bold text-blue-600 mb-2">
                  {analysisResult.overall_score}/100
                </div>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Submission Type: {analysisResult.submission_type}</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span>Word Count: {analysisResult.word_count}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Scores */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Detailed Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(analysisResult.category_scores).map(([category, data]) => (
                  <div key={category} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-gray-900">{category}</h4>
                      <span className="text-lg font-bold text-blue-600">
                        {data.score}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{data.feedback}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Examiner Remarks */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Examiner Remarks</h3>
              
              {/* Strengths */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-green-700 mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Strengths
                </h4>
                <ul className="space-y-2">
                  {analysisResult.examiner_remarks.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-red-700 mb-3 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Areas for Improvement
                </h4>
                <ul className="space-y-2">
                  {analysisResult.examiner_remarks.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Suggestions */}
              <div>
                <h4 className="text-lg font-semibold text-blue-700 mb-3 flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2" />
                  Suggestions
                </h4>
                <ul className="space-y-2">
                  {analysisResult.examiner_remarks.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Summary Feedback */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Summary Feedback</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">{analysisResult.summary_feedback}</p>
                <button
                  onClick={() => copyToClipboard(analysisResult.summary_feedback)}
                  className="mt-3 inline-flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-700"
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy to Clipboard
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EssayCheckerPage;
