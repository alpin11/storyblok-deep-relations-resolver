import p, { forwardRef as d } from "react";
var P = Object.defineProperty, l = Object.getOwnPropertySymbols, u = Object.prototype.hasOwnProperty, y = Object.prototype.propertyIsEnumerable, f = (o, e, t) => e in o ? P(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t, g = (o, e) => {
  for (var t in e || (e = {}))
    u.call(e, t) && f(o, t, e[t]);
  if (l)
    for (var t of l(e))
      y.call(e, t) && f(o, t, e[t]);
  return o;
}, O = (o, e) => {
  var t = {};
  for (var r in o)
    u.call(o, r) && e.indexOf(r) < 0 && (t[r] = o[r]);
  if (o != null && l)
    for (var r of l(o))
      e.indexOf(r) < 0 && y.call(o, r) && (t[r] = o[r]);
  return t;
};
const k = d((o, e) => {
  var t = o, { blok: r } = t, a = O(t, ["blok"]);
  if (!r)
    return console.error("Please provide a 'blok' property to the StoryblokComponent"), /* @__PURE__ */ p.createElement("div", null, "Please provide a blok property to the StoryblokComponent");
  const n = C(r.component);
  return n ? /* @__PURE__ */ p.createElement(n, g({
    ref: e,
    blok: r
  }, a)) : /* @__PURE__ */ p.createElement("div", null);
});
k.displayName = "StoryblokComponent";
let w = null;
const h = () => (console.error("You can't use getStoryblokApi if you're not loading apiPlugin."), w);
let c = {};
const C = (o) => c[o] ? c[o] : (console.error(`Component ${o} doesn't exist.`), !1), S = async (o, e, t) => {
  for (const r of e) {
    const [a, n] = r.split("."), v = b(a, o);
    for (const i of v) {
      const s = i[n];
      Array.isArray(s) ? i[n] = await Promise.all(s.map(async (_) => await m(_))) : typeof s == "string" ? i[n] = await m(s) : typeof s == "object" && S(s, e);
    }
  }
  return o;
}, b = (o, e) => {
  const t = [];
  return e = e ?? {}, e.component === o && t.push(e), Object.values(e).forEach((r) => {
    typeof r == "object" && t.push(...b(o, r));
  }), t;
}, m = async (o, e) => {
  const t = h(), { data: r } = await t.get("cdn/stories", {
    ...e,
    by_uuids: o
  });
  return r.stories.length > 0 ? r.stories[0] : o;
};
export {
  S as resolveRelationsDeep
};
