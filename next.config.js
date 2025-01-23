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
            {
                protocol: "https",
                hostname: "img.icons8.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

module.exports = nextConfig;
