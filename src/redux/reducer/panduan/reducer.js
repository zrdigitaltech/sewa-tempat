import { initialState } from '@/redux/action/panduan/state';
import { actionType } from '@/redux/action/panduan/type';

export const panduanReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.loadPanduan:
      state = {
        ...state,
        panduanList: action.payload
      };
      return state;

    case actionType.loadPanduanSearch:
      state = {
        ...state,
        panduanSearch: action.payload
      };
      return state;

    case actionType.loadPanduanDetail:
      state = {
        ...state,
        panduanDetail: action.payload
      };
      return state;

    case actionType.loadPanduanPopuler:
      state = {
        ...state,
        panduanPopuler: action.payload
      };
      return state;

    case actionType.loadPanduanResetData:
      return initialState;
    default:
      return state;
  }
};

export default panduanReducer;
