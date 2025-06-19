import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarView } from '@/types/calendar';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';

interface CalendarCompleteHeaderProps {
  currentView: CalendarView;
  onViewChange: (view: CalendarView) => void;
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onMobileMenuToggle: () => void;
}

export const CalendarCompleteHeader: React.FC<CalendarCompleteHeaderProps> = ({
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

  const renderDayHeader = () => {
    return (
      <div className="bg-gray-50/30 border-t border-gray-100">
        <div className="flex">
          <div className="w-20 sm:w-24 p-3 sm:p-4 text-xs font-medium text-gray-500 bg-gray-50/50 border-r border-gray-100 flex items-center justify-center">
            <span className="text-center leading-tight">Time</span>
          </div>
          <div className="flex-1 p-4 sm:p-6 text-center bg-white/50">
            <div className="text-lg sm:text-xl font-semibold text-gray-900">
              {currentDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderWeekHeader = () => {
    const weekStart = new Date(currentDate);
    weekStart.setDate(currentDate.getDate() - currentDate.getDay());
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      weekDays.push(day);
    }

    return (
      <div className="bg-gray-50/30 border-t border-gray-100">
        <div className="flex">
          <div className="w-20 sm:w-24 p-3 sm:p-4 text-xs font-medium text-gray-500 bg-gray-50/50 border-r border-gray-100 flex items-center justify-center">
            <span className="text-center leading-tight">Time</span>
          </div>
          {weekDays.map((day, index) => {
            const isToday = day.toDateString() === new Date().toDateString();
            const isSelected = day.toDateString() === currentDate.toDateString();
            
            return (
              <div 
                key={index} 
                className="flex-1 p-3 sm:p-4 cursor-pointer transition-all duration-200 flex flex-col items-center justify-center border-r border-gray-100 last:border-r-0 hover:bg-gray-50/50"
                onClick={() => {
                  const event = new CustomEvent('dateChange', { detail: day });
                  window.dispatchEvent(event);
                }}
              >
                <div className={`w-full flex flex-col items-center justify-center py-2 sm:py-3 px-2 sm:px-3 rounded-lg transition-all duration-200 ${
                  isSelected 
                    ? 'bg-gray-900 text-white shadow-md' 
                    : 'hover:bg-gray-100/50'
                }`}>
                  <span className={`text-xs font-semibold mb-1 tracking-wider ${
                    isSelected ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {day.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
                  </span>
                  <span className={`text-lg sm:text-xl font-bold ${
                    isToday && !isSelected ? 'text-blue-600' : ''
                  }`}>
                    {day.getDate()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMonthHeader = () => {
    return (
      <div className="bg-gray-50/30 border-t border-gray-100">
        <div className="grid grid-cols-7">
          {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
            <div key={day} className="p-3 sm:p-4 text-center text-xs sm:text-sm font-semibold text-gray-700 bg-gray-50/50 border-r border-gray-100 last:border-r-0">
              <span className="hidden sm:inline">{day}</span>
              <span className="sm:hidden">{day.slice(0, 3)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderBottomHeader = () => {
    switch (currentView) {
      case 'day':
        return renderDayHeader();
      case 'week':
        return renderWeekHeader();
      case 'month':
        return renderMonthHeader();
      case 'year':
        return null; // Year view doesn't need a header section
      default:
        return renderWeekHeader();
    }
  };

  return (
    <div className="sticky top-0 z-40 p-4">
      <Card className="shadow-lg border-gray-200 bg-white/95 backdrop-blur-sm">
        <CardContent className="p-0">
          {/* Top Navigation Section */}
          <div className="px-6 py-6">
            <div className="flex items-center justify-between">
              {/* Left Section - Date Display */}
              <div className="flex items-center gap-4">
                {/* Mobile menu button */}
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={onMobileMenuToggle}
                  className="lg:hidden text-gray-500 hover:text-gray-700 hover:bg-gray-50 h-10 w-10 p-0 rounded-lg"
                >
                  <Menu className="h-5 w-5" />
                </Button>

                {/* Date Display */}
                <h1 className="text-3xl font-medium text-gray-900 tracking-tight">
                  {getDateDisplay()}
                </h1>
              </div>

              {/* Center Section - View Toggle */}
              <div className="hidden md:flex items-center bg-gray-100 rounded-lg p-1">
                {viewOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewChange(option.value as CalendarView)}
                    className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      currentView === option.value 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>

              {/* Right Section - Navigation */}
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigateDate('prev')}
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 h-10 w-10 p-0 rounded-lg"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onDateChange(new Date())}
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 h-10 text-sm font-medium rounded-lg"
                >
                  Today
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigateDate('next')}
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 h-10 w-10 p-0 rounded-lg"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Mobile View Toggle - Only visible on smaller screens */}
            <div className="flex md:hidden mt-4 justify-center">
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                {viewOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewChange(option.value as CalendarView)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      currentView === option.value 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Calendar Days Header Section */}
          {renderBottomHeader()}
        </CardContent>
      </Card>
    </div>
  );
};
