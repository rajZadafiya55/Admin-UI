// src/redux/reducers.js
const initialState = {
  isAuthenticated: false,
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
      };
    default:
      return state;
  }
};
