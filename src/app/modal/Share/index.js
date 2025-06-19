'use client';

import React, { Fragment, useRef } from 'react';
import { UseModals } from '@/components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCopy as faCopySolid } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const ShareModal = ({ show, onClose, data }) => {
  const copyBtnRef = useRef(null);
  const tooltipRef = useRef(null);

  if (!data || !data.slug) return null;

  const slug = data.slug.includes('pemilik') ? data.slug : `/properti/${data.slug}`;
  const nama = data.nama ?? '';
  const domain = process.env.NEXT_PUBLIC_DOMAIN || '';

  const url = `${domain}${slug}`;
  const shareLinks = {
    copylink: url,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `Cek properti menarik di tempatSEWA.Com: ${nama} - ${url}`
    )}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `Cek properti menarik di tempatSEWA.Com: ${nama} - ${url}`
    )}`
  };

  const handleShare = async (platform) => {
    if (platform === 'copylink') {
      navigator.clipboard.writeText(shareLinks[platform]).then(async () => {
        if (copyBtnRef.current) {
          copyBtnRef.current.setAttribute('title', 'Tautan disalin!');

          // Dynamically import Tooltip ONLY on client
          const bootstrap = await import('bootstrap');
          const Tooltip = bootstrap.Tooltip;

          if (tooltipRef.current) {
            tooltipRef.current.dispose();
            tooltipRef.current = null;
          }

          tooltipRef.current = new Tooltip(copyBtnRef.current);
          tooltipRef.current.show();

          setTimeout(() => {
            if (tooltipRef.current) {
              tooltipRef.current.hide();
              tooltipRef.current.dispose();
              tooltipRef.current = null;
            }
            copyBtnRef.current.removeAttribute('title');
          }, 1000);
        }
      });
    } else {
      window.open(shareLinks[platform], '_blank', 'noopener');
    }
  };

  const socialIcons = [
    { platform: 'copylink', text: 'Copy Link' },
    { platform: 'whatsapp', text: 'WhatsApp' },
    { platform: 'facebook', text: 'Facebook' },
    { platform: 'x', text: 'X (Twitter)' }
  ];

  return (
    <UseModals
      title="Bagikan"
      show={show}
      onClose={onClose}
      position="center"
      modalBody={
        <Fragment>
          <div className="row">
            {socialIcons.map((item, idx) => (
              <div className="col-6 mb-2" key={idx}>
                <button
                  ref={item.platform === 'copylink' ? copyBtnRef : null}
                  onClick={() => handleShare(item.platform)}
                  className={`btn w-100 d-flex align-items-center justify-content-center gap-2 ${
                    item.platform === 'whatsapp'
                      ? 'btn-outline-success'
                      : item.platform === 'x' || item.platform === 'copylink'
                        ? 'btn-outline-dark'
                        : 'btn-outline-primary'
                  }`}
                  data-bs-toggle={item.platform === 'copylink' ? 'tooltip' : null}
                  data-bs-placement="top"
                >
                  <FontAwesomeIcon
                    icon={
                      item.platform === 'copylink'
                        ? faCopySolid
                        : item.platform === 'whatsapp'
                          ? faWhatsapp
                          : item.platform === 'facebook'
                            ? faFacebook
                            : faTwitter
                    }
                  />
                  <span>{item.text}</span>
                </button>
              </div>
            ))}
          </div>
        </Fragment>
      }
      modalFooter={false}
    />
  );
};

export default ShareModal;
