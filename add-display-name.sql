-- Add display_name column to existing user_profiles table
-- Run this in your Supabase SQL editor if you already have the table

-- Add the display_name column
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS display_name TEXT;

-- Update existing profiles to have a display_name based on email
UPDATE public.user_profiles 
SET display_name = COALESCE(
    display_name, 
    SPLIT_PART(email, '@', 1)
)
WHERE display_name IS NULL;

-- Make sure the column is not null for future inserts
ALTER TABLE public.user_profiles 
ALTER COLUMN display_name SET NOT NULL;

-- Set default value for future inserts
ALTER TABLE public.user_profiles 
ALTER COLUMN display_name SET DEFAULT SPLIT_PART(email, '@', 1);
