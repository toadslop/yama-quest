import { actionTypes } from '../actions';

const mapDataReducer = (state = null, action) => {
  console.log(action.payload)
  switch (action.type) {
    case actionTypes.fetchGeojson:
      return Object.assign({}, state, {
        geojson: action.payload
      })

    case actionTypes.fetchMapBounds:
      return Object.assign({}, state, {
        bounds: action.payload
      })
      
    default:
      return state;
  }
};

export default mapDataReducer;

