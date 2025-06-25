'use client';
import { useSelector } from 'react-redux';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function SessionWatcher() {
  const { isAuthenticated, authChecked } = useSelector((state) => state.auth);
  const router = useRouter();
  const pathname = usePathname();
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (!authChecked) return; // ⏳ tunggu auth dicek dulu

    // ✅ Hindari loop jika user sudah di halaman /masuk
    if (isAuthenticated === false && !hasRedirected.current && pathname !== '/masuk') {
      hasRedirected.current = true;
      router.push('/masuk');
    }
  }, [isAuthenticated, authChecked, pathname]);

  return null;
}
