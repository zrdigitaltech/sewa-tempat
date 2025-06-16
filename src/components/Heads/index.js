'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

export default function MetaHead({
  title,
  description,
  image,
  url,
  author,
  keywords = [],
  themecolor = '#ffffff',
  manifest = '/manifest.json'
}) {
  const [currentUrl, setCurrentUrl] = useState(url ?? process.env.NEXT_PUBLIC_DOMAIN);

  useEffect(() => {
    if (!url && typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, [url]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: title,
    url: currentUrl || '',
    description,
    publisher: {
      '@type': 'Organization',
      name: 'TempatSewa.Com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://tempatsewa.com/assets/images/logo.png'
      }
    },
    image: {
      '@type': 'ImageObject',
      url: image,
      height: 630,
      width: 1200
    }
  };

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      <meta name="language" content="id" />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content={themecolor} />
      <link rel="canonical" href={currentUrl || ''} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl || ''} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:site_name" content="TempatSewa.Com" />
      <meta property="og:locale" content="id_ID" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={title} />

      {/* Favicon & Manifest */}
      <link rel="shortcut icon" href="/assets/images/favicon.png" type="image/x-icon" />
      <link rel="manifest" href={manifest} />

      {/* Structured Data */}
      <Script
        id="structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Google Fonts */}
    </>
  );
}
