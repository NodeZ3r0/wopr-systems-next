/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', poweredByHeader: false, reactStrictMode: true,
  typescript: { ignoreBuildErrors: true }, eslint: { ignoreDuringBuilds: true },
}
export default nextConfig
