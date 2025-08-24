// src/app/debug-subscription/page.tsx
'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useSubscription } from '@/lib/use-subscription';

const DebugSubscriptionPage: React.FC = () => {
  const { user, session } = useAuth();
  const { isPro, isLoading, profile, error, refreshSubscription } = useSubscription();
  const [debugData, setDebugData] = useState<any>(null);
  const [testing, setTesting] = useState(false);

  const testSubscriptionAPI = async () => {
    if (!session?.access_token) {
      alert('No access token found');
      return;
    }

    setTesting(true);
    try {
      const response = await fetch('/api/debug-subscription', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      setDebugData(data);
    } catch (error) {
      console.error('API test failed:', error);
      setDebugData({ error: 'API test failed', details: error });
    } finally {
      setTesting(false);
    }
  };

  const testEssayChecker = async () => {
    if (!session?.access_token) {
      alert('No access token found');
      return;
    }

    setTesting(true);
    try {
      const response = await fetch('/api/check-essay', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'text',
          essay: 'This is a test essay for debugging purposes. It should be long enough to pass the minimum character requirement for the essay checker to process it properly.'
        })
      });

      const data = await response.json();
      console.log('Essay checker response:', data);
      alert(`Essay checker response: ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      console.error('Essay checker test failed:', error);
      alert(`Essay checker test failed: ${error}`);
    } finally {
      setTesting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Debug Subscription Status</h1>
          <p className="text-gray-600">Please sign in to debug subscription status</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Debug Subscription Status</h1>
        
        {/* Auth Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Authentication Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><strong>User ID:</strong> {user.id}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Has Session:</strong> {session ? 'Yes' : 'No'}</p>
              <p><strong>Has Access Token:</strong> {session?.access_token ? 'Yes' : 'No'}</p>
            </div>
            <div>
              <p><strong>Token Preview:</strong> {session?.access_token?.substring(0, 20)}...</p>
              <p><strong>Expires At:</strong> {session?.expires_at ? new Date(session.expires_at * 1000).toLocaleString() : 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Subscription Hook Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            useSubscription Hook Results
            <button
              onClick={refreshSubscription}
              className="ml-4 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Refresh'}
            </button>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><strong>Is Pro:</strong> <span className={isPro ? 'text-green-600' : 'text-red-600'}>{isPro ? 'Yes' : 'No'}</span></p>
              <p><strong>Is Loading:</strong> {isLoading ? 'Yes' : 'No'}</p>
              <p><strong>Error:</strong> {error || 'None'}</p>
            </div>
            <div>
              {profile && (
                <>
                  <p><strong>Subscription Status:</strong> {profile.subscription_status}</p>
                  <p><strong>Expiry Date:</strong> {profile.subscription_expiry || 'None'}</p>
                  <p><strong>Created:</strong> {new Date(profile.created_at).toLocaleString()}</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* API Tests */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">API Tests</h2>
          
          <div className="flex space-x-4 mb-4">
            <button
              onClick={testSubscriptionAPI}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={testing}
            >
              {testing ? 'Testing...' : 'Test Subscription API'}
            </button>
            
            <button
              onClick={testEssayChecker}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
              disabled={testing}
            >
              {testing ? 'Testing...' : 'Test Essay Checker'}
            </button>
          </div>

          {debugData && (
            <div className="bg-gray-100 rounded-lg p-4">
              <h3 className="font-semibold mb-2">API Response:</h3>
              <pre className="text-sm overflow-auto">
                {JSON.stringify(debugData, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Direct Database Check */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Manual Database Check</h2>
          <p className="text-gray-700 mb-4">
            Go to your Supabase dashboard and run this query to check the user's subscription status:
          </p>
          <div className="bg-gray-800 text-green-400 p-4 rounded-lg font-mono text-sm">
            SELECT * FROM user_profiles WHERE id = &apos;{user.id}&apos;;
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Make sure the subscription_status is &apos;active&apos; and subscription_expiry is either null or in the future.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DebugSubscriptionPage;