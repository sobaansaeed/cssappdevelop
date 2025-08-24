// src/lib/use-subscription.ts
import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { createClient } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  email: string;
  subscription_status: 'active' | 'inactive' | 'expired';
  subscription_expiry: string | null;
  created_at: string;
  updated_at: string;
}

export function useSubscription() {
  const { user, session } = useAuth();
  const [isPro, setIsPro] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function checkSubscriptionStatus() {
      if (!user || !session?.access_token) {
        setIsPro(false);
        setProfile(null);
        setIsLoading(false);
        setError(null);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Create Supabase client
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        // Set the session
        await supabase.auth.setSession({
          access_token: session.access_token,
          refresh_token: session.refresh_token || ''
        });

        // Fetch user profile directly from database
        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
          
          // If profile doesn't exist, create it
          if (profileError.code === 'PGRST116') {
            const { data: newProfile, error: createError } = await supabase
              .from('user_profiles')
              .insert({
                id: user.id,
                email: user.email,
                subscription_status: 'inactive',
                subscription_expiry: null
              })
              .select()
              .single();

            if (createError) {
              console.error('Error creating profile:', createError);
              setError('Failed to create user profile');
              return;
            }

            if (mounted) {
              setProfile(newProfile);
              setIsPro(false);
            }
            return;
          }
          
          setError('Failed to fetch subscription status');
          return;
        }

        if (!mounted) return;

        setProfile(profileData);

        // Determine if user is pro
        let isProUser = false;
        
        if (profileData.subscription_status === 'active') {
          // If no expiry date, consider it active
          if (!profileData.subscription_expiry) {
            isProUser = true;
          } else {
            // Check if subscription hasn't expired
            const expiryDate = new Date(profileData.subscription_expiry);
            const currentDate = new Date();
            isProUser = expiryDate > currentDate;
            
            console.log('Subscription check:', {
              userId: user.id,
              status: profileData.subscription_status,
              expiry: profileData.subscription_expiry,
              expiryDate: expiryDate.toISOString(),
              currentDate: currentDate.toISOString(),
              isProUser
            });
          }
        }

        setIsPro(isProUser);

      } catch (err) {
        console.error('Subscription check error:', err);
        if (mounted) {
          setError('Failed to check subscription status');
          setIsPro(false);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    checkSubscriptionStatus();

    return () => {
      mounted = false;
    };
  }, [user, session]);

  // Function to refresh subscription status
  const refreshSubscription = async () => {
    if (!user || !session?.access_token) return;

    try {
      setIsLoading(true);
      
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      await supabase.auth.setSession({
        access_token: session.access_token,
        refresh_token: session.refresh_token || ''
      });

      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Error refreshing profile:', profileError);
        return;
      }

      setProfile(profileData);

      // Determine if user is pro
      let isProUser = false;
      
      if (profileData.subscription_status === 'active') {
        if (!profileData.subscription_expiry) {
          isProUser = true;
        } else {
          const expiryDate = new Date(profileData.subscription_expiry);
          const currentDate = new Date();
          isProUser = expiryDate > currentDate;
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
    refreshSubscription
  };
}