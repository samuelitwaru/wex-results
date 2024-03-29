import { boot } from "quasar/wrappers";
import axios from "axios";
import axiosRetry from "axios-retry";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

var hostURL = "https://mydemoapp.pythonanywhere.com/";
var hostURL = "https://wex-erp.herokuapp.com";
var hostURL = "http://127.0.0.1:8000";
var apiURL = `${hostURL}/api`;
var mediaURL = `${hostURL}/media`;

const api = axios.create({ baseURL: apiURL });
axiosRetry(api, { retries: 1 });

export default boot(({ app, router, store }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      // whatever you want to do with the error
      if (error.response.status == 403) {
        store.dispatch("results/signOut");
        router.push("/login");
      } else if (error.response.status == 400) {
        var data = error.response.data;
        var msg = "Bad request. Please check your input data.";
        if (typeof data == "string") {
          msg = data;
        } else if (typeof data == "object") {
          msg = Object.values(data);
          store.commit("results/updateFormDataErrors", data);
        }
        store.commit("results/updateAlertMsg", `${msg}`);
        store.commit("results/updateLoadingState", false);
        store.commit("results/updateAlertState", true);
      } else if (error.response.status == 500) {
        var msg =
          "505: An Error occured. Please refresh the page and try again.";
        store.commit("results/updateAlertMsg", `${msg}`);
        store.commit("results/updateLoadingState", false);
        store.commit("results/updateAlertState", true);
      } else if (error.response.status == 404) {
        router.back();
      }
    }
  );
  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
  app.config.globalProperties.$apiURL = apiURL;
  app.config.globalProperties.$mediaURL = mediaURL;
});

export { api };
