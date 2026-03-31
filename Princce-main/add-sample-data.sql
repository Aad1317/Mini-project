-- Sample Data for Teacher Dashboard
-- Run this AFTER creating the teacher account (2301420015@krmu.edu.in)

-- This script will:
-- 1. Create 3 sample courses
-- 2. Add weekly timetable entries
-- 3. Create 6 assignments (2 per course)
-- 4. Add student enrollments
-- 5. Create sample submissions
-- 6. Add attendance records
-- 7. Create announcements

-- Note: Replace 'TEACHER_ID_HERE' with actual teacher ID after signup
-- You can get it by: SELECT id FROM profiles WHERE email = '2301420015@krmu.edu.in';

-- Variables (replace these with actual IDs)
DO $$
DECLARE
  v_teacher_id uuid;
  v_student_id uuid;
  v_course1_id uuid;
  v_course2_id uuid;
  v_course3_id uuid;
  v_assignment1_id uuid;
  v_assignment2_id uuid;
  v_assignment3_id uuid;
BEGIN
  -- Get teacher ID
  SELECT id INTO v_teacher_id FROM profiles WHERE email = '2301420015@krmu.edu.in';
  
  -- Get student ID
  SELECT id INTO v_student_id FROM profiles WHERE email = '2301420002@krmu.edu.in';
  
  -- Exit if teacher doesn't exist
  IF v_teacher_id IS NULL THEN
    RAISE NOTICE 'Teacher account not found. Please create account first: 2301420015@krmu.edu.in';
    RETURN;
  END IF;
  
  RAISE NOTICE 'Creating sample data for teacher: %', v_teacher_id;
  
  -- 1. Create Courses
  INSERT INTO courses (id, name, code, description, credits, semester, teacher_id, created_at)
  VALUES 
    (gen_random_uuid(), 'Computer Science 101', 'CS101', 'Introduction to Programming - Learn Python basics, data structures, and algorithms', 3, 'Fall 2024', v_teacher_id, NOW() - INTERVAL '30 days'),
    (gen_random_uuid(), 'Data Structures', 'CS201', 'Advanced data structures including trees, graphs, hash tables and complexity analysis', 4, 'Fall 2024', v_teacher_id, NOW() - INTERVAL '25 days'),
    (gen_random_uuid(), 'Web Development', 'CS301', 'Full-stack web development with React, Node.js, and databases', 3, 'Fall 2024', v_teacher_id, NOW() - INTERVAL '20 days')
  ON CONFLICT DO NOTHING;
  
  RAISE NOTICE 'Created 3 courses';
  
  -- Get course IDs
  SELECT id INTO v_course1_id FROM courses WHERE code = 'CS101' AND teacher_id = v_teacher_id LIMIT 1;
  SELECT id INTO v_course2_id FROM courses WHERE code = 'CS201' AND teacher_id = v_teacher_id LIMIT 1;
  SELECT id INTO v_course3_id FROM courses WHERE code = 'CS301' AND teacher_id = v_teacher_id LIMIT 1;
  
  -- 2. Create Timetable
  INSERT INTO timetable (day, time, subject, room, teacher_id, course_id, created_at)
  VALUES 
    ('Monday', '09:00 AM', 'CS101 - Introduction to Programming', '101', v_teacher_id, v_course1_id, NOW()),
    ('Monday', '02:00 PM', 'CS201 - Data Structures', '203', v_teacher_id, v_course2_id, NOW()),
    ('Tuesday', '10:00 AM', 'CS301 - Web Development', '305', v_teacher_id, v_course3_id, NOW()),
    ('Wednesday', '09:00 AM', 'CS101 - Introduction to Programming', '101', v_teacher_id, v_course1_id, NOW()),
    ('Wednesday', '11:00 AM', 'CS201 - Data Structures', '203', v_teacher_id, v_course2_id, NOW()),
    ('Thursday', '02:00 PM', 'CS301 - Web Development', '305', v_teacher_id, v_course3_id, NOW()),
    ('Friday', '10:00 AM', 'CS101 - Introduction to Programming', '101', v_teacher_id, v_course1_id, NOW())
  ON CONFLICT DO NOTHING;
  
  RAISE NOTICE 'Created 7 timetable entries';
  
  -- 3. Enroll student in courses
  IF v_student_id IS NOT NULL THEN
    INSERT INTO enrollments (student_id, course_id, enrolled_at)
    VALUES 
      (v_student_id, v_course1_id, NOW() - INTERVAL '28 days'),
      (v_student_id, v_course2_id, NOW() - INTERVAL '23 days'),
      (v_student_id, v_course3_id, NOW() - INTERVAL '18 days')
    ON CONFLICT DO NOTHING;
    
    RAISE NOTICE 'Enrolled student in 3 courses';
  END IF;
  
  -- 4. Create Assignments
  INSERT INTO assignments (id, course_id, teacher_id, title, description, due_date, total_points, created_at)
  VALUES 
    (gen_random_uuid(), v_course1_id, v_teacher_id, 'Python Basics Assignment', 'Complete exercises on variables, loops, and functions. Submit a Python file with all solutions.', NOW() + INTERVAL '7 days', 100, NOW() - INTERVAL '5 days'),
    (gen_random_uuid(), v_course1_id, v_teacher_id, 'Data Types Quiz', 'Online quiz covering strings, lists, dictionaries, and tuples.', NOW() + INTERVAL '3 days', 50, NOW() - INTERVAL '2 days'),
    (gen_random_uuid(), v_course2_id, v_teacher_id, 'Binary Tree Implementation', 'Implement a binary search tree with insert, delete, and search operations.', NOW() + INTERVAL '10 days', 150, NOW() - INTERVAL '6 days'),
    (gen_random_uuid(), v_course2_id, v_teacher_id, 'Graph Algorithms Project', 'Implement Dijkstra and BFS algorithms. Include test cases and documentation.', NOW() + INTERVAL '14 days', 200, NOW() - INTERVAL '3 days'),
    (gen_random_uuid(), v_course3_id, v_teacher_id, 'React Todo App', 'Build a todo application using React with add, edit, delete functionality.', NOW() + INTERVAL '12 days', 100, NOW() - INTERVAL '7 days'),
    (gen_random_uuid(), v_course3_id, v_teacher_id, 'REST API Design', 'Create a RESTful API with Express.js for a blog application.', NOW() - INTERVAL '2 days', 150, NOW() - INTERVAL '12 days')
  ON CONFLICT DO NOTHING;
  
  RAISE NOTICE 'Created 6 assignments';
  
  -- Get assignment IDs for submissions
  SELECT id INTO v_assignment1_id FROM assignments WHERE title = 'Python Basics Assignment' AND teacher_id = v_teacher_id LIMIT 1;
  SELECT id INTO v_assignment2_id FROM assignments WHERE title = 'Binary Tree Implementation' AND teacher_id = v_teacher_id LIMIT 1;
  SELECT id INTO v_assignment3_id FROM assignments WHERE title = 'REST API Design' AND teacher_id = v_teacher_id LIMIT 1;
  
  -- 5. Create Submissions
  IF v_student_id IS NOT NULL THEN
    INSERT INTO submissions (assignment_id, student_id, file_url, status, submitted_at, grade, feedback)
    VALUES 
      (v_assignment3_id, v_student_id, 'https://example.com/submission1.pdf', 'graded', NOW() - INTERVAL '1 day', 140, 'Excellent work! Your API design is clean and well-documented. Minor improvements needed in error handling.'),
      (v_assignment1_id, v_student_id, 'https://example.com/submission2.pdf', 'submitted', NOW() - INTERVAL '6 hours', NULL, NULL),
      (v_assignment2_id, v_student_id, 'https://example.com/submission3.pdf', 'submitted', NOW() - INTERVAL '3 hours', NULL, NULL)
    ON CONFLICT DO NOTHING;
    
    RAISE NOTICE 'Created 3 submissions (1 graded, 2 pending)';
  END IF;
  
  -- 6. Create Attendance Records
  IF v_student_id IS NOT NULL THEN
    INSERT INTO attendance (student_id, course_id, date, status, marked_by, created_at)
    VALUES 
      -- CS101 attendance (good attendance - 8 classes, 7 present, 1 late)
      (v_student_id, v_course1_id, CURRENT_DATE - 20, 'present', v_teacher_id, NOW() - INTERVAL '20 days'),
      (v_student_id, v_course1_id, CURRENT_DATE - 18, 'present', v_teacher_id, NOW() - INTERVAL '18 days'),
      (v_student_id, v_course1_id, CURRENT_DATE - 15, 'present', v_teacher_id, NOW() - INTERVAL '15 days'),
      (v_student_id, v_course1_id, CURRENT_DATE - 13, 'late', v_teacher_id, NOW() - INTERVAL '13 days'),
      (v_student_id, v_course1_id, CURRENT_DATE - 10, 'present', v_teacher_id, NOW() - INTERVAL '10 days'),
      (v_student_id, v_course1_id, CURRENT_DATE - 8, 'present', v_teacher_id, NOW() - INTERVAL '8 days'),
      (v_student_id, v_course1_id, CURRENT_DATE - 5, 'present', v_teacher_id, NOW() - INTERVAL '5 days'),
      (v_student_id, v_course1_id, CURRENT_DATE - 3, 'present', v_teacher_id, NOW() - INTERVAL '3 days'),
      -- CS201 attendance (6 classes, 4 present, 1 late, 1 absent)
      (v_student_id, v_course2_id, CURRENT_DATE - 19, 'present', v_teacher_id, NOW() - INTERVAL '19 days'),
      (v_student_id, v_course2_id, CURRENT_DATE - 16, 'absent', v_teacher_id, NOW() - INTERVAL '16 days'),
      (v_student_id, v_course2_id, CURRENT_DATE - 12, 'present', v_teacher_id, NOW() - INTERVAL '12 days'),
      (v_student_id, v_course2_id, CURRENT_DATE - 9, 'present', v_teacher_id, NOW() - INTERVAL '9 days'),
      (v_student_id, v_course2_id, CURRENT_DATE - 5, 'late', v_teacher_id, NOW() - INTERVAL '5 days'),
      (v_student_id, v_course2_id, CURRENT_DATE - 2, 'present', v_teacher_id, NOW() - INTERVAL '2 days'),
      -- CS301 attendance (4 classes, all present)
      (v_student_id, v_course3_id, CURRENT_DATE - 14, 'present', v_teacher_id, NOW() - INTERVAL '14 days'),
      (v_student_id, v_course3_id, CURRENT_DATE - 11, 'present', v_teacher_id, NOW() - INTERVAL '11 days'),
      (v_student_id, v_course3_id, CURRENT_DATE - 7, 'present', v_teacher_id, NOW() - INTERVAL '7 days'),
      (v_student_id, v_course3_id, CURRENT_DATE - 4, 'present', v_teacher_id, NOW() - INTERVAL '4 days')
    ON CONFLICT DO NOTHING;
    
    RAISE NOTICE 'Created 18 attendance records';
  END IF;
  
  -- 7. Create Announcements
  INSERT INTO announcements (title, content, target_audience, created_by, created_at)
  VALUES 
    ('Welcome to Fall 2024 Semester', 'Welcome everyone! Looking forward to an exciting semester. Please check the syllabus and timetable.', 'students', v_teacher_id, NOW() - INTERVAL '28 days'),
    ('Mid-term Exam Schedule', 'Mid-term exams will be held next week. CS101: Monday 9 AM, CS201: Wednesday 2 PM, CS301: Friday 10 AM', 'students', v_teacher_id, NOW() - INTERVAL '10 days'),
    ('Office Hours Updated', 'My office hours are now Monday and Wednesday 3-5 PM in Room 401. Feel free to drop by for any questions.', 'students', v_teacher_id, NOW() - INTERVAL '5 days'),
    ('Project Submission Reminder', 'Reminder: Graph Algorithms project is due next week. Make sure to include proper documentation and test cases.', 'students', v_teacher_id, NOW() - INTERVAL '2 days')
  ON CONFLICT DO NOTHING;
  
  RAISE NOTICE 'Created 4 announcements';
  
  RAISE NOTICE '=== SAMPLE DATA CREATED SUCCESSFULLY ===';
  RAISE NOTICE 'Teacher Dashboard will show:';
  RAISE NOTICE '- 3 Courses';
  RAISE NOTICE '- 1 Student enrolled';
  RAISE NOTICE '- 6 Assignments (2 per course)';
  RAISE NOTICE '- 3 Submissions (2 pending review, 1 graded)';
  RAISE NOTICE '- 7 Weekly classes in timetable';
  RAISE NOTICE '- 18 Attendance records';
  RAISE NOTICE '- 4 Announcements';
  
END $$;
