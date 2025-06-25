'use client';

import React, { useState, useRef, Fragment } from 'react';
// import { useDispatch } from 'react-redux';
// import { loginUser } from '@/redux/action/auth/creator';
import { UseToasts } from '@/components';
import Link from 'next/link';

export default function LoginForm({
  onClose,
  handleDaftar,
  handleMasuk,
  setShowAuth,
  setShowPermintaanBerhasil
}) {
  // const dispatch = useDispatch();
  const errorTimeoutRef = useRef(null);

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const { email } = formData;
    const newErrors = {};

    if (!email.trim()) newErrors.email = 'Email wajib diisi';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Format email tidak valid';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting || !validate()) return;

    setIsSubmitting(true);
    try {
      // const result = await dispatch(loginUser(formData));
      const result = { success: true, error: 'Akun tidak ditemukan' };
      if (result.success) {
        setShowAuth(false);
        setShowPermintaanBerhasil(true);
      } else {
        showError(result?.error || 'Gagal mengirim tautan reset.');
      }
    } catch {
      showError('Terjadi kesalahan saat mengirim tautan reset.');
    } finally {
      setIsSubmitting(false);
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
      <div
        className="d-flex flex-column justify-content-center h-100"
        style={{ minHeight: '585px' }}>
        <div className="w-100 px-4 d-flex flex-column justify-content-center flex-grow-1">
          <h5 className="text-center fw-bold mb-3">Lupa Kata Sandi?</h5>
          <p className="text-center text-muted mb-4">
            Masukkan email yang terdaftar dan kami akan mengirimkan tautan untuk mengatur ulang kata
            sandi Anda.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                placeholder="Masukkan Alamat Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            {errorMessage && (
              <UseToasts message={errorMessage} show={true} onClose={() => setErrorMessage('')} />
            )}

            <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
              {isSubmitting ? 'Memproses...' : 'Kirim Tautan Reset'}
            </button>
          </form>

          <div className="d-flex align-items-center justify-content-between mt-3 mb-1">
            <span className="small text-muted cursor-pointer a-hover" onClick={handleMasuk}>
              Kembali masuk
            </span>
            <span className="small text-muted cursor-pointer a-hover" onClick={handleDaftar}>
              Daftar
            </span>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
