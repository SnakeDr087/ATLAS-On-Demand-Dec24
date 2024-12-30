import React from 'react';
import { Download, Share2, Printer } from 'lucide-react';
import { type PerformanceReport } from '../../../types/reports';
import { generateReportPDF, shareReport, printReport } from '../../../utils/reports';

interface ReportActionsProps {
  report: PerformanceReport;
}

export function ReportActions({ report }: ReportActionsProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      const pdfBlob = await generateReportPDF(report);
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `performance-report-${report.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      setIsLoading(true);
      await shareReport(report);
    } catch (error) {
      console.error('Failed to share report:', error);
      alert('Failed to share report. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = () => {
    try {
      setIsLoading(true);
      printReport(report);
    } catch (error) {
      console.error('Failed to print report:', error);
      alert('Failed to print report. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-t pt-4 mt-6">
      <div className="flex justify-end space-x-4">
        <button
          onClick={handleDownload}
          disabled={isLoading}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-4 h-4 mr-2" />
          {isLoading ? 'Processing...' : 'Download PDF'}
        </button>
        <button
          onClick={handleShare}
          disabled={isLoading}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </button>
        <button
          onClick={handlePrint}
          disabled={isLoading}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Printer className="w-4 h-4 mr-2" />
          Print
        </button>
      </div>
    </div>
  );
}