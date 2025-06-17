import { initialState } from '@/redux/action/author/state';
import { actionType } from '@/redux/action/author/type';

export const authorReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.loadAuthor:
      state = {
        ...state,
        authorList: action.payload
      };
      return state;
    case actionType.loadAuthorResetData:
      return initialState;
    default:
      return state;
  }
};

export default authorReducer;
