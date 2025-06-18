import React, { Fragment } from 'react';
import Modals from '@/components/Modals';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const PermintaanBerhasil = (props) => {
  const { show, onClose } = props;

  return (
    <Modals
      title="Permintaan Investasi Berhasil Dikirim"
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
                Terima kasih telah mengajukan investasi properti kepada{' '}
                <strong>tempatSewa.Com</strong>.
              </p>
              <p>
                Tim kami akan segera menghubungi Anda untuk membahas peluang investasi yang sesuai
                dengan profil dan target Anda.
              </p>
              <p className="fw-semibold">Tim kami akan menghubungi Anda dalam 1x24 jam.</p>
            </div>
          </div>
        </Fragment>
      }
      modalFooter={false}
    />
  );
};

export default PermintaanBerhasil;
