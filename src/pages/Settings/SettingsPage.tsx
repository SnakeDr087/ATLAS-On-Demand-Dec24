import React from 'react';
import { Cog, User, Bell, Shield, Monitor, FileText, Link } from 'lucide-react';
import { ProfileSettings } from './components/ProfileSettings';
import { SystemSettings } from './components/SystemSettings';
import { NotificationSettings } from './components/NotificationSettings';
import { DisplaySettings } from './components/DisplaySettings';
import { ReviewSettings } from './components/ReviewSettings';
import { IntegrationSettings } from './components/IntegrationSettings';

const SECTIONS = [
  { id: 'profile', label: 'Profile', icon: User, component: ProfileSettings },
  { id: 'system', label: 'System', icon: Cog, component: SystemSettings },
  { id: 'notifications', label: 'Notifications', icon: Bell, component: NotificationSettings },
  { id: 'display', label: 'Display & Accessibility', icon: Monitor, component: DisplaySettings },
  { id: 'review', label: 'Review Preferences', icon: FileText, component: ReviewSettings },
  { id: 'integrations', label: 'Integrations', icon: Link, component: IntegrationSettings }
];

export function SettingsPage() {
  const [activeSection, setActiveSection] = React.useState('profile');

  const ActiveComponent = SECTIONS.find(section => section.id === activeSection)?.component || ProfileSettings;

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Settings</h1>
      
      <div className="flex gap-8">
        {/* Navigation Sidebar */}
        <nav className="w-64 flex-shrink-0">
          <div className="space-y-1">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md
                  ${activeSection === section.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
              >
                <section.icon className="w-5 h-5 mr-3" />
                {section.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Content Area */}
        <div className="flex-1 bg-white rounded-lg shadow">
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
}