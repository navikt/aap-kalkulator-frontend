const createNextIntlPlugin = require('next-intl/plugin');
 
const withNextIntl = createNextIntlPlugin();

const assetPrefix = process.env.ASSET_PREFIX ?? undefined
/** @type {import('next').NextConfig} */

const nextConfig = {
    basePath: "/aap/kalkulator",
    reactStrictMode: true,
    output: "standalone",
    assetPrefix:
        process.env.NODE_ENV === "production" ? assetPrefix : undefined,
    /*i18n: {
        locales: ["nb", "nn"],
        defaultLocale: "nb",
    },*/
}

module.exports = withNextIntl(nextConfig);
