import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import { format } from 'date-fns';
import { type ReviewRequest } from '../types';

export async function generateReviewRequestPDF(request: ReviewRequest): Promise<Blob> {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.width;
  let yPos = 20;

  // Add header with logo
  pdf.setFontSize(24);
  pdf.setTextColor(0, 0, 0);
  pdf.text('ATLAS Review Request', pageWidth / 2, yPos, { align: 'center' });
  yPos += 20;

  // Generate QR code with request details
  const qrData = {
    id: request.id,
    createdAt: request.createdAt,
    priority: request.priority,
    status: request.status,
    videos: request.videos.length,
    cost: request.cost.total,
    url: window.location.origin + '/dashboard/reports/' + request.id
  };
  
  const qrCodeData = await QRCode.toDataURL(JSON.stringify(qrData));
  const qrSize = 40;
  pdf.addImage(qrCodeData, 'PNG', pageWidth - 50, yPos - 15, qrSize, qrSize);

  // Add request details
  pdf.setFontSize(12);
  pdf.text(`Request ID: ${request.id}`, 20, yPos);
  yPos += 10;
  pdf.text(`Date: ${format(new Date(request.createdAt), 'MMMM do, yyyy')}`, 20, yPos);
  yPos += 10;
  pdf.text(`Priority: ${request.priority.toUpperCase()}`, 20, yPos);
  yPos += 10;
  pdf.text(`Status: ${request.status}`, 20, yPos);
  yPos += 20;

  // Add officers section if present
  if (request.officers && request.officers.length > 0) {
    pdf.setFontSize(14);
    pdf.text('Officers', 20, yPos);
    yPos += 10;
    pdf.setFontSize(12);
    request.officers.forEach(officer => {
      pdf.text(`• ${officer.name} (${officer.badge})`, 25, yPos);
      yPos += 7;
    });
    yPos += 10;
  }

  // Add videos section
  pdf.setFontSize(14);
  pdf.text('Videos', 20, yPos);
  yPos += 10;
  pdf.setFontSize(12);

  request.videos.forEach(video => {
    pdf.text(`• ${video.name}`, 25, yPos);
    yPos += 7;
    pdf.setTextColor(100);
    pdf.text(`  Size: ${(video.size / (1024 * 1024)).toFixed(2)} MB`, 30, yPos);
    yPos += 7;
    pdf.text(`  Duration: ${Math.round(video.duration / 60)} minutes`, 30, yPos);
    yPos += 10;
    pdf.setTextColor(0);
  });

  // Add cost breakdown
  yPos += 10;
  pdf.setFontSize(14);
  pdf.text('Cost Breakdown', 20, yPos);
  yPos += 10;
  pdf.setFontSize(12);

  pdf.text(`Base Price: $${request.cost.basePrice.toFixed(2)}`, 25, yPos);
  yPos += 7;

  if (request.cost.priorityFee > 0) {
    pdf.text(`Priority Fee: $${request.cost.priorityFee.toFixed(2)}`, 25, yPos);
    yPos += 7;
  }

  if (request.cost.quantityDiscount > 0) {
    pdf.text(`Quantity Discount: -$${request.cost.quantityDiscount.toFixed(2)}`, 25, yPos);
    yPos += 7;
  }

  yPos += 5;
  pdf.setFontSize(14);
  pdf.text('Total Cost:', 25, yPos);
  pdf.setTextColor(0, 87, 183); // Blue color for total
  pdf.text(`$${request.cost.total.toFixed(2)}`, 80, yPos);

  // Add footer
  pdf.setFontSize(10);
  pdf.setTextColor(128);
  const footer = `Generated on ${format(new Date(), 'PPpp')}`;
  pdf.text(footer, pageWidth / 2, pdf.internal.pageSize.height - 10, { align: 'center' });

  return pdf.output('blob');
}