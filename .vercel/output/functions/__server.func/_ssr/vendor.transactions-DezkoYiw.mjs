import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { L as Logo } from "./Logo-C2Ak9cel.mjs";
import { n as naira } from "./format-BZgr6J6c.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { A as ArrowLeft, D as Download, t as Wallet, u as Package, v as TrendingUp, c as Search } from "../_libs/lucide-react.mjs";
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
  customer: "Sister Funke",
  items: 3,
  total: 3950,
  zone: "2000 Chalets",
  status: "Completed"
}, {
  date: "2026-05-25",
  ref: "CC-8A12",
  customer: "Brother Tunde",
  items: 2,
  total: 2100,
  zone: "Youth Centre",
  status: "Completed"
}, {
  date: "2026-05-25",
  ref: "CC-6E91",
  customer: "Sister Adaeze",
  items: 1,
  total: 2e3,
  zone: "Estate 12",
  status: "Completed"
}, {
  date: "2026-05-24",
  ref: "CC-5C77",
  customer: "Brother Samuel",
  items: 3,
  total: 1600,
  zone: "Mission House",
  status: "Completed"
}, {
  date: "2026-05-24",
  ref: "CC-4B23",
  customer: "Sister Joy",
  items: 3,
  total: 750,
  zone: "Tree of Life",
  status: "Refunded"
}, {
  date: "2026-05-24",
  ref: "CC-3A88",
  customer: "Brother Paul",
  items: 2,
  total: 2850,
  zone: "Canaan Land",
  status: "Completed"
}, {
  date: "2026-05-23",
  ref: "CC-2B14",
  customer: "Sister Grace",
  items: 4,
  total: 4200,
  zone: "Prayer City",
  status: "Completed"
}, {
  date: "2026-05-23",
  ref: "CC-1F90",
  customer: "Brother Daniel",
  items: 1,
  total: 1800,
  zone: "The Pavilion",
  status: "Cancelled"
}, {
  date: "2026-05-23",
  ref: "CC-0E5C",
  customer: "Sister Mary",
  items: 2,
  total: 2400,
  zone: "Emmanuel Park",
  status: "Completed"
}, {
  date: "2026-05-22",
  ref: "CC-9D77",
  customer: "Brother John",
  items: 3,
  total: 3100,
  zone: "New Auditorium (Shimawa)",
  status: "Completed"
}];
const STATUS_CLS = {
  Completed: "bg-success/15 text-success",
  Cancelled: "bg-error/15 text-error",
  Refunded: "bg-amber/15 text-amber"
};
function VendorTransactions() {
  const [q, setQ] = reactExports.useState("");
  const [status, setStatus] = reactExports.useState("all");
  const rows = reactExports.useMemo(() => DATA.filter((t) => {
    if (status !== "all" && t.status !== status) return false;
    if (q.trim()) {
      const s = q.toLowerCase();
      if (!t.customer.toLowerCase().includes(s) && !t.ref.toLowerCase().includes(s) && !t.zone.toLowerCase().includes(s)) return false;
    }
    return true;
  }), [q, status]);
  const completed = DATA.filter((t) => t.status === "Completed");
  const gross = completed.reduce((s, t) => s + t.total, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-30 bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/vendor/dashboard", className: "grid place-items-center h-9 w-9 rounded-full hover:bg-muted text-body", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 20 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {})
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => toast.info("Export — coming soon"), className: "inline-flex items-center gap-2 px-3 h-9 rounded-full bg-muted text-muted-foreground text-sm font-semibold cursor-not-allowed", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 15 }),
        " Export ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] bg-gold-light text-gold px-1.5 py-0.5 rounded-full font-bold", children: "SOON" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-6xl px-4 py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-dark", children: "Transaction History" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Mama Titi's Kitchen · all orders" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-3 grid-cols-2 lg:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "text-gold" }), label: "Gross completed", value: naira(gross) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "text-brand" }), label: "Total orders", value: DATA.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "text-success" }), label: "Completion rate", value: "80%" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col sm:flex-row gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 16, className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search by reference, customer, or zone…", className: "w-full h-11 pl-10 pr-4 rounded-xl bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto scrollbar-none", children: ["all", "Completed", "Cancelled", "Refunded"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setStatus(s), className: `shrink-0 px-4 h-11 rounded-xl text-sm font-semibold border transition ${status === s ? "bg-brand text-white border-brand" : "bg-card border-border text-body hover:border-brand/40"}`, children: s === "all" ? "All" : s }, s)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 bg-card border border-border rounded-2xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/50 text-left text-xs uppercase tracking-wider text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-semibold", children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-semibold", children: "Reference" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-semibold", children: "Customer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-semibold hidden sm:table-cell", children: "Items" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-semibold hidden md:table-cell", children: "Zone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-semibold text-right", children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-semibold", children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          rows.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: `border-t border-border ${i % 2 ? "bg-background/40" : ""}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground whitespace-nowrap", children: t.date }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs", children: t.ref }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-dark", children: t.customer }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden sm:table-cell text-muted-foreground", children: t.items }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden md:table-cell text-muted-foreground", children: t.zone }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-bold text-dark whitespace-nowrap", children: naira(t.total) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold ${STATUS_CLS[t.status]}`, children: t.status }) })
          ] }, t.ref)),
          rows.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 7, className: "px-4 py-10 text-center text-muted-foreground", children: "No transactions match your filters." }) })
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
  VendorTransactions as component
};
