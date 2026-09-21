"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../Auth/AuthProvider";
import AuthForm from "../Auth/AuthForm";
import CountrySwitcher from "../CountrySwitcher/CountrySwitcher";
import { getDict, localeFromPathname, localePath } from "@/i18n";
import "./header.css";

const Header = () => {
  const { user, loading, signOut } = useAuth();
  const isPremium = useSelector((state) => state.profile.isPremium);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const dict = getDict(locale);
  const href = (path) => localePath(path, locale);

  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email ||
    "";
  const initial = displayName ? displayName.trim()[0].toUpperCase() : "?";
  const avatarUrl =
    user?.user_metadata?.avatar_url || user?.user_metadata?.picture || "";

  const navLinks = [
    { path: "/generator", label: dict.nav.generator },
    { path: "/articles", label: dict.nav.articles },
    { path: "/faq", label: dict.nav.faq },
  ];

  return (
    <>
      <header className="siteHeader d-flex align-items-center justify-content-between px-3">
        <div className="d-flex align-items-center gap-3">
          <Link
            href={href("/")}
            className="siteHeader-logo fw-bold text-decoration-none text-white user-select-none"
          >
            Rayax
          </Link>
          <nav className="siteHeader-nav">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={href(link.path)}
                className="siteHeader-navLink text-decoration-none"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="siteHeader-burger"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? dict.nav.closeMenu : dict.nav.openMenu}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        <div className="d-flex align-items-center gap-2">
          <CountrySwitcher />

          {!loading &&
            (user ? (
              <>
                <Link
                  href={href("/account")}
                  className="d-flex align-items-center gap-2 text-decoration-none text-white"
                  title={dict.nav.account}
                >
                  <span className="siteHeader-avatarWrap">
                    {isPremium && (
                      <span className="siteHeader-premiumBadge">Pro</span>
                    )}
                    {avatarUrl ? (
                      <img
                        className="siteHeader-avatar-img"
                        src={avatarUrl}
                        alt={displayName}
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span className="siteHeader-avatar">{initial}</span>
                    )}
                  </span>
                  <span className="siteHeader-name d-none d-sm-inline">
                    {displayName}
                  </span>
                </Link>
                <Button size="sm" variant="outline-light" onClick={signOut}>
                  {dict.nav.signOut}
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                variant="outline-light"
                onClick={() => setShowAuthForm(true)}
              >
                {dict.nav.signIn}
              </Button>
            ))}
        </div>

        <AuthForm show={showAuthForm} onHide={() => setShowAuthForm(false)} />
      </header>

      {menuOpen && (
        <nav className="siteHeader-mobileMenu">
          {navLinks.map((link) => (
            <Link key={link.path} href={href(link.path)} onClick={closeMenu}>
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </>
  );
};

export default Header;
