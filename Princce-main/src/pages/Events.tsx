import { useState, useEffect } from 'react';
import { getEvents, EventModel } from '../lib/firestore';
import { MapPin, Building } from 'lucide-react';

export default function Events() {
  const [events, setEvents] = useState<EventModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents().then(data => {
      setEvents(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading events...</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Upcoming Events</h1>
        <p className="mt-1 text-gray-600">Stay updated on seminars, workshops, and fests.</p>
      </div>

      <div className="space-y-4 max-w-4xl">
        {events.map((ev, i) => (
          <div key={ev.id || i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0 flex flex-col items-center justify-center w-24 h-24 bg-blue-50 rounded-xl border border-blue-100">
              <span className="text-blue-600 font-bold text-xl">{new Date(ev.date).getDate()}</span>
              <span className="text-blue-800 text-sm">{new Date(ev.date).toLocaleString('default', { month: 'short' })}</span>
            </div>
            
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{ev.title}</h3>
              <p className="text-gray-600 mb-4">{ev.description}</p>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {ev.location}
                </div>
                <div className="flex items-center">
                  <Building className="w-4 h-4 mr-1" />
                  Organized by: {ev.organizer}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm">
                RSVP Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
