import { route, store } from "quasar/wrappers";
import {
    createRouter,
    createMemoryHistory,
    createWebHistory,
    createWebHashHistory,
} from "vue-router";
import routes from "./routes";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function({ store, ssrContext }) {
    const createHistory = process.env.SERVER ?
        createMemoryHistory :
        process.env.VUE_ROUTER_MODE === "history" ?
        createWebHistory :
        createWebHashHistory;

    const Router = createRouter({
        scrollBehavior: () => ({ left: 0, top: 0 }),
        routes,
        // Leave this as is and make changes in quasar.conf.js instead!
        // quasar.conf.js -> build -> vueRouterMode
        // quasar.conf.js -> build -> publicPath
        history: createHistory(
            process.env.MODE === "ssr" ? void 0 : process.env.VUE_ROUTER_BASE
        ),
    });

    const landingRoutes = {
        dos: "/",
        head_teacher: "/",
        teacher: "/class-rooms",
    };

    Router.beforeEach((to, from, next) => {
        const isAuthenticated = store.state.results.isAuthenticated;
        if (isAuthenticated) {
            const groups = store.state.results.groups;
            const group = groups[0];
            // next(landingRoutes[group]);
            const groupsRequired = to.meta.groupsRequired;
            const isAuthorized = groups.some((group) =>
                groupsRequired.includes(group)
            );
            // if (to.path == "/login" || to.path == "/") {
            //     return;
            // }
            if (!isAuthorized) {
                // Router.back();
                next("/unauthorized");
                return;
            }
        } else if (
            to.matched.some((record) => record.meta.loginRequired) &&
            !isAuthenticated
        ) {
            next("/login");
        }
        console.log("nexting last");
        next();
    });

    // Router.afterEach((to, from, failure) => {
    //     const groups = store.state.results.user.groups;
    //     const groupsRequired = to.meta.groups;
    //     console.log(groups);
    //     console.log(groupsRequired);
    //     const isAuthorized = groups.some((group) => groupsRequired.includes(group));
    //     if (!isAuthorized) {
    //         console.log("not authorized", failure);
    //     }
    // });

    return Router;
});