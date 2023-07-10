import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  user_id: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER_ID':
      return { ...state, user_id: action.payload };
    default:
      return state;
  }
}

const store = configureStore({
  reducer,
});

export default store;