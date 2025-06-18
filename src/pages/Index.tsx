
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Settings, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calendar className="h-12 w-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Calendar Management System</h1>
          </div>
          <p className="text-xl text-gray-600">
            Manage multiple Outlook calendars and provide public calendar views
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-8 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <Settings className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Administration</h2>
              <p className="text-gray-600 mb-6">
                Manage Outlook calendars, approve events, and monitor system activity. 
                Add or remove calendars, review event details, and control what gets published.
              </p>
              <Link to="/admin">
                <Button size="lg" className="w-full">
                  Access Admin Panel
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="p-8 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <Eye className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Public Calendar</h2>
              <p className="text-gray-600 mb-6">
                View the public calendar with colorful interface, multiple views (day, week, month, year), 
                category filtering, and ability to add events to personal calendars.
              </p>
              <Link to="/calendar">
                <Button size="lg" variant="outline" className="w-full">
                  View Public Calendar
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        <div className="mt-12 bg-white rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium">Multiple Calendar Management</h4>
                <p className="text-sm text-gray-600">Connect and manage multiple Outlook calendars</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium">Event Approval System</h4>
                <p className="text-sm text-gray-600">Review and approve events before public display</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium">Category Filtering</h4>
                <p className="text-sm text-gray-600">Filter by academic, events, meetings, VIP visits, etc.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium">Multiple Views</h4>
                <p className="text-sm text-gray-600">Day, week, month, and year calendar views</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium">Activity Logging</h4>
                <p className="text-sm text-gray-600">Track all calendar changes and synchronization</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium">Personal Calendar Export</h4>
                <p className="text-sm text-gray-600">Users can add events to their personal calendars</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
