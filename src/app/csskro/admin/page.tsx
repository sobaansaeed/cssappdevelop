'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  Download, 
  Search, 
  Filter, 
  Calendar, 
  Mail, 
  TrendingUp, 
  LogOut,
  RefreshCw,
  FileText,
  Bell,
  Target,
  Crown,
  Shield,
  CheckCircle,
  AlertCircle,
  Clock,
  Edit,
  Save,
  X
} from 'lucide-react';

interface Subscriber {
  id: string;
  email: string;
  date: string;
  source: 'resources' | 'timeline' | 'manual';
  preferences?: {
    deadlines?: boolean;
    results?: boolean;
    tips?: boolean;
  };
  status: 'active' | 'unsubscribed';
}

interface UserProfile {
  id: string;
  email: string;
  subscription_status: 'active' | 'inactive' | 'expired';
  subscription_expiry: string | null;
  created_at: string;
  updated_at: string;
}

interface SubscriberStats {
  total: number;
  active: number;
  unsubscribed: number;
  lastUpdated: string;
}

const CSSKROAdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'subscribers' | 'subscriptions'>('subscribers');
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [stats, setStats] = useState<SubscriberStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSource, setFilterSource] = useState<string>('all');
  const [exporting, setExporting] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [bulkAction, setBulkAction] = useState<'active' | 'inactive' | 'expired' | ''>('');
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState<'active' | 'inactive' | 'expired'>('inactive');
  const [editExpiry, setEditExpiry] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const router = useRouter();

  // Placeholder functions - will be implemented next
  const fetchSubscribers = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/subscribers');
      
      if (response.status === 401) {
        router.push('/admin');
        return;
      }
      
      const data = await response.json();
      
      if (data.success) {
        setSubscribers(data.subscribers);
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    }
  }, [router]);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/user-profiles');
      if (response.ok) {
        const data = await response.json();
        setUsers(data || []);
        setMessage('');
        setMessageType('');
      } else {
        if (response.status === 404) {
          setMessage('Database tables not set up yet. Please run the SQL script in Supabase first.');
          setMessageType('error');
          setUsers([]);
        } else {
          throw new Error('Failed to fetch users');
        }
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setMessage('Failed to fetch users. Please check your database connection.');
      setMessageType('error');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    document.cookie = 'admin-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/admin');
  };

  const handleExport = async (format: 'csv' | 'json') => {
    setExporting(true);
    try {
      const response = await fetch(`/api/subscribers/export?format=${format}`);
      if (format === 'csv') {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `subscribers-${new Date().toISOString().split('T')[0]}.${format}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        const data = await response.json();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `subscribers-${new Date().toISOString().split('T')[0]}.${format}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Error exporting:', error);
    } finally {
      setExporting(false);
    }
  };

  const handleBulkAction = async () => {
    if (selectedUsers.size === 0 || !bulkAction) return;

    try {
      const userIds = Array.from(selectedUsers);
      const response = await fetch('/api/bulk-update-subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userIds,
          status: bulkAction
        }),
      });

      if (!response.ok) throw new Error('Failed to update users');

      // Update local state
      setUsers(users.map(user => 
        selectedUsers.has(user.id) 
          ? { ...user, subscription_status: bulkAction }
          : user
      ));

      setSelectedUsers(new Set());
      setBulkAction('');
      setShowBulkModal(false);
      setMessage(`Successfully updated ${userIds.length} users to ${bulkAction}`);
      setMessageType('success');
      
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error updating users:', error);
      setMessage('Failed to update users');
      setMessageType('error');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleEdit = (user: UserProfile) => {
    setEditingUser(user.id);
    setEditStatus(user.subscription_status);
    setEditExpiry(user.subscription_expiry ? user.subscription_expiry.split('T')[0] : '');
  };

  const handleSave = async (userId: string) => {
    try {
      const expiryDate = editExpiry ? new Date(editExpiry).toISOString() : null;
      
      const response = await fetch('/api/update-user-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          status: editStatus,
          expiryDate
        }),
      });

      if (!response.ok) throw new Error('Failed to update user');

      // Update local state
      setUsers(users.map(user => 
        user.id === userId 
          ? { ...user, subscription_status: editStatus, subscription_expiry: expiryDate }
          : user
      ));

      setEditingUser(null);
      setMessage('User subscription updated successfully!');
      setMessageType('success');
      
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error updating user:', error);
      setMessage('Failed to update user subscription');
      setMessageType('error');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleCancel = () => {
    setEditingUser(null);
    setEditStatus('inactive');
    setEditExpiry('');
  };

  const toggleUserSelection = (userId: string) => {
    const newSelection = new Set(selectedUsers);
    if (newSelection.has(userId)) {
      newSelection.delete(userId);
    } else {
      newSelection.add(userId);
    }
    setSelectedUsers(newSelection);
  };

  const selectAllUsers = () => {
    if (selectedUsers.size === users.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(users.map(u => u.id)));
    }
  };

  useEffect(() => {
    if (activeTab === 'subscribers') {
      fetchSubscribers();
    } else {
      fetchUsers();
    }
  }, [activeTab, fetchSubscribers, fetchUsers]);

  const filteredSubscribers = subscribers.filter(subscriber => {
    const matchesSearch = subscriber.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterSource === 'all' || subscriber.source === filterSource;
    return matchesSearch && matchesFilter;
  });

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.subscription_status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'resources': return <FileText className="h-4 w-4" />;
      case 'timeline': return <Bell className="h-4 w-4" />;
      case 'manual': return <Target className="h-4 w-4" />;
      default: return <Mail className="h-4 w-4" />;
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'resources': return 'bg-blue-100 text-blue-800';
      case 'timeline': return 'bg-purple-100 text-purple-800';
      case 'manual': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'inactive':
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
      case 'expired':
        return <Clock className="h-5 w-5 text-red-500" />;
      default:
        return <Users className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'expired':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const subscriptionStats = {
    total: users.length,
    active: users.filter(u => u.subscription_status === 'active').length,
    inactive: users.filter(u => u.subscription_status === 'inactive').length,
    expired: users.filter(u => u.subscription_status === 'expired').length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-2">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CSSKRO Admin Panel</h1>
                <p className="text-sm text-gray-600">Complete management system for subscribers and subscriptions</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => activeTab === 'subscribers' ? fetchSubscribers() : fetchUsers()}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-700 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('subscribers')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'subscribers'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Subscribers</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('subscriptions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'subscriptions'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Crown className="h-5 w-5" />
                <span>Subscriptions</span>
              </div>
            </button>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Message Display */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg border ${
            messageType === 'success' 
              ? 'bg-green-50 text-green-800 border-green-200' 
              : 'bg-red-50 text-red-800 border-red-200'
          }`}>
            {message}
            {messageType === 'error' && message.includes('Database tables not set up') && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Setup Instructions:</h4>
                <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                  <li>Go to your <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="underline">Supabase Dashboard</a></li>
                  <li>Select your project: <code className="bg-blue-100 px-1 rounded">yppffxsgtxclvbndjenm</code></li>
                  <li>Click <strong>SQL Editor</strong> in the left sidebar</li>
                  <li>Click <strong>New Query</strong></li>
                  <li>Copy and paste the contents of <code className="bg-blue-100 px-1 rounded">supabase-setup.sql</code></li>
                  <li>Click <strong>Run</strong> to execute the script</li>
                  <li>Refresh this page after setup is complete</li>
                </ol>
              </div>
            )}
          </div>
        )}

        {/* Subscribers Tab */}
        {activeTab === 'subscribers' && (
          <>
            {/* Stats Cards */}
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                    </div>
                    <div className="bg-blue-100 rounded-lg p-3">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active</p>
                      <p className="text-3xl font-bold text-green-600">{stats.active}</p>
                    </div>
                    <div className="bg-green-100 rounded-lg p-3">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Unsubscribed</p>
                      <p className="text-3xl font-bold text-red-600">{stats.unsubscribed}</p>
                    </div>
                    <div className="bg-red-100 rounded-lg p-3">
                      <Mail className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Last Updated</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {formatDate(stats.lastUpdated)}
                      </p>
                    </div>
                    <div className="bg-purple-100 rounded-lg p-3">
                      <Calendar className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Filter */}
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <select
                      value={filterSource}
                      onChange={(e) => setFilterSource(e.target.value)}
                      className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="all">All Sources</option>
                      <option value="resources">Resources Page</option>
                      <option value="timeline">Timeline Page</option>
                      <option value="manual">Manual</option>
                    </select>
                  </div>
                </div>

                {/* Export Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleExport('csv')}
                    disabled={exporting}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    <Download className="h-4 w-4" />
                    <span>{exporting ? 'Exporting...' : 'Export CSV'}</span>
                  </button>
                  <button
                    onClick={() => handleExport('json')}
                    disabled={exporting}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    <Download className="h-4 w-4" />
                    <span>{exporting ? 'Exporting...' : 'Export JSON'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Subscribers Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Source
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Preferences
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredSubscribers.map((subscriber) => (
                      <tr key={subscriber.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{subscriber.email}</div>
                          <div className="text-sm text-gray-500">ID: {subscriber.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSourceColor(subscriber.source)}`}>
                            {getSourceIcon(subscriber.source)}
                            <span className="ml-1 capitalize">{subscriber.source}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            {subscriber.preferences?.deadlines && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                                Deadlines
                              </span>
                            )}
                            {subscriber.preferences?.results && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                Results
                              </span>
                            )}
                            {subscriber.preferences?.tips && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                                Tips
                              </span>
                            )}
                            {!subscriber.preferences?.deadlines && !subscriber.preferences?.results && !subscriber.preferences?.tips && (
                              <span className="text-xs text-gray-500">No preferences</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(subscriber.date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            subscriber.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {subscriber.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredSubscribers.length === 0 && (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    {searchTerm || filterSource !== 'all' 
                      ? 'No subscribers match your search criteria.' 
                      : 'No subscribers found.'}
                  </p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Subscriptions Tab */}
        {activeTab === 'subscriptions' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">{subscriptionStats.total}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Pro</p>
                    <p className="text-2xl font-bold text-gray-900">{subscriptionStats.active}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <AlertCircle className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Free Users</p>
                    <p className="text-2xl font-bold text-gray-900">{subscriptionStats.inactive}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Clock className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Expired</p>
                    <p className="text-2xl font-bold text-gray-900">{subscriptionStats.expired}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Controls */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by email or status..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <button
                  onClick={fetchUsers}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Refresh
                </button>
              </div>

              {/* Bulk Actions */}
              {users.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedUsers.size === users.length}
                          onChange={selectAllUsers}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">
                          Select All ({selectedUsers.size}/{users.length})
                        </span>
                      </label>
                    </div>
                    
                    {selectedUsers.size > 0 && (
                      <div className="flex items-center space-x-3">
                        <select
                          value={bulkAction}
                          onChange={(e) => setBulkAction(e.target.value as 'active' | 'inactive' | 'expired' | '')}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Choose Action</option>
                          <option value="active">Make Pro (Active)</option>
                          <option value="inactive">Make Free (Inactive)</option>
                          <option value="expired">Mark Expired</option>
                        </select>
                        <button
                          onClick={() => setShowBulkModal(true)}
                          disabled={!bulkAction}
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          Apply to {selectedUsers.size} Users
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Users Table */}
            {users.length === 0 && !loading && messageType === 'error' ? (
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Crown className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Database Not Ready</h3>
                  <p className="text-gray-600 mb-6">
                    The database tables haven&apos;t been created yet. Follow the setup instructions above to get started.
                  </p>
                  <button
                    onClick={fetchUsers}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Check Again
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <input
                            type="checkbox"
                            checked={selectedUsers.size === users.length}
                            onChange={selectAllUsers}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Expiry Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Created
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {loading ? (
                        <tr>
                          <td colSpan={6} className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                              <span className="ml-2">Loading users...</span>
                            </div>
                          </td>
                        </tr>
                      ) : filteredUsers.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                            No users found
                          </td>
                        </tr>
                      ) : (
                        filteredUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={selectedUsers.has(user.id)}
                                  onChange={() => toggleUserSelection(user.id)}
                                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                                    <span className="text-white font-semibold text-sm">
                                      {user.email.charAt(0).toUpperCase()}
                                    </span>
                                  </div>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{user.email}</div>
                                  <div className="text-sm text-gray-500">ID: {user.id.slice(0, 8)}...</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                {getStatusIcon(user.subscription_status)}
                                <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(user.subscription_status)}`}>
                                  {user.subscription_status}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {user.subscription_expiry 
                                ? new Date(user.subscription_expiry).toLocaleDateString()
                                : 'No expiry'
                              }
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {new Date(user.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              {editingUser === user.id ? (
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => handleSave(user.id)}
                                    className="text-green-600 hover:text-green-900"
                                  >
                                    <Save className="h-5 w-5" />
                                  </button>
                                  <button
                                    onClick={handleCancel}
                                    className="text-gray-600 hover:text-gray-900"
                                  >
                                    <X className="h-5 w-5" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => handleEdit(user)}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  <Edit className="h-5 w-5" />
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>CSSKRO Admin Panel - Complete Management System</p>
          <p className="mt-1">
            {activeTab === 'subscribers' 
              ? `Subscribers: ${filteredSubscribers.length} of ${subscribers.length}`
              : `Users: ${filteredUsers.length} of ${users.length}`
            }
          </p>
        </div>
      </div>

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Edit Subscription</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subscription Status
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as 'active' | 'inactive' | 'expired')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="inactive">Free User</option>
                  <option value="active">Pro User (Active)</option>
                  <option value="expired">Pro User (Expired)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date (Optional)
                </label>
                <input
                  type="date"
                  value={editExpiry}
                  onChange={(e) => setEditExpiry(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave empty for no expiry date
                </p>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => handleSave(editingUser)}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Action Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Confirm Bulk Action</h3>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                You are about to update <strong>{selectedUsers.size} users</strong> to:
              </p>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <span className="text-blue-800 font-semibold capitalize">
                  {bulkAction} Status
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                This action will:
              </p>
              <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                <li>Change subscription status for all selected users</li>
                <li>Update the timestamp for each user</li>
                <li>Cannot be undone automatically</li>
              </ul>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleBulkAction}
                className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                Confirm Update
              </button>
              <button
                onClick={() => setShowBulkModal(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CSSKROAdminPage;
