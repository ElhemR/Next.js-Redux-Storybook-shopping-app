
import { combineReducers } from '@reduxjs/toolkit'

import {
  configureStore,
} from '@reduxjs/toolkit';

import {
   basketSlice
  } from './basketSlice';

  import {
    stockSlice
   } from './receiverSlice';
 
const rootReducer = combineReducers({
  stock:  stockSlice.reducer,
  basket: basketSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer
});
