import { initialState } from '@/redux/action/investor/state';
import { actionType } from '@/redux/action/investor/type';

export const investorReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.loadInvestor:
      state = {
        ...state,
        investor: action.payload
      };
      return state;

    case actionType.loadInvestorResetData:
      return initialState;
    default:
      return state;
  }
};

export default investorReducer;
