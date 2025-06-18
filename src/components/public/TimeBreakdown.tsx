
import React from 'react';
import { CalendarEvent } from '@/types/calendar';

interface TimeBreakdownProps {
  events: CalendarEvent[];
}

export const TimeBreakdown: React.FC<TimeBreakdownProps> = ({ events }) => {
  const categories = [
    { id: 'meetings', name: 'Meetings', color: 'bg-teal-200', dotColor: 'bg-teal-400', hours: 8.5 },
    { id: 'workshop', name: 'Projects', color: 'bg-purple-200', dotColor: 'bg-purple-400', hours: 12.3 },
    { id: 'academic', name: 'Education', color: 'bg-orange-200', dotColor: 'bg-orange-400', hours: 4.2 },
    { id: 'events', name: 'Events', color: 'bg-green-200', dotColor: 'bg-green-400', hours: 6.1 },
    { id: 'conference', name: 'Reviews', color: 'bg-blue-200', dotColor: 'bg-blue-400', hours: 3.8 },
  ];

  const totalHours = categories.reduce((sum, cat) => sum + cat.hours, 0);

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-gray-900 text-lg">Time breakdown</h3>
        <button className="text-gray-400 text-sm hover:text-gray-600 transition-colors duration-200">▲</button>
      </div>
      <div className="space-y-5">
        {categories.map((category) => {
          const percentage = (category.hours / totalHours) * 100;
          
          return (
            <div key={category.id} className="flex items-center gap-4">
              <div className={`w-3 h-3 rounded-full ${category.dotColor}`} />
              <div className="flex-1">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-gray-700">{category.name}</span>
                  <span className="text-xs text-gray-500 font-medium">{category.hours}h</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${category.color} transition-all duration-300`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
