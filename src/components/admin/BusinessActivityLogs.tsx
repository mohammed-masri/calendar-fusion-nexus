
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarLog } from '@/types/calendar';
import { User, Calendar, CheckCircle, AlertCircle, Clock, Filter } from 'lucide-react';

export const BusinessActivityLogs = () => {
  const [logs] = useState<CalendarLog[]>([
    {
      id: '1',
      action: 'created',
      eventId: 'evt-123',
      message: 'Conference 2024 was created by Dr. Sarah Johnson for the Marketing Department',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      details: { 
        userName: 'Dr. Sarah Johnson',
        department: 'Marketing',
        eventTitle: 'Conference 2024',
        category: 'conference'
      }
    },
    {
      id: '2',
      action: 'updated',
      eventId: 'evt-124',
      message: 'Board Meeting was approved and is now visible to all staff members',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      details: { 
        approvedBy: 'Admin',
        eventTitle: 'Board Meeting',
        visibility: 'All Staff'
      }
    },
    {
      id: '3',
      action: 'synced',
      calendarId: 'cal-1',
      message: 'Academic Events calendar synchronized successfully with 5 new events imported',
      timestamp: new Date(Date.now() - 1000 * 60 * 90),
      details: { 
        calendarName: 'Academic Events',
        eventsImported: 5,
        duration: '2.3 seconds'
      }
    },
    {
      id: '4',
      action: 'deleted',
      eventId: 'evt-125',
      message: 'Cancelled Workshop was removed by Prof. Mike Chen due to low enrollment',
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
      details: { 
        userName: 'Prof. Mike Chen',
        reason: 'Low enrollment',
        eventTitle: 'Cancelled Workshop'
      }
    }
  ]);

  const [filterAction, setFilterAction] = useState<string>('all');
  const [filterTimeRange, setFilterTimeRange] = useState<string>('today');

  const getActionIcon = (action: CalendarLog['action']) => {
    switch (action) {
      case 'created': return <User className="h-4 w-4 text-blue-600" />;
      case 'updated': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'deleted': return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'synced': return <Calendar className="h-4 w-4 text-purple-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActionBadge = (action: CalendarLog['action']) => {
    const styles = {
      created: 'bg-blue-100 text-blue-800',
      updated: 'bg-green-100 text-green-800',
      deleted: 'bg-red-100 text-red-800',
      synced: 'bg-purple-100 text-purple-800'
    };
    
    const labels = {
      created: 'Event Created',
      updated: 'Event Approved',
      deleted: 'Event Removed',
      synced: 'Calendar Synced'
    };

    return (
      <Badge className={styles[action] || 'bg-gray-100 text-gray-800'}>
        {labels[action] || action.toUpperCase()}
      </Badge>
    );
  };

  const formatBusinessTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)} days ago`;
    return date.toLocaleDateString();
  };

  const formatBusinessDetails = (log: CalendarLog) => {
    if (!log.details) return null;

    switch (log.action) {
      case 'created':
        return (
          <div className="grid grid-cols-2 gap-2 text-xs">
            <span><strong>Department:</strong> {log.details.department}</span>
            <span><strong>Category:</strong> {log.details.category}</span>
          </div>
        );
      case 'updated':
        return (
          <div className="text-xs">
            <span><strong>Approved by:</strong> {log.details.approvedBy} • </span>
            <span><strong>Visibility:</strong> {log.details.visibility}</span>
          </div>
        );
      case 'synced':
        return (
          <div className="text-xs">
            <span><strong>Events imported:</strong> {log.details.eventsImported} • </span>
            <span><strong>Duration:</strong> {log.details.duration}</span>
          </div>
        );
      case 'deleted':
        return (
          <div className="text-xs">
            <span><strong>Reason:</strong> {log.details.reason}</span>
          </div>
        );
      default:
        return null;
    }
  };

  const filteredLogs = logs.filter(log => {
    if (filterAction !== 'all' && log.action !== filterAction) return false;
    return true;
  });

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Business Activity</h3>
          <p className="text-sm text-gray-600">Track important events and changes</p>
        </div>
        
        <div className="flex gap-2">
          <Select value={filterAction} onValueChange={setFilterAction}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Activities</SelectItem>
              <SelectItem value="created">Events Created</SelectItem>
              <SelectItem value="updated">Events Approved</SelectItem>
              <SelectItem value="deleted">Events Removed</SelectItem>
              <SelectItem value="synced">Calendar Synced</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredLogs.map((log) => (
          <div key={log.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start gap-4">
              <div className="mt-1">
                {getActionIcon(log.action)}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {getActionBadge(log.action)}
                  <span className="text-sm text-gray-500">
                    {formatBusinessTime(log.timestamp)}
                  </span>
                </div>
                
                <p className="text-gray-800 mb-2 font-medium">{log.message}</p>
                
                {formatBusinessDetails(log)}
              </div>
              
              <div className="text-right">
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
