'use client';

import React from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';

// Skeleton Loader
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PanduanHeader = ({ panduanDetail, isLoading }) => {
  return (
    <>
      <section className="my-3">
        <div className="container">
          {isLoading ? (
            <Skeleton height={30} width={250} />
          ) : (
            <Breadcrumb title={panduanDetail?.title} containerClassName="px-0" />
          )}
        </div>
      </section>

      <section>
        <div className="container">
          {isLoading ? (
            <>
              <h1 className="fs-3 fw-bold text-dark">
                <Skeleton height={32} width={400} />
              </h1>
              <div className="text-muted mb-2">
                <Skeleton height={20} width={300} />
              </div>
            </>
          ) : (
            <>
              <h1 className="fs-3 fw-bold text-dark">{panduanDetail?.title}</h1>
              <div className="text-muted mb-2">
                Ditulis oleh{' '}
                <Link href={`/panduan/author/${panduanDetail?.authorSlug}`}>
                  <b>{panduanDetail?.author}</b>
                </Link>{' '}
                pada{' '}
                {panduanDetail?.date &&
                  new Date(panduanDetail?.date).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default PanduanHeader;
