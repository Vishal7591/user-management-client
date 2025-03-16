import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import * as config from "../config";
import { AuthSuccess } from "../types/loginTypes";
import { UserSignUp } from "../types/client/clientTypes";

export const signUpClient = createAsyncThunk(
  "user/signUpClient",
  async (user: UserSignUp) => {
    const signUpRes = await fetch(`${config.API_BASE_URL}users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const res = await signUpRes.json();
    return res;
  }
);

export type ThunkDispatch = typeof signUpClient;

export const signUpSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUpClient.pending, (state) => {
      state.common.loading = true;
    });
    builder.addCase(signUpClient.fulfilled, (state, action) => {
      state.common.loading = false;
      state.common.success = true;
      state.common.contents = action.payload as AuthSuccess;
    });
    builder.addCase(signUpClient.rejected, (state, action) => {
      state.common.loading = false;
      state.common.error = action.error.message as string;
    });
  },
});

export default signUpSlice.reducer;
