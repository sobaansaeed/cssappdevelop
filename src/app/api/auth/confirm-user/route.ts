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
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const { data: users, error: listError } = await supabaseAdmin.auth.admin.listUsers();

    if (listError) {
      return NextResponse.json({ error: listError.message }, { status: 500 });
    }

    const matched = users.users.find(u => u.email?.toLowerCase() === trimmedEmail);
    if (!matched) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (!matched.email_confirmed_at) {
      await supabaseAdmin.auth.admin.updateUserById(matched.id, {
        email_confirm: true,
      });
    }

    return NextResponse.json({ success: true, message: 'Email confirmed' });
  } catch (error) {
    console.error('Confirm user error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
