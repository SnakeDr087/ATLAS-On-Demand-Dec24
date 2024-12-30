import React from 'react';
import { Clock, Calendar, Hash } from 'lucide-react';

export function SystemSettings() {
  return (
    <div className="p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">System Preferences</h2>
      
      <div className="space-y-6">
        {/* Time Format */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Time Format</label>
          <div className="mt-1 flex items-center">
            <Clock className="w-5 h-5 text-gray-400 mr-2" />
            <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option value="12">12-hour (1:00 PM)</option>
              <option value="24">24-hour (13:00)</option>
            </select>
          </div>
        </div>

        {/* Date Format */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Date Format</label>
          <div className="mt-1 flex items-center">
            <Calendar className="w-5 h-5 text-gray-400 mr-2" />
            <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
        </div>

        {/* Case Number Format */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Case Number Format</label>
          <div className="mt-1 flex items-center">
            <Hash className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="YYYY-####"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">Use # for numbers, @ for letters</p>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}