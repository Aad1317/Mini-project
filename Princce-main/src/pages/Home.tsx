import { GraduationCap, BookOpen, Users, Award, ArrowRight } from 'lucide-react';


interface HomeProps {
  onNavigate: (path: 'student-login' | 'teacher-login') => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg">
                <GraduationCap className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">College Connect</h1>
                <p className="text-xs text-blue-100">Learning Management System</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => onNavigate('student-login')}
                className="px-6 py-2.5 text-white font-medium hover:bg-white/10 rounded-lg transition-colors"
              >
                Student Login
              </button>
              <button
                onClick={() => onNavigate('teacher-login')}
                className="px-6 py-2.5 bg-white text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors shadow-lg"
              >
                Teacher Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Welcome to College Connect
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto">
            A modern learning management system designed to connect students, teachers, and administrators seamlessly.
          </p>
          <div className="flex justify-center space-x-6">
            <button
              onClick={() => onNavigate('student-login')}
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all shadow-2xl transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Student Portal</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigate('teacher-login')}
              className="px-8 py-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition-all shadow-2xl transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Teacher Portal</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 text-center hover:bg-white/20 transition-all transform hover:scale-105">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Assignments</h3>
            <p className="text-blue-100">
              Create, submit, and manage assignments with ease. Track progress and deadlines effortlessly.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 text-center hover:bg-white/20 transition-all transform hover:scale-105">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Award className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Grading System</h3>
            <p className="text-blue-100">
              Comprehensive grading with detailed feedback. Monitor student performance in real-time.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 text-center hover:bg-white/20 transition-all transform hover:scale-105">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Collaboration</h3>
            <p className="text-blue-100">
              Connect students and teachers. Share announcements and updates instantly.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 text-center hover:bg-white/20 transition-all transform hover:scale-105">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <GraduationCap className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Timetables</h3>
            <p className="text-blue-100">
              Organized class schedules. Never miss a class with our smart timetable system.
            </p>
          </div>
        </div>

        <div className="mt-32 text-center">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-6">
              Get Started Today
            </h3>
            <p className="text-xl text-blue-100 mb-8">
              Choose your portal to access all the features designed for your role.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => onNavigate('student-login')}
                className="p-8 bg-white rounded-xl hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Student Portal</h4>
                <p className="text-gray-600">
                  Access assignments, submit work, view grades, and check your timetable.
                </p>
              </button>

              <button
                onClick={() => onNavigate('teacher-login')}
                className="p-8 bg-white rounded-xl hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <GraduationCap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Teacher Portal</h4>
                <p className="text-gray-600">
                  Create assignments, grade submissions, post announcements, and manage classes.
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-white/10 backdrop-blur-md border-t border-white/20 mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-blue-100">
            © 2024 College Connect. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
