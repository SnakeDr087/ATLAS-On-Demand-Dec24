import React from 'react';
import { Check } from 'lucide-react';

export function PricingSection() {
  const plans = [
    {
      title: 'Standard',
      price: 50,
      duration: '7-day turnaround',
      features: ['Up to 30 minutes', 'Bulk discounts available']
    },
    {
      title: 'Priority',
      price: 75,
      duration: '3-day turnaround',
      features: ['Up to 30 minutes', 'Priority processing'],
      popular: true
    },
    {
      title: 'Urgent',
      price: 100,
      duration: '24-hour turnaround',
      features: ['Up to 30 minutes', 'Emergency processing']
    }
  ];

  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Simple, Transparent Pricing</h2>
          <p className="mt-4 text-lg text-gray-600">Choose the timeline that works for you</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className={`bg-white p-8 rounded-lg shadow-sm ${
                plan.popular ? 'border-2 border-blue-500 relative' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-sm rounded-bl-lg">
                  Popular
                </div>
              )}
              <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
              <p className="text-gray-500 mb-4">{plan.duration}</p>
              <div className="text-3xl font-bold mb-6">
                ${plan.price}<span className="text-lg font-normal">/video</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}