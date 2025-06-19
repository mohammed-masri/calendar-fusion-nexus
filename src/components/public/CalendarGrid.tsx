import React from 'react';
import { CalendarView, EventCategory, CalendarEvent } from '@/types/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { ParticipantAvatars } from './ParticipantAvatars';

interface CalendarGridProps {
  view: CalendarView;
  currentDate: Date;
  selectedCategory: EventCategory | 'all';
  events: CalendarEvent[];
  onEventSelect: (event: CalendarEvent) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  view,
  currentDate,
  selectedCategory,
  events,
  onEventSelect,
}) => {
  const filteredEvents = events.filter(event => {
    if (selectedCategory !== 'all' && event.category !== selectedCategory) return false;
    return event.isApproved;
  });

  const getCategoryColor = (category: EventCategory) => {
    const colors = {
      academic: 'bg-gradient-to-br from-orange-100 to-orange-200 border-orange-300 text-orange-800',
      'academic-calendar': 'bg-gradient-to-br from-teal-100 to-cyan-200 border-teal-300 text-teal-800',
      events: 'bg-gradient-to-br from-green-100 to-green-200 border-green-300 text-green-800', 
      meetings: 'bg-gradient-to-br from-blue-100 to-blue-200 border-blue-300 text-blue-800',
      'vip-visit': 'bg-gradient-to-br from-red-100 to-red-200 border-red-300 text-red-800',
      conference: 'bg-gradient-to-br from-purple-100 to-purple-200 border-purple-300 text-purple-800',
      workshop: 'bg-gradient-to-br from-indigo-100 to-indigo-200 border-indigo-300 text-indigo-800',
    };
    return colors[category] || 'bg-gradient-to-br from-gray-100 to-gray-200 border-gray-300 text-gray-800';
  };

  const isAllDayEvent = (event: CalendarEvent) => {
    const start = new Date(event.startTime);
    const end = new Date(event.endTime);
    const duration = end.getTime() - start.getTime();
    const hours = duration / (1000 * 60 * 60);
    return hours >= 23 || (start.getHours() === 0 && start.getMinutes() === 0 && end.getHours() === 23 && end.getMinutes() === 59);
  };

  const renderDayView = () => {
    const dayEvents = filteredEvents.filter(event => {
      const eventDate = new Date(event.startTime);
      return eventDate.toDateString() === currentDate.toDateString();
    });

    const allDayEvents = dayEvents.filter(isAllDayEvent);
    const timedEvents = dayEvents.filter(event => !isAllDayEvent(event));

    const timeSlots = [];
    for (let hour = 0; hour < 24; hour++) {
      timeSlots.push(hour);
    }

    return (
      <div className="flex-1 flex flex-col min-h-0">
        {/* All-day events section */}
        {allDayEvents.length > 0 && (
          <div className="flex border-b border-gray-200 bg-orange-50/30">
            <div className="w-20 sm:w-24 p-3 sm:p-4 text-xs font-semibold text-gray-600 bg-gray-50/50 border-r border-gray-200 flex items-center justify-center min-h-[60px] sm:min-h-[70px]">
              <span className="text-center leading-tight">All Day</span>
            </div>
            <div className="flex-1 p-2 space-y-2 min-h-[60px] sm:min-h-[70px] flex flex-col justify-center">
              {allDayEvents.map((event) => (
                <div
                  key={event.id}
                  className={`${getCategoryColor(event.category)} p-2 sm:p-3 rounded-lg cursor-pointer hover:shadow-lg transition-all duration-200 border hover:scale-[1.02] shadow-sm`}
                  onClick={() => onEventSelect(event)}
                >
                  <div className="font-semibold text-xs sm:text-sm leading-tight mb-1 truncate">{event.title}</div>
                  <div className="text-[10px] sm:text-xs opacity-75 mb-1">All Day Event</div>
                  {event.participants.length > 0 && (
                    <div className="mt-1">
                      <ParticipantAvatars 
                        participants={event.participants} 
                        maxVisible={3} 
                        size="xs" 
                        forceCount={true}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="flex flex-col">
            {timeSlots.map((hour) => {
              const hourEvents = timedEvents.filter(event => {
                const eventHour = new Date(event.startTime).getHours();
                return eventHour === hour;
              });

              return (
                <div key={hour} className="flex">
                  <div className="w-20 sm:w-24 p-3 sm:p-4 text-xs font-medium text-gray-500 border-b border-gray-50 bg-gray-50/30 border-r border-gray-200 h-16 sm:h-20 flex items-start justify-center pt-2">
                    <span className="text-xs text-center">
                      {hour.toString().padStart(2, '0')}:00
                    </span>
                  </div>
                  <div className="relative flex-1 border-r border-b border-gray-50 h-16 sm:h-20 hover:bg-gray-25 transition-colors duration-200">
                    {hourEvents.map((event, eventIndex) => (
                      <div
                        key={event.id}
                        className={`absolute inset-x-1 sm:inset-x-2 top-1 sm:top-2 ${getCategoryColor(event.category)} p-2 sm:p-3 rounded-lg cursor-pointer hover:shadow-lg transition-all duration-200 z-10 border hover:scale-[1.02] shadow-sm overflow-hidden`}
                        style={{ top: `${eventIndex * 4 + 4}px` }}
                        onClick={() => onEventSelect(event)}
                      >
                        <div className="font-semibold text-xs sm:text-sm leading-tight mb-1 truncate">{event.title}</div>
                        <div className="font-medium text-[10px] sm:text-xs leading-tight mb-1 opacity-75">
                          {event.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        {event.participants.length > 0 && (
                          <div className="mt-1 overflow-hidden">
                            <ParticipantAvatars 
                              participants={event.participants} 
                              maxVisible={3} 
                              size="xs" 
                              forceCount={true}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const weekStart = new Date(currentDate);
    weekStart.setDate(currentDate.getDate() - currentDate.getDay());
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      weekDays.push(day);
    }

    const timeSlots = [];
    for (let hour = 6; hour <= 23; hour++) {
      timeSlots.push(hour);
    }

    const weekAllDayEvents = weekDays.map(day => {
      const dayEvents = filteredEvents.filter(event => {
        const eventDate = new Date(event.startTime);
        return eventDate.toDateString() === day.toDateString();
      });
      return dayEvents.filter(isAllDayEvent);
    });

    const hasAllDayEvents = weekAllDayEvents.some(dayEvents => dayEvents.length > 0);

    return (
      <div className="flex-1 flex flex-col min-h-0">
        {/* All-day events section for week view */}
        {hasAllDayEvents && (
          <div className="flex border-b border-gray-200 bg-orange-50/30">
            <div className="w-20 sm:w-24 p-3 sm:p-4 text-xs font-semibold text-gray-600 bg-gray-50/50 border-r border-gray-200 flex items-center justify-center min-h-[60px] sm:min-h-[80px]">
              <span className="text-center leading-tight">All Day</span>
            </div>
            {weekAllDayEvents.map((dayEvents, dayIndex) => (
              <div key={dayIndex} className="flex-1 p-1 sm:p-2 space-y-1 sm:space-y-2 min-h-[60px] sm:min-h-[80px] border-r border-gray-200 last:border-r-0 flex flex-col justify-center">
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`${getCategoryColor(event.category)} p-2 sm:p-3 rounded-lg cursor-pointer hover:shadow-lg transition-all duration-200 border text-xs w-full`}
                    onClick={() => onEventSelect(event)}
                  >
                    <div className="font-semibold truncate w-full mb-1">{event.title}</div>
                    <div className="text-xs opacity-75">All Day</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Time Grid with Events */}
        <div className="flex-1 overflow-auto min-h-0">
          <div className="flex flex-col">
            {timeSlots.map((hour) => (
              <div key={hour} className="flex">
                {/* Time Column */}
                <div className="w-20 sm:w-24 p-3 sm:p-4 text-sm font-medium text-gray-600 border-b border-gray-100 border-r border-gray-200 h-20 sm:h-24 flex items-start justify-center pt-2 bg-gray-50/50">
                  <span className="text-gray-500 text-xs sm:text-sm text-center">
                    {hour.toString().padStart(2, '0')}:00
                  </span>
                </div>
                
                {/* Day Columns */}
                {weekDays.map((day, dayIndex) => {
                  const dayEvents = filteredEvents.filter(event => {
                    const eventDate = new Date(event.startTime);
                    return eventDate.toDateString() === day.toDateString() &&
                           eventDate.getHours() === hour &&
                           !isAllDayEvent(event);
                  });

                  return (
                    <div key={dayIndex} className="relative flex-1 border-b border-gray-100 border-r border-gray-200 last:border-r-0 h-20 sm:h-24 hover:bg-gray-25 transition-colors duration-200">
                      {dayEvents.map((event, eventIndex) => {
                        const duration = (event.endTime.getTime() - event.startTime.getTime()) / (1000 * 60 * 60);
                        const heightPx = Math.max(duration * 80, 40);
                        
                        return (
                          <div
                            key={event.id}
                            className={`absolute inset-x-1 sm:inset-x-2 top-1 sm:top-2 ${getCategoryColor(event.category)} p-1 sm:p-3 rounded-lg cursor-pointer hover:shadow-lg transition-all duration-200 z-10 border hover:scale-[1.02] shadow-sm overflow-hidden`}
                            style={{
                              height: `${heightPx}px`,
                              top: `${eventIndex * 4 + 4}px`
                            }}
                            onClick={() => onEventSelect(event)}
                          >
                            <div className="font-semibold text-xs sm:text-sm leading-tight mb-1 truncate">{event.title}</div>
                            <div className="font-medium text-xs leading-tight mb-1 sm:mb-2 opacity-75">
                              {event.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {event.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            {event.participants.length > 0 && heightPx > 50 && (
                              <div className="mt-auto">
                                <ParticipantAvatars 
                                  participants={event.participants} 
                                  maxVisible={2} 
                                  size="xs" 
                                  forceCount={true}
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderMonthView = () => {
    const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startCalendar = new Date(monthStart);
    startCalendar.setDate(startCalendar.getDate() - startCalendar.getDay());
    
    const weeks = [];
    const currentWeek = new Date(startCalendar);
    
    for (let week = 0; week < 6; week++) {
      const days = [];
      for (let day = 0; day < 7; day++) {
        const date = new Date(currentWeek);
        const dayEvents = filteredEvents.filter(event => {
          const eventDate = new Date(event.startTime);
          return eventDate.toDateString() === date.toDateString();
        });
        
        days.push({ date: new Date(date), events: dayEvents });
        currentWeek.setDate(currentWeek.getDate() + 1);
      }
      weeks.push(days);
    }

    return (
      <div className="flex-1 overflow-auto min-h-0">
        <div className="grid grid-rows-6 min-h-full">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7">
              {week.map((day, dayIndex) => {
                const isCurrentMonth = day.date.getMonth() === currentDate.getMonth();
                const isToday = day.date.toDateString() === new Date().toDateString();
                const isSelected = day.date.toDateString() === currentDate.toDateString();
                
                return (
                  <div
                    key={dayIndex}
                    className={`min-h-[80px] sm:min-h-[120px] p-1 sm:p-3 border-r border-b border-gray-50 last:border-r-0 ${
                      isCurrentMonth ? 'bg-white' : 'bg-gray-50/30'
                    } ${isSelected ? 'bg-blue-50' : ''} hover:bg-gray-25 transition-colors duration-200 overflow-hidden`}
                  >
                    <div className={`text-xs sm:text-sm font-semibold mb-1 sm:mb-3 ${
                      isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                    } ${isToday ? 'text-blue-600' : ''}`}>
                      {day.date.getDate()}
                    </div>
                    
                    <div className="space-y-1">
                      {day.events.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className={`text-[10px] sm:text-xs p-1 sm:p-2 rounded-lg cursor-pointer hover:shadow-md transition-all duration-200 border ${getCategoryColor(event.category)} shadow-sm overflow-hidden`}
                          onClick={() => onEventSelect(event)}
                        >
                          <div className="font-semibold truncate mb-1">{event.title}</div>
                          <div className="opacity-75 text-[9px] sm:text-xs mb-1">
                            {isAllDayEvent(event) ? 'All Day' : event.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                          {event.participants.length > 0 && (
                            <div className="mt-1 overflow-hidden">
                              <ParticipantAvatars 
                                participants={event.participants} 
                                maxVisible={2} 
                                size="xs" 
                                forceCount={true}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                      {day.events.length > 2 && (
                        <div className="text-[10px] sm:text-xs text-gray-500 font-medium px-1 sm:px-2">
                          +{day.events.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderYearView = () => {
    const months = [];
    for (let month = 0; month < 12; month++) {
      months.push(new Date(currentDate.getFullYear(), month, 1));
    }

    return (
      <div className="flex-1 p-4 sm:p-8 overflow-auto min-h-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {months.map((month, index) => {
            const monthEvents = filteredEvents.filter(event => {
              const eventDate = new Date(event.startTime);
              return eventDate.getFullYear() === month.getFullYear() && 
                     eventDate.getMonth() === month.getMonth();
            });

            return (
              <div key={index} className="border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all duration-200 bg-white">
                <h3 className="font-bold text-center mb-3 sm:mb-4 text-gray-900 text-base sm:text-lg">
                  {month.toLocaleDateString('en-US', { month: 'long' })}
                </h3>
                <div className="text-center text-sm text-gray-600 mb-3 sm:mb-4 font-medium">
                  {monthEvents.length} event{monthEvents.length !== 1 ? 's' : ''}
                </div>
                {monthEvents.length > 0 && (
                  <div className="space-y-2">
                    {monthEvents.slice(0, 3).map((event) => (
                      <div
                        key={event.id}
                        className={`text-xs p-2 sm:p-3 rounded-lg cursor-pointer hover:shadow-md transition-all duration-200 border ${getCategoryColor(event.category)} shadow-sm overflow-hidden`}
                        onClick={() => onEventSelect(event)}
                      >
                        <div className="font-semibold truncate mb-1">{event.title}</div>
                        {event.participants.length > 0 && (
                          <div className="mt-2 overflow-hidden">
                            <ParticipantAvatars 
                              participants={event.participants} 
                              maxVisible={1} 
                              size="xs" 
                              forceCount={true}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                    {monthEvents.length > 3 && (
                      <div className="text-xs text-gray-500 font-medium text-center">
                        +{monthEvents.length - 3} more
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderView = () => {
    switch (view) {
      case 'day':
        return renderDayView();
      case 'week':
        return renderWeekView();
      case 'month':
        return renderMonthView();
      case 'year':
        return renderYearView();
      default:
        return renderWeekView();
    }
  };

  return (
    <Card className="shadow-lg flex-1 flex flex-col min-h-0 border-gray-200 bg-white/95 backdrop-blur-sm">
      <CardContent className="flex-1 flex flex-col min-h-0 p-0">
        {renderView()}
      </CardContent>
    </Card>
  );
};
