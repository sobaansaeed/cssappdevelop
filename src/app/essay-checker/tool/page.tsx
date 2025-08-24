'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useSubscription } from '@/lib/use-subscription';
import EssayChecker from '@/components/EssayChecker';
import { Crown, Sparkles, ArrowLeft, Lock } from 'lucide-react';
import Link from 'next/link';

const EssayCheckerToolPage: React.FC = () => {
  const { isLoading: authLoading } = useAuth();
  const { isPro, isLoading: subscriptionLoading, profile } = useSubscription();
  const router = useRouter();

  const isLoading = authLoading || subscriptionLoading;

  useEffect(() => {
    // Redirect non-pro users to the main essay checker page
    if (!isLoading && !isPro) {
      router.push('/essay-checker');
    }
  }, [isPro, isLoading, router]);

  // Show loading while checking authentication and subscription
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Checking your subscription status...</p>
        </div>
      </div>
    );
  }

  // Show access denied for non-pro users
  if (!isPro) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
            <p className="text-gray-600 mb-6">
              This tool is only available for Pro users. Please upgrade your subscription to access the essay checker.
            </p>
            <div className="space-y-3">
              <Link
                href="/pricing"
                className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                View Pricing Plans
              </Link>
              <Link
                href="/essay-checker"
                className="block w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Back to Essay Checker
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
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
              {profile?.subscription_expiry && (
                <span className="text-xs text-gray-500">
                  (Expires: {new Date(profile.subscription_expiry).toLocaleDateString()})
                </span>
              )}
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
