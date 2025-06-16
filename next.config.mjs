/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath: "/",
  // output: "export",
  // swcMinify: true,
  images: {
    unoptimized: true,
    loader: 'akamai',
    path: '',
    loaderFile: ''
  },
  webpack: (config) => {
    // Optimize and reduce bundle size
    config.optimization.splitChunks = {
      chunks: 'all'
    };

    // Customize Webpack configuration if needed
    return config;
  },
  // generateMetadata: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  env: {
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
    NEXT_PUBLIC_DOMAIN_API: process.env.NEXT_PUBLIC_DOMAIN_API,
    NEXT_PUBLIC_DOMAIN_PROXY: process.env.NEXT_PUBLIC_DOMAIN_PROXY
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' }, // replace this your actual origin
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
        source: '/api/:path*',
        destination: `${apiUrl}/:path*`
      }
    ];
  },
  experimental: {
    scrollRestoration: true // <--- tambahkan ini
  },
  turbopack: {
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json']
  }
};

export default nextConfig;
