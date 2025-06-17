import { initialState } from '@/redux/action/tipeKamar/state';
import { actionType } from '@/redux/action/tipeKamar/type';

export const tipeKamarReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.loadTipeKamar:
      state = {
        ...state,
        tipeKamarList: action.payload
      };
      return state;
    case actionType.loadTipeKamarResetData:
      return initialState;
    default:
      return state;
  }
};

export default tipeKamarReducer;
