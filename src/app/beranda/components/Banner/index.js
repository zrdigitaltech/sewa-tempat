'use client';

import React, { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UseFormSearch } from '@/components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { formatStrip } from '@/helpers';

export default function HomeHeroSection() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState({
    banner: false,
    btnSearch: false
  });

  const [formData, setFormData] = useState({
    tipeProperti: '',
    keyword: '',
    viewMode: 'list'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSearch = async () => {
    setIsLoading((prev) => ({ ...prev, btnSearch: true }));
    const { keyword, tipeProperti, viewMode } = formData;

    const keywordCleaned = formatStrip(keyword);
    let query = `/search?keyword=${keywordCleaned}`;

    if (tipeProperti) {
      const tipePropertiCleaned = formatStrip(tipeProperti);
      query += `&tipeProperti=${tipePropertiCleaned}`;
    }
    query += `&viewMode=${viewMode}`;

    router.push(query);
    setIsLoading((prev) => ({ ...prev, btnSearch: false }));
  };

  useEffect(() => {
    setIsLoading((prev) => ({ ...prev, banner: false }));
    const timer = setTimeout(() => {
      setIsLoading((prev) => ({ ...prev, banner: false }));
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="text-white d-flex align-items-center text-center text-md-start"
      style={{
        minHeight: '80vh',
        backgroundImage: "url('https://placehold.co/800x600')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        padding: '3rem 0'
      }}
    >
      {/* Overlay hitam */}
      <div
        className="position-absolute w-100 h-100"
        style={{ backgroundColor: 'rgba(0,0,0,0.6)', top: 0, left: 0 }}
      />

      <div className="container position-relative px-3 px-md-5">
        {isLoading?.banner ? (
          <Fragment>
            <Skeleton height={40} width={300} style={{ marginBottom: '1rem' }} />
            <Skeleton count={2} height={20} width={300} style={{ marginBottom: '1rem' }} />
            <div className="row g-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className={`data terakhir ${i === 3 ? 'col-12' : 'col-4 col-md-3'}`}>
                  <Skeleton height={40} />
                </div>
              ))}
            </div>
          </Fragment>
        ) : (
          <>
            <h1 className="display-6 fw-bold mb-3">Temukan Tempat Tinggal Impianmu dengan Mudah</h1>
            <p className="lead mb-4">
              Jelajahi properti dengan cepat, aman, dan terpercaya.
              <br />
              <strong>
                Atau pasarkan properti milikmu dan kelola semuanya dalam satu platform.
              </strong>
            </p>
            <UseFormSearch
              homePage={true}
              formData={formData}
              handleChange={handleChange}
              handleSearch={handleOnSearch}
              isLoading={isLoading?.btnSearch}
            />
          </>
        )}
      </div>
    </section>
  );
}
