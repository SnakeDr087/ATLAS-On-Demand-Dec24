import React from 'react';
import { LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Button } from '../Button';

interface PageHeaderProps {
  title: string;
  action?: {
    label: string;
    icon: keyof typeof Icons;
    onClick: () => void;
  };
}

export function PageHeader({ title, action }: PageHeaderProps) {
  const Icon = action?.icon ? Icons[action.icon] : null;

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      {action && Icon && (
        <Button
          variant="secondary"
          onClick={action.onClick}
          icon={Icon}
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}