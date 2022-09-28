/** @type {import('next').NextConfig} */

const { withSentryConfig } = require("@sentry/nextjs")

const sentryWebpackPluginOptions = {
    silent: true,
}

const nextConfig = {
    reactStrictMode: true,
    i18n: {
        locales: ['nb', 'nn'],
        defaultLocale: 'nb',
    },
}

if (process.env.ENABLE_SENTRY === "enabled") {
    console.log("sentry enabled")
    module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions)
} else {
    module.exports = nextConfig
}
