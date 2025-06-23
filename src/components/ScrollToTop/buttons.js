'use client';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { usePathname } from 'next/navigation';

import './scrolltotop.scss';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [bottomSpacing, setBottomSpacing] = useState('1rem');
  const pathname = usePathname();

  useEffect(() => {
    // Fungsi untuk menentukan spacing bottom dinamis
    const updateBottomSpacing = () => {
      const isMobile = window.innerWidth < 768; // <768px = mobile
      if (pathname.includes('/properti/')) {
        setBottomSpacing(isMobile ? '7.2rem' : '1rem');
      } else if (pathname.includes('/pemilik/')) {
        setBottomSpacing(isMobile ? '5rem' : '1rem');
      } else {
        setBottomSpacing('1rem');
      }
    };

    updateBottomSpacing(); // inisialisasi
    window.addEventListener('resize', updateBottomSpacing);

    return () => {
      window.removeEventListener('resize', updateBottomSpacing);
    };
  }, [pathname]);

  // Toggle tombol scroll
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`ST--scroll-to-top btn btn-primary rounded-circle shadow ${
        isVisible ? 'show' : 'd-none'
      }`}
      aria-label="Scroll to top"
      style={{
        bottom: bottomSpacing,
        right: '1rem',
        position: 'fixed',
        zIndex: 999
      }}
    >
      <FontAwesomeIcon icon={faArrowUp} />
    </button>
  );
}
