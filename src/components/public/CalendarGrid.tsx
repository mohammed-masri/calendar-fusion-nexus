
import React from 'react';
import { CalendarView, EventCategory, CalendarEvent } from '@/types/calendar';
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

  // Add debugging
  console.log('Filtered events:', filteredEvents);
  console.log('Current date:', currentDate);
  console.log('Selected category:', selectedCategory);

  const getCategoryColor = (category: EventCategory) => {
    const colors = {
      academic: 'bg-gradient-to-br from-orange-100 to-orange-200 border-orange-300 text-orange-800',
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

    console.log('Day events for', currentDate.toDateString(), ':', dayEvents);

    const allDayEvents = dayEvents.filter(isAllDayEvent);
    const timedEvents = dayEvents.filter(event => !isAllDayEvent(event));

    const timeSlots = [];
    for (let hour = 0; hour < 24; hour++) {
      timeSlots.push(hour);
    }

    return (
      <div className="bg-white flex-1 overflow-hidden">
        <div className="grid grid-cols-[60px_1fr] sm:grid-cols-[100px_1fr] border-b border-gray-100">
          <div className="p-2 sm:p-4 text-xs font-medium text-gray-500 bg-gray-50/50 border-r border-gray-100 text-center">
            Time
          </div>
          <div className="p-2 sm:p-4 text-center border-r border-gray-100">
            <div className="text-sm sm:text-lg font-semibold text-gray-900">
              {currentDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>

        {/* All-day events section */}
        {allDayEvents.length > 0 && (
          <div className="grid grid-cols-[60px_1fr] sm:grid-cols-[100px_1fr] border-b border-gray-200">
            <div className="p-2 sm:p-4 text-xs font-medium text-gray-500 bg-orange-50/50 border-r border-gray-100 text-center">
              All Day
            </div>
            <div className="p-2 space-y-2">
              {allDayEvents.map((event) => (
                <div
                  key={event.id}
                  className={`${getCategoryColor(event.category)} p-2 sm:p-3 rounded-lg cursor-pointer hover:shadow-lg transition-all duration-200 border hover:scale-[1.02] shadow-sm`}
                  onClick={() => onEventSelect(event)}
                >
                  <div className="font-semibold text-xs sm:text-sm leading-tight mb-1">{event.title}</div>
                  <div className="text-[10px] sm:text-xs opacity-75 mb-1">All Day Event</div>
                  {event.participants.length > 0 && (
                    <div className="mt-1">
                      <ParticipantAvatars 
                        participants={event.participants} 
                        maxVisible={3} 
                        size="xs" 
                        forceCount={window.innerWidth < 640}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="overflow-y-auto h-[calc(100vh-200px)]">
          <div className="grid grid-cols-[60px_1fr] sm:grid-cols-[100px_1fr]">
            {timeSlots.map((hour) => {
              const hourEvents = timedEvents.filter(event => {
                const eventHour = new Date(event.startTime).getHours();
                return eventHour === hour;
              });

              return (
                <React.Fragment key={hour}>
                  <div className="p-2 sm:p-4 text-xs font-medium text-gray-500 border-b border-gray-50 bg-gray-50/30 border-r border-gray-100 h-16 sm:h-20 flex items-start justify-center pt-2">
                    <span className="text-xs">
                      {hour.toString().padStart(2, '0')}:00
                    </span>
                  </div>
                  <div className="relative border-r border-b border-gray-50 h-16 sm:h-20 hover:bg-gray-25 transition-colors duration-200">
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
                              forceCount={window.innerWidth < 640}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </React.Fragment>
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

    console.log('Week days:', weekDays.map(d => d.toDateString()));

    const timeSlots = [];
    for (let hour = 6; hour <= 23; hour++) {
      timeSlots.push(hour);
    }

    // Get all-day events for the week
    const weekAllDayEvents = weekDays.map(day => {
      const dayEvents = filteredEvents.filter(event => {
        const eventDate = new Date(event.startTime);
        return eventDate.toDateString() === day.toDateString();
      });
      const allDayEventsForDay = dayEvents.filter(isAllDayEvent);
      console.log(`All-day events for ${day.toDateString()}:`, allDayEventsForDay);
      return allDayEventsForDay;
    });

    console.log('Week all-day events mapping:', weekAllDayEvents);

    const hasAllDayEvents = weekAllDayEvents.some(dayEvents => dayEvents.length > 0);

    return (
      <div className="bg-white flex-1 overflow-hidden">
        {/* Enhanced Day Headers */}
        <div className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-gray-200 bg-white">
          <div className="p-4"></div>
          {weekDays.map((day, index) => {
            const isToday = day.toDateString() === new Date().toDateString();
            const isSelected = day.toDateString() === currentDate.toDateString();
            return (
              <div 
                key={index} 
                className="p-4 cursor-pointer transition-all duration-200 flex flex-col items-center justify-center"
                onClick={() => {
                  const event = new CustomEvent('dateChange', { detail: day });
                  window.dispatchEvent(event);
                }}
              >
                <div className={`w-full flex flex-col items-center justify-center py-3 px-2 rounded-lg transition-all duration-200 ${
                  isSelected 
                    ? 'bg-gray-900 text-white shadow-lg' 
                    : 'hover:bg-gray-50'
                }`}>
                  <span className={`text-xs font-semibold mb-2 tracking-wider ${
                    isSelected ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {day.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
                  </span>
                  <span className={`text-2xl font-bold ${
                    isToday && !isSelected ? 'text-blue-600' : ''
                  }`}>
                    {day.getDate()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* All-day events section for week view */}
        {hasAllDayEvents && (
          <div className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-gray-200 bg-gray-50/30">
            <div className="p-4 text-xs font-semibold text-gray-600 flex items-center justify-center">
              All Day
            </div>
            {weekAllDayEvents.map((dayEvents, dayIndex) => (
              <div key={dayIndex} className="p-2 space-y-2 min-h-[80px] border-r border-gray-100 last:border-r-0">
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`${getCategoryColor(event.category)} p-3 rounded-lg cursor-pointer hover:shadow-lg transition-all duration-200 border text-xs w-full`}
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
        <div className="overflow-auto h-[calc(100vh-300px)]">
          <div className="grid grid-cols-[80px_repeat(7,1fr)]">
            {timeSlots.map((hour) => (
              <React.Fragment key={hour}>
                {/* Time Column */}
                <div className="p-4 text-sm font-medium text-gray-600 border-b border-gray-100 border-r border-gray-200 h-24 flex items-start justify-center pt-2 bg-gray-50/50">
                  <span className="text-gray-500">
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
                    <div key={dayIndex} className="relative border-b border-gray-100 border-r border-gray-200 last:border-r-0 h-24 hover:bg-gray-25 transition-colors duration-200">
                      {dayEvents.map((event, eventIndex) => {
                        const duration = (event.endTime.getTime() - event.startTime.getTime()) / (1000 * 60 * 60);
                        const heightPx = Math.max(duration * 96, 60); // 96px per hour (h-24)
                        
                        return (
                          <div
                            key={event.id}
                            className={`absolute inset-x-2 top-2 ${getCategoryColor(event.category)} p-3 rounded-lg cursor-pointer hover:shadow-lg transition-all duration-200 z-10 border hover:scale-[1.02] shadow-sm overflow-hidden`}
                            style={{
                              height: `${heightPx}px`,
                              top: `${eventIndex * 4 + 8}px`
                            }}
                            onClick={() => onEventSelect(event)}
                          >
                            <div className="font-semibold text-sm leading-tight mb-1 truncate">{event.title}</div>
                            <div className="font-medium text-xs leading-tight mb-2 opacity-75">
                              {event.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {event.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            {event.participants.length > 0 && (
                              <div className="mt-auto">
                                <ParticipantAvatars 
                                  participants={event.participants} 
                                  maxVisible={3} 
                                  size="xs" 
                                  forceCount={heightPx < 80}
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </React.Fragment>
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
      <div className="bg-white flex-1 overflow-hidden">
        <div className="grid grid-cols-7 border-b border-gray-100">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="p-2 sm:p-4 text-center text-sm font-semibold text-gray-600 bg-gray-50/50 border-r border-gray-100">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-rows-6 h-[calc(100vh-250px)]">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7">
              {week.map((day, dayIndex) => {
                const isCurrentMonth = day.date.getMonth() === currentDate.getMonth();
                const isToday = day.date.toDateString() === new Date().toDateString();
                const isSelected = day.date.toDateString() === currentDate.toDateString();
                
                return (
                  <div
                    key={dayIndex}
                    className={`min-h-[100px] sm:min-h-[140px] p-2 sm:p-3 border-r border-b border-gray-50 ${
                      isCurrentMonth ? 'bg-white' : 'bg-gray-50/30'
                    } ${isSelected ? 'bg-blue-50' : ''} hover:bg-gray-25 transition-colors duration-200 overflow-hidden`}
                  >
                    <div className={`text-sm font-semibold mb-2 sm:mb-3 ${
                      isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                    } ${isToday ? 'text-blue-600' : ''}`}>
                      {day.date.getDate()}
                    </div>
                    
                    <div className="space-y-1">
                      {day.events.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className={`text-xs p-1.5 sm:p-2 rounded-lg cursor-pointer hover:shadow-md transition-all duration-200 border ${getCategoryColor(event.category)} shadow-sm overflow-hidden`}
                          onClick={() => onEventSelect(event)}
                        >
                          <div className="font-semibold truncate mb-1">{event.title}</div>
                          <div className="opacity-75 text-[10px] sm:text-xs mb-1">
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
                        <div className="text-xs text-gray-500 font-medium px-2">
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
      <div className="bg-white flex-1 p-4 sm:p-8 overflow-auto h-[calc(100vh-200px)]">
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
    <div className="flex-1 bg-gray-50/30 flex flex-col overflow-hidden">
      {renderView()}
    </div>
  );
};
