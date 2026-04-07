import { BookOpen, Users } from 'lucide-react';
import Card from '../../components/Card';
import { useCollection } from '../../lib/firestoreLMS';

export default function TeacherClasses() {
  const { data: mockCourses, loading } = useCollection('courses');

  if (loading) return <p className="text-center text-gray-500 py-8">Loading classes...</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Classes</h1>
        <p className="mt-1 text-gray-600">Manage your courses and students</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCourses.map((course) => (
          <Card key={course.id}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                {course.semester}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.name}</h3>
            <p className="text-sm text-gray-600 mb-1">{course.code}</p>
            <p className="text-sm text-gray-500 mb-4">{course.description}</p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center text-gray-600">
                <Users className="w-4 h-4 mr-1" />
                <span className="text-sm">{course.enrollment_count} students</span>
              </div>
              <span className="text-sm font-medium text-blue-600">{course.credits} credits</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
