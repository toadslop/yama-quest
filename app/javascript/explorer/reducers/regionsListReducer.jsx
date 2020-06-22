import { actionTypes } from '../actions';

const regionsListReducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.fetchSidebarContent:
      return action.payload;
    default:
      return state;
  }
};

export default regionsListReducer;