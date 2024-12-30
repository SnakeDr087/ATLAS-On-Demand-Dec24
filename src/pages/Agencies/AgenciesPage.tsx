import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { AgencyTable } from './components/AgencyTable';
import { AgencyForm } from './components/AgencyForm';
import { AgencyStats } from './components/AgencyStats';
import { useAgencies } from './hooks/useAgencies';
import { type Agency } from '../../types';

export function AgenciesPage() {
  const { agencies, addAgency, updateAgency, deleteAgency } = useAgencies();
  const [showForm, setShowForm] = useState(false);
  const [editingAgency, setEditingAgency] = useState<Agency | null>(null);

  const handleSubmit = (agency: Agency) => {
    if (editingAgency) {
      updateAgency(agency);
    } else {
      addAgency(agency);
    }
    setShowForm(false);
    setEditingAgency(null);
  };

  const handleEdit = (agency: Agency) => {
    setEditingAgency(agency);
    setShowForm(true);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Agencies</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Agency
        </button>
      </div>

      <AgencyStats agencies={agencies} />

      {showForm && (
        <AgencyForm
          agency={editingAgency}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingAgency(null);
          }}
        />
      )}

      <AgencyTable
        agencies={agencies}
        onEdit={handleEdit}
        onDelete={deleteAgency}
      />
    </div>
  );
}