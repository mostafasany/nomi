/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const repo = "nomi"; // GitHub repo name — site lives at /<repo>

const nextConfig = {
  output: "export",
  basePath:    isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
