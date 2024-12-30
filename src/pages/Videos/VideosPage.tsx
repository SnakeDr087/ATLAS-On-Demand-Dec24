import React from 'react';
import { Plus, Search } from 'lucide-react';
import { Table } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { useVideoManagement } from '../../hooks/useVideoManagement';
import { useTableSort } from '../../hooks/useTableSort';
import { formatFileSize, formatDuration } from '../../utils/videoProcessing';

export function VideosPage() {
  const { 
    videos,
    filteredVideos,
    searchTerm,
    setSearchTerm,
    isLoading 
  } = useVideoManagement();

  const {
    sortedData,
    sortField,
    sortDirection,
    toggleSort
  } = useTableSort(filteredVideos, 'uploadDate', 'desc');

  const columns = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (value, video) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{formatFileSize(video.size)}</div>
        </div>
      )
    },
    {
      key: 'duration',
      label: 'Duration',
      sortable: true,
      render: (value) => formatDuration(Number(value))
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => (
        <span className={`
          px-2 py-1 text-xs font-medium rounded-full
          ${value === 'completed' ? 'bg-green-100 text-green-800' :
            value === 'processing' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'}
        `}>
          {value}
        </span>
      )
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Videos' }
        ]}
      />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Videos</h1>
        <Button icon={Plus}>
          Upload Video
        </Button>
      </div>

      <div className="mb-6">
        <Input
          icon={Search}
          placeholder="Search videos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Table
        data={sortedData}
        columns={columns}
        isLoading={isLoading}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={toggleSort}
      />
    </div>
  );
}