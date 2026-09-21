"use client";

import { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../Auth/AuthProvider";
import AuthForm from "../Auth/AuthForm";
import "./header.css";

const Header = () => {
  const { user, loading, signOut } = useAuth();
  const isPremium = useSelector((state) => state.profile.isPremium);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email ||
    "";
  const initial = displayName ? displayName.trim()[0].toUpperCase() : "?";
  const avatarUrl =
    user?.user_metadata?.avatar_url || user?.user_metadata?.picture || "";

  return (
    <>
      <header className="siteHeader d-flex align-items-center justify-content-between px-3">
        <div className="d-flex align-items-center gap-3">
          <Link
            href="/"
            className="siteHeader-logo fw-bold text-decoration-none text-white user-select-none"
          >
            Rayax
          </Link>
          <nav className="siteHeader-nav">
            <Link
              href="/generator"
              className="siteHeader-navLink text-decoration-none"
            >
              Генератор
            </Link>
            <Link
              href="/articles"
              className="siteHeader-navLink text-decoration-none"
            >
              Статті
            </Link>
            <Link
              href="/faq"
              className="siteHeader-navLink text-decoration-none"
            >
              FAQ
            </Link>
            <Link
              href="/about"
              className="siteHeader-navLink text-decoration-none"
            >
              Про нас
            </Link>
          </nav>

          <button
            type="button"
            className="siteHeader-burger"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Закрити меню" : "Відкрити меню"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        <div className="d-flex align-items-center gap-2">
          {!loading &&
            (user ? (
              <>
                <Link
                  href="/account"
                  className="d-flex align-items-center gap-2 text-decoration-none text-white"
                  title="Особистий кабінет"
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
                  Вийти
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                variant="outline-light"
                onClick={() => setShowAuthForm(true)}
              >
                Увійти
              </Button>
            ))}
        </div>

        <AuthForm show={showAuthForm} onHide={() => setShowAuthForm(false)} />
      </header>

      {menuOpen && (
        <nav className="siteHeader-mobileMenu">
          <Link href="/generator" onClick={closeMenu}>
            Генератор
          </Link>
          <Link href="/articles" onClick={closeMenu}>
            Статті
          </Link>
          <Link href="/faq" onClick={closeMenu}>
            FAQ
          </Link>
          <Link href="/about" onClick={closeMenu}>
            Про нас
          </Link>
        </nav>
      )}
    </>
  );
};

export default Header;
