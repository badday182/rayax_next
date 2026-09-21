import Link from "next/link";
import { articles } from "@/data/articles";

export const metadata = {
  title: "Статті про опис рентгенівських знімків",
  description:
    "Практичні матеріали для лікарів-рентгенологів: структура протоколу опису рентгена ОГК і хребта, проекції рентгенівських знімків та типові формулювання заключень.",
  alternates: {
    canonical: "/articles",
  },
};

export default function ArticlesPage() {
  return (
    <main className="px-3 py-5 d-flex flex-column align-items-center">
      <h1 className="text-white fw-bold text-center mb-4">
        Статті про опис рентгенівських знімків
      </h1>

      <div style={{ maxWidth: 760, width: "100%" }}>
        {articles.map((article) => (
          <article
            key={article.slug}
            className="backgroundWhite rounded p-4 mb-3"
          >
            <h2 className="h5 fw-bold mb-2">
              <Link
                href={`/articles/${article.slug}`}
                className="text-decoration-none"
              >
                {article.title}
              </Link>
            </h2>
            <p className="fw400 mb-0">{article.description}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
