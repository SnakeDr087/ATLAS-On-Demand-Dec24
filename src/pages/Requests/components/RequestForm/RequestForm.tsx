import React from 'react';
import { type ReviewRequest } from '../../../../types';
import { type RequestFormProps } from './types';
import { VideoSection } from './VideoSection';
import { OfficerSection } from './OfficerSection';
import { ReviewTypeSection } from './ReviewTypeSection';
import { PrioritySection } from './PrioritySection';
import { CostSection } from './CostSection';
import { FormActions } from './FormActions';

const DEFAULT_REQUEST: Partial<ReviewRequest> = {
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
};

export function RequestForm({
  request = DEFAULT_REQUEST,
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
        <ReviewTypeSection 
          value={request.type}
          onChange={onTypeChange}
        />

        <VideoSection
          videos={request.videos || []}
          onUpload={onVideoUpload}
        />

        <OfficerSection
          selectedOfficers={request.officers || []}
          onSelect={onOfficerSelect}
        />

        <PrioritySection
          value={request.priority}
          onChange={onPriorityChange}
        />

        <CostSection
          videos={request.videos || []}
          priority={request.priority || 'standard'}
        />

        <FormActions 
          isLoading={isLoading}
          onSubmit={handleSubmit}
        />
      </div>
    </form>
  );
}