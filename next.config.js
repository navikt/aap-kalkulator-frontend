/** @type {import('next').NextConfig} */
const ssr = require('@navikt/nav-dekoratoren-moduler/ssr');

const appDirectives = {
    'connect-src': ["'self'"],
    'font-src': ['https://fonts.gstatic.com'],
    'object-src': ['none'],
    'script-src-elem': ["'self'"],
    'style-src-elem': ["'self'"],
    'img-src': ["'self'", 'data:', 'blob:'],
};

const assetPrefix = process.env.ASSET_PREFIX ?? undefined

const nextConfig = {
    basePath: "/aap/kalkulator",
    reactStrictMode: true,
    output: "standalone",
    assetPrefix:
        process.env.NODE_ENV === "production" ? assetPrefix : undefined,

    async headers() {
        const csp = await ssr.buildCspHeader(appDirectives, { env: process.env.DECORATOR_ENV ?? 'prod' });
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: csp,
                    },
                ],
            },
        ];
    },
    i18n: {
        locales: ["nb", "nn"],
        defaultLocale: "nb",
    },
}

module.exports = nextConfig
