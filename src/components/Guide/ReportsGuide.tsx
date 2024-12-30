import React, { useState, useCallback, useEffect, useRef } from 'react';
import { X, Upload, Users, FileText, Clock, DollarSign } from 'lucide-react';

interface GuideStep {
  title: string;
  content: string;
  icon: React.ElementType;
  ref: React.RefObject<HTMLElement>;
}

interface ReportsGuideProps {
  onComplete: () => void;
  refs: {
    uploadRef: React.RefObject<HTMLDivElement>;
    officersRef: React.RefObject<HTMLDivElement>;
    reviewTypeRef: React.RefObject<HTMLDivElement>;
    priorityRef: React.RefObject<HTMLDivElement>;
    costRef: React.RefObject<HTMLDivElement>;
  };
}

export function ReportsGuide({ onComplete, refs }: ReportsGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const updateTimeoutRef = useRef<number>();

  const steps: GuideStep[] = [
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

  const updatePosition = useCallback(() => {
    const currentRef = steps[currentStep].ref.current;
    if (currentRef) {
      const rect = currentRef.getBoundingClientRect();
      setPosition({
        top: rect.top + window.scrollY,
        left: rect.left,
        width: rect.width,
        height: rect.height
      });

      // Scroll element into view
      currentRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentStep, steps]);

  useEffect(() => {
    // Clear any existing timeout
    if (updateTimeoutRef.current) {
      window.clearTimeout(updateTimeoutRef.current);
    }

    // Set a new timeout to update position
    updateTimeoutRef.current = window.setTimeout(updatePosition, 100);

    const handleResize = () => {
      if (updateTimeoutRef.current) {
        window.clearTimeout(updateTimeoutRef.current);
      }
      updateTimeoutRef.current = window.setTimeout(updatePosition, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (updateTimeoutRef.current) {
        window.clearTimeout(updateTimeoutRef.current);
      }
    };
  }, [updatePosition]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const currentGuide = steps[currentStep];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      {/* Highlight current element */}
      <div
        className="absolute border-2 border-blue-500 bg-blue-50 bg-opacity-10 transition-all duration-300 pointer-events-none"
        style={{
          top: position.top - 4,
          left: position.left - 4,
          width: position.width + 8,
          height: position.height + 8,
          borderRadius: '8px'
        }}
      />

      {/* Guide popup */}
      <div
        className="absolute bg-white rounded-lg shadow-xl p-6 max-w-md transition-all duration-300"
        style={{
          top: position.top + position.height + 20,
          left: position.left
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <currentGuide.icon className="w-5 h-5 mr-2 text-blue-600" />
            {currentGuide.title}
          </h3>
          <button
            onClick={onComplete}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-8">
          <p className="text-gray-600 whitespace-pre-line">{currentGuide.content}</p>
        </div>

        <div className="flex justify-between items-center">
          {/* Progress Indicators */}
          <div className="flex items-center space-x-2">
            {steps.map((_, index) => (
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
          
          {/* Navigation Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={onComplete}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Skip
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}