import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function POST(request: NextRequest) {
  try {
    const { email, password, fullName } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters.' },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Create user with auto-confirmed email
    const { data: userData, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: trimmedEmail,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName || '',
        name: fullName || '',
      },
    });

    if (createError) {
      // Check if user already exists
      if (
        createError.message?.toLowerCase().includes('already registered') ||
        createError.message?.toLowerCase().includes('already exists') ||
        createError.status === 422
      ) {
        return NextResponse.json(
          { error: 'An account with this email already exists. Please sign in instead.' },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: createError.message || 'Failed to create account.' },
        { status: 400 }
      );
    }

    const user = userData.user;

    // Ensure profile entry exists
    if (user) {
      const { error: profileError } = await supabaseAdmin
        .from('user_profiles')
        .upsert({
          id: user.id,
          email: trimmedEmail,
          display_name: fullName || null,
          subscription_status: 'inactive',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }, { onConflict: 'id' });

      if (profileError) {
        console.warn('Profile upsert warning:', profileError.message);
      }

      // Initialize 5 free credits for new user
      const today = new Date();
      const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
        .toISOString()
        .split('T')[0];

      await supabaseAdmin
        .from('user_credits')
        .upsert({
          user_id: user.id,
          credits: 5,
          last_reset: firstOfMonth,
          is_pro: false,
        }, { onConflict: 'user_id' });
    }

    return NextResponse.json({
      success: true,
      message: 'Account created successfully.',
      userId: user?.id,
    });

  } catch (error) {
    console.error('Signup API error:', error);
    return NextResponse.json(
      { error: 'An internal error occurred during registration. Please try again.' },
      { status: 500 }
    );
  }
}
