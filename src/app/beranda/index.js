// Home Page
'use client';
import React, { Fragment } from 'react';
import { Banner, TipeProperti, Properti, Panduan } from '@/app/beranda/components';

export default function Index() {
  return (
    <Fragment>
      {/* Hero Banner */}
      <Banner />

      {/* Kategori */}
      <TipeProperti />

      {/* Properti Terbaru */}
      <Properti />

      {/* Panduan Sewa */}
      <Panduan />
    </Fragment>
  );
}
