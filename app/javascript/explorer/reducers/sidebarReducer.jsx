import { actionTypes } from '../actions';

const sidebarReducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.toggleSidebar:
      return action.payload
    default:
      return state;
  }
};

export default sidebarReducer;