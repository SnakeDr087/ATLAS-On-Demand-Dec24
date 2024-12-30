import { useState, useEffect } from 'react';
import { type VideoFile, type ReviewRequest } from '../types';
import * as storage from '../services/storage/db';

export function useRequestStorage() {
  const [reports, setReports] = useState<ReviewRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      setIsLoading(true);
      const storedReports = await storage.getAllReports();
      setReports(storedReports);
    } catch (error) {
      console.error('Error loading reports:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveReport = async (report: ReviewRequest) => {
    await storage.saveReport(report);
    await loadReports();
    return report;
  };

  const deleteReport = async (id: string) => {
    await storage.deleteReport(id);
    await loadReports();
  };

  return {
    reports,
    isLoading,
    saveReport,
    deleteReport,
    loadReports
  };
}