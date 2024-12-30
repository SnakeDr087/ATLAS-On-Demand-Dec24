import React, { useState, useEffect } from 'react';
import { format, addHours, parseISO } from 'date-fns';
import { X, Clock, Calendar as CalendarIcon } from 'lucide-react';
import { type Review, type Officer } from '../../types';
import { OfficerSelect } from './OfficerSelect';

interface EventFormProps {
  selectedDate: Date;
  onSubmit: (event: Omit<Review, 'id'>) => void;
  onClose: () => void;
}

export function EventForm({ selectedDate, onSubmit, onClose }: EventFormProps) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<Review['type']>('standard');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(format(selectedDate, 'yyyy-MM-dd'));
  const [startTime, setStartTime] = useState('09:00');
  const [endDate, setEndDate] = useState(format(selectedDate, 'yyyy-MM-dd'));
  const [endTime, setEndTime] = useState('10:00');
  const [location, setLocation] = useState('');
  const [selectedOfficers, setSelectedOfficers] = useState<Officer[]>([]);
  const [reminder, setReminder] = useState('30');

  // Update end time when start time changes
  useEffect(() => {
    const startDateTime = new Date(`${startDate}T${startTime}`);
    const defaultEndDateTime = addHours(startDateTime, 1);
    setEndDate(format(defaultEndDateTime, 'yyyy-MM-dd'));
    setEndTime(format(defaultEndDateTime, 'HH:mm'));
  }, [startDate, startTime]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);

    onSubmit({
      title,
      type,
      description,
      date: startDateTime.toISOString(),
      location,
      officersInvolved: selectedOfficers,
      reminder: parseInt(reminder),
      endDate: endDateTime.toISOString()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h2 className="text-xl font-semibold mb-4">Add New Event</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              placeholder="Enter event title"
            />
          </div>
          
          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type *
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as Review['type'])}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="standard">Standard Review</option>
              <option value="urgent">Urgent Review</option>
              <option value="routine">Routine Check</option>
            </select>
          </div>

          {/* Start Date and Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date & Time *
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10"
                  required
                />
                <CalendarIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
              <div className="relative">
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10"
                  required
                />
                <Clock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
          </div>

          {/* End Date and Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date & Time *
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10"
                  required
                  min={startDate}
                />
                <CalendarIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
              <div className="relative">
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10"
                  required
                />
                <Clock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter location or meeting link"
            />
          </div>

          {/* Officers Involved */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Officers Involved
            </label>
            <OfficerSelect
              selectedOfficers={selectedOfficers}
              onOfficerSelect={(officers) => setSelectedOfficers(officers)}
            />
          </div>

          {/* Reminder */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reminder
            </label>
            <select
              value={reminder}
              onChange={(e) => setReminder(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="0">No reminder</option>
              <option value="5">5 minutes before</option>
              <option value="15">15 minutes before</option>
              <option value="30">30 minutes before</option>
              <option value="60">1 hour before</option>
              <option value="1440">1 day before</option>
            </select>
          </div>
          
          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
              placeholder="Enter event description"
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}