'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../Auth/AuthProvider';
import AuthForm from '../Auth/AuthForm';
import './header.css';

const Header = () => {
  const { user, loading, signOut } = useAuth();
  const isPremium = useSelector((state) => state.profile.isPremium);
  const [showAuthForm, setShowAuthForm] = useState(false);

  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email ||
    '';
  const initial = displayName ? displayName.trim()[0].toUpperCase() : '?';
  const avatarUrl =
    user?.user_metadata?.avatar_url || user?.user_metadata?.picture || '';

  return (
    <header className='siteHeader d-flex align-items-center justify-content-between px-3'>
      <span className='siteHeader-logo fw-bold'>Rayax</span>

      <div className='d-flex align-items-center gap-2'>
        {!loading &&
          (user ? (
            <>
              <Link
                href='/account'
                className='d-flex align-items-center gap-2 text-decoration-none text-white'
                title='Особистий кабінет'
              >
                <span className='siteHeader-avatarWrap'>
                  {isPremium && (
                    <span className='siteHeader-premiumBadge'>Pro</span>
                  )}
                  {avatarUrl ? (
                    <img
                      className='siteHeader-avatar-img'
                      src={avatarUrl}
                      alt={displayName}
                      referrerPolicy='no-referrer'
                    />
                  ) : (
                    <span className='siteHeader-avatar'>{initial}</span>
                  )}
                </span>
                <span className='siteHeader-name d-none d-sm-inline'>
                  {displayName}
                </span>
              </Link>
              <Button
                size='sm'
                variant='outline-light'
                onClick={signOut}
              >
                Вийти
              </Button>
            </>
          ) : (
            <Button
              size='sm'
              variant='outline-light'
              onClick={() => setShowAuthForm(true)}
            >
              Увійти
            </Button>
          ))}
      </div>

      <AuthForm
        show={showAuthForm}
        onHide={() => setShowAuthForm(false)}
      />
    </header>
  );
};

export default Header;
