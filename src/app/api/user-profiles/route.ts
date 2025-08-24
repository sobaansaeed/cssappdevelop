import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

export async function GET() {
  try {
    // TEMPORARY: Remove authentication for testing
    // TODO: Add proper admin authentication later
    
    // Simple, fast query - get all users with minimal data
    const { data: profiles, error: profileError } = await supabase
      .from('user_profiles')
      .select('id, email, subscription_status, subscription_expiry, created_at')
      .order('created_at', { ascending: false });

    if (profileError) {
      console.error('Database error:', profileError);
      
      // Check if table doesn't exist
      if (profileError.message.includes('relation "user_profiles" does not exist')) {
        return NextResponse.json({ 
          error: 'Database tables not set up yet',
          message: 'Please run the SQL setup script in Supabase first',
          details: 'The user_profiles table does not exist'
        }, { status: 404 });
      }
      
      return NextResponse.json({ error: 'Database error', details: profileError.message }, { status: 500 });
    }

    // Return simple response format
    return NextResponse.json({
      users: profiles || [],
      success: true,
      count: profiles?.length || 0
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
      }
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
