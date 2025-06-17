import { initialState } from '@/redux/action/tipeKost/state';
import { actionType } from '@/redux/action/tipeKost/type';

export const tipeKostReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.loadTipeKost:
      state = {
        ...state,
        tipeKostList: action.payload
      };
      return state;
    case actionType.loadTipeKostResetData:
      return initialState;
    default:
      return state;
  }
};

export default tipeKostReducer;
