'use client';

import React, { Fragment } from 'react';
import { UseModals } from '@/components';
import { Daftar, Masuk } from './components';

const Index = ({ show, onClose, authType = 'login' }) => {
  return (
    <UseModals
      title={authType === 'register' ? 'Daftar Akun' : 'Masuk'}
      show={show}
      onClose={onClose}
      position="center"
      modalBody={<Fragment>{authType === 'register' ? <Daftar /> : <Masuk />}</Fragment>}
      modalFooter={false}
    />
  );
};

export default Index;
