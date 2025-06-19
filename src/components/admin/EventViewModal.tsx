
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarEvent } from '@/types/calendar';
import { Calendar, Clock, MapPin, User, Users, ImageIcon, Edit, Check, X } from 'lucide-react';

interface EventViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: CalendarEvent | null;
  onEdit?: (event: CalendarEvent) => void;
  onApprove?: (eventId: string) => void;
  onReject?: (eventId: string) => void;
}

export const EventViewModal: React.FC<EventViewModalProps> = ({
  isOpen,
  onClose,
  event,
  onEdit,
  onApprove,
  onReject,
}) => {
  if (!event) return null;

  const getCategoryColor = (category: string) => {
    const colors = {
      academic: 'bg-orange-100 text-orange-800',
      'academic-calendar': 'bg-teal-100 text-teal-800',
      events: 'bg-green-100 text-green-800',
      meetings: 'bg-blue-100 text-blue-800',
      'vip-visit': 'bg-red-100 text-red-800',
      conference: 'bg-purple-100 text-purple-800',
      workshop: 'bg-indigo-100 text-indigo-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDuration = () => {
    const diffInMs = event.endTime.getTime() - event.startTime.getTime();
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0 && minutes > 0) {
      return `${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${minutes}m`;
    }
  };

  const renderParticipants = () => {
    return event.participants.slice(0, 3).map((participant, index) => {
      const participantName = typeof participant === 'string' ? participant : participant.name || 'Unknown';
      return (
        <span key={index}>
          {participantName}
          {index < Math.min(2, event.participants.length - 1) && ', '}
        </span>
      );
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-xl mb-2">{event.title}</DialogTitle>
              <div className="flex items-center gap-2 mb-4">
                <Badge className={getCategoryColor(event.category)}>
                  {event.category.replace('-', ' ')}
                </Badge>
                <Badge className={getStatusColor(event.status)}>
                  {event.status}
                </Badge>
              </div>
            </div>
            <div className="flex gap-2 ml-4">
              {event.status === 'pending' && (
                <>
                  <Button 
                    size="sm" 
                    onClick={() => onApprove?.(event.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => onReject?.(event.id)}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                </>
              )}
              <Button size="sm" variant="outline" onClick={() => onEdit?.(event)}>
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Description */}
          {event.description && (
            <div>
              <h4 className="font-semibold mb-2">Description</h4>
              <p className="text-gray-700 leading-relaxed">{event.description}</p>
            </div>
          )}

          {/* Event Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">Start Time</p>
                  <p className="text-sm text-gray-600">{formatDateTime(event.startTime)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">End Time</p>
                  <p className="text-sm text-gray-600">{formatDateTime(event.endTime)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">Duration</p>
                  <p className="text-sm text-gray-600">{formatDuration()}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {event.location && (
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-gray-600">{event.location}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">Organizer</p>
                  <p className="text-sm text-gray-600">{event.organizer}</p>
                </div>
              </div>

              {event.participants.length > 0 && (
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-gray-500 mt-1" />
                  <div>
                    <p className="font-medium">Participants ({event.participants.length})</p>
                    <div className="text-sm text-gray-600">
                      {renderParticipants()}
                      {event.participants.length > 3 && (
                        <span> and {event.participants.length - 3} more</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Photos */}
          {event.photos && event.photos.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Photos ({event.photos.length})
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {event.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Event photo ${index + 1}`}
                    className="w-full h-24 object-cover rounded-md border"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="pt-4 border-t border-gray-200">
            <h4 className="font-semibold mb-3">Event Information</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Created:</span>
                <span className="ml-2">{event.createdAt.toLocaleDateString()}</span>
              </div>
              <div>
                <span className="text-gray-500">Last Updated:</span>
                <span className="ml-2">{event.updatedAt.toLocaleDateString()}</span>
              </div>
              <div>
                <span className="text-gray-500">Event ID:</span>
                <span className="ml-2 font-mono text-xs">{event.id}</span>
              </div>
              <div>
                <span className="text-gray-500">Calendar:</span>
                <span className="ml-2">{event.outlookCalendarId}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
