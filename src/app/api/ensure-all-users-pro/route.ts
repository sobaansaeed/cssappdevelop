import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export async function POST() {
  try {
    console.log('🔧 Ensuring all users have Pro access...');
    
    const supabase = createServerClient();
    
    // Step 1: Get all authenticated users
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
      alreadyPro: 0,
      errors: 0,
      details: [] as Array<{
        email: string;
        action: string;
        status?: string;
        error?: string;
      }>
    };

    // Step 2: Process each user to ensure they have Pro access
    for (const user of authUsers.users) {
      try {
        console.log(`Processing user: ${user.email}`);
        
        // Check if profile exists
        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        let result;
        
        if (profileError && profileError.code === 'PGRST116') {
          // Profile doesn't exist, create it with Pro access
          console.log(`Creating Pro profile for ${user.email}`);
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
            results.details.push({
              email: user.email || 'unknown',
              action: 'created_pro',
              status: 'active'
            });
          }
        } else if (profile) {
          // Profile exists, check if it needs to be updated to Pro
          const needsUpdate = profile.subscription_status !== 'active' || profile.subscription_expiry !== null;
          
          if (needsUpdate) {
            console.log(`Updating ${user.email} to Pro status`);
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
              results.details.push({
                email: user.email || 'unknown',
                action: 'updated_to_pro',
                status: 'active'
              });
            }
          } else {
            // User is already Pro
            results.alreadyPro++;
            results.details.push({
              email: user.email || 'unknown',
              action: 'already_pro',
              status: 'active'
            });
          }
        }

        if (result?.error) {
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

    // Step 3: Verify all users are now Pro
    const { data: allProfiles, error: verifyError } = await supabase
      .from('user_profiles')
      .select('email, subscription_status, subscription_expiry')
      .order('email');

    let proCount = 0;
    let freeCount = 0;

    if (!verifyError && allProfiles) {
      for (const profile of allProfiles) {
        const isPro = profile.subscription_status === 'active' && 
                      (profile.subscription_expiry === null || new Date(profile.subscription_expiry) > new Date());
        
        if (isPro) {
          proCount++;
        } else {
          freeCount++;
        }
      }
    }

    console.log('All users Pro access setup completed:', results);

    return NextResponse.json({
      success: true,
      message: `Processed ${results.processed} users. Pro: ${proCount}, Free: ${freeCount}`,
      results: {
        ...results,
        verification: {
          totalProfiles: allProfiles?.length || 0,
          proUsers: proCount,
          freeUsers: freeCount
        }
      }
    });

  } catch (error) {
    console.error('Ensure all users Pro error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
