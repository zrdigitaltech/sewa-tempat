'use client';
import React, { Fragment } from 'react';

export default function Index() {
  return (
    <Fragment>
      <h2 className="fw-bold mb-4">📋 Daftar Peminat Properti</h2>

      <p>
        Saat ada pengguna yang tertarik dengan iklanmu, kamu bisa melihat detailnya melalui menu{' '}
        <strong>Daftar Peminat</strong>. Fitur ini membantu kamu mengelola dan menindaklanjuti calon
        penyewa atau pembeli dengan lebih mudah.
      </p>

      <div className="row align-items-center mb-5">
        <div className="col-lg-6 mb-4 mb-lg-0">
          <h4 className="fw-semibold mb-3">Apa Saja yang Bisa Kamu Lihat?</h4>
          <ul className="ps-3">
            <li className="mb-2">
              <strong>Status Peminat:</strong> Tersedia dalam 3 kategori untuk mempermudah tindak
              lanjut:
              <ol className="ps-4">
                <li>Baru</li>
                <li>Hubungi Segera</li>
                <li>Sudah Dihubungi</li>
              </ol>
            </li>
            <li className="mb-2">
              <strong>Link Iklan:</strong> Tautan langsung ke iklan properti yang diminati
            </li>
            <li className="mb-2">
              <strong>Format Pesan WhatsApp:</strong> Tersedia template pesan siap pakai untuk
              mempermudah proses follow-up
            </li>
          </ul>
        </div>

        <div className="col-lg-6">
          <img
            src="https://placehold.co/722x358"
            alt="Ilustrasi Daftar Peminat"
            className="w-100 rounded shadow-sm"
          />
        </div>
      </div>
    </Fragment>
  );
}
