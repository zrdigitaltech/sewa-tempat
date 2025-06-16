import { initialState } from '@/redux/action/laporkanIklan/state';
import { actionType } from '@/redux/action/laporkanIklan/type';

export const laporkanIklanReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.loadLaporkanIklan:
      state = {
        ...state,
        laporkanIklan: action.payload
      };
      return state;

    case actionType.loadLaporkanIklanResetData:
      return initialState;
    default:
      return state;
  }
};

export default laporkanIklanReducer;
