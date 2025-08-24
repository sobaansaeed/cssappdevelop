-- Comprehensive Fix for All User Subscriptions
-- This script will fix ALL users to have Pro access
-- Run this in your Supabase SQL Editor

-- Step 1: Show current status BEFORE fix
SELECT 
    'BEFORE FIX - Current Status' as step,
    COUNT(*) as total_users,
    COUNT(CASE WHEN subscription_status = 'active' THEN 1 END) as active_users,
    COUNT(CASE WHEN subscription_status = 'inactive' THEN 1 END) as inactive_users,
    COUNT(CASE WHEN subscription_status = 'expired' THEN 1 END) as expired_users,
    COUNT(CASE WHEN subscription_expiry IS NULL THEN 1 END) as users_without_expiry,
    COUNT(CASE WHEN subscription_expiry <= NOW() THEN 1 END) as expired_by_date
FROM user_profiles;

-- Step 2: Show detailed breakdown of current users
SELECT 
    'BEFORE FIX - User Details' as step,
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
ORDER BY email;

-- Step 3: Find users who need fixing
SELECT 
    'Users Needing Fix' as step,
    email,
    subscription_status,
    subscription_expiry,
    CASE 
        WHEN subscription_status != 'active' THEN 'Wrong status'
        WHEN subscription_expiry IS NOT NULL THEN 'Has expiry date'
        ELSE 'Already correct'
    END as issue
FROM user_profiles 
WHERE subscription_status != 'active' OR subscription_expiry IS NOT NULL
ORDER BY email;

-- Step 4: FIX ALL USERS - Set everyone to Pro (UNCOMMENT TO RUN)
UPDATE user_profiles 
SET 
    subscription_status = 'active',
    subscription_expiry = NULL,
    updated_at = NOW()
WHERE subscription_status != 'active' OR subscription_expiry IS NOT NULL;

-- Step 5: Create profiles for users who don't have them (UNCOMMENT TO RUN)
INSERT INTO user_profiles (id, email, subscription_status, subscription_expiry, created_at, updated_at)
SELECT 
    au.id,
    au.email,
    'active', -- Set default to active for all users
    NULL,
    NOW(),
    NOW()
FROM auth.users au
WHERE NOT EXISTS (
    SELECT 1 FROM user_profiles up WHERE up.id = au.id
);

-- Step 6: Show status AFTER fix
SELECT 
    'AFTER FIX - Current Status' as step,
    COUNT(*) as total_users,
    COUNT(CASE WHEN subscription_status = 'active' THEN 1 END) as active_users,
    COUNT(CASE WHEN subscription_status = 'inactive' THEN 1 END) as inactive_users,
    COUNT(CASE WHEN subscription_status = 'expired' THEN 1 END) as expired_users,
    COUNT(CASE WHEN subscription_expiry IS NULL THEN 1 END) as users_without_expiry,
    COUNT(CASE WHEN subscription_expiry <= NOW() THEN 1 END) as expired_by_date
FROM user_profiles;

-- Step 7: Show final status of all users
SELECT 
    'AFTER FIX - Final User Status' as step,
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

-- Step 8: Verify no issues remain
SELECT 
    'Verification - Remaining Issues' as step,
    COUNT(*) as users_with_issues
FROM user_profiles 
WHERE subscription_status != 'active' 
   OR (subscription_expiry IS NOT NULL AND subscription_expiry <= NOW());

-- Step 9: Summary report
SELECT 
    'FINAL SUMMARY' as step,
    'Total Users: ' || COUNT(*) as summary,
    'Pro Users: ' || COUNT(CASE WHEN subscription_status = 'active' AND (subscription_expiry IS NULL OR subscription_expiry > NOW()) THEN 1 END) as pro_users,
    'Free Users: ' || COUNT(CASE WHEN subscription_status != 'active' OR (subscription_expiry IS NOT NULL AND subscription_expiry <= NOW()) THEN 1 END) as free_users,
    'Users Fixed: ' || COUNT(CASE WHEN updated_at >= NOW() - INTERVAL '1 hour' THEN 1 END) as recently_updated
FROM user_profiles;

-- Step 10: Check specific users
SELECT 
    'Specific Users Check' as step,
    email,
    subscription_status,
    subscription_expiry,
    CASE 
        WHEN email IN ('2020ch237@student.uet.edu.pk', 'sobaanzoho@gmail.com') THEN '🎯 TARGET USER'
        ELSE 'Other User'
    END as user_type,
    CASE 
        WHEN subscription_status = 'active' AND (subscription_expiry IS NULL OR subscription_expiry > NOW()) 
        THEN '✅ SHOULD WORK'
        ELSE '❌ NEEDS FIX'
    END as status
FROM user_profiles 
WHERE email IN ('2020ch237@student.uet.edu.pk', 'sobaanzoho@gmail.com')
ORDER BY email;
