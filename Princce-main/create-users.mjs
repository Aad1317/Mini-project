import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://plslnsqlpdhyfghfvbpk.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsc2xuc3FscGRoeWZnaGZ2YnBrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjYxOTI4NCwiZXhwIjoyMDc4MTk1Mjg0fQ.Pm7N_X81x5gYhVlN0fKj_lLgb-T-VnBLYurvjajJiGc';

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createTeacherAccount() {
  const email = '2301420015@krmu.edu.in';
  const password = 'sarthakl1';
  const fullName = 'Teacher Sarthak';
  const role = 'teacher';

  console.log(`Creating teacher account: ${email}...`);

  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: email,
    password: password,
    email_confirm: true,
    user_metadata: {
      full_name: fullName,
      role: role
    }
  });

  if (authError) {
    console.error('Error creating auth user:', authError.message);
    return;
  }

  console.log('✅ Auth user created:', authData.user.id);

  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .insert({
      id: authData.user.id,
      email: email,
      full_name: fullName,
      role: role,
      status: 'approved'
    })
    .select()
    .single();

  if (profileError) {
    console.error('Error creating profile:', profileError.message);
    return;
  }

  console.log('✅ Profile created:', profileData);
  console.log('\n🎉 Teacher account ready!');
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);
}

createTeacherAccount().catch(console.error);
