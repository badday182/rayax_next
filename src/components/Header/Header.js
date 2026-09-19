'use client';

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../Auth/AuthProvider';
import AuthForm from '../Auth/AuthForm';
import './header.css';

const Header = () => {
  const { user, loading, signOut } = useAuth();
  const [showAuthForm, setShowAuthForm] = useState(false);

  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email ||
    '';
  const initial = displayName ? displayName.trim()[0].toUpperCase() : '?';

  return (
    <header className="siteHeader d-flex align-items-center justify-content-between px-3">
      <span className="siteHeader-logo fw-bold">Rayax</span>

      <div className="d-flex align-items-center gap-2">
        {!loading &&
          (user ? (
            <>
              <span className="siteHeader-avatar">{initial}</span>
              <span className="siteHeader-name d-none d-sm-inline">
                {displayName}
              </span>
              <Button
                size="sm"
                variant="outline-light"
                onClick={signOut}
              >
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
  );
};

export default Header;
