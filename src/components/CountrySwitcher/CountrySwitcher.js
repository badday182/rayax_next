"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  locales,
  getDict,
  localeFromPathname,
  localePath,
} from "@/i18n";
import "./countrySwitcher.css";

const FlagUA = () => (
  <svg viewBox="0 0 36 36" aria-hidden="true" focusable="false">
    <rect width="36" height="18" fill="#005BBB" />
    <rect y="18" width="36" height="18" fill="#FFD500" />
  </svg>
);

const FlagIT = () => (
  <svg viewBox="0 0 36 36" aria-hidden="true" focusable="false">
    <rect width="12" height="36" fill="#009246" />
    <rect x="12" width="12" height="36" fill="#F1F2F1" />
    <rect x="24" width="12" height="36" fill="#CE2B37" />
  </svg>
);

const flags = { uk: FlagUA, it: FlagIT };

const CountrySwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const current = localeFromPathname(pathname);
  const dict = getDict(current);
  const CurrentFlag = flags[current];

  const select = (locale) => {
    setOpen(false);
    if (locale !== current) router.push(localePath(pathname, locale));
  };

  return (
    <div className="countrySwitcher">
      <button
        type="button"
        className="countrySwitcher-current"
        onClick={() => setOpen((v) => !v)}
        aria-label={dict.nav.chooseCountry}
        aria-expanded={open}
        title={getDict(current).countryName}
      >
        <CurrentFlag />
      </button>

      {open && (
        <>
          <div
            className="countrySwitcher-backdrop"
            onClick={() => setOpen(false)}
          />
          <ul className="countrySwitcher-menu">
            {locales.map((locale) => {
              const Flag = flags[locale];
              return (
                <li key={locale}>
                  <button
                    type="button"
                    className={`countrySwitcher-option${
                      locale === current ? " is-active" : ""
                    }`}
                    onClick={() => select(locale)}
                  >
                    <span className="countrySwitcher-optionFlag">
                      <Flag />
                    </span>
                    {getDict(locale).countryName}
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default CountrySwitcher;
