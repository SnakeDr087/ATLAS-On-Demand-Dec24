import { useState, useMemo } from 'react';

export function useTableSort<T>(
  data: T[], 
  defaultSort: keyof T,
  defaultDirection: 'asc' | 'desc' = 'asc'
) {
  const [sortField, setSortField] = useState<keyof T>(defaultSort);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(defaultDirection);

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      return sortDirection === 'asc'
        ? (aVal > bVal ? 1 : -1)
        : (bVal > aVal ? 1 : -1);
    });
  }, [data, sortField, sortDirection]);

  const toggleSort = (field: keyof T) => {
    if (field === sortField) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return {
    sortedData,
    sortField,
    sortDirection,
    toggleSort
  };
}