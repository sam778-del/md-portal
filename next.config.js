/**
 * @type {import('next').NextConfig}
 **/

const withNextIntl = require('next-intl/plugin')('./i18n.ts');

const nextConfig = {
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

module.exports = withNextIntl(nextConfig);