import React from 'react';

interface GuideHighlightProps {
  targetRef: React.RefObject<HTMLElement>;
}

export function GuideHighlight({ targetRef }: GuideHighlightProps) {
  const [position, setPosition] = React.useState({ top: 0, left: 0, width: 0, height: 0 });

  React.useEffect(() => {
    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top + window.scrollY,
        left: rect.left,
        width: rect.width,
        height: rect.height
      });
    }
  }, [targetRef]);

  return (
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
  );
}