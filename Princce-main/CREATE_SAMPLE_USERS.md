# Create Sample User Accounts

Since you want both student and teacher accounts with the same credentials, you can create them through the app's signup flow.

## Method 1: Through the Application (Easiest)

### Create Student Account:
1. Open http://localhost:5173
2. Click **"Enter as Student"**
3. Click **"Create Student Account"**
4. Fill in:
   - **Full Name**: Sarthak
   - **Email**: 2301420002@krmu.edu.in
   - **Password**: sarthakl1
5. Click **"Sign Up"**
6. Then login with those credentials

### Create Teacher Account:
1. Go back to home page (or open in incognito)
2. Click **"Enter as Teacher"**
3. Click **"Create Teacher Account"**
4. Fill in:
   - **Full Name**: Sarthak Teacher
   - **Email**: teacher_2301420002@krmu.edu.in
   - **Password**: sarthakl1
5. Click **"Sign Up"**
6. Then login with those credentials

## Method 2: Direct SQL (If you have Supabase access)

If you have access to your Supabase SQL editor, you can run this:

```sql
-- Note: This requires Supabase Auth API access
-- It's easier to just use the signup form in the app
```

## Login Credentials

### Student:
- **Email**: 2301420002@krmu.edu.in
- **Password**: sarthakl1
- **Role**: Student

### Teacher:
- **Email**: teacher_2301420002@krmu.edu.in
  (or use the same email if you created via different portals)
- **Password**: sarthakl1
- **Role**: Teacher

---

**Note**: The system allows any email to register. Just use the signup forms in the app - they're quick and easy!

You can create as many accounts as you want through the Student and Teacher signup pages.
