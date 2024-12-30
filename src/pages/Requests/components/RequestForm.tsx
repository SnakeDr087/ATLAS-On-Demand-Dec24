import React from 'react';
import { type ReviewRequest, type VideoFile, type Officer } from '../../../types';
import { VideoUploader } from './VideoUploader';
import { OfficerSelector } from './OfficerSelector';
import { ReviewTypeSelector } from './ReviewTypeSelector';
import { PrioritySelector } from './PrioritySelector';
import { CostCalculator } from '../../../components/Reports/CostCalculator';
import { Button } from '../../../components/common/Button';

interface RequestFormProps {
  request: Partial<ReviewRequest>;
  isLoading: boolean;
  onSubmit: (data: ReviewRequest) => void;
  onVideoUpload: (videos: VideoFile[]) => void;
  onOfficerSelect: (officers: Officer[]) => void;
  onPriorityChange: (priority: ReviewRequest['priority']) => void;
  onTypeChange: (type: ReviewRequest['type']) => void;
}

export function RequestForm({
  request = {
    type: 'random',
    priority: 'standard',
    videos: [],
    officers: [],
    status: 'pending',
    cost: {
      basePrice: 0,
      priorityFee: 0,
      quantityDiscount: 0,
      total: 0
    }
  },
  isLoading,
  onSubmit,
  onVideoUpload,
  onOfficerSelect,
  onPriorityChange,
  onTypeChange
}: RequestFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(request as ReviewRequest);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <ReviewTypeSelector
          value={request.type}
          onChange={onTypeChange}
        />

        <VideoUploader
          videos={request.videos || []}
          onUpload={onVideoUpload}
        />

        <OfficerSelector
          selectedOfficers={request.officers || []}
          onSelect={onOfficerSelect}
        />

        <PrioritySelector
          value={request.priority}
          onChange={onPriorityChange}
        />

        <CostCalculator
          videos={request.videos || []}
          priority={request.priority || 'standard'}
        />

        <div className="flex justify-end space-x-4 mt-8">
          <Button
            type="submit"
            isLoading={isLoading}
          >
            Submit Request
          </Button>
        </div>
      </div>
    </form>
  );
}