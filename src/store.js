import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
//npm install redux-persist
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

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
