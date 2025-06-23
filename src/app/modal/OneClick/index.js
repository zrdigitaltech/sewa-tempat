'use client';
import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'hasClosedOneClick';

export default function OneClickPrompt({ delay = 1000, onClose, isMobile = false }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const alreadyClosed = localStorage.getItem(STORAGE_KEY);
    if (alreadyClosed) return;

    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const handleClose = () => {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY, 'true'); // simpan state bahwa user sudah close
    onClose?.();
  };

  if (!visible) return null;

  return (
    <div
      className={`bg-primary-subtle mx-2 p-3 position-absolute rounded-2 ${isMobile}`}
      style={{ bottom: '2px', left: 0, right: 0, zIndex: 10 }}>
      <div className="d-flex justify-content-between align-items-start">
        <p className="mb-0 text-dark">
          Cukup 1x klik untuk langsung terhubung dengan pemilik hunian impianmu.
        </p>
        <button className="btn-close" aria-label="Tutup" onClick={handleClose} />
      </div>
    </div>
  );
}
