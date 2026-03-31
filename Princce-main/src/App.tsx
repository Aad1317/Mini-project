import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Welcome from './pages/Welcome';
import StudentLogin from './pages/auth/StudentLogin';
import TeacherLogin from './pages/auth/TeacherLogin';
import Signup from './pages/auth/Signup';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ErrorBoundary from './components/ErrorBoundary';

type Page = 'home' | 'student-login' | 'teacher-login' | 'student-signup' | 'teacher-signup';

function AuthScreen() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  if (currentPage === 'home') {
    return <Welcome onNavigate={setCurrentPage} />;
  }

  if (currentPage === 'student-login') {
    return (
      <StudentLogin
        onBackHome={() => setCurrentPage('home')}
        onSwitchToSignup={() => setCurrentPage('student-signup')}
      />
    );
  }

  if (currentPage === 'teacher-login') {
    return (
      <TeacherLogin
        onBackHome={() => setCurrentPage('home')}
        onSwitchToSignup={() => setCurrentPage('teacher-signup')}
      />
    );
  }

  if (currentPage === 'student-signup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <Signup
          onSwitchToLogin={() => setCurrentPage('student-login')}
          role="student"
        />
      </div>
    );
  }

  if (currentPage === 'teacher-signup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <Signup
          onSwitchToLogin={() => setCurrentPage('teacher-login')}
          role="teacher"
        />
      </div>
    );
  }

  return <Welcome onNavigate={setCurrentPage} />;
}

function AppContent() {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return <AuthScreen />;
  }

  switch (profile.role) {
    case 'student':
      return <StudentDashboard />;
    case 'teacher':
      return <TeacherDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <AuthScreen />;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
