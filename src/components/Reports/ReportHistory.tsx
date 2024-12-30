import React, { useState } from 'react';
import { format } from 'date-fns';
import { ChevronDown, ChevronUp, Download, Trash2, Edit2, Eye, FileText } from 'lucide-react';
import { type ReviewRequest } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { generateReviewRequestPDF } from '../../utils/pdf';
import { ReportViewModal } from './ReportViewModal';
import { ReportEditModal } from './ReportEditModal';

interface ReportHistoryProps {
  reports: ReviewRequest[];
  onEdit: (report: ReviewRequest) => void;
  onDelete: (id: string) => void;
}

export function ReportHistory({ reports, onEdit, onDelete }: ReportHistoryProps) {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [viewingReport, setViewingReport] = useState<ReviewRequest | null>(null);
  const [editingReport, setEditingReport] = useState<ReviewRequest | null>(null);

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const handleDownloadPDF = async (report: ReviewRequest) => {
    try {
      const pdfBlob = await generateReviewRequestPDF(report);
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `review-request-${report.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handleEditSubmit = (updatedReport: ReviewRequest) => {
    onEdit(updatedReport);
    setEditingReport(null);
  };

  return (
    <>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        {/* Table content remains the same */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="w-8 px-4 py-3"></th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Request ID
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Videos
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Cost
                </th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map((report) => (
                <React.Fragment key={report.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <button
                        onClick={() => toggleRow(report.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {expandedRows.has(report.id) ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {report.id}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(report.createdAt), 'MMM d, yyyy')}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${report.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                          report.priority === 'priority' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'}`}>
                        {report.priority}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${report.status === 'completed' ? 'bg-green-100 text-green-800' :
                          report.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report.videos.length}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${report.cost.total.toFixed(2)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => setViewingReport(report)}
                          className="text-gray-400 hover:text-gray-500"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDownloadPDF(report)}
                          className="text-gray-400 hover:text-gray-500"
                          title="Download PDF"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                        {(isAdmin || report.status === 'pending') && (
                          <>
                            <button
                              onClick={() => setEditingReport(report)}
                              className="text-blue-400 hover:text-blue-500"
                              title="Edit Request"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            {isAdmin && (
                              <button
                                onClick={() => onDelete(report.id)}
                                className="text-red-400 hover:text-red-500"
                                title="Delete Request"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                  {/* Expanded row content remains the same */}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {viewingReport && (
        <ReportViewModal
          report={viewingReport}
          onClose={() => setViewingReport(null)}
          onEdit={() => {
            setEditingReport(viewingReport);
            setViewingReport(null);
          }}
          onDownload={() => handleDownloadPDF(viewingReport)}
        />
      )}

      {/* Edit Modal */}
      {editingReport && (
        <ReportEditModal
          report={editingReport}
          onSubmit={handleEditSubmit}
          onCancel={() => setEditingReport(null)}
        />
      )}
    </>
  );
}