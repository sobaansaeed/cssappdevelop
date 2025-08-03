'use client';

import React, { useState } from 'react';
import { Download, FileText, Calendar, Clock, Star, Filter } from 'lucide-react';

interface PastPaper {
  id: string;
  subject: string;
  year: number;
  examDate: string;
  duration: string;
  maxMarks: number;
}

const PastPapersPage: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const pastPapers: PastPaper[] = [
    {
      id: '1',
      subject: 'English Essay & Composition',
      year: 2024,
      examDate: 'March 15, 2024',
      duration: '3 Hours',
      maxMarks: 100
    },
    {
      id: '2',
      subject: 'General Knowledge',
      year: 2024,
      examDate: 'March 17, 2024',
      duration: '3 Hours',
      maxMarks: 100
    },
    {
      id: '3',
      subject: 'Pakistan Affairs',
      year: 2024,
      examDate: 'March 19, 2024',
      duration: '3 Hours',
      maxMarks: 100
    },
    {
      id: '4',
      subject: 'Current Affairs',
      year: 2024,
      examDate: 'March 21, 2024',
      duration: '3 Hours',
      maxMarks: 100
    },
    {
      id: '5',
      subject: 'Islamic Studies',
      year: 2024,
      examDate: 'March 23, 2024',
      duration: '3 Hours',
      maxMarks: 100
    },
    {
      id: '6',
      subject: 'English Essay & Composition',
      year: 2023,
      examDate: 'March 12, 2023',
      duration: '3 Hours',
      maxMarks: 100
    },
    {
      id: '7',
      subject: 'General Knowledge',
      year: 2023,
      examDate: 'March 14, 2023',
      duration: '3 Hours',
      maxMarks: 100
    },
    {
      id: '8',
      subject: 'Pakistan Affairs',
      year: 2023,
      examDate: 'March 16, 2023',
      duration: '3 Hours',
      maxMarks: 100
    }
  ];

  const years = ['all', '2024', '2023', '2022', '2021', '2020'];
  const subjects = ['all', 'english', 'general-knowledge', 'pakistan-affairs', 'current-affairs', 'islamic-studies'];

  const filteredPapers = pastPapers.filter(paper => {
    const yearMatch = selectedYear === 'all' || paper.year.toString() === selectedYear;
    const subjectMatch = selectedSubject === 'all' || 
      paper.subject.toLowerCase().replace(/\s+/g, '-').replace('&', '').includes(selectedSubject);
    return yearMatch && subjectMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <FileText className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Past Papers Collection</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Complete archive of CSS examination papers from 2010 to 2024. Download and practice with authentic past papers.
            </p>
            <div className="flex justify-center space-x-8 mt-8 text-blue-100">
              <div className="text-center">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm">Papers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">15</div>
                <div className="text-sm">Years</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm">Subjects</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-900">Filter Papers</h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Years</option>
                {years.slice(1).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Subjects</option>
                {subjects.slice(1).map(subject => (
                  <option key={subject} value={subject}>
                    {subject.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Papers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPapers.map((paper) => (
            <div key={paper.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 text-lg">{paper.subject}</h3>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                  {paper.year}
                </span>
              </div>
              <div className="space-y-3 text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                  Exam Date: {paper.examDate}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-green-500" />
                  Duration: {paper.duration}
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-2 text-yellow-500" />
                  Max Marks: {paper.maxMarks}
                </div>
              </div>
              <div className="flex space-x-3">
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center">
                  <FileText className="h-4 w-4 mr-2" />
                  View Paper
                </button>
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredPapers.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">📄</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No papers found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more results.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PastPapersPage;