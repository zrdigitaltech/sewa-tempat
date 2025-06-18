'use client';
import React from 'react';
import { UseBreadcrumb } from '@/components';
import { unFormatStrip } from '@/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Index = (props) => {
  const { slug } = props;

  return (
    <div className="pb-5">
      <section className="mt-3">
        <UseBreadcrumb title={'Panduan Tidak Ditemukan'} />
      </section>
      <div className="text-center pt-5">
        <FontAwesomeIcon icon={faSearch} size="4x" className="mb-3" />
        <h5 className="fw-bold mb-2">Panduan Tidak Ditemukan</h5>
        <p className="text-muted">
          Maaf, panduan dengan kata kunci{' '}
          <strong className="text-capitalize">{unFormatStrip(slug)}</strong> tidak ditemukan.
          <br />
          Silakan cari panduan dengan kata kunci lainnya, ya!
        </p>
      </div>
    </div>
  );
};

export default Index;
