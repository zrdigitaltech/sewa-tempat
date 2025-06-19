'use client';

import React, { Fragment, useEffect, useState } from 'react';
import { Hero, Sidebar, ProdukBooster, DaftarPeminat, SidebarTabs } from '@/app/fitur/components';

export default function Index() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      const timeout = setTimeout(() => {
        const target = document.querySelectorAll(hash);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => setIsMobile(window.innerWidth <= 480);
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <Fragment>
      <Hero />

      <section className="pt-lg-5 pb-5 bg-light">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <SidebarTabs />
            <div className="col-md-3 mb-4 mb-md-0 d-none d-lg-block">
              <Sidebar />
            </div>

            {/* Konten kanan */}
            <div className="col-md-9">
              <div className="animate__animated animate__fadeIn">
                <section
                  className="pb-5"
                  id="ProdukBooster"
                  style={{ scrollMarginTop: isMobile ? '140px' : '100px' }}
                >
                  <ProdukBooster />
                </section>
                <section
                  id="DaftarPeminat"
                  style={{ scrollMarginTop: isMobile ? '140px' : '100px' }}
                >
                  <DaftarPeminat />
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
