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
          <ol className="breadcrumb mb-0 text-truncate" style={{ flexWrap: 'nowrap' }}>
            <li className="breadcrumb-item">
              {isLoading ? (
                <Skeleton width={60} height={16} />
              ) : (
                <Link href="/" className="">
                  Beranda
                </Link>
              )}
            </li>

            {isLoading ? (
              <Fragment>
                <li className="breadcrumb-item">
                  <Skeleton width={100} height={16} />
                </li>
                <li className="breadcrumb-item w-75">
                  <Skeleton width={`100%`} height={16} />
                </li>
              </Fragment>
            ) : (
              segments.map((item, idx) => (
                <li
                  key={idx}
                  className={`breadcrumb-item ${
                    idx === segments.length - 1 ? 'active text-truncate w-75' : ''
                  }`}
                  aria-current={idx === segments.length - 1 ? 'page' : undefined}
                >
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
