import React from 'react';
import { RequestForm } from './components/RequestForm';
import { RequestHistory } from './components/RequestHistory';
import { RandomizerPanel } from './components/RandomizerPanel';
import { useRequestManagement } from '../../hooks/useRequestManagement';
import { PageHeader } from '../../components/common/PageHeader';

export function RequestsPage() {
  const {
    request,
    requests,
    isLoading,
    error,
    errors,
    showRandomizer,
    handleSubmit,
    handleVideoUpload,
    handleOfficerSelection,
    handlePriorityChange,
    handleTypeChange,
    handleDetailsChange,
    toggleRandomizer
  } = useRequestManagement();

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <PageHeader 
        title="Submit Review Request"
        action={{
          label: "Random Selection",
          icon: "Shuffle",
          onClick: toggleRandomizer
        }}
      />

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RequestForm
            request={request}
            isLoading={isLoading}
            errors={errors}
            onSubmit={handleSubmit}
            onVideoUpload={handleVideoUpload}
            onOfficerSelect={handleOfficerSelection}
            onPriorityChange={handlePriorityChange}
            onTypeChange={handleTypeChange}
            onDetailsChange={handleDetailsChange}
          />
        </div>
        <div>
          <RequestHistory 
            requests={requests}
            onUpdateRequest={() => {}}
            onDeleteRequest={() => {}}
          />
        </div>
      </div>

      {showRandomizer && (
        <RandomizerPanel
          onClose={toggleRandomizer}
          onOfficersSelected={handleOfficerSelection}
        />
      )}
    </div>
  );
}