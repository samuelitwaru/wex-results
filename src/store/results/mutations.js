/*
export function someMutation (state) {
}
*/

import { api } from "src/boot/axios";

export const updateLoadingState = (state, opened) => {
  state.loading = opened;
};

export const setToken = (state, token) => {
  if (token) {
    state.isAuthenticated = true;
    window.localStorage.setItem("token", token);
    api.defaults.headers.common.Authorization = `Token ${token}`;
  } else {
    state.isAuthenticated = false;
    window.localStorage.removeItem("token");
    api.defaults.headers.common.Authorization = ``;
  }
  state.token = token;
};
