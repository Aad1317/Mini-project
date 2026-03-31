import { User, Mail, BookOpen } from 'lucide-react';
import Card from '../../components/Card';
import { useAuth } from '../../contexts/AuthContext';

export default function StudentProfile() {
  const { profile } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="mt-1 text-gray-600">View and manage your account information</p>
      </div>

      <Card>
        <div className="flex items-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {profile?.full_name.charAt(0)}
          </div>
          <div className="ml-6">
            <h2 className="text-2xl font-bold text-gray-900">{profile?.full_name}</h2>
            <p className="text-gray-600">Student</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
            <Mail className="w-5 h-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium text-gray-900">{profile?.email}</p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
            <BookOpen className="w-5 h-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Role</p>
              <p className="font-medium text-gray-900 capitalize">{profile?.role}</p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
            <User className="w-5 h-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <p className="font-medium text-green-600 capitalize">{profile?.status}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
