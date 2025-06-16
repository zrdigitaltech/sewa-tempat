'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { getListTipeProperti } from '@/redux/action/tipeProperti/creator';
import { iconTipeProperti } from '@/helpers';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '@/components/Header/header.scss';

export default function Index({ isMenuOpen, handleClose, setShowBantuan, showBantuan }) {
  const [openDisewa, setOpenDisewa] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeTipeProperti = searchParams.get('tipeProperti');
  const tipePropertiList = useSelector((state) => state?.tipeProperti?.tipePropertiList);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const toggleDisewa = () => {
    setOpenDisewa(!openDisewa);
  };

  const fetchTipeProperti = async () => {
    setIsLoading(true);
    try {
      await dispatch(getListTipeProperti());
    } catch (error) {
      console.error('Gagal fetch tipe properti:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTipeProperti();
  }, [dispatch]);

  return (
    <div
      className={`offcanvas offcanvas-end ${isMenuOpen ? 'show' : ''}`}
      tabIndex="-1"
      id="mobileMenu"
      aria-labelledby="mobileMenuLabel">
      <div className="offcanvas-header border-bottom" style={{ height: '72px' }}>
        <div
          id="mobileMenuLabel"
          className="offcanvas-title fw-bold fs-5 cursor-pointer"
          onClick={() => {
            router.push('/');
            handleClose();
          }}>
          <span className="text-primary">tempat</span>Sewa.Com
        </div>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          onClick={handleClose}></button>
      </div>

      <div className="offcanvas-body d-flex flex-column gap-2">
        <a
          className={`nav-link text-dark ${pathname === '/user/login' ? 'active' : ''}`}
          href="/user/login"
          target="_blank"
          onClick={handleClose}>
          LogIn
        </a>

        <div>
          <button
            className={`btn btn-link nav-link text-dark w-100 d-flex justify-content-between align-items-center px-0 ${
              openDisewa || tipePropertiList.some((link) => link.slug === activeTipeProperti)
                ? 'active'
                : ''
            }`}
            onClick={toggleDisewa}
            type="button">
            Disewa
            <i className={`fa fa-chevron-${openDisewa ? 'up' : 'down'} small`}></i>
          </button>

          <div className={`submenu-wrapper ${openDisewa ? 'open' : ''} ps-3`}>
            {isLoading ? (
              <Skeleton height={30} count={5} className="mb-2" />
            ) : (
              tipePropertiList.map((link, idx) => (
                <Link
                  key={link?.path || idx}
                  className={`nav-link text-dark mb-1 ${
                    activeTipeProperti === link.slug ? 'active' : ''
                  }`}
                  href={`/search?keyword=&tipeProperti=${link.slug}&viewMode=list`}
                  onClick={handleClose}>
                  {iconTipeProperti(link.nama)} Sewa {link.nama}
                </Link>
              ))
            )}
          </div>
        </div>

        <Link
          className={`nav-link text-dark ${pathname === '/panduan' ? 'active' : ''}`}
          href="/panduan"
          onClick={handleClose}>
          Panduan
        </Link>
        <div
          className={`nav-link text-dark cursor-pointer ${showBantuan === true ? 'active' : ''}`}
          onClick={() => setShowBantuan(true)}>
          Bantuan
        </div>
      </div>

      <div className="offcanvas-footer p-3 border-top shadow ST--PasangIklan__mobile">
        <Link className="btn btn-primary w-100" href="/pasang-iklan-properti" onClick={handleClose}>
          + Pasang Iklan
        </Link>
      </div>
    </div>
  );
}
