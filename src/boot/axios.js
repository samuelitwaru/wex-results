import { boot } from "quasar/wrappers";
import axios from "axios";
import axiosRetry from "axios-retry";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

// var baseURL = 'http://192.168.1.155:8000/api'
var hostURL = "https://wex-erp.herokuapp.com";
var hostURL = "http://127.0.0.1:8000";
var apiURL = `${hostURL}/api`;
var mediaURL = `${hostURL}/media`;

const api = axios.create({ baseURL: apiURL });
axiosRetry(api, { retries: 10 });

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
  app.config.globalProperties.$apiURL = apiURL;
  app.config.globalProperties.$mediaURL = mediaURL;
});

export { api };
