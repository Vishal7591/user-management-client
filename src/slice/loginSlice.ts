import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import * as config from "../config";
import { AuthSuccess, LoginCredentials } from "../types/loginTypes";

export const loginClient = createAsyncThunk(
  "auth/loginClient",
  async (userCrendentials: LoginCredentials) => {
    const authRes = await fetch(`${config.API_BASE_URL}auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(userCrendentials),
    });
    const res = await authRes.json();
    return res;
  }
);

export type ThunkDispatch = typeof loginClient;

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginClient.pending, (state) => {
      state.common.loading = true;
    });
    builder.addCase(loginClient.fulfilled, (state, action) => {
      state.common.loading = false;
      state.common.success = true;
      state.common.contents = action.payload as AuthSuccess;
    });
    builder.addCase(loginClient.rejected, (state, action) => {
      state.common.loading = false;
      state.common.error = action.error.message as string;
    });
  },
});

export default loginSlice.reducer;
