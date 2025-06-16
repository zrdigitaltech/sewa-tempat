import SyaratKetentuanPage from './index';

const domain = process.env.NEXT_PUBLIC_DOMAIN || '';

export const metadata = {
  title: 'Syarat & Ketentuan | tempatSewa.Com',
  description:
    'Baca syarat dan ketentuan penggunaan layanan tempatSewa.Com. Pahami hak dan kewajiban Anda sebagai pengguna platform properti terpercaya.',
  openGraph: {
    title: 'Syarat & Ketentuan | tempatSewa.Com',
    description:
      'Pelajari ketentuan penggunaan layanan tempatSewa.Com untuk pengguna, pemilik properti, dan pencari sewa. Transparan, adil, dan mudah dipahami.',
    url: `${domain}/syarat-dan-ketentuan`,
    images: [
      {
        url: 'https://placehold.co/722x358?text=Syarat+dan+Ketentuan+tempatSewa.Com',
        width: 1200,
        height: 630,
        alt: 'Syarat dan Ketentuan Penggunaan tempatSewa.Com'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Syarat & Ketentuan | tempatSewa.Com',
    description:
      'Pahami aturan penggunaan platform sewa properti tempatSewa.Com untuk pengalaman yang aman dan nyaman.',
    images: ['https://placehold.co/1200x630?text=Syarat+Ketentuan+tempatSewa.Com']
  }
};

export default function Page() {
  return <SyaratKetentuanPage />;
}
