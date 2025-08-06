import { Subscriber, SubscribeRequest } from './types';

// Email validation function
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Check if email already exists
export function isEmailDuplicate(email: string, subscribers: Subscriber[]): boolean {
  return subscribers.some(sub => sub.email.toLowerCase() === email.toLowerCase());
}

// Generate unique ID
export function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

// Create new subscriber object
export function createSubscriber(data: SubscribeRequest): Subscriber {
  return {
    id: generateId(),
    email: data.email.toLowerCase().trim(),
    date: new Date().toISOString(),
    source: data.source,
    preferences: data.preferences || {},
    status: 'active'
  };
}

// Update stats
export function updateStats(subscribers: Subscriber[]): {
  total: number;
  active: number;
  unsubscribed: number;
  lastUpdated: string;
} {
  const total = subscribers.length;
  const active = subscribers.filter(sub => sub.status === 'active').length;
  const unsubscribed = subscribers.filter(sub => sub.status === 'unsubscribed').length;

  return {
    total,
    active,
    unsubscribed,
    lastUpdated: new Date().toISOString()
  };
}

// Rate limiting check (simple IP-based)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = 5; // Max 5 subscriptions per hour
  const window = 60 * 60 * 1000; // 1 hour

  const current = rateLimitMap.get(ip);
  
  if (!current || now > current.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + window });
    return true;
  }

  if (current.count >= limit) {
    return false;
  }

  current.count++;
  return true;
} 