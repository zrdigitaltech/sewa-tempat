'use client';
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';

export default function Index() {
  return (
    <section
      className="align-items-center d-flex position-relative text-white"
      style={{
        minHeight: '54vh',
        backgroundImage: "url('https://placehold.co/800x600')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '3rem 0',
        scrollBehavior: 'smooth'
      }}
    >
      <div className="container position-relative h-100 text-primary">
        <div className="d-flex flex-column justify-content-center align-items-center text-center h-100">
          <h1 className="fw-bold display-5 mb-3">Pasang & Kelola Iklan Lebih Gampang</h1>
          <p className="lead mb-4">
            Manfaatkan fitur dari <strong>sewaTempat.Com</strong> untuk mengelola properti lebih
            efisien.
          </p>

          <span className="fw-bold mb-3 fs-5">Pelajari Selengkapnya</span>
          {/* Link scroll ke bawah */}
          <a
            href="#ProdukBooster"
            className="text-white text-decoration-none mt-2 d-flex align-items-center gap-2"
          >
            <FontAwesomeIcon icon={faChevronCircleDown} className="text-primary fs-2" />
          </a>
        </div>
      </div>
    </section>
  );
}
