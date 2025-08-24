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
    
    console.log(`🔍 REAL DEBUG for user: ${email}`);
    
    const supabase = createServerClient();
    
    // Step 1: Check auth.users
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      return NextResponse.json({ error: 'Failed to fetch auth users' }, { status: 500 });
    }

    const authUser = authUsers.users.find(u => u.email === email);
    
    if (!authUser) {
      return NextResponse.json({ error: `User ${email} not found in auth.users` }, { status: 404 });
    }

    // Step 2: Check user_profiles table
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', authUser.id)
      .single();

    // Step 3: Check user_profiles by email (in case ID mismatch)
    const { data: profileByEmail, error: profileByEmailError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('email', email)
      .single();

    // Step 4: Get ALL profiles to see what's in the table
    const { data: allProfiles } = await supabase
      .from('user_profiles')
      .select('id, email, subscription_status, subscription_expiry')
      .limit(20);

    // Step 5: Test the EXACT same logic as useSubscription
    let frontendIsPro = false;
    let frontendReason = '';
    
    if (profile && !profileError) {
      if (profile.subscription_status === 'active') {
        if (!profile.subscription_expiry) {
          frontendIsPro = true;
          frontendReason = 'Active with no expiry';
        } else {
          const expiryDate = new Date(profile.subscription_expiry);
          const currentDate = new Date();
          if (expiryDate > currentDate) {
            frontendIsPro = true;
            frontendReason = 'Active with valid expiry';
          } else {
            frontendReason = 'Active but expired';
          }
        }
      } else {
        frontendReason = `Wrong status: ${profile.subscription_status}`;
      }
    } else {
      frontendReason = `No profile found: ${profileError?.message || 'Unknown error'}`;
    }

    // Step 6: Test the EXACT same logic as check-essay API
    let backendIsPro = false;
    let backendReason = '';
    
    if (profile && !profileError) {
      if (profile.subscription_status === 'active') {
        if (!profile.subscription_expiry) {
          backendIsPro = true;
          backendReason = 'Active with no expiry';
        } else {
          const expiryDate = new Date(profile.subscription_expiry);
          const currentDate = new Date();
          if (expiryDate > currentDate) {
            backendIsPro = true;
            backendReason = 'Active with valid expiry';
          } else {
            backendReason = 'Active but expired';
          }
        }
      } else {
        backendReason = `Wrong status: ${profile.subscription_status}`;
      }
    } else {
      backendReason = `No profile found: ${profileError?.message || 'Unknown error'}`;
    }

    return NextResponse.json({
      success: true,
      email,
      authUser: {
        id: authUser.id,
        email: authUser.email,
        created_at: authUser.created_at
      },
      profile: profile || null,
      profileError: profileError?.message || null,
      profileByEmail: profileByEmail || null,
      profileByEmailError: profileByEmailError?.message || null,
      allProfiles: allProfiles || [],
      analysis: {
        profileExists: !!profile,
        profileByEmailExists: !!profileByEmail,
        idsMatch: profile?.id === authUser.id,
        emailsMatch: profile?.email === email,
        currentTime: new Date().toISOString(),
        frontendLogic: {
          isPro: frontendIsPro,
          reason: frontendReason
        },
        backendLogic: {
          isPro: backendIsPro,
          reason: backendReason
        },
        shouldWork: frontendIsPro && backendIsPro
      },
      rawData: {
        profileId: profile?.id,
        authId: authUser.id,
        profileStatus: profile?.subscription_status,
        profileExpiry: profile?.subscription_expiry,
        profileEmail: profile?.email
      }
    });

  } catch (error) {
    console.error('Real debug error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
