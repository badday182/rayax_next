import Link from "next/link";
import { getArticle } from "@/data/articles";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://rayax-next.vercel.app";

const ArticleLayout = ({ slug, children }) => {
  const article = getArticle(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: "uk",
    author: {
      "@type": "Organization",
      name: "Редакція Rayax",
      url: siteUrl,
    },
    mainEntityOfPage: `${siteUrl}/articles/${article.slug}`,
    publisher: {
      "@type": "Organization",
      name: "Rayax",
      url: siteUrl,
    },
  };

  return (
    <main className="conteinerWidht px-3 py-5 d-flex flex-column align-items-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article
        className="backgroundWhite rounded p-4 articleBody"
        style={{ maxWidth: 760, width: "100%" }}
      >
        <p className="mb-2">
          <Link href="/articles" className="small">
            ← Усі статті
          </Link>
        </p>

        <h1 className="h3 fw-bold mb-2">{article.title}</h1>
        <p className="text-secondary small mb-4">
          Редакція Rayax ·{" "}
          <time dateTime={article.date}>
            {new Intl.DateTimeFormat("uk-UA", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }).format(new Date(article.date))}
          </time>
        </p>
        {children}

        <hr className="my-4" />
        <p className="mb-3 fw400">
          Rayax формує такий опис автоматично: ви обираєте зону, проекцію та
          знахідки зі списків, а сервіс складає готовий текст протоколу.
        </p>
        <Link href="/generator" className="btn btn-primary fw-bold">
          Перейти до генератора
        </Link>
      </article>
    </main>
  );
};

export default ArticleLayout;
