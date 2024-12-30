import React from 'react';
import { DollarSign, Clock, UserCheck } from 'lucide-react';

export function BenefitsSection() {
  const benefits = [
    {
      icon: DollarSign,
      title: 'Cost-Effective',
      description: 'Pay per review instead of expensive monthly subscriptions. Perfect for departments of any size.'
    },
    {
      icon: Clock,
      title: 'Fast Turnaround',
      description: 'Standard 14-day processing with expedited options available for urgent reviews.'
    },
    {
      icon: UserCheck,
      title: 'Expert Reviewers',
      description: 'Reviews conducted by experienced law enforcement professionals.'
    }
  ];

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose ATLAS?</h2>
          <p className="mt-4 text-lg text-gray-600">
            The smarter way to manage your BWC review requirements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="bg-white p-6 rounded-lg shadow-sm">
              <benefit.icon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}