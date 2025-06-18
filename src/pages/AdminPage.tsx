
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarManagement } from '@/components/admin/CalendarManagement';
import { EventManagement } from '@/components/admin/EventManagement';
import { ActivityLogs } from '@/components/admin/ActivityLogs';
import { Settings, Calendar, FileText } from 'lucide-react';

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Calendar Administration
          </h1>
          <p className="text-gray-600">
            Manage Outlook calendars, approve events, and monitor system activity
          </p>
        </div>

        <Tabs defaultValue="calendars" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="calendars" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Calendar Management
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Event Management
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Activity Logs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendars">
            <CalendarManagement />
          </TabsContent>

          <TabsContent value="events">
            <EventManagement />
          </TabsContent>

          <TabsContent value="logs">
            <ActivityLogs />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;
