import dynamic from 'next/dynamic';

const PasangIklanPropertiPage = dynamic(() => import('./index'), {
  ssr: true
});

const domain = process.env.NEXT_PUBLIC_DOMAIN || '';
export const metadata = {
  title: 'Pasang Iklan Properti Dengan  Mudah & Cepat Disewa Hanya di tempatSewa.Com',
  description:
    'Pasang iklan sewa properti kamu dengan mudah dan gratis di tempatSewa.Com. Jangkau lebih banyak penyewa dan tingkatkan visibilitas dengan fitur Booster.',
  openGraph: {
    title: 'Pasang Iklan Properti Dengan  Mudah & Cepat Disewa Hanya di tempatSewa.Com',
    description:
      'Iklankan kos, rumah, apartemen, ruko, dan properti lainnya dengan mudah di tempatSewa.Com. Gratis, cepat, dan menjangkau ribuan calon penyewa.',
    url: domain + '/pasang-iklan-properti',
    images: [
      {
        url: 'https://placehold.co/722x358',
        width: 1200,
        height: 630,
        alt: 'Pasang Iklan Properti Dengan  Mudah & Cepat Disewa Hanya di tempatSewa.Com'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pasang Iklan Properti Dengan  Mudah & Cepat Disewa Hanya di tempatSewa.Com',
    description:
      'Tempat terbaik untuk mempromosikan properti sewa kamu. Tampilkan iklanmu secara profesional di tempatSewa.Com.',
    images: ['https://placehold.co/1200x630?text=Pasang+Iklan+Properti']
  }
};

export default function Page() {
  return <PasangIklanPropertiPage />;
}
