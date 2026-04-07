import { useState } from 'react';
import { BookOpen, Mail, Lock, ArrowLeft, UserPlus } from 'lucide-react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../contexts/AuthContext';

interface StudentLoginProps {
  onBackHome: () => void;
  onSwitchToSignup: () => void;
}

export default function StudentLogin({ onBackHome, onSwitchToSignup }: StudentLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn, signInWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: signInError } = await signIn(email, password);

    if (signInError) {
      setError(signInError);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 flex items-center justify-center p-4">
      <button
        onClick={onBackHome}
        className="absolute top-6 left-6 flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Home</span>
      </button>

      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Student Portal</h2>
          <p className="text-center text-gray-600 mb-2">Sign in to access your courses</p>
          <p className="text-center text-sm text-green-600 mb-6">Use any email and password to demo!</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Signing in...' : 'Sign In as Student'}
            </Button>
          </form>

          <div className="mt-4">
            <Button 
              type="button"
              onClick={async () => {
                setLoading(true);
                const { error } = await signInWithGoogle('student');
                if (error) setError(error);
                setLoading(false);
              }} 
              disabled={loading} 
              className="w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 flex items-center justify-center space-x-2"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
              <span>Sign in with Google</span>
            </Button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={onSwitchToSignup}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-blue-600 hover:text-blue-700 font-medium hover:bg-blue-50 rounded-lg transition-colors"
            >
              <UserPlus className="w-5 h-5" />
              <span>Create Student Account</span>
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            Are you a teacher?{' '}
            <button onClick={onBackHome} className="text-blue-600 hover:text-blue-700 font-medium">
              Go to Teacher Login
            </button>
          </p>
        </div>

        <div className="mt-8 bg-white/80 backdrop-blur rounded-xl p-6 shadow-lg">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
            Student Features
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3"></span>
              <span>View and submit assignments</span>
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3"></span>
              <span>Check grades and feedback</span>
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3"></span>
              <span>Access class timetable</span>
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3"></span>
              <span>Read announcements</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
