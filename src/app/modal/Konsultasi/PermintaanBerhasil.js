import React, { Fragment } from 'react';
import { UseModals } from '@/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const PermintaanBerhasil = (props) => {
  const { show, onClose } = props;

  return (
    <UseModals
      title="Permintaan Berhasil Dikirim"
      show={show}
      onClose={onClose}
      position="center"
      modalBody={
        <Fragment>
          <div className="text-center">
            <h2>
              <FontAwesomeIcon icon={faCircleCheck} className="fa-5x text-primary" />
            </h2>
            <div>
              <p>
                Tim <small>tempat</small>Sewa.Com telah menerima permintaan Anda.
                <br />
                Kami akan segera menghubungi Anda untuk memberikan rekomendasi properti sesuai
                kebutuhan.
              </p>
              <p className="mb-0">Terima kasih telah menggunakan layanan konsultasi kami. 😊</p>
            </div>
          </div>
        </Fragment>
      }
      modalFooter={false}
    />
  );
};

export default PermintaanBerhasil;
