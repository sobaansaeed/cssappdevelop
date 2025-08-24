-- Fix All User Subscriptions
-- This script systematically fixes subscription issues for all users

-- Step 1: Show current status of all users
SELECT 
    'Current Status - All Users' as step,
    COUNT(*) as total_users,
    COUNT(CASE WHEN subscription_status = 'active' THEN 1 END) as active_users,
    COUNT(CASE WHEN subscription_status = 'inactive' THEN 1 END) as inactive_users,
    COUNT(CASE WHEN subscription_status = 'expired' THEN 1 END) as expired_users,
    COUNT(CASE WHEN subscription_expiry IS NULL THEN 1 END) as users_without_expiry,
    COUNT(CASE WHEN subscription_expiry <= NOW() THEN 1 END) as expired_by_date
FROM user_profiles;

-- Step 2: Show detailed breakdown of current users
SELECT 
    'Detailed User Breakdown' as step,
    email,
    subscription_status,
    subscription_expiry,
    CASE 
        WHEN subscription_status = 'active' AND subscription_expiry IS NULL THEN '✅ Pro User (No Expiry)'
        WHEN subscription_status = 'active' AND subscription_expiry > NOW() THEN '✅ Pro User (Valid)'
        WHEN subscription_status = 'active' AND subscription_expiry <= NOW() THEN '⚠️ Pro User (Expired)'
        WHEN subscription_status = 'inactive' THEN '🔴 Free User'
        WHEN subscription_status = 'expired' THEN '🟡 Expired User'
        ELSE '❓ Unknown'
    END as status_description,
    created_at,
    updated_at
FROM user_profiles 
ORDER BY created_at DESC;

-- Step 3: Find users who should be Pro but aren't
SELECT 
    'Users Who Should Be Pro But Are Not' as step,
    email,
    subscription_status,
    subscription_expiry,
    'Should be Pro but showing as ' || subscription_status as issue
FROM user_profiles 
WHERE subscription_status != 'active'
ORDER BY email;

-- Step 4: Fix all users to Pro status (UNCOMMENT TO RUN)
-- UPDATE user_profiles 
-- SET 
--     subscription_status = 'active',
--     subscription_expiry = NULL,
--     updated_at = NOW()
-- WHERE subscription_status != 'active';

-- Step 5: Fix specific paid users (customize this list)
-- UPDATE user_profiles 
-- SET 
--     subscription_status = 'active',
--     subscription_expiry = NULL,
--     updated_at = NOW()
-- WHERE email IN (
--     '2020ch237@student.uet.edu.pk',
--     'user2@example.com',
--     'user3@example.com'
--     -- Add more paid user emails here
-- );

-- Step 6: Create profiles for users who don't have them
-- INSERT INTO user_profiles (id, email, subscription_status, subscription_expiry, created_at, updated_at)
-- SELECT 
--     au.id,
--     au.email,
--     'active', -- Set default to active for all users
--     NULL,
--     NOW(),
--     NOW()
-- FROM auth.users au
-- WHERE NOT EXISTS (
--     SELECT 1 FROM user_profiles up WHERE up.id = au.id
-- );

-- Step 7: Verify the fix worked
SELECT 
    'Verification After Fix' as step,
    COUNT(*) as total_users,
    COUNT(CASE WHEN subscription_status = 'active' THEN 1 END) as active_users,
    COUNT(CASE WHEN subscription_status = 'inactive' THEN 1 END) as inactive_users,
    COUNT(CASE WHEN subscription_status = 'expired' THEN 1 END) as expired_users
FROM user_profiles;

-- Step 8: Show final status of all users
SELECT 
    'Final Status - All Users' as step,
    email,
    subscription_status,
    subscription_expiry,
    CASE 
        WHEN subscription_status = 'active' AND (subscription_expiry IS NULL OR subscription_expiry > NOW()) 
        THEN '✅ PRO ACCESS'
        ELSE '❌ NO PRO ACCESS'
    END as access_status,
    updated_at
FROM user_profiles 
ORDER BY email;

-- Step 9: Check for any remaining issues
SELECT 
    'Remaining Issues Check' as step,
    COUNT(*) as users_with_issues
FROM user_profiles 
WHERE subscription_status != 'active' 
   OR (subscription_expiry IS NOT NULL AND subscription_expiry <= NOW());

-- Step 10: Summary report
SELECT 
    'Summary Report' as step,
    'Total Users: ' || COUNT(*) as summary,
    'Pro Users: ' || COUNT(CASE WHEN subscription_status = 'active' AND (subscription_expiry IS NULL OR subscription_expiry > NOW()) THEN 1 END) as pro_users,
    'Free Users: ' || COUNT(CASE WHEN subscription_status != 'active' OR (subscription_expiry IS NOT NULL AND subscription_expiry <= NOW()) THEN 1 END) as free_users
FROM user_profiles;
