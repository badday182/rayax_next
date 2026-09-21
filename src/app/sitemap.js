import { articles } from "@/data/articles";
import { siteUrl } from "@/i18n/metadata";

// Ukrainian pages live on bare routes, Italian ones under /it. Each entry declares
// both language variants so Google links them instead of treating them as duplicates.
const entry = (path, changeFrequency, priority, lastModified = new Date()) => ({
  url: `${siteUrl}${path === "/" ? "" : path}`,
  lastModified,
  changeFrequency,
  priority,
  alternates: {
    languages: {
      "uk-UA": `${siteUrl}${path === "/" ? "" : path}`,
      "it-IT": `${siteUrl}/it${path === "/" ? "" : path}`,
    },
  },
});

export default function sitemap() {
  const pages = [
    entry("/", "weekly", 1),
    entry("/generator", "weekly", 0.9),
    entry("/faq", "monthly", 0.8),
    entry("/articles", "weekly", 0.8),
    ...articles.map((article) =>
      entry(
        `/articles/${article.slug}`,
        "monthly",
        0.7,
        new Date(article.date)
      )
    ),
  ];

  const italian = pages.map((page) => ({
    ...page,
    url: page.alternates.languages["it-IT"],
    priority: Math.max(page.priority - 0.1, 0.1),
  }));

  return [...pages, ...italian];
}
