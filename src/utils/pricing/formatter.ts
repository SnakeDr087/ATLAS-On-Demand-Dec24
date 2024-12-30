import { type PricingBreakdown } from './types';

export function formatPricingBreakdown(pricing: PricingBreakdown): string {
  const lines = [
    'Pricing Breakdown:',
    `Base Total: $${pricing.baseTotal.toFixed(2)}`,
    pricing.volumeDiscount > 0 ? `Volume Discount: -$${pricing.volumeDiscount.toFixed(2)}` : null,
    pricing.surchargeTotal > 0 ? `Size Surcharges: $${pricing.surchargeTotal.toFixed(2)}` : null,
    `Final Total: $${pricing.finalTotal.toFixed(2)}`
  ];

  return lines.filter(Boolean).join('\n');
}