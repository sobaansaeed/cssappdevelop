-- Direct Debug Query for sobaanzoho@gmail.com
-- Run this in Supabase SQL Editor to see EXACTLY what's in the database

-- Step 1: Check auth.users table
SELECT 
    'AUTH USERS TABLE' as table_name,
    id,
    email,
    created_at,
    updated_at,
    email_confirmed_at,
    phone_confirmed_at,
    confirmed_at
FROM auth.users 
WHERE email = 'sobaanzoho@gmail.com';

-- Step 2: Check user_profiles table by ID
SELECT 
    'USER PROFILES BY ID' as table_name,
    up.id,
    up.email,
    up.subscription_status,
    up.subscription_expiry,
    up.created_at,
    up.updated_at,
    au.email as auth_email,
    CASE 
        WHEN up.subscription_status = 'active' AND up.subscription_expiry IS NULL THEN '✅ SHOULD BE PRO'
        WHEN up.subscription_status = 'active' AND up.subscription_expiry > NOW() THEN '✅ SHOULD BE PRO'
        WHEN up.subscription_status = 'active' AND up.subscription_expiry <= NOW() THEN '⚠️ EXPIRED'
        WHEN up.subscription_status = 'inactive' THEN '❌ INACTIVE'
        WHEN up.subscription_status = 'expired' THEN '❌ EXPIRED STATUS'
        ELSE '❓ UNKNOWN'
    END as should_be_pro
FROM user_profiles up
LEFT JOIN auth.users au ON au.id = up.id
WHERE au.email = 'sobaanzoho@gmail.com';

-- Step 3: Check user_profiles table by email directly
SELECT 
    'USER PROFILES BY EMAIL' as table_name,
    id,
    email,
    subscription_status,
    subscription_expiry,
    created_at,
    updated_at,
    CASE 
        WHEN subscription_status = 'active' AND subscription_expiry IS NULL THEN '✅ SHOULD BE PRO'
        WHEN subscription_status = 'active' AND subscription_expiry > NOW() THEN '✅ SHOULD BE PRO'
        WHEN subscription_status = 'active' AND subscription_expiry <= NOW() THEN '⚠️ EXPIRED'
        WHEN subscription_status = 'inactive' THEN '❌ INACTIVE'
        WHEN subscription_status = 'expired' THEN '❌ EXPIRED STATUS'
        ELSE '❓ UNKNOWN'
    END as should_be_pro
FROM user_profiles 
WHERE email = 'sobaanzoho@gmail.com';

-- Step 4: Check for any duplicate profiles
SELECT 
    'DUPLICATE CHECK' as table_name,
    COUNT(*) as profile_count,
    email,
    array_agg(id) as all_ids,
    array_agg(subscription_status) as all_statuses
FROM user_profiles 
WHERE email = 'sobaanzoho@gmail.com'
GROUP BY email;

-- Step 5: Show ALL profiles to compare
SELECT 
    'ALL PROFILES SAMPLE' as table_name,
    email,
    subscription_status,
    subscription_expiry,
    created_at,
    CASE 
        WHEN subscription_status = 'active' AND subscription_expiry IS NULL THEN '✅ PRO'
        WHEN subscription_status = 'active' AND subscription_expiry > NOW() THEN '✅ PRO'
        ELSE '❌ NOT PRO'
    END as is_pro
FROM user_profiles 
ORDER BY created_at DESC
LIMIT 10;

-- Step 6: Test the exact subscription logic
SELECT 
    'SUBSCRIPTION LOGIC TEST' as table_name,
    email,
    subscription_status,
    subscription_expiry,
    NOW() as current_time,
    CASE 
        WHEN subscription_status = 'active' THEN
            CASE 
                WHEN subscription_expiry IS NULL THEN 'TRUE - Active with no expiry'
                WHEN subscription_expiry > NOW() THEN 'TRUE - Active with valid expiry'
                ELSE 'FALSE - Active but expired'
            END
        ELSE 'FALSE - Not active status'
    END as pro_logic_result
FROM user_profiles 
WHERE email = 'sobaanzoho@gmail.com';

-- Step 7: Check for any RLS policies that might be blocking
SELECT 
    'RLS POLICIES' as info,
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

-- Step 8: Manual fix if needed (UNCOMMENT TO EXECUTE)
-- UPDATE user_profiles 
-- SET 
--     subscription_status = 'active',
--     subscription_expiry = NULL,
--     updated_at = NOW()
-- WHERE email = 'sobaanzoho@gmail.com';

-- Step 9: Verify after fix
-- SELECT 
--     'AFTER FIX VERIFICATION' as table_name,
--     email,
--     subscription_status,
--     subscription_expiry,
--     updated_at,
--     CASE 
--         WHEN subscription_status = 'active' AND subscription_expiry IS NULL THEN '✅ NOW PRO'
--         ELSE '❌ STILL NOT PRO'
--     END as final_status
-- FROM user_profiles 
-- WHERE email = 'sobaanzoho@gmail.com';
