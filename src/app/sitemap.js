import { articles } from "@/data/articles";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://rayax-next.vercel.app";

export default function sitemap() {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/generator`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...articles.map((article) => ({
      url: `${siteUrl}/articles/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
}
