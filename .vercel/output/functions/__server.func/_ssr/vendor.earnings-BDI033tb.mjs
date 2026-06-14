import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { L as Logo } from "./Logo-C2Ak9cel.mjs";
import { n as naira } from "./format-BZgr6J6c.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { A as ArrowLeft, D as Download, t as Wallet, z as CreditCard, v as TrendingUp, G as Calendar } from "../_libs/lucide-react.mjs";
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
  gross: 3950,
  commission: 316,
  net: 3634,
  method: "Transfer",
  settled: true
}, {
  date: "2026-05-25",
  ref: "CC-8A12",
  gross: 2100,
  commission: 168,
  net: 1932,
  method: "USSD",
  settled: true
}, {
  date: "2026-05-25",
  ref: "CC-6E91",
  gross: 2e3,
  commission: 160,
  net: 1840,
  method: "Card",
  settled: true
}, {
  date: "2026-05-24",
  ref: "CC-5C77",
  gross: 1600,
  commission: 128,
  net: 1472,
  method: "Cash",
  settled: true
}, {
  date: "2026-05-24",
  ref: "CC-4B23",
  gross: 750,
  commission: 60,
  net: 690,
  method: "USSD",
  settled: true
}, {
  date: "2026-05-24",
  ref: "CC-3A88",
  gross: 2850,
  commission: 228,
  net: 2622,
  method: "Transfer",
  settled: true
}, {
  date: "2026-05-23",
  ref: "CC-2B14",
  gross: 4200,
  commission: 336,
  net: 3864,
  method: "Card",
  settled: true
}, {
  date: "2026-05-23",
  ref: "CC-1F90",
  gross: 1800,
  commission: 144,
  net: 1656,
  method: "Transfer",
  settled: false
}, {
  date: "2026-05-23",
  ref: "CC-0E5C",
  gross: 2400,
  commission: 192,
  net: 2208,
  method: "USSD",
  settled: false
}, {
  date: "2026-05-22",
  ref: "CC-9D77",
  gross: 3100,
  commission: 248,
  net: 2852,
  method: "Card",
  settled: true
}];
function VendorEarnings() {
  const [period, setPeriod] = reactExports.useState("week");
  const rows = period === "week" ? DATA : DATA;
  const gross = rows.reduce((s, r) => s + r.gross, 0);
  const commission = rows.reduce((s, r) => s + r.commission, 0);
  const net = rows.reduce((s, r) => s + r.net, 0);
  const pending = rows.filter((r) => !r.settled).reduce((s, r) => s + r.net, 0);
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-dark", children: "Earnings History" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-0.5", children: "Mama Titi's Kitchen · audit trail" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["week", "month"].map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setPeriod(p), className: `tap px-4 h-9 rounded-full text-sm font-semibold border transition ${period === p ? "bg-brand text-white border-brand" : "bg-card border-border text-body"}`, children: p === "week" ? "This week" : "This month" }, p)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-3 grid-cols-2 lg:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "text-gold" }), label: "Gross revenue", value: naira(gross) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "text-error" }), label: "CampChow commission (8%)", value: naira(commission), sub: "deducted" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "text-success" }), label: "Net payout", value: naira(net) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "text-amber" }), label: "Pending settlement", value: naira(pending), sub: "next cycle" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 p-4 rounded-xl bg-brand-light border border-brand/20 flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 18, className: "text-brand mt-0.5 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-dark", children: [
            "Next settlement: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Tomorrow, 9:00 AM" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Settled directly to your GTBank account ending ****4821. Commission is deducted before transfer." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 bg-card border border-border rounded-2xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-semibold", children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-semibold", children: "Reference" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-semibold text-right", children: "Gross" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-semibold text-right hidden sm:table-cell", children: "Commission" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-semibold text-right", children: "Net" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-semibold hidden md:table-cell", children: "Method" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-semibold", children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: `border-t border-border ${i % 2 ? "bg-background/40" : ""}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground whitespace-nowrap", children: r.date }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs", children: r.ref }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right text-dark", children: naira(r.gross) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right text-error hidden sm:table-cell", children: [
            "-",
            naira(r.commission)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-bold text-dark", children: naira(r.net) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden md:table-cell text-muted-foreground", children: r.method }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold ${r.settled ? "bg-success/15 text-success" : "bg-amber/15 text-amber"}`, children: r.settled ? "Settled" : "Pending" }) })
        ] }, r.ref)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tfoot", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t-2 border-border bg-muted/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 2, className: "px-4 py-3 font-bold text-dark", children: "TOTAL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-bold text-dark", children: naira(gross) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-bold text-error hidden sm:table-cell", children: [
            "-",
            naira(commission)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-bold text-success", children: naira(net) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 2, className: "px-4 py-3" })
        ] }) })
      ] }) }) })
    ] })
  ] });
}
function SCard({
  icon,
  label,
  value,
  sub
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-9 w-9 rounded-xl bg-background grid place-items-center", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xl font-extrabold text-dark", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
    sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: sub })
  ] });
}
export {
  VendorEarnings as component
};
