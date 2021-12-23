import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  processing: [],
};

export const addItem = createAsyncThunk("basket/addItem", async (item) => {
  const response = await axios.post(
    "https://jsonplaceholder.typicode.com/posts",
    {
      productCode: item.productCode,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
});
export const basketSlice = createSlice({
  name: "basket",
  initialState,
  extraReducers: {
    [addItem.fulfilled]: (state, action) => {
      let item = {};
      item.productCode = action.payload.productCode;
      item.productPrice = action.meta.arg.productPrice;

      if (
        state.items.some(
          (item) => item.productCode === action.payload.productCode
        )
      ) {
        state.items = state.items.filter(function (obj) {
          return obj.productCode !== action.payload.productCode;
        });
      } else {
        state.items.push(item);
      }

      state.processing = [];
    },
    [addItem.pending]: (state, action) => {
      state.processing.push(action.meta.arg);
    },
  },
});
