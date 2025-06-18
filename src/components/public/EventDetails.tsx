
import React from 'react';
import { Button } from '@/components/ui/button';
import { CalendarEvent, Participant } from '@/types/calendar';
import { X, Calendar, MapPin, User, Users, CalendarPlus, Clock, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ParticipantAvatars } from './ParticipantAvatars';

interface EventDetailsProps {
  event: CalendarEvent | null;
  onClose: () => void;
}

const getParticipantName = (participant: string | Participant): string => {
  return typeof participant === 'string' ? participant : participant.name;
};

export const EventDetails: React.FC<EventDetailsProps> = ({ event, onClose }) => {
  const { toast } = useToast();

  if (!event) return null;

  const handleAddToCalendar = () => {
    const startDate = event.startTime.toISOString().replace(/[:-]/g, '').split('.')[0] + 'Z';
    const endDate = event.endTime.toISOString().replace(/[:-]/g, '').split('.')[0] + 'Z';
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(event.description || '')}&location=${encodeURIComponent(event.location || '')}`;
    
    window.open(calendarUrl, '_blank');
    
    toast({
      title: "Opening Calendar",
      description: "Add this event to your personal calendar",
    });
  };

  const categoryLabels = {
    academic: 'Academic',
    events: 'Event',
    meetings: 'Meeting',
    'vip-visit': 'VIP Visit',
    conference: 'Conference',
    workshop: 'Workshop',
  };

  return (
    <Dialog open={!!event} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto bg-white/95 backdrop-blur-sm border-gray-200 shadow-lg">
        <DialogHeader className="pb-2 border-b border-gray-100">
          <div className="flex items-start justify-between gap-3 pr-8">
            <DialogTitle className="text-lg font-semibold text-gray-900 text-left flex-1">
              {event.title}
            </DialogTitle>
          </div>
          <div className="flex items-center justify-between gap-2 mt-2">
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
              {categoryLabels[event.category]}
            </span>
            <Button
              onClick={handleAddToCalendar}
              variant="outline"
              size="sm"
              className="h-8 px-3 text-xs"
            >
              <CalendarPlus className="h-3 w-3 mr-1" />
              Add to Calendar
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-3 py-1">
          {/* Event Photos Section */}
          {event.photos && event.photos.length > 0 && (
            <div className={`grid gap-2 ${event.photos.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
              {event.photos.map((photo, index) => (
                <div key={index} className="relative overflow-hidden rounded-lg border border-gray-200">
                  <img 
                    src={photo} 
                    alt={`Event photo ${index + 1}`}
                    className="w-full h-28 object-cover hover:scale-105 transition-transform duration-200"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Description Section */}
          {event.description && (
            <div className="bg-gray-50 rounded-lg p-3 pb-2 border-b border-gray-100">
              <p className="text-sm text-gray-700 leading-relaxed">
                {event.description}
              </p>
            </div>
          )}

          {/* Event Details */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center">
                <Calendar className="h-3 w-3 text-gray-600" />
              </div>
              <div className="text-sm">
                <div className="font-medium text-gray-900">
                  {event.startTime.toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center">
                <Clock className="h-3 w-3 text-gray-600" />
              </div>
              <div className="text-sm">
                <div className="font-medium text-gray-900">
                  {event.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {event.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>

            {event.location && (
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center">
                  <MapPin className="h-3 w-3 text-gray-600" />
                </div>
                <div className="text-sm">
                  <div className="font-medium text-gray-900">{event.location}</div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center">
                <User className="h-3 w-3 text-gray-600" />
              </div>
              <div className="text-sm">
                <div className="font-medium text-gray-900">{event.organizer}</div>
              </div>
            </div>

            {/* Enhanced Participants Section */}
            {event.participants.length > 0 && (
              <div className="pt-2 border-t border-gray-100 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center">
                    <Users className="h-3 w-3 text-gray-600" />
                  </div>
                  <div className="font-medium text-gray-900 text-sm">
                    {event.participants.length} Participant{event.participants.length !== 1 ? 's' : ''}
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-2 space-y-2">
                  <ParticipantAvatars participants={event.participants} maxVisible={6} />
                  
                  <div className="space-y-1">
                    <div className="flex flex-wrap gap-1">
                      {event.participants.map((participant, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 rounded-md text-xs bg-white text-gray-700 border border-gray-200"
                        >
                          {getParticipantName(participant)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
