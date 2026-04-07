import { Briefcase, MapPin, DollarSign, ExternalLink } from 'lucide-react';
import Card from '../components/Card';

export default function Placements() {
  const jobs = [
    { id: '1', title: 'Software Engineer Intern', company: 'Google', location: 'Bangalore / Remote', salary: '₹1.5 Lakh/month', type: 'Internship', deadline: 'Oct 30, 2024' },
    { id: '2', title: 'Data Analyst (Fresher)', company: 'Amazon', location: 'Hyderabad', salary: '₹18 LPA', type: 'Full-time', deadline: 'Nov 15, 2024' },
    { id: '3', title: 'Frontend Developer', company: 'Microsoft', location: 'Remote', salary: '₹22 LPA', type: 'Full-time', deadline: 'Nov 05, 2024' },
    { id: '4', title: 'Product Manager', company: 'Atlassian', location: 'Remote', salary: '₹28 LPA', type: 'Full-time', deadline: 'Dec 01, 2024' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Career & Placements</h1>
          <p className="mt-1 text-gray-600">Discover internships, full-time opportunities, and manage your resume.</p>
        </div>
        <button className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-semibold rounded-lg shadow-md transition-all transform hover:-translate-y-0.5">
          Upload Resume Drop
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map(job => (
          <Card key={job.id}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center shadow-sm">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <span className={`px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${job.type === 'Internship' ? 'bg-purple-100 text-purple-800' : 'bg-emerald-100 text-emerald-800'}`}>
                {job.type}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-1 leading-tight">{job.title}</h3>
            <p className="text-indigo-600 font-bold text-sm tracking-wide mb-5 uppercase">{job.company}</p>
            
            <div className="space-y-3 mb-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="flex items-center text-gray-700 font-medium text-sm">
                <MapPin className="w-4 h-4 mr-3 text-gray-400" />
                {job.location}
              </div>
              <div className="flex items-center text-gray-700 font-medium text-sm">
                <DollarSign className="w-4 h-4 mr-3 text-gray-400" />
                {job.salary}
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-500 font-medium">Apply by {job.deadline}</span>
              <button className="text-indigo-600 hover:text-indigo-700 font-bold text-sm flex items-center group">
                Apply Now <ExternalLink className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
