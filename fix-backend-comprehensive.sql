-- Comprehensive Backend Fix for All User Subscription Issues
-- This script will fix ALL backend logic to ensure users have Pro access
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

-- Step 2: Fix ALL existing users to Pro status
UPDATE user_profiles 
SET 
    subscription_status = 'active',
    subscription_expiry = NULL,
    updated_at = NOW()
WHERE subscription_status != 'active' OR subscription_expiry IS NOT NULL;

-- Step 3: Create profiles for users who don't have them (set to Pro by default)
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

-- Step 4: Update the default for new profiles in the future
ALTER TABLE user_profiles 
ALTER COLUMN subscription_status SET DEFAULT 'active';

-- Step 5: Update the handle_new_user function to create Pro users by default
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, display_name, subscription_status, subscription_expiry)
    VALUES (
        NEW.id, 
        NEW.email, 
        COALESCE(NEW.raw_user_meta_data->>'full_name', SPLIT_PART(NEW.email, '@', 1)),
        'active',  -- Always create new users as Pro
        NULL       -- No expiry for Pro users
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 6: Create a function to automatically ensure Pro access
CREATE OR REPLACE FUNCTION public.ensure_user_pro_access(user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    profile_exists BOOLEAN;
BEGIN
    -- Check if profile exists
    SELECT EXISTS(SELECT 1 FROM user_profiles WHERE id = user_id) INTO profile_exists;
    
    IF NOT profile_exists THEN
        -- Create profile with Pro access
        INSERT INTO user_profiles (id, email, subscription_status, subscription_expiry, created_at, updated_at)
        SELECT 
            au.id,
            au.email,
            'active',
            NULL,
            NOW(),
            NOW()
        FROM auth.users au
        WHERE au.id = user_id;
    ELSE
        -- Update existing profile to Pro
        UPDATE user_profiles 
        SET 
            subscription_status = 'active',
            subscription_expiry = NULL,
            updated_at = NOW()
        WHERE id = user_id AND (subscription_status != 'active' OR subscription_expiry IS NOT NULL);
    END IF;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 7: Grant execute permission on the function
GRANT EXECUTE ON FUNCTION public.ensure_user_pro_access(UUID) TO authenticated, anon;

-- Step 8: Create a trigger to automatically ensure Pro access on profile creation/update
CREATE OR REPLACE FUNCTION public.auto_ensure_pro_access()
RETURNS TRIGGER AS $$
BEGIN
    -- Ensure the user always has Pro access
    IF NEW.subscription_status IS NULL OR NEW.subscription_status != 'active' THEN
        NEW.subscription_status = 'active';
    END IF;
    
    -- Ensure no expiry for Pro users
    IF NEW.subscription_expiry IS NOT NULL THEN
        NEW.subscription_expiry = NULL;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for auto Pro access (optional - uncomment if you want automatic Pro for all operations)
-- CREATE TRIGGER ensure_pro_access_trigger
--     BEFORE INSERT OR UPDATE ON user_profiles
--     FOR EACH ROW EXECUTE FUNCTION auto_ensure_pro_access();

-- Step 9: Show status AFTER fix
SELECT 
    'AFTER FIX - Current Status' as step,
    COUNT(*) as total_users,
    COUNT(CASE WHEN subscription_status = 'active' THEN 1 END) as active_users,
    COUNT(CASE WHEN subscription_status = 'inactive' THEN 1 END) as inactive_users,
    COUNT(CASE WHEN subscription_status = 'expired' THEN 1 END) as expired_users,
    COUNT(CASE WHEN subscription_expiry IS NULL THEN 1 END) as users_without_expiry,
    COUNT(CASE WHEN subscription_expiry <= NOW() THEN 1 END) as expired_by_date
FROM user_profiles;

-- Step 10: Show final status of all users
SELECT 
    'AFTER FIX - All Users Should Be Pro' as step,
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

-- Step 11: Verify NO users have issues
SELECT 
    'FINAL VERIFICATION - Should Be 0' as step,
    COUNT(*) as users_with_issues
FROM user_profiles 
WHERE subscription_status != 'active' 
   OR (subscription_expiry IS NOT NULL AND subscription_expiry <= NOW());

-- Step 12: Summary report
SELECT 
    'FINAL SUMMARY' as step,
    'Total Users: ' || COUNT(*) as summary,
    'Pro Users: ' || COUNT(CASE WHEN subscription_status = 'active' AND (subscription_expiry IS NULL OR subscription_expiry > NOW()) THEN 1 END) as pro_users,
    'Free Users: ' || COUNT(CASE WHEN subscription_status != 'active' OR (subscription_expiry IS NOT NULL AND subscription_expiry <= NOW()) THEN 1 END) as free_users
FROM user_profiles;

-- Step 13: Test specific problematic users
SELECT 
    'SPECIFIC USERS CHECK' as step,
    email,
    subscription_status,
    subscription_expiry,
    CASE 
        WHEN email IN ('2020ch237@student.uet.edu.pk', 'sobaanzoho@gmail.com') THEN '🎯 TARGET USER'
        ELSE 'Other User'
    END as user_type,
    CASE 
        WHEN subscription_status = 'active' AND (subscription_expiry IS NULL OR subscription_expiry > NOW()) 
        THEN '✅ SHOULD WORK NOW'
        ELSE '❌ STILL BROKEN'
    END as status
FROM user_profiles 
WHERE email IN ('2020ch237@student.uet.edu.pk', 'sobaanzoho@gmail.com')
   OR email LIKE '%@%'
ORDER BY 
    CASE WHEN email IN ('2020ch237@student.uet.edu.pk', 'sobaanzoho@gmail.com') THEN 0 ELSE 1 END,
    email;
