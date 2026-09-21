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
    <main className="conteinerWidht px-3 py-5 d-flex flex-column align-items-center">
      <h1 className="text-white fw-bold text-center mb-4">
        Статті про опис рентгенівських знімків
      </h1>

      <div style={{ maxWidth: 760, width: "100%" }}>
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="articleCard backgroundWhite rounded p-4 mb-3 d-block text-decoration-none text-dark"
          >
            <h2 className="h5 fw-bold mb-2">{article.title}</h2>
            <p className="fw400 mb-0">{article.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
