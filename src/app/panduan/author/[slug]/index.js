'use client';

import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { UseBreadcrumb } from '@/components';
import { AuthorProfileCard } from './components';
import { PanduanCard } from '../../components';

import { useDispatch, useSelector } from 'react-redux';
import { getListPanduan } from '@/redux/action/panduan/creator';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const mockAuthorProfiles = {
  admin: {
    name: 'Admin',
    avatar: 'https://placehold.co/100x100?text=Admin',
    bio: 'Admin tempatSewa – berbagi tips, panduan, dan informasi properti sejak 2020.',
    socials: {
      instagram: 'https://instagram.com/tempatsewa',
      linkedin: 'https://linkedin.com/company/tempatsewa'
    }
  },
  'tim-tempatSewa': {
    name: 'Tim tempatSewa',
    avatar: 'https://placehold.co/100x100?text=Tim',
    bio: 'Tim konten tempatSewa yang menyusun panduan properti berkualitas untuk pemilik dan penyewa.',
    socials: {
      facebook: 'https://facebook.com/tempatsewa',
      twitter: 'https://twitter.com/tempatsewa'
    }
  }
};

export default function AuthorPage() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const panduanList = useSelector((state) => state?.panduan?.panduanList || []);

  const [articles, setArticles] = useState([]);
  const [authorProfile, setAuthorProfile] = useState(null);
  const [isLoading, setIsLoading] = useState({ panduan: false });

  const fetchListPanduan = async () => {
    setIsLoading((prev) => ({ ...prev, panduan: true }));
    await dispatch(getListPanduan());
    setIsLoading((prev) => ({ ...prev, panduan: false }));
  };

  useEffect(() => {
    if (!slug) return;

    fetchListPanduan();

    setAuthorProfile(
      mockAuthorProfiles[slug] || {
        name: slug,
        avatar: 'https://placehold.co/100x100?text=User',
        bio: 'Profil penulis belum tersedia.',
        socials: {}
      }
    );
  }, [dispatch, slug]);

  useEffect(() => {
    if (!panduanList?.length || !slug) return;
    const filtered = panduanList.filter((item) => item.authorSlug === slug);
    setArticles(filtered);
  }, [panduanList, slug]);

  if (!slug) return null;

  return (
    <Fragment>
      <div className="pb-5">
        <section className="mt-3">
          <UseBreadcrumb title={`Penulis: ${authorProfile?.name || slug}`} />
        </section>

        <section className="pt-3 pb-5">
          <div className="container">
            {/* Profil Penulis */}
            {isLoading.panduan ? (
              <div className="d-flex align-items-start gap-3 mb-4">
                <Skeleton circle width={80} height={80} />
                <div className="flex-grow-1">
                  <Skeleton height={20} width={150} />
                  <Skeleton height={14} width={250} style={{ marginTop: 10 }} />
                </div>
              </div>
            ) : (
              <AuthorProfileCard profile={authorProfile} />
            )}

            {/* Daftar Artikel */}
            {isLoading.panduan ? (
              <div className="row">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="col-6 col-lg-4 mb-4">
                    <Skeleton height={180} />
                    <Skeleton height={16} width={`80%`} style={{ marginTop: 10 }} />
                    <Skeleton height={14} width={`60%`} />
                  </div>
                ))}
              </div>
            ) : articles.length > 0 ? (
              <div className="row">
                {articles.map((article) => (
                  <div key={article.slug} className="col-6 col-lg-4 mb-4">
                    <PanduanCard guide={article} linkKategori={true} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted">Tidak ada artikel oleh penulis ini.</p>
            )}
          </div>
        </section>
      </div>
    </Fragment>
  );
}
