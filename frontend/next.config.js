/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    // Disable image optimization for Vercel deployment
    images: {
        unoptimized: true,
    },
    // Remove standalone output for Vercel (causes issues)
    // output: 'standalone',
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
    // Optimize for production
    compress: true,
    poweredByHeader: false,
    generateEtags: true,
    // Handle page extensions
    pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
    // Ensure trailing slashes are handled correctly
    trailingSlash: false,
}

module.exports = nextConfig
