import React from 'react';
import { Shield, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BenefitsSection } from './components/BenefitsSection';
import { PricingSection } from './components/PricingSection';
import { CalendlySection } from './components/CalendlySection';
import { ContactForm } from './components/ContactForm';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-white" />
              <span className="ml-2 text-xl font-bold text-white">ATLAS</span>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 text-sm font-medium text-blue-600 bg-white rounded-md hover:bg-blue-50"
            >
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-3xl mx-auto">
            {/* Large centered shield icon */}
            <div className="flex justify-center mb-8">
              <Shield className="w-32 h-32 text-white" />
            </div>
            <h1 className="text-6xl font-bold mb-6">
              ATLAS
            </h1>
            <h2 className="text-4xl font-bold mb-8">
              On-Demand<br />
              Body-Worn Camera Reviews
            </h2>
            <p className="text-xl text-blue-100 mb-12">
              Professional video review services when you need them.<br />
              No contracts, no monthly fees. Pay only for what you use.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 text-lg font-medium text-blue-600 bg-white rounded-md hover:bg-blue-50 inline-flex items-center"
            >
              Get Started
              <ArrowRight className="ml-2 w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* Calendly Section */}
      <CalendlySection />

      {/* Contact Form */}
      <ContactForm />

      {/* Footer */}
      <footer className="bg-white border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500 text-sm">
            © 2024 360AOR LLC All Rights Reserved
          </div>
        </div>
      </footer>
    </div>
  );
}