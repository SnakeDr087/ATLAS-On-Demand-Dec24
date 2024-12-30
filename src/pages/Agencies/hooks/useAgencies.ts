import { useState } from 'react';
import { type Agency } from '../../../types';

export function useAgencies() {
  const [agencies, setAgencies] = useState<Agency[]>([
    {
      id: '1',
      name: 'Central Police Department',
      code: 'CPD',
      type: 'local',
      address: '123 Main St',
      city: 'Central City',
      state: 'CA',
      zip: '90210',
      phone: '(555) 123-4567',
      website: 'https://cpd.gov',
      patchUrl: 'https://images.unsplash.com/photo-1590419690008-905895e8fe0d?w=200&h=200&fit=crop',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      status: 'active',
      liaison: {
        name: 'John Smith',
        title: 'Captain',
        email: 'john.smith@cpd.gov',
        phone: '(555) 123-4567',
        mobile: '(555) 987-6543'
      }
    }
  ]);

  const addAgency = (agency: Agency) => {
    setAgencies(prev => [...prev, agency]);
  };

  const updateAgency = (updatedAgency: Agency) => {
    setAgencies(prev =>
      prev.map(agency =>
        agency.id === updatedAgency.id ? updatedAgency : agency
      )
    );
  };

  const deleteAgency = (id: string) => {
    setAgencies(prev =>
      prev.map(agency =>
        agency.id === id ? { ...agency, status: 'inactive' } : agency
      )
    );
  };

  return {
    agencies,
    addAgency,
    updateAgency,
    deleteAgency
  };
}