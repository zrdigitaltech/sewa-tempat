'use client';

import React, { Fragment } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Breadcrumb = ({ className = '', containerClassName = '', isLoading = false }) => {
  const pathname = usePathname();

  const segments = pathname
    .split('/')
    .filter(Boolean)
    .map((segment, idx, arr) => {
      const href = '/' + arr.slice(0, idx + 1).join('/');
      // Capitalize first letter, replace dash with space
      const name = segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      return { name, href };
    });

  return (
    <section className={`${className && className + ' pt-3'}`}>
      <div className={`container ${containerClassName}`}>
        <nav aria-label="breadcrumb">
          <ol
            className="breadcrumb mb-0 d-flex flex-nowrap overflow-auto"
            style={{
              whiteSpace: 'nowrap'
            }}>
            {/* Item pertama */}
            <li className="breadcrumb-item flex-shrink-0">
              {isLoading ? <Skeleton width={60} height={16} /> : <Link href="/">Beranda</Link>}
            </li>

            {/* Skeleton loading (opsional) */}
            {isLoading ? (
              <>
                <li className="breadcrumb-item flex-shrink-0">
                  <Skeleton width={100} height={16} />
                </li>
                <li className="breadcrumb-item flex-shrink-0 w-75">
                  <Skeleton width="100%" height={16} />
                </li>
              </>
            ) : (
              segments.map((item, idx) => (
                <li
                  key={idx}
                  className={`breadcrumb-item text-nowrap text-truncate ${idx === segments.length - 1 ? 'active' : ''}`}
                  style={{
                    flexShrink: 0
                  }}
                  aria-current={idx === segments.length - 1 ? 'page' : undefined}>
                  {idx !== segments.length - 1 ? (
                    <Link href={item.href} className="text-primary">
                      {item.name}
                    </Link>
                  ) : (
                    <b className="text-primary" title={item.name}>
                      {item.name}
                    </b>
                  )}
                </li>
              ))
            )}
          </ol>
        </nav>
      </div>
    </section>
  );
};

export default Breadcrumb;
