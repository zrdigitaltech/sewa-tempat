import React, { Fragment } from 'react';

import { formatTipeKamar } from '@/helpers';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed } from '@fortawesome/free-solid-svg-icons';

export default function Index(props) {
  const { tipe_kamar } = props;
  return (
    <small className="align-content-center text-secondary text-capitalize">
      <FontAwesomeIcon icon={faBed} className="me-1" />
      {formatTipeKamar(tipe_kamar) === 'S'
        ? 'Studio'
        : formatTipeKamar(tipe_kamar) === 'L'
          ? '>3 Kamar Tidur'
          : formatTipeKamar(tipe_kamar) + ' Kamar Tidur'}
    </small>
  );
}
