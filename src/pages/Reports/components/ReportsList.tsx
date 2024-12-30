import React from 'react';
import { format } from 'date-fns';
import { FileText, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { type PerformanceReport } from '../../../types/reports';

interface ReportsListProps {
  reports: PerformanceReport[];
  selectedReport: PerformanceReport | null;
  onSelect: (report: PerformanceReport) => void;
}

export function ReportsList({ reports, selectedReport, onSelect }: ReportsListProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="divide-y divide-gray-200">
        {reports.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No reports available
          </div>
        ) : (
          reports.map((report) => (
            <button
              key={report.id}
              onClick={() => onSelect(report)}
              className={`w-full px-4 py-3 flex items-center hover:bg-gray-50 transition-colors ${
                selectedReport?.id === report.id ? 'bg-blue-50' : ''
              }`}
            >
              <div className="mr-3">
                {getStatusIcon(report.status)}
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-sm font-medium text-gray-900">
                  {report.summary.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {format(new Date(report.createdAt), 'MMM d, yyyy h:mm a')}
                </p>
              </div>
              <div className={`px-2 py-1 text-xs font-medium rounded-full
                ${report.analysis.metadata.riskLevel === 'high' ? 'bg-red-100 text-red-800' :
                  report.analysis.metadata.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'}`}>
                {report.analysis.metadata.riskLevel}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}