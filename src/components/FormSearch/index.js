'use client';
import React, { Fragment, useState } from 'react';
import {
  TipeKamar,
  TipeKost,
  TipeProperti,
  TipeSewa,
  Urutan
} from '@/components/FormSearch/components';
import './formsearch.scss';

export default function Index(props) {
  const {
    handleSearch,
    tipeProperti,
    page = false,
    homePage = false,
    formData,
    handleChange,
    isLoading = false
  } = props;
  const isApartemenOrRumah = tipeProperti === 'apartemen' || tipeProperti === 'rumah';
  const [isLoadingData, setIsLoadingData] = useState({
    tipeProperti: false
  });

  return (
    <section>
      <div className="row g-2">
        {/* Tipe Properti */}
        <div className="col-12 col-md-2">
          <TipeProperti
            tipeProperti={formData?.tipeProperti}
            handleChange={handleChange}
            isLoading={isLoadingData?.tipeProperti}
            setIsLoading={setIsLoadingData}
          />
        </div>

        {/* Input Search */}
        <div className={page ? 'col-12 col-md-10' : 'col-12 col-md-5'}>
          <input
            name="keyword"
            type="text"
            className="form-control rounded-3"
            placeholder="Cari lokasi atau nama properti"
            value={formData?.keyword}
            onChange={handleChange}
          />
        </div>

        {homePage && (
          <Fragment>
            {/* Tombol Cari */}
            <div className="col-12 col-md-3">
              <button
                className="btn btn-warning w-100 fw-semibold rounded-3"
                onClick={handleSearch}
                disabled={isLoading || isLoadingData?.tipeProperti}>
                {isLoading || isLoadingData?.tipeProperti ? 'Memuat...' : 'Cari Properti'}
              </button>
            </div>
          </Fragment>
        )}
      </div>

      {page && (
        <Fragment>
          <div className="d-flex p-2  flex-nowrap overflow-x-auto" style={{ marginLeft: '-8px' }}>
            {/* Urutan */}
            <div className="pe-2" style={{ minWidth: '180px' }}>
              <Urutan formData={formData?.sort} handleChange={handleChange} />
            </div>

            {/* Harga Maksimal */}
            <div className="pe-2" style={{ minWidth: '180px' }}>
              <div className="input-group">
                <span className="bg-primary input-group-text text-white">Rp</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Harga Maksimal"
                  name="harga_max"
                  value={formData?.harga_max || ''}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Tipe Sewa */}
            <div
              className={`${tipeProperti === 'kost' || isApartemenOrRumah ? 'pe-2' : ''}`}
              style={{ minWidth: '180px' }}>
              <TipeSewa tipeSewa={formData?.tipeSewa} handleChange={handleChange} />
            </div>

            {/* Tipe Kost */}
            {tipeProperti === 'kost' && (
              <div className="pe-2" style={{ minWidth: '180px' }}>
                <TipeKost tipeKost={formData?.tipeKost} handleChange={handleChange} />
              </div>
            )}

            {/* Tipe Kamar / Kamar Tidur */}
            {isApartemenOrRumah && (
              <div className="pe-2" style={{ minWidth: '180px' }}>
                <TipeKamar
                  tipeKamar={formData?.tipeKamar}
                  handleChange={handleChange}
                  tipeProperti={formData?.tipeProperti}
                />
              </div>
            )}

            {/* Tombol Cari */}
            <div className="ms-lg-auto ST--w-100 d-none d-lg-block">
              <button
                className="btn btn-warning w-100 fw-semibold rounded-3"
                onClick={handleSearch}
                disabled={isLoading || isLoadingData?.tipeProperti}>
                {isLoading || isLoadingData?.tipeProperti ? 'Memuat...' : 'Cari Properti'}
              </button>
            </div>
          </div>
          {/* Tombol Cari */}
          <div className="ms-lg-auto ST--w-100 d-lg-none mt-2">
            <button
              className="btn btn-warning w-100 fw-semibold rounded-3"
              onClick={handleSearch}
              disabled={isLoading || isLoadingData?.tipeProperti}>
              {isLoading || isLoadingData?.tipeProperti ? 'Memuat...' : 'Cari Properti'}
            </button>
          </div>
        </Fragment>
      )}
    </section>
  );
}
