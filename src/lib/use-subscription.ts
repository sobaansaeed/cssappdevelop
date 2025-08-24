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
      console.log('useSubscription: checking subscription');
      console.log('useSubscription: user', user);
      console.log('useSubscription: session', session);
      if (!user || !session) {
        setProfile(null);
        setIsPro(false);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        const userProfile = await userProfileService.getProfile(user.id);
        console.log('useSubscription: userProfile', userProfile);
        
        if (userProfile) {
          setProfile(userProfile);
          const active = await userProfileService.hasActiveSubscription(user.id);
          console.log('useSubscription: isActive', active);
          setIsPro(active);
        } else {
          // If no profile exists, create one with inactive status
          const newProfile = await userProfileService.createProfile(user.id, {
            email: user.email || '',
            display_name: userProfileService.getDisplayName(user),
            subscription_status: 'inactive'
          });
          setProfile(newProfile);
          setIsPro(false);
        }
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