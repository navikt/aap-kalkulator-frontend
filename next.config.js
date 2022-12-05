/** @type {import('next').NextConfig} */

const { withSentryConfig } = require("@sentry/nextjs")

const sentryWebpackPluginOptions = {
    silent: true,
}

const assetPrefix = process.env.ASSET_PREFIX ?? undefined

const nextConfig = {
    basePath: "/aap/kalkulator",
    reactStrictMode: true,
    output: "standalone",
    assetPrefix: process.env.NODE_ENV === "production" ? assetPrefix : undefined,
    i18n: {
        locales: ["nb", "nn"],
        defaultLocale: "nb",
    },
}

if (process.env.ENABLE_SENTRY === "enabled") {
    console.log("sentry enabled")
    module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions)
} else {
    module.exports = nextConfig
}
