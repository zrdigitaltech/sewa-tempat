'use client';
import React, { Fragment } from 'react';
import { UseModals } from '@/components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const PermintaanBerhasil = (props) => {
  const { show, onClose } = props;

  return (
    <UseModals
      title="Masukan Anda Telah Diterima"
      show={show}
      onClose={onClose}
      position="center"
      modalBody={
        <Fragment>
          <div className="text-center">
            <h2>
              <FontAwesomeIcon icon={faCircleCheck} className="text-primary" />
            </h2>
            <div>
              <p>
                Terima kasih atas masukan Anda!
                <br />
                Tim <small>tempat</small>Sewa.Com akan mempelajari saran Anda dan berusaha
                meningkatkan layanan kami. Jika diperlukan, kami akan menghubungi Anda melalui nomor
                WhatsApp yang Anda berikan.
              </p>
              <p className="mb-0">Semoga hari Anda menyenangkan! 😊</p>
            </div>
          </div>
        </Fragment>
      }
      modalFooter={false}
    />
  );
};

export default PermintaanBerhasil;
