import React from 'react';
import { FileText, Download, Mail, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { generateReviewRequestPDF } from '../../utils/pdf';
import { type ReviewRequest } from '../../types';

interface ReviewTicketProps {
  request: ReviewRequest;
}

export function ReviewTicket({ request }: ReviewTicketProps) {
  const handleDownloadPDF = async () => {
    try {
      const pdfBlob = await generateReviewRequestPDF(request);
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `review-request-${request.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`Review Request ${request.id}`);
    const body = encodeURIComponent(`
      Review Request Details:
      ID: ${request.id}
      Status: ${request.status}
      Priority: ${request.priority}
      Videos: ${request.videos.length}
      Total Cost: $${request.cost.total.toFixed(2)}
    `);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleAddToCalendar = () => {
    const deadline = new Date(request.deadline);
    const event = {
      text: `Review Request ${request.id} Due`,
      dates: deadline.toISOString(),
      details: `Review request ${request.id} is due for completion.
Priority: ${request.priority}
Videos: ${request.videos.length}
Total Cost: $${request.cost.total.toFixed(2)}`
    };

    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.text)}&dates=${encodeURIComponent(event.dates)}/${encodeURIComponent(event.dates)}&details=${encodeURIComponent(event.details)}`;
    window.open(googleUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          <FileText className="w-6 h-6 mr-2 text-blue-600" />
          Review Ticket
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={handleDownloadPDF}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </button>
          <button
            onClick={handleSendEmail}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            <Mail className="w-4 h-4 mr-2" />
            Email
          </button>
          <button
            onClick={handleAddToCalendar}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Add to Calendar
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:space-x-8">
          <div className="mb-4 sm:mb-0">
            <p className="text-sm font-medium text-gray-500">Ticket ID</p>
            <p className="mt-1 text-lg font-mono">{request.id}</p>
          </div>
          <div className="mb-4 sm:mb-0">
            <p className="text-sm font-medium text-gray-500">Submission Date</p>
            <p className="mt-1 text-lg">
              {format(new Date(request.createdAt), 'MMM d, yyyy h:mm a')}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Status</p>
            <p className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
              ${request.status === 'completed' ? 'bg-green-100 text-green-800' :
                request.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'}`}>
              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
            </p>
          </div>
        </div>

        {/* Summary Section */}
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-lg font-medium mb-4">Review Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Videos</p>
              <p className="mt-1">{request.videos.length} videos uploaded</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Officers</p>
              <p className="mt-1">{request.officers.length} officers involved</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Priority</p>
              <p className="mt-1">
                {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                {' ('}
                {request.priority === 'urgent' ? '48 hours' :
                 request.priority === 'priority' ? '7 days' : '14 days'}
                {')'}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Cost</p>
              <p className="mt-1 text-blue-600 font-medium">
                ${request.cost.total.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}