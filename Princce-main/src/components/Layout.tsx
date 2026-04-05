import { useEffect, useState, ReactNode } from 'react';
import { LogOut, Home, FileText, Calendar, Bell, Users, BarChart, BookOpen, User, CheckCircle, MessageSquare, Globe, Library as LibraryIcon, CalendarDays, Briefcase, Coffee, GraduationCap, Sun, Moon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  const { profile, signOut } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check local storage or system pref on load
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };

  const getNavigationItems = () => {
    if (profile?.role === 'student') {
      return [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'feed', label: 'Social Feed', icon: MessageSquare },
        { id: 'societies', label: 'Societies', icon: Globe },
        { id: 'events', label: 'Events', icon: CalendarDays },
        { id: 'library', label: 'Library', icon: LibraryIcon },
        { id: 'hostel', label: 'Hostel & Mess', icon: Coffee },
        { id: 'results', label: 'Results', icon: GraduationCap },
        { id: 'placements', label: 'Placements', icon: Briefcase },
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
        { id: 'feed', label: 'Social Feed', icon: MessageSquare },
        { id: 'societies', label: 'Societies', icon: Globe },
        { id: 'events', label: 'Events', icon: CalendarDays },
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
        { id: 'feed', label: 'Global Feed', icon: MessageSquare },
        { id: 'events', label: 'Events', icon: CalendarDays },
        { id: 'users', label: 'Users', icon: Users },
        { id: 'placements', label: 'Placements', icon: Briefcase },
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-700 to-blue-800 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">University Connect</h1>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold uppercase tracking-wider">{profile?.role} Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                title="Toggle Dark Mode"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{profile?.full_name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{profile?.email}</p>
              </div>
              <button
                onClick={signOut}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors dark:hover:bg-red-900/30"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
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
