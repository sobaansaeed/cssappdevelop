'use client';

import React from 'react';
import { FileText, Brain, Target, CheckSquare, Zap, TrendingUp, Award, Shield, Clock, Users, ArrowRight, Crown, Sparkles } from 'lucide-react';
import Link from 'next/link';

const EssayCheckerPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-full p-4"></div>
                <FileText className="h-16 w-16 text-white relative z-10" />
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              CSSKRO
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Essay Checker
              </span>
            </h1>
            
                          <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto mb-8 leading-relaxed">
                Revolutionize your CSS exam preparation with advanced AI-powered essay analysis. 
                Get instant, intelligent feedback that transforms your writing skills.
              </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                href="/auth/get-started"
                className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center space-x-2"
              >
                <span>Get Started for Free</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/pricing"
                className="group border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex items-center space-x-2"
              >
                <Crown className="h-5 w-5" />
                <span>View Premium Plans</span>
              </Link>
            </div>

                          <div className="flex flex-wrap justify-center items-center gap-8 text-blue-100">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>10,000+ CSS Aspirants</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Advanced AI Technology</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Instant Results</span>
                </div>
              </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Choose CSSKRO Essay Checker?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of essay writing with cutting-edge AI technology designed specifically for CSS exams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI-Powered Analysis</h3>
                              <p className="text-gray-600 leading-relaxed">
                  Powered by advanced AI technology, our system provides intelligent analysis that understands context, 
                  identifies patterns, and offers personalized feedback for CSS exam success.
                </p>
            </div>

            <div className="group bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-purple-100">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">CSS-Specific Feedback</h3>
              <p className="text-gray-600 leading-relaxed">
                Tailored specifically for CSS exam requirements, including proper essay structure, 
                argument development, and analytical depth expected by examiners.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-green-100">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CheckSquare className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Comprehensive Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                Get detailed feedback on grammar, vocabulary, sentence structure, logical flow, 
                and content relevance - everything you need to excel in CSS essays.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-orange-100">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Instant Results</h3>
              <p className="text-gray-600 leading-relaxed">
                No more waiting! Get comprehensive feedback in seconds, allowing you to 
                quickly identify areas for improvement and practice more effectively.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-teal-100">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Progress Tracking</h3>
              <p className="text-gray-600 leading-relaxed">
                Monitor your improvement over time with detailed scoring, 
                track your writing evolution, and identify patterns in your strengths and weaknesses.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-yellow-100">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Expert-Level Insights</h3>
              <p className="text-gray-600 leading-relaxed">
                Access insights that rival expert tutors, with explanations that help you 
                understand not just what to change, but why and how to improve.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three simple steps to transform your essay writing skills
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Paste Your Essay</h3>
              <p className="text-gray-600">
                Simply copy and paste your CSS essay into our intelligent editor. 
                No formatting issues, no complex uploads.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Analysis</h3>
              <p className="text-gray-600">
                Our advanced AI analyzes your essay in seconds, examining grammar, 
                structure, content, and CSS-specific requirements.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Get Detailed Feedback</h3>
              <p className="text-gray-600">
                Receive comprehensive feedback with corrections, explanations, 
                and actionable suggestions to improve your writing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Essay Writing?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of CSS aspirants who are already improving their writing skills 
            with AI-powered feedback. Start your journey to exam success today.
          </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/get-started"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center space-x-2"
              >
                <Sparkles className="h-5 w-5" />
                <span>Get Started for Free</span>
              </Link>
              <Link
                href="/pricing"
                className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex items-center justify-center space-x-2"
              >
                <Crown className="h-5 w-5" />
                <span>View Premium Plans</span>
              </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EssayCheckerPage;
