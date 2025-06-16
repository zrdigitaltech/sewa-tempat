import KebijakanPrivasiPage from './index';

const domain = process.env.NEXT_PUBLIC_DOMAIN || '';

export const metadata = {
  title: 'Kebijakan Privasi | tempatSewa.Com',
  description:
    'Pelajari bagaimana tempatSewa.Com mengumpulkan, menggunakan, dan melindungi data pribadi pengguna. Privasi Anda adalah prioritas kami.',
  openGraph: {
    title: 'Kebijakan Privasi | tempatSewa.Com',
    description:
      'Baca kebijakan privasi kami untuk mengetahui bagaimana data Anda digunakan dan dilindungi saat menggunakan platform tempatSewa.Com.',
    url: `${domain}/kebijakan-privasi`,
    images: [
      {
        url: 'https://placehold.co/722x358?text=Kebijakan+Privasi+tempatSewa.Com',
        width: 1200,
        height: 630,
        alt: 'Kebijakan Privasi tempatSewa.Com'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kebijakan Privasi | tempatSewa.Com',
    description:
      'Transparansi dalam pengelolaan data Anda. Baca kebijakan privasi kami di tempatSewa.Com.',
    images: ['https://placehold.co/1200x630?text=Kebijakan+Privasi+tempatSewa.Com']
  }
};

export default function Page() {
  return <KebijakanPrivasiPage />;
}
