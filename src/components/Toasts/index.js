'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const ToastClient = ({ message, show, onClose }) => {
  const toastRef = useRef(null);
  const toastInstanceRef = useRef(null);
  const [ToastConstructor, setToastConstructor] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    import('bootstrap/dist/js/bootstrap.esm.js').then((module) => {
      setToastConstructor(() => module.Toast);
    });
  }, []);

  useEffect(() => {
    if (!toastRef.current || !ToastConstructor) return;

    if (!toastInstanceRef.current) {
      toastInstanceRef.current = new ToastConstructor(toastRef.current, {
        autohide: true,
        delay: 5000
      });

      toastRef.current.addEventListener('hidden.bs.toast', () => {
        onClose?.();
      });
    }

    const timer = setTimeout(() => {
      if (show && toastInstanceRef.current) {
        toastInstanceRef.current.show();
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [show, onClose, ToastConstructor]);

  if (!mounted || typeof window === 'undefined') return null;

  return createPortal(
    <div
      className="toast-container position-fixed bottom-0 start-50 p-3 translate-middle-x"
      style={{ zIndex: 9999999 }}>
      <div
        className="toast align-items-center text-bg-dark border-0 shadow"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        ref={toastRef}>
        <div className="d-flex">
          <div className="toast-body">{message}</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"></button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ToastClient;
