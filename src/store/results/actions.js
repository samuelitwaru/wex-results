/*
export function someAction (context) {
}
*/

import { api } from "src/boot/axios";
import router from "src/router";

export const init = (context) => {
  // get token and user groups from localStorage
  const token = localStorage.getItem("token");
  const groups = JSON.parse(localStorage.getItem("groups"));
  // commit them to state
  context.commit("setToken", token);
  context.commit("setGroups", groups);

  const acceptedGoups = ["dos", "head_teacher", "teacher"];
  if (groups && !groups.some((group) => acceptedGoups.includes(group))) {
    context.dispatch("signOut");
    return;
  }

  if (token) {
    api.defaults.headers.common.Authorization = `Token ${token}`;
    api.get(`/users/token/${token}/`).then((response) => {
      context.commit("setUser", response.data);
      var groups = response.data.groups;
      context.commit("setGroups", groups);
    });
  } else {
    api.defaults.headers.common.Authorization = "";
  }
};

export const signOut = ({ commit }) => {
  api.defaults.headers.common.Authorization = "";
  commit("setToken", null);
  commit("setGroups", null);
};

export const getUser = ({ commit, state }, payload) => {
  return new Promise((resolve, reject) => {
    api
      .get(`/users/token/${payload}/`)
      .then((response) => {
        commit("setUser", response.data);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const getTeacher = ({ commit, state }) => {
  return new Promise((resolve, reject) => {
    api
      .get(`/teachers/?user=${state.user.user_id}`)
      .then((response) => {
        commit("setProfile", response.data[0]);
        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
