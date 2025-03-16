/* eslint-disable global-require */
/* eslint-disable no-undef */
import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import clientSlice from "../slice/clientSlice";
import loginSlice from "../slice/loginSlice";
import signUpSlice from "../slice/signUpSlice";
import clientUpdateSlice from "../slice/clientUpdateSlice";

export const store = configureStore({
  reducer: {
    login: loginSlice,
    signUp: signUpSlice,
    client: clientSlice,
    clientUpdate: clientUpdateSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
