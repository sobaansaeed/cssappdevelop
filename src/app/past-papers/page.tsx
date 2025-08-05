'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface Subject {
  id: string;
  name: string;
  type: 'compulsory' | 'optional';
  group?: string;
  code: string;
}

interface Group {
  name: string;
  subjects: Subject[];
}

interface SubjectsData {
  compulsory: Subject[];
  optional: Subject[];
  groups: {
    [key: string]: Group;
  };
  counts: {
    compulsory: number;
    optional: number;
    total: number;
  };
}

interface PastPaper {
  id: string;
  subjectId: string;
  subjectName: string;
  subjectType: 'compulsory' | 'optional';
  subjectGroup?: string;
  year: string;
  paperNumber?: string | null;
  title: string;
  fileUrl: string;
  uploadDate: string;
  description: string;
}

export default function PastPapersPage() {
  const [subjectsData, setSubjectsData] = useState<SubjectsData | null>(null);
  const [pastPapers, setPastPapers] = useState<PastPaper[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedType, setSelectedType] = useState<'compulsory' | 'optional' | 'all'>('all');



  const fetchSubjects = useCallback(async () => {
    try {
      const response = await fetch('/api/subjects');
      const data = await response.json();
      setSubjectsData(data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  }, []);

  const fetchPastPapers = useCallback(async () => {
    try {
      const response = await fetch('/api/past-papers');
      const data = await response.json();
      setPastPapers(data.pastPapers || []);
    } catch (error) {
      console.error('Error fetching past papers:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubjects();
    fetchPastPapers();
  }, [fetchSubjects, fetchPastPapers]);

  const getPastPapersForSubject = (subjectId: string) => {
    return pastPapers.filter(paper => paper.subjectId === subjectId);
  };

  const getAvailableYears = (subjectId: string) => {
    const papers = getPastPapersForSubject(subjectId);
    return papers.map(paper => paper.year).sort((a, b) => parseInt(b) - parseInt(a));
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            CSS Past Papers Collection
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive collection of CSS past papers for all compulsory and optional subjects. 
            Access papers from multiple years to enhance your preparation.
          </p>
        </div>

        {/* Stats */}
        {subjectsData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-3xl font-bold text-purple-600">{subjectsData.counts.compulsory}</div>
              <div className="text-gray-600">Compulsory Subjects</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-3xl font-bold text-blue-600">{subjectsData.counts.optional}</div>
              <div className="text-gray-600">Optional Subjects</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-3xl font-bold text-green-600">{pastPapers.length}</div>
              <div className="text-gray-600">Past Papers Available</div>
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center mb-8">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedType === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            All Subjects
          </button>
          <button
            onClick={() => setSelectedType('compulsory')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedType === 'compulsory'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Compulsory
          </button>
          <button
            onClick={() => setSelectedType('optional')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedType === 'optional'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Optional
          </button>
        </div>

        {/* Compulsory Subjects */}
        {subjectsData && (selectedType === 'all' || selectedType === 'compulsory') && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium mr-3">
                Compulsory
              </span>
              Compulsory Subjects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjectsData.compulsory.map((subject) => {
                const years = getAvailableYears(subject.id);
                return (
                  <div key={subject.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{subject.name}</h3>
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">
                          {subject.code}
                        </span>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Available Years:</p>
                        {years.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {years.map((year) => (
                              <span
                                key={year}
                                className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium"
                              >
                                {year}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">No papers available</span>
                        )}
                      </div>
                      <Link
                        href={`/past-papers/${subject.id}`}
                        className="inline-flex items-center justify-center w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        View Papers
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Optional Subjects */}
        {subjectsData && (selectedType === 'all' || selectedType === 'optional') && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mr-3">
                Optional
              </span>
              Optional Subjects
            </h2>
            {Object.entries(subjectsData.groups).map(([groupKey, group]) => (
              <div key={groupKey} className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                  {group.name}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.subjects.map((subject) => {
                    const years = getAvailableYears(subject.id);
                    return (
                      <div key={subject.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-semibold text-gray-900">{subject.name}</h4>
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                              {subject.code}
                            </span>
                          </div>
                          <div className="mb-4">
                            <p className="text-sm text-gray-600 mb-2">Available Years:</p>
                            {years.length > 0 ? (
                              <div className="flex flex-wrap gap-2">
                                {years.map((year) => (
                                  <span
                                    key={year}
                                    className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium"
                                  >
                                    {year}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <span className="text-gray-400 text-sm">No papers available</span>
                            )}
                          </div>
                          <Link
                            href={`/past-papers/${subject.id}`}
                            className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            View Papers
                            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}