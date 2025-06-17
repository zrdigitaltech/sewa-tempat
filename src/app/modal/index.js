'use client';
import dynamic from 'next/dynamic';

export { default as KonsultasiModal } from './Konsultasi';
export { default as LaporkanIklanModal } from './LaporkanIklan';
export { default as HubungiPengiklanPropertiModal } from './HubungiPengiklanProperti';
export { default as BeriSaranModal } from './BeriSaran';

export const ShareModal = dynamic(() => import('./Share'), {
  ssr: false
});
