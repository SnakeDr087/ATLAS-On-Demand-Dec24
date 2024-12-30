import React from 'react';

interface GuideNavigationProps {
  onNext: () => void;
  onSkip: () => void;
  isLastStep: boolean;
}

export function GuideNavigation({ onNext, onSkip, isLastStep }: GuideNavigationProps) {
  return (
    <div className="flex justify-between items-center">
      <button
        onClick={onSkip}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
      >
        Skip
      </button>
      <button
        onClick={onNext}
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        {isLastStep ? 'Finish' : 'Next'}
      </button>
    </div>
  );
}