const regionsListReducer = (state = null, action) => {
  console.log(action.payload)
  switch (action.type) {
    case 'FETCH_SIDEBAR_LIST':
      console.log(action.payload)
      return action.payload;
    default:
      console.log("default")
      return state;
  }
};

export default regionsListReducer;