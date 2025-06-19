'use client';
import React from 'react';
import { formatPhone } from '@/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot, faPhone, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import {
  faInstagram,
  faLinkedin,
  faFacebook,
  faXTwitter,
  faWhatsapp
} from '@fortawesome/free-brands-svg-icons';

const PemilikProfileCard = ({
  profile,
  handlePhone,
  handleWhatsApp,
  handleBagikan,
  handleLokasi
}) => {
  if (!profile) return null;

  return (
    <div className="d-flex flex-column flex-sm-row align-items-center align-items-sm-start border border-primary-subtle rounded p-3 mb-4 gap-3">
      {/* Avatar & Badge */}
      <div className="text-center">
        <div className="position-relative mb-2">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="rounded-circle"
            width={112}
            height={112}
          />
          <i
            className="fa fa-check-circle text-primary"
            style={{
              position: 'absolute',
              bottom: 0,
              right: '8px',
              background: 'white',
              borderRadius: '50%',
              fontSize: '30px'
            }}
          ></i>
        </div>
        <div className="badge bg-primary-subtle text-primary rounded-pill">
          <small>Pemilik Properti</small>
        </div>
      </div>

      {/* Profile Content */}
      <div className="w-100 text-center text-sm-start">
        <div className="d-flex flex-column flex-sm-row align-items-center align-items-sm-baseline mb-2 gap-2">
          <h2 className="fs-4 fw-bold text-capitalize mb-0">{profile.name}</h2>
          <small className="text-secondary">Terdaftar sejak 2018</small>
        </div>
        <p className="text-muted mb-2">
          Alamat:
          <a className="text-primary ms-2 cursor-pointer text-muted" onClick={handleLokasi}>
            <FontAwesomeIcon icon={faMapLocationDot} className="me-1" />
            Dapatkan Detail Lokasi
          </a>
        </p>

        {/* Social Links */}
        <div className="d-flex flex-wrap justify-content-center justify-content-sm-start gap-3 mb-3">
          {profile.socials?.instagram && (
            <a
              href={profile.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-dark d-flex align-items-center"
            >
              <FontAwesomeIcon icon={faInstagram} className="me-1" /> Instagram
            </a>
          )}
          {profile.socials?.linkedin && (
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-dark d-flex align-items-center"
            >
              <FontAwesomeIcon icon={faLinkedin} className="me-1" /> LinkedIn
            </a>
          )}
          {profile.socials?.facebook && (
            <a
              href={profile.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-dark d-flex align-items-center"
            >
              <FontAwesomeIcon icon={faFacebook} className="me-1" /> Facebook
            </a>
          )}
          {profile.socials?.twitter && (
            <a
              href={profile.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-dark d-flex align-items-center"
            >
              <FontAwesomeIcon icon={faXTwitter} className="me-1" /> Twitter
            </a>
          )}
        </div>

        {/* Action Buttons */}
        <div
          id="actionButtons"
          className="d-flex flex-wrap justify-content-center justify-content-sm-start gap-2"
        >
          <button
            className="btn btn-success text-white d-flex align-items-center"
            onClick={handleWhatsApp}
          >
            <FontAwesomeIcon icon={faWhatsapp} className="me-1" /> WhatsApp
          </button>
          <button className="btn btn-primary d-flex align-items-center" onClick={handlePhone}>
            <FontAwesomeIcon icon={faPhone} className="me-1" />
            <span className="d-none d-sm-inline">{formatPhone(profile.no_whatsapp)}</span>
            <span className="d-inline d-sm-none">Telepon</span>
          </button>
          <button
            className="btn btn-outline-dark border border-black d-flex align-items-center"
            onClick={handleBagikan}
          >
            <FontAwesomeIcon icon={faShareAlt} className="me-1" /> Bagikan
          </button>
        </div>
      </div>
    </div>
  );
};

export default PemilikProfileCard;
