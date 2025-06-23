'use client';

import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListPanduan } from '@/redux/action/panduan/creator';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

import { PanduanCard } from '@/app/panduan/components';

// Skeleton Loader
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Index() {
  const dispatch = useDispatch();
  const panduanList = useSelector((state) => state?.panduan?.panduanList);
  const [isLoading, setIsLoading] = useState(false);

  const fetchList = async () => {
    setIsLoading(true);
    await dispatch(getListPanduan());
    setIsLoading(false);
  };

  useEffect(() => {
    fetchList();
  }, [dispatch]);
  return (
    <Fragment>
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center mb-4">
            <div className="col">
              <h2 className="fw-semibold mb-0">Panduan Properti</h2>
              <small className="d-none d-lg-block">
                Temukan berbagai tips, trik, dan informasi penting seputar dunia sewa-menyewa
                properti di sini.
              </small>
            </div>
            <div className="col-auto">
              <Link
                href="/panduan"
                className="d-inline-flex align-items-center gap-2 fw-semibold rounded-pill">
                Lihat Semua
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
          </div>

          <div className="overflow-auto pb-2">
            <div className="d-flex flex-nowrap gap-4">
              {isLoading
                ? Array.from({ length: 4 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="flex-shrink-0"
                      style={{ width: '305px', maxWidth: '70vw' }}>
                      <div className="bg-white rounded-3 shadow-sm h-100 overflow-hidden">
                        <div style={{ height: '180px', objectFit: 'cover' }}>
                          <Skeleton height="100%" />
                        </div>
                        <div className="p-3">
                          <Skeleton height={20} width="80%" />
                          <Skeleton height={14} width="50%" style={{ marginTop: 12 }} />
                        </div>
                      </div>
                    </div>
                  ))
                : panduanList?.slice(0, 8).map((item, idx) => (
                    <div
                      key={item?.id || idx}
                      className="flex-shrink-0"
                      style={{ width: '305px', maxWidth: '70vw' }}>
                      <PanduanCard guide={item} showAuthor={true} showDeskripsi={false} />
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
