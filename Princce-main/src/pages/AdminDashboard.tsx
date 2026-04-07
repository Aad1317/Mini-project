import { useState } from 'react';
import Layout from '../components/Layout';
import AdminHome from './admin/AdminHome';
import AdminUsers from './admin/AdminUsers';
import AdminTimetable from './admin/AdminTimetable';
import AdminAnnouncements from './admin/AdminAnnouncements';
import AdminReports from './admin/AdminReports';
import Feed from './Feed';
import Events from './Events';
import Placements from './Placements';
import TeacherClasses from './teacher/TeacherClasses';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminHome />;
      case 'feed':
        return <Feed />;
      case 'events':
        return <Events />;
      case 'placements':
        return <Placements />;
      case 'courses':
        return <TeacherClasses />;
      case 'users':
        return <AdminUsers />;
      case 'timetable':
        return <AdminTimetable />;
      case 'announcements':
        return <AdminAnnouncements />;
      case 'reports':
        return <AdminReports />;
      default:
        return <AdminHome />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}
