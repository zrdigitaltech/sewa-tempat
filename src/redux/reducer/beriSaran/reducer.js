import { initialState } from '@/redux/action/beriSaran/state';
import { actionType } from '@/redux/action/beriSaran/type';

export const beriSaranReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.loadBeriSaran:
      state = {
        ...state,
        beriSaran: action.payload
      };
      return state;

    case actionType.loadBeriSaranResetData:
      return initialState;
    default:
      return state;
  }
};

export default beriSaranReducer;
