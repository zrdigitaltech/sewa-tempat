const axios = require('axios');
const DataPanduan = require('../../../redux/action/panduan/data-panduan.json');

async function getPanduanDetailBySlug(slug) {
  try {
    const domainApi = process.env.NEXT_PUBLIC_DOMAIN_API || '';
    const response = await axios.get(`${domainApi}/api/v1/panduanDetail?slug=${slug}`);
    const detail = response.data.data;
    if (detail) {
      return detail;
    } else {
      // fallback dari JSON statis
      const fallback = DataPanduan.find((item) => item.slug === slug);
      if (fallback) {
        return fallback;
      }
    }
  } catch (error) {
    console.error('Error fetching panduan detail:', error);
    const fallback = DataPanduan.find((item) => item.slug === slug);
    if (fallback) {
      return fallback;
    }
  }
}

async function getPanduan() {
  try {
    const domainApi = process.env.NEXT_PUBLIC_DOMAIN_API || '';
    const response = await axios.get(`${domainApi}/api/v1/panduan`);
    const detail = response.data?.data;

    if (Array.isArray(detail)) {
      return detail.map((item) => item.slug).filter(Boolean);
    }
  } catch (error) {
    console.error('Error fetching properti:', error);
  }

  // fallback dari JSON statis
  return DataPanduan.map((item) => item.slug).filter(Boolean);
}

module.exports = { getPanduanDetailBySlug, getPanduan };
