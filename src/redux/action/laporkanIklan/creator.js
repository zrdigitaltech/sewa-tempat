import { actionType } from '@/redux/action/laporkanIklan/type';
import axios from 'axios';

export const submitLaporkanIklan = (formData) => {
  return async (dispatch) => {
    try {
      const domainApi = process.env.NEXT_PUBLIC_DOMAIN_API || '';
      const response = await axios?.post(domainApi + '/api/v1/laporkanIklan', formData);
      dispatch(laporkanIklan(response.data));
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Submit Laporkan Iklan error:', error);
      return { success: false, error };
    }
  };
};

export const laporkanIklan = (payload) => {
  return {
    type: actionType.loadLaporkanIklan,
    payload: payload
  };
};
