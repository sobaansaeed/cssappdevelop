'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  Crown, 
  Shield, 
  LogOut,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
  Edit,
  Save,
  X,
  UserX
} from 'lucide-react';


interface UserProfile {
  id: string;
  email: string;
  subscription_status: 'active' | 'inactive' | 'expired';
  subscription_expiry: string | null;
  created_at: string;
}

const CSSKROAdminPage: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState<'active' | 'inactive' | 'expired'>('inactive');
  const [editExpiry, setEditExpiry] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const router = useRouter();

  // Simple, fast data fetching
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/user-profiles?page=1&limit=100');
      
      if (response.ok) {
        const data = await response.json();
        if (data.users) {
          setUsers(data.users);
        } else {
        setUsers(data || []);
        }
        setMessage('');
        setMessageType('');
      } else {
        if (response.status === 404) {
          const errorData = await response.json();
          setMessage(`Database not set up: ${errorData.message || 'Tables missing'}`);
          setMessageType('error');
          setUsers([]);
        } else {
          throw new Error('Failed to fetch users');
        }
      }
    } catch (e) {
      console.error('Error fetching users:', e);
      setMessage('Failed to fetch users. Please check your database connection.');
      setMessageType('error');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    document.cookie = 'admin-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/admin');
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
      fetchUsers(); // Refresh the data
      
      setTimeout(() => setMessage(''), 3000);
    } catch (e) {
      console.error('Error updating user:', e);
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

  // Quick actions for fast user management
  const quickUpgrade = async (userId: string) => {
    try {
      const response = await fetch('/api/update-user-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          status: 'active',
          expiryDate: null
        }),
      });

      if (!response.ok) throw new Error('Failed to upgrade user');

      setUsers(users.map(user => 
        user.id === userId 
          ? { ...user, subscription_status: 'active', subscription_expiry: null }
          : user
      ));

      setMessage('User upgraded to Pro successfully!');
      setMessageType('success');
      fetchUsers(); // Refresh the data
      setTimeout(() => setMessage(''), 3000);
    } catch (e) {
      console.error('Failed to upgrade user:', e);
      setMessage('Failed to upgrade user');
      setMessageType('error');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const quickDowngrade = async (userId: string) => {
    try {
      const response = await fetch('/api/update-user-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          status: 'inactive',
          expiryDate: null
        }),
      });

      if (!response.ok) throw new Error('Failed to downgrade user');

      setUsers(users.map(user => 
        user.id === userId 
          ? { ...user, subscription_status: 'inactive', subscription_expiry: null }
          : user
      ));

      setMessage('User downgraded to Free successfully!');
      setMessageType('success');
      window.location.reload();
      setTimeout(() => setMessage(''), 3000);
    } catch (e) {
      console.error('Failed to downgrade user:', e);
      setMessage('Failed to downgrade user');
      setMessageType('error');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  useEffect(() => {
      fetchUsers();
  }, []);

  // Simple statistics calculation
  const stats = {
    total: users.length,
    pro: users.filter(u => u.subscription_status === 'active').length,
    free: users.filter(u => u.subscription_status === 'inactive').length,
    expired: users.filter(u => u.subscription_status === 'expired').length
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-2">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CSSKRO User Management</h1>
                <p className="text-sm text-gray-600">Control free vs paid user access</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={fetchUsers}
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

        {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                <Crown className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pro Users</p>
                <p className="text-2xl font-bold text-green-600">{stats.pro}</p>
                <p className="text-xs text-green-600 font-medium">
                  {stats.total > 0 ? `${Math.round((stats.pro / stats.total) * 100)}%` : '0%'} of total
                </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="p-2 bg-gray-100 rounded-lg">
                <UserX className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Free Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.free}</p>
                <p className="text-xs text-gray-600 font-medium">
                  {stats.total > 0 ? `${Math.round((stats.free / stats.total) * 100)}%` : '0%'} of total
                </p>
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
                <p className="text-2xl font-bold text-red-600">{stats.expired}</p>
                <p className="text-xs text-red-600 font-medium">
                  {stats.total > 0 ? `${Math.round((stats.expired / stats.total) * 100)}%` : '0%'} of total
                </p>
                  </div>
                </div>
              </div>
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
                {message}
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
                <h4 className="font-semibold text-blue-900 mb-2">Quick Setup:</h4>
                <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                  <li>Go to <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="underline font-medium">Supabase Dashboard</a></li>
                  <li>Select project: <code className="bg-blue-100 px-1 rounded">yppffxsgtxclvbndjenm</code></li>
                  <li>Click <strong>SQL Editor</strong> in left sidebar</li>
                  <li>Click <strong>New Query</strong></li>
                  <li>Copy and paste the contents of <code className="bg-blue-100 px-1 rounded">supabase-setup.sql</code></li>
                  <li>Click <strong>Run</strong> to execute the script</li>
                  <li>Refresh this page after setup is complete</li>
                </ol>
              </div>
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
                  {users.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50">
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
                          {user.subscription_status === 'active' ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          ) : user.subscription_status === 'expired' ? (
                            <Clock className="h-5 w-5 text-red-500 mr-2" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-gray-500 mr-2" />
                          )}
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${
                            user.subscription_status === 'active'
                              ? 'bg-green-100 text-green-800 border-green-200'
                              : user.subscription_status === 'expired'
                              ? 'bg-red-100 text-red-800 border-red-200'
                              : 'bg-gray-100 text-gray-800 border-gray-200'
                          }`}>
                            {user.subscription_status === 'active' ? '👑 Pro' : 
                             user.subscription_status === 'expired' ? '⏰ Expired' : '👤 Free'}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {user.subscription_expiry 
                          ? formatDate(user.subscription_expiry)
                          : user.subscription_status === 'active' ? 'No Expiry' : 'N/A'
                              }
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(user.created_at)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              {editingUser === user.id ? (
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => handleSave(user.id)}
                                    className="text-green-600 hover:text-green-900"
                              title="Save Changes"
                                  >
                                    <Save className="h-5 w-5" />
                                  </button>
                                  <button
                                    onClick={handleCancel}
                                    className="text-gray-600 hover:text-gray-900"
                              title="Cancel"
                                  >
                                    <X className="h-5 w-5" />
                                  </button>
                                </div>
                              ) : (
                          <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleEdit(user)}
                                  className="text-blue-600 hover:text-blue-900"
                              title="Edit Subscription"
                                >
                                  <Edit className="h-5 w-5" />
                                </button>
                            
                            {/* Quick Actions */}
                            {user.subscription_status === 'inactive' ? (
                              <button
                                onClick={() => quickUpgrade(user.id)}
                                className="text-green-600 hover:text-green-900"
                                title="Quick Upgrade to Pro"
                              >
                                <Crown className="h-4 w-4" />
                              </button>
                            ) : (
                              <button
                                onClick={() => quickDowngrade(user.id)}
                                className="text-orange-600 hover:text-orange-900"
                                title="Quick Downgrade to Free"
                              >
                                <UserX className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                              )}
                            </td>
                          </tr>
                  ))}
                    </tbody>
                  </table>
                </div>
              </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>CSSKRO User Management - Simple & Fast</p>
          <p className="mt-1">Total Users: {stats.total} | Pro: {stats.pro} | Free: {stats.free} | Expired: {stats.expired}</p>
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
                  <option value="inactive">👤 Free User</option>
                  <option value="active">👑 Pro User (Active)</option>
                  <option value="expired">⏰ Pro User (Expired)</option>
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
                  Leave empty for no expiry date (lifetime Pro)
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
    </div>
  );
};

export default CSSKROAdminPage;
