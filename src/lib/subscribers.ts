import fs from 'fs';
import path from 'path';
import { SubscribersData, Subscriber } from './types';

const SUBSCRIBERS_FILE = path.join(process.cwd(), 'src/data/subscribers.json');

// Read subscribers data
export function readSubscribersData(): SubscribersData {
  try {
    if (fs.existsSync(SUBSCRIBERS_FILE)) {
      const data = fs.readFileSync(SUBSCRIBERS_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading subscribers data:', error);
  }
  
  // Return default structure if file doesn't exist or is invalid
  return {
    subscribers: [],
    stats: {
      total: 0,
      active: 0,
      unsubscribed: 0,
      lastUpdated: new Date().toISOString()
    }
  };
}

// Write subscribers data
export function writeSubscribersData(data: SubscribersData): boolean {
  try {
    // Ensure directory exists
    const dir = path.dirname(SUBSCRIBERS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing subscribers data:', error);
    return false;
  }
}

// Add new subscriber
export function addSubscriber(subscriber: Subscriber): boolean {
  const data = readSubscribersData();
  
  // Add new subscriber
  data.subscribers.push(subscriber);
  
  // Update stats
  data.stats = {
    total: data.subscribers.length,
    active: data.subscribers.filter(sub => sub.status === 'active').length,
    unsubscribed: data.subscribers.filter(sub => sub.status === 'unsubscribed').length,
    lastUpdated: new Date().toISOString()
  };
  
  return writeSubscribersData(data);
}

// Get subscriber count
export function getSubscriberCount(): number {
  const data = readSubscribersData();
  return data.stats.active;
}

// Get all subscribers (for admin)
export function getAllSubscribers(): Subscriber[] {
  const data = readSubscribersData();
  return data.subscribers;
}

// Export subscribers to CSV
export function exportSubscribersToCSV(): string {
  const subscribers = getAllSubscribers();
  
  const headers = ['ID', 'Email', 'Date', 'Source', 'Status', 'Deadlines', 'Results', 'Tips'];
  const rows = subscribers.map(sub => [
    sub.id,
    sub.email,
    sub.date,
    sub.source,
    sub.status,
    sub.preferences?.deadlines ? 'Yes' : 'No',
    sub.preferences?.results ? 'Yes' : 'No',
    sub.preferences?.tips ? 'Yes' : 'No'
  ]);
  
  const csvContent = [headers, ...rows]
    .map(row => row.map(field => `"${field}"`).join(','))
    .join('\n');
  
  return csvContent;
} 