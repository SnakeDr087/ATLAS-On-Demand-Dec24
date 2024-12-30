import { type Officer } from '../types/officer';

export async function parseCSV(file: File): Promise<Omit<Officer, 'id'>[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split('\n');
        const headers = lines[0].toLowerCase().split(',');
        
        // Validate required columns
        const requiredColumns = ['name', 'badge', 'rank', 'division', 'shift'];
        const missingColumns = requiredColumns.filter(col => !headers.includes(col));
        
        if (missingColumns.length > 0) {
          throw new Error(`Missing required columns: ${missingColumns.join(', ')}`);
        }

        const officers = lines.slice(1)
          .filter(line => line.trim())
          .map(line => {
            const values = line.split(',');
            return {
              name: values[headers.indexOf('name')].trim(),
              badge: values[headers.indexOf('badge')].trim(),
              rank: values[headers.indexOf('rank')].trim(),
              division: values[headers.indexOf('division')].trim(),
              shift: values[headers.indexOf('shift')].trim(),
              reviewHistory: []
            };
          });

        resolve(officers);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}