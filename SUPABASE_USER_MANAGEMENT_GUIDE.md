# 🗄️ **CSSKRO User Management Through Supabase Dashboard**

## 🎯 **Complete Guide to Manage Free vs Pro Users**

### **🔑 Access Your Supabase Dashboard:**

1. **Visit**: [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. **Sign in** with your Supabase account
3. **Select project**: `yppffxsgtxclvbndjenm` (CSSKRO)

---

## **📊 Method 1: Table Editor (Visual Management)**

### **Step 1: Navigate to Table Editor**
- **Left sidebar** → **Table Editor**
- **Select table**: `user_profiles`

### **Step 2: View All Users**
You'll see a spreadsheet-like interface with all users:
- **Email** - User's email address
- **Subscription Status** - `inactive` (Free), `active` (Pro), `expired`
- **Subscription Expiry** - When Pro membership expires
- **Created At** - When user joined
- **Updated At** - Last status change

### **Step 3: Edit User Status**
1. **Click on any cell** in the `subscription_status` column
2. **Change value** to:
   - `inactive` = Free User
   - `active` = Pro User
   - `expired` = Expired Pro User
3. **Press Enter** to save

### **Step 4: Set Expiry Date (Optional)**
1. **Click on any cell** in the `subscription_expiry` column
2. **Enter date** in format: `2025-12-31 23:59:59+00`
3. **Leave empty** for no expiry (lifetime Pro)

---

## **⚡ Method 2: SQL Editor (Advanced Management)**

### **Step 1: Navigate to SQL Editor**
- **Left sidebar** → **SQL Editor**
- **Click "New Query"**

### **Step 2: Basic Operations**

#### **🔍 View All Users:**
```sql
SELECT * FROM user_profiles ORDER BY created_at DESC;
```

#### **👑 Upgrade User to Pro:**
```sql
UPDATE user_profiles 
SET subscription_status = 'active', 
    subscription_expiry = NULL,
    updated_at = NOW()
WHERE email = 'user@example.com';
```

#### **👤 Downgrade User to Free:**
```sql
UPDATE user_profiles 
SET subscription_status = 'inactive', 
    subscription_expiry = NULL,
    updated_at = NOW()
WHERE email = 'user@example.com';
```

#### **⏰ Set Pro with Expiry:**
```sql
UPDATE user_profiles 
SET subscription_status = 'active', 
    subscription_expiry = '2025-12-31 23:59:59+00',
    updated_at = NOW()
WHERE email = 'user@example.com';
```

### **Step 3: Bulk Operations**

#### **📈 Upgrade Multiple Users to Pro:**
```sql
UPDATE user_profiles 
SET subscription_status = 'active', 
    subscription_expiry = NULL,
    updated_at = NOW()
WHERE email IN (
    'user1@example.com',
    'user2@example.com',
    'user3@example.com'
);
```

#### **📉 Downgrade Multiple Users to Free:**
```sql
UPDATE user_profiles 
SET subscription_status = 'inactive', 
    subscription_expiry = NULL,
    updated_at = NOW()
WHERE email IN (
    'user1@example.com',
    'user2@example.com',
    'user3@example.com'
);
```

---

## **📊 Method 3: Authentication Panel**

### **Step 1: Navigate to Authentication**
- **Left sidebar** → **Authentication** → **Users**

### **Step 2: View User Details**
You'll see:
- **User ID** - Unique identifier
- **Email** - User's email
- **Created At** - When account was created
- **Last Sign In** - Last login time
- **User Metadata** - Google OAuth info

### **Step 3: Manage User Access**
- **Disable User** - Prevent login
- **Delete User** - Remove account completely
- **View Details** - See full user information

---

## **🎯 Common Management Scenarios**

### **Scenario 1: Give Free Trial to New User**
```sql
-- Give 7-day free trial
UPDATE user_profiles 
SET subscription_status = 'active', 
    subscription_expiry = NOW() + INTERVAL '7 days',
    updated_at = NOW()
WHERE email = 'newuser@example.com';
```

### **Scenario 2: Extend Pro User by 1 Month**
```sql
-- Extend existing Pro user
UPDATE user_profiles 
SET subscription_expiry = COALESCE(subscription_expiry, NOW()) + INTERVAL '1 month',
    updated_at = NOW()
WHERE email = 'prouser@example.com' 
  AND subscription_status = 'active';
```

### **Scenario 3: Downgrade Expired Users**
```sql
-- Auto-downgrade expired Pro users
UPDATE user_profiles 
SET subscription_status = 'inactive',
    updated_at = NOW()
WHERE subscription_status = 'active' 
  AND subscription_expiry < NOW();
```

### **Scenario 4: Bulk Upgrade Based on Criteria**
```sql
-- Upgrade all users who joined in last 30 days
UPDATE user_profiles 
SET subscription_status = 'active', 
    subscription_expiry = NOW() + INTERVAL '1 year',
    updated_at = NOW()
WHERE created_at > NOW() - INTERVAL '30 days'
  AND subscription_status = 'inactive';
```

---

## **📈 Monitoring and Analytics**

### **User Statistics:**
```sql
-- Count by status
SELECT 
    subscription_status,
    COUNT(*) as user_count,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM user_profiles), 2) as percentage
FROM user_profiles 
GROUP BY subscription_status
ORDER BY user_count DESC;
```

### **Conversion Rate:**
```sql
-- Pro user conversion rate
SELECT 
    COUNT(*) as total_users,
    COUNT(CASE WHEN subscription_status = 'active' THEN 1 END) as pro_users,
    ROUND(COUNT(CASE WHEN subscription_status = 'active' THEN 1 END) * 100.0 / COUNT(*), 2) as conversion_rate
FROM user_profiles;
```

### **Expiring Soon:**
```sql
-- Users with expiring subscriptions (next 7 days)
SELECT 
    email,
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
```

---

## **🚨 Safety Best Practices**

### **1. Always Backup First:**
```sql
-- Create backup before major changes
CREATE TABLE user_profiles_backup AS 
SELECT * FROM user_profiles;
```

### **2. Test on Small Dataset:**
```sql
-- Test your query on 1 user first
SELECT * FROM user_profiles WHERE email = 'test@example.com';
UPDATE user_profiles SET subscription_status = 'active' WHERE email = 'test@example.com';
```

### **3. Use Transactions:**
```sql
BEGIN;

UPDATE user_profiles 
SET subscription_status = 'active' 
WHERE email = 'user@example.com';

-- Check the result
SELECT * FROM user_profiles WHERE email = 'user@example.com';

-- If everything looks good
COMMIT;

-- If not, rollback
-- ROLLBACK;
```

### **4. Verify Changes:**
```sql
-- Always verify after updates
SELECT email, subscription_status, subscription_expiry 
FROM user_profiles 
WHERE email = 'user@example.com';
```

---

## **💡 Pro Tips**

### **1. Quick Status Check:**
```sql
-- Quick overview of all users
SELECT 
    email,
    CASE subscription_status
        WHEN 'active' THEN '👑 Pro'
        WHEN 'inactive' THEN '👤 Free'
        WHEN 'expired' THEN '⏰ Expired'
    END as status,
    subscription_expiry
FROM user_profiles 
ORDER BY subscription_status, created_at DESC;
```

### **2. Auto-Expiry Maintenance:**
```sql
-- Run this daily to auto-expire users
UPDATE user_profiles 
SET subscription_status = 'expired',
    updated_at = NOW()
WHERE subscription_status = 'active' 
  AND subscription_expiry IS NOT NULL 
  AND subscription_expiry < NOW();
```

### **3. Email Pattern Management:**
```sql
-- Upgrade all Gmail users (example)
UPDATE user_profiles 
SET subscription_status = 'active',
    subscription_expiry = NOW() + INTERVAL '1 year',
    updated_at = NOW()
WHERE email LIKE '%@gmail.com%'
  AND subscription_status = 'inactive';
```

---

## **🎯 Summary of Management Options**

| Method | Best For | Difficulty | Speed |
|--------|----------|------------|-------|
| **Table Editor** | Individual users, visual management | Easy | Fast |
| **SQL Editor** | Bulk operations, complex queries | Medium | Very Fast |
| **Authentication Panel** | Account management, security | Easy | Medium |

### **🚀 Recommended Workflow:**

1. **Daily**: Use Table Editor for individual user changes
2. **Weekly**: Use SQL Editor for bulk operations and maintenance
3. **Monthly**: Use SQL Editor for analytics and reporting
4. **As Needed**: Use Authentication Panel for security issues

---

## **🔧 Need Help?**

### **Common Issues:**
- **"Relation does not exist"** → Run the setup SQL script first
- **"Permission denied"** → Check your Supabase role permissions
- **"Update failed"** → Verify the email exists in the table

### **Support:**
- **Supabase Docs**: [https://supabase.com/docs](https://supabase.com/docs)
- **SQL Reference**: [https://www.postgresql.org/docs/](https://www.postgresql.org/docs/)

---

**🎉 You now have complete control over CSSKRO user management through Supabase!**
