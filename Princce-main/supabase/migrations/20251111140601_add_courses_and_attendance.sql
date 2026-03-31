/*
  # Add Courses and Attendance Features

  ## New Tables

  1. `courses`
    - `id` (uuid, primary key)
    - `name` (text) - Course name
    - `code` (text) - Course code (e.g., CS101)
    - `description` (text) - Course description
    - `teacher_id` (uuid) - References profiles
    - `credits` (integer) - Number of credits
    - `semester` (text) - Current semester
    - `created_at` (timestamptz)
    - `updated_at` (timestamptz)

  2. `enrollments`
    - `id` (uuid, primary key)
    - `course_id` (uuid) - References courses
    - `student_id` (uuid) - References profiles
    - `enrolled_at` (timestamptz)
    - Unique constraint on (course_id, student_id)

  3. `attendance`
    - `id` (uuid, primary key)
    - `course_id` (uuid) - References courses
    - `student_id` (uuid) - References profiles
    - `date` (date) - Attendance date
    - `status` (text) - 'present', 'absent', 'late'
    - `marked_by` (uuid) - Teacher who marked attendance
    - `created_at` (timestamptz)
    - Unique constraint on (course_id, student_id, date)

  ## Security
    - Enable RLS on all tables
    - Students can view their own courses and attendance
    - Teachers can view/edit courses they teach and mark attendance
    - Admins have full access
*/

CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text NOT NULL UNIQUE,
  description text DEFAULT '',
  teacher_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  credits integer DEFAULT 3,
  semester text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  enrolled_at timestamptz DEFAULT now(),
  UNIQUE(course_id, student_id)
);

CREATE TABLE IF NOT EXISTS attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  date date NOT NULL DEFAULT CURRENT_DATE,
  status text NOT NULL DEFAULT 'absent' CHECK (status IN ('present', 'absent', 'late')),
  marked_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(course_id, student_id, date)
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their enrolled courses"
  ON courses FOR SELECT
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT student_id FROM enrollments WHERE course_id = courses.id
    )
    OR auth.uid() = teacher_id
    OR EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Teachers can update their courses"
  ON courses FOR UPDATE
  TO authenticated
  USING (auth.uid() = teacher_id OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'))
  WITH CHECK (auth.uid() = teacher_id OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Teachers and admins can create courses"
  ON courses FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin'))
  );

CREATE POLICY "Admins can delete courses"
  ON courses FOR DELETE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Students can view their enrollments"
  ON enrollments FOR SELECT
  TO authenticated
  USING (
    auth.uid() = student_id
    OR EXISTS (
      SELECT 1 FROM courses WHERE id = course_id AND teacher_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Students can enroll in courses"
  ON enrollments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can unenroll from courses"
  ON enrollments FOR DELETE
  TO authenticated
  USING (auth.uid() = student_id);

CREATE POLICY "Students can view their attendance"
  ON attendance FOR SELECT
  TO authenticated
  USING (
    auth.uid() = student_id
    OR EXISTS (
      SELECT 1 FROM courses WHERE id = course_id AND teacher_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Teachers can mark attendance for their courses"
  ON attendance FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM courses WHERE id = course_id AND teacher_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Teachers can update attendance for their courses"
  ON attendance FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM courses WHERE id = course_id AND teacher_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM courses WHERE id = course_id AND teacher_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE INDEX IF NOT EXISTS idx_courses_teacher ON courses(teacher_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_student ON enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_attendance_student ON attendance(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_course ON attendance(course_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance(date);
