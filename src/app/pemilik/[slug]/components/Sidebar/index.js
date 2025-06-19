'use client';
import React, { Fragment, useEffect } from 'react';
import Link from 'next/link';
import { formatPriceLocale, formatPhone } from '@/helpers';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Index = (props) => {
  const {
    slug,
    data,
    handlePhone,
    handleWhatsApp,
    handleLaporkanIklan,
    isLoading = false,
    handleBagikan
  } = props;

  return (
    <div
      className="card shadow p-4 position-sticky border-0 d-none d-lg-block"
      style={{
        top: '100px' // jarak dari atas saat sticky
      }}
    >
      <div className="align-items-center d-flex mb-3">
        <div className="d-flex">
          <div className="position-relative me-2" style={{ width: '80px' }}>
            {isLoading ? (
              <Skeleton circle height={80} width={80} />
            ) : (
              <img
                src={data?.avatar && data?.name ? data.avatar + data.name : null}
                alt="Foto Profil"
                className="rounded-circle img-fluid"
                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
              />
            )}
            {!isLoading && data?.pemilik_verified && (
              <i
                className="fa fa-check-circle text-primary"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: '8px',
                  background: 'white',
                  borderRadius: '50%',
                  fontSize: '14px'
                }}
              ></i>
            )}
          </div>
        </div>
        <div className="">
          {isLoading ? (
            <Skeleton width={100} />
          ) : (
            <strong className="d-block ST--Text" title={data?.name?.length > 50 ? data?.name : ''}>
              {(data?.name || '').length > 50 ? data.name.substring(0, 50) + '...' : data?.name}
            </strong>
          )}
        </div>
      </div>
      {isLoading ? (
        <Fragment>
          <Skeleton height={40} className="mb-2" />
          <Skeleton height={40} className="mb-2" />
          <Skeleton height={40} className="mb-2" />
        </Fragment>
      ) : (
        <Fragment>
          <button className="btn btn-success w-100 text-white" onClick={handleWhatsApp}>
            <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp
          </button>

          <button className="btn btn-outline-primary w-100 mt-2" onClick={handlePhone}>
            <FontAwesomeIcon icon={faPhone} /> {formatPhone(data?.no_whatsapp)}
          </button>

          <button
            className="btn btn-outline-dark border border-black w-100 mt-2"
            onClick={handleBagikan}
          >
            <FontAwesomeIcon icon={faShareAlt} className="me-1" /> Bagikan
          </button>
        </Fragment>
      )}
    </div>
  );
};

export default Index;
