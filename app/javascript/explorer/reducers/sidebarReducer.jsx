const sidebarReducer = (state = null, action) => {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return action.payload
    default:
      return state;
  }
};

export default sidebarReducer;