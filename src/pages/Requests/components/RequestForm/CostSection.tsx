import React from 'react';
import { CostCalculator } from '../../../../components/Reports/CostCalculator';
import { type VideoFile, type ReviewRequest } from '../../../../types';

interface CostSectionProps {
  videos: VideoFile[];
  priority: ReviewRequest['priority'];
}

export function CostSection({ videos, priority }: CostSectionProps) {
  return (
    <div className="mb-8">
      <CostCalculator
        videos={videos}
        priority={priority}
      />
    </div>
  );
}