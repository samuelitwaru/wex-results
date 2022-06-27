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