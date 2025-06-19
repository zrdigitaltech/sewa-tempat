'use client';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PanduanCoverImage = ({ coverImage, isLoading }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const height = isMobile ? '40vh' : '630px';

  if (isLoading) {
    return (
      <div className="w-100">
        <Skeleton height={height} width="100%" />
      </div>
    );
  }

  if (!coverImage) return null;

  return (
    <div
      className="w-100"
      style={{
        height,
        minHeight: '220px',
        backgroundImage: `url(${coverImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        borderRadius: '8px'
      }}
    />
  );
};

export default PanduanCoverImage;
