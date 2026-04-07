import { useState } from 'react';
import { UserPlus, ArrowLeft } from 'lucide-react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../contexts/AuthContext';

interface SignupProps {
  onSwitchToLogin: () => void;
  role?: 'student' | 'teacher';
}

export default function Signup({ onSwitchToLogin, role = 'student' }: SignupProps) {
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '', fullName: '', role });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await signUp(formData.email, formData.password, formData.fullName, formData.role as 'student' | 'teacher');
    if (error) {
      setError(error);
    } else {
      setSuccess(true);
      setTimeout(onSwitchToLogin, 2000);
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-medium">Account created!</p>
          <p className="text-green-700 text-sm mt-1">Redirecting...</p>
        </div>
      </div>
    );
  }

  const bgColor = formData.role === 'teacher' ? 'from-green-500 to-emerald-600' : 'from-blue-500 to-blue-600';

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
      <button
        onClick={onSwitchToLogin}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 font-medium mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Login</span>
      </button>

      <div className="text-center mb-8">
        <div className={`w-16 h-16 bg-gradient-to-br ${bgColor} rounded-lg flex items-center justify-center mx-auto mb-4`}>
          <UserPlus className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
        <p className="text-gray-600 mt-2">Join College Connect as {formData.role === 'teacher' ? 'a Teacher' : 'a Student'}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>}
        <Input label="Full Name" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} required />
        <Input label="Email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        <Input label="Password" type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value as 'student' | 'teacher' })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        <Button type="submit" disabled={loading} className="w-full">{loading ? 'Creating...' : 'Sign Up'}</Button>
      </form>

      <p className="text-center mt-6 text-gray-600">
        Already have an account?{' '}
        <button onClick={onSwitchToLogin} className="text-blue-600 hover:text-blue-700 font-medium">Sign in</button>
      </p>
    </div>
  );
}
