
import { Award, Download, Printer, TrendingUp, BookOpen, CheckCircle2 } from 'lucide-react';
import Card from '../../components/Card';

export default function Results() {
  const cgpa = 8.75;
  const creditsEarned = 124;
  
  const semesters = [
    { sem: 'Semester 5', sgpa: 8.9, credits: 24, status: 'Released', courses: [
      { name: 'Machine Learning', grade: 'A', credits: 4 },
      { name: 'Cloud Computing', grade: 'A-', credits: 4 },
      { name: 'Software Engineering', grade: 'B+', credits: 3 },
    ]},
    { sem: 'Semester 4', sgpa: 8.5, credits: 22, status: 'Released', courses: [
      { name: 'Database Systems', grade: 'A', credits: 4 },
      { name: 'Operating Systems', grade: 'B+', credits: 4 },
      { name: 'Algorithm Design', grade: 'A-', credits: 4 },
    ]},
    { sem: 'Semester 3', sgpa: 8.8, credits: 26, status: 'Released', courses: [
      { name: 'Data Structures', grade: 'A', credits: 4 },
      { name: 'Computer Networks', grade: 'A', credits: 4 },
      { name: 'Discrete Math', grade: 'B', credits: 3 },
    ]}
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 pb-5 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Academic Results</h1>
          <p className="mt-1 text-gray-600">Track your CGPA, view semester breakdowns, and generate transcripts.</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handlePrint}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg shadow-sm"
          >
            <Printer className="w-4 h-4 mr-2" /> Print Results
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm">
            <Download className="w-4 h-4 mr-2" /> Official Transcript
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-0">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-100 font-medium mb-1">Cumulative GPA</p>
              <h2 className="text-5xl font-extrabold">{cgpa}</h2>
              <p className="text-blue-100 text-sm mt-2 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" /> Top 15% of class
              </p>
            </div>
            <div className="p-3 bg-white/20 rounded-xl">
              <Award className="w-8 h-8 text-white" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 font-medium mb-1">Total Credits Earned</p>
              <h2 className="text-4xl font-extrabold text-gray-900">{creditsEarned}</h2>
              <p className="text-gray-500 text-sm mt-2">out of 160 required</p>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 font-medium mb-1">Academic Standing</p>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">Excellent</h2>
              <p className="text-green-600 font-medium text-sm mt-2 flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-1" /> Cleared for Graduation
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-8 space-y-6">
        <h3 className="text-xl font-bold text-gray-900 border-b pb-2">Semester Breakdown</h3>
        
        {semesters.map((sem, idx) => (
          <Card key={idx} className="overflow-hidden p-0">
            <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-b border-gray-100">
              <div>
                <h4 className="text-lg font-bold text-gray-900">{sem.sem}</h4>
                <p className="text-sm text-gray-500">{sem.credits} Credits Completed</p>
              </div>
              <div className="text-right">
                <span className="block text-2xl font-bold text-blue-600">{sem.sgpa}</span>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">SGPA</span>
              </div>
            </div>
            <div className="px-6 py-4">
              <table className="w-full text-sm text-left">
                <thead className="text-gray-500 font-medium border-b border-gray-100">
                  <tr>
                    <th className="pb-3 w-1/2">Course Title</th>
                    <th className="pb-3 text-center">Credits</th>
                    <th className="pb-3 text-right">Grade Component</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {sem.courses.map((course, cIdx) => (
                    <tr key={cIdx}>
                      <td className="py-3 font-medium text-gray-900">{course.name}</td>
                      <td className="py-3 text-center text-gray-600">{course.credits}</td>
                      <td className="py-3 text-right font-bold text-gray-900">{course.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
