/*
  # Fix Profile RLS Policies - Remove Infinite Recursion

  ## Changes
  1. Drop problematic admin policies that cause infinite recursion
  2. Create simpler policies that work correctly
  3. Users can read their own profile
  4. Users can update their own profile
  
  ## Security
  - Maintains security while removing recursion
  - All users can read their own data
  - Users can only update their own data
*/

-- Drop all existing policies
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can read all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can manage all profiles" ON profiles;

-- Create simple, non-recursive policies
CREATE POLICY "Enable read for own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Enable update for own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable insert for own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);
