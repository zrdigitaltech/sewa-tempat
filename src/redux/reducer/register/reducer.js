import { initialState } from '@/redux/action/register/state';
import { actionType } from '@/redux/action/register/type';

export const registerReducer = (state = initialState, action) => {
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

export default registerReducer;
