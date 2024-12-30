import React from 'react';
import { Mail, Bell, Clock } from 'lucide-react';

export function NotificationSettings() {
  return (
    <div className="p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Notification Settings</h2>
      
      <div className="space-y-6">
        {/* Email Notifications */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4">Email Notifications</h3>
          <div className="space-y-4">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="ml-2 text-sm text-gray-600">New review assignments</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="ml-2 text-sm text-gray-600">Review completion notifications</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="ml-2 text-sm text-gray-600">Deadline reminders</span>
            </label>
          </div>
        </div>

        {/* In-App Notifications */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4">In-App Notifications</h3>
          <div className="space-y-4">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="ml-2 text-sm text-gray-600">System updates</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="ml-2 text-sm text-gray-600">New messages</span>
            </label>
          </div>
        </div>

        {/* Reminder Schedule */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4">Reminder Schedule</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Deadline Reminders</label>
              <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option value="1">1 day before</option>
                <option value="2">2 days before</option>
                <option value="3">3 days before</option>
                <option value="7">1 week before</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Save Notification Settings
          </button>
        </div>
      </div>
    </div>
  );
}