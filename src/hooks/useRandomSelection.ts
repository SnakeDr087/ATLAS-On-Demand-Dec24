import { useState } from 'react';
import { type Officer } from '../types';
import { parseCSV } from '../utils/csvParser';

export function useRandomSelection() {
  const [officers, setOfficers] = useState<Officer[]>([]);
  const [selectedOfficers, setSelectedOfficers] = useState<Officer[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const importOfficers = async (file: File) => {
    try {
      setIsLoading(true);
      const importedOfficers = await parseCSV(file);
      setOfficers(importedOfficers);
      return true;
    } catch (error) {
      console.error('Failed to import officers:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const generateSelection = (criteria: {
    count: number;
    excludeRecent: boolean;
    dateRange: { start: string; end: string };
  }) => {
    let eligibleOfficers = [...officers];

    if (criteria.excludeRecent) {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      eligibleOfficers = eligibleOfficers.filter(officer => {
        if (!officer.lastReviewed) return true;
        return new Date(officer.lastReviewed) < thirtyDaysAgo;
      });
    }

    // Randomly select officers
    const selected = [];
    const count = Math.min(criteria.count, eligibleOfficers.length);
    
    while (selected.length < count) {
      const index = Math.floor(Math.random() * eligibleOfficers.length);
      selected.push(eligibleOfficers.splice(index, 1)[0]);
    }

    setSelectedOfficers(selected);
  };

  return {
    officers,
    selectedOfficers,
    isLoading,
    importOfficers,
    generateSelection
  };
}