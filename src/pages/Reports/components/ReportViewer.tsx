import React from 'react';
import { X, Download, FileText } from 'lucide-react';
import { type PerformanceReport } from '../../../types/reports';
import { ReportContent } from './ReportContent';
import { ReportMetadata } from './ReportMetadata';
import { ReportActions } from './ReportActions';

interface ReportViewerProps {
  report: PerformanceReport;
  onClose: () => void;
}

export function ReportViewer({ report, onClose }: ReportViewerProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Report Details</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 space-y-6">
        <ReportMetadata report={report} />
        <ReportContent report={report} />
        <ReportActions report={report} />
      </div>
    </div>
  );
}