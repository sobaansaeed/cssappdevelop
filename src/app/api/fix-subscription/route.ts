import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
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

    // Get the request body
    const body = await request.json();
    const { action } = body;

    if (action === 'fix-user') {
      // Fix specific user's subscription
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .update({
          subscription_status: 'active',
          subscription_expiry: null,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
        .select()
        .single();

      if (profileError) {
        console.error('Error updating profile:', profileError);
        return NextResponse.json(
          { error: 'Failed to update subscription' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Subscription fixed successfully',
        profile: profile
      });
    }

    if (action === 'check-status') {
      // Check current subscription status
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
        return NextResponse.json(
          { error: 'Failed to fetch profile' },
          { status: 500 }
        );
      }

      // Calculate if user should be pro
      let isProUser = false;
      if (profile.subscription_status === 'active') {
        if (!profile.subscription_expiry) {
          isProUser = true;
        } else {
          const expiryDate = new Date(profile.subscription_expiry);
          const currentDate = new Date();
          isProUser = expiryDate > currentDate;
        }
      }

      return NextResponse.json({
        success: true,
        profile: profile,
        isPro: isProUser,
        analysis: {
          status: profile.subscription_status,
          hasExpiry: !!profile.subscription_expiry,
          isExpired: profile.subscription_expiry ? new Date(profile.subscription_expiry) <= new Date() : false,
          shouldBePro: isProUser
        }
      });
    }

    return NextResponse.json(
      { error: 'Invalid action. Use "fix-user" or "check-status"' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Fix subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
