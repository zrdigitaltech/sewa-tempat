'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCamera,
  faImage,
  faCompress,
  faCubes,
  faInfoCircle,
  faCube,
  faBan,
  faThLarge,
  faMap,
  faCheckCircle,
  faEdit,
  faTag,
  faLightbulb
} from '@fortawesome/free-solid-svg-icons';

export default function Tips() {
  const tips = [
    [
      'Gunakan Foto Properti Asli',
      'Pastikan foto properti yang Anda gunakan adalah foto asli. Jangan gunakan foto properti lain yang tidak sesuai.',
      faCamera
    ],
    [
      'Foto Berkualitas Baik',
      'Gunakan foto dengan resolusi tinggi, fokus, dan tidak gelap agar menarik lebih banyak peminat.',
      faImage
    ],
    [
      'Gunakan Foto Ukuran Sesuai',
      'Gunakan ukuran foto di bawah 4 MB agar lebih cepat dimuat.',
      faCompress
    ],
    [
      'Sertakan Foto Berbagai Sudut',
      'Ambil foto dari berbagai sudut: depan rumah, garasi, ruang tamu, kamar tidur, dapur, hingga halaman belakang.',
      faCubes
    ],
    [
      'Foto Boleh Memuat Informasi',
      'Selama tidak menutupi gambar properti, Anda boleh menyisipkan informasi seperti harga, kontak, atau logo.',
      faInfoCircle
    ],
    [
      'Foto 3D untuk Primary',
      'Boleh menambahkan foto 3D atau maket pada iklan properti utama.',
      faCube
    ],
    [
      'Jangan Gunakan Brosur sebagai Foto Utama',
      'Brosur boleh diunggah sebagai foto tambahan, namun bukan sebagai foto utama.',
      faBan
    ],
    [
      'Gunakan Satu Foto per Bingkai',
      'Hindari kolase. Gunakan satu foto untuk satu tampilan agar lebih jelas.',
      faThLarge
    ],
    [
      'Foto Site Plan sebagai Pelengkap',
      'Jangan hanya mengunggah site plan tanpa tambahan foto properti kecuali iklan tanah.',
      faMap
    ],
    [
      'Isi Keterangan dengan Benar',
      'Pastikan properti sesuai dengan kategorinya, seperti rumah, kost, apartemen, atau tanah.',
      faCheckCircle
    ],
    [
      'Lengkapi Informasi Properti',
      'Isi deskripsi lengkap agar pembeli atau penyewa lebih mudah memahami kondisi properti.',
      faEdit
    ],
    [
      'Harga Properti Sesuai',
      'Tentukan harga sewa yang sesuai. Harga yang janggal dapat menyebabkan iklan diturunkan.',
      faTag
    ]
  ];

  return (
    <>
      <p>
        <strong className="text-primary">tempatSewa.Com</strong> adalah platform tepercaya yang
        memudahkan Anda menemukan tempat tinggal impian—mulai dari kontrakan, kost, hingga berbagai
        jenis properti sewa lainnya. Nikmati pengalaman pencarian hunian yang cepat, aman, dan
        nyaman melalui fitur-fitur yang dirancang untuk memudahkan proses pencarian Anda.
      </p>
      <p>
        Bagi pemilik properti, <strong className="text-primary">tempatSewa.Com</strong> menyediakan
        solusi terpadu untuk memasarkan dan mengelola properti secara efisien. Setiap harinya,
        ratusan iklan properti baru dipasang, memberikan peluang besar untuk menjangkau ribuan calon
        penyewa. Pastikan iklan Anda menarik perhatian dengan informasi lengkap dan foto berkualitas
        tinggi.
      </p>

      <div className="mt-5 mb-4">
        <div className="d-flex  mb-2">
          <FontAwesomeIcon icon={faLightbulb} className="text-primary me-2 fs-4" />

          <h5 className="fw-bold mb-0">
            Tips Pasang Iklan di <strong className="text-primary">tempatSewa.Com</strong>
          </h5>
        </div>
        <p className="text-muted mb-4">
          Berikut beberapa tips memasang iklan di TempatSewa.Com untuk pemilik properti agar lebih
          cepat tersewa:
        </p>
      </div>

      <div className="row g-4">
        {tips.map(([title, desc, icon], i) => (
          <div className="col-md-6 col-lg-4" key={i}>
            <div className="p-3 border rounded-3 h-100 bg-white shadow-sm">
              <div className="d-flex align-items-start">
                <div className="me-3 text-center">
                  <FontAwesomeIcon icon={icon} className="text-primary" size="lg" />
                </div>
                <div>
                  <h6 className="fw-bold mb-1">{title}</h6>
                  <p className="small text-muted mb-0">{desc}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
