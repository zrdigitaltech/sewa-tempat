'use client';
import React, { Fragment, useState } from 'react';
import classNames from 'classnames';
import UlasanBerhasil from './UlasanBerhasil';
import { UseToasts, UseModals } from '@/components';
import { useDispatch } from 'react-redux';
import { submitUlasanPengguna } from '@/redux/action/ulasanPengguna/creator';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';

const IndexUlasan = (props) => {
  const { show, onClose } = props;
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 0,
    komentar: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleRating = (rating) => {
    setFormData((prev) => ({ ...prev, rating }));
    if (errors.rating) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.rating;
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nama tidak boleh kosong';
    else if (formData.name.trim().length < 3) newErrors.name = 'Nama minimal 3 karakter';
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Email tidak valid';
    if (formData.rating < 1 || formData.rating > 5)
      newErrors.rating = 'Pilih rating antara 1 sampai 5';
    if (!formData.komentar.trim()) newErrors.komentar = 'Komentar tidak boleh kosong';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearForm = () => {
    setFormData({
      name: '',
      email: '',
      rating: 0,
      komentar: ''
    });
    setErrors({});
    setErrorMessage('');
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    if (validate()) {
      setIsSubmitting(true);
      try {
        // Data yang dikirim ke server
        const bodyFormData = {
          name: formData.name.trim(),
          email: formData.email.trim(),
          rating: formData.rating.trim(),
          komentar: formData.komentar.trim()
        };

        // Contoh fetch POST
        const result = await dispatch(submitUlasanPengguna(bodyFormData));
        if (result.success) {
          setShowSuccess(true);
          onClose();
          clearForm();
        } else {
          console.error('Gagal submit form:', result.error);
          // Kamu bisa set error di UI jika perlu
          showError('Maaf, terjadi kendala saat mengirim data. Silakan coba sekali lagi.');
        }
      } catch (error) {
        console.error('Unexpected submit error:', error);
        showError('Maaf, terjadi kesalahan yang tidak terduga. Silakan coba lagi nanti.');
      } finally {
        setIsSubmitting(false);
      }
    }
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
        title="Berikan Ulasan Anda"
        show={show}
        onClose={() => (onClose(), clearForm())}
        position="center"
        modalBody={
          <Fragment>
            <div className="mb-3">
              <input
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                placeholder="Nama Lengkap"
                name="name"
                value={formData.name}
                onChange={handleChange}
                maxLength={50}
              />
              {errors.name && <small className="invalid-feedback">{errors.name}</small>}
            </div>

            <div className="mb-3">
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                placeholder="Email (opsional)"
                name="email"
                value={formData.email}
                onChange={handleChange}
                maxLength={100}
              />
              {errors.email && <small className="invalid-feedback">{errors.email}</small>}
            </div>

            <div className="mb-3">
              <label className="form-label">Rating</label>
              <div>
                {[1, 2, 3, 4, 5].map((star) => (
                  <FontAwesomeIcon
                    key={star}
                    icon={solidStar}
                    className={classNames('me-1', {
                      'text-warning': formData.rating >= star,
                      'text-secondary': formData.rating < star,
                      'cursor-pointer': true
                    })}
                    onClick={() => handleRating(star)}
                  />
                ))}
              </div>
              {errors.rating && <small className="text-danger">{errors.rating}</small>}
            </div>

            <div className="mb-3">
              <textarea
                className={`form-control ${errors.komentar ? 'is-invalid' : ''}`}
                placeholder="Tulis komentar Anda"
                name="komentar"
                value={formData.komentar}
                onChange={handleChange}
                rows={4}
                maxLength={500}
              ></textarea>
              {errors.komentar && <small className="invalid-feedback">{errors.komentar}</small>}
            </div>
          </Fragment>
        }
        modalFooter={
          <Fragment>
            {errorMessage && (
              <UseToasts message={errorMessage} show={true} onClose={() => setErrorMessage('')} />
            )}
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Mengirim...' : 'Kirim Ulasan'}
            </button>
          </Fragment>
        }
      />
      {showSuccess && <UlasanBerhasil show={showSuccess} onClose={() => setShowSuccess(false)} />}
    </Fragment>
  );
};

export default IndexUlasan;
