import React, { useState } from 'react';
import { Plus, Upload } from 'lucide-react';
import { OfficerTable } from './components/OfficerTable';
import { OfficerForm } from '../../components/Officers/OfficerForm';
import { CSVImport } from '../../components/Officers/CSVImport';
import { useOfficers } from '../../hooks/useOfficers';
import { type Officer } from '../../types/officer';

export function OfficersPage() {
  const { officers, addOfficer, updateOfficer, deleteOfficer, importOfficers } = useOfficers();
  const [showForm, setShowForm] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [editingOfficer, setEditingOfficer] = useState<Officer | null>(null);

  const handleSubmit = async (officer: Omit<Officer, 'id'>) => {
    if (editingOfficer) {
      await updateOfficer({ ...officer, id: editingOfficer.id });
    } else {
      await addOfficer(officer);
    }
    setShowForm(false);
    setEditingOfficer(null);
  };

  const handleImport = async (file: File) => {
    await importOfficers(file);
    setShowImport(false);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Officers</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowImport(true)}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Upload className="w-4 h-4 mr-2" />
            Import CSV
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Officer
          </button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
            <h2 className="text-xl font-semibold mb-6">
              {editingOfficer ? 'Edit Officer' : 'Add New Officer'}
            </h2>
            <OfficerForm
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingOfficer(null);
              }}
              initialData={editingOfficer}
            />
          </div>
        </div>
      )}

      {showImport && (
        <CSVImport
          onClose={() => setShowImport(false)}
          onImport={handleImport}
        />
      )}

      <OfficerTable
        officers={officers}
        onEdit={(officer) => {
          setEditingOfficer(officer);
          setShowForm(true);
        }}
        onDelete={deleteOfficer}
      />
    </div>
  );
}