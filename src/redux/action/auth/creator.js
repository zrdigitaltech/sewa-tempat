import { actionType } from '@/redux/action/auth/type';
import axios from 'axios';

export const submitRegister = (formData) => {
  return async (dispatch) => {
    try {
      const domainApi = process.env.NEXT_PUBLIC_DOMAIN_API || '';
      const response = await axios?.post(domainApi + '/api/v1/register', formData);
      dispatch(register(response.data));
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Submit Register error:', error);
      return { success: false, error };
    }
  };
};

export const submitRegisterPasangIklan = (formData) => {
  return async (dispatch) => {
    try {
      const domainApi = process.env.NEXT_PUBLIC_DOMAIN_API || '';
      const response = await axios?.post(domainApi + '/api/v1/register', formData);
      dispatch(register(response.data));
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Submit Register error:', error);
      return { success: false, error };
    }
  };
};

export const register = (payload) => {
  return {
    type: actionType.loadRegister,
    payload: payload
  };
};
