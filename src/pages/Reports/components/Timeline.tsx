import React from 'react';
import { Clock } from 'lucide-react';
import { format } from 'date-fns';

interface TimelineEvent {
  timestamp: string;
  description: string;
  type: string;
  confidence: number;
}

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  return (
    <section>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Event Timeline</h3>
      <div className="relative">
        <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-gray-200" />
        <div className="space-y-6">
          {events.map((event, index) => (
            <div key={index} className="relative flex items-start">
              <div className="absolute left-4 w-3 h-3 bg-blue-500 rounded-full transform -translate-x-1.5 mt-1.5" />
              <div className="ml-10">
                <div className="flex items-center text-sm">
                  <Clock className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-gray-500">
                    {format(new Date(event.timestamp), 'h:mm:ss a')}
                  </span>
                  {event.confidence > 0.9 && (
                    <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      High Confidence
                    </span>
                  )}
                </div>
                <p className="mt-1 text-gray-600">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}