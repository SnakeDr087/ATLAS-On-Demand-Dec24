import React from 'react';
import { Search, Filter, Download } from 'lucide-react';
import { VideoExportButton } from './VideoExportButton';

interface VideoHeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onToggleFilters: () => void;
}

export function VideoHeader({
  searchTerm,
  onSearchChange,
  onToggleFilters
}: VideoHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <h1 className="text-2xl font-bold text-gray-900">Video Library</h1>
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search videos..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          onClick={onToggleFilters}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </button>
        <VideoExportButton />
      </div>
    </div>
  );
}