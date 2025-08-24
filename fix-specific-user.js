// Fix Specific User Subscription Script
// This script fixes the subscription for user: 2020ch237@student.uet.edu.pk

const { createClient } = require('@supabase/supabase-js');

// Configuration - Update these with your Supabase credentials
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'YOUR_SERVICE_ROLE_KEY';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function fixSpecificUser() {
  const targetEmail = '2020ch237@student.uet.edu.pk';
  
  console.log(`🔧 Fixing subscription for user: ${targetEmail}`);
  console.log('');

  try {
    // Step 1: Find the user in auth.users
    console.log('1. Finding user in auth.users...');
    const { data: authUser, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      console.error('❌ Error fetching auth users:', authError.message);
      return;
    }

    const user = authUser.users.find(u => u.email === targetEmail);
    
    if (!user) {
      console.error(`❌ User ${targetEmail} not found in auth.users`);
      return;
    }

    console.log(`✅ Found user: ${user.email} (ID: ${user.id})`);
    console.log('');

    // Step 2: Check current profile status
    console.log('2. Checking current profile status...');
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.log('⚠️  Profile not found, will create one');
      console.log('Error:', profileError.message);
    } else {
      console.log('Current profile:');
      console.log(`  - Subscription Status: ${profile.subscription_status}`);
      console.log(`  - Expiry Date: ${profile.subscription_expiry || 'No expiry'}`);
      console.log(`  - Created: ${profile.created_at}`);
      console.log(`  - Updated: ${profile.updated_at}`);
    }
    console.log('');

    // Step 3: Update or create profile
    console.log('3. Updating user profile...');
    
    const updateData = {
      subscription_status: 'active',
      subscription_expiry: null,
      updated_at: new Date().toISOString()
    };

    let result;
    if (profileError && profileError.code === 'PGRST116') {
      // Profile doesn't exist, create it
      console.log('Creating new profile...');
      result = await supabase
        .from('user_profiles')
        .insert({
          id: user.id,
          email: user.email,
          ...updateData
        })
        .select()
        .single();
    } else {
      // Profile exists, update it
      console.log('Updating existing profile...');
      result = await supabase
        .from('user_profiles')
        .update(updateData)
        .eq('id', user.id)
        .select()
        .single();
    }

    if (result.error) {
      console.error('❌ Error updating profile:', result.error.message);
      return;
    }

    console.log('✅ Profile updated successfully!');
    console.log('New profile data:');
    console.log(`  - Subscription Status: ${result.data.subscription_status}`);
    console.log(`  - Expiry Date: ${result.data.subscription_expiry || 'No expiry'}`);
    console.log(`  - Updated: ${result.data.updated_at}`);
    console.log('');

    // Step 4: Verify the fix
    console.log('4. Verifying the fix...');
    const { data: verifyProfile, error: verifyError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (verifyError) {
      console.error('❌ Error verifying profile:', verifyError.message);
      return;
    }

    const isPro = verifyProfile.subscription_status === 'active' && 
                  (!verifyProfile.subscription_expiry || new Date(verifyProfile.subscription_expiry) > new Date());

    console.log(`✅ Verification complete:`);
    console.log(`  - Status: ${verifyProfile.subscription_status}`);
    console.log(`  - Is Pro: ${isPro ? 'Yes' : 'No'}`);
    console.log('');

    if (isPro) {
      console.log('🎉 SUCCESS! User should now have Pro access.');
      console.log('');
      console.log('Next steps:');
      console.log('1. Clear browser cache and cookies');
      console.log('2. Sign out and sign back in');
      console.log('3. Try accessing the essay checker tool');
      console.log('4. The dropdown should now show "Pro User" instead of "Free User"');
    } else {
      console.log('❌ Something went wrong. User is still not Pro.');
    }

  } catch (error) {
    console.error('❌ Script error:', error);
  }
}

// Run the script
fixSpecificUser().catch(console.error);
