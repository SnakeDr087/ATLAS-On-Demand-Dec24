import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { WelcomeHeader } from '../../components/WelcomeHeader';
import { Calendar } from '../../components/Calendar/Calendar';
import { EventForm } from '../../components/Calendar/EventForm';
import { ReviewTypeChart } from '../../components/Metrics/ReviewTypeChart';
import { Building2, Video, Clock, CheckCircle } from 'lucide-react';

// Mock data
const mockMetrics = {
  agencies: 156,
  videos: 1234,
  pending: 35,
  completed: 65
};

const mockReviewTypes = {
  meaningful: 45,
  random: 30,
  performance: 20,
  useOfForce: 15
};

export function Dashboard() {
  const { user } = useAuth();
  const [showEventForm, setShowEventForm] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [reviews, setReviews] = React.useState([]);

  const handleAddEvent = (newEvent: any) => {
    setReviews([...reviews, { ...newEvent, id: Date.now().toString() }]);
    setShowEventForm(false);
  };

  const handleDeleteReview = (id: string) => {
    setReviews(reviews.filter(review => review.id !== id));
  };

  return (
    <div className="space-y-6">
      <WelcomeHeader />
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {user?.role === 'admin' && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-indigo-100 rounded-full">
                <Building2 className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Agencies</p>
                <p className="text-2xl font-semibold">{mockMetrics.agencies}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <Video className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Videos Uploaded</p>
              <p className="text-2xl font-semibold">{mockMetrics.videos}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
              <p className="text-2xl font-semibold">{mockMetrics.pending}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed Reviews</p>
              <p className="text-2xl font-semibold">{mockMetrics.completed}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Review Type Distribution */}
      <div className="grid grid-cols-1 gap-6">
        <ReviewTypeChart data={mockReviewTypes} />
      </div>

      {/* Calendar Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Calendar</h2>
          <button
            onClick={() => setShowEventForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Event
          </button>
        </div>
        
        <Calendar
          reviews={reviews}
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          onDeleteReview={handleDeleteReview}
        />
      </div>

      {showEventForm && (
        <EventForm
          selectedDate={selectedDate}
          onSubmit={handleAddEvent}
          onClose={() => setShowEventForm(false)}
        />
      )}
    </div>
  );
}