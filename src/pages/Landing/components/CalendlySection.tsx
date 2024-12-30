import React from 'react';
import { Calendar } from 'lucide-react';

export function CalendlySection() {
  const meetings = [
    {
      duration: '15 Minutes',
      description: 'Quick introduction and overview',
      url: 'https://calendly.com/jparham087/15min'
    },
    {
      duration: '30 Minutes',
      description: 'Detailed discussion and demo',
      url: 'https://calendly.com/jparham087/30min'
    },
    {
      duration: '60 Minutes',
      description: 'In-depth consultation',
      url: 'https://calendly.com/jparham087/60min'
    }
  ];

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Schedule a Call</h2>
          <p className="mt-4 text-lg text-gray-600">Choose a time that works best for you</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {meetings.map((meeting) => (
            <a
              key={meeting.duration}
              href={meeting.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <Calendar className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{meeting.duration}</h3>
              <p className="text-gray-600">{meeting.description}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}