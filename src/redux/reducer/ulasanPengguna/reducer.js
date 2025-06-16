import { initialState } from '@/redux/action/ulasanPengguna/state';
import { actionType } from '@/redux/action/ulasanPengguna/type';

export const ulasanPenggunaReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.loadUlasanPengguna:
      state = {
        ...state,
        ulasanPengguna: action.payload
      };
      return state;

    case actionType.loadUlasanPenggunaResetData:
      return initialState;
    default:
      return state;
  }
};

export default ulasanPenggunaReducer;
