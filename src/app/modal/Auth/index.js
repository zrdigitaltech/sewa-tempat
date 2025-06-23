'use client';

import React, { Fragment, useState } from 'react';
import { UseModals } from '@/components';
import { Daftar, Masuk, LupaKataSandi } from './components';
import PermintaanBerhasilModal from '@/app/modal/Auth/components/LupaKataSandi/PermintaanBerhasil';

const Index = ({ show, onClose, authType = 'login', setAuthType, setShowAuth }) => {
  const [showPermintaanBerhasil, setShowPermintaanBerhasil] = useState(false);
  return (
    <Fragment>
      <UseModals
        title=""
        show={show}
        onClose={onClose}
        position="center"
        classModalBody="p-0"
        modalDialog="modal-lg"
        modalBody={
          <Fragment>
            {/* Tombol Close */}
            <button
              type="button"
              className="btn-close position-absolute"
              style={{ top: '8px', right: '8px', zIndex: 5 }}
              onClick={onClose}
            ></button>

            {/* Konten utama modal */}
            <div
              className="d-flex flex-column flex-md-row align-items-stretch"
              style={{ minHeight: '585px' }}
            >
              {/* Kiri: Background Image (disembunyikan di mobile) */}
              <div
                className="d-none d-lg-block w-75"
                style={{
                  backgroundImage: "url('/assets/images/bg-login.svg')",
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center'
                }}
              />

              {/* Kanan: Form login/register */}
              <div className="w-100 w-50 position-relative">
                {authType === 'register' ? (
                  <Daftar onClose={onClose} handleMasuk={() => setAuthType('login')} />
                ) : authType === 'forgot' ? (
                  <LupaKataSandi
                    onClose={onClose}
                    handleMasuk={() => setAuthType('login')}
                    handleDaftar={() => setAuthType('register')}
                    setShowPermintaanBerhasil={setShowPermintaanBerhasil}
                    setShowAuth={setShowAuth}
                  />
                ) : (
                  <Masuk
                    onClose={onClose}
                    handleDaftar={() => setAuthType('register')}
                    handleLupaKataSandi={() => setAuthType('forgot')}
                  />
                )}
              </div>
            </div>
          </Fragment>
        }
        modalFooter={false}
      />
      <PermintaanBerhasilModal
        show={showPermintaanBerhasil}
        onClose={() => setShowPermintaanBerhasil(false)}
        handleMasuk={() => (
          setShowAuth(true), setAuthType('login'), setShowPermintaanBerhasil(false)
        )}
      />
    </Fragment>
  );
};

export default Index;
