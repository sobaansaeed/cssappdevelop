-- CSSKRO Essay Checker Database Schema
-- This file contains the SQL schema for the essay checker feature

-- Users table to store user accounts
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    subscription_status VARCHAR(20) DEFAULT 'inactive' CHECK (subscription_status IN ('active', 'inactive', 'expired')),
    subscription_expiry TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments table to track subscription payments
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'PKR',
    gateway VARCHAR(50) NOT NULL, -- 'stripe', 'payfast', 'easypaisa', 'jazzcash'
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    gateway_transaction_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Essay submissions table to track user essays
CREATE TABLE essay_submissions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    essay_text TEXT NOT NULL,
    corrected_text TEXT,
    score INTEGER CHECK (score >= 0 AND score <= 100),
    mistakes JSONB, -- Store mistakes as JSON
    suggestions JSONB, -- Store suggestions as JSON
    processing_time_ms INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subscription plans table
CREATE TABLE subscription_plans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'PKR',
    duration_days INTEGER NOT NULL,
    max_essays_per_month INTEGER,
    features JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User subscriptions table
CREATE TABLE user_subscriptions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    plan_id INTEGER REFERENCES subscription_plans(id),
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled')),
    payment_id INTEGER REFERENCES payments(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_subscription_status ON users(subscription_status);
CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_essay_submissions_user_id ON essay_submissions(user_id);
CREATE INDEX idx_essay_submissions_created_at ON essay_submissions(created_at);
CREATE INDEX idx_user_subscriptions_user_id ON user_subscriptions(user_id);
CREATE INDEX idx_user_subscriptions_status ON user_subscriptions(status);

-- Insert default subscription plans
INSERT INTO subscription_plans (name, description, price, currency, duration_days, max_essays_per_month, features) VALUES
('Basic Monthly', 'Basic monthly subscription for essay checking', 999.00, 'PKR', 30, 50, '["Grammar Check", "Spelling Check", "Basic Suggestions"]'),
('Pro Monthly', 'Professional monthly subscription with unlimited essays', 1999.00, 'PKR', 30, -1, '["Grammar Check", "Spelling Check", "Advanced Suggestions", "Structure Analysis", "CSS-Specific Feedback", "Priority Support"]'),
('Basic Yearly', 'Basic yearly subscription with 2 months free', 9999.00, 'PKR', 365, 600, '["Grammar Check", "Spelling Check", "Basic Suggestions"]'),
('Pro Yearly', 'Professional yearly subscription with 2 months free', 19999.00, 'PKR', 365, -1, '["Grammar Check", "Spelling Check", "Advanced Suggestions", "Structure Analysis", "CSS-Specific Feedback", "Priority Support"]');

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_subscriptions_updated_at BEFORE UPDATE ON user_subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
