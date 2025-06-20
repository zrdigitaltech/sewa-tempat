'use client';
import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
// import { loginUser } from '@/redux/action/auth/creator';
import { UseToasts } from '@/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faGoogle } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

export default function LoginForm({ onClose, handleDaftar }) {
  const dispatch = useDispatch();
  const errorTimeoutRef = useRef(null);

  const [formData, setFormData] = useState({ email: '', password: '' });
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
      // const result = await dispatch(loginUser(formData));
      const result = { success: true, error: 'Akun tidak ditemukan' };
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
          <div className="mb-2">
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

          {/* Lupa password */}
          <div className="text-end mb-3">
            <div className="text-decoration-none small text-muted cursor-pointer a-hover">
              Lupa password?
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <UseToasts message={errorMessage} show={true} onClose={() => setErrorMessage('')} />
          )}

          <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
            {isSubmitting ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        {/* Garis pemisah */}
        <div className="d-flex align-items-center mt-3 mb-1">
          <hr className="flex-grow-1" />
          <span className="px-2 small text-muted">atau masuk dengan</span>
          <hr className="flex-grow-1" />
        </div>

        {/* Tombol Google */}
        <div className="text-center mb-2 cursor-pointer a-hover">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 21 20" fill="none">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.55206 1.32689C5.3145 2.07813 3.40789 3.72117 2.34591 5.80041C1.97546 6.51772 1.70873 7.27866 1.54573 8.06867C1.1407 10.0267 1.42224 12.1157 2.34097 13.8993C2.93864 15.0625 3.7981 16.0997 4.83538 16.9091C5.81832 17.6749 6.95933 18.2468 8.17442 18.5618C9.70564 18.9641 11.3356 18.9544 12.8767 18.6103C14.2697 18.2952 15.5885 17.6409 16.6406 16.691C17.7519 15.6877 18.5472 14.3694 18.967 12.9493C19.4264 11.4032 19.4857 9.75049 19.1992 8.16076C16.3195 8.16076 13.4349 8.16076 10.5552 8.16076C10.5552 9.33367 10.5552 10.5066 10.5552 11.6795C12.2247 11.6795 13.8943 11.6795 15.5638 11.6795C15.3712 12.8039 14.6895 13.8314 13.7263 14.4663C13.1188 14.8686 12.4223 15.1255 11.7012 15.2515C10.98 15.3727 10.2292 15.3872 9.50806 15.2467C8.77209 15.1013 8.07563 14.8008 7.46315 14.3791C6.48514 13.7054 5.73929 12.7215 5.35896 11.6116C4.96874 10.4823 4.9638 9.22704 5.35896 8.1026C5.63556 7.30774 6.08999 6.57588 6.6926 5.97489C7.43351 5.2285 8.3967 4.69536 9.43891 4.47726C10.328 4.29308 11.2665 4.32701 12.1358 4.58388C12.8767 4.80199 13.5584 5.20426 14.1165 5.72771C14.6796 5.17518 15.2427 4.62266 15.8058 4.07013C16.1022 3.77448 16.4134 3.48852 16.6999 3.18318C15.8453 2.40771 14.8377 1.78248 13.7411 1.38505C11.7654 0.667735 9.54264 0.653195 7.55206 1.32689Z"
              fill="white"></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.55203 1.32745C9.53767 0.653756 11.7654 0.668296 13.7411 1.38076C14.8377 1.77819 15.8404 2.39857 16.6998 3.1789C16.4133 3.48424 16.1022 3.7702 15.8058 4.06585C15.2427 4.61837 14.6796 5.1709 14.1165 5.72342C13.5584 5.19998 12.8767 4.80255 12.1358 4.5796C11.2665 4.32272 10.328 4.28395 9.43889 4.47297C8.40161 4.69107 7.43842 5.22421 6.69257 5.97061C6.08996 6.56675 5.63554 7.30345 5.35893 8.09832C4.35623 7.33253 3.35353 6.5716 2.34589 5.80582C3.40786 3.72173 5.31447 2.07869 7.55203 1.32745Z"
              fill="#EA4335"></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.55065 8.06416C1.71366 7.27899 1.98038 6.51321 2.35084 5.7959C3.35354 6.56168 4.35624 7.32261 5.36388 8.0884C4.96873 9.21768 4.96873 10.473 5.36388 11.5974C4.36118 12.3632 3.35848 13.129 2.35578 13.8899C1.42717 12.1112 1.14562 10.0222 1.55065 8.06416Z"
              fill="#FBBC05"></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.5552 8.15625C13.4349 8.15625 16.3195 8.15625 19.1992 8.15625C19.4857 9.74113 19.4215 11.3939 18.9671 12.9448C18.5472 14.3649 17.752 15.6832 16.6406 16.6865C15.6675 15.9449 14.6945 15.2034 13.7214 14.4618C14.6846 13.8269 15.3662 12.7994 15.5589 11.675C13.8893 11.675 12.2198 11.675 10.5503 11.675C10.5552 10.5021 10.5552 9.32916 10.5552 8.15625Z"
              fill="#4285F4"></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.34595 13.895C3.34865 13.1341 4.35135 12.3683 5.35405 11.6025C5.73933 12.7124 6.48024 13.6963 7.45824 14.37C8.07073 14.7917 8.77213 15.0922 9.50316 15.2376C10.2243 15.383 10.9702 15.3636 11.6963 15.2424C12.4174 15.1164 13.1139 14.8595 13.7214 14.4573C14.6945 15.1988 15.6676 15.9404 16.6406 16.6819C15.5885 17.6367 14.2697 18.2862 12.8768 18.6012C11.3357 18.9453 9.70568 18.955 8.17446 18.5527C6.95936 18.2377 5.81836 17.6706 4.83541 16.9C3.80307 16.0954 2.94362 15.0582 2.34595 13.895Z"
              fill="#34A853"></path>
          </svg>
        </div>

        <p className="text-center mt-3 mb-0">
          Belum punya akun?{' '}
          <span className="text-primary a-hover cursor-pointer fw-semibold" onClick={handleDaftar}>
            Daftar
          </span>{' '}
          sekarang
        </p>
      </div>

      {/* WhatsApp Bantuan */}
      <div className="bg-primary-subtle bottom-0 p-2 position-absolute text-center w-100">
        <small>
          Mengalami kendala untuk masuk?{' '}
          <Link
            href="https://wa.me/6281228883616?text=Halo,%20saya%20menghadapi%20kendala%20untuk%20Masuk%20ke%20sewaTempat.Com.%20Mohon%20bantuannya,%20terima%20kasih"
            target="_blank"
            className="text-success fw-medium">
            <FontAwesomeIcon icon={faWhatsapp} /> Hubungi Kami
          </Link>
        </small>
      </div>
    </div>
  );
}
