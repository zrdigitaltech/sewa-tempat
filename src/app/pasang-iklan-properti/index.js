'use client';
import { Fragment } from 'react';
// Components
import { Hero, TipsIklan, Member, Faq, Booster } from '@/app/pasang-iklan-properti/components';

export default function Index() {
  return (
    <Fragment>
      <section>
        {/* Hero Section - Full Width */}
        <Hero />

        {/* TipsIklan Section */}
        <TipsIklan />

        {/* CTA Section - Full Width */}
        <Member />

        {/* FAQ Section */}
        <Faq />

        {/* Booster Section */}
        <Booster />
      </section>
    </Fragment>
  );
}
