const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://rayax-next.vercel.app";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/account"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
