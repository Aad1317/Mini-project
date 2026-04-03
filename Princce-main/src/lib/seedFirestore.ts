import { collection, writeBatch, doc } from 'firebase/firestore';
import { db } from './firebase';
import { 
  mockCourses, 
  mockAssignments, 
  mockSubmissions, 
  mockAnnouncements, 
  mockTimetable, 
  mockAttendance 
} from './mockData';

export const seedFirestoreWithMockData = async () => {
  console.log("Starting Firestore Database Seed...");
  const batch = writeBatch(db);

  try {
    // Seed Courses
    for (const course of mockCourses) {
      const docRef = doc(collection(db, 'courses'), course.id);
      batch.set(docRef, course);
    }
    
    // Seed Assignments
    for (const assignment of mockAssignments) {
      const docRef = doc(collection(db, 'assignments'), assignment.id);
      batch.set(docRef, assignment);
    }

    // Seed Submissions
    for (const submission of mockSubmissions) {
      const docRef = doc(collection(db, 'submissions'), submission.id);
      batch.set(docRef, submission);
    }

    // Seed Announcements
    for (const ann of mockAnnouncements) {
      const docRef = doc(collection(db, 'announcements'), ann.id);
      batch.set(docRef, ann);
    }

    // Seed Timetable
    for (const entry of mockTimetable) {
      const docRef = doc(collection(db, 'timetable'), entry.id);
      batch.set(docRef, entry);
    }

    // Seed Attendance (No ID in mockData, generating random ones)
    mockAttendance.forEach((record, idx) => {
      const docRef = doc(collection(db, 'attendance'), `record-${idx}`);
      batch.set(docRef, record);
    });

    await batch.commit();
    console.log("Seed complete! You can now safely delete mockData.ts");
    alert("Database successfully seeded with LMS courses and assignments!");
  } catch (err) {
    console.error("Error seeding database:", err);
    alert("Error seeding database check console.");
  }
};
