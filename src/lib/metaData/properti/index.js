const axios = require('axios');
const DataKontrakan = require('../../../redux/action/kontrakan/data-kontrakan.json');

async function getPropertiDetailBySlug(slug) {
  const fallback = () => {
    const item = DataKontrakan.find((item) => item.slug === slug);
    if (item) {
      console.warn(`Menggunakan fallback untuk slug: ${slug}`);
    }
    return item;
  };

  try {
    const domainApi = process.env.NEXT_PUBLIC_DOMAIN_API || '';
    if (!domainApi) {
      console.warn('❗ domainApi kosong. Gunakan fallback JSON.');
      return fallback();
    }

    const response = await axios.get(`${domainApi}/api/v1/kontrakanDetail?slug=${slug}`);
    const detail = response.data.data;

    if (detail) {
      return detail;
    } else {
      return fallback();
    }
  } catch (error) {
    console.error(`Error fetching properti detail untuk slug: ${slug}`, error.message);
    return fallback();
  }
}

async function getProperti() {
  try {
    const domainApi = process.env.NEXT_PUBLIC_DOMAIN_API || '';
    const response = await axios.get(`${domainApi}/api/v1/kontrakan`);
    const detail = response.data?.data;

    if (Array.isArray(detail)) {
      return detail.map((item) => item.slug).filter(Boolean);
    }
  } catch (error) {
    console.error('Error fetching properti:', error);
  }

  // fallback dari JSON statis
  return DataKontrakan.map((item) => item.slug).filter(Boolean);
}

module.exports = { getProperti, getPropertiDetailBySlug };
