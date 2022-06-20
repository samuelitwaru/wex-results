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

  app.config.globalProperties.$wrapAggr = (aggr) => {
    if (aggr <= 2) {
      return `D${aggr}`;
    } else if (aggr <= 6) {
      return `C${aggr}`;
    } else if (aggr <= 8) {
      return `P${aggr}`;
    } else if (aggr == 9) {
      return `F${aggr}`;
    }
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
