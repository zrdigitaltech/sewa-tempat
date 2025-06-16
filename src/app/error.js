'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Laporkan error ke layanan monitoring jika diperlukan
    console.error(error);
  }, [error]);

  return (
    <section className="my-5">
      <div className="container">
        <div className="d-flex justify-content-center row">
          <div className="col-sm-12 col-md-12 text-center" data-aos="zoom-in" data-aos-delay="0">
            <h2>Ups! Terjadi kesalahan.</h2>
            <p>Maaf, halaman yang Anda cari tidak dapat ditampilkan saat ini.</p>
            <div onClick={() => reset()} className="btn btn-warning mt-3">
              Coba Lagi
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
