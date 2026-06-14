import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { L as Logo } from "./Logo-C2Ak9cel.mjs";
import { n as naira } from "./format-BZgr6J6c.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { A as ArrowLeft, D as Download, t as Wallet, n as Star, c as Search, B as Bike } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const DATA = [{
  date: "2026-05-25",
  ref: "CC-7F3A",
  vendor: "Mama Titi's Kitchen",
  zone: "2000 Chalets",
  distance: "1.2 km",
  base: 450,
  bonus: 150,
  rating: 5
}, {
  date: "2026-05-25",
  ref: "CC-8A12",
  vendor: "Canaan Land Bakery",
  zone: "Estate 12",
  distance: "1.8 km",
  base: 550,
  bonus: 200,
  rating: 5
}, {
  date: "2026-05-25",
  ref: "CC-9C45",
  vendor: "Mimi's Naija Kitchen",
  zone: "Mission House",
  distance: "950 m",
  base: 400,
  bonus: 100,
  rating: 4
}, {
  date: "2026-05-24",
  ref: "CC-5C77",
  vendor: "Shalom Restaurant",
  zone: "Canaan Land",
  distance: "2.1 km",
  base: 600,
  bonus: 250,
  rating: 5
}, {
  date: "2026-05-24",
  ref: "CC-4B23",
  vendor: "Delta Kitchen",
  zone: "Main Gate",
  distance: "2.4 km",
  base: 650,
  bonus: 300,
  rating: 5
}, {
  date: "2026-05-24",
  ref: "CC-3A88",
  vendor: "Calvary Kitchen",
  zone: "Emmanuel Park",
  distance: "750 m",
  base: 400,
  bonus: 100,
  rating: 4
}, {
  date: "2026-05-23",
  ref: "CC-2B14",
  vendor: "Grace Table Cafe",
  zone: "White House",
  distance: "1.1 km",
  base: 450,
  bonus: 150,
  rating: 5
}, {
  date: "2026-05-23",
  ref: "CC-1F90",
  vendor: "Glory Shawarma",
  zone: "RECTEM",
  distance: "2.6 km",
  base: 700,
  bonus: 350,
  rating: 5
}];
function RiderTransactions() {
  const [q, setQ] = reactExports.useState("");
  const rows = reactExports.useMemo(() => DATA.filter((t) => {
    if (!q.trim()) return true;
    const s = q.toLowerCase();
    return t.vendor.toLowerCase().includes(s) || t.ref.toLowerCase().includes(s) || t.zone.toLowerCase().includes(s);
  }), [q]);
  const weekTotal = DATA.reduce((s, t) => s + t.base + t.bonus, 0);
  const monthTotal = weekTotal * 4 + 3200;
  const avgRating = (DATA.reduce((s, t) => s + t.rating, 0) / DATA.length).toFixed(1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-30 bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/rider/dashboard", className: "grid place-items-center h-9 w-9 rounded-full hover:bg-muted text-body", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 20 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {})
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => toast.info("Export — coming soon"), className: "inline-flex items-center gap-2 px-3 h-9 rounded-full bg-muted text-muted-foreground text-sm font-semibold cursor-not-allowed", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 15 }),
        " Export ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] bg-gold-light text-gold px-1.5 py-0.5 rounded-full font-bold", children: "SOON" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-6xl px-4 py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-dark", children: "Earnings History" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Brother Emmanuel Adeyemi · RC-2024-04821" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-3 grid-cols-2 lg:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "text-gold" }), label: "This week", value: naira(weekTotal) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "text-brand" }), label: "This month", value: naira(monthTotal) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "text-gold" }), label: "Avg rating", value: `${avgRating} ★` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 16, className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search by vendor, reference, or zone…", className: "w-full h-11 pl-10 pr-4 rounded-xl bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 bg-card border border-border rounded-2xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/50 text-left text-xs uppercase tracking-wider text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-semibold", children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-semibold", children: "Reference" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-semibold", children: "Vendor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-semibold hidden md:table-cell", children: "Drop-off" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-semibold hidden sm:table-cell", children: "Distance" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-semibold text-right", children: "Base" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-semibold text-right hidden sm:table-cell", children: "Bonus" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-semibold text-right", children: "Earned" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          rows.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: `border-t border-border ${i % 2 ? "bg-background/40" : ""}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground whitespace-nowrap", children: t.date }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs", children: t.ref }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-dark", children: t.vendor }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden md:table-cell text-muted-foreground", children: t.zone }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden sm:table-cell text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bike, { size: 12 }),
              " ",
              t.distance
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right text-muted-foreground", children: naira(t.base) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right hidden sm:table-cell text-gold font-semibold", children: [
              "+",
              naira(t.bonus)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-bold text-dark whitespace-nowrap", children: naira(t.base + t.bonus) })
          ] }, t.ref)),
          rows.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 8, className: "px-4 py-10 text-center text-muted-foreground", children: "No trips match your search." }) })
        ] })
      ] }) }) })
    ] })
  ] });
}
function Stat({
  icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-9 w-9 rounded-xl bg-background grid place-items-center", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-2xl font-extrabold text-dark", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label })
  ] });
}
export {
  RiderTransactions as component
};
