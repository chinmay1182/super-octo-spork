/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable experimental features
    experimental: {
        // optimizeCss: true, // Disabled - requires critters package
        optimizePackageImports: ['@material-symbols/sharp']
    },

    // Image optimization
    images: {
        formats: ['image/webp', 'image/avif'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.icons8.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'cdn.jsdelivr.net',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'picsum.photos',
                port: '',
                pathname: '/**',
            }
        ],
    },

    // Compression
    compress: true,

    // Security headers
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin'
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()'
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: [
                            "default-src 'self'",
                            "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://www.gstatic.com",
                            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                            "font-src 'self' https://fonts.gstatic.com",
                            "img-src 'self' data: https: blob:",
                            "connect-src 'self' https://api.cognitive.microsofttranslator.com https://www.google-analytics.com https://analytics.google.com",
                            "frame-src 'self' https://www.google.com",
                            "object-src 'none'",
                            "base-uri 'self'",
                            "form-action 'self'",
                            "frame-ancestors 'none'",
                            "upgrade-insecure-requests"
                        ].join('; ')
                    }
                ]
            }
        ];
    },

    // Redirects for language routing
    async redirects() {
        return [
            // Redirect old language paths
            {
                source: '/en/:path*',
                destination: '/:path*',
                permanent: true
            }
        ];
    },

    // Rewrites for language routing and PWA
    async rewrites() {
        return [
            {
                source: '/ua/:path*',
                destination: '/:path*'
            },
            {
                source: '/ru/:path*',
                destination: '/:path*'
            },
            {
                source: '/sw.js',
                destination: '/_next/static/sw.js'
            }
        ];
    },

    // Bundle analyzer (enable when needed)
    // bundleAnalyzer: {
    //   enabled: process.env.ANALYZE === 'true'
    // },

    // Webpack configuration
    webpack: (config, { buildId, dev, isServer, webpack }) => {
        // Add custom webpack configurations here

        // Optimize bundle size
        if (!dev && !isServer) {
            config.optimization.splitChunks.cacheGroups = {
                ...config.optimization.splitChunks.cacheGroups,
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            };
        }

        // Add service worker
        if (!dev && !isServer) {
            config.plugins.push(
                new webpack.DefinePlugin({
                    'process.env.BUILD_ID': JSON.stringify(buildId),
                })
            );
        }

        return config;
    },

    // Environment variables
    env: {
        BUILD_TIME: new Date().toISOString(),
    },

    // Output configuration
    output: 'standalone',

    // Disable x-powered-by header
    poweredByHeader: false,

    // Enable React strict mode
    reactStrictMode: true,

    // SWC minification is enabled by default in Next.js 13+

    // Trailing slash
    trailingSlash: false,

    // TypeScript configuration
    typescript: {
        ignoreBuildErrors: false,
    },

    // ESLint configuration
    eslint: {
        ignoreDuringBuilds: true,
    }
};

module.exports = nextConfig;