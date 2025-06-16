import { initialState } from '@/redux/action/tipeSewa/state';
import { actionType } from '@/redux/action/tipeSewa/type';

export const tipeSewaReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.loadTipeSewa:
      state = {
        ...state,
        tipeSewaList: action.payload
      };
      return state;
    case actionType.loadTipeSewaResetData:
      return initialState;
    default:
      return state;
  }
};

export default tipeSewaReducer;
