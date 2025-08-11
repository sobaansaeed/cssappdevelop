'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Trophy, Bell, CheckCircle, AlertCircle, Circle, FileText, Award, Star, Info } from 'lucide-react';

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  phase: string;
  category: 'mpt' | 'registration' | 'examination' | 'results';
  priority: 'high' | 'medium' | 'low';
}

interface Reminder {
  id: string;
  title: string;
  description: string;
  type: 'urgent' | 'important' | 'info';
  timeRemaining?: string;
  action?: string;
}

const TimelinePage: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    mptRegistrationDays: 0,
    mptRegistrationHours: 0,
    mptRegistrationMinutes: 0,
    mptRegistrationSeconds: 0,
    mptExamDays: 0,
    mptExamHours: 0,
    mptExamMinutes: 0,
    mptExamSeconds: 0
  });

  const [email, setEmail] = useState('');
  const [notifications, setNotifications] = useState({
    deadlines: true,
    results: true,
    tips: false
  });

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [subscribing, setSubscribing] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      
      // MPT Registration deadline: August 25, 2025
      const mptRegistrationDate = new Date('2025-08-25T23:59:59').getTime();
      const mptRegistrationDiff = mptRegistrationDate - now;
      
      // MPT Exam date: November 9, 2025
      const mptExamDate = new Date('2025-11-09T09:00:00').getTime();
      const mptExamDiff = mptExamDate - now;
      
      if (mptRegistrationDiff > 0) {
        const mptRegistrationDays = Math.floor(mptRegistrationDiff / (1000 * 60 * 60 * 24));
        const mptRegistrationHours = Math.floor((mptRegistrationDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mptRegistrationMinutes = Math.floor((mptRegistrationDiff % (1000 * 60 * 60)) / (1000 * 60));
        const mptRegistrationSeconds = Math.floor((mptRegistrationDiff % (1000 * 60)) / 1000);
        
        setTimeLeft(prev => ({
          ...prev,
          mptRegistrationDays,
          mptRegistrationHours,
          mptRegistrationMinutes,
          mptRegistrationSeconds
        }));
      }
      
      if (mptExamDiff > 0) {
        const mptExamDays = Math.floor(mptExamDiff / (1000 * 60 * 60 * 24));
        const mptExamHours = Math.floor((mptExamDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mptExamMinutes = Math.floor((mptExamDiff % (1000 * 60 * 60)) / (1000 * 60));
        const mptExamSeconds = Math.floor((mptExamDiff % (1000 * 60)) / 1000);
        
        setTimeLeft(prev => ({
          ...prev,
          mptExamDays,
          mptExamHours,
          mptExamMinutes,
          mptExamSeconds
        }));
      }
    };

    // Calculate immediately
    calculateTimeLeft();
    
    // Update every second
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  const timelineEvents: TimelineEvent[] = [
    {
      id: '1',
      date: 'August 10, 2025',
      title: 'MPT Public Notice Published',
      description: 'FPSC announces the MCQ-Based Preliminary Test (MPT) for CSS 2026 with detailed instructions and eligibility criteria.',
      status: 'upcoming',
      phase: 'MPT Phase',
      category: 'mpt',
      priority: 'high'
    },
    {
      id: '2',
      date: 'August 11-25, 2025',
      title: 'MPT Online Applications Open',
      description: 'Online registration portal activated for MPT. Candidates can submit applications with required documents and fees.',
      status: 'upcoming',
      phase: 'MPT Registration',
      category: 'mpt',
      priority: 'high'
    },
    {
      id: '3',
      date: 'November 9, 2025',
      title: 'MPT Examination',
      description: 'MCQ-Based Preliminary Test conducted with 200 multiple choice questions. 33% passing mark required, no negative marking.',
      status: 'upcoming',
      phase: 'MPT Exam',
      category: 'mpt',
      priority: 'high'
    },
    {
      id: '4',
      date: 'November 2025',
      title: 'MPT Results Announcement',
      description: 'MPT results are announced. Only successful candidates (33% or above) become eligible for the main written examination.',
      status: 'upcoming',
      phase: 'MPT Results',
      category: 'results',
      priority: 'high'
    },
    {
      id: '5',
      date: 'December 14, 2025',
      title: 'Main Exam Public Notice',
      description: 'FPSC publishes public notice for CSS 2026 main written examination. Only MPT qualifiers can apply.',
      status: 'upcoming',
      phase: 'Main Exam Registration',
      category: 'registration',
      priority: 'high'
    },
    {
      id: '6',
      date: 'December 15-30, 2025',
      title: 'Main Exam Applications',
      description: 'Online applications for main written examination open exclusively for MPT qualifiers.',
      status: 'upcoming',
      phase: 'Main Exam Registration',
      category: 'registration',
      priority: 'high'
    },
    {
      id: '7',
      date: 'January 9, 2026',
      title: 'Hardcopy Submission Deadline',
      description: 'Last date to submit hardcopy application forms and supporting documents for main written examination.',
      status: 'upcoming',
      phase: 'Documentation',
      category: 'registration',
      priority: 'high'
    },
    {
      id: '8',
      date: 'February 4, 2026',
      title: 'Written Examination Begins',
      description: 'CSS 2026 written examination commences with compulsory subjects. Exam will run for several days.',
      status: 'upcoming',
      phase: 'Written Exam',
      category: 'examination',
      priority: 'high'
    },
    {
      id: '9',
      date: 'February 4-22, 2026',
      title: 'Complete Written Examination',
      description: 'All written examination papers including essay, compulsory subjects, and optional subjects are completed.',
      status: 'upcoming',
      phase: 'Written Exam',
      category: 'examination',
      priority: 'high'
    }
  ];

  const reminders: Reminder[] = [
    {
      id: '1',
      title: 'MPT Registration Opens Soon',
      description: 'MPT applications will open on August 11, 2025. This is a new requirement for CSS 2026.',
      type: 'urgent',
      timeRemaining: 'Coming Soon',
      action: 'Prepare Documents'
    },
    {
      id: '2',
      title: 'Age Limit Increased',
      description: 'Maximum age limit raised from 30 to 35 years effective from 2026. More candidates now eligible.',
      type: 'important',
      timeRemaining: 'New Policy',
      action: 'Check Eligibility'
    },
    {
      id: '3',
      title: 'MPT Requirement',
      description: 'Candidates must pass MPT (33% marks) to be eligible for main written examination.',
      type: 'info',
      timeRemaining: 'Mandatory',
      action: 'Learn More'
    },
    {
      id: '4',
      title: 'Document Preparation',
      description: 'Start preparing all required documents for both MPT and main examination applications.',
      type: 'info',
      timeRemaining: 'Ongoing',
      action: 'Check List'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'current':
        return <AlertCircle className="h-5 w-5 text-orange-600" />;
      default:
        return <Circle className="h-5 w-5 text-blue-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-500 bg-green-50';
      case 'current':
        return 'border-orange-500 bg-orange-50';
      default:
        return 'border-blue-500 bg-blue-50';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'mpt':
        return <Star className="h-4 w-4" />;
      case 'registration':
        return <FileText className="h-4 w-4" />;
      case 'examination':
        return <Calendar className="h-4 w-4" />;
      case 'results':
        return <Award className="h-4 w-4" />;
      default:
        return <Circle className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'mpt':
        return 'bg-purple-100 text-purple-800';
      case 'registration':
        return 'bg-blue-100 text-blue-800';
      case 'examination':
        return 'bg-green-100 text-green-800';
      case 'results':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getReminderIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return <AlertCircle className="h-6 w-6 text-red-600" />;
      case 'important':
        return <Clock className="h-6 w-6 text-orange-600" />;
      default:
        return <Bell className="h-6 w-6 text-blue-600" />;
    }
  };

  const getReminderColor = (type: string) => {
    switch (type) {
      case 'urgent':
        return 'border-red-500 bg-red-50';
      case 'important':
        return 'border-orange-500 bg-orange-500';
      default:
        return 'border-blue-500 bg-blue-50';
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribing(true);
    setSubscribeStatus(null);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'timeline',
          preferences: notifications
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubscribeStatus({
          success: true,
          message: 'Successfully subscribed to notifications!'
        });
        setEmail('');
        setNotifications({
          deadlines: false,
          results: false,
          tips: false
        });
      } else {
        setSubscribeStatus({
          success: false,
          message: data.message || 'Failed to subscribe. Please try again.'
        });
      }
    } catch {
      setSubscribeStatus({
        success: false,
        message: 'An error occurred. Please try again.'
      });
    } finally {
      setSubscribing(false);
    }
  };

  const filteredEvents = activeFilter === 'all' 
    ? timelineEvents 
    : timelineEvents.filter(event => event.category === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              CSS 2026 Timeline
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Complete examination schedule with new MPT requirement and updated age limit for CSS 2026
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Important Notice - Age Limit Change */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 lg:p-8 mb-12 text-white">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4">
              <Info className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold mb-2">🎉 Major Policy Change for 2026!</h2>
            <p className="text-green-100 text-lg">Maximum age limit increased from 30 to 35 years</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
            <p className="text-lg text-white mb-4">
              <strong>Effective from CSS 2026:</strong> The Federal Public Service Commission (FPSC) has increased the maximum age limit for CSS candidates from 30 to 35 years.
            </p>
            <p className="text-green-100">
              This change provides more opportunities for candidates and aligns with modern workforce trends.
            </p>
          </div>
        </div>



        {/* Dual Countdown Timers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* MPT Registration Countdown */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 lg:p-8 text-white">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-2">MPT Registration Countdown</h2>
              <p className="text-blue-100">Don&apos;t miss the registration deadline - August 25, 2025!</p>
            </div>
            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto mb-6">
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl lg:text-3xl font-bold">{timeLeft.mptRegistrationDays}</div>
                  <div className="text-sm text-blue-100">Days</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl lg:text-3xl font-bold">{timeLeft.mptRegistrationHours}</div>
                  <div className="text-sm text-blue-100">Hours</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl lg:text-3xl font-bold">{timeLeft.mptRegistrationMinutes}</div>
                  <div className="text-sm text-blue-100">Minutes</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl lg:text-3xl font-bold">{timeLeft.mptRegistrationSeconds}</div>
                  <div className="text-sm text-blue-100">Seconds</div>
                </div>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-white text-sm leading-relaxed">
                <strong>Registration closes August 25, 2025!</strong> Complete your MPT application with all required documents.
              </p>
            </div>
          </div>

          {/* MPT Exam Countdown */}
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-6 lg:p-8 text-white">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-2">MPT Exam Countdown</h2>
              <p className="text-purple-100">Prepare for the MPT exam - November 9, 2025!</p>
            </div>
            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto mb-6">
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl lg:text-3xl font-bold">{timeLeft.mptExamDays}</div>
                  <div className="text-sm text-purple-100">Days</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl lg:text-3xl font-bold">{timeLeft.mptExamHours}</div>
                  <div className="text-sm text-purple-100">Hours</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl lg:text-3xl font-bold">{timeLeft.mptExamMinutes}</div>
                  <div className="text-sm text-purple-100">Minutes</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl lg:text-3xl font-bold">{timeLeft.mptExamSeconds}</div>
                  <div className="text-sm text-purple-100">Seconds</div>
                </div>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-white text-sm leading-relaxed">
                <strong>MPT Exam: November 9, 2025!</strong> 200 MCQs, 33% passing mark, no negative marking.
              </p>
              </div>
            </div>
          </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Star className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-sm lg:text-base font-semibold text-gray-900 mb-1">MPT Phase</h3>
            <p className="text-xs lg:text-sm text-gray-600 mb-2">First Screening</p>
            <span className="text-lg lg:text-xl font-bold text-purple-600">New</span>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-sm lg:text-base font-semibold text-gray-900 mb-1">Age Limit</h3>
            <p className="text-xs lg:text-sm text-gray-600 mb-2">Maximum Age</p>
            <span className="text-lg lg:text-xl font-bold text-blue-600">35 Years</span>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-sm lg:text-base font-semibold text-gray-900 mb-1">Exam Period</h3>
            <p className="text-xs lg:text-sm text-gray-600 mb-2">Written Exam</p>
            <span className="text-lg lg:text-xl font-bold text-green-600">Feb 4-22</span>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-sm lg:text-base font-semibold text-gray-900 mb-1">Total Phases</h3>
            <p className="text-xs lg:text-sm text-gray-600 mb-2">MPT + Written</p>
            <span className="text-lg lg:text-xl font-bold text-orange-600">2 Phases</span>
          </div>
        </div>

        {/* Timeline Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === 'all'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => setActiveFilter('mpt')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === 'mpt'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            MPT Phase
          </button>
          <button
            onClick={() => setActiveFilter('registration')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === 'registration'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Registration
          </button>
          <button
            onClick={() => setActiveFilter('examination')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === 'examination'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Examination
          </button>
          <button
            onClick={() => setActiveFilter('results')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === 'results'
                ? 'bg-orange-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Results
          </button>
        </div>

        {/* Main Timeline */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 lg:p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Complete CSS 2026 Timeline</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Track your CSS 2026 journey from MPT to final written examination</p>
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 lg:left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            <div className="space-y-8">
              {filteredEvents.map((event) => (
                <div key={event.id} className="relative">
                  {/* Timeline Dot */}
                  <div className={`absolute left-6 lg:left-8 top-6 w-4 h-4 rounded-full border-4 border-white shadow-lg transform -translate-x-2 ${
                    event.status === 'completed' ? 'bg-green-500' :
                    event.status === 'current' ? 'bg-orange-500' : 'bg-blue-500'
                  }`}></div>
                  
                  {/* Event Card */}
                  <div className={`ml-12 lg:ml-16 p-6 rounded-xl border-l-4 shadow-lg hover:shadow-xl transition-all duration-300 ${
                    getStatusColor(event.status)
                  }`}>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                      <div className="flex items-center gap-3 mb-3 lg:mb-0">
                        {getStatusIcon(event.status)}
                        <h3 className="text-lg lg:text-xl font-bold text-gray-900">{event.title}</h3>
                      </div>
                      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2 lg:gap-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                          {getCategoryIcon(event.category)}
                          {event.phase}
                        </span>
                        <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                          {event.date}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4 leading-relaxed">{event.description}</p>
                    
                    {/* Special highlighting for MPT events */}
                    {event.category === 'mpt' && (
                      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                          <Star className="h-5 w-5" />
                          New MPT Requirement
                        </h4>
                        <p className="text-purple-700 text-sm">
                          This is a new mandatory screening test introduced for CSS 2026. Candidates must pass MPT to proceed to the main written examination.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Important Reminders */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Important Reminders</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Stay on track with these critical deadlines and new requirements</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reminders.map((reminder) => (
              <div key={reminder.id} className={`bg-white rounded-xl shadow-lg p-6 border-l-4 hover:shadow-xl transition-all duration-300 ${getReminderColor(reminder.type)}`}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {getReminderIcon(reminder.type)}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{reminder.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{reminder.description}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">
                        {reminder.timeRemaining}
                      </span>
                      {reminder.action && (
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                          {reminder.action}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Signup */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 lg:p-8 mb-12 text-white">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full mb-4">
              <Bell className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold mb-3">Stay Updated</h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Get notified about important deadlines, MPT updates, and exam announcements
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white/50 focus:outline-none text-base bg-white"
                required
              />
            </div>

            <div className="space-y-3 mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notifications.deadlines}
                  onChange={(e) => setNotifications(prev => ({ ...prev, deadlines: e.target.checked }))}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500 h-4 w-4 accent-green-600"
                />
                <span className="ml-2 text-blue-100 text-sm">MPT and exam deadlines</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notifications.results}
                  onChange={(e) => setNotifications(prev => ({ ...prev, results: e.target.checked }))}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500 h-4 w-4 accent-green-600"
                />
                <span className="ml-2 text-blue-100 text-sm">MPT and exam results</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notifications.tips}
                  onChange={(e) => setNotifications(prev => ({ ...prev, tips: e.target.checked }))}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500 h-4 w-4 accent-green-600"
                />
                <span className="ml-2 text-blue-100 text-sm">MPT preparation tips</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={subscribing}
              className="w-full bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {subscribing ? 'Subscribing...' : 'Subscribe to Notifications'}
            </button>

            {/* Success/Error Messages */}
            {subscribeStatus && (
              <div className={`mt-4 p-4 rounded-xl text-center ${
                subscribeStatus.success 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}>
                {subscribeStatus.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default TimelinePage;