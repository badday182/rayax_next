import { uk } from "./uk";
import { it } from "./it";

export const locales = ["uk", "it"];
export const defaultLocale = "uk";

const dictionaries = { uk, it };

export const getDict = (locale) => dictionaries[locale] || dictionaries[defaultLocale];

// Ukrainian lives on the bare routes (already indexed); only Italian is prefixed.
export const localeFromPathname = (pathname) =>
  pathname === "/it" || pathname.startsWith("/it/") ? "it" : defaultLocale;

export const stripLocale = (pathname) => {
  if (pathname === "/it") return "/";
  if (pathname.startsWith("/it/")) return pathname.slice(3);
  return pathname;
};

export const localePath = (path, locale) => {
  const bare = stripLocale(path);
  if (locale === defaultLocale) return bare;
  return bare === "/" ? "/it" : `/it${bare}`;
};
