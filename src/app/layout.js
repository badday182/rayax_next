import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import ReduxProvider from "@/components/ReduxProvider";
import AuthProvider from "@/components/Auth/AuthProvider";
import Header from "@/components/Header/Header";

const inter = Inter({ subsets: ["latin"] });

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://rayax-next.vercel.app";

const title = "Rayax — опис рентгенівських знімків онлайн";
const description =
  "Rayax допомагає лікарям-рентгенологам швидко складати протоколи опису рентгенівських знімків: ОГК, черепа, хребта, суглобів та інших зон. Готові шаблони, власні варіанти формулювань, миттєве формування тексту рентгенівського дослідження.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s — Rayax",
  },
  description,
  keywords: [
    "рентген",
    "рентгенівські знімки",
    "опис рентгенівських знімків",
    "протокол рентгенологічного дослідження",
    "рентгенографія",
    "R-графія",
  ],
  authors: [{ name: "Rayax" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: siteUrl,
    siteName: "Rayax",
    title,
    description,
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Rayax",
  applicationCategory: "MedicalApplication",
  operatingSystem: "Web",
  url: siteUrl,
  description,
  inLanguage: "uk",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "UAH",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ReduxProvider>
          <AuthProvider>
            <Header />
            {children}
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
