import { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, Users, FileText, Award } from 'lucide-react';
import Card from '../../components/Card';
import { supabase } from '../../lib/supabase';

interface SystemStats {
  totalUsers: number;
  students: number;
  teachers: number;
  admins: number;
  totalAssignments: number;
  totalSubmissions: number;
  gradedSubmissions: number;
  averageGrade: number;
  submissionRate: number;
  activeUsers: number;
}

export default function AdminReports() {
  const [stats, setStats] = useState<SystemStats>({
    totalUsers: 0,
    students: 0,
    teachers: 0,
    admins: 0,
    totalAssignments: 0,
    totalSubmissions: 0,
    gradedSubmissions: 0,
    averageGrade: 0,
    submissionRate: 0,
    activeUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSystemStats();
  }, []);

  const fetchSystemStats = async () => {
    setLoading(true);

    const [
      usersRes,
      studentsRes,
      teachersRes,
      adminsRes,
      assignmentsRes,
      submissionsRes,
      gradedRes,
      gradesData,
    ] = await Promise.all([
      supabase.from('profiles').select('id', { count: 'exact', head: true }),
      supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'student'),
      supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'teacher'),
      supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'admin'),
      supabase.from('assignments').select('id', { count: 'exact', head: true }),
      supabase.from('submissions').select('id', { count: 'exact', head: true }),
      supabase.from('submissions').select('id', { count: 'exact', head: true }).eq('status', 'graded'),
      supabase.from('submissions').select('grade').eq('status', 'graded'),
    ]);

    const avgGrade =
      gradesData.data && gradesData.data.length > 0
        ? gradesData.data.reduce((sum, s) => sum + (s.grade || 0), 0) / gradesData.data.length
        : 0;

    const submissionRate =
      assignmentsRes.count && studentsRes.count
        ? ((submissionsRes.count || 0) / (assignmentsRes.count * studentsRes.count)) * 100
        : 0;

    setStats({
      totalUsers: usersRes.count || 0,
      students: studentsRes.count || 0,
      teachers: teachersRes.count || 0,
      admins: adminsRes.count || 0,
      totalAssignments: assignmentsRes.count || 0,
      totalSubmissions: submissionsRes.count || 0,
      gradedSubmissions: gradedRes.count || 0,
      averageGrade: Math.round(avgGrade),
      submissionRate: Math.round(submissionRate),
      activeUsers: usersRes.count || 0,
    });

    setLoading(false);
  };

  if (loading) {
    return <div className="text-center py-8">Loading reports...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">System Reports & Analytics</h2>
        <p className="text-gray-600 mt-1">Comprehensive overview of platform performance and metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalUsers}</p>
              <p className="text-xs text-gray-500 mt-1">
                Active: {stats.activeUsers}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-100">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Assignments</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalAssignments}</p>
              <p className="text-xs text-gray-500 mt-1">
                Submissions: {stats.totalSubmissions}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-green-100">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Grade</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.averageGrade}%</p>
              <p className="text-xs text-gray-500 mt-1">
                Graded: {stats.gradedSubmissions}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-purple-100">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Submission Rate</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.submissionRate}%</p>
              <p className="text-xs text-gray-500 mt-1">
                Platform-wide
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-orange-100">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
            User Distribution
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Students</span>
                <span className="text-sm font-bold text-gray-900">{stats.students}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full"
                  style={{
                    width: `${stats.totalUsers > 0 ? (stats.students / stats.totalUsers) * 100 : 0}%`,
                  }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Teachers</span>
                <span className="text-sm font-bold text-gray-900">{stats.teachers}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-600 h-3 rounded-full"
                  style={{
                    width: `${stats.totalUsers > 0 ? (stats.teachers / stats.totalUsers) * 100 : 0}%`,
                  }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Admins</span>
                <span className="text-sm font-bold text-gray-900">{stats.admins}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-purple-600 h-3 rounded-full"
                  style={{
                    width: `${stats.totalUsers > 0 ? (stats.admins / stats.totalUsers) * 100 : 0}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-green-600" />
            Assignment Completion
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Submitted</span>
                <span className="text-sm font-bold text-gray-900">{stats.totalSubmissions}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full"
                  style={{ width: `${stats.submissionRate}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Graded</span>
                <span className="text-sm font-bold text-gray-900">{stats.gradedSubmissions}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-600 h-3 rounded-full"
                  style={{
                    width: `${
                      stats.totalSubmissions > 0
                        ? (stats.gradedSubmissions / stats.totalSubmissions) * 100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Pending</span>
                <span className="text-sm font-bold text-gray-900">
                  {stats.totalSubmissions - stats.gradedSubmissions}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-orange-600 h-3 rounded-full"
                  style={{
                    width: `${
                      stats.totalSubmissions > 0
                        ? ((stats.totalSubmissions - stats.gradedSubmissions) / stats.totalSubmissions) * 100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <p className="text-sm font-medium text-blue-900 mb-2">Platform Health</p>
            <p className="text-4xl font-bold text-blue-600">
              {stats.submissionRate > 70 ? 'Excellent' : stats.submissionRate > 50 ? 'Good' : 'Needs Attention'}
            </p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <p className="text-sm font-medium text-green-900 mb-2">Student Performance</p>
            <p className="text-4xl font-bold text-green-600">
              {stats.averageGrade >= 80 ? 'High' : stats.averageGrade >= 60 ? 'Average' : 'Low'}
            </p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
            <p className="text-sm font-medium text-purple-900 mb-2">Teacher Activity</p>
            <p className="text-4xl font-bold text-purple-600">
              {stats.teachers > 0 && stats.totalAssignments / stats.teachers > 3 ? 'Active' : 'Moderate'}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
