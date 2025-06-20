'use client';

import React, { Fragment, useState } from 'react';
import { UseModals } from '@/components';
import { Daftar, Masuk } from './components';

const Index = ({ show, onClose, authType = 'login', setAuthType }) => {
  return (
    <UseModals
      title=""
      show={show}
      onClose={onClose}
      position="center"
      modalBody={
        <Fragment>
          <div
            className="position-absolute"
            style={{
              right: '8px',
              top: '8px'
            }}>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          {authType === 'register' ? (
            <Daftar onClose={onClose} handleMasuk={() => setAuthType('login')} />
          ) : (
            <Masuk onClose={onClose} handleDaftar={() => setAuthType('register')} />
          )}
        </Fragment>
      }
      modalFooter={false}
    />
  );
};

export default Index;
