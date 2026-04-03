import { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

export function useCollection<T = any>(collectionName: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocs(collection(db, collectionName))
      .then(snapshot => {
        setData(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T)));
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching collection:", collectionName, err);
        setLoading(false);
      });
  }, [collectionName]);

  return { data, loading };
}

export function useStudentStats() {
  const { data: courses } = useCollection('courses');
  const { data: assignments } = useCollection('assignments');
  const { data: attendance } = useCollection('attendance');
  
  return {
    enrolledCourses: courses.length,
    pendingAssignments: assignments.filter(a => !a.submitted).length || 0,
    averageGrade: 85, // Simulated
    completedAssignments: assignments.filter(a => a.submitted).length || 0,
    attendanceRate: attendance.length ? Math.round((attendance.filter(a => a.status === 'present').length / attendance.length) * 100) : 100,
    upcomingClasses: 3 // Simulated
  };
}

export function useTeacherStats() {
  const { data: courses } = useCollection('courses');
  const { data: assignments } = useCollection('assignments');
  const { data: submissions } = useCollection('submissions');
  const { data: announcements } = useCollection('announcements');
  
  return {
    totalCourses: courses.length,
    totalStudents: courses.reduce((acc, curr) => acc + (curr.enrollment_count || 0), 0),
    totalAssignments: assignments.length,
    pendingSubmissions: submissions.filter(s => s.status === 'pending' || !s.grade).length,
    averageAttendance: 92, // Simulated
    activeAnnouncements: announcements.length
  };
}

export function useUsers() {
  const { data: users, loading } = useCollection('users');
  return { users, loading };
}

export const updateUserRole = async (userId: string, newRole: string) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, { role: newRole });
};

export const deleteUserDoc = async (userId: string) => {
  const userRef = doc(db, 'users', userId);
  await deleteDoc(userRef);
};

export function useAdminStats() {
  const { data: users, loading: l1 } = useCollection('users');
  const { data: assignments, loading: l2 } = useCollection('assignments');
  const { data: submissions, loading: l3 } = useCollection('submissions');

  const students = users.filter((u: any) => u.role === 'student').length;
  const teachers = users.filter((u: any) => u.role === 'teacher').length;
  const admins = users.filter((u: any) => u.role === 'admin').length;
  const graded = submissions.filter((s: any) => s.status === 'graded' || s.grade !== null);
  
  const avgGrade = graded.length > 0 
    ? graded.reduce((sum: number, s: any) => sum + (s.grade || 0), 0) / graded.length 
    : 0;

  const submissionRate = assignments.length && students
    ? (submissions.length / (assignments.length * students)) * 100
    : 0;

  return {
    stats: {
      users: users.length, 
      totalUsers: users.length,
      students,
      teachers,
      admins,
      assignments: assignments.length, 
      totalAssignments: assignments.length,
      totalSubmissions: submissions.length,
      gradedSubmissions: graded.length,
      averageGrade: Math.round(avgGrade),
      submissionRate: Math.round(submissionRate),
      activeUsers: users.length,
    },
    loading: l1 || l2 || l3
  };
}
