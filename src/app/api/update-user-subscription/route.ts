import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

interface UpdateSubscriptionRequest {
  userId: string;
  status: 'active' | 'inactive' | 'expired';
  expiryDate?: string | null;
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
    const body: UpdateSubscriptionRequest = await request.json();
    const { userId, status, expiryDate } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    if (!status || !['active', 'inactive', 'expired'].includes(status)) {
      return NextResponse.json(
        { error: 'Valid status is required (active, inactive, or expired)' },
        { status: 400 }
      );
    }

    // Update the user's subscription status
    const { error: updateError } = await supabase
      .from('user_profiles')
      .update({
        subscription_status: status,
        subscription_expiry: expiryDate,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

    if (updateError) {
      console.error('Error updating user subscription:', updateError);
      return NextResponse.json(
        { error: 'Failed to update user subscription' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'User subscription updated successfully',
      userId,
      status,
      expiryDate
    });
  } catch (error) {
    console.error('Error processing subscription update:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
