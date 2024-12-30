import React from 'react';
import { type BWCReport } from '../../../types/report';

interface TimelineProps {
  events: BWCReport['timeline'];
}

export function Timeline({ events }: TimelineProps) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Incident Timeline</h2>
      <div className="relative">
        <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-gray-200" />
        <div className="space-y-6">
          {events.map((event, index) => (
            <div key={index} className="relative flex items-start">
              <div className="absolute left-4 w-3 h-3 bg-blue-500 rounded-full transform -translate-x-1.5 mt-1.5" />
              <div className="ml-10">
                <div className="flex items-center text-sm">
                  <span className="text-gray-500">{event.timestamp}</span>
                </div>
                <p className="mt-1 text-gray-700">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}