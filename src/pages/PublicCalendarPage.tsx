
import React, { useState, useEffect } from 'react';
import { CalendarCompleteHeader } from '@/components/public/CalendarCompleteHeader';
import { CalendarGrid } from '@/components/public/CalendarGrid';
import { CalendarSidebar } from '@/components/public/CalendarSidebar';
import { MobileCalendarSidebar } from '@/components/public/MobileCalendarSidebar';
import { EventDetails } from '@/components/public/EventDetails';
import { CalendarView, EventCategory, CalendarEvent } from '@/types/calendar';

const PublicCalendarPage = () => {
  const [currentView, setCurrentView] = useState<CalendarView>('week');
  const [selectedCategories, setSelectedCategories] = useState<(EventCategory | 'all')[]>(['all']);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Listen for date change events from the calendar grid
  useEffect(() => {
    const handleDateChange = (event: CustomEvent<Date>) => {
      setCurrentDate(event.detail);
    };

    window.addEventListener('dateChange', handleDateChange as EventListener);
    return () => {
      window.removeEventListener('dateChange', handleDateChange as EventListener);
    };
  }, []);

  // Convert selectedCategories array to single category for CalendarGrid compatibility
  const selectedCategory = selectedCategories.includes('all') ? 'all' : selectedCategories[0] || 'all';

  // Enhanced mock events with photos and better descriptions
  const mockEvents: CalendarEvent[] = [
    {
      id: '1',
      title: 'Morning Standup',
      description: 'Daily team sync and planning session where we discuss progress, blockers, and upcoming tasks. This is a crucial part of our agile development process that helps maintain team alignment and project momentum.',
      startTime: new Date(new Date().setHours(9, 0, 0, 0)),
      endTime: new Date(new Date().setHours(9, 30, 0, 0)),
      category: 'meetings',
      status: 'approved',
      organizer: 'Sarah Johnson',
      participants: [
        { name: 'John Doe', imageUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=face' },
        { name: 'Jane Smith' },
        { name: 'Mike Wilson', imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=face' }
      ],
      photos: ['https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop'],
      outlookCalendarId: '1',
      location: 'Conference Room A',
      isApproved: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      title: 'Product Design Workshop',
      description: 'Collaborative design session for new features. We will be working on user interface improvements, conducting usability testing, and defining the product roadmap for the next quarter. Bring your creative ideas and be ready to collaborate!',
      startTime: new Date(new Date().setHours(11, 0, 0, 0)),
      endTime: new Date(new Date().setHours(12, 30, 0, 0)),
      category: 'workshop',
      status: 'approved',
      organizer: 'Design Team',
      participants: [
        'Alice Cooper',
        { name: 'Bob Ross', imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=100&h=100&fit=crop&crop=face' },
        'Charlie Brown',
        { name: 'Diana Prince', imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=100&h=100&fit=crop&crop=face' }
      ],
      photos: [
        'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop'
      ],
      outlookCalendarId: '2',
      location: 'Design Studio',
      isApproved: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      title: 'Client Presentation',
      description: 'Quarterly business review with key client. We will present our achievements, discuss upcoming milestones, and gather feedback for future improvements.',
      startTime: new Date(new Date().setHours(14, 0, 0, 0)),
      endTime: new Date(new Date().setHours(15, 0, 0, 0)),
      category: 'meetings',
      status: 'approved',
      organizer: 'Sales Team',
      participants: ['Emma Watson', 'Tom Hardy', 'Rachel Green'],
      photos: [],
      outlookCalendarId: '3',
      location: 'Board Room',
      isApproved: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '4',
      title: 'Tech Conference Keynote',
      description: 'Industry insights and future trends presentation. Join us for an exciting exploration of emerging technologies, industry best practices, and future innovations that will shape our field.',
      startTime: new Date(new Date().setHours(16, 30, 0, 0)),
      endTime: new Date(new Date().setHours(18, 0, 0, 0)),
      category: 'conference',
      status: 'approved',
      organizer: 'Tech Community',
      participants: ['Alex Turner', 'Sam Wilson', 'Maya Patel', 'James Bond', 'Lisa Simpson'],
      photos: ['https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop'],
      outlookCalendarId: '4',
      location: 'Virtual Event',
      isApproved: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '5',
      title: 'Academic Seminar',
      description: 'Research presentation on AI advancements and their impact on modern technology. This seminar will cover cutting-edge research findings and their practical applications.',
      startTime: new Date(new Date().setHours(10, 0, 0, 0)),
      endTime: new Date(new Date().setHours(11, 30, 0, 0)),
      category: 'academic',
      status: 'approved',
      organizer: 'University',
      participants: ['Dr. Smith', 'Prof. Johnson'],
      photos: [],
      outlookCalendarId: '5',
      location: 'Lecture Hall B',
      isApproved: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '6',
      title: 'Team Building Event',
      description: 'Fun activities and team bonding session designed to strengthen our team relationships and improve collaboration. Activities include games, challenges, and networking opportunities.',
      startTime: new Date(new Date().setHours(19, 0, 0, 0)),
      endTime: new Date(new Date().setHours(21, 0, 0, 0)),
      category: 'events',
      status: 'approved',
      organizer: 'HR Team',
      participants: ['All Team Members'],
      photos: ['https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop'],
      outlookCalendarId: '6',
      location: 'Recreation Center',
      isApproved: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // Updated category for Summer Term A
    {
      id: '7',
      title: 'Summer Term A Ends',
      description: 'Official end date for Summer Term A. Final grades submission deadline and completion of all academic requirements for the term.',
      startTime: new Date(new Date(new Date().setDate(new Date().getDate() + ((4 - new Date().getDay() + 7) % 7))).setHours(0, 0, 0, 0)),
      endTime: new Date(new Date(new Date().setDate(new Date().getDate() + ((4 - new Date().getDay() + 7) % 7))).setHours(23, 59, 59, 999)),
      category: 'academic-calendar',
      status: 'approved',
      organizer: 'Academic Affairs',
      participants: ['All Students', 'Faculty Members'],
      photos: ['https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=400&h=300&fit=crop'],
      outlookCalendarId: '7',
      location: 'University Campus',
      isApproved: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '8',
      title: 'Sharjah Social Services - Sharjah Voluntary Awards',
      description: 'Recognition ceremony for outstanding volunteers and social service contributors in Sharjah. This event celebrates community engagement and voluntary work achievements.',
      startTime: new Date(new Date(new Date().setDate(new Date().getDate() + ((4 - new Date().getDay() + 7) % 7))).setHours(10, 0, 0, 0)),
      endTime: new Date(new Date(new Date().setDate(new Date().getDate() + ((4 - new Date().getDay() + 7) % 7))).setHours(12, 0, 0, 0)),
      category: 'events',
      status: 'approved',
      organizer: 'Sharjah Social Services',
      participants: [
        { name: 'Ahmed Al-Mansouri', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
        { name: 'Fatima Al-Zahra', imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b742?w=100&h=100&fit=crop&crop=face' },
        'Mohammad Hassan',
        'Aisha Abdullah'
      ],
      photos: ['https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop'],
      outlookCalendarId: '8',
      location: 'Innovation Hall',
      isApproved: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '9',
      title: 'لجنة تنفيذية ملتقى معلمي العربية',
      description: 'Executive committee meeting for Arabic Teachers Forum. Planning and coordination session for upcoming Arabic language education initiatives and programs.',
      startTime: new Date(new Date(new Date().setDate(new Date().getDate() + ((4 - new Date().getDay() + 7) % 7))).setHours(14, 0, 0, 0)),
      endTime: new Date(new Date(new Date().setDate(new Date().getDate() + ((4 - new Date().getDay() + 7) % 7))).setHours(16, 0, 0, 0)),
      category: 'academic',
      status: 'approved',
      organizer: 'Arabic Education Department',
      participants: [
        { name: 'Dr. Khalid Al-Ahmad', imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' },
        { name: 'Prof. Maryam Al-Said' },
        'Yusuf Al-Rashid',
        'Nour Al-Din'
      ],
      photos: ['https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=400&h=300&fit=crop'],
      outlookCalendarId: '9',
      location: 'Classroom 04',
      isApproved: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '10',
      title: 'Faculty Development Workshop',
      description: 'Professional development session focusing on innovative teaching methodologies and digital learning tools for faculty members.',
      startTime: new Date(new Date(new Date().setDate(new Date().getDate() + ((4 - new Date().getDay() + 7) % 7))).setHours(9, 0, 0, 0)),
      endTime: new Date(new Date(new Date().setDate(new Date().getDate() + ((4 - new Date().getDay() + 7) % 7))).setHours(10, 30, 0, 0)),
      category: 'workshop',
      status: 'approved',
      organizer: 'Faculty Development Center',
      participants: [
        'Dr. Sarah Mitchell',
        { name: 'Prof. David Chen', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
        'Dr. Lisa Park'
      ],
      photos: ['https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=300&fit=crop'],
      outlookCalendarId: '10',
      location: 'Faculty Lounge',
      isApproved: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '11',
      title: 'Weekly Department Meeting',
      description: 'Regular department meeting to discuss ongoing projects, budget allocations, and upcoming deadlines.',
      startTime: new Date(new Date(new Date().setDate(new Date().getDate() + ((4 - new Date().getDay() + 7) % 7))).setHours(16, 30, 0, 0)),
      endTime: new Date(new Date(new Date().setDate(new Date().getDate() + ((4 - new Date().getDay() + 7) % 7))).setHours(17, 30, 0, 0)),
      category: 'meetings',
      status: 'approved',
      organizer: 'Department Head',
      participants: [
        'All Department Staff',
        { name: 'Maria Rodriguez', imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b742?w=100&h=100&fit=crop&crop=face' },
        'John Thompson'
      ],
      photos: [],
      outlookCalendarId: '11',
      location: 'Conference Room B',
      isApproved: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  // Add debugging console log
  console.log('All events:', mockEvents);
  console.log('Thursday events:', mockEvents.filter(event => {
    const eventDate = new Date(event.startTime);
    const nextThursday = new Date();
    nextThursday.setDate(nextThursday.getDate() + ((4 - nextThursday.getDay() + 7) % 7));
    return eventDate.toDateString() === nextThursday.toDateString();
  }));

  return (
    <div className="h-screen bg-gray-50 flex w-full overflow-hidden">
      <CalendarSidebar
        selectedCategories={selectedCategories}
        onCategoryChange={setSelectedCategories}
        currentDate={currentDate}
        onDateChange={setCurrentDate}
        events={mockEvents}
      />

      <MobileCalendarSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        selectedCategories={selectedCategories}
        onCategoryChange={setSelectedCategories}
        currentDate={currentDate}
        onDateChange={setCurrentDate}
        events={mockEvents}
      />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="px-4 pt-4">
          <CalendarCompleteHeader
            currentView={currentView}
            onViewChange={setCurrentView}
            currentDate={currentDate}
            onDateChange={setCurrentDate}
            onMobileMenuToggle={() => setIsMobileMenuOpen(true)}
          />
        </div>
        
        <div className="px-4 pb-4 pt-2 flex-1 flex flex-col min-h-0">
          <CalendarGrid
            view={currentView}
            currentDate={currentDate}
            selectedCategory={selectedCategory}
            events={mockEvents}
            onEventSelect={setSelectedEvent}
          />
        </div>
      </div>

      <EventDetails
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
};

export default PublicCalendarPage;
