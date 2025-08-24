import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    
    // Verify the token with Supabase
    const supabase = createServerClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      console.error('Auth error:', authError);
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Check user's subscription status
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.error('Error fetching user profile:', profileError);
      return NextResponse.json(
        { 
          error: 'Failed to fetch user profile',
          details: profileError,
          userId: user.id,
          suggestion: 'Check if user_profiles table exists and user has a profile'
        },
        { status: 500 }
      );
    }

    // Check subscription logic
    let isProUser = false;
    const subscriptionCheck: {
      status: string;
      expiry: string | null;
      hasExpiry: boolean;
      currentDate: string;
      expiryDate: string | null;
      isExpired: boolean;
      isProUser: boolean;
      logic: {
        statusCheck: boolean;
        expiryCheck: boolean;
        dateComparison: boolean | null;
      };
    } = {
      status: profile.subscription_status,
      expiry: profile.subscription_expiry,
      hasExpiry: !!profile.subscription_expiry,
      currentDate: new Date().toISOString(),
      expiryDate: null,
      isExpired: false,
      isProUser: false,
      logic: {
        statusCheck: profile.subscription_status === 'active',
        expiryCheck: !profile.subscription_expiry,
        dateComparison: null
      }
    };
    
    if (profile.subscription_status === 'active') {
      if (!profile.subscription_expiry) {
        isProUser = true;
        subscriptionCheck.isProUser = true;
        subscriptionCheck.logic.expiryCheck = true;
      } else {
        const expiryDate = new Date(profile.subscription_expiry);
        const currentDate = new Date();
        isProUser = expiryDate > currentDate;
        
        subscriptionCheck.expiryDate = expiryDate.toISOString();
        subscriptionCheck.isExpired = expiryDate <= currentDate;
        subscriptionCheck.isProUser = isProUser;
        subscriptionCheck.logic.dateComparison = expiryDate > currentDate;
      }
    }

    // Also check if there are any other users with similar issues
    const { data: allProfiles, error: allProfilesError } = await supabase
      .from('user_profiles')
      .select('id, email, subscription_status, subscription_expiry')
      .limit(10);

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email
      },
      profile: profile,
      subscriptionCheck: subscriptionCheck,
      isPro: isProUser,
      debug: {
        subscriptionStatus: profile.subscription_status,
        subscriptionExpiry: profile.subscription_expiry,
        isProUser,
        allProfiles: allProfilesError ? 'Error fetching all profiles' : allProfiles
      },
      recommendations: {
        ifNotPro: isProUser ? null : [
          'Check if subscription_status is set to "active" in database',
          'Check if subscription_expiry is null or in the future',
          'Verify the user profile exists in user_profiles table',
          'Check if there are any RLS policies blocking access'
        ],
        ifPro: isProUser ? [
          'User should have access to essay checker',
          'Check if there are any client-side caching issues',
          'Verify the API is receiving the correct user ID'
        ] : null
      }
    });

  } catch (error) {
    console.error('Debug subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error },
      { status: 500 }
    );
  }
}
