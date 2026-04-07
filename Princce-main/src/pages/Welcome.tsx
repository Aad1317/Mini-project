import { GraduationCap, BookOpen, Users, ArrowRight, Calendar, CheckCircle, Target, BarChart } from 'lucide-react';

interface WelcomeProps {
  onNavigate: (path: 'student-login' | 'teacher-login') => void;
}

export default function Welcome({ onNavigate }: WelcomeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <nav className="bg-white/5 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">College Connect</h1>
                <p className="text-xs text-blue-300">Your Learning Hub</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => onNavigate('student-login')}
                className="px-6 py-2.5 text-white font-medium hover:bg-white/10 rounded-lg transition-all border border-white/20"
              >
                Student Login
              </button>
              <button
                onClick={() => onNavigate('teacher-login')}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 rounded-lg transition-all shadow-lg"
              >
                Teacher Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-24 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full mb-8">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            <span className="text-blue-300 text-sm font-medium">Empowering Education</span>
          </div>

          <h2 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Welcome to<br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              College Connect
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            A comprehensive Learning Management System designed to streamline education.
            Manage courses, track attendance, submit assignments, and achieve excellence.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <button
              onClick={() => onNavigate('student-login')}
              className="group px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-2xl transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <BookOpen className="w-5 h-5" />
              <span>Enter as Student</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('teacher-login')}
              className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-2xl transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <GraduationCap className="w-5 h-5" />
              <span>Enter as Teacher</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
          <div className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all hover:scale-105 hover:border-blue-400/50">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-blue-500/50 transition-shadow">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Course Management</h3>
            <p className="text-gray-300 leading-relaxed">
              Organize and access all your courses in one place. View schedules, materials, and track progress effortlessly.
            </p>
          </div>

          <div className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all hover:scale-105 hover:border-green-400/50">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-green-500/50 transition-shadow">
              <CheckCircle className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Attendance Tracking</h3>
            <p className="text-gray-300 leading-relaxed">
              Real-time attendance monitoring. Students can check their attendance, teachers can mark and manage it easily.
            </p>
          </div>

          <div className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all hover:scale-105 hover:border-purple-400/50">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-purple-500/50 transition-shadow">
              <Target className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Assignments & Grading</h3>
            <p className="text-gray-300 leading-relaxed">
              Submit assignments online, receive grades and feedback instantly. Complete grading system with detailed analytics.
            </p>
          </div>

          <div className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all hover:scale-105 hover:border-orange-400/50">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-orange-500/50 transition-shadow">
              <Calendar className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Smart Timetables</h3>
            <p className="text-gray-300 leading-relaxed">
              Never miss a class with organized timetables. View daily schedules, room assignments, and class timings.
            </p>
          </div>

          <div className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all hover:scale-105 hover:border-cyan-400/50">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-cyan-500/50 transition-shadow">
              <BarChart className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Analytics & Reports</h3>
            <p className="text-gray-300 leading-relaxed">
              Detailed performance analytics. Track progress, identify areas for improvement, and achieve academic goals.
            </p>
          </div>

          <div className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all hover:scale-105 hover:border-pink-400/50">
            <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-pink-500/50 transition-shadow">
              <Users className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Collaboration Hub</h3>
            <p className="text-gray-300 leading-relaxed">
              Connect with classmates and teachers. Share announcements, resources, and stay updated with the latest information.
            </p>
          </div>
        </div>

        <div className="pb-24">
          <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-md border border-blue-400/30 rounded-3xl p-12 text-center">
            <h3 className="text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h3>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Choose your role below and access all the powerful features designed specifically for you.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <button
                onClick={() => onNavigate('student-login')}
                className="bg-white rounded-2xl p-8 text-left hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">For Students</h4>
                    <p className="text-gray-600">Access courses, submit assignments, track attendance</p>
                  </div>
                </div>
                <div className="flex items-center text-blue-600 font-semibold">
                  <span>Login as Student</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </div>
              </button>

              <button
                onClick={() => onNavigate('teacher-login')}
                className="bg-white rounded-2xl p-8 text-left hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">For Teachers</h4>
                    <p className="text-gray-600">Manage courses, grade assignments, mark attendance</p>
                  </div>
                </div>
                <div className="flex items-center text-green-600 font-semibold">
                  <span>Login as Teacher</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-black/30 backdrop-blur-md border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold">College Connect</p>
                <p className="text-xs text-gray-400">Learning Management System</p>
              </div>
            </div>
            <p className="text-gray-400">© 2024 College Connect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
