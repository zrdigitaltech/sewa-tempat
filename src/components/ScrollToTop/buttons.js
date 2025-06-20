'use client';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

import './scrolltotop.scss';

import { usePathname } from 'next/navigation';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  // Atur posisi bottom berdasarkan URL
  const bottomSpacing = pathname.includes('/properti/')
    ? '7.2rem'
    : pathname.includes('/pemilik/')
      ? '5rem'
      : '1rem';

  // Tampilkan tombol jika scroll > 300px
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll ke atas
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
        bottom: bottomSpacing
      }}>
      <FontAwesomeIcon icon={faArrowUp} />
    </button>
  );
}
