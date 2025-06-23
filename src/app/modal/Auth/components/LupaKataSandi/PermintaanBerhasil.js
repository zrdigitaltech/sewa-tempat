'use client';
import React, { Fragment, useEffect, useState } from 'react';
import { UseModals } from '@/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeCircleCheck, faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';

const PermintaanBerhasil = ({ show, onClose, handleMasuk }) => {
  const [timer, setTimer] = useState(60);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  useEffect(() => {
    let interval;
    if (show && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [show, timer]);

  const formatTimer = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes > 0 ? minutes + ':' : ''}${seconds.toString().padStart(2, '0')}`;
  };

  const handleResendEmail = async () => {
    setIsSendingEmail(true);
    try {
      // Simulasikan pengiriman email ulang (ganti dengan fungsi API asli)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setTimer(60); // Reset timer
    } catch (err) {
      // Tangani error jika perlu
    } finally {
      setIsSendingEmail(false);
    }
  };

  const resetState = () => {
    setTimer(60);
  };

  return (
    <UseModals
      title="Email Telah Dikirim"
      show={show}
      onClose={() => {
        onClose();
        resetState();
      }}
      position="center"
      modalBody={
        <Fragment>
          <div className="text-center px-3 pb-3">
            <FontAwesomeIcon icon={faEnvelopeCircleCheck} className="text-primary mb-3" size="3x" />

            <p className="mb-4 text-muted">
              Silakan periksa kotak masuk email Anda untuk petunjuk mengatur ulang kata sandi.
            </p>

            <button
              className="btn btn-primary w-100 mb-2"
              onClick={() => {
                resetState();
                handleMasuk();
              }}
            >
              Kembali Masuk
            </button>

            <button
              disabled={timer > 0 || isSendingEmail}
              onClick={handleResendEmail}
              className="btn btn-link text-primary fw-medium p-0"
            >
              {timer === 0 && !isSendingEmail && (
                <FontAwesomeIcon icon={faArrowRotateRight} className="me-1" />
              )}
              {isSendingEmail ? 'Mengirim ulang...' : 'Kirim ulang email'}
              {timer > 0 && !isSendingEmail && <span> ({formatTimer()})</span>}
            </button>
          </div>
        </Fragment>
      }
      modalFooter={false}
    />
  );
};

export default PermintaanBerhasil;
