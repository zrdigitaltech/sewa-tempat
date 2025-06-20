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

    case actionType.loadRegisterResetData:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
