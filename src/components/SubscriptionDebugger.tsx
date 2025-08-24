'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { createClient } from '@supabase/supabase-js';

const SubscriptionDebugger: React.FC = () => {
  const { user, session } = useAuth();
  const [debugInfo, setDebugInfo] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);

  const fixSubscription = async () => {
    if (!user || !session?.access_token) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/fix-subscription', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'fix-user' })
      });

      const data = await response.json();
      
      if (data.success) {
        alert('Subscription fixed! Please refresh the page.');
        window.location.reload();
      } else {
        alert('Failed to fix subscription: ' + data.error);
      }
    } catch (error) {
      alert('Error fixing subscription: ' + error);
    } finally {
      setLoading(false);
    }
  };

  const runDiagnostic = async () => {
    if (!user || !session?.access_token) {
      setDebugInfo({
        error: 'No user or session found',
        user: !!user,
        session: !!session,
        accessToken: !!session?.access_token
      });
      return;
    }

    setLoading(true);
    try {
      // Test 1: Check environment variables
      const envCheck = {
        supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        supabaseUrlValue: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 20) + '...',
      };

      // Test 2: Test Supabase connection
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      // Test 3: Test authentication
      const { data: authData, error: authError } = await supabase.auth.getUser(session.access_token);

      // Test 4: Test profile fetch
      let profileData = null;
      let profileError = null;
      
      if (!authError && authData.user) {
        const { data: profile, error: error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        profileData = profile;
        profileError = error;
      }

      setDebugInfo({
        timestamp: new Date().toISOString(),
        user: {
          id: user.id,
          email: user.email,
          hasSession: !!session,
          accessTokenLength: session?.access_token?.length || 0
        },
        environment: envCheck,
        auth: {
          success: !authError,
          error: authError?.message,
          userFound: !!authData.user
        },
        profile: {
          success: !profileError,
          error: profileError?.message,
          data: profileData,
          subscriptionStatus: profileData?.subscription_status,
          subscriptionExpiry: profileData?.subscription_expiry
        },
        subscriptionLogic: profileData ? {
          status: profileData.subscription_status,
          hasExpiry: !!profileData.subscription_expiry,
          isActive: profileData.subscription_status === 'active',
          isExpired: profileData.subscription_expiry ? new Date(profileData.subscription_expiry) <= new Date() : false,
          shouldBePro: profileData.subscription_status === 'active' && (!profileData.subscription_expiry || new Date(profileData.subscription_expiry) > new Date())
        } : null
      });

    } catch (error) {
      setDebugInfo({
        error: 'Diagnostic failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runDiagnostic();
  }, [user, session]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="font-semibold text-yellow-800">Not Authenticated</h3>
        <p className="text-yellow-700">Please sign in to debug subscription issues.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Subscription Debugger</h3>
        <div className="flex space-x-2">
          <button
            onClick={runDiagnostic}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Running...' : 'Refresh'}
          </button>
          <button
            onClick={fixSubscription}
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Fixing...' : 'Fix Subscription'}
          </button>
        </div>
      </div>

      {debugInfo && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded border">
            <h4 className="font-medium text-gray-900 mb-2">User Info</h4>
            <pre className="text-sm text-gray-600 overflow-auto">
              {JSON.stringify(debugInfo.user, null, 2)}
            </pre>
          </div>

          <div className="bg-white p-4 rounded border">
            <h4 className="font-medium text-gray-900 mb-2">Environment Check</h4>
            <pre className="text-sm text-gray-600 overflow-auto">
              {JSON.stringify(debugInfo.environment, null, 2)}
            </pre>
          </div>

          <div className="bg-white p-4 rounded border">
            <h4 className="font-medium text-gray-900 mb-2">Authentication</h4>
            <pre className="text-sm text-gray-600 overflow-auto">
              {JSON.stringify(debugInfo.auth, null, 2)}
            </pre>
          </div>

          <div className="bg-white p-4 rounded border">
            <h4 className="font-medium text-gray-900 mb-2">Profile Data</h4>
            <pre className="text-sm text-gray-600 overflow-auto">
              {JSON.stringify(debugInfo.profile, null, 2)}
            </pre>
          </div>

          {(debugInfo.subscriptionLogic as boolean) && (
            <div className="bg-white p-4 rounded border">
              <h4 className="font-medium text-gray-900 mb-2">Subscription Logic</h4>
              <pre className="text-sm text-gray-600 overflow-auto">
                {JSON.stringify(debugInfo.subscriptionLogic, null, 2)}
              </pre>
            </div>
          )}

          {(debugInfo.error as boolean) && (
            <div className="bg-red-50 p-4 rounded border border-red-200">
              <h4 className="font-medium text-red-900 mb-2">Error</h4>
              <pre className="text-sm text-red-700 overflow-auto">
                {JSON.stringify(debugInfo.error, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SubscriptionDebugger;
