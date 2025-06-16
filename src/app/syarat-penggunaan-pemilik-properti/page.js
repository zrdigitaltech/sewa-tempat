import SyaratPenggunaanPemilikPropertiPage from './index';

const domain = process.env.NEXT_PUBLIC_DOMAIN || '';

export const metadata = {
  title: 'Syarat dan Ketentuan Penggunaan untuk Pemilik Properti | tempatSewa.Com',
  description:
    'Baca syarat dan ketentuan lengkap bagi pemilik properti sebelum menggunakan layanan tempatSewa.Com. Pastikan Anda memahami hak dan tanggung jawab sebagai pengguna.',
  openGraph: {
    title: 'Syarat dan Ketentuan Penggunaan untuk Pemilik Properti | tempatSewa.Com',
    description:
      'Panduan resmi tentang aturan penggunaan platform tempatSewa.Com bagi pemilik properti. Penting dibaca sebelum memasang iklan.',
    url: `${domain}/syarat-dan-ketentuan`,
    images: [
      {
        url: 'https://placehold.co/722x358?text=Syarat+Penggunaan+tempatSewa.Com',
        width: 1200,
        height: 630,
        alt: 'Syarat Penggunaan Pemilik Properti tempatSewa.Com'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Syarat dan Ketentuan Pemilik Properti | tempatSewa.Com',
    description:
      'Pelajari ketentuan layanan dan kebijakan tempatSewa.Com sebelum menggunakan platform sebagai pemilik properti.',
    images: ['https://placehold.co/1200x630?text=Syarat+Ketentuan+tempatSewa.Com']
  }
};

export default function Page() {
  return <SyaratPenggunaanPemilikPropertiPage />;
}
