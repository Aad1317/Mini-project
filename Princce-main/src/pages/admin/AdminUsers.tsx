import { useState } from 'react';
import { Trash2, UserCog } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { useUsers, updateUserRole, deleteUserDoc } from '../../lib/firestoreLMS';

export default function AdminUsers() {
  const { users, loading } = useUsers();
  const [updating, setUpdating] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user profile? Note: This deletes their database profile, but they may still exist in Firebase Auth.')) return;
    try {
      await deleteUserDoc(id);
      window.location.reload(); // Quick refresh to reflect changes
    } catch (error) {
      alert('Failed to delete user');
    }
  };

  const handleRoleChange = async (id: string, newRole: string) => {
    setUpdating(id);
    try {
      await updateUserRole(id, newRole);
      // We don't need a heavy reload here, but to reflect immediately a window.location.reload is easiest for simple apps,
      // or we just let realtime take over (if we used onSnapshot). Since useCollection is one-time getDocs, we reload.
      window.location.reload();
    } catch (error) {
      alert('Failed to update user role');
    } finally {
      setUpdating(null);
    }
  };

  if (loading) return <div className="text-center py-8 text-gray-500">Loading user directory...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">User Management</h2>
        <p className="mt-1 text-gray-600">Assign roles and administer portal access</p>
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50 text-gray-600 text-sm">
                <th className="text-left py-4 px-4 font-semibold">Name</th>
                <th className="text-left py-4 px-4 font-semibold">Email</th>
                <th className="text-left py-4 px-4 font-semibold">Current Role</th>
                <th className="text-right py-4 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <UserCog className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-900">{user.full_name || 'N/A'}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{user.email || 'N/A'}</td>
                  <td className="py-4 px-4">
                    <select
                      value={user.role || 'student'}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      disabled={updating === user.id}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
                    >
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)} disabled={updating === user.id}>
                      <Trash2 className="w-4 h-4 mr-1 inline" /> Delete
                    </Button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-500">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
