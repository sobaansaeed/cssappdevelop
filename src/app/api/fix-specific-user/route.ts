import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const targetEmail = '2020ch237@student.uet.edu.pk';
    
    console.log(`🔧 Fixing specific user: ${targetEmail}`);
    
    const supabase = createServerClient();
    
    // Step 1: Find the user
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      console.error('Error fetching auth users:', authError);
      return NextResponse.json(
        { error: 'Failed to fetch users' },
        { status: 500 }
      );
    }

    const user = authUsers.users.find(u => u.email === targetEmail);
    
    if (!user) {
      return NextResponse.json(
        { error: `User ${targetEmail} not found` },
        { status: 404 }
      );
    }

    console.log(`Found user: ${user.email} (ID: ${user.id})`);

    // Step 2: Check current profile
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    let result;
    
    if (profileError && profileError.code === 'PGRST116') {
      // Profile doesn't exist, create it
      console.log('Creating new profile...');
      result = await supabase
        .from('user_profiles')
        .insert({
          id: user.id,
          email: user.email,
          subscription_status: 'active',
          subscription_expiry: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();
    } else {
      // Profile exists, update it
      console.log('Updating existing profile...');
      result = await supabase
        .from('user_profiles')
        .update({
          subscription_status: 'active',
          subscription_expiry: null,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
        .select()
        .single();
    }

    if (result.error) {
      console.error('Error updating profile:', result.error);
      return NextResponse.json(
        { error: 'Failed to update profile', details: result.error.message },
        { status: 500 }
      );
    }

    console.log('Profile updated successfully:', result.data);

    return NextResponse.json({
      success: true,
      message: `Successfully fixed subscription for ${targetEmail}`,
      user: {
        id: user.id,
        email: user.email
      },
      profile: result.data
    });

  } catch (error) {
    console.error('Fix specific user error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
