'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginUserFromSession, resetAuth } from '@/redux/action/auth/creator';
import { usePathname } from 'next/navigation';

export default function AuthLoader() {
  const pathname = usePathname();
  const dispatch = useDispatch();

  // Cek session saat navigasi terjadi
  const syncSession = async () => {
    try {
      const result = await dispatch(loginUserFromSession());
      if (!result?.success) throw new Error();
    } catch (e) {
      dispatch(resetAuth()); // logout di frontend jika session invalid
    }
  };

  useEffect(() => {
    syncSession();
  }, [pathname]);

  return null;
}
