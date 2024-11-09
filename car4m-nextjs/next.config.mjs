/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    images: {
        domains: ['res.cloudinary.com'],
    }
};

export default nextConfig;
