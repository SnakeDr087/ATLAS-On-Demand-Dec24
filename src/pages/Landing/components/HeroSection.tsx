import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <img
        src="https://images.unsplash.com/photo-1617138473695-56c54b89f670?auto=format&fit=crop&w=2000&q=80"
        alt="Police officer helping motorist"
        className="w-full h-[600px] object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-5xl font-bold mb-6">
            On-Demand<br />
            Body-Worn Camera Reviews
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl">
            Professional video review services when you need them.<br />
            No contracts, no monthly fees. Pay only for what you use.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 inline-flex items-center"
          >
            Get Started
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}