import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables!');
  console.error('VITE_SUPABASE_URL:', supabaseUrl ? 'Set' : 'Missing');
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Set' : 'Missing');
  console.error('Please add these environment variables in Vercel dashboard');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

export type Profile = {
  id: string;
  email: string;
  full_name: string;
  role: 'student' | 'teacher' | 'admin';
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
};

export type Announcement = {
  id: string;
  title: string;
  content: string;
  teacher_id: string;
  target_role: 'all' | 'student' | 'teacher';
  created_at: string;
  updated_at: string;
};

export type Assignment = {
  id: string;
  title: string;
  description: string;
  teacher_id: string;
  due_date: string;
  total_points: number;
  created_at: string;
  updated_at: string;
};

export type Submission = {
  id: string;
  assignment_id: string;
  student_id: string;
  file_url: string | null;
  file_name: string | null;
  status: 'submitted' | 'graded';
  grade: number | null;
  feedback: string | null;
  submitted_at: string;
  graded_at: string | null;
};

export type Timetable = {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  time: string;
  subject: string;
  teacher_id: string | null;
  room: string | null;
  created_at: string;
  updated_at: string;
};

export type Course = {
  id: string;
  name: string;
  code: string;
  description: string;
  teacher_id: string | null;
  credits: number;
  semester: string;
  created_at: string;
  updated_at: string;
};

export type Enrollment = {
  id: string;
  course_id: string;
  student_id: string;
  enrolled_at: string;
};

export type Attendance = {
  id: string;
  course_id: string;
  student_id: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  marked_by: string | null;
  created_at: string;
};
