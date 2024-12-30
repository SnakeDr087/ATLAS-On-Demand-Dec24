export type SortField = 'uploadDate' | 'officer' | 'type' | 'duration' | 'status';
export type SortDirection = 'asc' | 'desc';

export interface VideoFilterOptions {
  type: string;
  status: string;
  officer: string;
  dateRange: string;
}