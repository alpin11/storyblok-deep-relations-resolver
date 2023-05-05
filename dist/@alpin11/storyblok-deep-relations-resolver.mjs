const h = async (s, o, t, e, r) => {
  for (const p of t) {
    const [y, c] = p.split("."), l = a(y, o);
    for (const f of l) {
      const n = f[c];
      Array.isArray(n) ? f[c] = await Promise.all(n.map(async (u) => await i(s, u))) : typeof n == "string" ? f[c] = await i(s, n, e, r) : typeof n == "object" && h(s, n, t);
    }
  }
  return o;
}, a = (s, o) => {
  const t = [];
  return o = o ?? {}, o.component === s && t.push(o), Object.values(o).forEach((e) => {
    typeof e == "object" && t.push(...a(s, e));
  }), t;
}, i = async (s, o, t, e) => {
  if (e)
    return e(o, t);
  const { data: r } = await s.get("cdn/stories", {
    ...t,
    by_uuids: o
  });
  return r.stories.at(0) ?? o;
};
export {
  h as resolveRelationsDeep
};
