import { type ReviewRequest } from '../../../../types';

export interface RequestHistoryProps {
  requests: ReviewRequest[];
  onUpdateRequest?: (id: string, updates: Partial<ReviewRequest>) => void;
  onDeleteRequest?: (id: string) => void;
  isAdmin?: boolean;
}

export interface RequestRowProps {
  request: ReviewRequest;
  isExpanded: boolean;
  onToggle: () => void;
  onDelete?: (id: string) => void;
  onEdit?: (request: ReviewRequest) => void;
}

export interface RequestDetailsProps {
  request: ReviewRequest;
}