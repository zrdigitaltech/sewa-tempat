'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Tooltips() {
  const pathname = usePathname();

  useEffect(() => {
    let tooltipList = [];

    const initTooltips = async () => {
      const bootstrap = await import('bootstrap/dist/js/bootstrap.esm.js');
      const triggerEls = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      tooltipList = [...triggerEls].map((el) => new bootstrap.Tooltip(el));
    };

    const disposeTooltips = () => {
      tooltipList.forEach((tip) => tip.dispose());
      tooltipList = [];
    };

    const delayInit = setTimeout(() => {
      disposeTooltips();
      initTooltips();
    }, 100);

    return () => {
      clearTimeout(delayInit);
      disposeTooltips();
    };
  }, [pathname]);

  return null;
}
