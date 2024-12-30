import React from 'react';
import { Building2, Video, Clock, CheckCircle } from 'lucide-react';
import { MetricsCard } from './MetricsCard';

interface MetricsData {
  agencies: number;
  videos: number;
  pending: number;
  completed: number;
}

export function MetricsGrid({ data }: { data: MetricsData }) {
  const metrics = [
    {
      title: 'Total Agencies',
      value: data.agencies,
      icon: Building2,
      trend: { value: 12, isPositive: true }
    },
    {
      title: 'Videos Uploaded',
      value: data.videos,
      icon: Video,
      trend: { value: 8, isPositive: true }
    },
    {
      title: 'Pending Reviews',
      value: `${data.pending}%`,
      icon: Clock,
      trend: { value: 5, isPositive: false }
    },
    {
      title: 'Completed Reviews',
      value: `${data.completed}%`,
      icon: CheckCircle,
      trend: { value: 15, isPositive: true }
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric) => (
        <MetricsCard key={metric.title} {...metric} />
      ))}
    </div>
  );
}