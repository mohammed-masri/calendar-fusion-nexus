
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarLog } from '@/types/calendar';
import { AlertCircle, CheckCircle, Info, Trash2 } from 'lucide-react';

export const ActivityLogs = () => {
  const [logs] = useState<CalendarLog[]>([
    {
      id: '1',
      action: 'deleted',
      eventId: 'evt-123',
      message: 'Event "Team Meeting" was deleted from Outlook calendar and removed from public view',
      timestamp: new Date(),
      details: { eventTitle: 'Team Meeting', originalCalendar: 'Main Calendar' }
    },
    {
      id: '2',
      action: 'created',
      eventId: 'evt-124',
      message: 'New event "Conference 2024" created and pending approval',
      timestamp: new Date(Date.now() - 3600000),
      details: { eventTitle: 'Conference 2024', category: 'events' }
    },
    {
      id: '3',
      action: 'synced',
      calendarId: 'cal-1',
      message: 'Successfully synced with Outlook calendar "Academic Events"',
      timestamp: new Date(Date.now() - 7200000),
      details: { eventsCount: 5, newEvents: 2 }
    }
  ]);

  const getActionIcon = (action: CalendarLog['action']) => {
    switch (action) {
      case 'created': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'updated': return <Info className="h-4 w-4 text-blue-600" />;
      case 'deleted': return <Trash2 className="h-4 w-4 text-red-600" />;
      case 'synced': return <CheckCircle className="h-4 w-4 text-green-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActionColor = (action: CalendarLog['action']) => {
    switch (action) {
      case 'created': return 'bg-green-100 text-green-800';
      case 'updated': return 'bg-blue-100 text-blue-800';
      case 'deleted': return 'bg-red-100 text-red-800';
      case 'synced': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">System Activity Logs</h3>
      <div className="space-y-4">
        {logs.map((log) => (
          <div key={log.id} className="border-l-4 border-gray-200 pl-4 py-2">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {getActionIcon(log.action)}
                  <Badge className={getActionColor(log.action)}>
                    {log.action.toUpperCase()}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {log.timestamp.toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-800 mb-2">{log.message}</p>
                {log.details && (
                  <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    <strong>Details:</strong>
                    <pre className="mt-1">{JSON.stringify(log.details, null, 2)}</pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
