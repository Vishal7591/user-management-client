import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import * as config from "../config";
import { Client, UserSignUp } from "../types/client/clientTypes";

export const updateClient = createAsyncThunk(
  "client/updateClient",
  async (users: UserSignUp[]) => {
    const usersCollection = users.map((user) => {
      return { ...user, password: "1234" };
    });
    const authRes = await fetch(`${config.API_BASE_URL}users/manage`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(usersCollection),
    });
    const res = await authRes.json();
    return res;
  }
);

export const clientUpdateSlice = createSlice({
  name: "clientUpdate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateClient.pending, (state) => {
      state.common.loading = true;
    });
    builder.addCase(updateClient.fulfilled, (state, action) => {
      state.common.loading = false;
      state.common.success = true;
      state.common.contents = action.payload as Client[];
    });
    builder.addCase(updateClient.rejected, (state, action) => {
      state.common.loading = false;
      state.common.error = action.error.message as string;
    });
  },
});

export default clientUpdateSlice.reducer;
