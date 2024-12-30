import React from 'react';
import { type BWCReview } from '../../../types/reports';

interface BWCReviewFormProps {
  initialData?: BWCReview;
  onSubmit: (data: BWCReview) => void;
  onCancel: () => void;
}

export function BWCReviewForm({ initialData, onSubmit, onCancel }: BWCReviewFormProps) {
  const [formData, setFormData] = React.useState<Partial<BWCReview>>(
    initialData || {
      analysis: {
        professionalDemeanor: 3,
        communicationSkills: 3,
        tacticalDecisions: 3,
        policyAdherence: true,
        policyDeviations: [],
        justifications: [],
        sceneControl: 3,
        officerSafety: 3,
        publicSafety: 3,
        deEscalationEfforts: [],
        deEscalationEffectiveness: 3,
        notableActions: [],
        concernAreas: [],
        trainingOpportunities: []
      },
      summary: {
        overview: '',
        keyFindings: [],
        recommendations: [],
        requiredActions: []
      }
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as BWCReview);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Incident Details */}
          <section>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Incident Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Incident Date</label>
                <input
                  type="datetime-local"
                  value={formData.incidentDate}
                  onChange={(e) => setFormData({ ...formData, incidentDate: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Incident Type</label>
                <select
                  value={formData.incidentType}
                  onChange={(e) => setFormData({ ...formData, incidentType: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="traffic">Traffic Stop</option>
                  <option value="suspicious">Suspicious Activity</option>
                  <option value="domestic">Domestic</option>
                  <option value="mental">Mental Health</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </section>

          {/* Analysis Sections */}
          <section>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Assessment</h3>
            <div className="space-y-4">
              {/* Professional Demeanor */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Professional Demeanor</label>
                <div className="flex items-center space-x-4 mt-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <label key={value} className="flex items-center">
                      <input
                        type="radio"
                        value={value}
                        checked={formData.analysis?.professionalDemeanor === value}
                        onChange={(e) => setFormData({
                          ...formData,
                          analysis: {
                            ...formData.analysis!,
                            professionalDemeanor: parseInt(e.target.value)
                          }
                        })}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">{value}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional assessment fields would follow similar pattern */}
            </div>
          </section>

          {/* Summary Section */}
          <section>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Review Summary</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Overview</label>
                <textarea
                  value={formData.summary?.overview}
                  onChange={(e) => setFormData({
                    ...formData,
                    summary: {
                      ...formData.summary!,
                      overview: e.target.value
                    }
                  })}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </section>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}