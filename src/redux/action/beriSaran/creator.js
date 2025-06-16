import { actionType } from '@/redux/action/beriSaran/type';
import axios from 'axios';

export const submitBeriSaran = (formData) => {
  return async (dispatch) => {
    try {
      const domainApi = process.env.NEXT_PUBLIC_DOMAIN_API || '';
      const response = await axios?.post(domainApi + '/api/v1/beriSaran', formData);
      dispatch(beriSaran(response.data));
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Submit Beri Saran error:', error);
      return { success: false, error };
    }
  };
};

export const beriSaran = (payload) => {
  return {
    type: actionType.loadBeriSaran,
    payload: payload
  };
};
