/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    // Disable image optimization for local development
    images: {
        unoptimized: true,
    },
    // Configure output for standalone deployment
    output: 'standalone',
    // Disable telemetry
    telemetry: false,
    // Configure webpack for better error handling
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                net: false,
                tls: false,
            };
        }
        return config;
    },
    // Optimize for local development
    compress: true,
    poweredByHeader: false,
    generateEtags: true,
    // Handle page extensions
    pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
}

module.exports = nextConfig
