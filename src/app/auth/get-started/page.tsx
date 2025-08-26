'use client';

import React from 'react';
import { ArrowLeft, FileText, LogIn, UserPlus, Sparkles, Crown } from 'lucide-react';
import Link from 'next/link';

const GetStartedPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Back to Essay Checker */}
        <div className="text-center mb-12">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Essay Checker
          </Link>
          
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
              <FileText className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Get Started with CSSKRO</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose how you&apos;d like to access the AI-powered essay checker and transform your CSS exam preparation
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Sign In Option */}
          <div className="group bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <LogIn className="h-10 w-10 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome Back</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Already have an account? Sign in to access your personalized essay checker dashboard, 
                view your essay history, and continue improving your writing skills.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Access your essay history
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Continue from where you left off
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Track your progress over time
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Quick Google sign-in available
                </div>
              </div>
              
              <Link
                href="/auth/signin"
                className="inline-block w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Sign Up Option */}
          <div className="group bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <UserPlus className="h-10 w-10 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Join CSSKRO</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                New to CSSKRO? Create your free account and start your journey to CSS exam success 
                with AI-powered essay analysis and personalized feedback.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Free account with basic features
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  AI-powered essay analysis
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  CSS-specific feedback
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  One-click Google sign-up
                </div>
              </div>
              
              <Link
                href="/auth/signup"
                className="inline-block w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        </div>

        {/* Premium CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-white text-center">
          <div className="flex items-center justify-center mb-4">
            <Crown className="h-8 w-8 mr-3" />
            <h3 className="text-2xl font-bold">Ready for Premium Features?</h3>
          </div>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            Upgrade to Pro for unlimited essay checks, priority processing, advanced AI analysis, 
            detailed feedback reports, and essay history tracking.
          </p>
          <Link
            href="/pricing"
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            View Premium Plans
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5" />
              <span>Advanced AI Technology</span>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>CSS-Specific Feedback</span>
            </div>
            <div className="flex items-center space-x-2">
              <Crown className="h-5 w-5" />
              <span>Professional Results</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStartedPage;
