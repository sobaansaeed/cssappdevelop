-- 🗄️ CSSKRO User Management Scripts for Supabase
-- Use these in Supabase SQL Editor for direct database management

-- ===========================================
-- 📊 VIEWING USERS
-- ===========================================

-- View all users with subscription details
SELECT 
    id,
    email,
    subscription_status,
    subscription_expiry,
    created_at,
    updated_at,
    CASE 
        WHEN subscription_status = 'active' THEN '👑 Pro User'
        WHEN subscription_status = 'inactive' THEN '👤 Free User'
        WHEN subscription_status = 'expired' THEN '⏰ Expired Pro'
        ELSE '❓ Unknown'
    END as status_display
FROM user_profiles 
ORDER BY created_at DESC;

-- View only Pro users
SELECT 
    email,
    subscription_status,
    subscription_expiry,
    created_at,
    CASE 
        WHEN subscription_expiry IS NULL THEN 'No Expiry'
        WHEN subscription_expiry < NOW() THEN 'Expired'
        ELSE 'Active until ' || subscription_expiry::date
    END as expiry_status
FROM user_profiles 
WHERE subscription_status = 'active'
ORDER BY created_at DESC;

-- View only Free users
SELECT 
    email,
    subscription_status,
    created_at
FROM user_profiles 
WHERE subscription_status = 'inactive'
ORDER BY created_at DESC;

-- View expired Pro users
SELECT 
    email,
    subscription_status,
    subscription_expiry,
    created_at,
    CASE 
        WHEN subscription_expiry < NOW() THEN 'Expired ' || 
             EXTRACT(DAYS FROM NOW() - subscription_expiry) || ' days ago'
        ELSE 'Expires in ' || 
             EXTRACT(DAYS FROM subscription_expiry - NOW()) || ' days'
    END as expiry_info
FROM user_profiles 
WHERE subscription_status = 'active' 
   OR subscription_status = 'expired'
ORDER BY subscription_expiry ASC;

-- ===========================================
-- 🔄 UPDATING USER STATUS
-- ===========================================

-- Upgrade a specific user to Pro (no expiry)
UPDATE user_profiles 
SET subscription_status = 'active', 
    subscription_expiry = NULL,
    updated_at = NOW()
WHERE email = 'user@example.com';

-- Upgrade a specific user to Pro with expiry date
UPDATE user_profiles 
SET subscription_status = 'active', 
    subscription_expiry = '2025-12-31 23:59:59+00',
    updated_at = NOW()
WHERE email = 'user@example.com';

-- Downgrade a specific user to Free
UPDATE user_profiles 
SET subscription_status = 'inactive', 
    subscription_expiry = NULL,
    updated_at = NOW()
WHERE email = 'user@example.com';

-- Mark a Pro user as expired
UPDATE user_profiles 
SET subscription_status = 'expired',
    updated_at = NOW()
WHERE email = 'user@example.com';

-- ===========================================
-- 📈 BULK OPERATIONS
-- ===========================================

-- Upgrade multiple users to Pro (no expiry)
UPDATE user_profiles 
SET subscription_status = 'active', 
    subscription_expiry = NULL,
    updated_at = NOW()
WHERE email IN (
    'user1@example.com',
    'user2@example.com',
    'user3@example.com'
);

-- Upgrade multiple users to Pro with 1 year expiry
UPDATE user_profiles 
SET subscription_status = 'active', 
    subscription_expiry = NOW() + INTERVAL '1 year',
    updated_at = NOW()
WHERE email IN (
    'user1@example.com',
    'user2@example.com',
    'user3@example.com'
);

-- Downgrade multiple users to Free
UPDATE user_profiles 
SET subscription_status = 'inactive', 
    subscription_expiry = NULL,
    updated_at = NOW()
WHERE email IN (
    'user1@example.com',
    'user2@example.com',
    'user3@example.com'
);

