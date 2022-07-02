import { boot } from "quasar/wrappers";
import { Notify } from "quasar";
// import store from "src/store";

export default boot(({ app, router, store }) => {
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

    app.config.globalProperties.$showMsg = (msg) => {
        store.commit("results/updateAlertState", true);
        store.commit("results/updateAlertMsg", msg);
    };

    app.config.globalProperties.$camelToNormal = (text) => {
        var result = text.replace(/([A-Z])/g, " $1");
        var finalResult = result.charAt(0).toUpperCase() + result.slice(1);
        return finalResult;
    };

    app.config.globalProperties.$userHasGroup = (group) => {
        var userGroups = JSON.parse(window.localStorage.getItem("groups"));
        return userGroups.includes(group);
    };

    app.config.globalProperties.$getState = (stateName) => {
        return store.state.results[stateName];
    };

    app.config.globalProperties.$setState = (stateName, stateValue) => {
        return (store.state.results[stateName] = stateValue);
    };

    app.config.globalProperties.$userHasAllGroups = (groups) => {
        var userGroups = JSON.parse(window.localStorage.getItem("groups"));
        return groups.every((group) => userGroups.includes(group));
    };

    app.config.globalProperties.$userHasAnyGroups = (groups) => {
        var userGroups = JSON.parse(window.localStorage.getItem("groups"));
        return groups.some((group) => userGroups.includes(group));
    };
});
