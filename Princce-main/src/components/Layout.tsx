import { ReactNode } from 'react';
import { LogOut, Home, FileText, Calendar, Bell, Users, BarChart, BookOpen, User, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  const { profile, signOut } = useAuth();

  const getNavigationItems = () => {
    if (profile?.role === 'student') {
      return [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'courses', label: 'My Courses', icon: BookOpen },
        { id: 'attendance', label: 'Attendance', icon: CheckCircle },
        { id: 'timetable', label: 'Timetable', icon: Calendar },
        { id: 'assignments', label: 'Assignments', icon: FileText },
        { id: 'announcements', label: 'Announcements', icon: Bell },
        { id: 'profile', label: 'Profile', icon: User },
      ];
    } else if (profile?.role === 'teacher') {
      return [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'courses', label: 'My Courses', icon: BookOpen },
        { id: 'attendance', label: 'Mark Attendance', icon: CheckCircle },
        { id: 'announcements', label: 'Announcements', icon: Bell },
        { id: 'assignments', label: 'Assignments', icon: FileText },
        { id: 'submissions', label: 'Submissions', icon: BarChart },
        { id: 'timetable', label: 'Timetable', icon: Calendar },
        { id: 'profile', label: 'Profile', icon: User },
      ];
    } else if (profile?.role === 'admin') {
      return [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'users', label: 'Users', icon: Users },
        { id: 'courses', label: 'Courses', icon: BookOpen },
        { id: 'reports', label: 'Reports', icon: BarChart },
        { id: 'timetable', label: 'Timetable', icon: Calendar },
        { id: 'announcements', label: 'Announcements', icon: Bell },
      ];
    }
    return [];
  };

  const navItems = getNavigationItems();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">College Connect</h1>
                <p className="text-xs text-gray-500 capitalize">{profile?.role} Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{profile?.full_name}</p>
                <p className="text-xs text-gray-500">{profile?.email}</p>
              </div>
              <button
                onClick={signOut}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex space-x-4 mb-6 border-b border-gray-200 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={'flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ' + (
                  activeTab === item.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
        <main>{children}</main>
      </div>
    </div>
  );
}
