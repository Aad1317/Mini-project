import { useEffect, useState } from 'react';
import { Users, FileText } from 'lucide-react';
import Card from '../../components/Card';
import { supabase } from '../../lib/supabase';

export default function AdminHome() {
  const [stats, setStats] = useState({
    users: 0,
    students: 0,
    teachers: 0,
    assignments: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const [usersRes, studentsRes, teachersRes, assignmentsRes] = await Promise.all([
      supabase.from('profiles').select('id', { count: 'exact', head: true }),
      supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'student'),
      supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'teacher'),
      supabase.from('assignments').select('id', { count: 'exact', head: true }),
    ]);

    setStats({
      users: usersRes.count || 0,
      students: studentsRes.count || 0,
      teachers: teachersRes.count || 0,
      assignments: assignmentsRes.count || 0,
    });
  };

  const statCards = [
    { title: 'Total Users', value: stats.users, icon: Users, color: 'blue' },
    { title: 'Students', value: stats.students, icon: Users, color: 'green' },
    { title: 'Teachers', value: stats.teachers, icon: Users, color: 'purple' },
    { title: 'Assignments', value: stats.assignments, icon: FileText, color: 'orange' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
        <p className="text-gray-600 mt-1">System overview and management.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${stat.color}-100`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
