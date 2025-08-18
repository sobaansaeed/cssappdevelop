'use client';

import React, { useState, useEffect } from 'react';
import { 
  FileText, CheckCircle, AlertCircle, Star, Zap, Lock, Crown, User, Clock, 
  Brain, Target, Award, Shield, Sparkles, ArrowRight, Play,
  CheckSquare, Lightbulb, BarChart3
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

interface EssayResult {
  corrected_text: string;
  mistakes: Array<{
    original: string;
    correction: string;
    explanation: string;
  }>;
  suggestions: string[];
  score: number;
}

const EssayCheckerPage: React.FC = () => {
  const [essay, setEssay] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<EssayResult | null>(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('features');

  const { user, isAuthenticated, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserProfile();
    }
  }, [isAuthenticated, user]);

  const fetchUserProfile = async () => {
    try {
      setProfileLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      if (!token) return;

      const response = await fetch('/api/user-profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const profile = await response.json();
        setUserProfile(profile);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setProfileLoading(false);
    }
  };

  const isProUser = userProfile?.subscription_status === 'active';
  const isExpiredUser = userProfile?.subscription_status === 'expired';
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!essay.trim()) {
      alert('Please enter an essay to check.');
      return;
    }

    if (!isAuthenticated) {
      alert('Please sign in to use the essay checker.');
      return;
    }

    if (!isProUser) {
      setShowSubscriptionModal(true);
      return;
    }

    if (essay.length < 100) {
      alert('Essay must be at least 100 characters long for meaningful analysis.');
      return;
    }

    if (essay.length > 10000) {
      alert('Essay is too long. Maximum 10,000 characters allowed.');
      return;
    }

    setIsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      if (!token) {
        throw new Error('No authentication token available');
      }

      const response = await fetch('/api/check-essay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ essay }),
      });

      if (response.ok) {
        const data: EssayResult = await response.json();
        setResult(data);
        setActiveTab('results');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to check essay');
      }
    } catch (error) {
      console.error('Error checking essay:', error);
      
      let errorMessage = 'Failed to check essay. Please try again.';
      
      if (error instanceof Error) {
        if (error.message.includes('AI service temporarily unavailable')) {
          errorMessage = 'AI service is temporarily unavailable. Please try again in a few minutes.';
        } else if (error.message.includes('too short')) {
          errorMessage = 'Essay must be at least 100 characters long.';
        } else if (error.message.includes('too long')) {
          errorMessage = 'Essay is too long. Maximum 10,000 characters allowed.';
        } else {
          errorMessage = error.message;
        }
      }
      
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Very Good';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Needs Improvement';
  };

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full mr-4">
                  <Brain className="h-12 w-12 text-white" />
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold">CSSKRO Essay Checker</h1>
              </div>
              <p className="text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
                Revolutionize your CSS exam preparation with AI-powered essay analysis using Google's Gemini AI. 
                Get instant, professional feedback on grammar, structure, and content quality.
              </p>
              
              {/* CTA Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/pricing"
                  className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center space-x-2">
                  <Play className="h-5 w-5" />
                  <span>Watch Demo</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 animate-bounce">
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-full">
              <Target className="h-8 w-8 text-white" />
            </div>
          </div>
          <div className="absolute bottom-20 right-10 animate-pulse">
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-full">
              <Award className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose CSSKRO Essay Checker?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built specifically for CSS aspirants with cutting-edge AI technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI-Powered Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                Powered by Google's Gemini AI for intelligent, context-aware feedback on your essays.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                <CheckSquare className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">CSS-Specific Feedback</h3>
              <p className="text-gray-600 leading-relaxed">
                Tailored analysis for CSS exam requirements, including structure, content relevance, and scoring criteria.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Scoring System</h3>
              <p className="text-gray-600 leading-relaxed">
                Get detailed scores and feedback on grammar, structure, content quality, and overall essay effectiveness.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                <Lightbulb className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Detailed Explanations</h3>
              <p className="text-gray-600 leading-relaxed">
                Understand why changes are suggested with clear explanations and improvement tips.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Instant Results</h3>
              <p className="text-gray-600 leading-relaxed">
                Get comprehensive feedback in seconds, not hours. Perfect for last-minute exam preparation.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-teal-500 to-green-600 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Secure & Private</h3>
              <p className="text-gray-600 leading-relaxed">
                Your essays are processed securely and never stored permanently. Your privacy is our priority.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-xl text-gray-600">Three simple steps to better essays</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">1</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Paste Your Essay</h3>
                <p className="text-gray-600">Simply copy and paste your CSS essay into our intelligent editor.</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">2</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Analysis</h3>
                <p className="text-gray-600">Our Gemini AI analyzes grammar, structure, and content quality.</p>
              </div>
              <div className="text-center">
                <div className="bg-indigo-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">3</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Get Results</h3>
                <p className="text-gray-600">Receive detailed feedback, corrections, and improvement suggestions.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">10,000+</div>
                <div className="text-blue-100">Essays Analyzed</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">98%</div>
                <div className="text-blue-100">Accuracy Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">5,000+</div>
                <div className="text-blue-100">Happy Students</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-blue-100">Available</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Transform Your Essays?</h2>
            <p className="text-xl text-gray-600 mb-10">
              Join thousands of CSS aspirants who are already improving their writing skills with AI-powered feedback.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/pricing"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
              >
                Start Free Trial
              </Link>
              <button className="border-2 border-gray-300 text-gray-700 px-10 py-4 rounded-xl font-semibold text-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Brain className="h-12 w-12 mr-3" />
              <h1 className="text-4xl lg:text-5xl font-bold">CSSKRO Essay Checker</h1>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              AI-powered essay analysis using Google's Gemini AI. Get instant feedback on grammar, structure, and content quality specifically tailored for CSS exams.
            </p>
            
            {/* User Status */}
            <div className="mt-6 flex items-center justify-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                <User className="h-5 w-5" />
                <span className="text-white font-medium">{user?.email}</span>
              </div>
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${
                isProUser 
                  ? 'bg-green-500/20 border-green-300 text-green-100' 
                  : isExpiredUser
                  ? 'bg-red-500/20 border-red-300 text-red-100'
                  : 'bg-yellow-500/20 border-yellow-300 text-yellow-100'
              }`}>
                {isProUser ? (
                  <>
                    <Crown className="h-5 w-5 text-green-300" />
                    <span className="text-green-100 font-medium">Pro User</span>
                  </>
                ) : isExpiredUser ? (
                  <>
                    <Clock className="h-5 w-5 text-red-300" />
                    <span className="text-red-100 font-medium">Expired</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5 text-yellow-300" />
                    <span className="text-yellow-100 font-medium">Free User</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex space-x-1 bg-white rounded-xl p-1 shadow-lg">
          <button
            onClick={() => setActiveTab('features')}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'features'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Sparkles className="h-5 w-5 inline mr-2" />
            Features
          </button>
          <button
            onClick={() => setActiveTab('checker')}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'checker'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <FileText className="h-5 w-5 inline mr-2" />
            Essay Checker
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'results'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <BarChart3 className="h-5 w-5 inline mr-2" />
            Results
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Features Tab */}
        {activeTab === 'features' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features for CSS Success</h2>
              <p className="text-xl text-gray-600">Everything you need to excel in your CSS essays</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature Cards */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered Analysis</h3>
                <p className="text-gray-600 text-sm">Advanced Gemini AI technology for intelligent essay evaluation</p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
                  <CheckSquare className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Grammar & Spelling</h3>
                <p className="text-gray-600 text-sm">Comprehensive language correction and improvement suggestions</p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Scoring</h3>
                <p className="text-gray-600 text-sm">Detailed scoring system with actionable feedback</p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300">
                <div className="bg-gradient-to-br from-orange-500 to-red-600 p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">CSS-Specific Tips</h3>
                <p className="text-gray-600 text-sm">Tailored advice for CSS exam requirements and standards</p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300">
                <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Results</h3>
                <p className="text-gray-600 text-sm">Get comprehensive feedback in seconds, not hours</p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300">
                <div className="bg-gradient-to-br from-teal-500 to-green-600 p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Secure & Private</h3>
                <p className="text-gray-600 text-sm">Your essays are processed securely and never stored permanently</p>
              </div>
            </div>

            {/* Upgrade CTA */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4 flex items-center justify-center">
                <Crown className="h-8 w-8 mr-3" />
                Ready to Upgrade?
              </h3>
              <p className="text-purple-100 mb-6 text-lg">
                Get unlimited access to all features and unlock your full potential
              </p>
              <Link
                href="/pricing"
                className="bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors inline-block text-lg"
              >
                View Pricing Plans
              </Link>
            </div>
          </div>
        )}

        {/* Essay Checker Tab */}
        {activeTab === 'checker' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
                <FileText className="h-8 w-8 mr-3 text-blue-600" />
                Essay Analysis Tool
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="essay" className="block text-lg font-semibold text-gray-700 mb-3">
                    Paste your CSS essay here:
                  </label>
                  <textarea
                    id="essay"
                    value={essay}
                    onChange={(e) => setEssay(e.target.value)}
                    placeholder="Paste your CSS essay here for AI-powered analysis. Our Gemini AI will provide comprehensive feedback on grammar, structure, content quality, and CSS-specific requirements..."
                    className="w-full h-80 px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 resize-none text-lg leading-relaxed"
                    required
                  />
                  <div className="mt-3 flex justify-between items-center text-sm">
                    <span className={`font-medium ${
                      essay.length < 100 ? 'text-red-500' : 
                      essay.length > 10000 ? 'text-red-500' : 'text-gray-600'
                    }`}>
                      {essay.length} / 10,000 characters
                    </span>
                    <span className="text-gray-500">
                      Minimum: 100 characters
                    </span>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading || !essay.trim()}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      <span>Analyzing with AI...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="h-6 w-6" />
                      <span>Analyze Essay with AI</span>
                    </>
                  )}
                </button>
              </form>

              {/* Quick Tips */}
              <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2" />
                  Pro Tips for Better Results
                </h4>
                <ul className="text-blue-800 space-y-2 text-sm">
                  <li>• Ensure your essay is at least 100 characters for meaningful analysis</li>
                  <li>• Include a clear introduction, body paragraphs, and conclusion</li>
                  <li>• Use specific examples and evidence to support your arguments</li>
                  <li>• Maintain consistent formatting and paragraph structure</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Results Tab */}
        {activeTab === 'results' && (
          <div className="space-y-8">
            {result ? (
              <>
                {/* Score Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Star className="h-8 w-8 mr-3 text-yellow-500" />
                    Essay Score & Analysis
                  </h3>
                  <div className="text-center">
                    <div className={`text-7xl font-bold ${getScoreColor(result.score)} mb-4`}>
                      {result.score}
                    </div>
                    <div className="text-2xl text-gray-700 mb-4 font-semibold">
                      {getScoreBadge(result.score)}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                      <div 
                        className={`h-4 rounded-full transition-all duration-1000 ${
                          result.score >= 80 ? 'bg-green-500' : 
                          result.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${result.score}%` }}
                      ></div>
                    </div>
                    <p className="text-gray-600">
                      Your essay scored {result.score} out of 100 points
                    </p>
                  </div>
                </div>

                {/* Corrected Essay */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <CheckCircle className="h-8 w-8 mr-3 text-green-500" />
                    Corrected Essay
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-6 max-h-96 overflow-y-auto border border-gray-200">
                    <p className="text-gray-800 whitespace-pre-wrap text-lg leading-relaxed">{result.corrected_text}</p>
                  </div>
                </div>

                {/* Mistakes */}
                {result.mistakes.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <AlertCircle className="h-8 w-8 mr-3 text-red-500" />
                      Mistakes & Corrections
                    </h3>
                    <div className="space-y-4">
                      {result.mistakes.map((mistake, index) => (
                        <div key={index} className="bg-red-50 border border-red-200 rounded-xl p-6">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </div>
                            <div className="flex-1 space-y-3">
                              <div>
                                <span className="text-sm text-gray-600 font-medium">Original: </span>
                                <span className="text-red-700 font-semibold text-lg">{mistake.original}</span>
                              </div>
                              <div>
                                <span className="text-sm text-gray-600 font-medium">Correction: </span>
                                <span className="text-green-700 font-semibold text-lg">{mistake.correction}</span>
                              </div>
                              <div>
                                <span className="text-sm text-gray-600 font-medium">Explanation: </span>
                                <span className="text-gray-800">{mistake.explanation}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggestions */}
                {result.suggestions.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <Zap className="h-8 w-8 mr-3 text-blue-500" />
                      Suggestions for Improvement
                    </h3>
                    <div className="space-y-4">
                      {result.suggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                          <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">
                            {index + 1}
                          </div>
                          <span className="text-gray-800 text-lg">{suggestion}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setActiveTab('checker')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                  >
                    Check Another Essay
                  </button>
                  <Link
                    href="/pricing"
                    className="bg-white border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-200 text-center"
                  >
                    Upgrade to Pro
                  </Link>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-12 border border-gray-100 text-center">
                <FileText className="h-20 w-20 text-gray-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No Essay Analyzed Yet</h3>
                <p className="text-gray-600 text-lg mb-8">
                  Use the Essay Checker tab to analyze your first essay and get AI-powered feedback.
                </p>
                <button
                  onClick={() => setActiveTab('checker')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  Start Analyzing
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Subscription Modal */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {isExpiredUser ? 'Subscription Expired' : 'Upgrade to Pro'}
            </h3>
            <p className="text-gray-600 mb-6">
              {isExpiredUser 
                ? 'Your Pro subscription has expired. Renew to continue using unlimited essay checking.'
                : 'Get unlimited access to AI-powered essay analysis with advanced features.'
              }
            </p>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Pro Features:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Unlimited essay checks</li>
                  <li>• Priority processing</li>
                  <li>• Advanced AI analysis</li>
                  <li>• Detailed feedback reports</li>
                  <li>• Essay history & tracking</li>
                </ul>
              </div>
              <Link
                href="/pricing"
                className="block w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 px-6 rounded-lg font-medium transition-colors text-center"
              >
                {isExpiredUser ? 'Renew Subscription' : 'View Plans'}
              </Link>
              <button
                onClick={() => setShowSubscriptionModal(false)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EssayCheckerPage;
