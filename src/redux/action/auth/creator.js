import { actionType } from '@/redux/action/auth/type';
import axios from 'axios';
import axiosClient from '@/lib/axiosClient';

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

export const loginUser = (formData) => {
  return async (dispatch) => {
    try {
      const domainApi = process.env.NEXT_PUBLIC_DOMAIN_API || '';

      await axiosClient.get(domainApi + '/sanctum/csrf-cookie');

      const response = await axiosClient.post(domainApi + '/api/v1/login', formData);

      const userRes = await axiosClient.get(domainApi + '/api/v1/user');

      dispatch(setLogin(userRes.data));
      return { success: true, data: userRes.data };
    } catch (error) {
      console.error('Login error:', error?.response?.data || error);
      return { success: false, error: error?.response?.data || error };
    }
  };
};

export const loginUserFromSession = () => {
  return async (dispatch) => {
    try {
      const domainApi = process.env.NEXT_PUBLIC_DOMAIN_API || '';
      const response = await axiosClient.get(domainApi + '/api/v1/user'); // akan return user jika session valid
      dispatch(setLogin(response.data));
    } catch (error) {
      console.error('Auth session not valid:', error?.response?.data || error);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      const domainApi = process.env.NEXT_PUBLIC_DOMAIN_API || '';
      await axios.post(domainApi + '/api/v1/logout', {}, { withCredentials: true });
      dispatch(resetAuth());
    } catch (err) {
      console.error('Logout error:', err);
    }
  };
};

export const setLogin = (payload) => ({
  type: actionType.loadLogin,
  payload
});

export const resetAuth = () => ({
  type: actionType.loadLoginResetData
});

export const register = (payload) => {
  return {
    type: actionType.loadRegister,
    payload: payload
  };
};
