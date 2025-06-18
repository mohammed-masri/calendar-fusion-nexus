
import React from 'react';
import { EventCategory } from '@/types/calendar';
import { Calendar, Users, BookOpen, Star, Video, Briefcase, X } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: EventCategory | 'all';
  onCategoryChange: (category: EventCategory | 'all') => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const categories = [
    { 
      id: 'all' as const, 
      name: 'All Events', 
      icon: Calendar,
    },
    { 
      id: 'meetings' as const, 
      name: 'Meetings', 
      icon: Users,
    },
    { 
      id: 'workshop' as const, 
      name: 'Workshops', 
      icon: BookOpen,
    },
    { 
      id: 'events' as const, 
      name: 'Events', 
      icon: Star,
    },
    { 
      id: 'academic' as const, 
      name: 'Academic', 
      icon: BookOpen,
    },
    { 
      id: 'conference' as const, 
      name: 'Conference', 
      icon: Video,
    },
  ];

  const activeCount = selectedCategory === 'all' ? 0 : 1;

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg tracking-tight">Filters</h3>
          <p className="text-sm text-gray-500 mt-1">Filter events by category</p>
        </div>
        {activeCount > 0 && (
          <button
            onClick={() => onCategoryChange('all')}
            className="flex items-center gap-1.5 text-xs text-white bg-red-500 hover:bg-red-600 transition-colors px-3 py-1.5 rounded-lg font-medium shadow-sm hover:shadow-md"
          >
            <X className="h-3 w-3" />
            Clear
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {categories.map((category) => {
          const isActive = selectedCategory === category.id;
          const Icon = category.icon;
          
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`group flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-md ${
                isActive 
                  ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
              }`}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span className="whitespace-nowrap">{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
