import PropertiSlugPage from './index';
import { getPropertiDetailBySlug } from '@/lib/metaData/properti/slug';

export async function generateMetadata({ params }) {
  const { slug } = params;
  const data = await getPropertiDetailBySlug(slug);

  if (!data) {
    return {
      title: 'Properti Tidak Ditemukan | tempatSewa.Com',
      description: 'Halaman properti yang kamu cari tidak tersedia.'
    };
  }

  return {
    title: `${data.nama} pemilik ${data.pemilik}`,
    description: data.deskripsi,
    openGraph: {
      title: `${data.nama} pemilik ${data.pemilik}`,
      description: data.deskripsi,
      url: `${process.env.NEXT_PUBLIC_DOMAIN || ''}/properti/${slug}`,
      images: [
        {
          url: data.image[0] || 'https://placehold.co/722x358',
          width: 1200,
          height: 630,
          alt: `${data.nama} pemilik ${data.pemilik}`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.nama} pemilik ${data.pemilik}`,
      description: data.deskripsi,
      images: [data?.image[0] || 'https://placehold.co/1200x630?text=Properti']
    }
  };
}

export default function Page() {
  return <PropertiSlugPage />;
}
