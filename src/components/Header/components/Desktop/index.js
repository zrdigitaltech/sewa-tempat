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

export default function Desktop(props) {
  const { openDisewa, setOpenDisewa, setShowBantuan, showBantuan, setShowAuth, setAuthType } =
    props;
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
    <div className="d-none d-lg-flex flex-grow-1 justify-content-between align-items-center">
      {/* Kiri */}
      <ul className="navbar-nav flex-row gap-3 mb-0">
        <li className={`nav-item dropdown`}>
          <a
            href="#"
            className={`nav-link dropdown-toggle cursor-pointer text-dark ${
              openDisewa || tipePropertiList.some((link) => link.slug === activeTipeProperti)
                ? 'active'
                : ''
            }`}
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded={openDisewa ? 'true' : 'false'}
            onClick={(e) => e.preventDefault()}>
            Disewa
          </a>
          <ul className={`dropdown-menu ${openDisewa ? 'show' : ''}`}>
            {isLoading ? (
              <li>
                <Skeleton height={30} count={5} className="mb-2" />
              </li>
            ) : (
              tipePropertiList.map((link, idx) => (
                <li key={link?.slug || idx}>
                  <Link
                    className={`dropdown-item ${activeTipeProperti === link.slug ? 'active' : ''}`}
                    href={`/search?keyword=&tipeProperti=${link.slug}&viewMode=list`}
                    onClick={() => setOpenDisewa(false)}>
                    {iconTipeProperti(link.nama)} Sewa {link.nama}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </li>
        <li className="align-items-center d-flex nav-item">|</li>
        <li className="nav-item">
          <Link
            className={`nav-link text-dark a-hover ${pathname === '/panduan' ? 'active' : ''}`}
            href="/panduan"
            onClick={() => setOpenDisewa(false)}>
            Panduan
          </Link>
        </li>
        <li className="nav-item">
          <div
            className={`nav-link text-dark a-hover cursor-pointer ${showBantuan ? 'active' : ''}`}
            onClick={() => (setOpenDisewa(false), setShowBantuan(true))}>
            Bantuan
          </div>
        </li>
      </ul>

      {/* Kanan */}
      <ul className="navbar-nav flex-row gap-3 mb-0">
        <li className="nav-item">
          <button
            className="btn btn-primary"
            onClick={() => {
              router.push('/pasang-iklan-properti');
              setOpenDisewa(false);
            }}>
            + Pasang Iklan
          </button>
        </li>
        <li className="nav-item">
          <div
            className="nav-link text-dark a-hover cursor-pointer"
            onClick={() => {
              setAuthType('register');
              setShowAuth(true);
              setOpenDisewa(false);
            }}>
            Daftar
          </div>
        </li>
        <li className="nav-item">
          <div
            className="nav-link text-dark a-hover cursor-pointer"
            onClick={() => {
              setAuthType('login');
              setShowAuth(true);
              setOpenDisewa(false);
            }}>
            Masuk
          </div>
        </li>
      </ul>
    </div>
  );
}
