import { actionType } from '@/redux/action/tipeSewa/type';
import axios from 'axios';

// Data Json
import DataTipeSewa from './data-tipe-sewa.json';

// Read
export const getListTipeSewa = () => {
  return async (dispatch) => {
    try {
      const domainApi = process.env.NEXT_PUBLIC_DOMAIN_API || '';
      const response = await axios?.get(domainApi + '/api/v1/tipeSewa');
      const dataTipeSewa = response?.data?.data;
      if (dataTipeSewa?.length > 0) {
        dispatch(saveListTipeSewa(dataTipeSewa));
      } else {
        dispatch(saveListTipeSewa(DataTipeSewa));
      }
    } catch (error) {
      console.error('Error fetching TipeSewa from API:', error);
      dispatch(saveListTipeSewa(DataTipeSewa));
    }
  };
};

export const saveListTipeSewa = (payload) => {
  return {
    type: actionType.loadTipeSewa,
    payload: payload
  };
};
