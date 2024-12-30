import React from 'react';

interface GuideProgressProps {
  totalSteps: number;
  currentStep: number;
}

export function GuideProgress({ totalSteps, currentStep }: GuideProgressProps) {
  return (
    <div className="flex items-center space-x-2">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
            index === currentStep
              ? 'bg-blue-600'
              : index < currentStep
              ? 'bg-blue-200'
              : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  );
}