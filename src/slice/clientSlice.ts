import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import * as config from "../config";
import { Client } from "../types/client/clientTypes";

export const fetchClient = createAsyncThunk("client/fetchClient", async () => {
  const authRes = await fetch(`${config.API_BASE_URL}users`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
  });
  const res = await authRes.json();
  return res;
});

export type ThunkDispatch = typeof fetchClient;

export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchClient.pending, (state) => {
      state.common.loading = true;
    });
    builder.addCase(fetchClient.fulfilled, (state, action) => {
      state.common.loading = false;
      state.common.success = true;
      state.common.contents = action.payload as Client[];
    });
    builder.addCase(fetchClient.rejected, (state, action) => {
      state.common.loading = false;
      state.common.error = action.error.message as string;
    });
  },
});

export default clientSlice.reducer;
