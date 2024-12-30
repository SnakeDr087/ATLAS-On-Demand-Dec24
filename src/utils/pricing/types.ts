export interface VideoPrice {
  basePrice: number;
  fileSizeSurcharge: number;
  totalPrice: number;
}

export interface PricingBreakdown {
  videos: VideoPrice[];
  baseTotal: number;
  volumeDiscount: number;
  surchargeTotal: number;
  finalTotal: number;
}