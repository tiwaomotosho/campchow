import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { L as Logo } from "./Logo-C2Ak9cel.mjs";
import { n as naira } from "./format-BZgr6J6c.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { r as LogOut, d as Store, S as ShieldCheck, n as Star, J as ArrowUpRight, K as Flame, N as History, t as Wallet, O as CalendarClock, Q as Bell, R as ChefHat, v as TrendingUp, V as CircleCheck, B as Bike, b as MapPin, o as Clock, _ as CircleX, j as MessageSquare, $ as CornerDownRight, a0 as Send } from "../_libs/lucide-react.mjs";
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
const now = Date.now();
const mins = (m) => now - m * 6e4;
const SEED = [{
  id: "1",
  ref: "CC-7F3A",
  customer: "Sister Funke",
  items: [{
    name: "Jollof Rice + Chicken",
    qty: 2
  }, {
    name: "Fried Plantain",
    qty: 1
  }],
  total: 3950,
  zone: "2000 Chalets · Block 501–1000",
  acceptedAt: mins(2),
  status: "new"
}, {
  id: "2",
  ref: "CC-8A12",
  customer: "Brother Tunde",
  items: [{
    name: "White Rice + Egusi",
    qty: 1
  }, {
    name: "Beef (3 pcs)",
    qty: 1
  }],
  total: 2100,
  zone: "Youth Centre · Main Building",
  acceptedAt: mins(8),
  status: "preparing"
}, {
  id: "3",
  ref: "CC-6E91",
  customer: "Sister Adaeze",
  items: [{
    name: "Fried Rice + Turkey",
    qty: 1
  }],
  total: 2e3,
  zone: "Estate 12 · Phase 2",
  acceptedAt: mins(13),
  status: "preparing"
}, {
  id: "4",
  ref: "CC-5C77",
  customer: "Brother Samuel",
  items: [{
    name: "Grilled Chicken (full)",
    qty: 1
  }, {
    name: "Coleslaw",
    qty: 2
  }],
  total: 1600,
  zone: "Mission House · Reception",
  acceptedAt: mins(20),
  status: "ready"
}, {
  id: "5",
  ref: "CC-4B23",
  customer: "Sister Joy",
  items: [{
    name: "Zobo (cup)",
    qty: 3
  }],
  total: 750,
  zone: "Tree of Life · Main Entrance",
  acceptedAt: mins(64),
  status: "completed"
}];
const STATUS_META = {
  new: {
    label: "New",
    cls: "bg-amber/15 text-amber",
    icon: Bell
  },
  preparing: {
    label: "Preparing",
    cls: "bg-blueish/15 text-blueish",
    icon: ChefHat
  },
  ready: {
    label: "Ready for Pickup",
    cls: "bg-purpleish/15 text-purpleish",
    icon: Bike
  },
  completed: {
    label: "Completed",
    cls: "bg-success/15 text-success",
    icon: CircleCheck
  }
};
const WEEK = [42e3, 58e3, 51e3, 67e3, 73e3, 61e3, 84500];
const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
function elapsed(fromTs) {
  const m = Math.max(0, Math.round((Date.now() - fromTs) / 6e4));
  return m < 1 ? "just now" : `${m} min`;
}
const SEED_REVIEWS = [{
  id: "v1",
  name: "Sister Funke",
  rating: 5,
  date: "May 25",
  comment: "The jollof was smoky and delicious, delivery came straight to my chalet. Excellent!"
}, {
  id: "v2",
  name: "Brother Tunde",
  rating: 4,
  date: "May 24",
  comment: "Very good portions and authentic taste. Will order again.",
  reply: "Thank you Brother Tunde! We appreciate you."
}, {
  id: "v3",
  name: "Sister Adaeze",
  rating: 5,
  date: "May 23",
  comment: "Best food on the camp. The fried rice was exceptional."
}, {
  id: "v4",
  name: "Brother Samuel",
  rating: 3,
  date: "May 22",
  comment: "Food was good but delivery took a little longer than expected during peak."
}];
function VendorDashboard() {
  const [orders, setOrders] = reactExports.useState(SEED);
  const [online, setOnline] = reactExports.useState(true);
  const [tab, setTab] = reactExports.useState("all");
  const [cancelId, setCancelId] = reactExports.useState(null);
  const [view, setView] = reactExports.useState("orders");
  const [reviews, setReviews] = reactExports.useState(SEED_REVIEWS);
  const [replyId, setReplyId] = reactExports.useState(null);
  const [replyText, setReplyText] = reactExports.useState("");
  const [, force] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const t = setInterval(() => force((n) => n + 1), 15e3);
    return () => clearInterval(t);
  }, []);
  const advance = (id) => {
    setOrders((prev) => prev.map((o) => {
      if (o.id !== id) return o;
      const next = {
        new: "preparing",
        preparing: "ready",
        ready: "completed",
        completed: "completed"
      };
      const nx = next[o.status];
      toast.success(`Order ${o.ref} → ${STATUS_META[nx].label}`);
      return {
        ...o,
        status: nx,
        acceptedAt: nx === "preparing" ? Date.now() : o.acceptedAt
      };
    }));
  };
  const cancelOrder = (id) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
    setCancelId(null);
    toast.error("Order cancelled", {
      description: "The customer has been notified and refunded."
    });
  };
  const submitReply = (id) => {
    if (!replyText.trim()) return;
    setReviews((prev) => prev.map((r) => r.id === id ? {
      ...r,
      reply: replyText.trim()
    } : r));
    setReplyId(null);
    setReplyText("");
    toast.success("Reply posted");
  };
  const reviewAvg = (reviews.reduce((s2, r) => s2 + r.rating, 0) / reviews.length).toFixed(1);
  const filtered = tab === "all" ? orders : orders.filter((o) => o.status === tab);
  const revenueToday = orders.reduce((s, o) => s + o.total, 0);
  const newCount = orders.filter((o) => o.status === "new").length;
  const prepCount = orders.filter((o) => o.status === "preparing").length;
  const weekTotal = WEEK.reduce((a, b) => a + b, 0);
  const maxBar = Math.max(...WEEK);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-30 bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline-flex px-2 py-1 rounded-full bg-muted text-xs font-semibold text-muted-foreground", children: "Vendor" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
          setOnline(!online);
          toast(online ? "You are now offline" : "You are now accepting orders");
        }, className: `tap inline-flex items-center gap-2 px-3 h-9 rounded-full text-sm font-semibold border transition ${online ? "bg-success/15 text-success border-success/30" : "bg-muted text-muted-foreground border-border"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-2 w-2 rounded-full ${online ? "bg-success animate-pulse" : "bg-muted-foreground"}` }),
          online ? "Online" : "Offline"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "h-9 w-9 grid place-items-center rounded-full hover:bg-muted text-muted-foreground", "aria-label": "Logout", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 18 }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-6xl px-4 py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-5 flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-14 w-14 rounded-2xl bg-brand-light text-brand grid place-items-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { size: 24, strokeWidth: 1.75 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-dark truncate", children: "Mama Titi's Kitchen" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/15 text-success text-[11px] font-bold shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 11 }),
              " Verified"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground inline-flex items-center gap-2 mt-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 13, className: "fill-gold text-gold" }),
              " 4.8"
            ] }),
            "· 312 reviews · Youth Centre Area"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-3 md:grid-cols-[1.4fr_1fr]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase font-semibold tracking-wider text-muted-foreground", children: "Revenue · this week" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-3xl font-extrabold text-dark", children: naira(weekTotal) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-success font-semibold inline-flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { size: 14 }),
                " +15% vs last week"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gold-light text-gold text-xs font-bold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { size: 12 }),
              " 5-day streak"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex items-end justify-between gap-2", style: {
            height: 120
          }, children: WEEK.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center justify-end gap-1.5 h-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] font-semibold text-muted-foreground", children: [
              Math.round(v / 1e3),
              "k"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-[26px] rounded-t-md bg-gradient-to-t from-brand to-brand-mid transition-all duration-700", style: {
              height: `${Math.max(8, Math.round(v / maxBar * 84))}px`
            }, title: naira(v) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: DAYS[i] })
          ] }, i)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/vendor/transactions", className: "inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(History, { size: 14 }),
              " Transactions"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/vendor/earnings", className: "inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:underline", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { size: 14 }),
              " Earnings history"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl p-5 text-white", style: {
          background: "linear-gradient(150deg, oklch(0.20 0.025 155), oklch(0.30 0.07 152))"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase font-semibold tracking-wider text-white/60 inline-flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { size: 13 }),
            " Next payout"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-3xl font-extrabold", children: naira(revenueToday) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/60 mt-0.5", children: "Pending settlement" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t border-white/15 flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, { size: 15, className: "text-gold" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white/80", children: [
              "Pays out ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-white", children: "tomorrow, 9:00 AM" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-white/45", children: "GTBank · ****4821 · auto-settlement" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 inline-flex p-1 rounded-full bg-muted", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setView("orders"), className: `px-5 h-9 rounded-full text-sm font-semibold transition ${view === "orders" ? "bg-card shadow-sm text-dark" : "text-muted-foreground"}`, children: "Orders" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setView("reviews"), className: `px-5 h-9 rounded-full text-sm font-semibold transition inline-flex items-center gap-1.5 ${view === "reviews" ? "bg-card shadow-sm text-dark" : "text-muted-foreground"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 14, className: "fill-gold text-gold" }),
          " Reviews"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-3 grid-cols-2 lg:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "text-amber" }), label: "New orders", value: newCount }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChefHat, { className: "text-blueish" }), label: "Preparing", value: prepCount }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "text-brand" }), label: "Orders today", value: orders.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "text-gold" }), label: "Earned today", value: naira(revenueToday) })
      ] }),
      view === "orders" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex gap-2 overflow-x-auto scrollbar-none", children: ["all", "new", "preparing", "ready", "completed"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTab(t), className: `shrink-0 px-4 h-9 rounded-full text-sm font-semibold border transition ${tab === t ? "bg-brand text-primary-foreground border-brand" : "bg-card border-border text-body hover:border-brand/40"}`, children: t === "all" ? "All orders" : STATUS_META[t].label }, t)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-3 lg:grid-cols-2", children: [
          filtered.map((o) => {
            const meta = STATUS_META[o.status];
            const Icon = meta.icon;
            const showTimer = o.status === "preparing" || o.status === "new";
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs text-muted-foreground", children: [
                    "#",
                    o.ref
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-dark", children: o.customer }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground inline-flex items-center gap-1 mt-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 12 }),
                    " ",
                    o.zone
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 ${meta.cls}`, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 12 }),
                  " ",
                  meta.label
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-1 text-sm text-body", children: o.items.map((it, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                  it.qty,
                  "×"
                ] }),
                " ",
                it.name
              ] }, idx)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 pt-4 border-t border-border", children: cancelId === o.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 animate-fade-in", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-error", children: "Cancel this order?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCancelId(null), className: "tap px-3 h-9 rounded-full bg-muted text-body text-sm font-semibold", children: "Keep" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => cancelOrder(o.id), className: "tap px-4 h-9 rounded-full bg-error text-white text-sm font-bold", children: "Yes, cancel" })
                ] })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-extrabold text-lg text-dark", children: naira(o.total) }),
                  showTimer && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 inline-flex items-center gap-1 text-xs font-semibold text-amber", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 12 }),
                    " ",
                    elapsed(o.acceptedAt)
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  (o.status === "new" || o.status === "preparing") && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCancelId(o.id), className: "tap h-9 w-9 grid place-items-center rounded-full bg-error/10 text-error hover:bg-error/20", "aria-label": "Cancel order", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 16 }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => toast.info("Opening chat…"), className: "tap h-9 w-9 grid place-items-center rounded-full bg-muted text-body hover:bg-muted/70", "aria-label": "Message", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { size: 15 }) }),
                  o.status !== "completed" && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => advance(o.id), className: "tap px-4 h-9 rounded-full bg-brand text-primary-foreground text-sm font-semibold hover:bg-brand-mid", children: [
                    o.status === "new" && "Accept",
                    o.status === "preparing" && "Mark Ready",
                    o.status === "ready" && "Mark Picked Up"
                  ] })
                ] })
              ] }) })
            ] }, o.id);
          }),
          filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "col-span-full text-center py-12 text-muted-foreground", children: "No orders in this view." })
        ] })
      ] }),
      view === "reviews" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "h-card text-dark", children: "Customer Reviews" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 14, className: "fill-gold text-gold" }),
            " ",
            reviewAvg,
            " · ",
            reviews.length,
            " reviews"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 lg:grid-cols-2", children: reviews.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-9 w-9 rounded-full bg-brand text-white grid place-items-center font-bold text-sm", children: r.name[0] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-dark text-sm", children: r.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex gap-0.5", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 12, className: i <= r.rating ? "fill-gold text-gold" : "text-border" }, i)) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: r.date })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2.5 text-sm text-body leading-relaxed", children: r.comment }),
          r.reply ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 ml-4 pl-3 border-l-2 border-brand/30 bg-brand-light/40 rounded-r-lg p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-bold text-brand inline-flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CornerDownRight, { size: 12 }),
              " Owner response"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-body", children: r.reply })
          ] }) : replyId === r.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex gap-2 animate-fade-in", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { autoFocus: true, value: replyText, onChange: (e) => setReplyText(e.target.value), placeholder: "Write a public response…", className: "flex-1 h-10 px-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => submitReply(r.id), className: "tap h-10 px-4 rounded-xl bg-brand text-white text-sm font-bold inline-flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 14 }),
              " Post"
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
            setReplyId(r.id);
            setReplyText("");
          }, className: "tap mt-3 inline-flex items-center gap-1.5 px-3 h-9 rounded-full bg-muted text-body text-sm font-semibold hover:bg-muted/70", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CornerDownRight, { size: 14 }),
            " Reply as owner"
          ] })
        ] }, r.id)) })
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
export {
  VendorDashboard as component
};
