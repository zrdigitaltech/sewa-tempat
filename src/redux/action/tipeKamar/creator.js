import { actionType } from '@/redux/action/tipeKamar/type';
import axios from 'axios';

// Data Json
import DataTipeKamar from './data-tipe-kamar.json';

// Read
export const getListTipeKamar = (tipeProperti) => {
  return async (dispatch) => {
    try {
      const domainApi = process.env.NEXT_PUBLIC_DOMAIN_API || '';
      const response = await axios?.get(domainApi + '/api/v1/tipeKamar');
      const dataTipeKamar = response?.data?.data;
      if (dataTipeKamar?.length > 0) {
        dispatch(saveListTipeKamar(dataTipeKamar));
      } else {
        const filteredOptions = DataTipeKamar.filter(
          (option) => !option.condition || option.condition === tipeProperti
        );
        dispatch(saveListTipeKamar(filteredOptions));
      }
    } catch (error) {
      console.error('Error fetching TipeKamar from API:', error);
      const filteredOptions = DataTipeKamar.filter(
        (option) => !option.condition || option.condition === tipeProperti
      );
      console.log('a', filteredOptions);
      dispatch(saveListTipeKamar(filteredOptions));
    }
  };
};

export const saveListTipeKamar = (payload) => {
  return {
    type: actionType.loadTipeKamar,
    payload: payload
  };
};
