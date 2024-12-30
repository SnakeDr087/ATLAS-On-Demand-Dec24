import { useState } from 'react';
import { createBackup, restoreBackup } from '../services/storage/backup';

export function useBackup() {
  const [isCreating, setIsCreating] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const downloadBackup = async () => {
    try {
      setIsCreating(true);
      setError(null);
      
      const backup = await createBackup();
      const url = URL.createObjectURL(backup);
      const link = document.createElement('a');
      link.href = url;
      link.download = `atlas-backup-${new Date().toISOString()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError('Failed to create backup');
      console.error(err);
    } finally {
      setIsCreating(false);
    }
  };

  const restore = async (file: File) => {
    try {
      setIsRestoring(true);
      setError(null);
      await restoreBackup(file);
    } catch (err) {
      setError('Failed to restore backup');
      console.error(err);
    } finally {
      setIsRestoring(false);
    }
  };

  return {
    downloadBackup,
    restore,
    isCreating,
    isRestoring,
    error
  };
}