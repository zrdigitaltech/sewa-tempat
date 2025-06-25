'use client';

import { useRef, useEffect, Suspense } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '@/redux/store';

import {
  UseHeader,
  UseCTA,
  UseFooter,
  UseRouteLoading,
  UseScripts,
  UseScrollToTop,
  UseScrollToTopButtons,
  AuthLoader
} from '@/components';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { usePathname } from 'next/navigation';

export default function Index({ children }) {
  const storeRef = useRef();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  const pathname = usePathname();
  const hideCTAOn = ['/pasang-iklan-properti'];
  const shouldShowCTA = !hideCTAOn.includes(pathname);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Provider store={storeRef.current}>
      <UseScrollToTop />
      <AuthLoader />
      <UseHeader />
      {/* Tambahkan Suspense untuk loading fallback */}
      <Suspense fallback={<UseRouteLoading />}>{children}</Suspense>
      {shouldShowCTA && <UseCTA />}
      <UseFooter />
      <UseScripts />
      <UseScrollToTopButtons />
    </Provider>
  );
}
