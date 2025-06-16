import PanduanSlugPage from './index';

import { getPanduanDetailBySlug } from '@/lib/metaData/panduan';

export async function generateMetadata({ params }) {
  const { slug } = params;
  const data = await getPanduanDetailBySlug(slug);

  if (!data) {
    return {
      title: 'Panduan Tidak Ditemukan | tempatSewa.Com',
      description: 'Halaman panduan yang kamu cari tidak tersedia.'
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

export default function Page() {
  return <PanduanSlugPage />;
}
