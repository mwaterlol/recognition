/** @type {import('next').NextConfig} */
const nextConfig = {
    devIndicators: {
        appIsrStatus: false,
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // Ignore 'fs' module on the client side
            config.resolve.fallback = { fs: false };
        }
        return config;
    },
    output: "standalone",
};

module.exports = nextConfig;
