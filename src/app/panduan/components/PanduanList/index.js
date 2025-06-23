'use clint';

import React, { Fragment } from 'react';
import { PanduanCard } from '@/app/panduan/components';
import { unFormatStrip } from '@/helpers';

// Skeleton Loader
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Index = (props) => {
  const { guides, keyword, kategori, isLoading } = props;

  if (isLoading) {
    return (
      <div className="row">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="col-6 col-sm-3 mb-4">
            <div>
              <Skeleton height={180} />
              <Skeleton width="80%" style={{ marginTop: 8 }} />
              <Skeleton width="60%" style={{ marginTop: 4 }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (guides.length === 0) {
    return (
      <Fragment>
        <div className="text-center pt-5">
          <FontAwesomeIcon icon={faSearch} size="4x" className="mb-3" />
          <h5 className="fw-bold mb-2">Tidak Ditemukan Panduan yang Sesuai</h5>
          <p className="text-muted">
            Maaf, panduan dengan kata kunci{' '}
            <strong className="text-capitalize">
              {unFormatStrip(kategori)} {unFormatStrip(keyword)}
            </strong>{' '}
            tidak ditemukan.
            <br />
            Silakan cari panduan dengan kata kunci lainnya, ya!
          </p>
        </div>
      </Fragment>
    );
  }

  return (
    <div className="row">
      {guides.map((item, idx) => (
        <div key={item?.id || idx} className="col-6 col-sm-3 mb-4">
          <PanduanCard guide={item} showAuthor={true} />
        </div>
      ))}
    </div>
  );
};

export default Index;
