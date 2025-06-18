import axios from 'axios';
import DataKontrakan from '@/redux/action/kontrakan/data-kontrakan.json';

export async function getPropertiDetailBySlug(slug) {
  try {
    const domainApi = process.env.NEXT_PUBLIC_DOMAIN_API || '';
    const response = await axios.get(`${domainApi}/api/v1/kontrakanDetail?slug=${slug}`);
    const detail = response.data.data;
    if (detail) {
      return detail;
    } else {
      // fallback dari JSON statis
      const fallback = DataKontrakan.find((item) => item.slug === slug);
      if (fallback) {
        return fallback;
      }
    }
  } catch (error) {
    console.error('Error fetching properti detail:', error);
    const fallback = DataKontrakan.find((item) => item.slug === slug);
    if (fallback) {
      return fallback;
    }
  }
}
