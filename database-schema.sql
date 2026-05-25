-- ============================================================
-- CSSKRO — Full Database Schema
-- Run this in Supabase SQL Editor
-- Safe to re-run: drops existing tables first
-- ============================================================

-- ── 0. DROP EXISTING TABLES (clean slate) ───────────────────
DROP TABLE IF EXISTS public.essay_submissions CASCADE;
DROP TABLE IF EXISTS public.user_subscriptions CASCADE;
DROP TABLE IF EXISTS public.payments CASCADE;
DROP TABLE IF EXISTS public.subscription_plans CASCADE;
DROP TABLE IF EXISTS public.email_subscribers CASCADE;
DROP TABLE IF EXISTS public.user_profiles CASCADE;

-- Drop existing triggers and functions if they exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP FUNCTION IF EXISTS public.update_updated_at_column();

-- ── 1. USER PROFILES ────────────────────────────────────────
-- Extends Supabase auth.users with app-specific data
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    display_name VARCHAR(255),
    subscription_status VARCHAR(20) DEFAULT 'inactive'
        CHECK (subscription_status IN ('active', 'inactive', 'expired')),
    subscription_expiry TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── 2. SUBSCRIPTION PLANS ───────────────────────────────────
CREATE TABLE public.subscription_plans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'PKR',
    duration_days INTEGER NOT NULL,
    max_essays_per_month INTEGER, -- NULL = unlimited
    features JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── 3. PAYMENTS ─────────────────────────────────────────────
CREATE TABLE public.payments (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'PKR',
    gateway VARCHAR(50) NOT NULL, -- 'stripe', 'easypaisa', 'jazzcash'
    status VARCHAR(20) DEFAULT 'pending'
        CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    gateway_transaction_id VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── 4. USER SUBSCRIPTIONS ───────────────────────────────────
CREATE TABLE public.user_subscriptions (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    plan_id INTEGER REFERENCES public.subscription_plans(id),
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL,
    status VARCHAR(20) DEFAULT 'active'
        CHECK (status IN ('active', 'expired', 'cancelled')),
    payment_id INTEGER REFERENCES public.payments(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── 5. ESSAY SUBMISSIONS ────────────────────────────────────
CREATE TABLE public.essay_submissions (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    essay_text TEXT NOT NULL,
    overall_score INTEGER CHECK (overall_score >= 0 AND overall_score <= 100),
    category_scores JSONB,
    summary_feedback TEXT,
    submission_type VARCHAR(10),
    word_count INTEGER,
    examiner_remarks JSONB,
    processing_time_ms INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── 6. EMAIL SUBSCRIBERS ────────────────────────────────────
CREATE TABLE public.email_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    source VARCHAR(50) DEFAULT 'manual'
        CHECK (source IN ('resources', 'timeline', 'manual')),
    status VARCHAR(20) DEFAULT 'active'
        CHECK (status IN ('active', 'unsubscribed')),
    preferences JSONB DEFAULT '{"deadlines": true, "results": true, "tips": true}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── 7. INDEXES ──────────────────────────────────────────────
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_user_profiles_subscription_status ON public.user_profiles(subscription_status);
CREATE INDEX idx_payments_user_id ON public.payments(user_id);
CREATE INDEX idx_payments_status ON public.payments(status);
CREATE INDEX idx_essay_submissions_user_id ON public.essay_submissions(user_id);
CREATE INDEX idx_essay_submissions_created_at ON public.essay_submissions(created_at);
CREATE INDEX idx_user_subscriptions_user_id ON public.user_subscriptions(user_id);
CREATE INDEX idx_user_subscriptions_status ON public.user_subscriptions(status);
CREATE INDEX idx_email_subscribers_email ON public.email_subscribers(email);

-- ── 8. AUTO-UPDATE updated_at ───────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_payments_updated_at
    BEFORE UPDATE ON public.payments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_user_subscriptions_updated_at
    BEFORE UPDATE ON public.user_subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ── 9. AUTO-CREATE PROFILE ON SIGNUP ────────────────────────
-- Automatically creates a user_profile row when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, display_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', NULL)
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ── 10. ROW LEVEL SECURITY (RLS) ────────────────────────────
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.essay_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;

-- user_profiles: users can read/update only their own profile
CREATE POLICY "Users can view own profile"
    ON public.user_profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.user_profiles FOR UPDATE
    USING (auth.uid() = id);

-- Service role can do everything (for server-side API routes)
CREATE POLICY "Service role full access to user_profiles"
    ON public.user_profiles FOR ALL
    USING (auth.role() = 'service_role');

-- essay_submissions: users can read/insert their own
CREATE POLICY "Users can view own essays"
    ON public.essay_submissions FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own essays"
    ON public.essay_submissions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role full access to essay_submissions"
    ON public.essay_submissions FOR ALL
    USING (auth.role() = 'service_role');

-- payments: users can view their own
CREATE POLICY "Users can view own payments"
    ON public.payments FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Service role full access to payments"
    ON public.payments FOR ALL
    USING (auth.role() = 'service_role');

-- user_subscriptions: users can view their own
CREATE POLICY "Users can view own subscriptions"
    ON public.user_subscriptions FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Service role full access to user_subscriptions"
    ON public.user_subscriptions FOR ALL
    USING (auth.role() = 'service_role');

-- subscription_plans: public read
CREATE POLICY "Anyone can view subscription plans"
    ON public.subscription_plans FOR SELECT
    USING (true);

CREATE POLICY "Service role full access to subscription_plans"
    ON public.subscription_plans FOR ALL
    USING (auth.role() = 'service_role');

-- email_subscribers: service role only
CREATE POLICY "Service role full access to email_subscribers"
    ON public.email_subscribers FOR ALL
    USING (auth.role() = 'service_role');

-- ── 11. SEED SUBSCRIPTION PLANS ─────────────────────────────
INSERT INTO public.subscription_plans (name, description, price, currency, duration_days, max_essays_per_month, features) VALUES
(
    'Basic Monthly',
    'Perfect for getting started with essay checking',
    250.00, 'PKR', 30, 50,
    '["Up to 50 essays per month", "Basic AI feedback", "Grammar & spelling check", "Basic structure analysis", "Email support"]'
),
(
    'Pro Monthly',
    'Advanced features for serious CSS aspirants',
    499.00, 'PKR', 30, NULL,
    '["Unlimited essays", "Advanced AI analysis", "Detailed feedback & suggestions", "Priority processing", "Essay history & analytics", "Progress tracking", "24/7 priority support"]'
),
(
    'Basic Yearly',
    'Basic plan billed yearly — 2 months free',
    2500.00, 'PKR', 365, 600,
    '["Up to 600 essays per year", "Basic AI feedback", "Grammar & spelling check", "Basic structure analysis", "Email support"]'
),
(
    'Pro Yearly',
    'Pro plan billed yearly — 2 months free',
    4990.00, 'PKR', 365, NULL,
    '["Unlimited essays", "Advanced AI analysis", "Detailed feedback & suggestions", "Priority processing", "Essay history & analytics", "Progress tracking", "24/7 priority support"]'
);
