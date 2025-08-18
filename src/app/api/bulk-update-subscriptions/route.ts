import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

interface BulkUpdateRequest {
  userIds: string[];
  status: 'active' | 'inactive' | 'expired';
}

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
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
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Parse request body
    const body: BulkUpdateRequest = await request.json();
    const { userIds, status } = body;

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return NextResponse.json(
        { error: 'User IDs array is required and must not be empty' },
        { status: 400 }
      );
    }

    if (!status || !['active', 'inactive', 'expired'].includes(status)) {
      return NextResponse.json(
        { error: 'Valid status is required (active, inactive, or expired)' },
        { status: 400 }
      );
    }

    // Update all specified users
    const { error: updateError } = await supabase
      .from('user_profiles')
      .update({
        subscription_status: status,
        updated_at: new Date().toISOString()
      })
      .in('id', userIds);

    if (updateError) {
      console.error('Error updating users:', updateError);
      return NextResponse.json(
        { error: 'Failed to update users' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Successfully updated ${userIds.length} users to ${status}`,
      updatedCount: userIds.length
    });
  } catch (error) {
    console.error('Error processing bulk update:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
