-- Fix User: sobaanzoho@gmail.com
-- Run this in your Supabase SQL Editor

-- Step 1: Find the user ID
SELECT 
    'Finding user ID' as step,
    id,
    email,
    created_at
FROM auth.users 
WHERE email = 'sobaanzoho@gmail.com';

-- Step 2: Check current profile status
SELECT 
    'Current profile status' as step,
    id,
    email,
    subscription_status,
    subscription_expiry,
    created_at,
    updated_at
FROM user_profiles 
WHERE email = 'sobaanzoho@gmail.com';

-- Step 3: Fix the subscription (UNCOMMENT TO RUN)
UPDATE user_profiles 
SET 
    subscription_status = 'active',
    subscription_expiry = NULL,
    updated_at = NOW()
WHERE email = 'sobaanzoho@gmail.com';

-- Step 4: Create profile if it doesn't exist (UNCOMMENT IF PROFILE NOT FOUND)
-- INSERT INTO user_profiles (id, email, subscription_status, subscription_expiry, created_at, updated_at)
-- SELECT 
--     au.id,
--     au.email,
--     'active',
--     NULL,
--     NOW(),
--     NOW()
-- FROM auth.users au
-- WHERE au.email = 'sobaanzoho@gmail.com'
-- AND NOT EXISTS (
--     SELECT 1 FROM user_profiles up WHERE up.id = au.id
-- );

-- Step 5: Verify the fix
SELECT 
    'Verification after fix' as step,
    id,
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
    updated_at
FROM user_profiles 
WHERE email = 'sobaanzoho@gmail.com';

-- Step 6: Check if user should be Pro
SELECT 
    'Final check' as step,
    email,
    subscription_status,
    subscription_expiry,
    CASE 
        WHEN subscription_status = 'active' AND (subscription_expiry IS NULL OR subscription_expiry > NOW()) 
        THEN '✅ SHOULD HAVE PRO ACCESS'
        ELSE '❌ NO PRO ACCESS'
    END as access_status
FROM user_profiles 
WHERE email = 'sobaanzoho@gmail.com';
