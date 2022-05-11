(() => {
  "use strict";
  var e = {
      4647: (e, t, n) => {
        n(8964), n(702);
        var r = n(1957),
          o = n(8266),
          a = n(499),
          i = n(9835);
        function l(e, t, n, r, o, a) {
          const l = (0, i.up)("router-view");
          return (0, i.wg)(), (0, i.j4)(l);
        }
        const s = (0, i.aZ)({ name: "App" });
        var c = n(1639);
        const d = (0, c.Z)(s, [["render", l]]),
          p = d;
        var h = n(1502),
          u = n(3340),
          m = n(8910);
        const f = [
            {
              path: "/",
              component: () =>
                Promise.all([n.e(736), n.e(64), n.e(294)]).then(n.bind(n, 294)),
              children: [
                {
                  path: "",
                  component: () =>
                    Promise.all([n.e(736), n.e(64), n.e(620)]).then(
                      n.bind(n, 8620)
                    ),
                },
              ],
            },
            {
              path: "/students",
              component: () =>
                Promise.all([n.e(736), n.e(64), n.e(294)]).then(n.bind(n, 294)),
              children: [
                {
                  path: "",
                  component: () =>
                    Promise.all([n.e(736), n.e(64), n.e(338)]).then(
                      n.bind(n, 2338)
                    ),
                },
                {
                  path: ":id",
                  component: () =>
                    Promise.all([n.e(736), n.e(64), n.e(380)]).then(
                      n.bind(n, 380)
                    ),
                  children: [
                    {
                      path: "",
                      component: () =>
                        Promise.all([n.e(736), n.e(565)]).then(n.bind(n, 2565)),
                    },
                    {
                      path: "report",
                      component: () =>
                        Promise.all([n.e(736), n.e(120)]).then(n.bind(n, 2120)),
                    },
                  ],
                },
              ],
            },
            {
              path: "/teachers",
              component: () =>
                Promise.all([n.e(736), n.e(64), n.e(294)]).then(n.bind(n, 294)),
              children: [
                {
                  path: "",
                  component: () =>
                    Promise.all([n.e(736), n.e(64), n.e(855)]).then(
                      n.bind(n, 1855)
                    ),
                },
                {
                  path: ":id",
                  component: () =>
                    Promise.all([n.e(736), n.e(64), n.e(492)]).then(
                      n.bind(n, 3492)
                    ),
                },
              ],
            },
            {
              path: "/class-rooms",
              component: () =>
                Promise.all([n.e(736), n.e(64), n.e(294)]).then(n.bind(n, 294)),
              children: [
                {
                  path: "",
                  component: () =>
                    Promise.all([n.e(736), n.e(64), n.e(395)]).then(
                      n.bind(n, 6395)
                    ),
                },
                {
                  path: ":id",
                  component: () =>
                    Promise.all([n.e(736), n.e(64), n.e(18)]).then(
                      n.bind(n, 2018)
                    ),
                },
              ],
            },
            {
              path: "/subjects",
              component: () =>
                Promise.all([n.e(736), n.e(64), n.e(294)]).then(n.bind(n, 294)),
              children: [
                {
                  path: "",
                  component: () =>
                    Promise.all([n.e(736), n.e(64), n.e(820)]).then(
                      n.bind(n, 1820)
                    ),
                },
                {
                  path: ":id",
                  component: () =>
                    Promise.all([n.e(736), n.e(64), n.e(451)]).then(
                      n.bind(n, 3451)
                    ),
                },
              ],
            },
            {
              path: "/levels",
              component: () =>
                Promise.all([n.e(736), n.e(64), n.e(294)]).then(n.bind(n, 294)),
              children: [
                {
                  path: "",
                  component: () =>
                    Promise.all([n.e(736), n.e(64), n.e(9)]).then(
                      n.bind(n, 2009)
                    ),
                },
                {
                  path: ":id",
                  component: () =>
                    Promise.all([n.e(736), n.e(64), n.e(352)]).then(
                      n.bind(n, 6352)
                    ),
                },
              ],
            },
            {
              path: "/grading-systems",
              component: () =>
                Promise.all([n.e(736), n.e(64), n.e(294)]).then(n.bind(n, 294)),
              children: [
                {
                  path: "",
                  component: () =>
                    Promise.all([n.e(736), n.e(64), n.e(850)]).then(
                      n.bind(n, 4850)
                    ),
                },
                {
                  path: ":id",
                  component: () =>
                    Promise.all([n.e(736), n.e(64), n.e(653)]).then(
                      n.bind(n, 3653)
                    ),
                },
              ],
            },
            {
              path: "/assessments",
              component: () =>
                Promise.all([n.e(736), n.e(64), n.e(294)]).then(n.bind(n, 294)),
              children: [
                {
                  path: "",
                  component: () =>
                    Promise.all([n.e(736), n.e(64), n.e(485)]).then(
                      n.bind(n, 5485)
                    ),
                },
                {
                  path: ":id",
                  component: () =>
                    Promise.all([n.e(736), n.e(64), n.e(597)]).then(
                      n.bind(n, 597)
                    ),
                  children: [
                    {
                      path: "",
                      component: () =>
                        Promise.all([n.e(736), n.e(913)]).then(n.bind(n, 9913)),
                    },
                    {
                      path: "scores",
                      component: () =>
                        Promise.all([n.e(736), n.e(710)]).then(n.bind(n, 5710)),
                    },
                  ],
                },
              ],
            },
            {
              path: "/:catchAll(.*)*",
              component: () =>
                Promise.all([n.e(736), n.e(862)]).then(n.bind(n, 1862)),
            },
          ],
          b = f,
          v = (0, u.BC)(function () {
            const e = m.PO,
              t = (0, m.p7)({
                scrollBehavior: () => ({ left: 0, top: 0 }),
                routes: b,
                history: e("/"),
              });
            return t;
          });
        async function g(e, t) {
          const r = e(p);
          r.use(o.Z, t);
          const i =
              "function" === typeof h["default"]
                ? await (0, h["default"])({})
                : h["default"],
            { storeKey: l } = await Promise.resolve().then(n.bind(n, 1502)),
            s = (0, a.Xl)("function" === typeof v ? await v({ store: i }) : v);
          return (i.$router = s), { app: r, store: i, storeKey: l, router: s };
        }
        const P = { config: {} },
          y = "/";
        async function w({ app: e, router: t, store: n, storeKey: r }, o) {
          let a = !1;
          const i = (e) => {
              try {
                return t.resolve(e).href;
              } catch (n) {}
              return Object(e) === e ? null : e;
            },
            l = (e) => {
              if (((a = !0), "string" === typeof e && /^https?:\/\//.test(e)))
                return void (window.location.href = e);
              const t = i(e);
              null !== t && (window.location.href = t);
            },
            s = window.location.href.replace(window.location.origin, "");
          for (let d = 0; !1 === a && d < o.length; d++)
            try {
              await o[d]({
                app: e,
                router: t,
                store: n,
                ssrContext: null,
                redirect: l,
                urlPath: s,
                publicPath: y,
              });
            } catch (c) {
              return c && c.url
                ? void l(c.url)
                : void console.error("[Quasar] boot error:", c);
            }
          !0 !== a && (e.use(t), e.use(n, r), e.mount("#q-app"));
        }
        g(r.ri, P).then((e) =>
          Promise.all([
            Promise.resolve().then(n.bind(n, 5499)),
            Promise.resolve().then(n.bind(n, 1569)),
          ]).then((t) => {
            const n = t
              .map((e) => e.default)
              .filter((e) => "function" === typeof e);
            w(e, n);
          })
        );
      },
      1569: (e, t, n) => {
        n.r(t), n.d(t, { api: () => l, default: () => s });
        var r = n(3340),
          o = n(9981),
          a = n.n(o),
          i = "https://wex-erp.herokuapp.com/api";
        const l = a().create({ baseURL: i }),
          s = (0, r.xr)(({ app: e }) => {
            (e.config.globalProperties.$axios = a()),
              (e.config.globalProperties.$api = l);
          });
      },
      5499: (e, t, n) => {
        n.r(t), n.d(t, { default: () => r });
        const r = ({ app: e, router: t, store: n }) => {
          e.config.globalProperties.$alert = (e, t, r, o) => {
            (n.state.msgDialogTitle = e),
              (n.state.msgDialogMsg = t),
              (n.state.action = { text: r, url: o }),
              (n.state.showMsgDialog = !0);
          };
        };
      },
      1502: (e, t, n) => {
        n.r(t), n.d(t, { default: () => a });
        var r = n(3340),
          o = n(3100);
        const a = (0, r.h)(function () {
          const e = (0, o.MT)({ modules: {}, strict: !1 });
          return e;
        });
      },
    },
    t = {};
  function n(r) {
    var o = t[r];
    if (void 0 !== o) return o.exports;
    var a = (t[r] = { exports: {} });
    return e[r](a, a.exports, n), a.exports;
  }
  (n.m = e),
    (() => {
      var e = [];
      n.O = (t, r, o, a) => {
        if (!r) {
          var i = 1 / 0;
          for (d = 0; d < e.length; d++) {
            for (var [r, o, a] = e[d], l = !0, s = 0; s < r.length; s++)
              (!1 & a || i >= a) && Object.keys(n.O).every((e) => n.O[e](r[s]))
                ? r.splice(s--, 1)
                : ((l = !1), a < i && (i = a));
            if (l) {
              e.splice(d--, 1);
              var c = o();
              void 0 !== c && (t = c);
            }
          }
          return t;
        }
        a = a || 0;
        for (var d = e.length; d > 0 && e[d - 1][2] > a; d--) e[d] = e[d - 1];
        e[d] = [r, o, a];
      };
    })(),
    (() => {
      n.n = (e) => {
        var t = e && e.__esModule ? () => e["default"] : () => e;
        return n.d(t, { a: t }), t;
      };
    })(),
    (() => {
      n.d = (e, t) => {
        for (var r in t)
          n.o(t, r) &&
            !n.o(e, r) &&
            Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
      };
    })(),
    (() => {
      (n.f = {}),
        (n.e = (e) =>
          Promise.all(
            Object.keys(n.f).reduce((t, r) => (n.f[r](e, t), t), [])
          ));
    })(),
    (() => {
      n.u = (e) =>
        "js/" +
        (64 === e ? "chunk-common" : e) +
        "." +
        {
          9: "5518cfcf",
          18: "0325b35b",
          64: "4c808afc",
          120: "c3f0adf8",
          294: "6aeab5cb",
          338: "d0dc80a8",
          352: "04a2820f",
          380: "762c1a73",
          395: "e4907877",
          451: "35dbedc8",
          485: "5637cfa1",
          492: "ace8c600",
          565: "8f9cf8eb",
          597: "6e381be9",
          620: "ec0397f3",
          653: "c3fd27fc",
          710: "08b6b56a",
          820: "988d5d54",
          850: "48f8a6eb",
          855: "53f100fa",
          862: "e0dd6166",
          913: "6501a272",
        }[e] +
        ".js";
    })(),
    (() => {
      n.miniCssF = (e) =>
        "css/" +
        ({ 143: "app", 736: "vendor" }[e] || e) +
        "." +
        { 143: "31d6cfe0", 294: "138556aa", 736: "1f07aff2" }[e] +
        ".css";
    })(),
    (() => {
      n.g = (function () {
        if ("object" === typeof globalThis) return globalThis;
        try {
          return this || new Function("return this")();
        } catch (e) {
          if ("object" === typeof window) return window;
        }
      })();
    })(),
    (() => {
      n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
    })(),
    (() => {
      var e = {},
        t = "wex-results:";
      n.l = (r, o, a, i) => {
        if (e[r]) e[r].push(o);
        else {
          var l, s;
          if (void 0 !== a)
            for (
              var c = document.getElementsByTagName("script"), d = 0;
              d < c.length;
              d++
            ) {
              var p = c[d];
              if (
                p.getAttribute("src") == r ||
                p.getAttribute("data-webpack") == t + a
              ) {
                l = p;
                break;
              }
            }
          l ||
            ((s = !0),
            (l = document.createElement("script")),
            (l.charset = "utf-8"),
            (l.timeout = 120),
            n.nc && l.setAttribute("nonce", n.nc),
            l.setAttribute("data-webpack", t + a),
            (l.src = r)),
            (e[r] = [o]);
          var h = (t, n) => {
              (l.onerror = l.onload = null), clearTimeout(u);
              var o = e[r];
              if (
                (delete e[r],
                l.parentNode && l.parentNode.removeChild(l),
                o && o.forEach((e) => e(n)),
                t)
              )
                return t(n);
            },
            u = setTimeout(
              h.bind(null, void 0, { type: "timeout", target: l }),
              12e4
            );
          (l.onerror = h.bind(null, l.onerror)),
            (l.onload = h.bind(null, l.onload)),
            s && document.head.appendChild(l);
        }
      };
    })(),
    (() => {
      n.r = (e) => {
        "undefined" !== typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      };
    })(),
    (() => {
      n.p = "/";
    })(),
    (() => {
      var e = (e, t, n, r) => {
          var o = document.createElement("link");
          (o.rel = "stylesheet"), (o.type = "text/css");
          var a = (a) => {
            if (((o.onerror = o.onload = null), "load" === a.type)) n();
            else {
              var i = a && ("load" === a.type ? "missing" : a.type),
                l = (a && a.target && a.target.href) || t,
                s = new Error(
                  "Loading CSS chunk " + e + " failed.\n(" + l + ")"
                );
              (s.code = "CSS_CHUNK_LOAD_FAILED"),
                (s.type = i),
                (s.request = l),
                o.parentNode.removeChild(o),
                r(s);
            }
          };
          return (
            (o.onerror = o.onload = a),
            (o.href = t),
            document.head.appendChild(o),
            o
          );
        },
        t = (e, t) => {
          for (
            var n = document.getElementsByTagName("link"), r = 0;
            r < n.length;
            r++
          ) {
            var o = n[r],
              a = o.getAttribute("data-href") || o.getAttribute("href");
            if ("stylesheet" === o.rel && (a === e || a === t)) return o;
          }
          var i = document.getElementsByTagName("style");
          for (r = 0; r < i.length; r++) {
            (o = i[r]), (a = o.getAttribute("data-href"));
            if (a === e || a === t) return o;
          }
        },
        r = (r) =>
          new Promise((o, a) => {
            var i = n.miniCssF(r),
              l = n.p + i;
            if (t(i, l)) return o();
            e(r, l, o, a);
          }),
        o = { 143: 0 };
      n.f.miniCss = (e, t) => {
        var n = { 294: 1 };
        o[e]
          ? t.push(o[e])
          : 0 !== o[e] &&
            n[e] &&
            t.push(
              (o[e] = r(e).then(
                () => {
                  o[e] = 0;
                },
                (t) => {
                  throw (delete o[e], t);
                }
              ))
            );
      };
    })(),
    (() => {
      var e = { 143: 0 };
      (n.f.j = (t, r) => {
        var o = n.o(e, t) ? e[t] : void 0;
        if (0 !== o)
          if (o) r.push(o[2]);
          else {
            var a = new Promise((n, r) => (o = e[t] = [n, r]));
            r.push((o[2] = a));
            var i = n.p + n.u(t),
              l = new Error(),
              s = (r) => {
                if (n.o(e, t) && ((o = e[t]), 0 !== o && (e[t] = void 0), o)) {
                  var a = r && ("load" === r.type ? "missing" : r.type),
                    i = r && r.target && r.target.src;
                  (l.message =
                    "Loading chunk " + t + " failed.\n(" + a + ": " + i + ")"),
                    (l.name = "ChunkLoadError"),
                    (l.type = a),
                    (l.request = i),
                    o[1](l);
                }
              };
            n.l(i, s, "chunk-" + t, t);
          }
      }),
        (n.O.j = (t) => 0 === e[t]);
      var t = (t, r) => {
          var o,
            a,
            [i, l, s] = r,
            c = 0;
          if (i.some((t) => 0 !== e[t])) {
            for (o in l) n.o(l, o) && (n.m[o] = l[o]);
            if (s) var d = s(n);
          }
          for (t && t(r); c < i.length; c++)
            (a = i[c]), n.o(e, a) && e[a] && e[a][0](), (e[a] = 0);
          return n.O(d);
        },
        r = (self["webpackChunkwex_results"] =
          self["webpackChunkwex_results"] || []);
      r.forEach(t.bind(null, 0)), (r.push = t.bind(null, r.push.bind(r)));
    })();
  var r = n.O(void 0, [736], () => n(4647));
  r = n.O(r);
})();
