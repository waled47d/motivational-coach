export interface MotivationalMessage {
  id: string;
  text: string;
  author?: string;
  category: 'quote' | 'personal' | 'achievement' | 'resilience' | 'growth';
}

export interface NotificationSettings {
  enabled: boolean;
  interval: number; // in minutes
  startTime: string;
  endTime: string;
  weekendsEnabled: boolean;
}