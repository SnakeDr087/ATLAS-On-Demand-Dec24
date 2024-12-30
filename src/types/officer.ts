export interface Officer {
  id: string;
  name: string;
  badge: string;
  rank: string;
  division: string;
  shift: string;
  lastReviewed?: string;
  reviewHistory?: ReviewHistory[];
}

export interface ReviewHistory {
  date: string;
  type: ReviewType;
  incidentId?: string;
}

export type ReviewType = 'random' | 'performance' | 'meaningful' | 'use-of-force';

export interface ReviewPriority {
  type: ReviewType;
  weight: number; // 1-10, higher means more likely to be selected
  minInterval: number; // Minimum days between reviews of this type
}

export interface SelectionCriteria {
  reviewType: ReviewType;
  dateRange: {
    start: string;
    end: string;
  };
  count: number;
  excludeRecentlyReviewed?: boolean;
}