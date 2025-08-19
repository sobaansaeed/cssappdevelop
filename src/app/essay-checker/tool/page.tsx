'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import EssayChecker from '@/components/EssayChecker';
import { Crown, Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const EssayCheckerToolPage: React.FC = () => {
  const { user, session, isLoading } = useAuth();
  const router = useRouter();

  // Check if user has pro subscription (simplified check)
  const isProUser = user && session;

  useEffect(() => {
    // Redirect non-pro users to the main essay checker page
    if (!isLoading && !isProUser) {
      router.push('/essay-checker');
    }
  }, [isProUser, isLoading, router]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your essay checker...</p>
        </div>
      </div>
    );
  }

  // Show access denied for non-pro users
  if (!isProUser) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/essay-checker"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Essay Checker</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-2">
              <Crown className="h-5 w-5 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">Pro User</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tool Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 mr-3">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold">Essay Checker Tool</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Welcome to your advanced AI-powered essay analysis tool. 
            Upload your essays or paste text to get instant feedback and improvements.
          </p>
        </div>
      </div>

      {/* Essay Checker Tool */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EssayChecker />
        </div>
      </div>
    </div>
  );
};

export default EssayCheckerToolPage;
