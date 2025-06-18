import React, { Fragment } from 'react';
import { UseModals } from '@/components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const UlasanBerhasil = (props) => {
  const { show, onClose } = props;

  return (
    <UseModals
      title="Ulasan Berhasil Dikirim"
      show={show}
      onClose={onClose}
      position="center"
      modalBody={
        <Fragment>
          <div className="text-center">
            <h2>
              <FontAwesomeIcon icon={faCheckCircle} size="5x" className="text-primary" />
            </h2>
            <div>
              <p>
                Terima kasih telah memberikan ulasan Anda di <strong>tempatSewa.Com</strong>.
                Masukan Anda sangat berarti bagi kami untuk meningkatkan layanan.
              </p>
              <p className="mb-0">
                Kami akan terus berusaha memberikan pengalaman terbaik untuk Anda. 😊
              </p>
            </div>
          </div>
        </Fragment>
      }
      modalFooter={false}
    />
  );
};

export default UlasanBerhasil;
