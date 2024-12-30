import { type ReviewRequest } from '../../../types';

export interface RequestFormProps {
  request: Partial<ReviewRequest>;
  isLoading: boolean;
  onSubmit: (data: ReviewRequest) => void;
  onVideoUpload: (videos: ReviewRequest['videos']) => void;
  onOfficerSelect: (officers: ReviewRequest['officers']) => void;
  onPriorityChange: (priority: ReviewRequest['priority']) => void;
  onTypeChange: (type: ReviewRequest['type']) => void;
}