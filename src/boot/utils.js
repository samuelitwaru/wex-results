import { boot } from "quasar/wrappers";
import { Notify } from "quasar";
import store from "src/store";

export default boot(({ app }) => {
  app.config.globalProperties.$groupBy = (array, field) => {
    return array.reduce((r, a) => {
      r[a[field]] = r[field] || [];
      r[a[field]].push(a);
      return r;
    }, Object.create(null));
  };

  app.config.globalProperties.$buildURLQuery = (obj) => {
    return Object.entries(obj)
      .map((pair) => {
        if (pair[1]) {
          return pair.map(encodeURIComponent).join("=");
        }
      })
      .join("&");
  };

  app.config.globalProperties.$setLoading = (context, loading) => {
    context.$store.commit("results/updateLoadingState", loading);
  };

  app.config.globalProperties.$camelToNormal = (text) => {
    var result = text.replace(/([A-Z])/g, " $1");
    var finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
  };
});
