import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { verifyAdminToken } from '@/lib/auth';

interface UpdateSubscriptionRequest {
  userId: string;
  status: 'active' | 'inactive' | 'expired';
  expiryDate?: string | null;
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('admin-token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Verify the admin token
    if (!verifyAdminToken(token)) {
      return NextResponse.json(
        { error: 'Invalid or expired admin token' },
        { status: 401 }
      );
    }

    // Parse request body
    const body: UpdateSubscriptionRequest = await request.json();
    console.log('update-user-subscription: body', body);
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
    const supabase = createServerClient();
    const { data: updatedProfile, error: updateError } = await supabase
      .from('user_profiles')
      .update({
        subscription_status: status,
        subscription_expiry: expiryDate,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating user subscription:', updateError);
      return NextResponse.json(
        { 
          error: 'Failed to update user subscription',
          details: updateError.message,
          userId,
          status,
          expiryDate
        },
        { status: 500 }
      );
    }

    console.log('Successfully updated user subscription:', {
      userId,
      status,
      expiryDate,
      updatedProfile
    });

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
