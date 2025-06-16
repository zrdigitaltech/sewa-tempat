import FiturPage from './index';

const domain = process.env.NEXT_PUBLIC_DOMAIN || '';
export const metadata = {
  title: 'Fitur Iklan Unggulan di tempatSewa.Com – Booster Properti Cepat Disewa',
  description:
    'Tingkatkan visibilitas iklanmu dengan Booster dan pantau minat penyewa di tempatSewa.Com.',
  openGraph: {
    title: 'Fitur Iklan Unggulan di tempatSewa.Com – Booster Properti Cepat Disewa',
    description: 'Cek fitur Booster dan Daftar Peminat.',
    url: domain + '/fitur#ProdukBooster',
    images: [
      {
        url: 'https://placehold.co/722x358',
        width: 1200,
        height: 630,
        alt: 'Booster tempatSewa.Com'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fitur Iklan Unggulan di tempatSewa.Com – Booster Properti Cepat Disewa',
    description:
      'Tingkatkan visibilitas iklanmu dengan Booster dan pantau minat penyewa di tempatSewa.Com.',
    images: ['https://placehold.co/1200x630?text=Pasang+Iklan+Properti']
  }
};

export default function Index() {
  return <FiturPage />;
}
