const axios = require('axios');
const DataPemilik = require('../../../../redux/action/pemilik/data-pemilik.json');

async function getPemilikBySlug(slug) {
  const fallback = () => {
    const item = DataPemilik.find((item) => item.slug === slug);
    if (item) {
      console.warn(`⚠️ Menggunakan fallback untuk slug: ${slug}`);
    } else {
      console.warn(`⚠️ Slug ${slug} tidak ditemukan di fallback lokal.`);
    }
    return item;
  };

  try {
    const domainApi = process.env.NEXT_PUBLIC_DOMAIN_API || '';
    if (!domainApi) {
      console.warn('❗ NEXT_PUBLIC_DOMAIN_API kosong. Gunakan fallback lokal.');
      return fallback();
    }

    const response = await axios.get(`${domainApi}/api/v1/pemilik?slug=${slug}`);
    const detail = response.data?.data;

    if (detail) {
      return detail;
    } else {
      console.warn(`⚠️ Data pemilik tidak ditemukan dari API untuk slug: ${slug}`);
      return fallback();
    }
  } catch (error) {
    console.error(`❌ Error fetch pemilik detail slug: ${slug}`, error.message);
    return fallback();
  }
}

module.exports = { getPemilikBySlug };
