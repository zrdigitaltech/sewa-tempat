'use client';
import React, { Fragment } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function Index() {
  return (
    <Fragment>
      <h2 className="fw-bold mb-4">🚀 Fitur Booster Iklan</h2>

      <div className="row align-items-center mb-5">
        <div className="col-lg-6 mb-4 mb-lg-0">
          <p>
            Ingin iklanmu tampil lebih menonjol di hasil pencarian?{' '}
            <strong>Booster dari tempatSewa.Com</strong> hadir untuk membantu iklanmu mendapatkan
            lebih banyak perhatian dari calon penyewa atau pembeli.
          </p>
          <p>
            Tersedia dua jenis Booster yang bisa kamu gunakan: <strong>Super Featured</strong> dan{' '}
            <strong>Premium</strong>. Dengan Booster, iklanmu akan ditempatkan di posisi strategis —
            bahkan bisa berada di bagian paling atas halaman pencarian!
          </p>
        </div>
        <div className="col-lg-6">
          <img
            src="https://placehold.co/722x358"
            alt="Ilustrasi Booster"
            className="w-100 rounded shadow-sm"
          />
        </div>
      </div>

      <div className="row align-items-center mb-5">
        <div className="col-lg-6 mb-4 mb-lg-0">
          <Carousel
            showArrows={true}
            showStatus={false}
            showIndicators={true}
            autoPlay={false}
            infiniteLoop={false}
            swipeable={false}
            emulateTouch={true}
            showThumbs={false}
            className="rounded-top-2 overflow-hidden"
            renderIndicator={(onClickHandler, isSelected, index, label) => {
              const style = {
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 28,
                height: 28,
                margin: '0 2px',
                color: isSelected ? '#1e3a8a' : '#bbb',
                cursor: 'pointer',
                fontSize: 20,
                borderRadius: '50%',
                transition: 'color 0.3s'
              };

              return (
                <li key={index} className="d-inline">
                  <span
                    style={style}
                    role="button"
                    tabIndex={0}
                    aria-label={`${label} ${index + 1}`}
                    onClick={onClickHandler}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onClickHandler();
                      }
                    }}
                  >
                    ●
                  </span>
                </li>
              );
            }}
          >
            {[1, 2, 3]?.map((x, i) => (
              <div key={x || i}>
                <img
                  src={`https://placehold.co/800x600`}
                  className="w-100"
                  style={{
                    // height: '330px',
                    objectFit: 'cover'
                  }}
                  alt="TempatSewa.Com Indonesia: Situs Sewa Kos, Rumah, Apartemen, Ruko, Kios, dan Gudang"
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="col-lg-6">
          <h3 className="fw-semibold mb-3">Cara Menggunakan Booster</h3>
          <ol className="ps-3">
            <li className="mb-2">Masuk ke akun kamu di tempatSewa.Com</li>
            <li className="mb-2">
              Buka menu <strong>Daftar Iklan</strong> dari profil
            </li>
            <li className="mb-2">Pastikan kamu telah berlangganan membership</li>
            <li className="mb-2">Pilih iklan yang ingin ditingkatkan visibilitasnya</li>
            <li className="mb-2">
              Klik tombol <strong>Gunakan Booster</strong>
            </li>
            <li className="mb-2">
              Pilih tipe Booster: <em>Super Featured</em> atau <em>Premium</em>
            </li>
            <li className="mb-2">Konfirmasi dan aktifkan Booster</li>
          </ol>
        </div>
      </div>

      <div className="row align-items-center mb-5">
        <div className="col-lg-6 mb-4 mb-lg-0">
          <h3 className="fw-semibold mb-3">Cara Membeli Booster</h3>
          <ol className="ps-3">
            <li className="mb-2">
              Akses menu <strong>Produk Booster</strong> dari profil
            </li>
            <li className="mb-2">
              Klik tombol <strong>Beli Booster</strong>
            </li>
            <li className="mb-2">Pilih jumlah dan tipe Booster yang ingin dibeli</li>
            <li className="mb-2">Pilih metode pembayaran yang tersedia</li>
            <li className="mb-2">Lakukan pembayaran sesuai instruksi</li>
            <li className="mb-2">Booster kamu siap digunakan!</li>
          </ol>
        </div>
        <div className="col-lg-6">
          <Carousel
            showArrows={true}
            showStatus={false}
            showIndicators={true}
            autoPlay={false}
            infiniteLoop={false}
            swipeable={false}
            emulateTouch={true}
            showThumbs={false}
            className="rounded-top-2 overflow-hidden"
            renderIndicator={(onClickHandler, isSelected, index, label) => {
              const style = {
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 28,
                height: 28,
                margin: '0 2px',
                color: isSelected ? '#1e3a8a' : '#bbb',
                cursor: 'pointer',
                fontSize: 20,
                borderRadius: '50%',
                transition: 'color 0.3s'
              };

              return (
                <li key={index} className="d-inline">
                  <span
                    style={style}
                    role="button"
                    tabIndex={0}
                    aria-label={`${label} ${index + 1}`}
                    onClick={onClickHandler}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onClickHandler();
                      }
                    }}
                  >
                    ●
                  </span>
                </li>
              );
            }}
          >
            {[1, 2, 3]?.map((x, i) => (
              <div key={x || i}>
                <img
                  src={`https://placehold.co/800x600`}
                  className="w-100"
                  style={{
                    // height: '330px',
                    objectFit: 'cover'
                  }}
                  alt="TempatSewa.Com Indonesia: Situs Sewa Kos, Rumah, Apartemen, Ruko, Kios, dan Gudang"
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </Fragment>
  );
}
