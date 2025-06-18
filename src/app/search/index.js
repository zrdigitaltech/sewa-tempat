'use client';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSearchResult } from '@/redux/action/kontrakan/creator';
import { UseFormSearch } from '@/components';
import { GridView, ListView } from '@/components/PropertiCard';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  capitalizeWords,
  formatUnderscore,
  formatPriceLocale,
  formatRupiah,
  unFormatRupiah,
  formatStrip,
  unFormatStrip
} from '@/helpers';
import { TipeProperti, ToggleView } from '@/app/search/components';
import classNames from 'classnames';

// Modals
import { HubungiPengiklanPropertiModal, KonsultasiModal } from '@/app/modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export default function Index() {
  const searchResultList = useSelector((state) => state?.kontrakan?.searchResultList);
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(8);

  const router = useRouter();
  const searchParams = useSearchParams();

  const tipeProperti = searchParams.get('tipeProperti');
  const keyword = searchParams.get('keyword');
  const tipeSewa = searchParams.get('tipeSewa');

  const sort = searchParams.get('sort');
  const harga_max = searchParams.get('hargaMax');
  const tipeKamar = searchParams.get('tipeKamar');
  const tipeKost = searchParams.get('tipeKost');
  const viewMode = searchParams.get('viewMode');

  // UI State
  const [isLoading, setIsLoading] = useState({
    btnSearch: false,
    data: false
  });
  const [tipePropertiValidasi, setTipePropertiValidasi] = useState(tipeProperti);
  const [isPageVerified, setIsPageVerified] = useState(false);

  // Modal States
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [showKonsultasi, setShowKonsultasi] = useState(false);
  const [dataItem, setDataItem] = useState(null);

  const [formData, setFormData] = useState({
    tipeProperti: '',
    keyword: '',
    tipeSewa: '',
    sort: '',
    harga_max: '',
    tipeKamar: '',
    tipeKost: '',
    viewMode: 'list'
  });

  const scrollHasilPencarian = () => {
    setTimeout(() => {
      const section = document.getElementById('HasilPencarian');
      if (section) {
        const yOffset = -90; // offset atas
        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const fetchFormData = async () => {
    setIsLoading((prev) => ({ ...prev, data: true }));
    await setFormData({
      tipeProperti: tipeProperti,
      keyword: unFormatStrip(keyword),
      tipeSewa: tipeSewa,
      sort: sort,
      harga_max: formatRupiah(harga_max),
      tipeKamar: tipeKamar,
      tipeKost: tipeKost,
      viewMode: viewMode || 'list'
    });
    setIsLoading((prev) => ({ ...prev, data: false }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'harga_max') {
      const formatted = formatRupiah(value);
      setFormData((prev) => ({ ...prev, [name]: formatted }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (name === 'tipeProperti') {
      setTipePropertiValidasi(value);
      setFormData((prev) => ({ ...prev, [name]: value, tipeKamar: '', tipeKost: '' }));
    }
  };

  const handleOnSearch = async () => {
    setIsLoading((prev) => ({ ...prev, btnSearch: true }));
    const { keyword, tipeProperti, tipeSewa, sort, harga_max, tipeKamar, tipeKost, viewMode } =
      formData;

    // Membangun query string
    const keywordCleaned = formatStrip(keyword);
    let query = `/search?keyword=${keywordCleaned}`;

    // Menambahkan tipeProperti dan tipeSewa jika ada nilainya
    if (tipeProperti) {
      query += `&tipeProperti=${tipeProperti}`;
    }
    if (tipeSewa) {
      query += `&tipeSewa=${tipeSewa}`;
    }
    if (sort) {
      query += `&sort=${sort}`;
    }
    if (harga_max) {
      query += `&hargaMax=${unFormatRupiah(harga_max)}`;
    }
    if (tipeKamar) {
      query += `&tipeKamar=${tipeKamar}`;
    }
    if (tipeKost) {
      query += `&tipeKost=${tipeKost}`;
    }
    query += `&viewMode=${viewMode}`;

    // Navigasi ke halaman pencarian dengan query yang sudah dibangun
    router.push(query);

    // Tunggu data dari Redux
    await dispatch(getSearchResult(query));

    // Scroll ke hasil pencarian
    scrollHasilPencarian();

    setIsLoading((prev) => ({ ...prev, btnSearch: false }));
  };

  useEffect(() => {
    const query = `?${searchParams.toString()}`;
    dispatch(getSearchResult(query));
    fetchFormData();
  }, [searchParams.toString()]);

  const handleLoadMore = () => {
    setVisible((prev) => prev + 8); // tambah 8 lagi setiap klik
  };

  const handleGoToWhatsApp = (no_whatsapp) => {
    if (!no_whatsapp) {
      alert('Nomor WhatsApp tidak tersedia.');
      return;
    }

    alert(`Redirect langsung ke whatsapp ${no_whatsapp}`);
  };

  const updateViewModeInQuery = (newViewMode) => {
    const currentParams = new URLSearchParams(searchParams.toString()); // dari useSearchParams
    currentParams.set('viewMode', newViewMode);

    router.push(`/search?${currentParams.toString()}`);
  };

  return (
    <Fragment>
      <section
        className={classNames('mt-3', {
          'mb-5': !(tipeProperti && searchResultList?.length === 0)
        })}>
        <div className="container">
          {/* Form Search */}
          <div className="mb-5">
            <UseFormSearch
              page={true}
              formData={formData}
              handleChange={handleChange}
              handleSearch={handleOnSearch}
              isLoading={isLoading?.btnSearch}
              tipeProperti={tipePropertiValidasi}
            />
          </div>

          {/* Placeholder hasil pencarian */}
          <div id="HasilPencarian">
            {searchResultList?.length > 0 && (
              <Fragment>
                <h3 className="fw-bold mb-2 text-capitalize">
                  Temukan{' '}
                  {tipeProperti === null && keyword === ''
                    ? 'Properti'
                    : unFormatStrip(tipeProperti) + unFormatStrip(keyword)}{' '}
                  Impian Anda di Indonesia
                </h3>

                <p className="text-muted mb-3">
                  Kami telah menemukan <strong>{searchResultList?.length}</strong> properti yang
                  cocok untuk Anda.
                </p>
              </Fragment>
            )}

            <div
              className={`row ${searchResultList?.length === 0 && formData?.viewMode !== 'grid' && 'pb-5'}`}>
              {formData?.viewMode === 'grid' ? (
                <Fragment>
                  <div className={`col-12 mb-3`}>
                    <ToggleView
                      viewMode={formData?.viewMode}
                      handleGridView={() => updateViewModeInQuery('grid')}
                      handleListView={() => updateViewModeInQuery('list')}
                    />
                  </div>
                  {/* Grid View */}
                  {isLoading?.data || isLoading?.banner
                    ? Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} className="col-6 col-sm-6 col-lg-3 mb-4">
                          <GridView isLoading={isLoading?.data || isLoading?.banner} />
                        </div>
                      ))
                    : searchResultList?.slice(0, visible)?.map((item, index) => (
                        <div key={index} className="col-6 col-sm-6 col-lg-3 mb-4">
                          <GridView
                            {...item}
                            showKategori={true}
                            showTipeKamar={true}
                            showInterior={true}
                            handlePhone={() => (setShowWhatsApp(true), setDataItem(item))}
                            handleWhatsApp={() =>
                              isPageVerified
                                ? handleGoToWhatsApp(item?.no_whatsapp)
                                : setShowWhatsApp(true)
                            }
                            isLoading={false}
                          />
                        </div>
                      ))}

                  {/* Tombol Muat Lainnya */}
                  {visible < searchResultList?.length && (
                    <div className="text-center">
                      <button
                        className="btn btn-warning fw-semibold rounded-3 px-5"
                        onClick={handleLoadMore}>
                        Muat Lainnya
                      </button>
                    </div>
                  )}

                  {searchResultList?.length === 0 && (
                    <Fragment>
                      <div className="text-center py-5">
                        <FontAwesomeIcon icon={faSearch} size="4x" className="mb-3" />
                        <h5 className="fw-bold mb-2">Tidak Ditemukan Properti yang Sesuai</h5>
                        <p className="text-muted">
                          Maaf, properti dengan kata kunci{' '}
                          <strong className="text-capitalize">
                            {unFormatStrip(tipeProperti)} {unFormatStrip(keyword)} {sort}{' '}
                            {formatPriceLocale(parseInt(harga_max))} {tipeSewa}{' '}
                            {formatUnderscore(tipeKamar)} {tipeKost}
                          </strong>{' '}
                          tidak ditemukan.
                          <br />
                          Silakan cari properti dengan kata kunci lainnya, ya!
                        </p>
                      </div>
                    </Fragment>
                  )}
                </Fragment>
              ) : (
                // List View
                <Fragment>
                  <div className="col-12 col-lg-8">
                    <div className={`w-100 mb-3`}>
                      <ToggleView
                        viewMode={formData?.viewMode}
                        handleGridView={() => updateViewModeInQuery('grid')}
                        handleListView={() => updateViewModeInQuery('list')}
                      />
                    </div>
                    {isLoading?.data || isLoading?.banner
                      ? Array.from({ length: 8 }).map((_, index) => (
                          <div key={index} className="mb-3">
                            <ListView isLoading={isLoading?.data || isLoading?.banner} />
                          </div>
                        ))
                      : searchResultList?.slice(0, visible)?.map((item, index) => (
                          <div key={index} className="mb-3">
                            <ListView
                              {...item}
                              showKategori={true}
                              showTipeKamar={true}
                              showInterior={true}
                              handlePhone={() => (setShowWhatsApp(true), setDataItem(item))}
                              handleWhatsApp={() =>
                                isPageVerified
                                  ? handleGoToWhatsApp(item?.no_whatsapp)
                                  : setShowWhatsApp(true)
                              }
                              isLoading={false}
                              dataItem={dataItem}
                              setDataItem={() => setDataItem(item)}
                              resetDataItem={() => setDataItem(null)}
                            />
                          </div>
                        ))}

                    {/* Tombol Muat Lainnya */}
                    {visible < searchResultList?.length && (
                      <div className="text-center mt-4">
                        <button
                          className="btn btn-warning fw-semibold rounded-3 px-5"
                          onClick={handleLoadMore}>
                          Muat Lainnya
                        </button>
                      </div>
                    )}

                    {searchResultList?.length === 0 && (
                      <Fragment>
                        <div className="text-center pt-5">
                          <FontAwesomeIcon icon={faSearch} size="4x" className="mb-3" />
                          <h5 className="fw-bold mb-2">Tidak Ditemukan Properti yang Sesuai</h5>
                          <p className="text-muted">
                            Maaf, properti dengan kata kunci{' '}
                            <strong className="text-capitalize">
                              {unFormatStrip(tipeProperti)} {unFormatStrip(keyword)} {sort}{' '}
                              {formatPriceLocale(parseInt(harga_max))} {tipeSewa}{' '}
                              {formatUnderscore(tipeKamar)} {tipeKost}
                            </strong>{' '}
                            tidak ditemukan.
                            <br />
                            Silakan cari properti dengan kata kunci lainnya, ya!
                          </p>
                        </div>
                      </Fragment>
                    )}
                  </div>

                  <div className="col-12 col-lg-4 d-none d-lg-block">
                    <div className="sticky-top" style={{ top: '80px', zIndex: 1 }}>
                      <div className="shadow-sm">
                        <img
                          src="https://placehold.co/350x600?text=Iklan"
                          alt="TempatSewa.Com Indonesia: Situs Sewa Kos, Rumah, Apartemen, Ruko, Kios, dan Gudang"
                          className="img-fluid rounded w-100"
                        />
                      </div>
                    </div>
                  </div>
                </Fragment>
              )}
            </div>
          </div>
        </div>

        {tipeProperti && searchResultList?.length === 0 ? (
          <Fragment>
            <TipeProperti tipeProperti={tipeProperti} viewMode={viewMode} />
            <div className="container mb-5 mt-3 d-flex justify-content-center">
              <div className="col-12 col-sm-10 text-center cursor-pointer">
                <div className="position-relative" onClick={() => setShowKonsultasi(true)}>
                  <img
                    src="https://placehold.co/1760x333"
                    className="w-100"
                    alt="TempatSewa.Com Indonesia: Situs Sewa Kos, Rumah, Apartemen, Ruko, Kios, dan Gudang"
                  />
                  <div
                    className="position-absolute"
                    style={{
                      top: '50%',
                      right: '30px',
                      transform: 'translateY(-50%)'
                    }}>
                    <button className="btn btn-primary btn-lg">
                      <FontAwesomeIcon icon={faWhatsapp} className="pe-1" /> Konsultasi Gratis
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        ) : (
          ''
        )}
      </section>

      <HubungiPengiklanPropertiModal
        show={showWhatsApp}
        setShowWhatsApp={setShowWhatsApp}
        onClose={() => (setShowWhatsApp(false), setDataItem(null))}
        isPageVerified={isPageVerified}
        setIsPageVerified={setIsPageVerified}
        handleGoWhatsApp={() => handleGoToWhatsApp(dataItem?.no_whatsapp)}
        dataItem={dataItem}
      />
      <KonsultasiModal show={showKonsultasi} onClose={() => setShowKonsultasi(false)} />
    </Fragment>
  );
}
