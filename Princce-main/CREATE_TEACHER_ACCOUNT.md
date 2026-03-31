# Create Teacher Account: 2301420015@krmu.edu.in

Since we need admin access to create users, here are two ways to create the teacher account:

---

## Option 1: Use the Signup Form (Recommended)

1. Open http://localhost:5173
2. Click **"Enter as Teacher"**
3. Click **"Create Teacher Account"**
4. Fill in:
   - Full Name: `Teacher Sarthak`
   - Email: `2301420015@krmu.edu.in`
   - Password: `sarthakl1`
5. Click "Sign Up"
6. The profile will be auto-created!
7. Go back and login with the same credentials

✅ **This is the easiest method!**

---

## Option 2: Using Supabase Dashboard

1. Go to Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **Authentication** → **Users**
4. Click **"Add User"**
5. Enter:
   - Email: `2301420015@krmu.edu.in`
   - Password: `sarthakl1`
   - Auto-confirm: ✅ (check this)
6. Click "Create User"
7. Copy the User ID
8. Go to **Table Editor** → **profiles**
9. Click **"Insert Row"**
10. Fill in:
    - id: `[paste user ID]`
    - email: `2301420015@krmu.edu.in`
    - full_name: `Teacher Sarthak`
    - role: `teacher`
    - status: `approved`
11. Click "Save"

✅ **Account is ready!**

---

## Option 3: Use SQL Editor in Supabase

1. Go to Supabase Dashboard → **SQL Editor**
2. Run this query (replace the user_id with actual ID):

```sql
-- First create the auth user in Supabase Dashboard manually
-- Then run this to create the profile:

INSERT INTO profiles (id, email, full_name, role, status)
VALUES (
  '[USER_ID_FROM_AUTH]',
  '2301420015@krmu.edu.in',
  'Teacher Sarthak',
  'teacher',
  'approved'
);
```

---

## Login Credentials

After creating the account using any method above:

**Email:** `2301420015@krmu.edu.in`  
**Password:** `sarthakl1`

---

## What You'll See

After login, the teacher will see:
- Personalized dashboard with name
- 6 stat cards (courses, students, assignments, etc.)
- Today's Schedule panel
- Recent Submissions panel
- Action Required alerts
- Full teacher portal (8 tabs)

---

## Notes

- The auto-trigger creates profiles automatically for new signups
- If using the signup form, profile is created instantly
- If using Supabase Dashboard, you need to create both auth user and profile
- All teacher features will be immediately available
