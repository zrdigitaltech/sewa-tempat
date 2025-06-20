/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    loader: 'akamai',
    path: '',
    loaderFile: ''
  },
  webpack: (config) => {
    config.optimization.splitChunks = { chunks: 'all' };
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  env: {
    SITE_URL: process.env.SITE_URL,
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
    NEXT_PUBLIC_DOMAIN_API: process.env.NEXT_PUBLIC_DOMAIN_API,
    NEXT_PUBLIC_DOMAIN_PROXY: process.env.NEXT_PUBLIC_DOMAIN_PROXY
  },
  async headers() {
    return [
      {
        source: '/api/v1/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
          }
        ]
      }
    ];
  },
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_DOMAIN_API;
    if (!apiUrl) {
      console.warn('⚠️  NEXT_PUBLIC_DOMAIN_API is not defined!');
      return [];
    }

    return [
      {
        source: '/api/v1/:path*',
        destination: `${apiUrl}/:path*`
      }
    ];
  },
  experimental: {
    scrollRestoration: true
  },
  turbopack: {
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json']
  }
};

export default nextConfig;
