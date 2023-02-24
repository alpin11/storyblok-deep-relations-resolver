import p, { forwardRef as P } from "react";
var d = Object.defineProperty, l = Object.getOwnPropertySymbols, u = Object.prototype.hasOwnProperty, y = Object.prototype.propertyIsEnumerable, f = (o, e, r) => e in o ? d(o, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : o[e] = r, g = (o, e) => {
  for (var r in e || (e = {}))
    u.call(e, r) && f(o, r, e[r]);
  if (l)
    for (var r of l(e))
      y.call(e, r) && f(o, r, e[r]);
  return o;
}, O = (o, e) => {
  var r = {};
  for (var t in o)
    u.call(o, t) && e.indexOf(t) < 0 && (r[t] = o[t]);
  if (o != null && l)
    for (var t of l(o))
      e.indexOf(t) < 0 && y.call(o, t) && (r[t] = o[t]);
  return r;
};
const k = P((o, e) => {
  var r = o, { blok: t } = r, a = O(r, ["blok"]);
  if (!t)
    return console.error("Please provide a 'blok' property to the StoryblokComponent"), /* @__PURE__ */ p.createElement("div", null, "Please provide a blok property to the StoryblokComponent");
  const n = C(t.component);
  return n ? /* @__PURE__ */ p.createElement(n, g({
    ref: e,
    blok: t
  }, a)) : /* @__PURE__ */ p.createElement("div", null);
});
k.displayName = "StoryblokComponent";
let w = null;
const h = () => (console.error("You can't use getStoryblokApi if you're not loading apiPlugin."), w);
let c = {};
const C = (o) => c[o] ? c[o] : (console.error(`Component ${o} doesn't exist.`), !1), S = async (o, e, r) => {
  for (const t of e) {
    const [a, n] = t.split("."), v = b(a, o);
    for (const i of v) {
      const s = i[n];
      Array.isArray(s) ? i[n] = await Promise.all(s.map(async (_) => await m(_))) : typeof s == "string" ? i[n] = await m(s) : typeof s == "object" && S(s, e);
    }
  }
  return o;
}, b = (o, e) => {
  const r = [];
  return e = e ?? {}, e.component === o && r.push(e), Object.values(e).forEach((t) => {
    typeof t == "object" && r.push(...b(o, t));
  }), r;
}, m = async (o, e) => {
  const r = h(), { data: t } = await r.get("cdn/stories", {
    ...e,
    by_uuids: o
  });
  return t.stories.length > 0 ? t.stories[0] : o;
};
export {
  S as resolveRelationsDeep
};
