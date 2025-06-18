
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarEvent, EventStatus, EventCategory } from '@/types/calendar';
import { Check, X, Eye, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const EventManagement = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Annual Conference 2024',
      description: 'Annual technology conference',
      startTime: new Date('2024-07-15T09:00:00'),
      endTime: new Date('2024-07-15T17:00:00'),
      category: 'events',
      status: 'pending',
      organizer: 'John Doe',
      participants: ['Alice Smith', 'Bob Johnson'],
      photos: [],
      outlookCalendarId: '1',
      location: 'Main Auditorium',
      isApproved: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      title: 'Board Meeting',
      description: 'Monthly board meeting',
      startTime: new Date('2024-07-10T14:00:00'),
      endTime: new Date('2024-07-10T16:00:00'),
      category: 'meetings',
      status: 'approved',
      organizer: 'Jane Wilson',
      participants: ['Executive Team'],
      photos: [],
      outlookCalendarId: '2',
      location: 'Conference Room A',
      isApproved: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]);
  
  const [filterStatus, setFilterStatus] = useState<EventStatus | 'all'>('all');
  const [filterCategory, setFilterCategory] = useState<EventCategory | 'all'>('all');
  const { toast } = useToast();

  const handleApprove = (eventId: string) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, status: 'approved' as EventStatus, isApproved: true }
        : event
    ));
    toast({
      title: "Event Approved",
      description: "Event has been approved and will be visible publicly",
    });
  };

  const handleReject = (eventId: string) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, status: 'rejected' as EventStatus, isApproved: false }
        : event
    ));
    toast({
      title: "Event Rejected",
      description: "Event has been rejected and will not be visible publicly",
    });
  };

  const filteredEvents = events.filter(event => {
    if (filterStatus !== 'all' && event.status !== filterStatus) return false;
    if (filterCategory !== 'all' && event.category !== filterCategory) return false;
    return true;
  });

  const getStatusColor = (status: EventStatus) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: EventCategory) => {
    const colors = {
      academic: 'bg-blue-100 text-blue-800',
      events: 'bg-purple-100 text-purple-800',
      meetings: 'bg-gray-100 text-gray-800',
      'vip-visit': 'bg-red-100 text-red-800',
      conference: 'bg-green-100 text-green-800',
      workshop: 'bg-orange-100 text-orange-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as EventStatus | 'all')}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1">
            <Select value={filterCategory} onValueChange={(value) => setFilterCategory(value as EventCategory | 'all')}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="academic">Academic</SelectItem>
                <SelectItem value="events">Events</SelectItem>
                <SelectItem value="meetings">Meetings</SelectItem>
                <SelectItem value="vip-visit">VIP Visit</SelectItem>
                <SelectItem value="conference">Conference</SelectItem>
                <SelectItem value="workshop">Workshop</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <div key={event.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{event.title}</h3>
                    <Badge className={getStatusColor(event.status)}>
                      {event.status}
                    </Badge>
                    <Badge className={getCategoryColor(event.category)}>
                      {event.category}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 mb-2">{event.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-500">
                    <div>📅 {event.startTime.toLocaleDateString()} {event.startTime.toLocaleTimeString()}</div>
                    <div>📍 {event.location}</div>
                    <div>👤 Organizer: {event.organizer}</div>
                    <div>👥 Participants: {event.participants.length}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  
                  {event.status === 'pending' && (
                    <>
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => handleApprove(event.id)}
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleReject(event.id)}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
