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

  useEffect(() => {
    const checkSubscription = async () => {
      if (!user || !session) {
        setProfile(null);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        const userProfile = await userProfileService.getProfile(user.id);
        
        if (userProfile) {
          setProfile(userProfile);
        } else {
          // If no profile exists, create one with inactive status
          const newProfile = await userProfileService.createProfile(user.id, {
            email: user.email || '',
            display_name: userProfileService.getDisplayName(user),
            subscription_status: 'inactive'
          });
          setProfile(newProfile);
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

  const isPro = profile?.subscription_status === 'active';

  return {
    isPro,
    isLoading,
    profile,
    error
  };
};
