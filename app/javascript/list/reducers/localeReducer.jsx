const localeReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_LOCALE':
      I18n.locale = action.payload
      console.log(I18n.locale)
      return action.payload
    default:
      return state;
  }
};

export default localeReducer;