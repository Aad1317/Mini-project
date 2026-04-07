import { Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import Card from '../../components/Card';
import { useCollection } from '../../lib/firestoreLMS';

export default function StudentAttendance() {
  const { data: mockAttendance, loading } = useCollection('attendance');

  if (loading) return <p className="text-center text-gray-500 py-8">Loading attendance...</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Attendance</h1>
        <p className="mt-1 text-gray-600">Track your class attendance</p>
      </div>

      <div className="space-y-4">
        {mockAttendance.map((record, index) => (
          <Card key={index}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 
                  ${record.status === 'present' ? 'bg-green-100' : record.status === 'absent' ? 'bg-red-100' : 'bg-yellow-100'}`}>
                  {record.status === 'present' ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : record.status === 'absent' ? (
                    <XCircle className="w-5 h-5 text-red-600" />
                  ) : (
                    <Clock className="w-5 h-5 text-yellow-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{record.course}</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{record.date}</span>
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 text-sm font-medium rounded capitalize
                ${record.status === 'present' ? 'bg-green-100 text-green-800' : 
                  record.status === 'absent' ? 'bg-red-100 text-red-800' : 
                  'bg-yellow-100 text-yellow-800'}`}>
                {record.status}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
