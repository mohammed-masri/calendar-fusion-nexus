
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Participant {
  name: string;
  imageUrl?: string;
}

interface ParticipantAvatarsProps {
  participants: (string | Participant)[];
  maxVisible?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  compact?: boolean;
  showCount?: boolean;
  forceCount?: boolean;
  availableSpace?: 'minimal' | 'normal' | 'spacious';
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
};

const getParticipantName = (participant: string | Participant): string => {
  return typeof participant === 'string' ? participant : participant.name;
};

const getParticipantImageUrl = (participant: string | Participant): string | undefined => {
  return typeof participant === 'string' ? undefined : participant.imageUrl;
};

// Generate a consistent color based on the name
const getAvatarColor = (name: string): string => {
  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
    'bg-orange-500',
    'bg-cyan-500',
    'bg-emerald-500',
    'bg-violet-500'
  ];
  
  // Create a simple hash from the name to ensure consistency
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
};

const getSizeClasses = (size: string, compact: boolean = false) => {
  const baseSize = compact ? 'xs' : size;
  
  switch (baseSize) {
    case 'xs':
      return {
        avatar: 'h-5 w-5',
        text: 'text-[8px]',
        spacing: 'space-x-0.5',
        overflow: 'h-5 w-5 text-[8px]'
      };
    case 'sm':
      return {
        avatar: 'h-6 w-6',
        text: 'text-[9px]',
        spacing: 'space-x-1',
        overflow: 'h-6 w-6 text-[9px]'
      };
    case 'md':
      return {
        avatar: 'h-7 w-7',
        text: 'text-xs',
        spacing: 'space-x-1',
        overflow: 'h-7 w-7 text-xs'
      };
    case 'lg':
      return {
        avatar: 'h-8 w-8',
        text: 'text-sm',
        spacing: 'space-x-1.5',
        overflow: 'h-8 w-8 text-sm'
      };
    default:
      return {
        avatar: 'h-6 w-6',
        text: 'text-[9px]',
        spacing: 'space-x-1',
        overflow: 'h-6 w-6 text-[9px]'
      };
  }
};

export const ParticipantAvatars: React.FC<ParticipantAvatarsProps> = ({ 
  participants, 
  maxVisible = 3,
  size = 'sm',
  compact = false,
  showCount = false,
  forceCount = false,
  availableSpace = 'normal'
}) => {
  // If no participants, don't render anything
  if (participants.length === 0) return null;

  // Determine if we should show count only based on space and conditions
  const shouldShowCountOnly = forceCount || 
    showCount || 
    (compact && participants.length > 2) ||
    (availableSpace === 'minimal' && participants.length > 1) ||
    (availableSpace === 'normal' && participants.length > 3);

  // If showing count only
  if (shouldShowCountOnly) {
    return (
      <div className="text-xs text-gray-600 font-medium">
        {participants.length} participant{participants.length !== 1 ? 's' : ''}
      </div>
    );
  }

  const visibleParticipants = participants.slice(0, maxVisible);
  const remainingCount = participants.length - maxVisible;
  const sizeClasses = getSizeClasses(size, compact);

  return (
    <div className={`flex ${sizeClasses.spacing} items-center overflow-hidden`}>
      {visibleParticipants.map((participant, index) => {
        const name = getParticipantName(participant);
        const imageUrl = getParticipantImageUrl(participant);
        const initials = getInitials(name);
        const avatarColor = getAvatarColor(name);
        
        return (
          <div key={index} className="relative group shrink-0">
            <Avatar className={`${sizeClasses.avatar} border-2 border-white shadow-sm`}>
              {imageUrl && (
                <AvatarImage 
                  src={imageUrl} 
                  alt={name}
                  onError={(e) => {
                    // Hide the image element on error so fallback shows
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
              <AvatarFallback className={`${sizeClasses.text} text-white font-bold ${avatarColor} flex items-center justify-center`}>
                {initials}
              </AvatarFallback>
            </Avatar>
            {!compact && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20 pointer-events-none">
                {name}
              </div>
            )}
          </div>
        );
      })}
      {remainingCount > 0 && (
        <div className={`${sizeClasses.overflow} rounded-full bg-gray-300 border-2 border-white shadow-sm flex items-center justify-center shrink-0`}>
          <span className="text-gray-700 font-bold text-xs">+{remainingCount}</span>
        </div>
      )}
    </div>
  );
};
