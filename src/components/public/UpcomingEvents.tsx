
import React from 'react';
import { Card } from '@/components/ui/card';
import { Clock, MapPin } from 'lucide-react';
import { CalendarEvent } from '@/types/calendar';

interface UpcomingEventsProps {
  events: CalendarEvent[];
}

export const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {
  const upcomingEvents = events
    .filter(event => event.startTime > new Date())
    .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
    .slice(0, 3);

  const getCategoryColor = (category: CalendarEvent['category']) => {
    const colors = {
      academic: 'bg-blue-100 text-blue-800',
      events: 'bg-purple-100 text-purple-800',
      meetings: 'bg-green-100 text-green-800',
      'vip-visit': 'bg-red-100 text-red-800',
      conference: 'bg-orange-100 text-orange-800',
      workshop: 'bg-pink-100 text-pink-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="p-4">
      <h3 className="font-semibold text-gray-900 mb-3">Upcoming Events</h3>
      <div className="space-y-3">
        {upcomingEvents.map((event) => (
          <div key={event.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <div className={`w-2 h-8 rounded-full ${getCategoryColor(event.category).split(' ')[0]}`} />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-gray-900 truncate">{event.title}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                <Clock className="h-3 w-3" />
                <span>{event.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                {event.location && (
                  <>
                    <MapPin className="h-3 w-3 ml-1" />
                    <span className="truncate">{event.location}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
        {upcomingEvents.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">No upcoming events</p>
        )}
      </div>
    </Card>
  );
};
