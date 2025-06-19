
import React, { useState } from 'react';
import { CalendarManagement } from '@/components/admin/CalendarManagement';
import { EventManagement } from '@/components/admin/EventManagement';
import { BusinessActivityLogs } from '@/components/admin/BusinessActivityLogs';
import { AddCalendarModal } from '@/components/admin/AddCalendarModal';
import { EventViewModal } from '@/components/admin/EventViewModal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  Calendar, 
  Settings, 
  Activity, 
  Bell,
  Search,
  User,
  Menu
} from 'lucide-react';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('calendar-management');
  const [addCalendarOpen, setAddCalendarOpen] = useState(false);
  const [viewEventOpen, setViewEventOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Changed default to false for mobile-first

  const handleAddCalendar = (calendarData: any) => {
    console.log('Adding calendar:', calendarData);
    // Here you would typically save to your backend
  };

  const unreadNotifications = 5;

  const navigationItems = [
    { id: 'calendar-management', label: 'Calendar Management', icon: Calendar }, // Changed label
    { id: 'configuration', label: 'Calendar Setup', icon: Settings },
    { id: 'logs', label: 'Activity Logs', icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Modern Container - Fixed responsive container */}
      <div className="w-full bg-white/80 backdrop-blur-sm shadow-2xl shadow-slate-200/50 border border-white/50">
        {/* Modern Header - Improved mobile layout */}
        <header className="bg-white/95 backdrop-blur-sm border-b border-slate-200/60 px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 h-10 w-10 p-0 rounded-xl transition-all duration-200 lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="min-w-0">
                <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent truncate">
                  Admin Portal
                </h1>
                <p className="text-xs lg:text-sm text-slate-500 font-medium hidden sm:block">
                  Manage your calendar ecosystem
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
              {/* Modern Search - Hidden on small screens, shown on medium+ */}
              <div className="relative hidden lg:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search events, calendars..."
                  className="pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent w-48 xl:w-56 bg-white/80 text-sm transition-all duration-200 hover:bg-white focus:bg-white"
                />
              </div>
              
              {/* Modern Notifications */}
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 h-9 w-9 lg:h-10 lg:w-10 p-0 rounded-xl transition-all duration-200"
                >
                  <Bell className="h-4 w-4 lg:h-5 lg:w-5" />
                  {unreadNotifications > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-4 w-4 lg:h-5 lg:w-5 flex items-center justify-center text-xs p-0 animate-pulse"
                    >
                      {unreadNotifications}
                    </Badge>
                  )}
                </Button>
              </div>
              
              {/* Modern User Menu */}
              <Button 
                variant="ghost" 
                size="sm"
                className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 h-9 w-9 lg:h-10 lg:w-10 p-0 rounded-xl transition-all duration-200"
              >
                <User className="h-4 w-4 lg:h-5 lg:w-5" />
              </Button>
            </div>
          </div>
        </header>

        <div className="flex relative">
          {/* Modern Sidebar - Improved responsive behavior */}
          <aside className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:relative top-0 left-0 z-40 lg:z-auto w-64 lg:w-64 xl:w-72 transition-transform duration-300 bg-gradient-to-b from-slate-50 to-white border-r border-slate-200/60 min-h-screen lg:min-h-0 overflow-y-auto lg:overflow-visible`}>
            <nav className="p-4">
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false); // Close sidebar on mobile after selection
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 font-medium group ${
                      activeTab === item.id 
                        ? 'bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg shadow-slate-900/25' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white hover:shadow-md'
                    }`}
                  >
                    <item.icon className={`h-5 w-5 flex-shrink-0 transition-all duration-200 ${
                      activeTab === item.id ? 'text-white' : 'text-slate-500 group-hover:text-slate-700'
                    }`} />
                    <span className="flex-1 text-sm font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </nav>
          </aside>

          {/* Overlay for mobile sidebar */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Modern Main Content - Improved responsive layout */}
          <main className="flex-1 p-4 lg:p-6 min-h-screen overflow-x-hidden">
            <div className="max-w-full">
              {/* Modern Content Header */}
              <div className="mb-6 lg:mb-8">
                <Card className="p-4 lg:p-6 bg-gradient-to-r from-white to-slate-50/50 border border-slate-200/60 shadow-lg shadow-slate-200/30">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <h2 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight capitalize mb-2 truncate">
                        {activeTab.replace('-', ' ')}
                      </h2>
                      <p className="text-slate-600 font-medium leading-relaxed text-sm lg:text-base">
                        {activeTab === 'calendar-management' && 'Review and manage calendar events with advanced controls'}
                        {activeTab === 'configuration' && 'Configure calendar connections and system preferences'}
                        {activeTab === 'logs' && 'Monitor system activities and track user interactions'}
                      </p>
                    </div>
                    <div className="hidden lg:block w-12 h-12 xl:w-16 xl:h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center flex-shrink-0">
                      {activeTab === 'calendar-management' && <Calendar className="h-6 w-6 xl:h-8 xl:w-8 text-slate-600" />}
                      {activeTab === 'configuration' && <Settings className="h-6 w-6 xl:h-8 xl:w-8 text-slate-600" />}
                      {activeTab === 'logs' && <Activity className="h-6 w-6 xl:h-8 xl:w-8 text-slate-600" />}
                    </div>
                  </div>
                </Card>
              </div>

              {/* Dynamic Content with Modern Styling */}
              <div className="space-y-6">
                {activeTab === 'configuration' && <CalendarManagement />}
                {activeTab === 'calendar-management' && <EventManagement />}
                {activeTab === 'logs' && <BusinessActivityLogs />}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Modals */}
      <AddCalendarModal
        isOpen={addCalendarOpen}
        onClose={() => setAddCalendarOpen(false)}
        onSave={handleAddCalendar}
      />

      <EventViewModal
        isOpen={viewEventOpen}
        onClose={() => setViewEventOpen(false)}
        event={selectedEvent}
      />
    </div>
  );
};

export default AdminPage;
