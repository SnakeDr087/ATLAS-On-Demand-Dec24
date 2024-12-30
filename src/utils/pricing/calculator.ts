import { type VideoFile } from '../../types';
import { type PricingBreakdown, type VideoPrice } from './types';
import { calculateBasePrice } from './basePrice';
import { calculateVolumeDiscount } from './volumeDiscount';
import { calculateSizeSurcharge } from './sizeSurcharge';

export function calculateVideoPrice(video: VideoFile): VideoPrice {
  const basePrice = calculateBasePrice(video.duration);
  const fileSizeSurcharge = calculateSizeSurcharge(video.size);
  
  return {
    basePrice,
    fileSizeSurcharge,
    totalPrice: basePrice + fileSizeSurcharge
  };
}

export function calculatePricing(videos: VideoFile[]): PricingBreakdown {
  // Calculate individual video prices
  const videoPrices = videos.map(video => calculateVideoPrice(video));
  
  // Calculate totals
  const baseTotal = videoPrices.reduce((sum, price) => sum + price.basePrice, 0);
  const surchargeTotal = videoPrices.reduce((sum, price) => sum + price.fileSizeSurcharge, 0);
  const volumeDiscount = calculateVolumeDiscount(videos.length, baseTotal);
  
  // Calculate final total
  const finalTotal = baseTotal - volumeDiscount + surchargeTotal;
  
  return {
    videos: videoPrices,
    baseTotal,
    volumeDiscount,
    surchargeTotal,
    finalTotal
  };
}