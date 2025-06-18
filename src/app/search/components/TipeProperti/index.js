'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListTempat } from '@/redux/action/tipeProperti/creator';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './kategori.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function KategoriTempat() {
  const tempatList = useSelector((state) => state?.tipeProperti?.tempatList);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const tipeProperti = searchParams.get('tipeProperti');
  const viewMode = searchParams.get('viewMode');

  useEffect(() => {
    const fetchTempat = async () => {
      setIsLoading(true);
      await dispatch(getListTempat(tipeProperti));
      setIsLoading(false);
    };

    fetchTempat();
  }, [tipeProperti]);

  const kategoriLabel = useMemo(() => {
    return tempatList[0]?.kategori || '';
  }, [tempatList]);

  const iconTipeProperti = (nama) => {
    switch (nama?.toLowerCase()) {
      case 'kost':
        return '🛏️';
      case 'rumah':
        return '🏠';
      case 'apartemen':
        return '🏢';
      case 'ruko':
        return '🏬';
      case 'kios':
      case 'toko':
        return '🛒';
      case 'gudang':
      case 'pabrik':
        return '🏗️';
      case 'tanah':
        return '🌄';
      case 'villa':
        return '🏖️';
      case 'ruang kantor':
        return '💼';
      case 'komersial':
        return '🏪';
      case 'hotel':
        return '🏨';
      case 'gedung':
        return '🏛️';
      case 'kondotel':
        return '🏩';
      default:
        return '🏡';
    }
  };

  const SampleNextArrow = ({ className, onClick }) => (
    <div
      className={`${className} ST--arrow ST--arrow--next`}
      onClick={onClick}
      style={{ zIndex: 10 }}>
      <i className="fas fa-chevron-right text-dark fs-4"></i>
    </div>
  );

  const SamplePrevArrow = ({ className, onClick }) => (
    <div
      className={`${className} ST--arrow ST--arrow--prev`}
      onClick={onClick}
      style={{ zIndex: 10 }}>
      <i className="fas fa-chevron-left text-dark fs-4"></i>
    </div>
  );

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesPerRow: 1,
    rows: tempatList.length > 6 ? 2 : 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          rows: tempatList.length > 6 ? 2 : 1,
          slidesPerRow: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          rows: tempatList.length > 6 ? 2 : 1,
          slidesPerRow: 1
        }
      }
    ]
  };

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center fw-semibold mb-3 text-capitalize">
          {isLoading ? (
            <Skeleton width={220} height={28} style={{ margin: '0 auto' }} />
          ) : (
            `Cari Tempat ${kategoriLabel} Lainnya`
          )}
        </h2>

        {isLoading ? (
          <div
            className="d-flex flex-nowrap justify-content-start gap-3 overflow-auto px-2 py-4"
            style={{ WebkitOverflowScrolling: 'touch', scrollBehavior: 'smooth' }}>
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex-shrink-0"
                style={{
                  flex: '1 1 calc(33.333% - 1rem)',
                  maxWidth: 'calc(33.333% - 1rem)',
                  minWidth: '140px',
                  flexBasis: '140px'
                }}>
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
          <div className="px-2 py-4">
            <Slider {...settings}>
              {tempatList?.map((cat, index) => (
                <div key={index} className="p-2">
                  <Link
                    href={`/search?keyword=&tipeProperti=${cat.slug}&viewMode=${viewMode}`}
                    className="text-dark">
                    <div className="card text-center border-0 shadow-sm h-100">
                      <div className="card-body py-4">
                        <div className="fs-2 mb-2">{iconTipeProperti(cat?.nama)}</div>
                        <h6 className="card-title mb-0 text-truncate">Sewa {cat.nama}</h6>
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
