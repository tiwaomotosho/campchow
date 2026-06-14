import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { T as TopNav } from "./TopNav-D1fXHo1t.mjs";
import { F as Footer } from "./Footer-D5DOucoK.mjs";
import { V as VENDORS, Z as ZONES, C as CATEGORIES } from "./router-0qYA4BIB.mjs";
import { S as SmartImage } from "./SmartImage-vBHlgh6y.mjs";
import { n as naira } from "./format-BZgr6J6c.mjs";
import "../_libs/sonner.mjs";
import { c as Search, Z as Zap, b as MapPin, m as ShoppingBag, n as Star, o as Clock } from "../_libs/lucide-react.mjs";
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
import "./Logo-C2Ak9cel.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
const matchCategory = (v, cat) => {
  if (cat === "All") return true;
  return v.category.toLowerCase().includes(cat.toLowerCase().split(" ")[0]);
};
function VendorCard({
  v,
  index
}) {
  const enterClass = `card-enter-${Math.min(index + 1, 10)}`;
  const hasOffer = v.open && v.rating >= 4.6;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/home/vendor/$id", params: {
    id: v.id
  }, className: `group bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${!v.open ? "opacity-60" : ""} ${enterClass}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-40 bg-muted overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SmartImage, { src: v.cover, fallbackSrc: v.coverFallback, alt: v.name, seed: v.name, className: "absolute inset-0", imgClassName: "group-hover:scale-105 transition-transform duration-500 ease-out" }),
      hasOffer && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-gold text-dark text-[10px] font-extrabold uppercase tracking-wide shadow", children: "10% off · CAMP10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur ${v.open ? "bg-card/90 text-success" : "bg-muted/80 text-muted-foreground"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-1.5 w-1.5 rounded-full ${v.open ? "bg-success" : "bg-muted-foreground"}` }),
        v.open ? "Open" : "Closed"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute bottom-3 left-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-success text-white text-xs font-bold shadow", children: [
        v.rating,
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 10, className: "fill-white text-white" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/55 backdrop-blur text-white text-[10px] font-semibold", children: v.zone }),
      !v.open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/40" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-dark leading-tight", children: v.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground shrink-0 mt-0.5", children: [
          "(",
          v.reviews,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: v.category }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 12 }),
          " ",
          v.distance
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 12 }),
          " ",
          v.open ? v.eta : "Closed"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Min ",
          naira(v.min)
        ] })
      ] })
    ] })
  ] });
}
function Home() {
  const [query, setQuery] = reactExports.useState("");
  const [zone, setZone] = reactExports.useState("All Zones");
  const [cat, setCat] = reactExports.useState("All");
  const filtered = reactExports.useMemo(() => {
    return VENDORS.filter((v) => {
      if (zone !== "All Zones" && v.zone !== zone) return false;
      if (!matchCategory(v, cat)) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const hay = v.searchable ?? `${v.name} ${v.category}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [query, zone, cat]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TopNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-6xl px-4 pb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "pt-8 pb-4 animate-fade-up", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-extrabold tracking-tight text-dark", children: "Food. Delivered Anywhere on the Camp." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground max-w-xl", children: "Order from your favourite vendors and get it delivered to your zone." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative animate-fade-up-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 18, className: "absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search vendors or dishes...", className: "w-full h-12 pl-11 pr-4 rounded-xl bg-card border border-border text-[15px] focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-start gap-3 p-4 rounded-xl bg-gold-light border border-gold/30 animate-fade-up-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid place-items-center h-9 w-9 rounded-lg bg-gold/15 text-gold shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 18, strokeWidth: 1.75, className: "animate-pulse" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-dark", children: "Peak Programme Mode Active" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Higher demand expected. Order early for faster delivery." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between gap-3 p-3 rounded-xl bg-card border border-border animate-fade-up-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-body", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 16, className: "text-brand shrink-0" }),
          "Showing vendors near you —",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "font-semibold", children: "Youth Centre Area" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "text-sm font-semibold text-brand hover:underline shrink-0", children: "Change" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 animate-fade-up-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2", children: "Zones" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto scrollbar-none -mx-4 px-4", children: ZONES.map((z) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setZone(z), className: `shrink-0 px-4 h-9 rounded-full border text-sm font-medium transition-all ${zone === z ? "bg-brand text-primary-foreground border-brand shadow-sm" : "bg-card border-border text-body hover:border-brand/40"}`, children: z }, z)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 animate-fade-up-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2", children: "Categories" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto scrollbar-none -mx-4 px-4", children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCat(c), className: `shrink-0 px-4 h-9 rounded-full border text-sm font-medium transition-all ${cat === c ? "bg-gold text-white border-gold shadow-sm" : "bg-card border-border text-body hover:border-gold/40"}`, children: c }, c)) })
      ] }),
      (zone !== "All Zones" || cat !== "All" || query) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-5 text-sm text-muted-foreground animate-fade-in", children: [
        filtered.length,
        " vendor",
        filtered.length !== 1 ? "s" : "",
        " found",
        zone !== "All Zones" ? ` in ${zone}` : "",
        cat !== "All" ? ` · ${cat}` : ""
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: filtered.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(VendorCard, { v, index: i }, v.id)) }),
      filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 text-center py-16 bg-card rounded-2xl border border-border animate-fade-in", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto h-16 w-16 rounded-full bg-brand-light grid place-items-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 26, className: "text-brand" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-dark", children: "No vendors match your filters" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Try a different zone or category." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          setZone("All Zones");
          setCat("All");
          setQuery("");
        }, className: "mt-4 px-5 h-10 rounded-full bg-brand text-primary-foreground text-sm font-semibold hover:bg-brand-mid transition", children: "Clear filters" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "how-it-works", className: "mt-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-dark text-center", children: "How It Works" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid gap-4 md:grid-cols-3", children: [{
          n: 1,
          t: "Browse & build",
          d: "Browse vendors sorted by proximity and build your order from the freshest dishes."
        }, {
          n: 2,
          t: "Choose your zone",
          d: "Select your camp zone, area, and pickup point — no street address needed."
        }, {
          n: 3,
          t: "Rider delivers",
          d: "A verified camp rider with a confirmed estate ID brings it straight to you."
        }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-6 rounded-2xl bg-card border border-border card-enter-${s.n}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full bg-brand text-primary-foreground grid place-items-center font-bold text-lg", children: s.n }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 font-bold text-dark", children: s.t }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: s.d })
        ] }, s.n)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  Home as component
};
