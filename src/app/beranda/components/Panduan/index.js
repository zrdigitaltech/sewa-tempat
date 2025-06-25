'use client';

import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListPanduan } from '@/redux/action/panduan/creator';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

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
          <div className="row align-items-center mb-3 p-2 px-0">
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
                className="d-inline-flex align-items-center gap-2 fw-semibold rounded-pill"
              >
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
                      style={{ width: '305px', maxWidth: '70vw' }}
                    >
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
                      style={{ width: '305px', maxWidth: '70vw' }}
                    >
                      <div className="card h-100 border-0 shadow-sm hover-shadow transition-all rounded-3">
                        {item.image && (
                          <div className="position-relative">
                            <Link href={`/panduan/${item.slug}`}>
                              <img
                                src={item.image}
                                alt={item.title}
                                className="card-img-top"
                                style={{
                                  height: '180px',
                                  objectFit: 'cover',
                                  cursor: 'pointer'
                                }}
                              />
                            </Link>
                            <span className="ST--badge position-absolute text-white">
                              <small>{item.kategori}</small>
                            </span>
                          </div>
                        )}

                        <div className="card-body">
                          <div className="card-title fw-semibold">
                            <Link
                              href={`/panduan/${item.slug}`}
                              className="text-dark text-decoration-none ST--Text"
                              title={item.title}
                            >
                              {item.title}
                            </Link>
                          </div>

                          <div className="text-muted small mt-2">
                            {item.date && (
                              <span className="me-1">
                                {new Date(item.date).toLocaleDateString('id-ID', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric'
                                })}
                              </span>
                            )}
                            {item.author && (
                              <span>
                                by{' '}
                                <Link
                                  href={`/panduan/author/${item.authorSlug}`}
                                  className="text-decoration-none"
                                >
                                  {item.author}
                                </Link>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
