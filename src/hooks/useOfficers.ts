import { useState, useEffect } from 'react';
import { type Officer } from '../types/officer';
import { 
  getAllOfficers,
  addOfficer as addOfficerService,
  updateOfficer as updateOfficerService,
  deleteOfficer as deleteOfficerService
} from '../services/officerService';
import { parseCSV } from '../utils/csvParser';

export function useOfficers() {
  const [officers, setOfficers] = useState<Officer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadOfficers();
  }, []);

  const loadOfficers = async () => {
    try {
      const data = await getAllOfficers();
      setOfficers(data);
    } catch (error) {
      console.error('Failed to load officers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addOfficer = async (officer: Omit<Officer, 'id'>) => {
    try {
      const newOfficer = await addOfficerService(officer);
      setOfficers(prev => [...prev, newOfficer]);
      return true;
    } catch (error) {
      console.error('Failed to add officer:', error);
      return false;
    }
  };

  const updateOfficer = async (officer: Officer) => {
    try {
      await updateOfficerService(officer);
      setOfficers(prev => prev.map(o => o.id === officer.id ? officer : o));
      return true;
    } catch (error) {
      console.error('Failed to update officer:', error);
      return false;
    }
  };

  const deleteOfficer = async (id: string) => {
    try {
      await deleteOfficerService(id);
      setOfficers(prev => prev.filter(o => o.id !== id));
      return true;
    } catch (error) {
      console.error('Failed to delete officer:', error);
      return false;
    }
  };

  const importOfficers = async (file: File) => {
    try {
      const officersData = await parseCSV(file);
      for (const officer of officersData) {
        await addOfficer(officer);
      }
      return true;
    } catch (error) {
      console.error('Failed to import officers:', error);
      return false;
    }
  };

  return {
    officers,
    isLoading,
    addOfficer,
    updateOfficer,
    deleteOfficer,
    importOfficers,
    loadOfficers
  };
}