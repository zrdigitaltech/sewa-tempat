import { initialState } from '@/redux/action/konsultasi/state';
import { actionType } from '@/redux/action/konsultasi/type';

export const konsultasiReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.loadKonsultasi:
      state = {
        ...state,
        konsultasi: action.payload
      };
      return state;

    case actionType.loadKonsultasiResetData:
      return initialState;
    default:
      return state;
  }
};

export default konsultasiReducer;
