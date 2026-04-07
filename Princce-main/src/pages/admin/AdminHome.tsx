
import { Users, FileText } from 'lucide-react';
import Card from '../../components/Card';
import { useAdminStats } from '../../lib/firestoreLMS';

export default function AdminHome() {
  const { stats, loading } = useAdminStats();

  if (loading) return <div className="text-center py-8 text-gray-500">Loading admin dashboard...</div>;

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
