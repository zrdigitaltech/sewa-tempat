'use client';
import React, { Fragment } from 'react';

import Breadcrumb from '@/components/Breadcrumb';

const Index = () => {
  return (
    <Fragment>
      <section className="mt-3">
        <Breadcrumb title="Syarat dan Ketentuan" />
      </section>
      <section className="pt-3 pb-5">
        <div className="container">
          <h1 className="fs-3 fw-bold mb-3 text-dark">Syarat dan Ketentuan</h1>

          <p className="text-muted mb-4">
            Selamat datang di <strong>tempatSewa.Com</strong>. Dengan mengakses dan menggunakan
            platform kami, Anda dianggap telah membaca, memahami, dan menyetujui semua Syarat dan
            Ketentuan yang berlaku.
          </p>

          <h4 className="text-xl fw-bold mt-6 mb-2">1. Tentang tempatSewa.Com</h4>
          <p className="text-muted mb-4">
            tempatSewa.Com adalah platform tepercaya yang memudahkan Anda menemukan tempat tinggal
            impian — mulai dari kontrakan, kost, hingga properti sewa lainnya. Kami memberikan
            pengalaman pencarian hunian yang cepat, aman, dan nyaman.
          </p>
          <p className="text-muted mb-4">
            Pemilik properti juga dapat menggunakan platform ini untuk memasarkan dan mengelola
            properti secara praktis dan efisien.
          </p>

          <h4 className="text-xl fw-bold mt-6 mb-2">2. Penggunaan Platform</h4>
          <ul className="list-disc ml-6 mb-4 text-muted ">
            <li>
              Pengguna wajib memberikan informasi yang akurat dan benar saat menggunakan layanan
              kami.
            </li>
            <li>Dilarang menggunakan platform untuk tujuan ilegal atau merugikan pihak lain.</li>
            <li>
              Pengguna bertanggung jawab atas aktivitas yang dilakukan melalui akun masing-masing.
            </li>
          </ul>

          <h4 className="text-xl fw-bold mt-6 mb-2">
            3. Tanggung Jawab Pemilik dan Pencari Properti
          </h4>
          <p className="text-muted mb-4">
            tempatSewa.Com bertindak sebagai perantara antara pencari dan pemilik properti. Kami
            tidak bertanggung jawab atas kesepakatan, kerugian, atau perselisihan yang terjadi
            antara pengguna secara langsung.
          </p>

          <h4 className="text-xl fw-bold mt-6 mb-2">4. Hak Kekayaan Intelektual</h4>
          <p className="text-muted mb-4">
            Seluruh konten yang terdapat pada tempatSewa.Com (termasuk namun tidak terbatas pada
            teks, logo, gambar, dan desain) adalah milik kami dan dilindungi oleh undang-undang hak
            cipta. Dilarang menyalin atau menggunakan tanpa izin tertulis.
          </p>

          <h4 className="text-xl fw-bold mt-6 mb-2">5. Perubahan Layanan dan Syarat</h4>
          <p className="text-muted mb-4">
            tempatSewa.Com berhak mengubah atau menghentikan layanan, serta memperbarui Syarat dan
            Ketentuan ini kapan saja. Perubahan akan diumumkan melalui halaman ini.
          </p>

          <h4 className="text-xl fw-bold mt-6 mb-2">6. Penutup</h4>
          <p className="text-muted mb-4">
            Dengan menggunakan tempatSewa.Com, Anda menyetujui seluruh ketentuan di atas. Jika Anda
            tidak menyetujui sebagian atau seluruh isi dari Syarat dan Ketentuan ini, mohon untuk
            tidak menggunakan layanan kami.
          </p>

          <h4 className="text-xl fw-bold mt-6 mb-2">7. Kontak</h4>
          <p className="text-muted mb-4">
            Untuk pertanyaan lebih lanjut, Anda dapat menghubungi kami melalui email di{' '}
            <a href="mailto:bantuan@tempatsewa.com" className="text-blue-600 ">
              bantuan@tempatsewa.com
            </a>
            .
          </p>
        </div>
      </section>
    </Fragment>
  );
};

export default Index;
