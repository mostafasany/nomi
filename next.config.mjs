/** @type {import('next').NextConfig} */
// Site is served at the root of a custom domain (nomiroll.com) — no basePath needed.
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
