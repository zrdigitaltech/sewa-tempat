'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';

import { UseBreadcrumb } from '@/components';
import { PanduanList, PanduanFilter } from './components';

import { getListPanduan, getPanduanSearch } from '@/redux/action/panduan/creator';

import { formatStrip } from '@/helpers';

const PanduanPage = () => {
  const panduanList = useSelector((state) => state?.panduan?.panduanList);
  const panduanSearch = useSelector((state) => state?.panduan?.panduanSearch);
  const dispatch = useDispatch();

  const searchParams = useSearchParams();
  const router = useRouter();

  const [inputKeyword, setInputKeyword] = useState('');
  const [formData, setFormData] = useState({ keyword: '', kategori: '' });
  const [isLoading, setIsLoading] = useState({
    kategori: false,
    search: false
  });

  useEffect(() => {
    const keyword = searchParams.get('keyword') || '';
    const kategori = searchParams.get('kategori') || '';
    setInputKeyword(keyword);
    setFormData({ keyword, kategori });
  }, [searchParams]);

  useEffect(() => {
    const fetchSearch = async () => {
      setIsLoading((prev) => ({ ...prev, search: true }));
      await dispatch(getPanduanSearch(formData));
      setIsLoading((prev) => ({ ...prev, search: false }));
    };
    fetchSearch();
  }, [formData, dispatch]);

  useEffect(() => {
    const fetchList = async () => {
      setIsLoading((prev) => ({ ...prev, kategori: true }));
      await dispatch(getListPanduan());
      setIsLoading((prev) => ({ ...prev, kategori: false }));
    };
    fetchList();
  }, [dispatch]);

  const handleSearchEnter = () => {
    updateQueryInURL(inputKeyword, formData.kategori);
    setFormData((prev) => ({ ...prev, keyword: inputKeyword }));
  };

  const handleInputKeywordChange = (val) => {
    setInputKeyword(val);
  };

  const handleCategoryChange = (kategori) => {
    const strippedKategori = formatStrip(kategori).toLowerCase();
    updateQueryInURL(inputKeyword, strippedKategori);
    setFormData((prev) => ({ ...prev, kategori: strippedKategori }));
  };

  const updateQueryInURL = (keyword, kategori) => {
    const params = new URLSearchParams();
    if (keyword) params.set('keyword', keyword);
    if (kategori) params.set('kategori', kategori);
    router.replace(`?${params.toString()}`);
  };

  const categories = Array.from(new Set(panduanList.map((item) => item.kategori)));

  return (
    <div className="pb-5">
      <section className="mt-3">
        <UseBreadcrumb title="Panduan" />
      </section>

      <section className="pt-3 pb-5">
        <div className="container">
          <p className="text-gray-600 mb-6">
            <b>
              Baca informasi lengkap seputar properti yang bisa jadi panduan, tips, dan informasi
              penting seputar properti, mulai dari sewa, pengelolaan, hingga investasi.
            </b>
            <br />
            <span>Dilengkapi rekomendasi dan tips properti yang wajib diketahui.</span>
          </p>

          <PanduanFilter
            searchTerm={inputKeyword}
            setSearchTerm={handleInputKeywordChange}
            selectedCategory={formData.kategori}
            setSelectedCategory={handleCategoryChange}
            categories={categories}
            onSearchEnter={handleSearchEnter}
            isLoading={isLoading?.kategori}
          />

          <PanduanList
            guides={panduanSearch}
            keyword={formData.keyword}
            kategori={formData.kategori}
            isLoading={isLoading.search}
          />
        </div>
      </section>
    </div>
  );
};

export default PanduanPage;
