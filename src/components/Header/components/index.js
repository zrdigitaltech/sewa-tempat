'use client';
import dynamic from 'next/dynamic';

export const Mobile = dynamic(() => import('./Mobile'), {
  ssr: false,
  loading: () => null
});

export const Desktop = dynamic(() => import('./Desktop'), {
  ssr: false,
  loading: () => null
});
