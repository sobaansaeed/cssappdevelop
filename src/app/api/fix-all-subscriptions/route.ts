import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, targetStatus = 'active' } = body;
    
    console.log(`🔧 Fixing all user subscriptions - Action: ${action}`);
    
    const supabase = createServerClient();
    
    if (action === 'fix-all-users') {
      // Get all users from auth
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) {
        console.error('Error fetching auth users:', authError);
        return NextResponse.json(
          { error: 'Failed to fetch users' },
          { status: 500 }
        );
      }

      console.log(`Found ${authUsers.users.length} users in auth system`);

      const results = {
        total: authUsers.users.length,
        processed: 0,
        updated: 0,
        created: 0,
        errors: 0,
        details: [] as Array<{
          email: string;
          action: string;
          status?: string;
          error?: string;
        }>
      };

      // Process each user
      for (const user of authUsers.users) {
        try {
          console.log(`Processing user: ${user.email}`);
          
          // Check if profile exists
          const { error: profileError } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          let result;
          
          if (profileError && profileError.code === 'PGRST116') {
            // Profile doesn't exist, create it
            console.log(`Creating profile for ${user.email}`);
            result = await supabase
              .from('user_profiles')
              .insert({
                id: user.id,
                email: user.email,
                subscription_status: targetStatus,
                subscription_expiry: null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              })
              .select()
              .single();
            
            if (!result.error) {
              results.created++;
              results.details.push({
                email: user.email || 'unknown',
                action: 'created',
                status: targetStatus
              });
            }
          } else {
            // Profile exists, update it
            console.log(`Updating profile for ${user.email}`);
            result = await supabase
              .from('user_profiles')
              .update({
                subscription_status: targetStatus,
                subscription_expiry: null,
                updated_at: new Date().toISOString()
              })
              .eq('id', user.id)
              .select()
              .single();
            
            if (!result.error) {
              results.updated++;
              results.details.push({
                email: user.email || 'unknown',
                action: 'updated',
                status: targetStatus
              });
            }
          }

          if (result.error) {
            console.error(`Error processing ${user.email}:`, result.error);
            results.errors++;
            results.details.push({
              email: user.email || 'unknown',
              action: 'error',
              error: result.error.message
            });
          }

          results.processed++;

        } catch (error) {
          console.error(`Error processing user ${user.email}:`, error);
          results.errors++;
          results.details.push({
            email: user.email || 'unknown',
            action: 'error',
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      }

      console.log('Bulk fix completed:', results);

      return NextResponse.json({
        success: true,
        message: `Processed ${results.processed} users`,
        results
      });

    } else if (action === 'fix-paid-users') {
      // Only fix users who should be paid (you can customize this logic)
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) {
        return NextResponse.json(
          { error: 'Failed to fetch users' },
          { status: 500 }
        );
      }

      // List of emails that should be paid (you can modify this)
      const paidEmails = [
        '2020ch237@student.uet.edu.pk',
        // Add other paid user emails here
      ];

      const results = {
        total: paidEmails.length,
        processed: 0,
        updated: 0,
        created: 0,
        errors: 0,
        details: [] as Array<{
          email: string;
          action: string;
          status?: string;
          error?: string;
        }>
      };

      for (const email of paidEmails) {
        try {
          const user = authUsers.users.find(u => u.email === email);
          
          if (!user) {
            console.log(`User ${email} not found in auth system`);
            results.errors++;
            continue;
          }

          // Check if profile exists
          const { error: profileError } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          let result;
          
          if (profileError && profileError.code === 'PGRST116') {
            // Create profile
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
            
            if (!result.error) {
              results.created++;
            }
          } else {
            // Update profile
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
            
            if (!result.error) {
              results.updated++;
            }
          }

          if (result.error) {
            results.errors++;
          }

          results.processed++;

        } catch (error) {
          console.error(`Error processing ${email}:`, error);
          results.errors++;
        }
      }

      return NextResponse.json({
        success: true,
        message: `Fixed ${results.processed} paid users`,
        results
      });

    } else {
      return NextResponse.json(
        { error: 'Invalid action. Use "fix-all-users" or "fix-paid-users"' },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Fix all subscriptions error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
