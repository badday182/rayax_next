import { getDict } from "./index";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://rayax-next.vercel.app";

const keywords = {
  uk: [
    "рентген",
    "рентгенівські знімки",
    "опис рентгенівських знімків",
    "протокол рентгенологічного дослідження",
    "рентгенографія",
    "R-графія",
  ],
  it: [
    "radiografia",
    "referto radiologico",
    "refertazione radiografica",
    "radiologia",
    "referto RX torace",
    "modelli di referto",
  ],
};

// `path` is always the bare (unprefixed) route — "/", "/faq", "/articles/x".
// The locale decides which of the two variants becomes the canonical URL.
export const alternatesFor = (path, locale = "uk") => {
  const bare = path === "/" ? "" : path;
  const ukUrl = bare || "/";
  const itUrl = `/it${bare}`;

  return {
    canonical: locale === "it" ? itUrl : ukUrl,
    languages: {
      "uk-UA": ukUrl,
      "it-IT": itUrl,
      "x-default": ukUrl,
    },
  };
};

export const buildRootMetadata = (locale) => {
  const dict = getDict(locale);
  const isDefault = locale === "uk";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: dict.home.title,
      template: "%s — Rayax",
    },
    description: dict.home.description,
    keywords: keywords[locale],
    authors: [{ name: "Rayax" }],
    alternates: alternatesFor("/", locale),
    openGraph: {
      type: "website",
      locale: dict.ogLocale,
      url: isDefault ? siteUrl : `${siteUrl}/it`,
      siteName: "Rayax",
      title: dict.home.title,
      description: dict.home.description,
    },
    twitter: {
      card: "summary",
      title: dict.home.title,
      description: dict.home.description,
    },
    robots: {
      index: true,
      follow: true,
    },
    verification: {
      google: "jsWqi5r-01cV8EVBDEbyr1iWSngTyKQwRNri2Z3EZYI",
    },
  };
};

export const buildJsonLd = (locale) => {
  const dict = getDict(locale);
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Rayax",
    applicationCategory: "MedicalApplication",
    operatingSystem: "Web",
    url: locale === "uk" ? siteUrl : `${siteUrl}/it`,
    description: dict.home.description,
    inLanguage: dict.htmlLang,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: locale === "uk" ? "UAH" : "EUR",
    },
  };
};
