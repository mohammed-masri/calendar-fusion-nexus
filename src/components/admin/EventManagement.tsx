
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarEvent, EventStatus, EventCategory, OutlookCalendar } from '@/types/calendar';
import { Check, X, Eye, Edit, Clock, MapPin, User, Users, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { EventEditModal } from './EventEditModal';

export const EventManagement = () => {
  // Mock calendars data to match events with their source calendars
  const calendars: OutlookCalendar[] = [
    {
      id: '1',
      name: 'Main Academic Calendar',
      isActive: true,
      color: '#3b82f6',
      lastSyncAt: new Date(),
      createdAt: new Date(),
    },
    {
      id: '2',
      name: 'Events & Conferences',
      isActive: true,
      color: '#ef4444',
      lastSyncAt: new Date(),
      createdAt: new Date(),
    }
  ];

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
      outlookCalendarId: '2',
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
      outlookCalendarId: '1',
      location: 'Conference Room A',
      isApproved: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]);
  
  const [filterStatus, setFilterStatus] = useState<EventStatus | 'all'>('all');
  const [filterCategory, setFilterCategory] = useState<EventCategory | 'all'>('all');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const { toast } = useToast();

  // Function to get calendar info by ID
  const getCalendarInfo = (calendarId: string) => {
    return calendars.find(cal => cal.id === calendarId) || {
      id: calendarId,
      name: 'Unknown Calendar',
      color: '#6b7280',
      isActive: false,
      createdAt: new Date(),
    };
  };

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

  const handleEdit = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setEditModalOpen(true);
  };

  const handleSaveEvent = (eventId: string, updatedEvent: Partial<CalendarEvent>) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, ...updatedEvent }
        : event
    ));
  };

  const filteredEvents = events.filter(event => {
    if (filterStatus !== 'all' && event.status !== filterStatus) return false;
    if (filterCategory !== 'all' && event.category !== filterCategory) return false;
    return true;
  });

  const getStatusColor = (status: EventStatus) => {
    switch (status) {
      case 'approved': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'rejected': return 'bg-red-50 text-red-700 border-red-200';
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getCategoryColor = (category: EventCategory) => {
    const colors = {
      academic: 'bg-blue-50 text-blue-700 border-blue-200',
      'academic-calendar': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      events: 'bg-purple-50 text-purple-700 border-purple-200',
      meetings: 'bg-slate-50 text-slate-700 border-slate-200',
      'vip-visit': 'bg-rose-50 text-rose-700 border-rose-200',
      conference: 'bg-green-50 text-green-700 border-green-200',
      workshop: 'bg-orange-50 text-orange-700 border-orange-200',
    };
    return colors[category] || 'bg-slate-50 text-slate-700 border-slate-200';
  };

  return (
    <div className="space-y-6">
      {/* Modern Filter Section */}
      <Card className="p-6 bg-gradient-to-r from-white to-slate-50/30 border border-slate-200/60 shadow-lg shadow-slate-200/20">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-slate-600" />
          <h3 className="font-semibold text-slate-900">Filter Events</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Status</label>
            <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as EventStatus | 'all')}>
              <SelectTrigger className="bg-white border-slate-300 focus:border-slate-500 focus:ring-slate-500">
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
          
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Category</label>
            <Select value={filterCategory} onValueChange={(value) => setFilterCategory(value as EventCategory | 'all')}>
              <SelectTrigger className="bg-white border-slate-300 focus:border-slate-500 focus:ring-slate-500">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="academic">Academic</SelectItem>
                <SelectItem value="academic-calendar">Academic Calendar</SelectItem>
                <SelectItem value="events">Events</SelectItem>
                <SelectItem value="meetings">Meetings</SelectItem>
                <SelectItem value="vip-visit">VIP Visit</SelectItem>
                <SelectItem value="conference">Conference</SelectItem>
                <SelectItem value="workshop">Workshop</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Modern Events List */}
      <div className="space-y-4">
        {filteredEvents.map((event) => {
          const calendarInfo = getCalendarInfo(event.outlookCalendarId);
          return (
            <Card key={event.id} className="p-6 bg-white/80 backdrop-blur-sm border border-slate-200/60 shadow-lg shadow-slate-200/20 hover:shadow-xl hover:shadow-slate-200/30 transition-all duration-300 group">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-slate-800 transition-colors">
                      {event.title}
                    </h3>
                    <Badge className={`${getStatusColor(event.status)} border font-medium px-3 py-1`}>
                      {event.status}
                    </Badge>
                    <Badge className={`${getCategoryColor(event.category)} border font-medium px-3 py-1`}>
                      {event.category}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className="border-2 font-medium px-3 py-1"
                      style={{ 
                        borderColor: calendarInfo.color,
                        backgroundColor: `${calendarInfo.color}10`,
                        color: calendarInfo.color
                      }}
                    >
                      <div 
                        className="w-2 h-2 rounded-full mr-2" 
                        style={{ backgroundColor: calendarInfo.color }}
                      />
                      {calendarInfo.name}
                    </Badge>
                  </div>
                  
                  <p className="text-slate-600 mb-4 font-medium leading-relaxed">
                    {event.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Clock className="h-4 w-4 text-slate-500" />
                      <span className="font-medium">
                        {event.startTime.toLocaleDateString()} at {event.startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin className="h-4 w-4 text-slate-500" />
                      <span className="font-medium">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <User className="h-4 w-4 text-slate-500" />
                      <span className="font-medium">Organizer: {event.organizer}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Users className="h-4 w-4 text-slate-500" />
                      <span className="font-medium">{event.participants.length} participants</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-6 flex-shrink-0">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="hover:bg-slate-50 border-slate-300 text-slate-700 hover:text-slate-900 transition-all duration-200"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEdit(event)}
                    className="hover:bg-slate-50 border-slate-300 text-slate-700 hover:text-slate-900 transition-all duration-200"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  
                  {event.status === 'pending' && (
                    <>
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => handleApprove(event.id)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleReject(event.id)}
                        className="bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <EventEditModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        event={selectedEvent}
        onSave={handleSaveEvent}
      />
    </div>
  );
};
