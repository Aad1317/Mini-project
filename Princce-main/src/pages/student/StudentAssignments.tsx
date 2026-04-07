import { FileText, Calendar, CheckCircle } from 'lucide-react';
import Card from '../../components/Card';
import { useCollection } from '../../lib/firestoreLMS';

export default function StudentAssignments() {
  const { data: mockAssignments, loading } = useCollection('assignments');

  if (loading) return <p className="text-center text-gray-500 py-8">Loading assignments...</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Assignments</h1>
        <p className="mt-1 text-gray-600">Track and submit your assignments</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockAssignments.map((assignment) => (
          <Card key={assignment.id}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
              {assignment.submitted ? (
                <span className="flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Submitted
                </span>
              ) : (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                  Pending
                </span>
              )}
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">{assignment.title}</h3>
            <p className="text-sm text-gray-600 mb-1">{assignment.course}</p>
            <p className="text-sm text-gray-500 mb-3">{assignment.description}</p>

            {assignment.grade && (
              <div className="mb-3 p-2 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-800">Grade: {assignment.grade}%</p>
              </div>
            )}
            
            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-1" />
                <span className="text-sm">Due: {assignment.due_date}</span>
              </div>
              <span className="text-sm font-medium text-blue-600">{assignment.total_points} points</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
