import { actionTypes } from '../actions';

const localeReducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.setLocale:
      I18n.locale = action.payload
      return action.payload
    default:
      return state;
  }
};

export default localeReducer;