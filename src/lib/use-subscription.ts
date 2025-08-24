import { useState, useEffect } from 'react';
import { useAuth } from './auth-context';
import { userProfileService, UserProfile } from './user-profile';

export interface SubscriptionStatus {
  isPro: boolean;
  isLoading: boolean;
  profile: UserProfile | null;
  error: string | null;
}

export const useSubscription = (): SubscriptionStatus => {
  const { user, session } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      if (!user || !session) {
        setProfile(null);
        setIsPro(false);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(`/api/subscription-status?userId=${user.id}`);
        const data = await response.json();

        if (response.ok) {
          setIsPro(data.isPro);
        } else {
          setError(data.error || 'Failed to fetch subscription status');
        }

        const userProfile = await userProfileService.getProfile(user.id);
        setProfile(userProfile);

      } catch (err) {
        console.error('Error checking subscription:', err);
        setError('Failed to check subscription status');
      } finally {
        setIsLoading(false);
      }
    };

    checkSubscription();
  }, [user, session]);

  return {
    isPro,
    isLoading,
    profile,
    error
  };
};