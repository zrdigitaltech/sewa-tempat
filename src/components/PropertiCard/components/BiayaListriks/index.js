import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';

export default function Index(props) {
  const { biaya_listrik } = props;
  return (
    <small className="align-content-center text-secondary text-capitalize">
      <FontAwesomeIcon icon={faBolt} className="me-1" />
      {biaya_listrik} Listrik
    </small>
  );
}
