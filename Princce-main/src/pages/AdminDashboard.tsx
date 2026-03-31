import { useState } from 'react';
import Layout from '../components/Layout';
import AdminHome from './admin/AdminHome';
import AdminUsers from './admin/AdminUsers';
import AdminTimetable from './admin/AdminTimetable';
import AdminAnnouncements from './admin/AdminAnnouncements';
import AdminReports from './admin/AdminReports';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminHome />;
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
