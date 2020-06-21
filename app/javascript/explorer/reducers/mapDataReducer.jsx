import { actionTypes } from '../actions';

const mapDataReducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.fetchGeojson:
      return Object.assign({}, state, {
        geojson: action.payload
      })

    case actionTypes.fetchMapBounds:
      return Object.assign({}, state, {
        bounds: action.payload
      })

    case actionTypes.setSubGeojson:
      console.log("payload", action.payload)
      return Object.assign({}, state, {
        geojson: action.payload.geojson
      })

    default:
      return state;
  }
};

export default mapDataReducer;

