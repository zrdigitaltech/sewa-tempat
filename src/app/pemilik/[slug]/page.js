import PemilikSlugPage from './index';

import { getPemilikBySlug } from '@/lib/metaData/pemilik/slug';

export async function generateMetadata({ params }) {
  const { slug } = params;
  const data = await getPemilikBySlug(slug);

  if (!data) {
    return {
      title: `${data?.name} - ${data?.bio}`,
      description: `${data?.bio}`
    };
  }

  return {
    title: `${data?.name} - ${data?.bio}`,
    description: data?.bio,
    openGraph: {
      title: `${data?.name} - ${data?.bio}`,
      description: data.bio,
      url: `${process.env.NEXT_PUBLIC_DOMAIN || ''}/pemilik/${slug}`,
      images: [
        {
          url: data?.image || 'https://placehold.co/722x358',
          width: 1200,
          height: 630,
          alt: `${data?.name} - ${data?.bio}`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data?.name} - ${data?.bio}`,
      description: data.bio,
      images: [data?.image || 'https://placehold.co/1200x630?text=Pemilik+Properti']
    }
  };
}

export default function Index() {
  return <PemilikSlugPage />;
}
