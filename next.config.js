/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "api.toucanny.net",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

module.exports = nextConfig;
