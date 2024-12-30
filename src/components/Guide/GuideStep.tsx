import React from 'react';
import { X } from 'lucide-react';

interface GuideStepProps {
  title: string;
  content: string;
  onNext: () => void;
  onSkip: () => void;
  isLastStep: boolean;
  targetRef: React.RefObject<HTMLElement>;
}

export function GuideStep({ title, content, onNext, onSkip, isLastStep, targetRef }: GuideStepProps) {
  const [position, setPosition] = React.useState({ top: 0, left: 0 });

  React.useEffect(() => {
    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 10,
        left: rect.left + window.scrollX
      });
    }
  }, [targetRef]);

  return (
    <div
      className="fixed z-50"
      style={{ top: position.top, left: position.left }}
    >
      <div className="bg-white rounded-lg shadow-lg p-4 w-80">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-gray-900">{title}</h3>
          <button onClick={onSkip} className="text-gray-400 hover:text-gray-500">
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-4">{content}</p>
        <div className="flex justify-between">
          <button
            onClick={onSkip}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Skip tutorial
          </button>
          <button
            onClick={onNext}
            className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            {isLastStep ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50 -z-10" />
    </div>
  );
}