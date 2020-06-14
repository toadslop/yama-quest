import { actionTypes } from '../actions';

const mapViewportReducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.setViewport:
      return action.payload;
    default:
      return state;
  }
};

export default mapViewportReducer;