'use client';

import React, { useState } from 'react';
import { Target, Clock, Star, FileText, CheckCircle, AlertCircle, Calendar, TrendingUp } from 'lucide-react';

const ExamPatternPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const examStructure = [
    {
      phase: 'Written Examination',
      duration: '3 months',
      subjects: 11,
      totalMarks: 1100,
      description: 'Main examination consisting of compulsory and optional subjects',
      status: 'primary'
    },
    {
      phase: 'Interview/Viva',
      duration: '1 day',
      subjects: 1,
      totalMarks: 300,
      description: 'Personality assessment and general knowledge interview',
      status: 'secondary'
    }
  ];

  const examSchedule = [
    { day: 'Day 1', subject: 'English Essay & Composition', time: '9:00 AM - 12:00 PM' },
    { day: 'Day 2', subject: 'General Knowledge', time: '9:00 AM - 12:00 PM' },
    { day: 'Day 3', subject: 'Pakistan Affairs', time: '9:00 AM - 12:00 PM' },
    { day: 'Day 4', subject: 'Current Affairs', time: '9:00 AM - 12:00 PM' },
    { day: 'Day 5', subject: 'Islamic Studies/Ethics', time: '9:00 AM - 12:00 PM' },
    { day: 'Day 6', subject: 'Optional Subject 1', time: '9:00 AM - 12:00 PM' },
    { day: 'Day 7', subject: 'Optional Subject 2', time: '9:00 AM - 12:00 PM' },
    { day: 'Day 8', subject: 'Optional Subject 3', time: '9:00 AM - 12:00 PM' },
    { day: 'Day 9', subject: 'Optional Subject 4', time: '9:00 AM - 12:00 PM' },
    { day: 'Day 10', subject: 'Optional Subject 5', time: '9:00 AM - 12:00 PM' },
    { day: 'Day 11', subject: 'Optional Subject 6', time: '9:00 AM - 12:00 PM' }
  ];

  const markingScheme = [
    {
      category: 'Essay Writing',
      marks: '50-60',
      criteria: ['Content Quality', 'Language & Style', 'Organization', 'Grammar']
    },
    {
      category: 'Objective Questions',
      marks: '40-50',
      criteria: ['Factual Knowledge', 'Understanding', 'Application', 'Analysis']
    }
  ];

  const importantDates = [
    { event: 'Application Start', date: 'October 2024', status: 'upcoming' },
    { event: 'Application Deadline', date: 'November 2024', status: 'upcoming' },
    { event: 'Written Examination', date: 'February 2025', status: 'upcoming' },
    { event: 'Result Declaration', date: 'May 2025', status: 'upcoming' },
    { event: 'Interview Phase', date: 'June 2025', status: 'upcoming' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Target className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">CSS Exam Pattern</h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Detailed exam pattern, marking scheme, and guidelines for CSS examination 2024.
            </p>
            <div className="flex justify-center space-x-8 mt-8 text-purple-100">
              <div className="text-center">
                <div className="text-2xl font-bold">1100+300</div>
                <div className="text-sm">Total Marks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">11</div>
                <div className="text-sm">Written Papers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm">Hours Each</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Exam Overview', icon: Target },
                { id: 'schedule', label: 'Exam Schedule', icon: Calendar },
                { id: 'marking', label: 'Marking Scheme', icon: Star },
                { id: 'guidelines', label: 'Guidelines', icon: FileText }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSection(tab.id)}
                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                      activeSection === tab.id
                        ? 'border-purple-500 text-purple-600'
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

        {/* Content Sections */}
        <div className="bg-white rounded-lg shadow-sm">
          {activeSection === 'overview' && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Examination Overview</h2>
              
              {/* Exam Structure */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {examStructure.map((phase, index) => (
                  <div key={index} className={`border-2 rounded-lg p-6 ${
                    phase.status === 'primary' 
                      ? 'border-purple-200 bg-purple-50' 
                      : 'border-blue-200 bg-blue-50'
                  }`}>
                    <h3 className={`text-lg font-semibold mb-3 ${
                      phase.status === 'primary' ? 'text-purple-900' : 'text-blue-900'
                    }`}>
                      {phase.phase}
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{phase.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subjects:</span>
                        <span className="font-medium">{phase.subjects}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Marks:</span>
                        <span className="font-medium">{phase.totalMarks}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm mt-3">{phase.description}</p>
                  </div>
                ))}
              </div>

              {/* Important Dates */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Important Dates 2024-25</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {importantDates.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{item.event}</h4>
                        <Calendar className="h-4 w-4 text-purple-500" />
                      </div>
                      <p className="text-purple-600 font-semibold">{item.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'schedule' && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Examination Schedule</h2>
              <p className="text-gray-600 mb-8">Daily examination schedule for CSS written examination.</p>
              
              <div className="space-y-4">
                {examSchedule.map((exam, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                        <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                          {exam.day}
                        </div>
                        <h3 className="font-semibold text-gray-900">{exam.subject}</h3>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{exam.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-2">Important Notes</h4>
                    <ul className="text-blue-800 text-sm space-y-1">
                      <li>• All examinations start at 9:00 AM sharp</li>
                      <li>• Duration of each paper is 3 hours</li>
                      <li>• Candidates must report 30 minutes before exam time</li>
                      <li>• No extra time will be given for any reason</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'marking' && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Marking Scheme</h2>
              <p className="text-gray-600 mb-8">Understanding how CSS papers are evaluated and marked.</p>
              
              {/* Marking Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {markingScheme.map((scheme, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{scheme.category}</h3>
                    <div className="mb-4">
                      <span className="text-2xl font-bold text-purple-600">{scheme.marks}</span>
                      <span className="text-gray-600 ml-2">marks</span>
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">Evaluation Criteria:</h4>
                    <ul className="space-y-2">
                      {scheme.criteria.map((criterion, i) => (
                        <li key={i} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-gray-700 text-sm">{criterion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Grade Distribution */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Grade Distribution</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-green-100 rounded-lg">
                    <div className="text-lg font-bold text-green-800">80-100</div>
                    <div className="text-green-600 text-sm">Grade A</div>
                  </div>
                  <div className="text-center p-4 bg-blue-100 rounded-lg">
                    <div className="text-lg font-bold text-blue-800">70-79</div>
                    <div className="text-blue-600 text-sm">Grade B</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-100 rounded-lg">
                    <div className="text-lg font-bold text-yellow-800">60-69</div>
                    <div className="text-yellow-600 text-sm">Grade C</div>
                  </div>
                  <div className="text-center p-4 bg-red-100 rounded-lg">
                    <div className="text-lg font-bold text-red-800">50-59</div>
                    <div className="text-red-600 text-sm">Grade D</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'guidelines' && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Examination Guidelines</h2>
              
              <div className="space-y-8">
                {/* Before Exam */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Before the Examination</h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                        <span className="text-gray-700">Reach the examination center 30 minutes before the exam</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                        <span className="text-gray-700">Bring original CNIC and admit card</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                        <span className="text-gray-700">Use only blue or black ink pen</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                        <span className="text-gray-700">Mobile phones and electronic devices are not allowed</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* During Exam */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">During the Examination</h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <span className="text-gray-700">Read all questions carefully before attempting</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <span className="text-gray-700">Attempt all compulsory questions</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <span className="text-gray-700">Manage your time effectively (3 hours per paper)</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <span className="text-gray-700">Write clearly and legibly</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Answer Writing Tips */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Answer Writing Tips</h3>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-2">
                        <TrendingUp className="h-5 w-5 text-purple-600 mt-0.5" />
                        <span className="text-gray-700">Structure your answers with clear introduction, body, and conclusion</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <TrendingUp className="h-5 w-5 text-purple-600 mt-0.5" />
                        <span className="text-gray-700">Use relevant examples and case studies</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <TrendingUp className="h-5 w-5 text-purple-600 mt-0.5" />
                        <span className="text-gray-700">Maintain word limits for essay questions</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <TrendingUp className="h-5 w-5 text-purple-600 mt-0.5" />
                        <span className="text-gray-700">Review your answers if time permits</span>
                      </li>
                    </ul>
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

export default ExamPatternPage;