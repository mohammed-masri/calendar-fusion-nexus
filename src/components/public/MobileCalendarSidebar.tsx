
import React from 'react';
import { X } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { EventCategory, CalendarEvent } from '@/types/calendar';
import { CategoryFilter } from './CategoryFilter';
import { UpcomingToday } from './UpcomingToday';

interface MobileCalendarSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategories: (EventCategory | 'all')[];
  onCategoryChange: (categories: (EventCategory | 'all')[]) => void;
  currentDate: Date;
  onDateChange: (date: Date) => void;
  events: CalendarEvent[];
}

export const MobileCalendarSidebar: React.FC<MobileCalendarSidebarProps> = ({
  isOpen,
  onClose,
  selectedCategories,
  onCategoryChange,
  currentDate,
  onDateChange,
  events,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed top-0 left-0 h-full w-full max-w-sm bg-gray-50 z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
          <h2 className="text-lg font-semibold text-gray-900">Calendar</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4 space-y-4 overflow-y-auto h-full pb-20">
          {/* Calendar Card */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg tracking-tight">
                {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={currentDate}
                onSelect={(date) => date && onDateChange(date)}
                className="w-full border-0"
                classNames={{
                  months: "w-full",
                  month: "w-full",
                  table: "w-full border-collapse",
                  head_row: "flex w-full",
                  head_cell: "flex-1 text-center text-xs font-medium text-gray-500 p-2",
                  row: "flex w-full",
                  cell: "flex-1 text-center text-sm p-1",
                  day: "h-8 w-8 rounded-lg hover:bg-gray-50 flex items-center justify-center font-medium text-gray-900 transition-all duration-200",
                  day_selected: "bg-gray-900 text-white hover:bg-gray-800",
                  day_today: "bg-blue-50 text-blue-900 font-semibold",
                  day_outside: "text-gray-400",
                }}
              />
            </CardContent>
          </Card>

          {/* Category Filter Card */}
          <CategoryFilter
            selectedCategories={selectedCategories}
            onCategoryChange={onCategoryChange}
          />

          {/* Upcoming for Today */}
          <UpcomingToday events={events} />
        </div>
      </div>
    </>
  );
};
