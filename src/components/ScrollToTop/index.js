'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const hash = window.location.hash;

      if (hash) {
        // Tunggu sampai elemen dengan id ada
        const interval = setInterval(() => {
          const target = document.querySelector(hash);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            clearInterval(interval);
          }
        }, 100);

        // Stop polling setelah 2 detik
        setTimeout(() => clearInterval(interval), 2000);
      } else {
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }
    };

    // Tunggu 100ms agar DOM selesai
    const timeout = setTimeout(() => {
      handleScroll();
    }, 100);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}
