'use client';

import { Fragment, useEffect } from 'react';
import { Hero, Sidebar, ProdukBooster, DaftarPeminat } from '@/app/fitur/components';

export default function Index() {
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

  return (
    <Fragment>
      <Hero />

      <section className="py-5 bg-light">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-md-3 mb-4 mb-md-0">
              <Sidebar />
            </div>

            {/* Konten kanan */}
            <div className="col-md-9">
              <div className="animate__animated animate__fadeIn">
                <section className="pb-5" id="ProdukBooster" style={{ scrollMarginTop: '120px' }}>
                  <ProdukBooster />
                </section>
                <section id="DaftarPeminat" style={{ scrollMarginTop: '120px' }}>
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
