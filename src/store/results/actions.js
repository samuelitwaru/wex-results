/*
export function someAction (context) {
}
*/

import { api } from "src/boot/axios";
import router from "src/router";

export const signOut = ({ commit }) => {
  api.defaults.headers.common.Authorization = "";
  commit("setToken", null);
};

export const init = ({ commit }) => {
  const token = localStorage.getItem("token");
  commit("setToken", token);
};
