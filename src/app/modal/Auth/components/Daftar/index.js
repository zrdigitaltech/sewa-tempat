'use client';
import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { submitRegister } from '@/redux/action/register/creator';
import { UseToasts } from '@/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function Index({ onClose, handleMasuk }) {
  const dispatch = useDispatch();
  const errorTimeoutRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const { name, username, phone, email, password, confirmPassword } = formData;
    const newErrors = {};

    if (!name.trim()) newErrors.name = 'Nama tidak boleh kosong';
    else if (name.length < 3) newErrors.name = 'Minimal 3 karakter';
    else if (name.length > 50) newErrors.name = 'Maksimal 50 karakter';

    if (!username.trim()) newErrors.username = 'Username wajib diisi';
    else if (username.length < 3) newErrors.username = 'Minimal 3 karakter';
    else if (username.length > 30) newErrors.username = 'Maksimal 30 karakter';

    if (!phone.trim()) newErrors.phone = 'Nomor tidak boleh kosong';
    else if (phone.length < 9) newErrors.phone = 'Minimal 9 digit';
    else if (phone.length > 15) newErrors.phone = 'Maksimal 15 digit';

    if (!email.trim()) newErrors.email = 'Email tidak boleh kosong';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Format email tidak valid';

    if (!password.trim()) newErrors.password = 'Password wajib diisi';
    else if (!/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$/.test(password))
      newErrors.password = 'Minimal 8 karakter, kombinasi huruf dan angka';

    if (!confirmPassword.trim()) newErrors.confirmPassword = 'Harap ulangi password';
    else if (confirmPassword !== password) newErrors.confirmPassword = 'Password tidak cocok';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearForm = () => {
    setFormData({
      name: '',
      username: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting || !validate()) return;
    setIsSubmitting(true);
    try {
      const result = await dispatch(submitRegister(formData));
      if (result.success) {
        clearForm();
        onClose?.();
      } else {
        showError(result?.error || 'Gagal mendaftar. Coba lagi.');
      }
    } catch {
      showError('Terjadi kesalahan. Silakan coba lagi.');
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
    <div className="align-content-center h-100 p-4" style={{ minHeight: '530px' }}>
      <h5 className="text-center fw-bold mb-4">Daftar Akun Baru</h5>
      <form onSubmit={handleSubmit} noValidate>
        <div className="row mb-3 g-3">
          <div className="col-6">
            <input
              name="name"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              placeholder="Nama Lengkap"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>
          <div className="col-6">
            <input
              name="username"
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
          </div>
        </div>

        <div className="mb-3">
          <div className="input-group">
            <span className="bg-primary input-group-text text-white">+62</span>
            <input
              name="phone"
              className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
              placeholder="Masukkan Nomor"
              value={formData.phone}
              onChange={(e) => {
                const val = e.target.value;
                if (/^[1-9][0-9]*$/.test(val) || val === '') handleChange(e);
              }}
              maxLength={15}
            />
          </div>
          {errors.phone && <div className="invalid-feedback d-block">{errors.phone}</div>}
        </div>

        <div className="mb-3">
          <input
            type="email"
            name="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            placeholder="Alamat Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setShowPassword((prev) => !prev)}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
        </div>

        <div className="mb-3">
          <div className="input-group">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
              placeholder="Ulangi Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setShowConfirmPassword((prev) => !prev)}>
              <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          {errors.confirmPassword && (
            <div className="invalid-feedback d-block">{errors.confirmPassword}</div>
          )}
        </div>

        {errorMessage && (
          <UseToasts message={errorMessage} show={true} onClose={() => setErrorMessage('')} />
        )}

        <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
          {isSubmitting ? 'Memproses...' : 'Daftar Sekarang'}
        </button>
      </form>

      <p className="text-center mt-3 mb-0">
        Sudah punya akun?{' '}
        <span className="text-primary a-hover cursor-pointer fw-semibold" onClick={handleMasuk}>
          Masuk
        </span>{' '}
        sekarang
        <br />
        <br />
        <small>
          Dengan mendaftar, Anda menyetujui{' '}
          <Link href="/syarat-dan-ketentuan" onClick={onClose}>
            Syarat & Ketentuan
          </Link>{' '}
          dan{' '}
          <Link href="/kebijakan-privasi" onClick={onClose}>
            Kebijakan Privasi
          </Link>{' '}
          <small>sewa</small>Tempat.Com
        </small>
      </p>
    </div>
  );
}
