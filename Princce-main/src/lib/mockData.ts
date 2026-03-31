export const mockCourses = [
  {
    id: '1',
    name: 'Introduction to Programming',
    code: 'CS101',
    description: 'Learn the basics of programming',
    teacher_id: 'teacher-1',
    teacher_name: 'Prof. Smith',
    credits: 3,
    semester: 'Fall 2024',
    enrollment_count: 45
  },
  {
    id: '2',
    name: 'Data Structures',
    code: 'CS201',
    description: 'Advanced data structures and algorithms',
    teacher_id: 'teacher-1',
    teacher_name: 'Prof. Smith',
    credits: 4,
    semester: 'Fall 2024',
    enrollment_count: 38
  },
  {
    id: '3',
    name: 'Web Development',
    code: 'CS301',
    description: 'Modern web development with React',
    teacher_id: 'teacher-1',
    teacher_name: 'Prof. Johnson',
    credits: 3,
    semester: 'Fall 2024',
    enrollment_count: 52
  }
];

export const mockAssignments = [
  {
    id: '1',
    title: 'JavaScript Basics',
    description: 'Complete the JavaScript exercises',
    course: 'CS101',
    due_date: '2024-12-20',
    total_points: 100,
    status: 'pending',
    submitted: false
  },
  {
    id: '2',
    title: 'React Components',
    description: 'Build a todo list app',
    course: 'CS301',
    due_date: '2024-12-25',
    total_points: 100,
    status: 'pending',
    submitted: false
  },
  {
    id: '3',
    title: 'Binary Trees',
    description: 'Implement binary tree traversal',
    course: 'CS201',
    due_date: '2024-12-15',
    total_points: 100,
    status: 'graded',
    submitted: true,
    grade: 95
  }
];

export const mockSubmissions = [
  {
    id: '1',
    assignment_id: '3',
    assignment_title: 'Binary Trees',
    student_name: 'John Doe',
    student_email: 'john@example.com',
    submitted_at: '2024-12-10',
    status: 'graded',
    grade: 95
  },
  {
    id: '2',
    assignment_id: '1',
    assignment_title: 'JavaScript Basics',
    student_name: 'Jane Smith',
    student_email: 'jane@example.com',
    submitted_at: '2024-12-18',
    status: 'pending',
    grade: null
  },
  {
    id: '3',
    assignment_id: '1',
    assignment_title: 'JavaScript Basics',
    student_name: 'Bob Wilson',
    student_email: 'bob@example.com',
    submitted_at: '2024-12-19',
    status: 'pending',
    grade: null
  }
];

export const mockAnnouncements = [
  {
    id: '1',
    title: 'Welcome to Fall 2024',
    content: 'Welcome everyone! Looking forward to a great semester.',
    created_at: '2024-12-01',
    author: 'Prof. Smith'
  },
  {
    id: '2',
    title: 'Exam Schedule Released',
    content: 'Final exam schedule has been posted. Check your courses.',
    created_at: '2024-12-05',
    author: 'Admin'
  },
  {
    id: '3',
    title: 'Holiday Break',
    content: 'Classes will resume on January 8th. Happy holidays!',
    created_at: '2024-12-10',
    author: 'Admin'
  }
];

export const mockTimetable = [
  { id: '1', day: 'Monday', time: '09:00 AM', subject: 'CS101 - Programming', room: 'Room 101' },
  { id: '2', day: 'Monday', time: '11:00 AM', subject: 'CS201 - Data Structures', room: 'Room 102' },
  { id: '3', day: 'Tuesday', time: '10:00 AM', subject: 'CS301 - Web Dev', room: 'Room 201' },
  { id: '4', day: 'Wednesday', time: '09:00 AM', subject: 'CS101 - Programming', room: 'Room 101' },
  { id: '5', day: 'Thursday', time: '11:00 AM', subject: 'CS201 - Data Structures', room: 'Room 102' },
  { id: '6', day: 'Friday', time: '10:00 AM', subject: 'CS301 - Web Dev', room: 'Room 201' },
];

export const mockAttendance = [
  { date: '2024-12-01', course: 'CS101', status: 'present' },
  { date: '2024-12-02', course: 'CS301', status: 'present' },
  { date: '2024-12-03', course: 'CS101', status: 'present' },
  { date: '2024-12-04', course: 'CS201', status: 'absent' },
  { date: '2024-12-05', course: 'CS301', status: 'present' },
  { date: '2024-12-06', course: 'CS101', status: 'late' },
];

export const mockStats = {
  teacher: {
    totalCourses: 3,
    totalStudents: 135,
    totalAssignments: 6,
    pendingSubmissions: 2,
    averageAttendance: 92,
    activeAnnouncements: 4
  },
  student: {
    enrolledCourses: 3,
    pendingAssignments: 2,
    completedAssignments: 1,
    averageGrade: 95,
    attendanceRate: 88,
    upcomingClasses: 5
  }
};
