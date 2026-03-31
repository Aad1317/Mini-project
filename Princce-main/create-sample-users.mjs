import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://plslnsqlpdhyfghfvbpk.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsc2xuc3FscGRoeWZnaGZ2YnBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MTkyODQsImV4cCI6MjA3ODE5NTI4NH0.I1QMKmZ9VutZC3QL8GhUfHMz5atEbgxRdu4E7l-jOXE';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createTeacherAccount() {
  console.log('Creating teacher account via signup...');
  
  const email = '2301420015@krmu.edu.in';
  const password = 'sarthakl1';
  const fullName = 'Teacher Sarthak';
  
  // Sign up the teacher
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        full_name: fullName,
        role: 'teacher'
      }
    }
  });
  
  if (error) {
    console.error('Error:', error.message);
    return null;
  }
  
  console.log('✅ Teacher account created:', data.user?.id);
  console.log('Email:', email);
  console.log('Password:', password);
  
  return data.user?.id;
}

createTeacherAccount().catch(console.error);
