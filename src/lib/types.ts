export interface Subscriber {
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

export interface SubscriberStats {
  total: number;
  active: number;
  unsubscribed: number;
  lastUpdated: string;
}

export interface SubscribersData {
  subscribers: Subscriber[];
  stats: SubscriberStats;
}

export interface SubscribeRequest {
  email: string;
  source: 'resources' | 'timeline' | 'manual';
  preferences?: {
    deadlines?: boolean;
    results?: boolean;
    tips?: boolean;
  };
}

export interface SubscribeResponse {
  success: boolean;
  message: string;
  subscriber?: Subscriber;
} 