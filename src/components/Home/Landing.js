import Link from "next/link";
import { getDict, localePath } from "@/i18n";

const Landing = ({ locale }) => {
  const dict = getDict(locale);
  const href = (path) => localePath(path, locale);

  return (
    <main className="conteinerWidht text-white text-center px-3 py-5 d-flex flex-column align-items-center justify-content-center">
      <h1 className="fw-bold mb-3">{dict.home.h1}</h1>
      <p className="mb-4" style={{ maxWidth: 640 }}>
        {dict.home.lead}
      </p>
      <Link
        href={href("/generator")}
        className="p-2 px-4 glass-button d-ruby fw-bold"
      >
        {dict.home.ctaGenerator}
      </Link>
      <div className="mt-4 d-flex flex-col gap-3 justify-content-center flex-wrap">
        <Link href={href("/faq")} className="p-2 px-4 glass-button d-ruby fw-bold">
          {dict.home.ctaFaq}
        </Link>
        <Link
          href={href("/articles")}
          className="p-2 px-4 glass-button d-ruby fw-bold"
        >
          {dict.home.ctaArticles}
        </Link>
      </div>
    </main>
  );
};

export default Landing;
