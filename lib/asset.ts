// Prefix for static assets when the site is served under a sub-path
// (e.g. GitHub Pages project sites at /<repo>/). Empty for local/Vercel.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * Prepend the deploy base path to a root-relative asset path.
 * `next/image` does not add the base path for unoptimized images, so wrap
 * every image `src` with this helper.
 */
export function asset(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${BASE_PATH}${path}`;
}
