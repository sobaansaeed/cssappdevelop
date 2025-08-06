import { Subscriber, SubscribersData } from './types';

// Simple in-memory storage that persists across function invocations
// This is a temporary solution - in production, you'd want to use Vercel KV or a database
let subscribersData: SubscribersData = {
  subscribers: [],
  stats: {
    total: 0,
    active: 0,
    unsubscribed: 0,
    lastUpdated: new Date().toISOString()
  }
};

// Initialize with some sample data for testing
if (subscribersData.subscribers.length === 0) {
  // Add a test subscriber to verify the system works
  subscribersData.subscribers.push({
    id: 'test-1',
    email: 'test@example.com',
    date: new Date().toISOString(),
    source: 'manual',
    status: 'active'
  });
  subscribersData.stats.total = 1;
  subscribersData.stats.active = 1;
}

export function getSubscribersData(): SubscribersData {
  return subscribersData;
}

export function saveSubscribersData(data: SubscribersData): boolean {
  try {
    subscribersData = data;
    return true;
  } catch (error) {
    console.error('Failed to save subscribers data:', error);
    return false;
  }
}

export function addSubscriberToStorage(subscriber: Subscriber): boolean {
  try {
    const data = getSubscribersData();
    data.subscribers.push(subscriber);
    
    // Update stats
    data.stats.total = data.subscribers.length;
    data.stats.active = data.subscribers.filter(s => s.status === 'active').length;
    data.stats.unsubscribed = data.subscribers.filter(s => s.status === 'unsubscribed').length;
    data.stats.lastUpdated = new Date().toISOString();
    
    return saveSubscribersData(data);
  } catch (error) {
    console.error('Failed to add subscriber to storage:', error);
    return false;
  }
}

export function getSubscriberCountFromStorage(): number {
  const data = getSubscribersData();
  return data.subscribers.filter(s => s.status === 'active').length;
}

export function getAllSubscribersFromStorage(): Subscriber[] {
  const data = getSubscribersData();
  return data.subscribers;
}

export function exportSubscribersToCSVFromStorage(): string {
  const subscribers = getAllSubscribersFromStorage();
  
  const headers = ['Email', 'Source', 'Date', 'Status', 'Preferences'];
  const rows = subscribers.map(sub => [
    sub.email,
    sub.source,
    sub.date,
    sub.status,
    sub.preferences ? JSON.stringify(sub.preferences) : ''
  ]);
  
  const csvContent = [headers, ...rows]
    .map(row => row.map(field => `"${field}"`).join(','))
    .join('\n');
  
  return csvContent;
}

// Function to check if email already exists
export function isEmailDuplicateInStorage(email: string): boolean {
  const data = getSubscribersData();
  return data.subscribers.some(sub => sub.email.toLowerCase() === email.toLowerCase());
} 