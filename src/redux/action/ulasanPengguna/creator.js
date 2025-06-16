import { actionType } from '@/redux/action/ulasanPengguna/type';
import axios from 'axios';

export const submitUlasanPengguna = (formData) => {
  return async (dispatch) => {
    try {
      const domainApi = process.env.NEXT_PUBLIC_DOMAIN_API || '';
      const response = await axios?.post(domainApi + '/api/v1/ulasanPengguna', formData);
      dispatch(ulasanPengguna(response.data));
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Submit Beri Saran error:', error);
      return { success: false, error };
    }
  };
};

export const ulasanPengguna = (payload) => {
  return {
    type: actionType.loadUlasanPengguna,
    payload: payload
  };
};
