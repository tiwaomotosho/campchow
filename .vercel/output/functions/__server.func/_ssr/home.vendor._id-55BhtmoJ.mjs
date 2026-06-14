import { r as reactExports, j as jsxRuntimeExports, R as React } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { R as Route, a as useCart, u as useAuth, V as VENDORS, c as getVendorMenu } from "./router-0qYA4BIB.mjs";
import { n as naira } from "./format-BZgr6J6c.mjs";
import { S as SmartImage } from "./SmartImage-vBHlgh6y.mjs";
import "../_libs/sonner.mjs";
import { A as ArrowLeft, g as ShoppingCart, n as Star, o as Clock, b as MapPin, x as Lock, m as ShoppingBag, a7 as Minus, a8 as Plus, S as ShieldCheck, aa as Leaf, K as Flame, ab as Award } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
const tagStyle = {
  Popular: "bg-gold-light text-gold",
  Spicy: "bg-error/15 text-error",
  Vegan: "bg-success/15 text-success",
  Halal: "bg-blueish/15 text-blueish"
};
const tagIcon = {
  Popular: Award,
  Spicy: Flame,
  Vegan: Leaf,
  Halal: ShieldCheck
};
function Tag({
  label
}) {
  const Icon = tagIcon[label];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${tagStyle[label]}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 11, strokeWidth: 2 }),
    " ",
    label
  ] });
}
function ItemRow({
  item,
  vendorId,
  locked
}) {
  const {
    items,
    add,
    setQty
  } = useCart();
  const {
    isLoggedIn,
    requireAuth
  } = useAuth();
  const line = items.find((l) => l.id === item.id);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 py-4 border-b border-border last:border-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-dark", children: item.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground line-clamp-2", children: item.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex flex-wrap gap-1.5", children: item.tags?.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { label: t }, t)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-bold text-lg text-dark", children: naira(item.price) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SmartImage, { src: item.image, fallbackSrc: item.imageFallback, alt: item.name, seed: item.name, className: "h-[90px] w-[90px] rounded-xl bg-muted shrink-0" }),
      locked ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-3 h-9 rounded-full bg-muted text-muted-foreground text-sm font-semibold cursor-not-allowed", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 13 }),
        " Closed"
      ] }) : line ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center bg-card border border-brand rounded-full overflow-hidden shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty(item.id, line.qty - 1), className: "h-9 w-9 grid place-items-center text-brand hover:bg-brand-light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 15 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-7 text-center text-sm font-bold", children: line.qty }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty(item.id, line.qty + 1), className: "h-9 w-9 grid place-items-center text-brand hover:bg-brand-light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 15 }) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => isLoggedIn ? add(item, vendorId) : requireAuth("Sign in to start your order and add items to cart."), className: "tap px-4 h-9 rounded-full bg-brand text-primary-foreground text-sm font-semibold hover:bg-brand-mid transition shadow-sm", children: "Add" })
    ] })
  ] });
}
const REVIEWS_DATA = {
  default: [{
    name: "Sister Funke",
    rating: 5,
    date: "May 25",
    comment: "Absolutely delicious! The jollof rice was smoky and the chicken was perfectly grilled. Delivery was fast — rider came straight to my chalet entrance."
  }, {
    name: "Brother Tunde",
    rating: 4,
    date: "May 24",
    comment: "Very good food. The portions are generous and the taste is authentic. Only wish the egusi had a bit more stock. Will definitely order again."
  }, {
    name: "Sister Adaeze",
    rating: 5,
    date: "May 23",
    comment: "Best food on the camp period. Mama Titi's kitchen never disappoints. The fried rice was exceptional."
  }, {
    name: "Brother Samuel",
    rating: 5,
    date: "May 22",
    comment: "Ordered for myself and my family of 4. Everyone was happy. The moin moin was a bonus surprise!"
  }, {
    name: "Sister Grace",
    rating: 4,
    date: "May 21",
    comment: "Consistently good. This is my go-to every programme. The zobo is refreshing and very reasonably priced."
  }]
};
function ReviewStars({
  n
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex gap-0.5", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: i <= n ? "oklch(0.62 0.13 78)" : "oklch(0.85 0.01 150)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) }, i)) });
}
function ReviewsSection({
  vendorId,
  isLoggedIn,
  requireAuth
}) {
  const [showAll, setShowAll] = React.useState(false);
  const all = REVIEWS_DATA[vendorId] ?? REVIEWS_DATA.default;
  const visible = !isLoggedIn || !showAll ? all.slice(0, 2) : all;
  const avg = (all.reduce((s, r) => s + r.rating, 0) / all.length).toFixed(1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "pt-6 scroll-mt-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 mx-auto max-w-3xl px-4 mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-bold text-dark inline-flex items-center gap-2", children: [
        "Reviews",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-sm font-normal text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "oklch(0.62 0.13 78)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) }),
          avg,
          " · ",
          all.length,
          " reviews"
        ] })
      ] }),
      isLoggedIn && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => toast.info("Leave a review after placing an order"), className: "tap px-3 h-8 rounded-full bg-brand-light text-brand text-xs font-bold hover:bg-brand-light/80", children: "Write a review" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-4 space-y-3", children: [
      visible.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-9 w-9 rounded-full bg-brand text-white grid place-items-center font-bold text-sm shrink-0", children: r.name[0] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-dark text-sm", children: r.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewStars, { n: r.rating })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground shrink-0", children: r.date })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2.5 text-sm text-body leading-relaxed", children: r.comment })
      ] }, i)),
      !isLoggedIn && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none select-none rounded-2xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-4 opacity-40 blur-[3px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-9 w-9 rounded-full bg-muted" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-24 rounded bg-muted" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 w-16 rounded bg-muted" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-full rounded bg-muted" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-3/4 rounded bg-muted" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/80 backdrop-blur-sm rounded-2xl border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-dark text-center px-4", children: [
            "Sign in to read all ",
            all.length,
            " reviews"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => requireAuth("Sign in to read the full community reviews."), className: "tap px-5 h-9 rounded-full bg-brand text-white text-sm font-bold hover:bg-brand-mid", children: "Sign in" })
        ] })
      ] }),
      isLoggedIn && !showAll && all.length > 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setShowAll(true), className: "tap w-full h-10 rounded-xl border border-border text-sm font-semibold text-body hover:bg-muted transition", children: [
        "Show all ",
        all.length,
        " reviews"
      ] })
    ] })
  ] });
}
function VendorMenu() {
  const {
    id
  } = Route.useParams();
  const navigate = useNavigate();
  const {
    count,
    subtotal
  } = useCart();
  const {
    isLoggedIn,
    requireAuth
  } = useAuth();
  const vendor = VENDORS.find((v) => v.id === id) ?? VENDORS[0];
  const menu = reactExports.useMemo(() => getVendorMenu(vendor), [vendor]);
  const locked = !vendor.open;
  const [activeSection, setActiveSection] = reactExports.useState(menu[0]?.id ?? "");
  const [showStickyBar, setShowStickyBar] = reactExports.useState(false);
  const coverRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const el = coverRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setShowStickyBar(!e.isIntersecting), {
      threshold: 0,
      rootMargin: "-60px 0px 0px 0px"
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background pb-32", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `fixed top-0 inset-x-0 z-40 transition-all duration-300 ${showStickyBar ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card/95 backdrop-blur border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-4 h-14 flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => navigate({
        to: "/home"
      }), className: "inline-flex items-center gap-2 font-semibold text-body hover:text-brand", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 18 }),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[180px]", children: vendor.name })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/home/cart", className: "relative grid place-items-center h-10 w-10 rounded-full hover:bg-muted", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { size: 20, className: "text-body" }),
        count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-0.5 -right-0.5 h-5 min-w-5 px-1 rounded-full bg-gold text-white text-[11px] font-bold grid place-items-center", children: count })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: coverRef, className: "relative h-[200px] md:h-[260px] bg-muted", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SmartImage, { src: vendor.cover, fallbackSrc: vendor.coverFallback, alt: vendor.name, seed: vendor.name, eager: true, className: "absolute inset-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
        to: "/home"
      }), className: "absolute top-4 left-4 h-10 w-10 grid place-items-center rounded-full bg-card/90 backdrop-blur text-body shadow tap", "aria-label": "Back", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 20 }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block absolute inset-y-0 left-0 w-16 pointer-events-none z-20", style: {
        background: "linear-gradient(to right, var(--color-background), transparent)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block absolute inset-y-0 right-0 w-16 pointer-events-none z-20", style: {
        background: "linear-gradient(to left, var(--color-background), transparent)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent to-background pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-background", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-3xl px-4 -mt-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card/95 backdrop-blur-sm rounded-2xl border border-border shadow-lg p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-dark", children: vendor.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: vendor.category })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${vendor.open ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-1.5 w-1.5 rounded-full ${vendor.open ? "bg-success" : "bg-muted-foreground"}` }),
              vendor.open ? "Open" : "Closed"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 14, className: "fill-gold text-gold" }),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-body", children: vendor.rating }),
              " (",
              vendor.reviews,
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 14 }),
              " ",
              vendor.open ? vendor.eta : "Closed now"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 14 }),
              " ",
              vendor.zone,
              " · ",
              vendor.distance
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Min ",
              naira(vendor.min)
            ] })
          ] })
        ] }) }),
        locked && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-3xl px-4 mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-4 rounded-xl bg-muted border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 18, className: "text-muted-foreground mt-0.5 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-dark", children: "This kitchen is currently closed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-0.5", children: "You can browse the full menu below. Ordering reopens during programme hours." })
          ] })
        ] }) }),
        menu.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-20 mt-6 bg-background/95 backdrop-blur border-y border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-3xl px-4 flex gap-2 overflow-x-auto scrollbar-none h-12 items-center", children: menu.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `#sec-${s.id}`, onClick: () => setActiveSection(s.id), className: `shrink-0 px-4 h-8 rounded-full text-sm font-semibold grid items-center transition ${activeSection === s.id ? "bg-brand text-primary-foreground" : "text-muted-foreground hover:text-body"}`, children: s.title }, s.id)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-3xl px-4 mt-2", children: menu.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: `sec-${s.id}`, className: "pt-6 scroll-mt-16", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-dark", children: s.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 bg-card rounded-2xl border border-border px-5", children: s.items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsx(ItemRow, { item: it, vendorId: vendor.id, locked }, it.id)) })
        ] }, s.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewsSection, { vendorId: vendor.id, isLoggedIn, requireAuth }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pb-16" })
    ] }),
    count > 0 && !locked && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-4 left-4 right-4 z-40 animate-slide-up", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/home/cart", className: "tap mx-auto max-w-3xl flex items-center justify-between gap-3 bg-brand text-primary-foreground px-5 h-14 rounded-2xl shadow-xl hover:bg-brand-mid transition", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 font-semibold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 18 }),
        " View Cart · ",
        count,
        " ",
        count === 1 ? "item" : "items"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-lg", children: naira(subtotal) })
    ] }) })
  ] });
}
export {
  VendorMenu as component
};
