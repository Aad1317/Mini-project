import { useState } from 'react';
import { Home, Coffee, Wrench, AlertCircle, CheckCircle2, MapPin } from 'lucide-react';
import Card from '../../components/Card';

export default function Hostel() {
  const [activeTab, setActiveTab] = useState('allocation');
  const [showComplaintForm, setShowComplaintForm] = useState(false);

  const myRoom = {
    hostel: 'Boys Hostel A - Block C',
    room: 'C-304',
    type: 'Double Occupancy',
    roommate: 'John Doe (ECE, 3rd Year)',
    warden: 'Prof. Sharma (+91 9876543210)'
  };

  const menu = [
    { day: 'Monday', breakfast: 'Poha, Jalebi, Tea/Coffee', lunch: 'Rajma Chawal, Roti, Salad', dinner: 'Dal Makhani, Paneer, Naan' },
    { day: 'Tuesday', breakfast: 'Aloo Paratha, Curd', lunch: 'Kadi Pakoda, Rice', dinner: 'Mix Veg, Roti, Gulab Jamun' },
    { day: 'Wednesday', breakfast: 'Idli Sambar, Chutney', lunch: 'Chole Bhature', dinner: 'Egg Curry / Soyabean, Rice' },
    { day: 'Thursday', breakfast: 'Puri Sabzi', lunch: 'Dal Fry, Jeera Rice', dinner: 'Chicken Curry / Shahi Paneer' },
    { day: 'Friday', breakfast: 'Bread Omelette / Sandwich', lunch: 'Rajma, Rice', dinner: 'Veg Biryani, Raita' },
  ];

  const complaints = [
    { id: 1, type: 'Electrical', desc: 'Fan regulator is broken', date: 'Oct 20, 2024', status: 'Resolved' },
    { id: 2, type: 'Plumbing', desc: 'Tap leaking in the attached washroom', date: 'Oct 23, 2024', status: 'Pending' },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-bold text-gray-900">Hostel & Mess Services</h1>
        <p className="mt-1 text-gray-600">Manage your accommodation, check the menu, and request maintenance.</p>
      </div>

      <div className="flex space-x-1 border-b border-gray-200 overflow-x-auto pb-px">
        <button
          onClick={() => setActiveTab('allocation')}
          className={`flex items-center px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
            activeTab === 'allocation' ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Home className="w-4 h-4 mr-2" /> Room Allocation
        </button>
        <button
          onClick={() => setActiveTab('mess')}
          className={`flex items-center px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
            activeTab === 'mess' ? 'bg-orange-50 text-orange-700 border-b-2 border-orange-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Coffee className="w-4 h-4 mr-2" /> Mess Menu
        </button>
        <button
          onClick={() => setActiveTab('maintenance')}
          className={`flex items-center px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
            activeTab === 'maintenance' ? 'bg-red-50 text-red-700 border-b-2 border-red-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Wrench className="w-4 h-4 mr-2" /> Maintenance
        </button>
      </div>

      <div className="pt-4">
        {activeTab === 'allocation' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <Home className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">My Room</h3>
                  <p className="text-gray-500 text-sm">Academic Year 2024-25</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-gray-500">Hostel Building</span>
                  <span className="font-semibold text-gray-900">{myRoom.hostel}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-gray-500">Room Number</span>
                  <span className="font-semibold text-gray-900">{myRoom.room}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-gray-500">Occupancy Type</span>
                  <span className="font-semibold text-gray-900">{myRoom.type}</span>
                </div>
                <div className="flex flex-col py-2 border-b border-gray-50">
                  <span className="text-gray-500 mb-1">Roommate</span>
                  <span className="font-semibold text-gray-900 text-right">{myRoom.roommate}</span>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-red-500" /> Contact Details
              </h3>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 mb-4">
                <p className="text-sm text-orange-800 font-medium">Warden: {myRoom.warden}</p>
                <p className="text-xs text-orange-600 mt-1">Available strictly between 6 PM - 8 PM for non-emergencies.</p>
              </div>
              
              <div className="space-y-3 mt-6">
                <button className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 rounded-lg transition-colors">
                  Request Room Change
                </button>
                <button className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 rounded-lg transition-colors">
                  Apply for Leave (Outing)
                </button>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'mess' && (
          <Card>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Day</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Breakfast (8:00 AM)</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Lunch (1:00 PM)</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Dinner (8:00 PM)</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {menu.map((m, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">{m.day}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{m.breakfast}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{m.lunch}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{m.dinner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab === 'maintenance' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Complaint History</h3>
                  <button 
                    onClick={() => setShowComplaintForm(!showComplaintForm)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg"
                  >
                    Raise Issue
                  </button>
                </div>
                
                {showComplaintForm && (
                  <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">New Complaint</h4>
                    <div className="space-y-4">
                      <select className="w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500">
                        <option>Electrical</option>
                        <option>Plumbing</option>
                        <option>Carpentry</option>
                        <option>Internet / Wi-Fi</option>
                        <option>Other</option>
                      </select>
                      <textarea placeholder="Describe the issue..." rows={3} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"></textarea>
                      <button className="bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700">Submit</button>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {complaints.map(comp => (
                    <div key={comp.id} className="flex items-start p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                      {comp.status === 'Resolved' ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 mr-3 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-semibold text-gray-900">{comp.type}</h4>
                          <span className="text-xs text-gray-500">{comp.date}</span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">{comp.desc}</p>
                        <span className={`inline-block mt-2 px-2 py-1 text-xs font-semibold rounded-full ${
                          comp.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                        }`}>
                          {comp.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <h3 className="font-bold text-gray-900 mb-2 border-b pb-2">Guidelines</h3>
                <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                  <li>Issues are addressed between 10 AM and 5 PM on working days.</li>
                  <li>For internet complaints, directly contact IT support.</li>
                  <li>Do not tamper with MCBs or plumbing valves yourself.</li>
                </ul>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
