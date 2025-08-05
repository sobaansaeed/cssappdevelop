'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Trophy, Percent, Bell, Download, CheckCircle, AlertCircle, Circle, ChevronRight, MapPin, FileText, Award } from 'lucide-react';

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  phase: string;
  category: 'registration' | 'examination' | 'results' | 'interview';
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
    days: 45,
    hours: 12,
    minutes: 30,
    seconds: 0
  });

  const [email, setEmail] = useState('');
  const [notifications, setNotifications] = useState({
    deadlines: true,
    results: true,
    tips: false
  });

  const [activeFilter, setActiveFilter] = useState<string>('all');

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timelineEvents: TimelineEvent[] = [
    {
      id: '1',
      date: '01 Dec 2023',
      title: 'Advertisement Published',
      description: 'CSS 2024 examination advertisement published by FPSC with detailed instructions and eligibility criteria.',
      status: 'completed',
      phase: 'Pre-Registration',
      category: 'registration',
      priority: 'high'
    },
    {
      id: '2',
      date: '15 Dec 2023',
      title: 'Registration Opens',
      description: 'Online registration portal activated. Candidates can submit applications with required documents and fees.',
      status: 'completed',
      phase: 'Registration',
      category: 'registration',
      priority: 'high'
    },
    {
      id: '3',
      date: '31 Jan 2024',
      title: 'Registration Deadline',
      description: 'Last date to submit CSS 2024 registration forms. No extensions will be granted after this date.',
      status: 'current',
      phase: 'Registration',
      category: 'registration',
      priority: 'high'
    },
    {
      id: '4',
      date: '15 Feb 2024',
      title: 'Roll Number Slips',
      description: 'Examination roll number slips available for download. Candidates must verify all details carefully.',
      status: 'upcoming',
      phase: 'Pre-Exam',
      category: 'examination',
      priority: 'medium'
    },
    {
      id: '5',
      date: '01 Mar 2024',
      title: 'Exam Centers Announced',
      description: 'Final list of examination centers published. Candidates should verify their assigned center location.',
      status: 'upcoming',
      phase: 'Pre-Exam',
      category: 'examination',
      priority: 'medium'
    },
    {
      id: '6',
      date: '15 Mar 2024',
      title: 'Written Examination Begins',
      description: 'CSS written examination starts with compulsory subjects. Exam will be conducted over multiple days.',
      status: 'upcoming',
      phase: 'Written Exam',
      category: 'examination',
      priority: 'high'
    },
    {
      id: '7',
      date: '30 Apr 2024',
      title: 'Written Examination Ends',
      description: 'Completion of all written examination papers including optional subjects.',
      status: 'upcoming',
      phase: 'Written Exam',
      category: 'examination',
      priority: 'high'
    },
    {
      id: '8',
      date: '15 Jun 2024',
      title: 'Written Results Expected',
      description: 'Written examination results are expected to be announced. Successful candidates proceed to interview.',
      status: 'upcoming',
      phase: 'Results',
      category: 'results',
      priority: 'high'
    },
    {
      id: '9',
      date: '01 Jul 2024',
      title: 'Interview Process',
      description: 'Psychological test and interview process for candidates who qualified written examination.',
      status: 'upcoming',
      phase: 'Interview',
      category: 'interview',
      priority: 'medium'
    },
    {
      id: '10',
      date: '31 Aug 2024',
      title: 'Final Results',
      description: 'Final merit list and allocation of successful candidates to various services and cadres.',
      status: 'upcoming',
      phase: 'Final Results',
      category: 'results',
      priority: 'high'
    }
  ];

  const reminders: Reminder[] = [
    {
      id: '1',
      title: 'Registration Deadline',
      description: 'Only 45 days left for registration. Submit your application before January 31, 2024.',
      type: 'urgent',
      timeRemaining: '45 days remaining',
      action: 'Register Now'
    },
    {
      id: '2',
      title: 'Document Verification',
      description: 'Ensure all required documents are uploaded and verified in your application.',
      type: 'important',
      timeRemaining: 'Ongoing',
      action: 'Verify Documents'
    },
    {
      id: '3',
      title: 'Fee Payment',
      description: 'Complete fee payment through approved banking channels before deadline.',
      type: 'info',
      timeRemaining: 'Required',
      action: 'Pay Fee'
    },
    {
      id: '4',
      title: 'Email Notifications',
      description: 'Subscribe to email notifications for important updates and announcements.',
      type: 'info',
      timeRemaining: 'Recommended',
      action: 'Subscribe'
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
      case 'registration':
        return <FileText className="h-4 w-4" />;
      case 'examination':
        return <Calendar className="h-4 w-4" />;
      case 'results':
        return <Award className="h-4 w-4" />;
      case 'interview':
        return <Users className="h-4 w-4" />;
      default:
        return <Circle className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'registration':
        return 'bg-purple-100 text-purple-800';
      case 'examination':
        return 'bg-blue-100 text-blue-800';
      case 'results':
        return 'bg-green-100 text-green-800';
      case 'interview':
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
        return 'border-orange-500 bg-orange-50';
      default:
        return 'border-blue-500 bg-blue-50';
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribing:', email, notifications);
    alert('Successfully subscribed to notifications!');
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
              CSS 2024 Timeline
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Complete examination schedule, important deadlines, and key milestones for CSS 2024
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-sm lg:text-base font-semibold text-gray-900 mb-1">Next Deadline</h3>
            <p className="text-xs lg:text-sm text-gray-600 mb-2">Registration Closes</p>
            <span className="text-lg lg:text-xl font-bold text-red-600">{timeLeft.days} Days</span>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-sm lg:text-base font-semibold text-gray-900 mb-1">Expected Candidates</h3>
            <p className="text-xs lg:text-sm text-gray-600 mb-2">2024 Batch</p>
            <span className="text-lg lg:text-xl font-bold text-blue-600">25K+</span>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-sm lg:text-base font-semibold text-gray-900 mb-1">Available Posts</h3>
            <p className="text-xs lg:text-sm text-gray-600 mb-2">Various Cadres</p>
            <span className="text-lg lg:text-xl font-bold text-green-600">300+</span>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Percent className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-sm lg:text-base font-semibold text-gray-900 mb-1">Success Rate</h3>
            <p className="text-xs lg:text-sm text-gray-600 mb-2">Historical Average</p>
            <span className="text-lg lg:text-xl font-bold text-purple-600">2.5%</span>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 lg:p-8 mb-12 text-white">
          <div className="text-center mb-6">
            <h2 className="text-2xl lg:text-3xl font-bold mb-2">Registration Deadline Countdown</h2>
            <p className="text-orange-100">Don't miss the registration deadline!</p>
          </div>
          <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl lg:text-3xl font-bold">{timeLeft.days}</div>
                <div className="text-sm text-orange-100">Days</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl lg:text-3xl font-bold">{timeLeft.hours}</div>
                <div className="text-sm text-orange-100">Hours</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl lg:text-3xl font-bold">{timeLeft.minutes}</div>
                <div className="text-sm text-orange-100">Minutes</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl lg:text-3xl font-bold">{timeLeft.seconds}</div>
                <div className="text-sm text-orange-100">Seconds</div>
              </div>
            </div>
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
            onClick={() => setActiveFilter('registration')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === 'registration'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Registration
          </button>
          <button
            onClick={() => setActiveFilter('examination')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === 'examination'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Examination
          </button>
          <button
            onClick={() => setActiveFilter('results')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === 'results'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Results
          </button>
          <button
            onClick={() => setActiveFilter('interview')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === 'interview'
                ? 'bg-orange-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Interview
          </button>
        </div>

        {/* Main Timeline */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 lg:p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Complete Timeline</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Track your CSS 2024 journey from registration to final results</p>
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 lg:left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            <div className="space-y-8">
              {filteredEvents.map((event, index) => (
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
                    
                    {event.status === 'current' && (
                      <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-orange-800 mb-3 flex items-center gap-2">
                          <AlertCircle className="h-5 w-5" />
                          Active Phase - Take Action Now!
                        </h4>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                          <div className="text-center">
                            <div className="text-xl lg:text-2xl font-bold text-orange-600">{timeLeft.days}</div>
                            <div className="text-xs text-orange-700">Days</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl lg:text-2xl font-bold text-orange-600">{timeLeft.hours}</div>
                            <div className="text-xs text-orange-700">Hours</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl lg:text-2xl font-bold text-orange-600">{timeLeft.minutes}</div>
                            <div className="text-xs text-orange-700">Minutes</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl lg:text-2xl font-bold text-orange-600">{timeLeft.seconds}</div>
                            <div className="text-xs text-orange-700">Seconds</div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {event.id === '6' && event.status === 'upcoming' && (
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                          <Calendar className="h-5 w-5" />
                          Exam Schedule Preview
                        </h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-sm">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-blue-700">Day 1: English Essay & Composition</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-blue-700">Day 2: General Knowledge</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-blue-700">Day 3: Pakistan Affairs</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-blue-700">Day 4: Current Affairs</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-blue-700">Day 5: Islamic Studies/Ethics</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-blue-700">Optional Subjects (Multiple Days)</span>
                            </div>
                          </div>
                        </div>
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
            <p className="text-gray-600 max-w-2xl mx-auto">Stay on track with these critical deadlines and actions</p>
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
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 lg:p-12 mb-12 text-white">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <Bell className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Get notified about important deadlines, announcements, and exam updates
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="max-w-lg mx-auto">
            <div className="mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-6 py-4 border-0 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white/50 focus:outline-none text-lg"
                required
              />
            </div>

            <div className="space-y-4 mb-8">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notifications.deadlines}
                  onChange={(e) => setNotifications(prev => ({ ...prev, deadlines: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-5 w-5"
                />
                <span className="ml-3 text-blue-100">Exam deadlines and important dates</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notifications.results}
                  onChange={(e) => setNotifications(prev => ({ ...prev, results: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-5 w-5"
                />
                <span className="ml-3 text-blue-100">Result announcements</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notifications.tips}
                  onChange={(e) => setNotifications(prev => ({ ...prev, tips: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-5 w-5"
                />
                <span className="ml-3 text-blue-100">Study tips and preparation guides</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-white text-blue-600 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-colors text-lg"
            >
              Subscribe to Notifications
            </button>
          </form>
        </div>

        {/* Download Timeline */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 lg:p-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-6">
            <Download className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Download Complete Timeline</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
            Get the complete CSS 2024 timeline as a PDF document for offline reference and sharing
          </p>
          <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 text-lg">
            Download PDF Timeline
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimelinePage;