import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Upload, Users, FileText, Clock, DollarSign } from 'lucide-react';
import { GuideStep } from './GuideStep';
import { GuideHighlight } from './GuideHighlight';
import { GuideProgress } from './GuideProgress';
import { GuideNavigation } from './GuideNavigation';
import { type GuideProps } from './types';

export function RequestsGuide({ onComplete, refs }: GuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const updateTimeoutRef = useRef<number>();

  const steps = [
    {
      title: 'Upload Videos',
      content: 'Start by uploading your body-worn camera footage. You can drag and drop multiple files or click to browse. We support MP4, MOV, and AVI formats up to 2GB per file.',
      icon: Upload,
      ref: refs.uploadRef
    },
    {
      title: 'Select Officers',
      content: 'Choose the officers involved in the videos. You can select multiple officers from your agency roster. This helps track reviews by officer and maintain accurate records.',
      icon: Users,
      ref: refs.officersRef
    },
    {
      title: 'Choose Review Type',
      content: 'Select the type of review needed:\n• Random: Standard performance evaluation\n• Meaningful: Specific incident analysis\n• Performance: Officer evaluation',
      icon: FileText,
      ref: refs.reviewTypeRef
    },
    {
      title: 'Set Priority Level',
      content: 'Choose your priority level based on urgency:\n• Standard (14 days): Regular processing\n• Priority (7 days): +15% fee\n• Urgent (48 hours): +30% fee',
      icon: Clock,
      ref: refs.priorityRef
    },
    {
      title: 'Review Cost',
      content: 'Review the cost breakdown:\n• Base cost per video\n• Duration multipliers\n• Priority fees\n• Quantity discounts',
      icon: DollarSign,
      ref: refs.costRef
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const scrollToCurrentStep = useCallback(() => {
    const currentRef = steps[currentStep].ref.current;
    if (currentRef) {
      currentRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentStep, steps]);

  useEffect(() => {
    // Clear any existing timeout
    if (updateTimeoutRef.current) {
      window.clearTimeout(updateTimeoutRef.current);
    }

    // Set a new timeout to scroll to the current step
    updateTimeoutRef.current = window.setTimeout(scrollToCurrentStep, 100);

    const handleResize = () => {
      if (updateTimeoutRef.current) {
        window.clearTimeout(updateTimeoutRef.current);
      }
      updateTimeoutRef.current = window.setTimeout(scrollToCurrentStep, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (updateTimeoutRef.current) {
        window.clearTimeout(updateTimeoutRef.current);
      }
    };
  }, [scrollToCurrentStep]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      {/* Highlight current element */}
      <GuideHighlight targetRef={steps[currentStep].ref} />

      {/* Current step content */}
      <GuideStep
        title={steps[currentStep].title}
        content={steps[currentStep].content}
        onNext={handleNext}
        onSkip={onComplete}
        isLastStep={currentStep === steps.length - 1}
        targetRef={steps[currentStep].ref}
      />

      {/* Progress indicators */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-4">
        <div className="flex items-center justify-between space-x-8">
          <GuideProgress
            totalSteps={steps.length}
            currentStep={currentStep}
          />
          <GuideNavigation
            onNext={handleNext}
            onSkip={onComplete}
            isLastStep={currentStep === steps.length - 1}
          />
        </div>
      </div>
    </div>
  );
}