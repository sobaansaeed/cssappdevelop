'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Subject {
  id: string;
  name: string;
  type: 'compulsory' | 'optional';
  group?: string;
  code: string;
}

interface PastPaper {
  id: string;
  subjectId: string;
  subjectName: string;
  subjectType: 'compulsory' | 'optional';
  subjectGroup?: string;
  year: string;
  title: string;
  fileUrl: string;
  uploadDate: string;
  description: string;
}

export default function SubjectPastPapersPage() {
  const params = useParams();
  const subjectId = params.subjectId as string;
  
  const [subject, setSubject] = useState<Subject | null>(null);
  const [pastPapers, setPastPapers] = useState<PastPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<string>('all');

  useEffect(() => {
    if (subjectId) {
      fetchSubjectData();
      fetchPastPapers();
    }
  }, [subjectId]);

  const fetchSubjectData = async () => {
    try {
      const response = await fetch('/api/subjects');
      const data = await response.json();
      
      // Find the subject in either compulsory or optional
      const foundSubject = data.compulsory.find((s: Subject) => s.id === subjectId) ||
                          data.optional.find((s: Subject) => s.id === subjectId);
      
      if (foundSubject) {
        setSubject(foundSubject);
      }
    } catch (error) {
      console.error('Error fetching subject data:', error);
    }
  };

  const fetchPastPapers = async () => {
    try {
      const response = await fetch(`/api/past-papers?subjectId=${subjectId}`);
      const data = await response.json();
      setPastPapers(data.pastPapers || []);
    } catch (error) {
      console.error('Error fetching past papers:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAvailableYears = () => {
    const years = pastPapers.map(paper => paper.year);
    return [...new Set(years)].sort((a, b) => parseInt(b) - parseInt(a));
  };

  const getFilteredPapers = () => {
    if (selectedYear === 'all') {
      return pastPapers.sort((a, b) => parseInt(b.year) - parseInt(a.year));
    }
    return pastPapers
      .filter(paper => paper.year === selectedYear)
      .sort((a, b) => parseInt(b.year) - parseInt(a.year));
  };

  const handleDownload = (fileUrl: string, title: string) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading past papers...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!subject) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Subject Not Found</h1>
            <p className="text-gray-600 mb-6">The requested subject could not be found.</p>
            <Link
              href="/past-papers"
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Back to Past Papers
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const availableYears = getAvailableYears();
  const filteredPapers = getFilteredPapers();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/past-papers" className="hover:text-purple-600">
                Past Papers
              </Link>
            </li>
            <li>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </li>
            <li className="text-gray-900 font-medium">{subject.name}</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{subject.name}</h1>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  subject.type === 'compulsory' 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {subject.type === 'compulsory' ? 'Compulsory' : 'Optional'}
                </span>
                <span className="text-gray-600">Code: {subject.code}</span>
                {subject.group && (
                  <span className="text-gray-600">Group: {subject.group.replace('group', 'Group ')}</span>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">{pastPapers.length}</div>
              <div className="text-gray-600">Past Papers</div>
            </div>
          </div>
          
          <p className="text-gray-600">
            Access past papers for {subject.name} from multiple years. Download and practice with authentic CSS examination papers.
          </p>
        </div>

        {/* Year Filter */}
        {availableYears.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter by Year</h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedYear('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedYear === 'all'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Years ({pastPapers.length})
              </button>
              {availableYears.map((year) => {
                const yearCount = pastPapers.filter(paper => paper.year === year).length;
                return (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedYear === year
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {year} ({yearCount})
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Past Papers Grid */}
        {filteredPapers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPapers.map((paper) => (
              <div key={paper.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{paper.title}</h3>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                      {paper.year}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Uploaded: {new Date(paper.uploadDate).toLocaleDateString()}
                    </div>
                    {paper.description && (
                      <p className="text-gray-500">{paper.description}</p>
                    )}
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => window.open(paper.fileUrl, '_blank')}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View
                    </button>
                    <button
                      onClick={() => handleDownload(paper.fileUrl, paper.title)}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">📄</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No past papers available</h3>
            <p className="text-gray-600 mb-6">
              {selectedYear === 'all' 
                ? `No past papers have been uploaded for ${subject.name} yet.`
                : `No past papers available for ${subject.name} in ${selectedYear}.`
              }
            </p>
            <Link
              href="/past-papers"
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Back to All Subjects
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 