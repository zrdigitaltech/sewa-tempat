'use client';
import React, { Fragment, useEffect, useState } from 'react';
import { UseModals, UseToasts } from '@/components';
import BelumLogin from '@/app/modal/HubungiPengiklanProperti/components/BelumLogin';
import SudahLogin from '@/app/modal/HubungiPengiklanProperti/components/SudahLogin';
import VerifikasiModal from '@/app/modal/HubungiPengiklanProperti/verifikasi';
import { useDispatch } from 'react-redux';
import { submitHubungiPengiklanProperti } from '@/redux/action/hubungiPengiklanProperti/creator';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faCheckCircle, faCommentSms } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Index = (props) => {
  const {
    show,
    onClose,
    setShowWhatsApp,
    isPageVerified,
    setIsPageVerified,
    handleGoWhatsApp,
    dataItem,
    setDataItem
  } = props;

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    verifikasi: 'whatsapp'
  });

  const [errors, setErrors] = useState({});
  const [showVerifikasi, setShowVerifikasi] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const verified = localStorage.getItem('isVerified') === 'true';
    setIsPageVerified(verified);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Hapus error untuk field yang sedang diedit
    if (errors[name]) {
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[name];
        return updatedErrors;
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nama tidak boleh kosong';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Nama minimal 3 karakter';
    } else if (formData.name.trim().length > 50) {
      newErrors.name = 'Nama tidak boleh lebih dari 50 karakter';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Nomor tidak boleh kosong';
    } else if (formData.phone.length < 9) {
      newErrors.phone = 'Nomor tidak boleh kurang dari 9 digit';
    } else if (formData.phone.length > 15) {
      newErrors.phone = 'Nomor tidak boleh lebih dari 15 digit';
    }
    if (!formData.verifikasi.trim()) {
      newErrors.verifikasi = 'Verifikasi tidak boleh kosong';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    if (validate()) {
      setIsSubmitting(true);
      try {
        // Kirim ke server
        const result = await dispatch(submitHubungiPengiklanProperti(formData));
        if (result.success) {
          onClose();
          setShowVerifikasi(true);
          clearForm();
        } else {
          console.error('Gagal submit form:', result.error);
          // Kamu bisa set error di UI jika perlu
          showError('Maaf, terjadi kendala saat mengirim data. Silakan coba sekali lagi.');
        }
        setIsSubmitting(false);
      } catch (error) {
        console.error('Unexpected submit error:', error);
        showError('Maaf, terjadi kesalahan yang tidak terduga. Silakan coba lagi nanti.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const clearForm = () => {
    setFormData({
      name: '',
      phone: '',
      verifikasi: 'whatsapp'
    });
    setErrors({});
    setErrorMessage('');
  };

  const showError = (msg) => {
    if (errorMessage !== msg) {
      setErrorMessage(msg);
      if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);

      errorTimeoutRef.current = setTimeout(() => {
        setErrorMessage('');
        errorTimeoutRef.current = null;
      }, 5000);
    }
  };

  return (
    <Fragment>
      <UseModals
        title="Hubungi Pengiklan Properti"
        show={show}
        onClose={() => {
          onClose();
          clearForm();
          if (isPageVerified) {
            setDataItem(null);
          }
        }}
        position="center"
        styleModal={{ zIndex: 9999999 }}
        styleModalBackdrop={{ zIndex: 999999 }}
        modalBody={
          <Fragment>
            {isPageVerified ? (
              <SudahLogin dataItem={dataItem} />
            ) : (
              <BelumLogin formData={formData} errors={errors} handleChange={handleChange} />
            )}
          </Fragment>
        }
        additionalInformation={
          isPageVerified ? (
            ''
          ) : (
            <Fragment>
              <div className="container p-2 border-top">
                <div className="row row-cols-1 row-cols-md-2 g-3">
                  <div className="col-6 text-center border-end">
                    <FontAwesomeIcon icon={faLock} className="text-primary me-2 mt-1" />
                    <br />
                    <small>
                      <strong>
                        <small>tempat</small>Sewa.Com
                      </strong>{' '}
                      menjaga keamanan data diri kamu
                    </small>
                  </div>
                  <div className="col-6 text-center">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-primary me-2 mt-1" />
                    <br />
                    <small> 1x verifikasi untuk komunikasi dengan seluruh pemilik properti.</small>
                  </div>
                </div>
              </div>
            </Fragment>
          )
        }
        modalFooter={
          isPageVerified ? (
            <button
              type="button"
              className="btn btn-success w-100 text-white"
              onClick={handleGoWhatsApp}
            >
              <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp
            </button>
          ) : (
            <Fragment>
              {/* Start Belum Login */}
              {errorMessage && (
                <UseToasts message={errorMessage} show={true} onClose={() => setErrorMessage('')} />
              )}
              <button
                type="button"
                className={`btn btn-${
                  formData?.verifikasi === 'whatsapp' ? 'success' : 'primary'
                } w-100 text-white`}
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                <FontAwesomeIcon
                  icon={formData.verifikasi === 'whatsapp' ? faWhatsapp : faCommentSms}
                />
                {isSubmitting ? 'Memproses...' : 'Lanjutkan'}
              </button>
              <small>
                Dengan ini Anda setuju untuk mematuhi{' '}
                <a
                  href="/syarat-dan-ketentuan"
                  target="_blank"
                  className=""
                  rel="noopener noreferrer"
                >
                  <b>Syarat dan Ketentuan</b>
                </a>{' '}
                &amp;{' '}
                <a href="/kebijakan-privasi" target="_blank" className="" rel="noopener noreferrer">
                  <b>Kebijakan Privasi</b>
                </a>{' '}
                di <small>tempat</small>Sewa.Com
              </small>
            </Fragment>
          )
        }
      />
      <VerifikasiModal
        show={showVerifikasi}
        onClose={() => setShowVerifikasi(false)}
        formData={formData}
        setFormData={setFormData}
        handleGantiNomor={() => (setShowWhatsApp(true), setShowVerifikasi(false))}
        setIsPageVerified={() => (
          setIsPageVerified,
          setShowVerifikasi(false),
          setShowWhatsApp(true),
          setIsPageVerified(true)
        )}
      />
    </Fragment>
  );
};

export default Index;
