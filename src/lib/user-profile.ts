import { supabase } from './supabase';
import { User } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  email: string;
  display_name: string | null;
  subscription_status: 'active' | 'inactive' | 'expired';
  subscription_expiry: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateUserProfileData {
  email: string;
  display_name?: string | null;
  subscription_status?: 'active' | 'inactive' | 'expired';
  subscription_expiry?: string | null;
}

export const userProfileService = {
  // Get user profile by user ID
  async getProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    return data;
  },

  // Get user-friendly display name
  getDisplayName(user: User | null): string {
    // Priority: 1. Google OAuth full name, 2. Profile display name, 3. Email username, 4. Fallback
    const fullName = user?.user_metadata?.full_name;
    const profileName = user?.user_metadata?.display_name;
    const email = user?.email;
    
    if (fullName) {
      // Return only the first name to keep navbar clean
      return fullName.split(' ')[0];
    }
    
    if (profileName) {
      return profileName.split(' ')[0];
    }
    
    if (email) {
      return email.split('@')[0];
    }
    
    return 'User';
  },

  // Create new user profile
  async createProfile(userId: string, data: CreateUserProfileData): Promise<UserProfile | null> {
    const { data: profile, error } = await supabase
      .from('user_profiles')
      .insert([
        {
          id: userId,
          email: data.email,
          display_name: data.display_name || null,
          subscription_status: data.subscription_status || 'inactive',
          subscription_expiry: data.subscription_expiry || null,
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating user profile:', error);
      return null;
    }

    return profile;
  },

  // Update user profile
  async updateProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating user profile:', error);
      return null;
    }

    return data;
  },

  // Update subscription status
  async updateSubscriptionStatus(
    userId: string, 
    status: 'active' | 'inactive' | 'expired', 
    expiryDate?: string
  ): Promise<boolean> {
    const { error } = await supabase
      .from('user_profiles')
      .update({
        subscription_status: status,
        subscription_expiry: expiryDate || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (error) {
      console.error('Error updating subscription status:', error);
      return false;
    }

    return true;
  },

  // Check if user has active subscription
  async hasActiveSubscription(userId: string): Promise<boolean> {
    const profile = await this.getProfile(userId);
    
    if (!profile) return false;
    
    if (profile.subscription_status !== 'active') return false;
    
    if (profile.subscription_expiry) {
      const expiryDate = new Date(profile.subscription_expiry);
      const now = new Date();
      return expiryDate > now;
    }
    
    return true;
  },
};
