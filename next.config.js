
/** @type {import('next').NextConfig} */

const { withSentryConfig } = require('@sentry/nextjs');

const sentryWebpackPluginOptions = {
    silent: true,
};

const nextConfig = {
    reactStrictMode: true,
};

if (process.env.ENABLE_SENTRY === "enabled") {
    console.log('sentry enabled', process.env.ENABLE_SENTRY);
    module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
} else {
    module.exports = nextConfig;
}

module.exports = nextConfig
