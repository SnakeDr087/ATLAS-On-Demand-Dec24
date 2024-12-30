import React from 'react';
import { type RequestFormProps } from './types';
import { VideoSection } from './VideoSection';
import { OfficerSection } from './OfficerSection';
import { ReviewTypeSection } from './ReviewTypeSection';
import { PrioritySection } from './PrioritySection';
import { CostSection } from './CostSection';
import { IncidentDetailsSection } from './IncidentDetailsSection';
import { FormActions } from './FormActions';

export function RequestForm({
  request,
  isLoading,
  errors,
  onSubmit,
  onVideoUpload,
  onOfficerSelect,
  onPriorityChange,
  onTypeChange,
  onDetailsChange
}: RequestFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(request as any);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <VideoSection
          videos={request.videos || []}
          onUpload={onVideoUpload}
          error={errors?.videos}
        />

        <OfficerSection
          selectedOfficers={request.officers || []}
          onSelect={onOfficerSelect}
          error={errors?.officers}
        />

        <ReviewTypeSection
          value={request.type}
          onChange={onTypeChange}
          error={errors?.type}
        />

        <PrioritySection
          value={request.priority}
          onChange={onPriorityChange}
          error={errors?.priority}
        />

        <IncidentDetailsSection
          incidentDate={request.incidentDate}
          caseNumber={request.caseNumber}
          description={request.description}
          onChange={onDetailsChange}
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