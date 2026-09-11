// src/lib/use-subscription.ts
import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';

interface UserProfile {
  id: string;
  email: string;
  subscription_status: 'active' | 'inactive' | 'expired';
  subscription_expiry: string | null;
  created_at: string;
  updated_at: string;
}

export function useSubscription() {
  const { user } = useAuth();
  const [isPro, setIsPro] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function checkSubscriptionStatus() {
      if (!user) {
        setIsPro(false);
        setProfile(null);
        setIsLoading(false);
        setError(null);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) {
          // Profile may not exist yet (trigger hasn't fired), default to free
          if (mounted) {
            setIsPro(false);
            setProfile(null);
            setIsLoading(false);
          }
          return;
        }

        if (mounted) {
          setProfile(profileData);

          // Determine Pro status: active subscription that hasn't expired
          let isProUser = false;
          if (profileData.subscription_status === 'active') {
            if (!profileData.subscription_expiry) {
              // No expiry set = lifetime / manual admin grant
              isProUser = true;
            } else {
              const expiryDate = new Date(profileData.subscription_expiry);
              isProUser = expiryDate > new Date();
            }
          }

          setIsPro(isProUser);
          setIsLoading(false);
        }
      } catch (_err) {
        if (mounted) {
          setError('Failed to load subscription status');
          setIsPro(false);
          setIsLoading(false);
        }
      }
    }

    checkSubscriptionStatus();

    return () => {
      mounted = false;
    };
  }, [user]);

  // Refresh subscription status on demand (e.g. after payment)
  const refreshSubscription = async () => {
    if (!user) return;

    try {
      setIsLoading(true);

      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        setIsPro(false);
        return;
      }

      setProfile(profileData);

      let isProUser = false;
      if (profileData.subscription_status === 'active') {
        if (!profileData.subscription_expiry) {
          isProUser = true;
        } else {
          const expiryDate = new Date(profileData.subscription_expiry);
          isProUser = expiryDate > new Date();
        }
      }

      setIsPro(isProUser);
    } catch (err) {
      console.error('Error refreshing subscription:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isPro,
    isLoading,
    profile,
    error,
    refreshSubscription,
  };
}