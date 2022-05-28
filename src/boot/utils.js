import { boot } from "quasar/wrappers";
// import VueSimpleAlert from "vue-simple-alert";
import { Notify } from "quasar";

export default boot(({ app }) => {
  // app.config.globalProperties.$notify = VueSimpleAlert;
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
});
