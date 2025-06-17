import React, { Fragment, useState, useEffect } from 'react';
import Modals from '@/components/Modals';
import classNames from 'classnames';
import PermintaanBerhasilModal from '@/app/modal/Konsultasi/PermintaanBerhasil';
import { useSelector, useDispatch } from 'react-redux';
import { getListTipeProperti } from '@/redux/action/tipeProperti/creator';
import { formatRupiah, unFormatRupiah } from '@/helpers';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { submitKonsultasi } from '@/redux/action/konsultasi/creator';
import { UseToasts } from '@/components';

const Index = (props) => {
  const { show, onClose } = props;
  const tipePropertiList = useSelector((state) => state?.tipeProperti?.tipePropertiList);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    lokasi: '',
    harga_min: '',
    harga_max: '',
    name: '',
    phone: '',
    tipe_properti: []
  });

  const [errors, setErrors] = useState({});
  const [selectedReasons, setSelectedReasons] = useState([]);

  const [showPermintaanBerhasil, setShowPermintaanBerhasil] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchTipeProperti = async () => {
    setIsLoading(true);
    try {
      await dispatch(getListTipeProperti());
    } catch (error) {
      console.error('Gagal fetch tipe properti:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTipeProperti();
  }, [dispatch]);

  useEffect(() => {
    if (tipePropertiList?.length) {
      const defaultItem = tipePropertiList.find((item) => item.nama.toLowerCase() === 'kontrakan');
      if (defaultItem) {
        setSelectedReasons([defaultItem.id]);
        setFormData((prev) => ({ ...prev, tipe_properti: [defaultItem.id] }));
      }
    }
  }, [tipePropertiList]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'harga_min' || name === 'harga_max') {
      const formatted = formatRupiah(value);
      setFormData((prev) => ({ ...prev, [name]: formatted }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
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
    const hargaMin = parseInt(formData.harga_min.replace(/\D/g, '')) || 0;
    const hargaMax = parseInt(formData.harga_max.replace(/\D/g, '')) || 0;

    if (!formData.tipe_properti.length) {
      newErrors.tipe_properti = 'Pilih minimal satu tipe properti';
    }
    if (!formData.harga_max.trim()) {
      newErrors.harga_max = 'Harga Max tidak boleh kosong';
    } else if (isNaN(hargaMax)) {
      newErrors.harga_max = 'Harga Max harus berupa angka';
    } else if (hargaMin > hargaMax) {
      newErrors.harga_max = 'Harga Max harus lebih besar dari Harga Min';
    }
    if (!formData.lokasi.trim()) {
      newErrors.lokasi = 'Lokasi tidak boleh kosong';
    }
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearForm = () => {
    setFormData({
      lokasi: '',
      harga_min: '',
      harga_max: '',
      name: '',
      phone: '',
      tipe_properti: []
    });
    setErrors({});
    setSelectedReasons([]);
    setErrorMessage('');
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    if (validate()) {
      setIsSubmitting(true);
      try {
        const bodyFormData = {
          lokasi: formData.lokasi,
          harga_min: unFormatRupiah(formData.harga_min),
          harga_max: unFormatRupiah(formData.harga_max),
          name: formData.name,
          phone: formData.phone,
          tipe_properti: formData.tipe_properti // ubah array jadi string .join(',')
        };

        console.log('Form data valid:', bodyFormData);

        // Kirim ke server
        const result = await dispatch(submitKonsultasi(formData));
        if (result.success) {
          onClose();
          setShowPermintaanBerhasil(true);
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
      <Modals
        title={`Konsultasi Gratis`}
        show={show}
        onClose={() => (onClose(), clearForm())}
        position="center"
        modalBody={
          <Fragment>
            <img
              src="https://placehold.co/563x281"
              className="w-100"
              alt="TempatSewa.Com Indonesia: Situs Sewa Kos, Rumah, Apartemen, Ruko, Kios, dan Gudang"
            />
            <div className="my-3">
              <label className="form-label">
                Tipe Properti<small className="text-danger">*</small>
              </label>
              <div className={`d-flex flex-nowrap gap-2 overflow-x-auto`}>
                {isLoading
                  ? Array.from({ length: 4 }).map((_, index) => (
                      <Skeleton
                        key={index}
                        height={38}
                        width={100}
                        className="rounded-pill"
                        style={{ marginRight: '0.5rem' }}
                      />
                    ))
                  : tipePropertiList.map((item, index) => {
                      const isSelected = selectedReasons.includes(item?.id);
                      return (
                        <div key={index}>
                          <input
                            type="checkbox"
                            className="btn-check"
                            id={`checkbox-${item.id}`}
                            autoComplete="off"
                            onChange={() => {
                              const updatedSelection = isSelected
                                ? selectedReasons.filter((id) => id !== item.id)
                                : [...selectedReasons, item.id];
                              setSelectedReasons(updatedSelection);
                              setFormData((prev) => ({
                                ...prev,
                                tipe_properti: updatedSelection
                              }));
                            }}
                            checked={isSelected}
                          />
                          <label
                            className={classNames('btn rounded-pill text-truncate', {
                              'btn-outline-primary': !isSelected,
                              'btn-primary': isSelected,
                              'text-dark': !isSelected
                            })}
                            htmlFor={`checkbox-${item.id}`}>
                            {item.nama}
                          </label>
                        </div>
                      );
                    })}
              </div>

              {errors.tipe_properti && (
                <small className="text-danger w-100 mt-1">{errors.tipe_properti}</small>
              )}
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text">Rp</span>
              <input
                type="harga_min"
                className={`form-control ${errors.harga_min ? 'is-invalid' : ''}`}
                placeholder="Harga Min"
                name="harga_min"
                value={formData.harga_min}
                onChange={handleChange}
              />
              <span className="input-group-text">Rp</span>
              <input
                type="harga_max"
                className={`form-control ${errors.harga_max ? 'is-invalid' : ''}`}
                placeholder="Harga Max"
                name="harga_max"
                value={formData.harga_max}
                onChange={handleChange}
              />
              {errors.harga_max && (
                <small className="invalid-feedback text-end">{errors.harga_max}</small>
              )}
            </div>

            <div className="mb-3">
              <input
                type="lokasi"
                className={`form-control ${errors.lokasi ? 'is-invalid' : ''}`}
                placeholder="Pilih Lokasi"
                name="lokasi"
                value={formData.lokasi}
                onChange={handleChange}
                maxLength={100}
              />
              {errors.lokasi && <small className="invalid-feedback">{errors.lokasi}</small>}
            </div>

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

            <div className="input-group">
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
              disabled={isSubmitting || isLoading}>
              {isSubmitting ? 'Memproses...' : 'Carikan Saya Properti'}
            </button>
          </Fragment>
        }
      />
      <PermintaanBerhasilModal
        show={showPermintaanBerhasil}
        onClose={() => setShowPermintaanBerhasil(false)}
      />
    </Fragment>
  );
};

export default Index;
