'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Trophy, Percent, Bell, Download, CheckCircle, AlertCircle, Circle } from 'lucide-react';

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  phase: string;
}

interface Reminder {
  id: string;
  title: string;
  description: string;
  type: 'urgent' | 'important' | 'info';
  timeRemaining?: string;
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
      phase: 'Pre-Registration'
    },
    {
      id: '2',
      date: '15 Dec 2023',
      title: 'Registration Opens',
      description: 'Online registration portal activated. Candidates can submit applications with required documents and fees.',
      status: 'completed',
      phase: 'Registration'
    },
    {
      id: '3',
      date: '31 Jan 2024',
      title: 'Registration Deadline',
      description: 'Last date to submit CSS 2024 registration forms. No extensions will be granted after this date.',
      status: 'current',
      phase: 'Registration'
    },
    {
      id: '4',
      date: '15 Feb 2024',
      title: 'Roll Number Slips',
      description: 'Examination roll number slips available for download. Candidates must verify all details carefully.',
      status: 'upcoming',
      phase: 'Pre-Exam'
    },
    {
      id: '5',
      date: '01 Mar 2024',
      title: 'Exam Centers Announced',
      description: 'Final list of examination centers published. Candidates should verify their assigned center location.',
      status: 'upcoming',
      phase: 'Pre-Exam'
    },
    {
      id: '6',
      date: '15 Mar 2024',
      title: 'Written Examination Begins',
      description: 'CSS written examination starts with compulsory subjects. Exam will be conducted over multiple days.',
      status: 'upcoming',
      phase: 'Written Exam'
    },
    {
      id: '7',
      date: '30 Apr 2024',
      title: 'Written Examination Ends',
      description: 'Completion of all written examination papers including optional subjects.',
      status: 'upcoming',
      phase: 'Written Exam'
    },
    {
      id: '8',
      date: '15 Jun 2024',
      title: 'Written Results Expected',
      description: 'Written examination results are expected to be announced. Successful candidates proceed to interview.',
      status: 'upcoming',
      phase: 'Results'
    },
    {
      id: '9',
      date: '01 Jul 2024',
      title: 'Interview Process',
      description: 'Psychological test and interview process for candidates who qualified written examination.',
      status: 'upcoming',
      phase: 'Interview'
    },
    {
      id: '10',
      date: '31 Aug 2024',
      title: 'Final Results',
      description: 'Final merit list and allocation of successful candidates to various services and cadres.',
      status: 'upcoming',
      phase: 'Final Results'
    }
  ];

  const reminders: Reminder[] = [
    {
      id: '1',
      title: 'Registration Deadline',
      description: 'Only 45 days left for registration. Submit your application before January 31, 2024.',
      type: 'urgent',
      timeRemaining: '45 days remaining'
    },
    {
      id: '2',
      title: 'Document Verification',
      description: 'Ensure all required documents are uploaded and verified in your application.',
      type: 'important',
      timeRemaining: 'Ongoing'
    },
    {
      id: '3',
      title: 'Fee Payment',
      description: 'Complete fee payment through approved banking channels before deadline.',
      type: 'info',
      timeRemaining: 'Required'
    },
    {
      id: '4',
      title: 'Email Notifications',
      description: 'Subscribe to email notifications for important updates and announcements.',
      type: 'info',
      timeRemaining: 'Recommended'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case 'current':
        return <AlertCircle className="h-6 w-6 text-yellow-600" />;
      default:
        return <Circle className="h-6 w-6 text-blue-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-200';
      case 'current':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const getReminderIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return <AlertCircle className="h-8 w-8 text-red-600" />;
      case 'important':
        return <Clock className="h-8 w-8 text-yellow-600" />;
      default:
        return <Bell className="h-8 w-8 text-blue-600" />;
    }
  };

  const getReminderColor = (type: string) => {
    switch (type) {
      case 'urgent':
        return 'border-l-red-500';
      case 'important':
        return 'border-l-yellow-500';
      default:
        return 'border-l-blue-500';
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log('Subscribing:', email, notifications);
    alert('Successfully subscribed to notifications!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">CSS KRO Exam Timeline 2024</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Important dates, deadlines, and notifications for CSS examination with CSS KRO
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Calendar className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Next Deadline</h3>
            <p className="text-gray-600 mb-2">Registration Closes</p>
            <span className="text-red-600 font-semibold">45 Days Left</span>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Expected Candidates</h3>
            <p className="text-gray-600 mb-2">2024 Batch</p>
            <span className="text-blue-600 font-semibold text-lg">25,000+</span>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Trophy className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Available Posts</h3>
            <p className="text-gray-600 mb-2">Various Cadres</p>
            <span className="text-green-600 font-semibold text-lg">300+</span>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Percent className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Success Rate</h3>
            <p className="text-gray-600 mb-2">Historical Average</p>
            <span className="text-purple-600 font-semibold text-lg">2.5%</span>
          </div>
        </div>

        {/* Main Timeline */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">CSS 2024 Complete Timeline</h2>
          
          <div className="space-y-8">
            {timelineEvents.map((event) => (
              <div key={event.id} className={`border-l-4 pl-8 pb-8 ${getStatusColor(event.status)}`}>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {getStatusIcon(event.status)}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                          {event.phase}
                        </span>
                        <span className="text-sm text-gray-600">{event.date}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">{event.description}</p>
                    
                    {event.status === 'current' && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 className="font-semibold text-yellow-800 mb-2">Time Remaining:</h4>
                        <div className="grid grid-cols-4 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-yellow-600">{timeLeft.days}</div>
                            <div className="text-sm text-yellow-700">Days</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-yellow-600">{timeLeft.hours}</div>
                            <div className="text-sm text-yellow-700">Hours</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-yellow-600">{timeLeft.minutes}</div>
                            <div className="text-sm text-yellow-700">Minutes</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-yellow-600">{timeLeft.seconds}</div>
                            <div className="text-sm text-yellow-700">Seconds</div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {event.id === '6' && event.status === 'upcoming' && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                        <h4 className="font-semibold text-blue-800 mb-2">Exam Schedule (Tentative):</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Day 1: English Essay & Composition</li>
                          <li>• Day 2: General Knowledge</li>
                          <li>• Day 3: Pakistan Affairs</li>
                          <li>• Day 4: Current Affairs</li>
                          <li>• Day 5: Islamic Studies/Ethics</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important Reminders */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Important Reminders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reminders.map((reminder) => (
              <div key={reminder.id} className={`bg-white rounded-lg shadow-lg p-6 border-l-4 ${getReminderColor(reminder.type)}`}>
                <div className="mb-4">
                  {getReminderIcon(reminder.type)}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{reminder.title}</h3>
                <p className="text-gray-600 mb-4">{reminder.description}</p>
                <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                  {reminder.timeRemaining}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Signup */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <div className="text-center mb-8">
            <Bell className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Get Timeline Notifications</h2>
            <p className="text-gray-600">Stay updated with important deadlines, announcements, and exam notifications</p>
          </div>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
            <div className="mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-3 mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notifications.deadlines}
                  onChange={(e) => setNotifications(prev => ({ ...prev, deadlines: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">Exam deadlines and important dates</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notifications.results}
                  onChange={(e) => setNotifications(prev => ({ ...prev, results: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">Result announcements</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={notifications.tips}
                  onChange={(e) => setNotifications(prev => ({ ...prev, tips: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">Study tips and preparation guides</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Subscribe to Notifications
            </button>
          </form>
        </div>

        {/* Download Timeline */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-8 text-center">
          <Download className="h-16 w-16 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Download Complete Timeline</h2>
          <p className="text-blue-100 mb-6">Get the complete CSS 2024 timeline as a PDF document for offline reference</p>
          <button className="bg-white text-gray-900 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
            Download PDF Timeline
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimelinePage;