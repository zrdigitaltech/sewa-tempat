'use client';
import React, { Fragment, useRef, useState, useEffect } from 'react';
import { UseBreadcrumb } from '@/components';

import Banner from './components/Banner';
import Tabs from './components/Tabs';
import Tentang from './components/Tabs/Tentang';
import Kisah from './components/Tabs/Kisah';
import Perjalanan from './components/Tabs/Perjalanan';
import Kepemimpinan from './components/Tabs/Kepemimpinan';
import PortalInvestor from './components/Tabs/PortalInvestor';
import UlasanPengguna from './components/Tabs/UlasanPengguna';

import './tentangKami.scss';

export default function TentangKami() {
  const [active, setActive] = useState('tentang');

  const refs = {
    tentangRef: useRef(null),
    kisahRef: useRef(null),
    perjalananRef: useRef(null),
    kepemimpinanRef: useRef(null),
    investorRef: useRef(null),
    ulasanRef: useRef(null)
  };
  const tabRefs = useRef({});

  const sections = [
    { key: 'tentang', ref: refs.tentangRef },
    { key: 'kisah', ref: refs.kisahRef },
    { key: 'perjalanan', ref: refs.perjalananRef },
    { key: 'kepemimpinan', ref: refs.kepemimpinanRef },
    { key: 'investor', ref: refs.investorRef },
    { key: 'ulasan', ref: refs.ulasanRef }
  ];

  const handleClick = (key, ref) => {
    setActive(key);
    const offset = 90; // header
    if (ref.current) {
      const y = ref.current.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }

    // Scroll horizontal ke tab yang diklik
    const tabEl = tabRefs.current[key];
    if (tabEl && typeof tabEl.scrollIntoView === 'function') {
      tabEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset + 100;
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const ref = section.ref.current;
        if (ref) {
          const offsetTop = ref.offsetTop;
          const offsetBottom = offsetTop + ref.offsetHeight;

          if (scrollY >= offsetTop && scrollY < offsetBottom) {
            setActive(section.key);

            const tabEl = tabRefs.current[section.key];
            if (tabEl && typeof tabEl.scrollIntoView === 'function') {
              tabEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }

            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Fragment>
      <section className="my-3">
        <UseBreadcrumb title="Syarat Penggunaan Pemilik Properti" />
      </section>

      <Banner />

      <Tabs refs={refs} handleClick={handleClick} active={active} tabRefs={tabRefs} />

      <Tentang refs={refs} />
      <Kisah refs={refs} />
      <Perjalanan refs={refs} />
      <Kepemimpinan refs={refs} />
      <PortalInvestor refs={refs} />
      <UlasanPengguna refs={refs} />
    </Fragment>
  );
}
