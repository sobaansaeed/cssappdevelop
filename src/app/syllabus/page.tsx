'use client';

import React, { useState } from 'react';
import { Book, FileText, Target, Clock, Star, CheckCircle } from 'lucide-react';

const SyllabusPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('compulsory');

  const compulsorySubjects = [
    {
      name: 'English Essay & Composition',
      marks: 100,
      duration: '3 Hours',
      topics: [
        'Essay Writing (600-700 words)',
        'Précis Writing',
        'Comprehension',
        'Grammar & Usage',
        'Sentence Correction',
        'Vocabulary Building'
      ]
    },
    {
      name: 'General Knowledge',
      marks: 100,
      duration: '3 Hours',
      topics: [
        'Geography (Physical & Human)',
        'History (World & Pakistan)',
        'Science & Technology',
        'Arts & Literature',
        'Sports & Games',
        'Current Affairs'
      ]
    },
    {
      name: 'Pakistan Affairs',
      marks: 100,
      duration: '3 Hours',
      topics: [
        'Political History',
        'Constitutional Development',
        'Economic Development',
        'Foreign Policy',
        'Social & Cultural Issues',
        'Administrative Structure'
      ]
    },
    {
      name: 'Current Affairs',
      marks: 100,
      duration: '3 Hours',
      topics: [
        'National Affairs',
        'International Relations',
        'Economic Issues',
        'Environmental Concerns',
        'Scientific Developments',
        'Regional Politics'
      ]
    },
    {
      name: 'Islamic Studies / Ethics',
      marks: 100,
      duration: '3 Hours',
      topics: [
        'Basic Islamic Concepts',
        'Islamic History',
        'Ethics & Moral Philosophy',
        'Islamic Jurisprudence',
        'Comparative Religion',
        'Islamic Civilization'
      ]
    }
  ];

  const optionalSubjects = [
    {
      category: 'Group A - Literature & Languages',
      subjects: [
        'English Literature',
        'Urdu Literature',
        'Arabic Literature',
        'Persian Literature',
        'French Literature',
        'German Literature'
      ]
    },
    {
      category: 'Group B - Social Sciences',
      subjects: [
        'History',
        'Geography',
        'Political Science',
        'International Relations',
        'Sociology',
        'Philosophy'
      ]
    },
    {
      category: 'Group C - Pure Sciences',
      subjects: [
        'Mathematics',
        'Physics',
        'Chemistry',
        'Statistics',
        'Geology',
        'Botany'
      ]
    },
    {
      category: 'Group D - Applied Sciences',
      subjects: [
        'Economics',
        'Public Administration',
        'Commerce & Accountancy',
        'Business Administration',
        'Law',
        'Journalism & Mass Communication'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Book className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Complete CSS Syllabus</h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Detailed CSS syllabus with compulsory and optional subjects. Updated for 2024 examination pattern.
            </p>
            <div className="flex justify-center space-x-8 mt-8 text-green-100">
              <div className="text-center">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm">Subjects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">2024</div>
                <div className="text-sm">Updated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">1100</div>
                <div className="text-sm">Total Marks</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'compulsory', label: 'Compulsory Subjects', icon: Target },
                { id: 'optional', label: 'Optional Subjects', icon: Star },
                { id: 'marks', label: 'Marks Distribution', icon: FileText }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm">
          {activeTab === 'compulsory' && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Compulsory Subjects</h2>
              <p className="text-gray-600 mb-8">All candidates must appear in these 5 compulsory subjects.</p>
              
              <div className="space-y-6">
                {compulsorySubjects.map((subject, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 sm:mb-0">{subject.name}</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1 text-yellow-500" />
                          Max Marks: {subject.marks}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-blue-500" />
                          Duration: {subject.duration}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {subject.topics.map((topic, topicIndex) => (
                        <div key={topicIndex} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'optional' && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Optional Subjects</h2>
              <p className="text-gray-600 mb-8">Candidates must choose 6 subjects from any group or combination of groups.</p>
              
              <div className="space-y-8">
                {optionalSubjects.map((group, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{group.category}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {group.subjects.map((subject, subjectIndex) => (
                        <div key={subjectIndex} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                          <div className="flex items-center space-x-2">
                            <Book className="h-4 w-4 text-green-500" />
                            <span className="font-medium text-gray-900">{subject}</span>
                          </div>
                          <div className="mt-2 text-sm text-gray-600">
                            <div className="flex items-center space-x-4">
                              <span>100 Marks</span>
                              <span>3 Hours</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'marks' && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Marks Distribution</h2>
              <p className="text-gray-600 mb-8">Complete breakdown of CSS examination marks structure.</p>
              
              <div className="space-y-8">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">5</div>
                    <div className="text-blue-800 font-medium">Compulsory Subjects</div>
                    <div className="text-blue-600 text-sm mt-1">500 Marks</div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">6</div>
                    <div className="text-green-800 font-medium">Optional Subjects</div>
                    <div className="text-green-600 text-sm mt-1">600 Marks</div>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">1100</div>
                    <div className="text-purple-800 font-medium">Total Marks</div>
                    <div className="text-purple-600 text-sm mt-1">11 Subjects</div>
                  </div>
                </div>

                {/* Detailed Table */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Detailed Marks Breakdown</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg overflow-hidden">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Component</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Subjects</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Marks per Subject</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Total Marks</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Percentage</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-4 text-gray-700">Compulsory Subjects</td>
                          <td className="py-3 px-4 text-gray-700">5</td>
                          <td className="py-3 px-4 text-gray-700">100</td>
                          <td className="py-3 px-4 text-gray-700">500</td>
                          <td className="py-3 px-4 text-gray-700">45.45%</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-4 text-gray-700">Optional Subjects</td>
                          <td className="py-3 px-4 text-gray-700">6</td>
                          <td className="py-3 px-4 text-gray-700">100</td>
                          <td className="py-3 px-4 text-gray-700">600</td>
                          <td className="py-3 px-4 text-gray-700">54.55%</td>
                        </tr>
                        <tr className="bg-gray-50 font-semibold">
                          <td className="py-3 px-4 text-gray-900">Grand Total</td>
                          <td className="py-3 px-4 text-gray-900">11</td>
                          <td className="py-3 px-4 text-gray-900">-</td>
                          <td className="py-3 px-4 text-gray-900">1100</td>
                          <td className="py-3 px-4 text-gray-900">100%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SyllabusPage;