import axios from 'axios';
import { combineReducers } from '@reduxjs/toolkit'
const stockClient = require('contentful').createClient({
    space: 'g7lu5gsaitgx',
    accessToken: 'En0QPEOglyvGmpN5NKokZHlg9hNkjuTsXg8OKb3rckY'
})
import {
  createSlice,
  configureStore,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import {
   basketSlice
  } from './basketSlice';
const initialState = {
  stock: [0],
};

export const getStock = createAsyncThunk(
  'stock/getStock',
  async type => {
    const response = await  await stockClient.getEntries()
    return response.items;
  },
);

export const stockSlice = createSlice({
  name: 'stock',
  initialState,
  extraReducers: {
    [getStock.fulfilled]: (state, action) => {
      state.stock = action.payload;
    },
  },
});
