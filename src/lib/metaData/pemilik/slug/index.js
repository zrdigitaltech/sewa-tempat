import axios from 'axios';
import DataPemilik from '@/redux/action/pemilik/data-pemilik.json';

export async function getPemilikBySlug(slug) {
  try {
    const domainApi = process.env.NEXT_PUBLIC_DOMAIN_API || '';
    const response = await axios.get(`${domainApi}/api/v1/pemilik?slug=${slug}`);
    const detail = response.data.data;
    if (detail) {
      return detail;
    } else {
      // fallback dari JSON statis
      const fallback = DataPemilik.find((item) => item.slug === slug);
      if (fallback) {
        return fallback;
      }
    }
  } catch (error) {
    console.error('Error fetching pemilik detail:', error);
    const fallback = DataPemilik.find((item) => item.slug === slug);
    if (fallback) {
      return fallback;
    }
  }
}
