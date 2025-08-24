import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin-token')?.value;
    
    const debugInfo = {
      timestamp: new Date().toISOString(),
      hasToken: !!token,
      tokenLength: token?.length || 0,
      tokenPreview: token ? `${token.substring(0, 20)}...` : 'No token',
      isAdminTokenValid: token ? verifyAdminToken(token) : false,
      cookies: Object.fromEntries(Array.from(request.headers.entries()) as [string, string][])
    };

    return NextResponse.json({
      success: true,
      debug: debugInfo
    });

  } catch (error) {
    console.error('Admin debug error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Debug failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'test-database') {
      const supabase = createServerClient();
      
      // Test database connection
      const { data: profiles, error } = await supabase
        .from('user_profiles')
        .select('id, email, subscription_status')
        .limit(5);

      return NextResponse.json({
        success: true,
        databaseTest: {
          success: !error,
          error: error?.message,
          profilesCount: profiles?.length || 0,
          sampleProfiles: profiles?.slice(0, 3) || []
        }
      });
    }

    return NextResponse.json(
      { error: 'Invalid action. Use "test-database"' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Admin debug POST error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Debug POST failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
