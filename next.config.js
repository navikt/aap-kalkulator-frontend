/** @type {import('next').NextConfig} */

const { withSentryConfig } = require("@sentry/nextjs")

const sentryWebpackPluginOptions = {
    silent: true,
}

const nextConfig = {
    basePath: "/aap/kalkulator",
    reactStrictMode: true,
    output: "standalone",
    i18n: {
        locales: ["nb", "nn", "en"],
        defaultLocale: "nb",
    },
}

if (process.env.ENABLE_SENTRY === "enabled") {
    console.log("sentry enabled")
    module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions)
} else {
    module.exports = nextConfig
}
