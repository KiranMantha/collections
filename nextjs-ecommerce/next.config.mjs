/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_REST_ENDPOINT}/:path*`
      }
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `${process.env.NEXT_PUBLIC_IMAGE_HOST_1}`,
        port: '',
        pathname: '/images/**'
      },
      {
        protocol: 'https',
        hostname: `${process.env.NEXT_PUBLIC_IMAGE_HOST_2}`,
        port: '',
        pathname: '/images/**'
      }
    ]
  }
};

export default nextConfig;
