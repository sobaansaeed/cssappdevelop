import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
    
    console.log(`🔍 Debugging user: ${email}`);
    
    const supabase = createServerClient();
    
    // Step 1: Find the user in auth
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      console.error('Error fetching auth users:', authError);
      return NextResponse.json(
        { error: 'Failed to fetch users' },
        { status: 500 }
      );
    }

    const user = authUsers.users.find(u => u.email === email);
    
    if (!user) {
      return NextResponse.json(
        { error: `User ${email} not found in auth system` },
        { status: 404 }
      );
    }

    console.log(`Found user: ${user.email} (ID: ${user.id})`);

    // Step 2: Check profile
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    // Step 3: Determine Pro status
    let isPro = false;
    let proReason = '';
    
    if (profileError) {
      if (profileError.code === 'PGRST116') {
        proReason = 'No profile found';
      } else {
        proReason = `Profile error: ${profileError.message}`;
      }
    } else {
      if (profile.subscription_status === 'active') {
        if (!profile.subscription_expiry) {
          isPro = true;
          proReason = 'Active subscription with no expiry';
        } else {
          const expiryDate = new Date(profile.subscription_expiry);
          const currentDate = new Date();
          if (expiryDate > currentDate) {
            isPro = true;
            proReason = 'Active subscription with valid expiry';
          } else {
            proReason = 'Active subscription but expired';
          }
        }
      } else {
        proReason = `Subscription status: ${profile.subscription_status}`;
      }
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        created_at: user.created_at
      },
      profile: profile || null,
      profileError: profileError ? profileError.message : null,
      subscription: {
        isPro,
        reason: proReason,
        status: profile?.subscription_status || 'no_profile',
        expiry: profile?.subscription_expiry || null
      },
      debug: {
        hasProfile: !!profile,
        profileExists: !profileError,
        profileErrorCode: profileError?.code || null
      }
    });

  } catch (error) {
    console.error('Debug user error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
