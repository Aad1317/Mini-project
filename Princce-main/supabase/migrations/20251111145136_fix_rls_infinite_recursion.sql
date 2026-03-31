/*
  # Fix Infinite Recursion in RLS Policies

  1. Problem
    - Attendance queries with courses join cause infinite recursion
    - Courses SELECT policy checks enrollments, which may check courses again
  
  2. Solution
    - Simplify courses SELECT policy to avoid circular dependencies
    - Make policies more direct without nested subqueries where possible
    
  3. Changes
    - Drop and recreate courses SELECT policy with simpler logic
    - Ensure no circular dependencies between tables
*/

-- Drop the problematic policy
DROP POLICY IF EXISTS "Students can view their enrolled courses" ON courses;

-- Create a simpler policy without circular dependencies
CREATE POLICY "Users can view relevant courses"
  ON courses
  FOR SELECT
  TO authenticated
  USING (
    -- Teachers can see their own courses
    auth.uid() = teacher_id
    OR
    -- Students can see courses they're enrolled in (direct check, no recursion)
    auth.uid() IN (
      SELECT student_id 
      FROM enrollments 
      WHERE course_id = courses.id
    )
    OR
    -- Admins can see all courses
    EXISTS (
      SELECT 1 
      FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
