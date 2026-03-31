import { useState } from 'react';
import Layout from '../components/Layout';
import StudentHome from './student/StudentHome';
import StudentCourses from './student/StudentCourses';
import StudentAttendance from './student/StudentAttendance';
import StudentTimetable from './student/StudentTimetable';
import StudentAssignments from './student/StudentAssignments';
import StudentAnnouncements from './student/StudentAnnouncements';
import StudentProfile from './student/StudentProfile';

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <StudentHome />;
      case 'courses':
        return <StudentCourses />;
      case 'attendance':
        return <StudentAttendance />;
      case 'timetable':
        return <StudentTimetable />;
      case 'assignments':
        return <StudentAssignments />;
      case 'announcements':
        return <StudentAnnouncements />;
      case 'profile':
        return <StudentProfile />;
      default:
        return <StudentHome />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}
