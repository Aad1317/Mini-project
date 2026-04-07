import { useState } from 'react';
import Layout from '../components/Layout';
import StudentHome from './student/StudentHome';
import StudentCourses from './student/StudentCourses';
import StudentAttendance from './student/StudentAttendance';
import StudentTimetable from './student/StudentTimetable';
import StudentAssignments from './student/StudentAssignments';
import StudentAnnouncements from './student/StudentAnnouncements';
import StudentProfile from './student/StudentProfile';
import Feed from './Feed';
import Societies from './Societies';
import Events from './Events';
import Placements from './Placements';
import Library from './student/Library';
import Hostel from './student/Hostel';
import Results from './student/Results';

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <StudentHome />;
      case 'feed':
        return <Feed />;
      case 'societies':
        return <Societies />;
      case 'events':
        return <Events />;
      case 'library':
        return <Library />;
      case 'hostel':
        return <Hostel />;
      case 'results':
        return <Results />;
      case 'placements':
        return <Placements />;
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
