import PemilikSlugPage from './index';

import { getPemilikBySlug } from '@/lib/metaData/pemilik/slug';

export async function generateMetadata({ params }) {
  const { slug } = params;
  const data = await getPemilikBySlug(slug);

  if (!data) {
    return {
      title: `Tentang ${data?.name}`,
      description: `${data?.bio || 'Informasi belum tersedia.'}`
    };
  }

  return {
    title: `${data.title} | tempatSewa.Com`,
    description: data.deskripsi || 'Baca panduan lengkap seputar properti di tempatSewa.Com.',
    openGraph: {
      title: `${data.title} | tempatSewa.Com`,
      description: data.deskripsi,
      url: `${process.env.NEXT_PUBLIC_DOMAIN || ''}/panduan/${slug}`,
      images: [
        {
          url: data.image || 'https://placehold.co/722x358',
          width: 1200,
          height: 630,
          alt: data.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.title} | tempatSewa.Com`,
      description: data.deskripsi,
      images: [data?.image || 'https://placehold.co/1200x630?text=Panduan+Properti']
    }
  };
}

export default function Index() {
  return <PemilikSlugPage />;
}