-- ===========================================
-- 🧹 MAINTENANCE OPERATIONS
-- ===========================================

-- Auto-expire users whose subscription has passed
UPDATE user_profiles 
SET subscription_status = 'expired',
    updated_at = NOW()
WHERE subscription_status = 'active' 
  AND subscription_expiry IS NOT NULL 
  AND subscription_expiry < NOW();

-- Extend all active Pro users by 1 month
UPDATE user_profiles 
SET subscription_expiry = COALESCE(subscription_expiry, NOW()) + INTERVAL '1 month',
    updated_at = NOW()
WHERE subscription_status = 'active';

-- Reset all users to Free (use carefully!)
-- UPDATE user_profiles 
-- SET subscription_status = 'inactive', 
--     subscription_expiry = NULL,
--     updated_at = NOW();

-- ===========================================
-- 📊 STATISTICS AND ANALYTICS
-- ===========================================

-- User count by status
SELECT 
    subscription_status,
    COUNT(*) as user_count,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM user_profiles), 2) as percentage
FROM user_profiles 
GROUP BY subscription_status
ORDER BY user_count DESC;

-- Monthly user growth
SELECT 
    DATE_TRUNC('month', created_at) as month,
    COUNT(*) as new_users,
    SUM(COUNT(*)) OVER (ORDER BY DATE_TRUNC('month', created_at)) as cumulative_users
FROM user_profiles 
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY month;

-- Pro user conversion rate (users who became Pro)
SELECT 
    COUNT(*) as total_users,
    COUNT(CASE WHEN subscription_status = 'active' THEN 1 END) as pro_users,
    ROUND(COUNT(CASE WHEN subscription_status = 'active' THEN 1 END) * 100.0 / COUNT(*), 2) as conversion_rate
FROM user_profiles;

-- ===========================================
-- 🔍 SEARCH AND FILTER
-- ===========================================

-- Search users by email pattern
SELECT * FROM user_profiles 
WHERE email ILIKE '%@gmail.com%'
ORDER BY created_at DESC;

-- Find users created in last 30 days
SELECT * FROM user_profiles 
WHERE created_at > NOW() - INTERVAL '30 days'
ORDER BY created_at DESC;

-- Find users with expiring subscriptions (next 7 days)
SELECT 
    email,
    subscription_status,
    subscription_expiry,
    CASE 
        WHEN subscription_expiry < NOW() + INTERVAL '7 days' THEN '⚠️ Expiring Soon'
        ELSE '✅ Active'
    END as status
FROM user_profiles 
WHERE subscription_status = 'active' 
  AND subscription_expiry IS NOT NULL 
  AND subscription_expiry < NOW() + INTERVAL '7 days'
ORDER BY subscription_expiry ASC;

-- ===========================================
-- 🚨 SAFETY CHECKS
-- ===========================================

-- Always check what you're about to update
-- Use SELECT first, then UPDATE

-- Example: Check what will be updated
SELECT * FROM user_profiles WHERE email = 'user@example.com';

-- Then run the update
-- UPDATE user_profiles SET ... WHERE email = 'user@example.com';

-- ===========================================
-- 💡 USEFUL TIPS
-- ===========================================

-- 1. Always backup before bulk operations
-- 2. Test queries on a small dataset first
-- 3. Use transactions for multiple related updates
-- 4. Check the results with SELECT after UPDATE
-- 5. Be careful with DELETE operations

-- Example transaction for safe bulk update
-- BEGIN;
-- 
-- UPDATE user_profiles 
-- SET subscription_status = 'active' 
-- WHERE email IN ('user1@example.com', 'user2@example.com');
-- 
-- -- Check the results
-- SELECT email, subscription_status FROM user_profiles 
-- WHERE email IN ('user1@example.com', 'user2@example.com');
-- 
-- -- If everything looks good, commit
-- COMMIT;
-- -- If not, rollback
-- -- ROLLBACK;
