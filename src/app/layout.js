import dynamic from 'next/dynamic';

// css
import '@/styles/scss/style.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Components
import { UseHeads } from '@/components';
const ReduxProvider = dynamic(() => import('@/redux/provider'));

export const metadata = {
  // Basic metas
  authors: [{ name: 'ZRDigitalTech' }],
  keywords: [
    'sewa kontrakan',
    'sewa kost',
    'sewa rumah',
    'cari kontrakan murah',
    'kost bulanan',
    'sewa apartemen',
    'kontrakan Jakarta',
    'kost dekat kampus',
    'pasang iklan properti',
    'platform sewa properti',
    'properti disewakan',
    'cari rumah sewa',
    'kontrakan eksklusif',
    'manajemen properti',
    'tempat sewa terpercaya'
  ],
  manifest: '/manifest.json',
  author: 'ZRDigitalTech',
  // Page Title
  title:
    'TempatSewa.Com Indonesia: Situs Sewa Kos, Sewa Rumah, Sewa Apartemen, Sewa Ruko, Sewa Kios dan Sewa Gudang',
  description:
    'Temukan dan sewa kontrakan, kost, atau properti impianmu dengan mudah. Kelola dan pasarkan properti dalam satu platform: tempatSewa.Com.',
  openGraph: {
    url: 'https://zrdigitaltech.github.io',
    images: 'https://zrdigitaltech.github.io/assets/images/meta.png'
  }
};

export const viewport = {
  themeColor: '#1e3a8a'
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Poppins:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <UseHeads
        title={metadata.title}
        description={metadata.description}
        author={metadata.author}
        keywords={metadata.keywords}
        themecolor={viewport.themeColor}
        manifest={metadata.manifest}
        url={metadata.openGraph.url}
        image={metadata.openGraph.images}
      />
      <body>
        <div className="container-fluid px-0">
          <ReduxProvider>{children}</ReduxProvider>
        </div>
      </body>
    </html>
  );
}
