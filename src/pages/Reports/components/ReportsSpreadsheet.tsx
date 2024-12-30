import React, { useState } from 'react';
import { format } from 'date-fns';
import { ChevronDown, ChevronUp, Download, Trash2, Edit2, Eye, FileText } from 'lucide-react';
import { type ReviewRequest } from '../../../types';
import { useAuth } from '../../../contexts/AuthContext';
import { generateReviewRequestPDF } from '../../../utils/pdf';

interface ReportsSpreadsheetProps {
  reports: ReviewRequest[];
  onEdit: (report: ReviewRequest) => void;
  onDelete: (id: string) => void;
  onView: (report: ReviewRequest) => void;
}

export function ReportsSpreadsheet({ reports, onEdit, onDelete, onView }: ReportsSpreadsheetProps) {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [sortField, setSortField] = useState<keyof ReviewRequest>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedReports, setSelectedReports] = useState<Set<string>>(new Set());

  const handleSort = (field: keyof ReviewRequest) => {
    if (field === sortField) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
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

  const sortedReports = [...reports].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    const direction = sortDirection === 'asc' ? 1 : -1;

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue) * direction;
    }
    return ((aValue as number) - (bValue as number)) * direction;
  });

  const SortIcon = ({ field }: { field: keyof ReviewRequest }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4" /> : 
      <ChevronDown className="w-4 h-4" />;
  };

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">Review Requests History</h2>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  { key: 'id', label: 'Request ID' },
                  { key: 'createdAt', label: 'Submitted' },
                  { key: 'priority', label: 'Priority' },
                  { key: 'status', label: 'Status' },
                  { key: 'videos', label: 'Videos' },
                  { key: 'cost', label: 'Total Cost' }
                ].map(({ key, label }) => (
                  <th
                    key={key}
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort(key as keyof ReviewRequest)}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{label}</span>
                      <SortIcon field={key as keyof ReviewRequest} />
                    </div>
                  </th>
                ))}
                <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {report.id}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(report.createdAt), 'MMM d, yyyy')}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${report.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                        report.priority === 'priority' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'}`}>
                      {report.priority}
                    </span>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${report.status === 'completed' ? 'bg-green-100 text-green-800' :
                        report.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.videos.length}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${report.cost.total.toFixed(2)}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => onView(report)}
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
                            onClick={() => onEdit(report)}
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}