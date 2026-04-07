import { useState, useEffect } from 'react';
import { getSocieties, Society } from '../lib/firestore';
import { Globe, Users } from 'lucide-react';

export default function Societies() {
  const [societies, setSocieties] = useState<Society[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSocieties().then(data => {
      setSocieties(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading societies...</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">College Societies</h1>
        <p className="mt-1 text-gray-600">Discover and join campus clubs and technical chapters.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {societies.map((society, i) => (
          <div key={society.id || i} className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-200">
            <div className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{society.name}</h3>
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full mb-3">
                {society.category}
              </span>
              <p className="text-gray-600 mb-4">{society.description}</p>
              
              <div className="flex items-center text-sm text-gray-500">
                <Users className="w-4 h-4 mr-2" />
                <span>{society.memberCount} Members</span>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <button className="w-full font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
                View Society details →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
