import React from 'react';
import { Bell } from 'lucide-react';

interface NotificationPreferences {
  notifications: {
    email: boolean;
    mobile: boolean;
    desktop: boolean;
  };
  timezone: string;
}

interface NotificationPreferencesProps {
  preferences: NotificationPreferences;
  onChange: (preferences: NotificationPreferences) => void;
}

export function NotificationPreferences({ preferences, onChange }: NotificationPreferencesProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 flex items-center">
        <Bell className="w-5 h-5 mr-2 text-blue-600" />
        Notification Preferences
      </h3>

      <div className="space-y-4">
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={preferences.notifications.email}
              onChange={(e) => onChange({
                ...preferences,
                notifications: {
                  ...preferences.notifications,
                  email: e.target.checked
                }
              })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-600">Email notifications</span>
          </label>
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={preferences.notifications.mobile}
              onChange={(e) => onChange({
                ...preferences,
                notifications: {
                  ...preferences.notifications,
                  mobile: e.target.checked
                }
              })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-600">Mobile notifications</span>
          </label>
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={preferences.notifications.desktop}
              onChange={(e) => onChange({
                ...preferences,
                notifications: {
                  ...preferences.notifications,
                  desktop: e.target.checked
                }
              })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-600">Desktop notifications</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Timezone</label>
          <select
            value={preferences.timezone}
            onChange={(e) => onChange({
              ...preferences,
              timezone: e.target.value
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {Intl.supportedValuesOf('timeZone').map((zone) => (
              <option key={zone} value={zone}>{zone}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}