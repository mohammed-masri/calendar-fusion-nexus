
import React from 'react';
import { Button } from '@/components/ui/button';
import { CalendarView } from '@/types/calendar';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';

interface CalendarHeaderProps {
  currentView: CalendarView;
  onViewChange: (view: CalendarView) => void;
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onMobileMenuToggle: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentView,
  onViewChange,
  currentDate,
  onDateChange,
  onMobileMenuToggle,
}) => {
  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    
    switch (currentView) {
      case 'day':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
        break;
      case 'week':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
        break;
      case 'year':
        newDate.setFullYear(newDate.getFullYear() + (direction === 'next' ? 1 : -1));
        break;
    }
    
    onDateChange(newDate);
  };

  const getDateDisplay = () => {
    return currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  const viewOptions = [
    { value: 'month', label: 'Month' },
    { value: 'week', label: 'Week' },
    { value: 'day', label: 'Day' },
  ];

  return (
    <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-4 sm:px-8 py-4 sm:py-6 font-inter">
      {/* Main Header Row */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 sm:gap-8 min-w-0">
          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onMobileMenuToggle}
            className="lg:hidden text-gray-500 hover:text-gray-700 hover:bg-gray-50 h-9 w-9 p-0 rounded-lg"
          >
            <Menu className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            onClick={() => onDateChange(new Date())}
            className="text-lg sm:text-2xl font-semibold text-gray-900 tracking-tight truncate hover:bg-gray-50 px-2 py-1 rounded-lg transition-colors duration-200"
          >
            {getDateDisplay()}
          </Button>
          
          {/* Navigation controls */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigateDate('prev')}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-50 h-8 w-8 sm:h-9 sm:w-9 p-0 rounded-lg transition-all duration-200"
            >
              <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onDateChange(new Date())}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-2 sm:px-4 h-8 sm:h-9 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 hidden sm:inline-flex"
            >
              Today
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigateDate('next')}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-50 h-8 w-8 sm:h-9 sm:w-9 p-0 rounded-lg transition-all duration-200"
            >
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-gray-50 rounded-xl p-1 sm:p-1.5">
          {viewOptions.map((option) => (
            <Button
              key={option.value}
              variant="ghost"
              size="sm"
              onClick={() => onViewChange(option.value as CalendarView)}
              className={`text-xs sm:text-sm font-medium h-7 sm:h-8 px-2 sm:px-4 rounded-lg transition-all duration-200 ${
                currentView === option.value 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
              }`}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
