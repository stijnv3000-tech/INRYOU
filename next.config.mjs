/** @type {import('next').NextConfig} */

// When deploying to GitHub Pages we build a fully static export under a
// repo-name base path. Locally and on Vercel these env vars are unset, so the
// app builds and runs exactly as a normal Next.js app.
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.BASE_PATH || "";

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Static export can't use the Next image optimizer.
    unoptimized: isPages,
  },
  ...(isPages
    ? {
        output: "export",
        trailingSlash: true,
        basePath,
        assetPrefix: basePath || undefined,
        env: { NEXT_PUBLIC_BASE_PATH: basePath },
      }
    : {}),
};

export default nextConfig;
