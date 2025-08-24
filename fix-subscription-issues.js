// Fix Subscription Issues Script
// This script helps diagnose and fix subscription-related problems

const { createClient } = require('@supabase/supabase-js');

// Configuration - Update these with your Supabase credentials
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'YOUR_SERVICE_ROLE_KEY';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function diagnoseSubscriptionIssues() {
  console.log('🔍 Diagnosing subscription issues...\n');

  try {
    // 1. Check if user_profiles table exists and has correct structure
    console.log('1. Checking user_profiles table structure...');
    const { data: tableInfo, error: tableError } = await supabase
      .from('user_profiles')
      .select('*')
      .limit(1);

    if (tableError) {
      console.error('❌ Error accessing user_profiles table:', tableError.message);
      console.log('💡 Suggestion: Run the supabase-setup.sql script to create the table');
      return;
    }
    console.log('✅ user_profiles table exists and is accessible\n');

    // 2. Get all user profiles to check subscription statuses
    console.log('2. Checking all user profiles...');
    const { data: profiles, error: profilesError } = await supabase
      .from('user_profiles')
      .select('id, email, subscription_status, subscription_expiry, created_at')
      .order('created_at', { ascending: false });

    if (profilesError) {
      console.error('❌ Error fetching profiles:', profilesError.message);
      return;
    }

    console.log(`📊 Found ${profiles.length} user profiles:`);
    
    const activeUsers = profiles.filter(p => p.subscription_status === 'active');
    const inactiveUsers = profiles.filter(p => p.subscription_status === 'inactive');
    const expiredUsers = profiles.filter(p => p.subscription_status === 'expired');
    
    console.log(`   - Active: ${activeUsers.length}`);
    console.log(`   - Inactive: ${inactiveUsers.length}`);
    console.log(`   - Expired: ${expiredUsers.length}\n`);

    // 3. Check for potential issues
    console.log('3. Checking for potential issues...');
    
    // Check for users with active status but expired dates
    const activeButExpired = activeUsers.filter(user => {
      if (!user.subscription_expiry) return false;
      const expiryDate = new Date(user.subscription_expiry);
      const now = new Date();
      return expiryDate <= now;
    });

    if (activeButExpired.length > 0) {
      console.log(`⚠️  Found ${activeButExpired.length} users with active status but expired dates:`);
      activeButExpired.forEach(user => {
        console.log(`   - ${user.email}: expires ${user.subscription_expiry}`);
      });
      console.log('');
    }

    // Check for users with null expiry dates
    const activeWithNullExpiry = activeUsers.filter(user => !user.subscription_expiry);
    console.log(`ℹ️  ${activeWithNullExpiry.length} active users have no expiry date (should be fine)\n`);

    // 4. Show recent profiles
    console.log('4. Recent user profiles:');
    profiles.slice(0, 5).forEach((profile, index) => {
      const status = profile.subscription_status === 'active' ? '🟢' : 
                    profile.subscription_status === 'inactive' ? '🔴' : '🟡';
      console.log(`   ${index + 1}. ${status} ${profile.email} - ${profile.subscription_status} (${profile.subscription_expiry || 'no expiry'})`);
    });
    console.log('');

    // 5. Provide recommendations
    console.log('5. Recommendations:');
    console.log('   📝 To fix subscription issues:');
    console.log('   1. Ensure user_profiles table has correct structure');
    console.log('   2. Set subscription_status to "active" for paid users');
    console.log('   3. Set subscription_expiry to null or future date');
    console.log('   4. Check RLS policies allow proper access');
    console.log('   5. Verify the API is using the correct user ID\n');

    return profiles;

  } catch (error) {
    console.error('❌ Script error:', error);
  }
}

async function fixUserSubscription(userEmail, status = 'active', expiryDate = null) {
  console.log(`🔧 Fixing subscription for ${userEmail}...`);

  try {
    const { data: profile, error: fetchError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('email', userEmail)
      .single();

    if (fetchError) {
      console.error('❌ User not found:', fetchError.message);
      return false;
    }

    const { error: updateError } = await supabase
      .from('user_profiles')
      .update({
        subscription_status: status,
        subscription_expiry: expiryDate,
        updated_at: new Date().toISOString()
      })
      .eq('email', userEmail);

    if (updateError) {
      console.error('❌ Update failed:', updateError.message);
      return false;
    }

    console.log(`✅ Successfully updated ${userEmail} to ${status} status`);
    return true;

  } catch (error) {
    console.error('❌ Error fixing subscription:', error);
    return false;
  }
}

async function bulkFixSubscriptions() {
  console.log('🔧 Bulk fixing subscriptions...\n');

  // Add user emails here that need to be fixed
  const usersToFix = [
    // Add user emails here, for example:
    // 'user1@example.com',
    // 'user2@example.com'
  ];

  if (usersToFix.length === 0) {
    console.log('ℹ️  No users specified for bulk fix. Add user emails to the usersToFix array.');
    return;
  }

  for (const email of usersToFix) {
    await fixUserSubscription(email, 'active', null);
  }

  console.log('\n✅ Bulk fix completed');
}

// Main execution
async function main() {
  const command = process.argv[2];

  switch (command) {
    case 'diagnose':
      await diagnoseSubscriptionIssues();
      break;
    case 'fix':
      const email = process.argv[3];
      const status = process.argv[4] || 'active';
      const expiry = process.argv[5] || null;
      
      if (!email) {
        console.log('Usage: node fix-subscription-issues.js fix <email> [status] [expiry]');
        console.log('Example: node fix-subscription-issues.js fix user@example.com active null');
        return;
      }
      
      await fixUserSubscription(email, status, expiry);
      break;
    case 'bulk':
      await bulkFixSubscriptions();
      break;
    default:
      console.log('CSSKRO Subscription Issue Fixer');
      console.log('');
      console.log('Usage:');
      console.log('  node fix-subscription-issues.js diagnose    - Diagnose subscription issues');
      console.log('  node fix-subscription-issues.js fix <email> [status] [expiry] - Fix specific user');
      console.log('  node fix-subscription-issues.js bulk        - Bulk fix (edit script first)');
      console.log('');
      console.log('Examples:');
      console.log('  node fix-subscription-issues.js diagnose');
      console.log('  node fix-subscription-issues.js fix user@example.com active null');
      console.log('  node fix-subscription-issues.js fix user@example.com active 2024-12-31');
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  diagnoseSubscriptionIssues,
  fixUserSubscription,
  bulkFixSubscriptions
};
