import { Client } from "../types/client/clientTypes";
import { AuthFailure, AuthSuccess } from "../types/loginTypes";

export const initialState = {
  common: {
    loading: false,
    error: "",
    success: false,
    contents: {} as Client[] | AuthSuccess | AuthFailure,
  },
};
