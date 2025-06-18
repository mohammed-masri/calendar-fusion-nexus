
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { OutlookCalendar } from '@/types/calendar';
import { Plus, Trash2, RefreshCw, Power } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const CalendarManagement = () => {
  const [calendars, setCalendars] = useState<OutlookCalendar[]>([
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
  ]);
  
  const [newCalendarName, setNewCalendarName] = useState('');
  const [newCalendarColor, setNewCalendarColor] = useState('#3b82f6');
  const { toast } = useToast();

  const handleAddCalendar = () => {
    if (!newCalendarName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a calendar name",
        variant: "destructive"
      });
      return;
    }

    const newCalendar: OutlookCalendar = {
      id: Date.now().toString(),
      name: newCalendarName,
      isActive: true,
      color: newCalendarColor,
      createdAt: new Date(),
    };

    setCalendars([...calendars, newCalendar]);
    setNewCalendarName('');
    toast({
      title: "Success",
      description: "Calendar added successfully",
    });
  };

  const toggleCalendarStatus = (id: string) => {
    setCalendars(calendars.map(cal => 
      cal.id === id ? { ...cal, isActive: !cal.isActive } : cal
    ));
  };

  const deleteCalendar = (id: string) => {
    setCalendars(calendars.filter(cal => cal.id !== id));
    toast({
      title: "Calendar Deleted",
      description: "Calendar has been removed from the system",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Add New Outlook Calendar</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="calendar-name">Calendar Name</Label>
            <Input
              id="calendar-name"
              value={newCalendarName}
              onChange={(e) => setNewCalendarName(e.target.value)}
              placeholder="Enter calendar name"
            />
          </div>
          <div>
            <Label htmlFor="calendar-color">Color</Label>
            <Input
              id="calendar-color"
              type="color"
              value={newCalendarColor}
              onChange={(e) => setNewCalendarColor(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <Button onClick={handleAddCalendar} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Calendar
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Existing Calendars</h3>
        <div className="space-y-4">
          {calendars.map((calendar) => (
            <div key={calendar.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: calendar.color }}
                />
                <div>
                  <h4 className="font-medium">{calendar.name}</h4>
                  <p className="text-sm text-gray-500">
                    Last sync: {calendar.lastSyncAt ? 
                      calendar.lastSyncAt.toLocaleString() : 'Never'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Badge variant={calendar.isActive ? "default" : "secondary"}>
                  {calendar.isActive ? 'Active' : 'Inactive'}
                </Badge>
                
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4" />
                </Button>
                
                <Button 
                  variant={calendar.isActive ? "outline" : "default"} 
                  size="sm"
                  onClick={() => toggleCalendarStatus(calendar.id)}
                >
                  <Power className="h-4 w-4" />
                </Button>
                
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => deleteCalendar(calendar.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
