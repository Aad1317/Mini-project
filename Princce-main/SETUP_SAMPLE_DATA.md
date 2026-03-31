# 📊 Setup Sample Data - Complete Guide

This guide will help you populate the teacher's dashboard with realistic sample data.

---

## Step 1: Create Teacher Account

First, create the teacher account:

1. Go to http://localhost:5173
2. Click **"Enter as Teacher"**
3. Click **"Create Teacher Account"**
4. Fill in:
   - Full Name: `Teacher Sarthak`
   - Email: `2301420015@krmu.edu.in`
   - Password: `sarthakl1`
5. Click **"Sign Up"** ✅
6. Login with same credentials

---

## Step 2: Add Sample Data

After creating the teacher account, add sample data using one of these methods:

### Method 1: Using Supabase Dashboard (Recommended)

1. Go to **Supabase Dashboard** → Your Project
2. Click **SQL Editor**
3. Click **"New Query"**
4. Copy the entire contents of `add-sample-data.sql` file
5. Paste into the SQL editor
6. Click **"Run"** or press `Ctrl+Enter`
7. ✅ Done! Data created

### Method 2: Manual Copy-Paste

Copy this SQL and run in Supabase SQL Editor:

```sql
[See add-sample-data.sql file]
```

---

## Step 3: Verify Sample Data

After running the script, login as teacher and you'll see:

### Teacher Dashboard Shows:

**6 Stat Cards:**
- My Courses: **3** (CS101, CS201, CS301)
- Total Students: **1** (enrolled in all courses)
- Assignments Created: **6** (2 per course)
- Pending Review: **2** (submissions waiting to grade)
- Graded Submissions: **1** (already graded)
- Today's Classes: **Varies by day** (Monday: 2, Tuesday: 1, etc.)

**Today's Schedule Panel:**
- Shows classes for current day of week
- Example (Monday):
  - 09:00 AM - CS101 - Room 101
  - 02:00 PM - CS201 - Room 203

**Recent Submissions Panel:**
- Shows last 3 student submissions
- With student names and timestamps
- Color-coded status badges

**Action Required Alert:**
- Orange banner showing "2 submissions waiting for review"

---

## What Sample Data Includes:

### 1. Courses (3 courses)
- **CS101** - Computer Science 101 (3 credits)
  - Introduction to Programming
- **CS201** - Data Structures (4 credits)
  - Advanced data structures
- **CS301** - Web Development (3 credits)
  - Full-stack development

### 2. Timetable (7 classes/week)
- **Monday:**
  - 09:00 AM - CS101 (Room 101)
  - 02:00 PM - CS201 (Room 203)
- **Tuesday:**
  - 10:00 AM - CS301 (Room 305)
- **Wednesday:**
  - 09:00 AM - CS101 (Room 101)
  - 11:00 AM - CS201 (Room 203)
- **Thursday:**
  - 02:00 PM - CS301 (Room 305)
- **Friday:**
  - 10:00 AM - CS101 (Room 101)

### 3. Assignments (6 total, 2 per course)

**CS101:**
1. Python Basics Assignment (100 pts, due in 7 days)
2. Data Types Quiz (50 pts, due in 3 days)

**CS201:**
1. Binary Tree Implementation (150 pts, due in 10 days)
2. Graph Algorithms Project (200 pts, due in 14 days)

**CS301:**
1. React Todo App (100 pts, due in 12 days)
2. REST API Design (150 pts, due 2 days ago - overdue!)

### 4. Student Submissions (3 total)
- **REST API Design** - Graded (140/150) with feedback
- **Python Basics Assignment** - Submitted (pending review)
- **Binary Tree Implementation** - Submitted (pending review)

### 5. Attendance Records (18 records)

**CS101 Attendance:** 87.5% (7 present, 1 late out of 8)
**CS201 Attendance:** 66.7% (4 present, 1 late, 1 absent out of 6)
**CS301 Attendance:** 100% (4 present out of 4)

### 6. Announcements (4 total)
1. "Welcome to Fall 2024 Semester" (28 days ago)
2. "Mid-term Exam Schedule" (10 days ago)
3. "Office Hours Updated" (5 days ago)
4. "Project Submission Reminder" (2 days ago)

---

## Step 4: Explore All Features

After data is loaded, navigate through all tabs:

### My Courses Tab:
- See 3 courses with details
- View enrolled students
- Check course statistics

### Mark Attendance Tab:
- Select any course
- See enrolled student
- Mark attendance for today

### Announcements Tab:
- View 4 existing announcements
- Create new ones
- Edit/delete existing

### Assignments Tab:
- See all 6 assignments
- View submission counts
- Create new assignments

### Submissions Tab:
- See 3 submissions
- Grade the 2 pending ones
- View graded submission

### Timetable Tab:
- See 7 weekly classes
- Add/edit/delete entries
- View by day

### Profile Tab:
- View teacher information
- See statistics

---

## Student View

Login as student to see:

**Student Account:**
```
Email: 2301420002@krmu.edu.in
Password: sarthakl1
```

**Student Will See:**
- Enrolled in 3 courses
- Attendance percentages per course
- 6 assignments available
- 3 submitted (1 graded, 2 pending)
- 4 announcements from teacher
- Full timetable

---

## Troubleshooting

### Script says "Teacher account not found"
- Create the teacher account first (Step 1)
- Make sure you used exact email: 2301420015@krmu.edu.in

### No data appearing in dashboard
- Logout and login again
- Hard refresh (Ctrl+Shift+R)
- Check browser console for errors

### Timetable not showing today's classes
- Today's schedule only shows if it's the matching day
- Check on Monday to see 2 classes, Tuesday for 1 class, etc.

### Submission count shows 0
- Make sure student account exists (2301420002@krmu.edu.in)
- Check that enrollments were created
- Run the script again if needed

---

## Resetting Sample Data

To start fresh:

```sql
-- Delete all data for this teacher
DELETE FROM announcements WHERE created_by = (SELECT id FROM profiles WHERE email = '2301420015@krmu.edu.in');
DELETE FROM submissions WHERE assignment_id IN (SELECT id FROM assignments WHERE teacher_id = (SELECT id FROM profiles WHERE email = '2301420015@krmu.edu.in'));
DELETE FROM assignments WHERE teacher_id = (SELECT id FROM profiles WHERE email = '2301420015@krmu.edu.in');
DELETE FROM attendance WHERE marked_by = (SELECT id FROM profiles WHERE email = '2301420015@krmu.edu.in');
DELETE FROM enrollments WHERE course_id IN (SELECT id FROM courses WHERE teacher_id = (SELECT id FROM profiles WHERE email = '2301420015@krmu.edu.in'));
DELETE FROM timetable WHERE teacher_id = (SELECT id FROM profiles WHERE email = '2301420015@krmu.edu.in');
DELETE FROM courses WHERE teacher_id = (SELECT id FROM profiles WHERE email = '2301420015@krmu.edu.in');

-- Then run add-sample-data.sql again
```

---

## 🎉 Done!

Your teacher dashboard is now fully populated with realistic data showing:
- Active courses with students
- Weekly class schedule
- Assignments with submissions
- Attendance tracking
- Recent activity
- Pending work alerts

**Enjoy exploring all the features!** 🚀
