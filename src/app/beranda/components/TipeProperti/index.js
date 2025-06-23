'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListTipeProperti } from '@/redux/action/tipeProperti/creator';
import Link from 'next/link';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './kategori.scss';

import { iconTipeProperti } from '@/helpers';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function KategoriCepat() {
  const tipePropertiList = useSelector((state) => state?.tipeProperti?.tipePropertiList);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const fetchTipeProperti = async () => {
    setIsLoading(true);
    try {
      await dispatch(getListTipeProperti());
    } catch (error) {
      console.error('Gagal fetch tipe properti:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTipeProperti();
  }, [dispatch]);

  const SampleNextArrow = ({ className, onClick }) => (
    <div
      className={`${className} ST--arrow ST--arrow--next`}
      onClick={onClick}
      style={{ zIndex: 10 }}
    >
      <FontAwesomeIcon icon={faChevronRight} className="text-dark fs-4" />
    </div>
  );

  const SamplePrevArrow = ({ className, onClick }) => (
    <div
      className={`${className} ST--arrow ST--arrow--prev`}
      onClick={onClick}
      style={{ zIndex: 10 }}
    >
      <FontAwesomeIcon icon={faChevronLeft} className="text-dark fs-4" />
    </div>
  );

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesPerRow: 1,
    rows: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          rows: 2,
          slidesPerRow: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          rows: 2,
          slidesPerRow: 1
        }
      }
    ]
  };

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="text-center fw-semibold mb-3">Kategori Cepat</h2>
        {isLoading ? (
          <div
            className="d-flex flex-nowrap justify-content-start gap-3 overflow-auto py-4"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollBehavior: 'smooth'
            }}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex-shrink-0"
                style={{
                  flex: '1 1 calc(33.333% - 1rem)',
                  maxWidth: 'calc(33.333% - 1rem)',
                  minWidth: '140px',
                  flexBasis: '140px'
                }}
              >
                <div className="card text-center border-0 shadow h-100 rounded-3 overflow-hidden">
                  <div className="card-body py-4">
                    <div className="fs-2 mb-2">
                      <Skeleton circle width={40} height={40} />
                    </div>
                    <Skeleton height={20} width={`80%`} style={{ margin: '0 auto' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-4">
            <Slider {...settings}>
              {tipePropertiList?.map((cat, index) => (
                <div key={index}>
                  <Link
                    href={`/search?keyword=&tipeProperti=${cat.slug}&viewMode=list`}
                    className="text-dark text-decoration-none"
                  >
                    <div className="card text-center border-0 shadow-sm h-100">
                      <div className="card-body ST--tipeproperti-card-body py-4">
                        <div className="fs-2 mb-2">{iconTipeProperti(cat?.nama)}</div>
                        <h3 className="card-title mb-0 text-truncate">Sewa {cat.nama}</h3>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </section>
  );
}
