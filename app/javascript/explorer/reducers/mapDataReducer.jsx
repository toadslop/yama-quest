import { actionTypes } from '../actions';

const mapDataReducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.fetchGeojson:
      state.geojson = action.payload
      return state
    case actionTypes.fetchMapBounds:
      state.bounds = action.payload
      return state
    default:
      return state;
  }
};

export default mapDataReducer;