import React from 'react';

import { UseTooltips } from '@/components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faThLarge } from '@fortawesome/free-solid-svg-icons';

export default function Index(props) {
  const { viewMode, handleGridView, handleListView } = props;
  UseTooltips();
  return (
    <div className="btn-group w-100">
      <button
        className={`btn btn-outline-primary ${viewMode === 'list' ? 'active' : ''}`}
        onClick={handleListView}
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        data-bs-custom-class="custom-tooltip"
        data-bs-title="Tampilan List"
      >
        <FontAwesomeIcon icon={faList} />
      </button>
      <button
        className={`btn btn-outline-primary ${viewMode === 'grid' ? 'active' : ''}`}
        onClick={handleGridView}
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        data-bs-custom-class="custom-tooltip"
        data-bs-title="Tampilan Grid"
      >
        <FontAwesomeIcon icon={faThLarge} />
      </button>
    </div>
  );
}
