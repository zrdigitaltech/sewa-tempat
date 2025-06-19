'use client';
import React, { Fragment, useState, useEffect } from 'react';

import '@/app/tentang-kami/tentangKami.scss';

export default function Tabs() {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['ProdukBooster', 'DaftarPeminat'];
      let found = '';

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            found = id;
            break;
          }
        }
      }

      setActiveId(found);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Fragment>
      <section
        className="bg-light pt-3 border-top border-bottom position-sticky mb-3 d-block d-lg-none"
        style={{ top: '4.5rem', zIndex: 1 }}>
        <div className="container-fluid px-3">
          <div className="ST-nav-tabs-scroll-wrapper overflow-auto">
            <div className="d-flex flex-nowrap justify-content-center gap-4 ST-nav-tabs-custom">
              <a
                href="#ProdukBooster"
                className={`cursor-pointer tab-link ${activeId === 'ProdukBooster' ? 'active' : ''}`}>
                Produk Booster
              </a>
              <a
                href="#DaftarPeminat"
                className={`cursor-pointer tab-link ${activeId === 'DaftarPeminat' ? 'active' : ''}`}>
                Daftar Peminat
              </a>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
