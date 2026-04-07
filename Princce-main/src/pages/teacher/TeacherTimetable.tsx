import { Calendar, Clock, MapPin } from 'lucide-react';
import Card from '../../components/Card';
import { useCollection } from '../../lib/firestoreLMS';

export default function TeacherTimetable() {
  const { data: mockTimetable, loading } = useCollection('timetable');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  if (loading) return <p className="text-center text-gray-500 py-8">Loading timetable...</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Weekly Timetable</h1>
        <p className="mt-1 text-gray-600">Your class schedule for the week</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {days.map((day) => {
          const dayClasses = mockTimetable.filter((entry) => entry.day === day);
          
          return (
            <Card key={day}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                {day}
              </h3>
              
              {dayClasses.length > 0 ? (
                <div className="space-y-3">
                  {dayClasses.map((entry) => (
                    <div key={entry.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{entry.subject}</p>
                        <div className="flex items-center mt-1 text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{entry.time}</span>
                          <span className="mx-2">·</span>
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{entry.room}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No classes scheduled</p>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
