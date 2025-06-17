import React, { Fragment } from 'react';
import Modals from '@/components/Modals';

const PermintaanBerhasil = (props) => {
  const { show, onClose } = props;

  return (
    <Modals
      title="Permintaan Berhasil Dikirim"
      show={show}
      onClose={onClose}
      position="center"
      modalBody={
        <Fragment>
          <div className="text-center">
            <h2>
              <i className="fas fa-circle-check fa-5x text-primary"></i>
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
