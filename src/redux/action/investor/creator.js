import { actionType } from '@/redux/action/investor/type';
import axios from 'axios';

export const submitInvestor = (formData) => {
  return async (dispatch) => {
    try {
      const domainApi = process.env.NEXT_PUBLIC_DOMAIN_API || '';
      const response = await axios?.post(domainApi + '/api/v1/investor', formData);
      dispatch(investor(response.data));
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Submit Beri Saran error:', error);
      return { success: false, error };
    }
  };
};

export const investor = (payload) => {
  return {
    type: actionType.loadInvestor,
    payload: payload
  };
};
