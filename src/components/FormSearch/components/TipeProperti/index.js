'use client';
import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListTipeProperti } from '@/redux/action/tipeProperti/creator';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Index(props) {
  const { tipeProperti, handleChange, isLoading, setIsLoading, title = 'Tipe Properti' } = props;

  const tipePropertiList = useSelector((state) => state?.tipeProperti?.tipePropertiList || []);
  const dispatch = useDispatch();

  const [isClient, setIsClient] = useState(false);

  const fetchTipeProperti = async () => {
    setIsLoading((prev) => ({ ...prev, tipeProperti: true }));
    try {
      await dispatch(getListTipeProperti());
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading((prev) => ({ ...prev, tipeProperti: false }));
    }
  };

  useEffect(() => {
    setIsClient(true); // render hanya di client
    fetchTipeProperti();
  }, []);

  if (!isClient) return null; // Jangan render saat SSR

  return (
    <Fragment>
      {isLoading?.tipeProperti ? (
        <Skeleton height={34} borderRadius={8} />
      ) : (
        <Fragment>
          <label htmlFor="tipeProperti" className="form-label visually-hidden">
            Tipe Properti
          </label>
          <select
            id="tipeProperti"
            className="form-select rounded-3"
            name="tipeProperti"
            value={tipeProperti || ''}
            onChange={handleChange}
          >
            <option value="">{title}</option>
            {tipePropertiList.map((item, idx) => (
              <option key={idx} value={item.slug}>
                {item.nama}
              </option>
            ))}
          </select>
        </Fragment>
      )}
    </Fragment>
  );
}
