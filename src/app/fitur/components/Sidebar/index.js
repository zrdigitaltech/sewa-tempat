'use client';
import React, { Fragment, useState, useEffect } from 'react';

export default function Index(props) {
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
      <div className="sticky-top z-0" style={{ top: '100px' }}>
        <ul className="list-unstyled">
          <li className="mb-3">
            <a
              href="#ProdukBooster"
              className={`d-flex align-items-center w-100 text-start cursor-pointer p-2 ${
                activeId === 'ProdukBooster'
                  ? 'text-primary fw-semibold border-start border-4 border-primary bg-light ps-3'
                  : 'text-dark bg-transparent'
              }`}
              style={{ transition: 'all 0.3s ease' }}
            >
              Produk Booster
            </a>
          </li>
          <li className="mb-3">
            <a
              href="#DaftarPeminat"
              className={`d-flex align-items-center w-100 text-start cursor-pointer p-2 ${
                activeId === 'DaftarPeminat'
                  ? 'text-primary fw-semibold border-start border-4 border-primary bg-light ps-3'
                  : 'text-dark bg-transparent'
              }`}
              style={{ transition: 'all 0.3s ease' }}
            >
              Daftar Peminat
            </a>
          </li>
        </ul>
      </div>
    </Fragment>
  );
}
