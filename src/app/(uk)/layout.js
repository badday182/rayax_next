import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";
import "../globals.css";
import SiteShell from "@/components/SiteShell";
import { getDict } from "@/i18n";
import { buildRootMetadata, buildJsonLd } from "@/i18n/metadata";

const inter = Inter({ subsets: ["latin"] });

const locale = "uk";

export const metadata = buildRootMetadata(locale);

const jsonLd = buildJsonLd(locale);

export default function UkRootLayout({ children }) {
  return (
    <html lang={getDict(locale).htmlLang} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
