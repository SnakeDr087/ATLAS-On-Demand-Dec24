import React from 'react';
import { Video, Clock, HardDrive, Users } from 'lucide-react';
import { type VideoFile } from '../../../types';

interface VideoStatsProps {
  videos: VideoFile[];
}

export function VideoStats({ videos }: VideoStatsProps) {
  const totalDuration = videos.reduce((acc, video) => acc + video.duration, 0);
  const totalSize = videos.reduce((acc, video) => acc + video.size, 0);
  const uniqueOfficers = new Set(videos.map(v => v.officer)).size;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <StatCard
        icon={<Video className="w-10 h-10 text-blue-600" />}
        label="Total Videos"
        value={videos.length.toString()}
      />
      <StatCard
        icon={<Clock className="w-10 h-10 text-green-600" />}
        label="Total Duration"
        value={`${Math.floor(totalDuration / 3600)}h ${Math.floor((totalDuration % 3600) / 60)}m`}
      />
      <StatCard
        icon={<HardDrive className="w-10 h-10 text-purple-600" />}
        label="Total Size"
        value={`${(totalSize / (1024 * 1024 * 1024)).toFixed(1)} GB`}
      />
      <StatCard
        icon={<Users className="w-10 h-10 text-orange-600" />}
        label="Officers"
        value={uniqueOfficers.toString()}
      />
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center">
        {icon}
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
}