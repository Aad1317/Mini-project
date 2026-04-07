import { User, Clock } from 'lucide-react';
import Card from '../../components/Card';
import { useCollection } from '../../lib/firestoreLMS';

export default function TeacherSubmissions() {
  const { data: mockSubmissions, loading } = useCollection('submissions');

  if (loading) return <p className="text-center text-gray-500 py-8">Loading submissions...</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Submissions</h1>
        <p className="mt-1 text-gray-600">Review and grade student submissions</p>
      </div>

      <div className="space-y-4">
        {mockSubmissions.map((submission) => (
          <Card key={submission.id}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <User className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="font-semibold text-gray-900">{submission.student_name}</span>
                  <span className="mx-2 text-gray-400">·</span>
                  <span className="text-sm text-gray-600">{submission.student_email}</span>
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 mb-2">{submission.assignment_title}</h3>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Submitted: {submission.submitted_at}</span>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <span className="px-3 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800 mb-2">
                  {submission.status}
                </span>
                {submission.grade !== null && (
                  <span className="text-2xl font-bold text-green-600">{submission.grade}%</span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
