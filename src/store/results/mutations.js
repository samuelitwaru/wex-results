/*
export function someMutation (state) {
}
*/

import { api } from "src/boot/axios";

export const updateLoadingState = (state, opened) => {
    state.loading = opened;
};

export const updateAlertState = (state, opened) => {
    state.show = opened;
};

export const updateAlertMsg = (state, msg) => {
    state.msg = msg;
};

export const updateFormDataErrors = (state, formDataErrors) => {
    state.formDataErrors = formDataErrors;
};

export const setUser = (state, user) => {
    console.log(user);
    state.user = user;
    window.localStorage.setItem("groups", JSON.stringify(user.groups));
};

export const setGroups = (state, groups) => {
    if (groups) {
        state.groups = groups;
        window.localStorage.setItem("groups", JSON.stringify(groups));
    } else {
        window.localStorage.removeItem("groups");
    }
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

export const setProfile = (state, profile) => {
    state.profile = profile;
};