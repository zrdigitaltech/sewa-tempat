'use client';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

import './scrolltotop.scss';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

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
      aria-label="Scroll to top">
      <FontAwesomeIcon icon={faArrowUp} />
    </button>
  );
}
