import PanduanPage from './index';

const domain = process.env.NEXT_PUBLIC_DOMAIN || '';

export const metadata = {
  title: 'Panduan Properti: Tips Sewa, Pengelolaan, & Investasi | tempatSewa.Com',
  description:
    'Baca informasi lengkap seputar properti: panduan sewa, tips pengelolaan, hingga strategi investasi. Cocok untuk pemilik dan pencari properti di tempatSewa.Com.',
  openGraph: {
    title: 'Panduan Properti: Tips Sewa, Pengelolaan, & Investasi | tempatSewa.Com',
    description:
      'Dapatkan panduan properti lengkap mulai dari penyewaan, manajemen kos/kontrakan, hingga cara berinvestasi yang aman dan menguntungkan di tempatSewa.Com.',
    url: domain + '/panduan',
    images: [
      {
        url: 'https://placehold.co/722x358',
        width: 1200,
        height: 630,
        alt: 'Panduan Properti tempatSewa.Com'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Panduan Properti: Tips Sewa, Pengelolaan, & Investasi | tempatSewa.Com',
    description:
      'Temukan rekomendasi dan tips penting seputar properti yang wajib diketahui. Cocok untuk pemula maupun investor berpengalaman.',
    images: ['https://placehold.co/1200x630?text=Panduan+Properti+tempaatSewa.Com']
  }
};

export default function Page() {
  return <PanduanPage />;
}
