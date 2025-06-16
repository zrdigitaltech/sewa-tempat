import TentangKamiPage from './index';

const domain = process.env.NEXT_PUBLIC_DOMAIN || '';

export const metadata = {
  title: 'Tentang Kami | tempatSewa.Com',
  description:
    'tempaSewa.Com adalah platform sewa properti terpercaya di Indonesia. Pelajari visi, misi, dan komitmen kami dalam membantu pemilik dan pencari properti.',
  openGraph: {
    title: 'Tentang Kami | tempatSewa.Com',
    description:
      'Kenali lebih dekat siapa kami, apa yang kami lakukan, dan bagaimana tempatSewa.Com hadir untuk memudahkan proses sewa-menyewa properti di seluruh Indonesia.',
    url: `${domain}/tentang-kami`,
    images: [
      {
        url: 'https://placehold.co/722x358?text=Tentang+Kami+tempatSewa.Com',
        width: 1200,
        height: 630,
        alt: 'Tentang Kami tempatSewa.Com'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tentang Kami | tempatSewa.Com',
    description:
      'Cari tahu lebih banyak tentang platform sewa properti terpercaya di Indonesia. tempatSewa.Com hadir untuk menghubungkan pemilik dan pencari properti.',
    images: ['https://placehold.co/1200x630?text=Tentang+Kami+tempatSewa.Com']
  }
};

export default function Page() {
  return <TentangKamiPage />;
}
