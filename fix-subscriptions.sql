-- Fix Subscription Issues SQL Script
-- Run this in your Supabase SQL Editor to diagnose and fix subscription problems

-- 1. First, let's see the current state of user_profiles table
SELECT 
    'Current user_profiles structure' as info,
    COUNT(*) as total_users,
    COUNT(CASE WHEN subscription_status = 'active' THEN 1 END) as active_users,
    COUNT(CASE WHEN subscription_status = 'inactive' THEN 1 END) as inactive_users,
    COUNT(CASE WHEN subscription_status = 'expired' THEN 1 END) as expired_users,
    COUNT(CASE WHEN subscription_expiry IS NULL THEN 1 END) as users_without_expiry,
    COUNT(CASE WHEN subscription_expiry < NOW() THEN 1 END) as expired_by_date
FROM user_profiles;

-- 2. Show recent user profiles with their subscription details
SELECT 
    email,
    subscription_status,
    subscription_expiry,
    created_at,
    updated_at,
    CASE 
        WHEN subscription_status = 'active' AND subscription_expiry IS NULL THEN '✅ Active (No Expiry)'
        WHEN subscription_status = 'active' AND subscription_expiry > NOW() THEN '✅ Active (Valid)'
        WHEN subscription_status = 'active' AND subscription_expiry <= NOW() THEN '⚠️ Active (Expired)'
        WHEN subscription_status = 'inactive' THEN '🔴 Inactive'
        WHEN subscription_status = 'expired' THEN '🟡 Expired'
        ELSE '❓ Unknown'
    END as status_description
FROM user_profiles 
ORDER BY created_at DESC 
LIMIT 10;

-- 3. Find users with problematic subscription statuses
SELECT 
    'Users with active status but expired dates' as issue_type,
    email,
    subscription_status,
    subscription_expiry,
    CASE 
        WHEN subscription_expiry IS NULL THEN 'No expiry date'
        WHEN subscription_expiry <= NOW() THEN 'Expired: ' || subscription_expiry
        ELSE 'Valid until: ' || subscription_expiry
    END as expiry_status
FROM user_profiles 
WHERE subscription_status = 'active' 
    AND subscription_expiry IS NOT NULL 
    AND subscription_expiry <= NOW();

-- 4. Find users who should be active but aren't
SELECT 
    'Users with inactive status but no expiry' as issue_type,
    email,
    subscription_status,
    subscription_expiry
FROM user_profiles 
WHERE subscription_status = 'inactive' 
    AND subscription_expiry IS NULL;

-- 5. Fix subscription issues (UNCOMMENT AND MODIFY AS NEEDED)

-- Option A: Set all users to active with no expiry (for testing)
-- UPDATE user_profiles 
-- SET 
--     subscription_status = 'active',
--     subscription_expiry = NULL,
--     updated_at = NOW()
-- WHERE subscription_status = 'inactive';

-- Option B: Fix specific user by email (replace 'user@example.com' with actual email)
-- UPDATE user_profiles 
-- SET 
--     subscription_status = 'active',
--     subscription_expiry = NULL,
--     updated_at = NOW()
-- WHERE email = 'user@example.com';

-- Option C: Fix users with active status but expired dates
-- UPDATE user_profiles 
-- SET 
--     subscription_status = 'expired',
--     updated_at = NOW()
-- WHERE subscription_status = 'active' 
--     AND subscription_expiry IS NOT NULL 
--     AND subscription_expiry <= NOW();

-- Option D: Set expiry date for active users (replace with actual date)
-- UPDATE user_profiles 
-- SET 
--     subscription_expiry = '2024-12-31 23:59:59+00',
--     updated_at = NOW()
-- WHERE subscription_status = 'active' 
--     AND subscription_expiry IS NULL;

-- 6. Verify the fix worked
-- SELECT 
--     'After fix - user_profiles status' as info,
--     COUNT(*) as total_users,
--     COUNT(CASE WHEN subscription_status = 'active' THEN 1 END) as active_users,
--     COUNT(CASE WHEN subscription_status = 'inactive' THEN 1 END) as inactive_users,
--     COUNT(CASE WHEN subscription_status = 'expired' THEN 1 END) as expired_users
-- FROM user_profiles;

-- 7. Check RLS policies (make sure they're not blocking access)
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'user_profiles';

-- 8. Test query to ensure RLS allows proper access
-- This should return the user's own profile
-- SELECT * FROM user_profiles WHERE id = auth.uid();

-- 9. Create a function to easily fix user subscriptions
CREATE OR REPLACE FUNCTION fix_user_subscription(
    user_email TEXT,
    new_status TEXT DEFAULT 'active',
    new_expiry TIMESTAMP WITH TIME ZONE DEFAULT NULL
)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE user_profiles 
    SET 
        subscription_status = new_status,
        subscription_expiry = new_expiry,
        updated_at = NOW()
    WHERE email = user_email;
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Usage examples:
-- SELECT fix_user_subscription('user@example.com', 'active', NULL);
-- SELECT fix_user_subscription('user@example.com', 'active', '2024-12-31 23:59:59+00'::timestamp with time zone);

-- 10. Create a function to bulk fix subscriptions
CREATE OR REPLACE FUNCTION bulk_fix_subscriptions(
    status_filter TEXT DEFAULT 'inactive'
)
RETURNS INTEGER AS $$
DECLARE
    affected_rows INTEGER;
BEGIN
    UPDATE user_profiles 
    SET 
        subscription_status = 'active',
        subscription_expiry = NULL,
        updated_at = NOW()
    WHERE subscription_status = status_filter;
    
    GET DIAGNOSTICS affected_rows = ROW_COUNT;
    RETURN affected_rows;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Usage:
-- SELECT bulk_fix_subscriptions('inactive'); -- Fix all inactive users
-- SELECT bulk_fix_subscriptions('expired');  -- Fix all expired users

-- 11. Final verification query
SELECT 
    'Final verification' as step,
    email,
    subscription_status,
    CASE 
        WHEN subscription_status = 'active' AND subscription_expiry IS NULL THEN '✅ Should work'
        WHEN subscription_status = 'active' AND subscription_expiry > NOW() THEN '✅ Should work'
        WHEN subscription_status = 'active' AND subscription_expiry <= NOW() THEN '❌ Will fail'
        WHEN subscription_status = 'inactive' THEN '❌ Will fail'
        WHEN subscription_status = 'expired' THEN '❌ Will fail'
        ELSE '❓ Unknown'
    END as expected_behavior
FROM user_profiles 
ORDER BY created_at DESC 
LIMIT 5;
