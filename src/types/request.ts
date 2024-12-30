import { type ReviewRequest } from './index';

export interface RequestColumn {
  id: keyof ReviewRequest;
  header: string;
  sortable?: boolean;
  render?: (value: any, row: ReviewRequest) => React.ReactNode;
}

export interface RequestTableProps {
  requests: ReviewRequest[];
  columns: RequestColumn[];
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
  onEdit?: (request: ReviewRequest) => void;
}

export interface RequestHistoryProps {
  requests: ReviewRequest[];
  onUpdateRequest?: (id: string, updates: Partial<ReviewRequest>) => void;
  onDeleteRequest?: (id: string) => void;
  isAdmin?: boolean;
}