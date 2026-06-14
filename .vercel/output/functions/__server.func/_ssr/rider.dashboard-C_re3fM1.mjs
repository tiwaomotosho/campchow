import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { L as Logo } from "./Logo-C2Ak9cel.mjs";
import { n as naira } from "./format-BZgr6J6c.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { N as History, r as LogOut, S as ShieldCheck, a1 as Trophy, n as Star, K as Flame, u as Package, V as CircleCheck, a2 as Target, t as Wallet, o as Clock, v as TrendingUp, a3 as Navigation, B as Bike, b as MapPin, _ as CircleX, P as Phone } from "../_libs/lucide-react.mjs";
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
const SEED = [{
  id: "1",
  ref: "CC-7F3A",
  vendor: "Mama Titi's Kitchen",
  pickup: "Youth Centre",
  dropoff: "2000 Chalets · Block 501–1000",
  customer: "Sister Funke",
  distance: "1.2 km",
  eta: "8 min",
  base: 450,
  bonus: 150,
  status: "available"
}, {
  id: "2",
  ref: "CC-8A12",
  vendor: "Bread of Life Bakery",
  pickup: "Old Auditorium",
  dropoff: "Estate 12 · Phase 2",
  customer: "Brother Tunde",
  distance: "1.8 km",
  eta: "12 min",
  base: 550,
  bonus: 200,
  status: "available"
}, {
  id: "3",
  ref: "CC-9C45",
  vendor: "Sister Bola's Rice",
  pickup: "Estate 12",
  dropoff: "Mission House · Reception",
  customer: "Sister Adaeze",
  distance: "950 m",
  eta: "6 min",
  base: 400,
  bonus: 100,
  status: "available"
}];
const DAILY_GOAL = 1e4;
function RiderDashboard() {
  const [online, setOnline] = reactExports.useState(true);
  const [deliveries, setDeliveries] = reactExports.useState(SEED);
  const [lastEarned, setLastEarned] = reactExports.useState(null);
  const [confirmCancel, setConfirmCancel] = reactExports.useState(false);
  const accept = (id) => {
    setDeliveries((prev) => prev.map((d) => d.id === id ? {
      ...d,
      status: "accepted"
    } : d));
    toast.success("Delivery accepted. Head to vendor for pickup.");
  };
  const advance = (id) => {
    setDeliveries((prev) => prev.map((d) => {
      if (d.id !== id) return d;
      const nx = d.status === "accepted" ? "picked-up" : "delivered";
      if (nx === "picked-up") toast.success("Marked as picked up. Navigate to drop-off.");
      else {
        toast.success("Delivery complete. Earnings added.");
        setLastEarned({
          ...d,
          status: "delivered"
        });
      }
      return {
        ...d,
        status: nx
      };
    }));
  };
  const cancelActive = () => {
    setDeliveries((prev) => prev.map((d) => d.status === "accepted" || d.status === "picked-up" ? {
      ...d,
      status: "available"
    } : d));
    setConfirmCancel(false);
    toast.error("Delivery cancelled", {
      description: "Re-offered to nearby riders. This may affect your acceptance rate."
    });
  };
  const earnedFromDeliveries = deliveries.filter((d) => d.status === "delivered").reduce((s, d) => s + d.base + d.bonus, 0);
  const earningsToday = earnedFromDeliveries + 4200;
  const completed = deliveries.filter((d) => d.status === "delivered").length + 7;
  const active = deliveries.find((d) => d.status === "accepted" || d.status === "picked-up");
  const available = deliveries.filter((d) => d.status === "available");
  const goalPct = Math.min(100, Math.round(earningsToday / DAILY_GOAL * 100));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-30 bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline-flex px-2 py-1 rounded-full bg-gold-light text-xs font-semibold text-gold", children: "Rider" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
          setOnline(!online);
          toast(online ? "You are now offline" : "You're online — looking for deliveries");
        }, className: `tap inline-flex items-center gap-2 px-3 h-9 rounded-full text-sm font-semibold border transition ${online ? "bg-success/15 text-success border-success/30" : "bg-muted text-muted-foreground border-border"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-2 w-2 rounded-full ${online ? "bg-success animate-pulse" : "bg-muted-foreground"}` }),
          online ? "Online" : "Offline"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/rider/transactions", className: "h-9 w-9 grid place-items-center rounded-full hover:bg-muted text-muted-foreground", "aria-label": "History", children: /* @__PURE__ */ jsxRuntimeExports.jsx(History, { size: 18 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "h-9 w-9 grid place-items-center rounded-full hover:bg-muted text-muted-foreground", "aria-label": "Logout", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 18 }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-6xl px-4 py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl p-5 text-white", style: {
        background: "linear-gradient(150deg, oklch(0.20 0.025 155), oklch(0.30 0.07 152))"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-2xl bg-white/15 grid place-items-center font-bold text-2xl text-white", children: "EA" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-success grid place-items-center ring-2 ring-[oklch(0.25_0.05_153)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 12, className: "text-white" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-white", children: "Brother Emmanuel Adeyemi" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold text-dark text-[11px] font-bold", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { size: 11 }),
                " Top 10%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-white/65 inline-flex items-center gap-2 mt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 13, className: "fill-gold text-gold" }),
                " 4.8"
              ] }),
              "· ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: "RC-2024-04821" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/45 mt-0.5", children: "Honda Bajaj · Red · KJA-482-EG" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 text-white text-xs font-semibold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { size: 12, className: "text-gold" }),
            " 5-day streak"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 text-white text-xs font-semibold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 12, className: "text-gold" }),
            " 143 lifetime"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 text-white text-xs font-semibold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 12, className: "text-gold" }),
            " 96% acceptance"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 bg-card border border-border rounded-2xl p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-dark inline-flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { size: 17, className: "text-brand" }),
            " Today's earnings goal"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-muted-foreground", children: [
            naira(earningsToday),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground/60", children: [
              "/ ",
              naira(DAILY_GOAL)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 h-3 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-gradient-to-r from-brand to-brand-mid transition-all duration-700", style: {
          width: `${goalPct}%`
        } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-xs text-muted-foreground", children: [
          goalPct,
          "% there — ",
          naira(Math.max(0, DAILY_GOAL - earningsToday)),
          " to go. Keep riding!"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-3 grid-cols-2 lg:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "text-gold" }), label: "Earnings today", value: naira(earningsToday) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "text-brand" }), label: "Completed today", value: completed }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "text-blueish" }), label: "Online time", value: "3h 24m" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "text-success" }), label: "Per hour", value: naira(Math.round(earningsToday / 3.4)) })
      ] }),
      lastEarned && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 bg-success/10 border border-success/30 rounded-2xl p-5 animate-slide-up", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-dark inline-flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 17, className: "text-success" }),
          " Delivery complete · ",
          lastEarned.ref
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-1.5 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Base fare", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: naira(lastEarned.base) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Distance bonus", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: naira(lastEarned.bonus) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 mt-1 border-t border-success/30 flex justify-between font-bold text-dark", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "You earned" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-success", children: [
              "+",
              naira(lastEarned.base + lastEarned.bonus)
            ] })
          ] })
        ] })
      ] }),
      active && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2", children: "Active Delivery" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-brand text-primary-foreground rounded-2xl p-5 shadow-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs opacity-80", children: [
                "#",
                active.ref
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-lg", children: [
                active.vendor,
                " → ",
                active.customer
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider", children: active.status === "accepted" ? "Pickup" : "Delivering" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-3 rounded-xl bg-white/10 p-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { size: 16, className: "shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
              active.pickup,
              " → ",
              active.dropoff.split(" · ")[0]
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto inline-flex items-center gap-1 text-white/80", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bike, { size: 13 }),
              " ",
              active.distance,
              " · ",
              active.eta
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid gap-3 sm:grid-cols-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 16, className: "mt-0.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "opacity-80 text-xs", children: "Pickup" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: active.pickup })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 16, className: "mt-0.5 shrink-0 text-gold" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "opacity-80 text-xs", children: "Drop-off" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: active.dropoff })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t border-white/20 flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-extrabold text-xl", children: [
              "+",
              naira(active.base + active.bonus)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setConfirmCancel(true), className: "tap h-10 w-10 grid place-items-center rounded-full bg-white/15 hover:bg-white/25", "aria-label": "Cancel delivery", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 17 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => toast.info("Connecting via masked number…"), className: "tap h-10 w-10 grid place-items-center rounded-full bg-white/15 hover:bg-white/25", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 16 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => advance(active.id), className: "tap px-5 h-10 rounded-full bg-white text-brand font-bold hover:bg-white/90 transition", children: active.status === "accepted" ? "Confirm Pickup" : "Mark Delivered" })
            ] })
          ] }),
          confirmCancel && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between gap-2 rounded-xl bg-white/10 p-3 animate-fade-in", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-white", children: "Cancel this delivery?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setConfirmCancel(false), className: "tap px-3 h-9 rounded-full bg-white/15 text-white text-sm font-semibold", children: "Keep" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: cancelActive, className: "tap px-4 h-9 rounded-full bg-white text-error text-sm font-bold", children: "Yes, cancel" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground", children: "Available Deliveries" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            available.length,
            " near you"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid gap-3 lg:grid-cols-2", children: [
          available.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs text-muted-foreground", children: [
                  "#",
                  d.ref
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-dark", children: d.vendor })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-extrabold text-lg text-gold", children: [
                  "+",
                  naira(d.base + d.bonus)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
                  "incl. ",
                  naira(d.bonus),
                  " bonus"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-2 rounded-xl bg-background border border-border p-2.5 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { size: 14, className: "text-brand shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-body truncate", children: [
                d.pickup,
                " → ",
                d.dropoff.split(" · ")[0]
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-xs text-muted-foreground inline-flex items-center gap-1 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Bike, { size: 12 }),
                " ",
                d.distance,
                " · ",
                d.eta
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex items-center justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => accept(d.id), disabled: !!active, className: "tap px-5 h-9 rounded-full bg-brand text-primary-foreground font-semibold hover:bg-brand-mid disabled:opacity-40 disabled:cursor-not-allowed", children: "Accept" }) })
          ] }, d.id)),
          available.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "col-span-full text-center py-10 text-muted-foreground bg-card rounded-2xl border border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mx-auto text-success mb-2" }),
            " No new deliveries right now. Sit tight."
          ] })
        ] })
      ] })
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
function Row({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-body", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: label }),
    children
  ] });
}
export {
  RiderDashboard as component
};
