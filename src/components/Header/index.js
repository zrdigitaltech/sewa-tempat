'use client';

import React, { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import './header.scss';
import { Desktop, Mobile } from '@/components/Header/components';
import BantuanModal from '@/components/Header/modal/Bantuan';
import { AuthModal } from '@/app/modal';

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  // Desktop state
  const [openDisewa, setOpenDisewa] = useState(false);
  const [showBantuan, setShowBantuan] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  const [showAuth, setShowAuth] = useState(false);
  const [authType, setAuthType] = useState('login');

  // Cek jika di client (karena window hanya tersedia di browser)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 320);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <Fragment>
      <nav className="navbar navbar-light bg-white shadow-sm sticky-top">
        <div className="container d-flex justify-content-between align-items-center py-2">
          {/* Logo Brand */}
          <Link
            href="/"
            className="navbar-brand fw-bold d-flex align-items-center"
            onClick={() => setOpenDisewa(false)}>
            <span className="text-primary">tempat</span>Sewa.Com
          </Link>

          <div className="d-flex">
            <button
              className={`btn btn-primary ${isMobile ? 'd-none' : 'd-lg-none'}`}
              onClick={() => {
                setOpenDisewa(false);
                router.push('/pasang-iklan-properti');
              }}>
              + Pasang Iklan
            </button>

            {/* Toggle Offcanvas for mobile */}
            <button
              className="btn d-lg-none p-0 mx-2 my-1"
              type="button"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label="Toggle mobile menu">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          {/* Desktop Menu */}
          <Desktop
            openDisewa={openDisewa}
            setOpenDisewa={setOpenDisewa}
            showBantuan={showBantuan}
            setShowBantuan={setShowBantuan}
            setShowAuth={setShowAuth}
            setAuthType={setAuthType}
          />
        </div>

        {/* Offcanvas Mobile Menu */}
        <Mobile
          handleClose={closeMenu}
          isMenuOpen={isMenuOpen}
          showBantuan={showBantuan}
          setShowBantuan={setShowBantuan}
          setShowAuth={setShowAuth}
          setAuthType={setAuthType}
        />
      </nav>

      <BantuanModal
        show={showBantuan}
        onClose={() => setShowBantuan(false)}
        setShowBantuan={setShowBantuan}
      />
      <AuthModal show={showAuth} authType={authType} onClose={() => setShowAuth(false)} />
    </Fragment>
  );
}
