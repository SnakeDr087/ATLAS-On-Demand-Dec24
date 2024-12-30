import { type ReviewRequest, type VideoFile, type Officer } from '../../../../types';

export interface RequestFormProps {
  request: Partial<ReviewRequest>;
  isLoading: boolean;
  errors?: Record<string, string>;
  onSubmit: (data: ReviewRequest) => void;
  onVideoUpload: (videos: VideoFile[]) => void;
  onOfficerSelect: (officers: Officer[]) => void;
  onPriorityChange: (priority: ReviewRequest['priority']) => void;
  onTypeChange: (type: ReviewRequest['type']) => void;
  onDetailsChange: (updates: {
    incidentDate?: string;
    caseNumber?: string;
    description?: string;
  }) => void;
}