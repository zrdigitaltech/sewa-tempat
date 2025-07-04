'use client';

import React, { Fragment, useState } from 'react';
import './DeskripsiExpandable.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Index = ({ deskripsi, maxLength = 200 }) => {
  const [expanded, setExpanded] = useState(false);

  const plainText = deskripsi?.replace(/<[^>]+>/g, '') || '';
  const isLong = plainText.length > maxLength;

  return (
    <Fragment>
      <div
        className={`ST--DeskripsiExpandable__wrapper ${
          expanded ? 'ST--DeskripsiExpandable__wrapper--expanded' : ''
        }`}
      >
        <div
          className="ST--DeskripsiExpandable__content"
          dangerouslySetInnerHTML={{
            __html: expanded || !isLong ? deskripsi : plainText.slice(0, maxLength) + '...'
          }}
        />
      </div>

      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-primary mt-1 p-0 border-0 bg-transparent d-flex align-items-center gap-1"
          style={{ cursor: 'pointer' }}
        >
          <small>
            Lihat {expanded ? 'Lebih Sedikit' : 'Selengkapnya'}{' '}
            <FontAwesomeIcon icon={expanded ? faChevronUp : faChevronDown} />
          </small>
        </button>
      )}
    </Fragment>
  );
};

export default Index;
