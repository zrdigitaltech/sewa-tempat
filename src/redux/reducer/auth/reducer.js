import { initialState } from '@/redux/action/auth/state';
import { actionType } from '@/redux/action/auth/type';

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.loadRegister:
      state = {
        ...state,
        register: action.payload
      };
      return state;

    case actionType.loadLogin:
      return {
        ...state,
        login: action.payload,
        isAuthenticated: true,
        authChecked: true
      };

    case actionType.loadRegisterResetData:
    case actionType.loadLoginResetData:
      return {
        ...initialState,
        // isAuthenticated: false, // ✅ saat logout
        authChecked: true
      };

    default:
      return state;
  }
};

export default authReducer;
