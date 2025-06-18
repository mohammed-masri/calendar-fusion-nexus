
export interface Participant {
  name: string;
  imageUrl?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  category: EventCategory;
  status: EventStatus;
  organizer: string;
  participants: (string | Participant)[];
  photos: string[];
  outlookCalendarId: string;
  location?: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface OutlookCalendar {
  id: string;
  name: string;
  isActive: boolean;
  color: string;
  lastSyncAt?: Date;
  createdAt: Date;
}

export type EventCategory = 
  | 'academic' 
  | 'events' 
  | 'meetings' 
  | 'vip-visit' 
  | 'conference' 
  | 'workshop';

export type EventStatus = 'pending' | 'approved' | 'rejected';

export type CalendarView = 'day' | 'week' | 'month' | 'year';

export interface CalendarLog {
  id: string;
  action: 'created' | 'updated' | 'deleted' | 'synced';
  eventId?: string;
  calendarId?: string;
  message: string;
  timestamp: Date;
  details?: Record<string, any>;
}
