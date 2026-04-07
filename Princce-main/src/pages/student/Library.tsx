import { useState } from 'react';
import { BookOpen, Search, Download, Clock, BookMarked, Filter, FileText } from 'lucide-react';
import Card from '../../components/Card';

export default function Library() {
  const [activeTab, setActiveTab] = useState('ebooks');

  const ebooks = [
    { id: 1, title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', course: 'Computer Science', type: 'Textbook' },
    { id: 2, title: 'Database System Concepts', author: 'Silberschatz', course: 'Computer Science', type: 'Reference' },
    { id: 3, title: 'Engineering Mathematics', author: 'K.A. Stroud', course: 'General', type: 'Textbook' },
  ];

  const pastPapers = [
    { id: 1, title: 'Data Structures - Midterm 2023', year: '2023', type: 'Midterm', branch: 'CSE' },
    { id: 2, title: 'Operating Systems - Finals 2022', year: '2022', type: 'Final', branch: 'CSE' },
    { id: 3, title: 'Calculus I - Spring 2023', year: '2023', type: 'Midterm', branch: 'General' },
  ];

  const issuedBooks = [
    { id: 1, title: 'Clean Code', author: 'Robert C. Martin', issuedDate: '2023-10-15', dueDate: '2023-11-15', status: 'Active' },
    { id: 2, title: 'Design Patterns', author: 'Gang of Four', issuedDate: '2023-09-01', dueDate: '2023-10-01', status: 'Overdue' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start border-b border-gray-200 pb-5 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Library & Resources</h1>
          <p className="mt-1 text-gray-600">Access e-books, past question papers, and track physical issued books.</p>
        </div>
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search catalog..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      <div className="flex space-x-1 border-b border-gray-200 overflow-x-auto pb-px">
        <button
          onClick={() => setActiveTab('ebooks')}
          className={`flex items-center px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
            activeTab === 'ebooks' ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          <BookOpen className="w-4 h-4 mr-2" /> E-Library
        </button>
        <button
          onClick={() => setActiveTab('papers')}
          className={`flex items-center px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
            activeTab === 'papers' ? 'bg-purple-50 text-purple-700 border-b-2 border-purple-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Filter className="w-4 h-4 mr-2" /> Past Papers
        </button>
        <button
          onClick={() => setActiveTab('issued')}
          className={`flex items-center px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
            activeTab === 'issued' ? 'bg-green-50 text-green-700 border-b-2 border-green-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          <BookMarked className="w-4 h-4 mr-2" /> Issued Books
        </button>
      </div>

      <div className="pt-4">
        {activeTab === 'ebooks' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ebooks.map(book => (
              <Card key={book.id}>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">{book.type}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{book.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{book.author}</p>
                <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">{book.course}</span>
                  <button className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors">
                     Read <Download className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'papers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastPapers.map(paper => (
              <Card key={paper.id}>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs font-bold rounded">{paper.year}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2">{paper.title}</h3>
                <div className="flex space-x-2 mb-4">
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">{paper.branch}</span>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">{paper.type}</span>
                </div>
                <div className="flex justify-end border-t border-gray-100 pt-4">
                  <button className="flex items-center text-sm text-purple-600 hover:text-purple-700 transition-colors font-medium">
                     Download PDF <Download className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'issued' && (
          <div className="bg-white border text-left border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book Details</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issued On</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {issuedBooks.map(book => (
                  <tr key={book.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <BookMarked className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{book.title}</div>
                          <div className="text-sm text-gray-500">{book.author}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {book.issuedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-gray-400" /> {book.dueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        book.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {book.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
