import React, { Fragment, useState, useRef } from 'react';
import classNames from 'classnames';
import BerhasilDiLaporkanModal from '@/app/modal/LaporkanIklan/BerhasilDiLaporkan';
import { useDispatch } from 'react-redux';
import { submitLaporkanIklan } from '@/redux/action/laporkanIklan/creator';
import { UseToasts, UseModals } from '@/components';

const Index = (props) => {
  const { show, onClose, dataItem } = props;
  const dispatch = useDispatch();
  const errorTimeoutRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    reason: '',
    otherDetail: ''
  });

  const [errors, setErrors] = useState({});
  const [selectedReason, setSelectedReason] = useState('');

  const [showBerhasilDiLaporkan, setShowBerhasilDiLaporkan] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const reasons = [
    'Iklan Ganda',
    'Iklan tidak lagi tersedia',
    'Informasi yang salah',
    'Agen tidak responsif',
    'Iklan palsu',
    'Diskriminasi',
    'Lainnya'
  ];

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
    if (!formData.email.trim()) {
      newErrors.email = 'Email tidak boleh kosong';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    if (!formData.reason) {
      newErrors.reason = 'Silakan pilih salah satu alasan';
    }
    if (formData.reason === 'Lainnya' && !formData.otherDetail.trim()) {
      newErrors.otherDetail = 'Harap isi keterangan tambahan';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      reason: '',
      otherDetail: ''
    });
    setErrors({});
    setSelectedReason('');
    setErrorMessage('');
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    if (validate()) {
      setIsSubmitting(true);
      try {
        // Kirim ke server
        const result = await dispatch(submitLaporkanIklan(formData));
        if (result.success) {
          onClose();
          setShowBerhasilDiLaporkan(true);
          clearForm();
        } else {
          // Kamu bisa set error di UI jika perlu
          showError('Maaf, terjadi kendala saat mengirim data. Silakan coba sekali lagi.');
          console.error('Gagal submit form:', result.error);
        }
        setIsSubmitting(false);
      } catch (error) {
        showError('Maaf, terjadi kesalahan yang tidak terduga. Silakan coba lagi nanti.');
        console.error('Unexpected submit error:', error);
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
        title={`Laporkan Iklan ${dataItem?.nama}`}
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

            <div className="input-group mb-3">
              <span className="bg-primary input-group-text text-white">+62</span>
              <input
                type="text"
                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                placeholder="Masukkan Nomor"
                name="phone"
                value={formData.phone}
                onChange={(e) => {
                  const value = e.target.value;
                  // Hanya angka dan tidak boleh diawali dengan 0
                  if (/^[1-9][0-9]*$/.test(value) || value === '') {
                    handleChange(e);
                  }
                }}
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                maxLength={15}
              />
              {errors.phone && <small className="invalid-feedback">{errors.phone}</small>}
            </div>

            <div className="mb-3">
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                placeholder="Alamat Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                maxLength={100}
              />
              {errors.email && <small className="invalid-feedback">{errors.email}</small>}
            </div>

            <h4 className="mt-4 mb-3 fw-semibold">
              Permasalahan apa yang kamu temukan pada iklan ini?
            </h4>

            <div className={`${selectedReason === 'Lainnya' ? 'mb-3' : ''} d-flex flex-wrap gap-2`}>
              {reasons.map((label, index) => {
                const isSelected = selectedReason === label;
                return (
                  <div key={index}>
                    <input
                      type="radio"
                      className="btn-check"
                      name="report_type"
                      id={`radio-${index}`}
                      autoComplete="off"
                      onChange={() => {
                        setSelectedReason(label);
                        setFormData((prev) => ({ ...prev, reason: label }));
                      }}
                      checked={isSelected}
                    />
                    <label
                      className={classNames('btn rounded-pill', {
                        'btn-outline-primary': !isSelected,
                        'btn-primary': isSelected,
                        'text-dark': !isSelected
                      })}
                      htmlFor={`radio-${index}`}>
                      {label}
                    </label>
                  </div>
                );
              })}
              {errors.reason && <small className="text-danger w-100 mt-1">{errors.reason}</small>}
            </div>

            {selectedReason === 'Lainnya' && (
              <div className="mb-3">
                <textarea
                  className={`form-control ${errors.otherDetail ? 'is-invalid' : ''}`}
                  placeholder="Tambahkan Keterangan"
                  rows="3"
                  name="otherDetail"
                  value={formData.otherDetail}
                  onChange={handleChange}
                />
                {errors.otherDetail && (
                  <small className="invalid-feedback">{errors.otherDetail}</small>
                )}
              </div>
            )}
          </Fragment>
        }
        modalFooter={
          <Fragment>
            {errorMessage && (
              <UseToasts
                key={errorMessage}
                message={errorMessage}
                show={true}
                onClose={() => setErrorMessage('')}
              />
            )}
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={handleSubmit}
              disabled={isSubmitting}>
              {isSubmitting ? 'Memproses...' : 'Laporkan'}
            </button>
          </Fragment>
        }
      />
      <BerhasilDiLaporkanModal
        show={showBerhasilDiLaporkan}
        onClose={() => setShowBerhasilDiLaporkan(false)}
      />
    </Fragment>
  );
};

export default Index;
