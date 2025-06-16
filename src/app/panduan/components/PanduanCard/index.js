'use client';

import React from 'react';
import Link from 'next/link';
import '@/app/panduan/panduan.scss';
import { formatStrip } from '@/helpers';

const PanduanCard = ({ guide, linkKategori = false, showAuthor = false }) => {
  const slug = guide?.slug?.trim();
  const kategori = guide?.kategori?.trim();
  const authorSlug = guide?.authorSlug?.trim();

  const safeLink = (href, children) => (href ? <Link href={href}>{children}</Link> : children);

  return (
    <div className="card h-100 border-0 shadow-sm hover-shadow transition-all rounded-3">
      {guide.image && (
        <div className="position-relative">
          {safeLink(
            slug ? `/panduan/${slug}` : null,
            <img
              src={guide.image}
              alt={guide.title}
              className="card-img-top"
              style={{ height: '180px', objectFit: 'cover', cursor: slug ? 'pointer' : 'default' }}
            />
          )}

          {kategori && linkKategori ? (
            <Link href={`/panduan?kategori=${formatStrip(kategori)}`}>
              <span
                className="ST--badge position-absolute text-white"
                style={{ cursor: 'pointer' }}>
                <small>{kategori}</small>
              </span>
            </Link>
          ) : kategori ? (
            <span className="ST--badge position-absolute text-white">
              <small>{kategori}</small>
            </span>
          ) : null}
        </div>
      )}

      <div className="card-body">
        <h5
          className="card-title d-flex justify-content-between align-items-center ST--Text"
          title={guide.title}>
          {slug ? (
            <Link
              href={`/panduan/${slug}`}
              className="text-dark fw-semibold ST--Text text-decoration-none">
              {guide.title}
            </Link>
          ) : (
            <span className="text-dark fw-semibold">{guide.title}</span>
          )}
        </h5>

        {guide.deskripsi && (
          <p
            className="text-muted small mb-2 ST--Text"
            dangerouslySetInnerHTML={{ __html: guide.deskripsi }}
            title={guide.deskripsi}
          />
        )}

        <div className="text-muted small mt-2">
          {guide.date && (
            <span className="me-1">
              {new Date(guide.date).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </span>
          )}
          {showAuthor && guide.author && authorSlug && (
            <span>
              by{' '}
              <Link href={`/panduan/author/${authorSlug}`} className="text-decoration-none">
                {guide.author}
              </Link>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PanduanCard;
