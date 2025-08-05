'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, FileText, Users, Award, Search, Filter, ChevronRight } from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  type: 'compulsory' | 'optional';
  group?: string;
  code: string;
}

interface SyllabusData {
  compulsory: Subject[];
  optional: Subject[];
  groups: {
    [key: string]: {
      name: string;
      subjects: Subject[];
    };
  };
  counts: {
    compulsory: number;
    optional: number;
    total: number;
  };
}

export default function SyllabusPage() {
  const [subjectsData, setSubjectsData] = useState<SyllabusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'compulsory' | 'optional'>('all');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await fetch('/api/subjects');
      const data = await response.json();
      setSubjectsData(data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredSubjects = () => {
    if (!subjectsData) return { compulsory: [], optional: [] };

    let filteredCompulsory = subjectsData.compulsory;
    let filteredOptional = subjectsData.optional;

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filteredCompulsory = filteredCompulsory.filter(subject =>
        subject.name.toLowerCase().includes(searchLower) ||
        subject.code.toLowerCase().includes(searchLower)
      );
      filteredOptional = filteredOptional.filter(subject =>
        subject.name.toLowerCase().includes(searchLower) ||
        subject.code.toLowerCase().includes(searchLower)
      );
    }

    // Filter by group (for optional subjects)
    if (selectedGroup !== 'all') {
      filteredOptional = filteredOptional.filter(subject => subject.group === selectedGroup);
    }

    return { compulsory: filteredCompulsory, optional: filteredOptional };
  };

  const getSyllabusPreview = (subjectId: string) => {
    // Placeholder syllabus content - this would be replaced with actual syllabus data
    const syllabusMap: { [key: string]: string } = {
      'english-essay': 'Candidates write one or more essays in English with wide choice of topics. Evaluation focuses on comprehensive research-based knowledge, articulation, expression, and technical essay writing style.',
      'english-precis': 'Precis Writing (20) + Reading Comprehension (20) + Grammar & Vocabulary (20) + Sentence Correction (10) + Grouping of Words (10) + Pairs of Words (10) + Translation (10). Tests précis, comprehension, grammar, vocabulary, and translation skills.',
      'general-science': 'Part-I (General Science - 60 Marks): Physical Sciences, Biological Sciences, Environmental Science, Food Science, Information Technology. Part-II (General Ability - 40 Marks): Quantitative Reasoning, Logical Reasoning, Mental Abilities.',
      'current-affairs': 'National and international current events, political developments, economic trends, and social issues.',
      'pakistan-affairs': 'History of Pakistan, constitutional development, political system, and contemporary issues.',
      'islamic-studies': 'Islamic history, Islamic civilization, Islamic law, and contemporary Islamic thought.',
      'comparative-religions': 'Study of major world religions, comparative analysis, and religious diversity.',
      'economics': 'Microeconomics, macroeconomics, economic development, international trade, and economic policy.',
      'computer-science': 'Programming fundamentals, data structures, algorithms, database systems, and software engineering.',
      'physics': 'Classical mechanics, thermodynamics, electromagnetism, quantum physics, and modern physics.',
      'chemistry': 'Organic chemistry, inorganic chemistry, physical chemistry, and analytical chemistry.',
      'mathematics': 'Calculus, linear algebra, differential equations, and mathematical analysis.',
      'history': 'World history, regional history, historical methodology, and historiography.',
      'geography': 'Physical geography, human geography, regional geography, and geographical techniques.',
      'law': 'Constitutional law, criminal law, civil law, international law, and legal systems.',
      'psychology': 'General psychology, social psychology, developmental psychology, and clinical psychology.',
      'sociology': 'Sociological theory, social institutions, social change, and research methods.',
      'political-science': 'Political theory, comparative politics, international relations, and public administration.',
      'literature': 'Literary theory, critical analysis, genre studies, and literary history.',
      'languages': 'Language structure, linguistics, translation, and language teaching.'
    };

    return syllabusMap[subjectId] || 'Comprehensive syllabus covering all aspects of the subject including theoretical concepts, practical applications, and contemporary developments.';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading syllabus...</p>
          </div>
        </div>
      </div>
    );
  }

  const { compulsory, optional } = getFilteredSubjects();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Complete Syllabus
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Comprehensive CSS examination syllabus for all compulsory and optional subjects
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        {subjectsData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-purple-600">{subjectsData.counts.compulsory}</div>
              <div className="text-gray-600">Compulsory Subjects</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-blue-600">{subjectsData.counts.optional}</div>
              <div className="text-gray-600">Optional Subjects</div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-green-600">{subjectsData.counts.total}</div>
              <div className="text-gray-600">Total Subjects</div>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search subjects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
        </div>
      </div>

            {/* Type Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  selectedType === 'all'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedType('compulsory')}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  selectedType === 'compulsory'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Compulsory
              </button>
                  <button
                onClick={() => setSelectedType('optional')}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  selectedType === 'optional'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Optional
                  </button>
            </div>

            {/* Group Filter (for optional subjects) */}
            {selectedType === 'optional' && (
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Groups</option>
                {subjectsData && Object.entries(subjectsData.groups).map(([key, group]) => (
                  <option key={key} value={key}>{group.name}</option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Compulsory Subjects */}
        {(selectedType === 'all' || selectedType === 'compulsory') && compulsory.length > 0 && (
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
                <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                  Compulsory
                </span>
                Compulsory Subjects Syllabus
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                All candidates must study these compulsory subjects. Click on any subject to view detailed syllabus.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {compulsory.map((subject) => (
                <div key={subject.id} className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{subject.name}</h3>
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
                        {subject.code}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {getSyllabusPreview(subject.id)}
                    </p>
                    
                                         <div className="flex items-center justify-between">
                       <Link
                         href={`/syllabus/${subject.id}`}
                         className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                       >
                         View Full Syllabus
                         <ChevronRight className="ml-1 h-4 w-4" />
                       </Link>
                     </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Optional Subjects */}
        {(selectedType === 'all' || selectedType === 'optional') && optional.length > 0 && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                  Optional
                </span>
                Optional Subjects Syllabus
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Choose from these optional subjects based on your interests and background. Each group has specific subjects.
              </p>
            </div>

            {selectedGroup === 'all' ? (
              // Show all groups
              Object.entries(subjectsData?.groups || {}).map(([groupKey, group]) => (
                <div key={groupKey} className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-2">
                    {group.name}
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {group.subjects.filter(subject => 
                      optional.some(opt => opt.id === subject.id)
                    ).map((subject) => (
                      <div key={subject.id} className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-bold text-gray-900">{subject.name}</h4>
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                              {subject.code}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 mb-4 leading-relaxed">
                            {getSyllabusPreview(subject.id)}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <Link
                              href={`/syllabus/${subject.id}`}
                              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                            >
                              View Full Syllabus
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                          </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))
            ) : (
              // Show specific group
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {optional.map((subject) => (
                  <div key={subject.id} className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-900">{subject.name}</h3>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                          {subject.code}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {getSyllabusPreview(subject.id)}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <Link
                          href={`/syllabus/${subject.id}`}
                          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                        >
                          View Full Syllabus
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            </div>
          )}

        {/* No Results */}
        {compulsory.length === 0 && optional.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No subjects found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or filters to see more results.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedType('all');
                setSelectedGroup('all');
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Clear Filters
            </button>
            </div>
          )}


      </div>
    </div>
  );
}