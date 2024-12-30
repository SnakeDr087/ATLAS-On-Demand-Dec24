import { jsPDF } from 'jspdf';
import { type PerformanceReport } from '../types/reports';

export async function generateReportPDF(report: PerformanceReport): Promise<Blob> {
  const pdf = new jsPDF();
  let yPos = 20;
  const pageWidth = pdf.internal.pageSize.width;

  // Add header
  pdf.setFontSize(24);
  pdf.setTextColor(0, 0, 0);
  pdf.text('Performance Analysis Report', pageWidth / 2, yPos, { align: 'center' });
  yPos += 20;

  // Add report details
  pdf.setFontSize(12);
  pdf.text(`Report ID: ${report.id}`, 20, yPos);
  yPos += 10;
  pdf.text(`Date: ${new Date(report.createdAt).toLocaleDateString()}`, 20, yPos);
  yPos += 10;
  pdf.text(`Status: ${report.status}`, 20, yPos);
  yPos += 20;

  // Add overview
  pdf.setFontSize(14);
  pdf.text('Overview', 20, yPos);
  yPos += 10;
  pdf.setFontSize(12);
  const overviewLines = pdf.splitTextToSize(report.summary.overview, pageWidth - 40);
  pdf.text(overviewLines, 20, yPos);
  yPos += overviewLines.length * 7 + 10;

  // Add key findings
  pdf.setFontSize(14);
  pdf.text('Key Findings', 20, yPos);
  yPos += 10;
  pdf.setFontSize(12);
  report.summary.keyFindings.forEach(finding => {
    const lines = pdf.splitTextToSize(`• ${finding}`, pageWidth - 40);
    pdf.text(lines, 20, yPos);
    yPos += lines.length * 7;
  });
  yPos += 10;

  // Add recommendations
  pdf.setFontSize(14);
  pdf.text('Recommendations', 20, yPos);
  yPos += 10;
  pdf.setFontSize(12);
  report.summary.recommendations.forEach(rec => {
    const lines = pdf.splitTextToSize(`• ${rec}`, pageWidth - 40);
    pdf.text(lines, 20, yPos);
    yPos += lines.length * 7;
  });

  // Add footer
  pdf.setFontSize(10);
  pdf.setTextColor(128);
  const footer = `Generated on ${new Date().toLocaleString()}`;
  pdf.text(footer, pageWidth / 2, pdf.internal.pageSize.height - 10, { align: 'center' });

  return pdf.output('blob');
}

export async function shareReport(report: PerformanceReport): Promise<void> {
  const shareData = {
    title: 'Performance Analysis Report',
    text: report.summary.overview,
    url: window.location.href
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert('Report link copied to clipboard!');
    }
  } catch (error) {
    console.error('Error sharing report:', error);
    throw error;
  }
}

export function printReport(report: PerformanceReport): void {
  const printContent = `
    <html>
      <head>
        <title>Performance Analysis Report</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { color: #1a56db; }
          h2 { color: #374151; margin-top: 20px; }
          .metadata { color: #6b7280; margin-bottom: 20px; }
          .section { margin-bottom: 30px; }
          .finding, .recommendation { margin: 10px 0; padding-left: 20px; }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <h1>Performance Analysis Report</h1>
        <div class="metadata">
          <div>Report ID: ${report.id}</div>
          <div>Generated: ${new Date(report.createdAt).toLocaleString()}</div>
        </div>
        
        <div class="section">
          <h2>Overview</h2>
          <p>${report.summary.overview}</p>
        </div>

        <div class="section">
          <h2>Key Findings</h2>
          ${report.summary.keyFindings.map(finding => 
            `<div class="finding">• ${finding}</div>`
          ).join('')}
        </div>

        <div class="section">
          <h2>Recommendations</h2>
          ${report.summary.recommendations.map(rec => 
            `<div class="recommendation">• ${rec}</div>`
          ).join('')}
        </div>
      </body>
    </html>
  `;

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    console.error('Failed to open print window');
    return;
  }

  printWindow.document.write(printContent);
  printWindow.document.close();
  printWindow.focus();

  // Wait for content to load before printing
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 250);
}