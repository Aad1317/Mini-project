/*
  # Auto-create Profile Trigger

  ## Purpose
  Automatically create a profile entry when a new user signs up in auth.users
  This prevents the "stuck loading" issue when profiles don't exist

  ## Changes
  1. Create function to auto-create profile
  2. Create trigger on auth.users INSERT
  3. Extracts role from user metadata or defaults to 'student'

  ## Security
  - Function runs with SECURITY DEFINER to bypass RLS
  - Only creates profile if it doesn't exist
  - Sets default status to 'approved'
*/

-- Function to auto-create profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, status)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')::text,
    'approved'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
