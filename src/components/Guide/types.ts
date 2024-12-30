export interface GuideProps {
  onComplete: () => void;
  refs: {
    uploadRef: React.RefObject<HTMLElement>;
    officersRef: React.RefObject<HTMLElement>;
    reviewTypeRef: React.RefObject<HTMLElement>;
    priorityRef: React.RefObject<HTMLElement>;
    costRef: React.RefObject<HTMLElement>;
  };
}

export interface GuideStep {
  title: string;
  content: string;
  ref: React.RefObject<HTMLElement>;
}