'use client';
import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
// import { loginUser } from '@/redux/action/auth/creator'; // Pastikan ini adalah action login
import { UseToasts } from '@/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

export default function LoginForm({ onClose, handleDaftar }) {
  const dispatch = useDispatch();
  const errorTimeoutRef = useRef(null);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const { email, password } = formData;
    const newErrors = {};

    if (!email.trim()) newErrors.email = 'Email wajib diisi';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Format email tidak valid';

    if (!password.trim()) newErrors.password = 'Password wajib diisi';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting || !validate()) return;

    setIsSubmitting(true);
    try {
      // const result = await dispatch(loginUser(formData)); // gunakan loginUser
      const result = {
        success: true,
        error: 'Akun tidak ditemukan'
      };
      if (result.success) {
        onClose?.();
      } else {
        showError(result?.error || 'Login gagal. Coba lagi.');
      }
    } catch {
      showError('Terjadi kesalahan saat login. Silakan coba lagi.');
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
    <div className="d-flex flex-column justify-content-center h-100" style={{ minHeight: '500px' }}>
      <div className="w-100 px-4 d-flex flex-column justify-content-center flex-grow-1">
        <h5 className="text-center fw-bold mb-4">Masuk</h5>

        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
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

          {/* Password */}
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

          {/* Error Message */}
          {errorMessage && (
            <UseToasts message={errorMessage} show={true} onClose={() => setErrorMessage('')} />
          )}

          <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
            {isSubmitting ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Belum punya akun?{' '}
          <span className="text-primary a-hover cursor-pointer" onClick={handleDaftar}>
            Daftar
          </span>{' '}
          sekarang
        </p>
      </div>

      <div className="bg-primary-subtle bottom-0 p-1 position-absolute text-center w-100">
        <small>
          Mengalami kendala untuk masuk?{' '}
          <Link
            href="https://wa.me/6281228883616?text=Halo,%20saya%20menghadapi%20kendala%20untuk%20Masuk%20ke%20sewaTempat.Com.%20Mohon%20bantuannya,%20terima%20kasih"
            target="_blank">
            <FontAwesomeIcon icon={faWhatsapp} /> Hubungi Kami
          </Link>
        </small>
      </div>
    </div>
  );
}
