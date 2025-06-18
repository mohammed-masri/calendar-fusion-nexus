
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { EventCategory, CalendarEvent } from '@/types/calendar';
import { CategoryFilter } from './CategoryFilter';
import { UpcomingToday } from './UpcomingToday';

interface CalendarSidebarProps {
  selectedCategory: EventCategory | 'all';
  onCategoryChange: (category: EventCategory | 'all') => void;
  currentDate: Date;
  onDateChange: (date: Date) => void;
  events: CalendarEvent[];
}

export const CalendarSidebar: React.FC<CalendarSidebarProps> = ({
  selectedCategory,
  onCategoryChange,
  currentDate,
  onDateChange,
  events,
}) => {
  return (
    <div className="hidden lg:flex w-80 bg-white border-r border-gray-100 flex-col overflow-y-auto font-inter sticky top-0 h-screen">
      <div className="p-6 space-y-8">
        {/* Calendar at the top */}
        <div className="bg-white">
          <h3 className="font-semibold text-gray-900 mb-6 text-xl tracking-tight">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h3>
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
              head_cell: "flex-1 text-center text-xs font-medium text-gray-500 p-3",
              row: "flex w-full",
              cell: "flex-1 text-center text-sm p-1",
              day: "h-9 w-9 rounded-lg hover:bg-gray-50 flex items-center justify-center font-medium text-gray-900 transition-all duration-200",
              day_selected: "bg-gray-900 text-white hover:bg-gray-800",
              day_today: "bg-blue-50 text-blue-900 font-semibold",
              day_outside: "text-gray-400",
            }}
          />
        </div>

        {/* Category Filter */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />

        {/* Upcoming for Today */}
        <UpcomingToday events={events} />
      </div>
    </div>
  );
};
