'use client';
import React, { Fragment, useEffect, useState } from 'react';
import { formatPrice } from '@/helpers';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../propertiCard.scss';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ShareModal from '@/app/modal/Share';
import { UseTooltips } from '@/components';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { iconTipeProperti } from '@/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faBolt,
  faPhone,
  faShareAlt,
  faDoorOpen,
  faBed,
  faBath
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export default function Index(props) {
  const router = useRouter();
  const {
    nama,
    harga,
    durasi,
    slug,
    image,
    kota,
    btnTelp = true,
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
    showInterior = false,
    pemilikImage,
    pemilik,
    upload,
    pemilik_verified,
    dataItem,
    setDataItem,
    resetDataItem
  } = props;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const maxIndicators = 5;

  const [showShare, setShowShare] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  const [isMobile375, setIsMobile375] = useState(window.innerWidth <= 375);

  const handleChange = (index) => {
    setSelectedIndex(index);
  };

  const getStartIndex = (index) => {
    if (index <= 2) return 0;
    if (index >= image.length - 2) return image.length - maxIndicators;
    return index - 2;
  };

  const renderCombinedInteriorCard = (interior, targets, label, iconClass) => {
    if (!interior || !Array.isArray(interior)) return null;

    const total = targets.reduce((sum, name) => {
      const item = interior.find((i) => i.nama === name);
      const val = parseInt(item?.fasilitas?.[0]) || 0;
      return sum + val;
    }, 0);

    if (total === 0) return null;

    return (
      <small
        className="align-content-center text-secondary text-capitalize"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        data-bs-custom-class="custom-tooltip"
        data-bs-title={label}>
        {iconClass && <FontAwesomeIcon icon={iconClass} className="me-1" />}
        {total}
      </small>
    );
  };

  const renderSingleInteriorCard = (interior, target, label, iconClass) => {
    if (!interior || !Array.isArray(interior)) return null;

    const item = interior.find((i) => i.nama === target);
    const value = item?.fasilitas?.[0];

    if (!value) return null;

    return (
      <small
        className="align-content-center text-secondary text-capitalize"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        data-bs-custom-class="custom-tooltip"
        data-bs-title={label}>
        {iconClass && <FontAwesomeIcon icon={iconClass} className="me-1" />}
        {value}
      </small>
    );
  };

  const CardContent = () => {
    return (
      <Fragment>
        {isLoading ? (
          <div>
            <div className="d-flex gap-2 mb-2 overflow-x-auto">
              <Skeleton height={24} width={100} />
              <Skeleton height={24} width={140} />
              <Skeleton height={24} width={120} />
            </div>

            <h5 className="card-title fw-bold my-2">
              <Skeleton width={120} height={24} />
            </h5>

            <span className="card-text fw-semibold mb-0 ST--Text">
              <Skeleton width="100%" height={20} />
            </span>
            <p className="text-muted small mb-0">
              <Skeleton width={100} height={16} />
            </p>
          </div>
        ) : (
          <div>
            {showKategori && (
              <Fragment>
                <div className="d-flex gap-2 mb-2 overflow-x-auto">
                  <span className="bg-primary-subtle align-content-center badge text-secondary text-capitalize">
                    {iconTipeProperti(tipe_properti?.nama)}{' '}
                    {typeof tipe_properti === 'object'
                      ? tipe_properti?.nama.toLowerCase() === 'kost'
                        ? tipe_properti?.nama + ' ' + tipe_kost
                        : tipe_properti?.nama
                      : ''}
                  </span>

                  {showInterior &&
                    tipe_properti?.informasi_interior
                      ?.filter((item) => item.nama === 'Kondisi Perabotan')
                      ?.map((item, index) => (
                        <span
                          key={index}
                          className="bg-primary-subtle align-content-center badge text-secondary text-capitalize">
                          {item.fasilitas && item.fasilitas?.join(', ')}
                        </span>
                      ))}

                  <span className="bg-primary-subtle align-content-center badge text-secondary text-capitalize">
                    <FontAwesomeIcon icon={faClock} /> Diperbarui: {upload}
                  </span>
                </div>
              </Fragment>
            )}

            <h5 className="card-title fw-bold my-2">
              Rp{formatPrice(harga)}
              <span className="text-capitalize"> / {durasi}</span>
            </h5>

            <span
              className="card-text fw-semibold mb-0 ST--Text"
              title={nama.length > 50 ? nama : ''}>
              {nama}
            </span>
            <p className={`text-muted small mb-0 text-truncate ${showTipeKamar && 'mb-1'}`}>
              {kota}
            </p>

            <div className="px-2 bg-primary-subtle rounded-1 gap-3 d-flex">
              {renderSingleInteriorCard(
                tipe_properti?.informasi_interior,
                'Tipe Kamar',
                'Ruang',
                faDoorOpen
              )}
              {renderCombinedInteriorCard(
                tipe_properti?.informasi_interior,
                ['Kamar Tidur', 'Kamar Tidur ART', 'Tipe Kamar'],
                'Kamar Tidur',
                faBed
              )}

              {renderCombinedInteriorCard(
                tipe_properti?.informasi_interior,
                ['Kamar Mandi', 'Kamar Mandi ART'],
                'Kamar Mandi',
                faBath
              )}
            </div>
          </div>
        )}
      </Fragment>
    );
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 480);
    setIsMobile375(window.innerWidth <= 375);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // untuk update langsung saat pertama render

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  UseTooltips();

  return (
    <Fragment>
      <div className="card mb-3 shadow-sm">
        <div className="row g-0">
          <div className="col-md-4">
            <div className="position-relative" style={{ height: isMobile ? '' : '250px' }}>
              {isLoading ? (
                <Skeleton height={isMobile ? '' : 250} />
              ) : (
                <Carousel
                  showArrows={(member === 'Super Featured') | (member === 'Premium') && true}
                  autoPlay={false}
                  infiniteLoop={false}
                  showStatus={true}
                  showIndicators={(member === 'Super Featured') | (member === 'Premium') && true}
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
                      marginLeft: 6,
                      color: isSelected ? '#1e3a8a' : '#bbb',
                      cursor: 'pointer',
                      fontSize: 16
                    };

                    return (
                      <span
                        style={style}
                        onClick={onClickHandler}
                        onKeyDown={onClickHandler}
                        key={index}
                        role="button"
                        tabIndex={0}
                        aria-label={`${label} ${index + 1}`}>
                        ●
                      </span>
                    );
                  }}
                  className="overflow-hidden">
                  {image?.map((x, i) => (
                    <div
                      key={x || i}
                      onClick={() => {
                        if (newTab === true) {
                          if (selectedIndex === i) {
                            window.open(`/properti/${slug}`, '_blank');
                          }
                        } else {
                          if (selectedIndex === i) {
                            router.push(`/properti/${slug}`);
                          }
                        }
                      }}
                      style={{ cursor: 'pointer' }}
                      className="bg-secondary-subtle">
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

              {(member === 'Super Featured' || member === 'Premium') && !isLoading && (
                <div
                  className={`ST__badge ${
                    (member === 'Super Featured' && 'bg-primary') ||
                    (member === 'Premium' && 'bg-warning')
                  } `}>
                  <FontAwesomeIcon icon={faBolt} />
                  <span>{member}</span>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-8">
            <div className="card-body h-100 d-flex flex-column justify-content-between p-0">
              {newTab === true ? (
                <a
                  href={`/properti/${slug}`}
                  target="_blank"
                  className=" text-dark p-2"
                  rel="noopener noreferrer">
                  {CardContent()}
                </a>
              ) : (
                <Link href={`/properti/${slug}`} className=" text-dark p-2">
                  {CardContent()}
                </Link>
              )}

              {btnTelp && (
                <div className="align-items-center bg-primary-subtle d-flex flex-wrap gap-3 p-2">
                  {/* Pemilik */}
                  <div className="d-flex align-items-center">
                    <div
                      className="position-relative me-2 d-none d-sm-block"
                      style={{ width: '48px', height: '48px' }}>
                      {isLoading ? (
                        <Skeleton circle height={48} width={48} />
                      ) : (
                        <>
                          <img
                            src={pemilikImage + pemilik}
                            alt="Foto Profil"
                            className="rounded-circle img-fluid"
                            style={{
                              width: '48px',
                              height: '48px',
                              objectFit: 'cover'
                            }}
                          />
                          {pemilik_verified && (
                            <i
                              className="fa fa-check-circle text-primary"
                              style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                background: 'white',
                                borderRadius: '50%',
                                fontSize: '14px'
                              }}
                            />
                          )}
                        </>
                      )}
                    </div>
                    <div>
                      {isLoading ? (
                        <>
                          <Skeleton width={100} />
                          <Skeleton width={80} />
                        </>
                      ) : (
                        <>
                          <strong
                            className="d-block text-truncate"
                            title={pemilik?.length > (isMobile375 ? 5 : 15) ? pemilik : ''}>
                            {(pemilik || '').length > (isMobile375 ? 5 : 15)
                              ? pemilik.substring(0, isMobile375 ? 5 : 15) + '...'
                              : pemilik}{' '}
                            {pemilik_verified && (
                              <i
                                className="fa fa-check-circle text-primary d-sm-none"
                                style={{
                                  background: 'white',
                                  borderRadius: '50%',
                                  fontSize: '14px'
                                }}
                              />
                            )}
                          </strong>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Kontrol Tombol */}
                  <div className="ms-auto d-flex gap-2">
                    <div className="flex-fill">
                      {isLoading ? (
                        <Skeleton height={40} width={40} />
                      ) : (
                        <button
                          className="w-100 btn btn-outline-primary ST__kontrol-btn"
                          onClick={handlePhone}>
                          <FontAwesomeIcon icon={faPhone} />
                        </button>
                      )}
                    </div>
                    <div className="flex-fill">
                      {isLoading ? (
                        <Skeleton height={40} width={90} />
                      ) : (
                        <button
                          className="w-100 btn btn-success text-white ST__kontrol-btn"
                          onClick={handleWhatsApp}>
                          <FontAwesomeIcon icon={faWhatsapp} className="me-1" /> WhatsApp
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {isLoading ? (
                <div
                  className="position-absolute"
                  style={{
                    top: '3px',
                    right: '8px'
                  }}>
                  <Skeleton width={40} height={40} borderRadius={8} />
                </div>
              ) : (
                <div
                  className="position-absolute"
                  style={{
                    top: '3px',
                    right: '8px'
                  }}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-custom-class="custom-tooltip"
                  data-bs-title="Bagikan">
                  <button
                    className="btn bg-white shadow"
                    onClick={() => (setShowShare(true), setDataItem())}>
                    <FontAwesomeIcon icon={faShareAlt} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ShareModal
        show={showShare}
        onClose={() => (setShowShare(false), resetDataItem())}
        data={dataItem}
      />
    </Fragment>
  );
}
