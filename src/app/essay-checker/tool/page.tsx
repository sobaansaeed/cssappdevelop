'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useSubscription } from '@/lib/use-subscription';
import EssayChecker from '@/components/EssayChecker';
import { Crown, Sparkles, ArrowLeft, Lock } from 'lucide-react';
import Link from 'next/link';

const EssayCheckerToolPage: React.FC = () => {
  const { user, isLoading: authLoading } = useAuth();
  const { isPro, isLoading: subscriptionLoading, profile, error } = useSubscription();
  const router = useRouter();

  const isLoading = authLoading || subscriptionLoading;
  
  // Check for force bypass (for testing)
  const forceProAccess = typeof window !== 'undefined' && localStorage.getItem('force-pro-access') === 'true';
  const effectiveIsPro = isPro || forceProAccess;

  // Debug logging
  console.log('Essay Checker Tool Debug:', {
    user: !!user,
    authLoading,
    subscriptionLoading,
    isPro,
    forceProAccess,
    effectiveIsPro,
    profile: profile ? {
      status: profile.subscription_status,
      expiry: profile.subscription_expiry
    } : null,
    error
  });

  useEffect(() => {
    // Redirect non-pro users to the main essay checker page
    if (!isLoading && !effectiveIsPro) {
      router.push('/essay-checker');
    }
  }, [effectiveIsPro, isLoading, router]);

  // Show loading while checking authentication and subscription
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Checking your subscription status...</p>
          
          {/* Debug info */}
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-md mx-auto">
            <p className="text-blue-700 text-sm mb-2">Debug Info:</p>
            <p className="text-xs text-blue-600">Auth Loading: {authLoading ? 'Yes' : 'No'}</p>
            <p className="text-xs text-blue-600">Subscription Loading: {subscriptionLoading ? 'Yes' : 'No'}</p>
            <p className="text-xs text-blue-600">User: {user ? 'Yes' : 'No'}</p>
            <p className="text-xs text-blue-600">Error: {error || 'None'}</p>
          </div>
          
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg max-w-md mx-auto">
              <p className="text-red-700 text-sm">Error: {error}</p>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                >
                  Retry
                </button>
                <button
                  onClick={async () => {
                    try {
                      const response = await fetch('/api/fix-subscription', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ action: 'fix-user' })
                      });
                      const data = await response.json();
                      if (data.success) {
                        alert('Subscription fixed! Refreshing page...');
                        window.location.reload();
                      } else {
                        alert('Failed to fix subscription: ' + data.error);
                      }
                    } catch (err) {
                      alert('Error fixing subscription: ' + err);
                    }
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                >
                  Fix Subscription
                </button>
              </div>
            </div>
          )}
          
          {/* Manual bypass for testing */}
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg max-w-md mx-auto">
            <p className="text-yellow-700 text-sm mb-2">If stuck loading, try:</p>
            <button
              onClick={() => {
                // Force bypass for testing
                localStorage.setItem('force-pro-access', 'true');
                window.location.reload();
              }}
              className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-sm"
            >
              Force Pro Access (Testing)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show access denied for non-pro users
  if (!effectiveIsPro) {
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
