
import React, { useState } from 'react';
import { EventCategory } from '@/types/calendar';
import { Calendar, Users, BookOpen, Star, Video, Briefcase, GraduationCap, ChevronDown } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { Checkbox } from '@/components/ui/checkbox';

interface CategoryFilterProps {
  selectedCategories: (EventCategory | 'all')[];
  onCategoryChange: (categories: (EventCategory | 'all')[]) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategories,
  onCategoryChange,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const categories = [
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
      id: 'academic-calendar' as const, 
      name: 'Calendar', 
      icon: GraduationCap,
    },
    { 
      id: 'conference' as const, 
      name: 'Conference', 
      icon: Video,
    },
  ];

  const isAllSelected = selectedCategories.includes('all') || selectedCategories.length === categories.length;
  const hasSelections = selectedCategories.length > 0 && !selectedCategories.includes('all');

  const handleAllChange = (checked: boolean) => {
    if (checked) {
      onCategoryChange(['all']);
    } else {
      onCategoryChange([]);
    }
  };

  const handleCategoryChange = (categoryId: EventCategory, checked: boolean) => {
    let newSelection = selectedCategories.filter(cat => cat !== 'all');
    
    if (checked) {
      newSelection = [...newSelection, categoryId];
    } else {
      newSelection = newSelection.filter(cat => cat !== categoryId);
    }

    // If all categories are selected, switch to 'all'
    if (newSelection.length === categories.length) {
      onCategoryChange(['all']);
    } else if (newSelection.length === 0) {
      onCategoryChange(['all']);
    } else {
      onCategoryChange(newSelection);
    }
  };

  const clearAll = () => {
    onCategoryChange(['all']);
  };

  return (
    <Card className="shadow-sm">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-medium text-gray-900 hover:text-gray-700 transition-colors tracking-tight">
              <span>Filter by Category</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            {hasSelections && (
              <button
                onClick={clearAll}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors ml-2"
              >
                Clear
              </button>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-0 pb-4">
          <CollapsibleContent className="space-y-2">
            {/* All checkbox */}
            <div className="flex items-center space-x-3 py-0.5">
              <Checkbox 
                id="all"
                checked={isAllSelected}
                onCheckedChange={handleAllChange}
              />
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <label htmlFor="all" className="text-sm font-medium text-gray-700 cursor-pointer">
                  All Categories
                </label>
              </div>
            </div>

            {/* Individual category checkboxes */}
            <div className="space-y-1 pl-2 border-l border-gray-100">
              {categories.map((category) => {
                const isChecked = selectedCategories.includes(category.id) || isAllSelected;
                const Icon = category.icon;
                
                return (
                  <div key={category.id} className="flex items-center space-x-3 py-0.5">
                    <Checkbox 
                      id={category.id}
                      checked={isChecked}
                      onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                      disabled={isAllSelected}
                    />
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-gray-500" />
                      <label 
                        htmlFor={category.id} 
                        className={`text-sm cursor-pointer transition-colors ${
                          isAllSelected ? 'text-gray-400' : 'text-gray-600 hover:text-gray-800'
                        }`}
                      >
                        {category.name}
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          </CollapsibleContent>
        </CardContent>
      </Collapsible>
    </Card>
  );
};
