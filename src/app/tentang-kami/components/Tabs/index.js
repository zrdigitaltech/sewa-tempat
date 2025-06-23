import React, { Fragment } from 'react';

export default function Tabs(props) {
  const { refs, handleClick, active, tabRefs } = props;

  const navItems = [
    {
      label: <>Tentang</>,
      key: 'tentang'
    },
    { label: 'Kisah Pendirian', key: 'kisah' },
    { label: 'Perjalanan', key: 'perjalanan' },
    { label: 'Kepemimpinan', key: 'kepemimpinan' },
    { label: 'Portal & Investor', key: 'investor' },
    { label: 'Ulasan Pengguna', key: 'ulasan' }
  ];

  return (
    <section
      className="bg-light pt-3 border-top border-bottom position-sticky"
      style={{ top: '4.5rem', zIndex: 1 }}
    >
      <div className="container-fluid px-3">
        <div className="ST-nav-tabs-scroll-wrapper overflow-auto">
          <div className="d-flex flex-nowrap justify-content-center gap-4 ST-nav-tabs-custom">
            {navItems.map((item) => (
              <a
                key={item.key}
                ref={(el) => (tabRefs.current[item.key] = el)}
                onClick={() => handleClick(item.key, refs[`${item.key}Ref`])}
                className={`cursor-pointer tab-link ${active === item.key ? 'active' : ''}`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
