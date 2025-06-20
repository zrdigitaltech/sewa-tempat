import SearchPage from './index';

const domain = process.env.NEXT_PUBLIC_DOMAIN || '';

export const metadata = {
  title: 'Temukan Properti Sewa Terlengkap di Indonesia | tempatSewa.Com',
  description:
    'Jelajahi berbagai pilihan properti sewa seperti rumah, kost, apartemen, ruko, kontrakan, kios, tanah, gudang, dan lainnya sesuai kebutuhanmu hanya di tempatSewa.Com.',
  openGraph: {
    title: 'Temukan Properti Sewa Terlengkap di Indonesia | tempatSewa.Com',
    description:
      'Cari properti sewa sesuai lokasi, harga, dan tipe. Tersedia berbagai pilihan rumah, apartemen, kost, ruko, gudang, dan properti usaha lainnya. Temukan hanya di tempatSewa.Com.',
    url: domain + '/search',
    images: [
      {
        url: 'https://placehold.co/1200x630?text=Cari+Properti+Sewa+TempatSewa.Com',
        width: 1200,
        height: 630,
        alt: 'Pencarian Properti Sewa tempatSewa.Com'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Properti Sewa Lengkap: Rumah, Kost, Ruko, Apartemen, dan Lainnya | tempatSewa.Com',
    description:
      'Platform pencarian properti sewa terlengkap. Cocok untuk pencari tempat tinggal atau ruang usaha. Temukan properti terbaikmu sekarang!',
    images: ['https://placehold.co/1200x630?text=Properti+Sewa+TempatSewa.Com']
  }
};

export default function Page() {
  return <SearchPage />;
}
