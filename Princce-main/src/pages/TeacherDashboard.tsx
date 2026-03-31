import { useState } from 'react';
import Layout from '../components/Layout';
import TeacherHome from './teacher/TeacherHome';
import TeacherAnnouncements from './teacher/TeacherAnnouncements';
import TeacherAssignments from './teacher/TeacherAssignments';
import TeacherSubmissions from './teacher/TeacherSubmissions';
import TeacherTimetable from './teacher/TeacherTimetable';
import TeacherClasses from './teacher/TeacherClasses';
import TeacherProfile from './teacher/TeacherProfile';

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <TeacherHome />;
      case 'announcements':
        return <TeacherAnnouncements />;
      case 'assignments':
        return <TeacherAssignments />;
      case 'submissions':
        return <TeacherSubmissions />;
      case 'timetable':
        return <TeacherTimetable />;
      case 'classes':
        return <TeacherClasses />;
      case 'profile':
        return <TeacherProfile />;
      default:
        return <TeacherHome />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}
