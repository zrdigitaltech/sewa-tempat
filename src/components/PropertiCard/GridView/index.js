'use client';

import React, { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { formatPrice, formatPhone } from '@/helpers';
import '../../PropertiCard/propertiCard.scss';
import { UseTooltips } from '@/components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { iconTipeProperti } from '@/helpers';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

export default function PropertiCard(props) {
  const router = useRouter();
  const {
    nama,
    harga,
    durasi,
    slug,
    image,
    kota,
    btnTelp = true,
    no_whatsapp,
    member,
    isLoading = false,
    swipeable = true,
    newTab = false,
    tipe_properti,
    showKategori = false,
    handlePhone,
    handleWhatsApp,
    showTipeKamar = false,
    tipe_kost,
    showInterior = false
  } = props;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const maxIndicators = 5;

  const handleChange = (index) => setSelectedIndex(index);

  const getStartIndex = (index) => {
    if (index <= 2) return 0;
    if (index >= image.length - 2) return image.length - maxIndicators;
    return index - 2;
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => setIsMobile(window.innerWidth <= 480);
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  UseTooltips();

  const CardContent = () => (
    <div className="card-body ST--properti-card-body p-2 p-sm-3">
      {isLoading ? (
        <Skeleton count={2} height={20} width="80%" />
      ) : (
        <>
          {showKategori && (
            <div className="d-flex gap-2 mb-2 overflow-x-auto">
              <span className="align-content-center badge border border-secondary text-secondary bg-transparent text-capitalize">
                {iconTipeProperti(tipe_properti?.nama)}{' '}
                {tipe_properti?.nama?.toLowerCase() === 'kost'
                  ? `${tipe_properti?.nama} ${tipe_kost}`
                  : tipe_properti?.nama}
              </span>

              {showInterior &&
                tipe_properti?.informasi_interior
                  ?.filter((item) => item.nama === 'Kondisi Perabotan')
                  ?.map((item, index) => (
                    <span
                      key={index}
                      className="align-content-center badge border border-secondary text-secondary bg-transparent text-capitalize">
                      {item.fasilitas?.join(', ')}
                    </span>
                  ))}
            </div>
          )}
          <h3 className="card-title fw-bold">
            Rp{formatPrice(harga)}
            <span className="text-capitalize"> / {durasi}</span>
          </h3>
          <span
            className="card-text fw-semibold mb-0 ST--Text"
            title={nama.length > 50 ? nama : ''}>
            {nama}
          </span>
          <p className={`text-muted small mb-0 text-truncate ${showTipeKamar && 'mb-1'}`}>{kota}</p>
        </>
      )}
    </div>
  );

  return (
    <div className={`card border-0 shadow-sm h-100`}>
      <div className="position-relative" style={{ height: isMobile ? '' : '250px' }}>
        {isLoading ? (
          <Skeleton height={isMobile ? '' : 250} />
        ) : (
          <Carousel
            showArrows={['Super Featured', 'Premium'].includes(member)}
            showStatus={true}
            showIndicators={['Super Featured', 'Premium'].includes(member)}
            autoPlay={false}
            infiniteLoop={false}
            swipeable={false}
            emulateTouch={true}
            showThumbs={false}
            selectedItem={selectedIndex}
            onChange={handleChange}
            renderIndicator={(onClickHandler, isSelected, index, label) => {
              const dynamicStartIndex = getStartIndex(selectedIndex);
              if (index < dynamicStartIndex || index >= dynamicStartIndex + maxIndicators)
                return null;

              const style = {
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 28,
                height: 28,
                margin: '0 1px',
                color: isSelected ? '#1e3a8a' : '#bbb',
                cursor: 'pointer',
                fontSize: 20,
                borderRadius: '50%'
              };

              return (
                <li key={index} className="d-inline">
                  <span
                    style={style}
                    onClick={onClickHandler}
                    onKeyDown={onClickHandler}
                    role="button"
                    tabIndex={0}
                    aria-label={`${label} ${index + 1}`}>
                    ●
                  </span>
                </li>
              );
            }}
            className="rounded-top-2 overflow-hidden">
            {image?.map((x, i) => (
              <div
                key={x || i}
                onClick={() => {
                  if (selectedIndex === i) {
                    const href = `/properti/${slug}`;
                    if (newTab) {
                      window.open(href, '_blank');
                    } else {
                      router.push(href);
                    }
                  }
                }}
                style={{ cursor: 'pointer' }}>
                <img
                  src={x}
                  className="w-100"
                  style={{
                    height: isMobile ? '' : '250px',
                    objectFit: 'cover'
                  }}
                  alt="TempatSewa.Com Indonesia: Situs Sewa Kos, Rumah, Apartemen, Ruko, Kios, dan Gudang"
                />
              </div>
            ))}
          </Carousel>
        )}

        {(member === 'Super Featured' || member === 'Premium') && (
          <div
            className={`ST__badge ${
              member === 'Super Featured' ? 'bg-primary' : member === 'Premium' ? 'bg-warning' : ''
            }`}>
            <i className="fa fa-bolt"></i>
            <span>{member}</span>
          </div>
        )}
      </div>

      {newTab ? (
        <a
          href={`/properti/${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-dark">
          {CardContent()}
        </a>
      ) : (
        <Link href={`/properti/${slug}`} className="text-dark">
          {CardContent()}
        </Link>
      )}

      {btnTelp && (
        <div className="bg-primary-subtle card-footer p-2 px-sm-3 py-sm-2 mt-auto">
          <div className="d-flex flex-column flex-sm-row gap-2">
            <div className="w-100">
              {isLoading ? (
                <Skeleton height={40} />
              ) : (
                <button
                  className="btn btn-primary align-items-center d-sm-flex w-100"
                  onClick={handlePhone}
                  aria-label={`Telepon ${formatPhone(no_whatsapp)}`}>
                  <FontAwesomeIcon icon={faPhone} className="pe-1" /> {formatPhone(no_whatsapp)}
                </button>
              )}
            </div>
            <div className="w-100">
              {isLoading ? (
                <Skeleton height={40} />
              ) : (
                <button
                  className="btn btn-success d-sm-flex align-items-center text-white w-100 pe-1"
                  onClick={handleWhatsApp}
                  aria-label={`WhatsApp ${formatPhone(no_whatsapp)}`}>
                  <i className="fa-brands fa-whatsapp pe-1" aria-hidden="true"></i> WhatsApp
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
