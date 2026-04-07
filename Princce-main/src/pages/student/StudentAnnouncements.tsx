import { Bell, Calendar } from 'lucide-react';
import Card from '../../components/Card';
import { useCollection } from '../../lib/firestoreLMS';

export default function StudentAnnouncements() {
  const { data: mockAnnouncements, loading } = useCollection('announcements');

  if (loading) return <p className="text-center text-gray-500 py-8">Loading announcements...</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
        <p className="mt-1 text-gray-600">Stay updated with latest news</p>
      </div>

      <div className="space-y-4">
        {mockAnnouncements.map((announcement) => (
          <Card key={announcement.id}>
            <div className="flex items-start">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{announcement.title}</h3>
                <p className="text-gray-600 mb-3">{announcement.content}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{announcement.created_at}</span>
                  <span className="mx-2">·</span>
                  <span>By {announcement.author}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
