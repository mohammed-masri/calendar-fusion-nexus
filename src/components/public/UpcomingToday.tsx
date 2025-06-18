
import React from 'react';
import { CalendarEvent } from '@/types/calendar';
import { ParticipantAvatars } from './ParticipantAvatars';
import { Clock, MapPin, CalendarPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface UpcomingTodayProps {
  events: CalendarEvent[];
}

export const UpcomingToday: React.FC<UpcomingTodayProps> = ({ events }) => {
  const { toast } = useToast();
  const today = new Date();
  const todayEvents = events
    .filter(event => {
      const eventDate = new Date(event.startTime);
      return eventDate.toDateString() === today.toDateString();
    })
    .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
    .slice(0, 3);

  const getCategoryColor = (category: CalendarEvent['category']) => {
    const colors = {
      meetings: 'bg-teal-100 border-teal-200',
      workshop: 'bg-purple-100 border-purple-200',
      events: 'bg-green-100 border-green-200',
      academic: 'bg-orange-100 border-orange-200',
      conference: 'bg-blue-100 border-blue-200',
      'vip-visit': 'bg-red-100 border-red-200',
    };
    return colors[category] || 'bg-gray-100 border-gray-200';
  };

  const handleAddToCalendar = (event: CalendarEvent) => {
    const startDate = event.startTime.toISOString().replace(/[:-]/g, '').split('.')[0] + 'Z';
    const endDate = event.endTime.toISOString().replace(/[:-]/g, '').split('.')[0] + 'Z';
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(event.description || '')}&location=${encodeURIComponent(event.location || '')}`;
    
    window.open(calendarUrl, '_blank');
    
    toast({
      title: "Opening Calendar",
      description: `Adding "${event.title}" to your personal calendar`,
    });
  };

  return (
    <div className="bg-white">
      <h3 className="font-semibold text-gray-900 text-lg mb-4">Upcoming for Today</h3>
      {todayEvents.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-sm text-gray-500">No events scheduled for today</p>
        </div>
      ) : (
        <div className="space-y-3">
          {todayEvents.map((event) => (
            <div
              key={event.id}
              className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-sm ${getCategoryColor(event.category)}`}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-900 text-sm flex-1 pr-2">{event.title}</h4>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="flex items-center text-xs text-gray-600">
                    <Clock className="h-3 w-3 mr-1" />
                    {event.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <Button
                    onClick={() => handleAddToCalendar(event)}
                    variant="outline"
                    size="sm"
                    className="h-7 px-2 bg-white/80 border-gray-300 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md group"
                    title="Add to My Calendar"
                  >
                    <CalendarPlus className="h-3 w-3 mr-1 group-hover:animate-pulse" />
                    <span className="text-xs font-medium">Add</span>
                  </Button>
                </div>
              </div>
              
              {event.location && (
                <div className="flex items-center text-xs text-gray-600 mb-2">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{event.location}</span>
                </div>
              )}
              
              {event.participants.length > 0 && (
                <div className="flex items-center justify-between">
                  <ParticipantAvatars participants={event.participants} maxVisible={3} />
                  <span className="text-xs text-gray-500">
                    {event.participants.length} participant{event.participants.length !== 1 ? 's' : ''}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
