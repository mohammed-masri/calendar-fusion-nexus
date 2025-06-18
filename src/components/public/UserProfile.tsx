
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const UserProfile = () => {
  const userName = "Samuel Crawford";
  const userRole = "Interface designer";
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100">
      <Avatar className="h-14 w-14 ring-2 ring-gray-100">
        <AvatarImage src="/lovable-uploads/080751f3-c44d-4063-b190-d696889504ac.png" alt={userName} />
        <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold text-lg">
          {getInitials(userName)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 text-lg">{userName}</h3>
        <p className="text-sm text-gray-500">{userRole}</p>
      </div>
      <button className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center text-white text-lg font-light hover:bg-gray-800 transition-all duration-200 shadow-sm">
        +
      </button>
    </div>
  );
};
