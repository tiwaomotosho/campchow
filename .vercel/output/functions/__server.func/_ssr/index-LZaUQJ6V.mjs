import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { F as Footer } from "./Footer-D5DOucoK.mjs";
import { S as SmartImage } from "./SmartImage-vBHlgh6y.mjs";
import { u as useAuth, i as imagesData } from "./router-0qYA4BIB.mjs";
import "../_libs/sonner.mjs";
import { b as MapPin, c as Search, C as ChevronDown, d as Store, e as ArrowRight, B as Bike, f as Shield, Z as Zap, g as ShoppingCart, h as Menu, X, H as House, U as UtensilsCrossed, W as WifiOff, i as Smartphone, j as MessageSquare, k as Wifi } from "../_libs/lucide-react.mjs";
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
function SiteHeader() {
  const [solid, setSolid] = reactExports.useState(false);
  const [open, setOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  reactExports.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  const linkCls = solid ? "text-body hover:text-brand" : "text-white/85 hover:text-white";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "header",
      {
        className: `fixed top-0 inset-x-0 z-50 transition-all duration-300 ${solid ? "bg-card/95 backdrop-blur shadow-sm" : "bg-transparent"}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `grid place-items-center h-9 w-9 rounded-xl transition-colors duration-300 ${solid ? "bg-brand text-white" : "bg-white/15 text-white backdrop-blur"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { size: 20, strokeWidth: 1.75 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-extrabold tracking-tight text-xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: solid ? "text-brand" : "text-white", children: "Camp" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold", children: "Chow" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden md:flex items-center gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/home", className: `text-sm font-semibold transition-colors duration-200 ${linkCls}`, children: "Order Food" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/vendor/login", className: `text-sm font-semibold transition-colors duration-200 ${linkCls}`, children: "For Vendors" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/rider/login", className: `text-sm font-semibold transition-colors duration-200 ${linkCls}`, children: "For Riders" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/home",
                className: `tap text-sm font-bold px-5 h-10 rounded-full grid items-center transition-all duration-200 ${solid ? "bg-brand text-white hover:bg-brand-mid" : "bg-white text-brand hover:bg-white/90"}`,
                children: "Get Started"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setOpen(true),
              className: `md:hidden grid place-items-center h-10 w-10 rounded-full transition-colors ${solid ? "text-body hover:bg-muted" : "text-white hover:bg-white/10"}`,
              "aria-label": "Open menu",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { size: 24 })
            }
          )
        ] })
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 bg-black/55 animate-fade-in md:hidden", onClick: () => setOpen(false) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "aside",
      {
        className: `menu-panel ${open ? "open" : ""} fixed inset-y-0 right-0 z-50 w-[290px] md:hidden flex flex-col`,
        style: { background: "linear-gradient(160deg, oklch(0.20 0.025 155), oklch(0.28 0.06 152))" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 h-16", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-extrabold text-xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white", children: "Camp" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold", children: "Chow" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setOpen(false), className: "grid place-items-center h-10 w-10 rounded-full text-white/80 hover:bg-white/10", "aria-label": "Close menu", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 22 }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 px-3 pt-4 space-y-1", children: [
            { to: "/", label: "Home", icon: House },
            { to: "/home", label: "Order Food", icon: UtensilsCrossed },
            { to: "/vendor/login", label: "Vendor Portal", icon: Store },
            { to: "/rider/login", label: "Rider Portal", icon: Bike }
          ].map(({ to, label, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to,
              onClick: () => setOpen(false),
              className: "flex items-center gap-3 px-4 h-12 rounded-xl text-white/85 font-semibold hover:bg-white/10 transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 19, strokeWidth: 1.75, className: "text-gold" }),
                label
              ]
            },
            label
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/home",
                onClick: () => setOpen(false),
                className: "tap flex items-center justify-center h-12 rounded-xl bg-gold text-dark font-bold",
                children: "Get Started"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-[11px] text-white/40 text-center", children: "Built for Redemption City" })
          ] })
        ]
      }
    )
  ] });
}
function Reveal({
  children,
  delay = 0,
  className = ""
}) {
  const ref = reactExports.useRef(null);
  const [visible, setVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -10px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const delayCls = delay ? ` reveal-delay-${delay}` : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: `reveal${visible ? " is-visible" : ""}${delayCls} ${className}`, children });
}
const U = (id) => `${imagesData._baseUrl}${id}${imagesData._params}`;
const HERO_ZONES = ["Youth Centre", "2000 Chalets", "RECTEM", "Emmanuel Park", "Estate 12"];
const HERO_IMAGES = imagesData.hero.map(U);
function HeroBackdrop({
  active
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 hero-gradient overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 kenburns", children: HERO_IMAGES.map((src, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: "", "aria-hidden": true, onError: (e) => {
      e.currentTarget.style.display = "none";
    }, className: `absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ease-in-out ${i === active ? "opacity-100" : "opacity-0"}` }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-[oklch(0.16_0.03_155/.72)] via-[oklch(0.16_0.03_155/.5)] to-[oklch(0.14_0.03_155/.88)]" })
  ] });
}
const TICKER = ["Order delivered to Estate 12 · just now", "Mama Titi's Kitchen accepted an order · 1 min ago", "Rider Emmanuel went online near Youth Centre · 2 min ago", "Order delivered to 2000 Chalets · 3 min ago", "New vendor onboarded: Glory Shawarma · 5 min ago"];
function LiveTicker() {
  const [i, setI] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % TICKER.length), 2800);
    return () => clearInterval(t);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 border border-white/15 backdrop-blur text-white/85 text-xs font-medium overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2 w-2 shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-success" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tick-in whitespace-nowrap", children: TICKER[i] }, i)
  ] });
}
function useCountUp(target, duration = 1200) {
  const [v, setV] = reactExports.useState(0);
  reactExports.useEffect(() => {
    let raf = 0;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return v;
}
const fmt = (v) => v >= 1e6 ? `${Math.round(v / 1e5) / 10}M+` : v >= 1e3 ? `${Math.round(v / 1e3)}K+` : `${v}`;
function StatStrip() {
  const visitors = useCountUp(1e6, 1600);
  const residents = useCountUp(2e5, 1400);
  const zones = useCountUp(16, 1e3);
  const stats = [{
    label: fmt(visitors),
    sub: "peak visitors"
  }, {
    label: `${zones}`,
    sub: "camp zones"
  }, {
    label: fmt(residents),
    sub: "residents"
  }, {
    label: "4.8★",
    sub: "rider rating"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2 md:gap-3", children: stats.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/[0.08] border border-white/12 rounded-xl px-2 py-3 text-center backdrop-blur", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-extrabold text-white text-base md:text-xl leading-none tabular-nums", children: s.label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-[10px] md:text-xs mt-1", children: s.sub })
  ] }, i)) });
}
const CT = imagesData.categoryTiles;
const CATS = [{
  label: "Jollof & Rice",
  src: U(CT["jollof-rice"].src),
  fallback: U(CT["jollof-rice"].fallback)
}, {
  label: "Grills & Suya",
  src: U(CT["grills-suya"].src),
  fallback: U(CT["grills-suya"].fallback)
}, {
  label: "Pastries",
  src: U(CT["pastries"].src),
  fallback: U(CT["pastries"].fallback)
}, {
  label: "Pepper Soup",
  src: U(CT["pepper-soup"].src),
  fallback: U(CT["pepper-soup"].fallback)
}, {
  label: "Drinks",
  src: U(CT["drinks"].src),
  fallback: U(CT["drinks"].fallback)
}, {
  label: "Shawarma",
  src: U(CT["shawarma"].src),
  fallback: U(CT["shawarma"].fallback)
}];
function CategoryRow() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 overflow-x-auto scrollbar-none -mx-4 px-4 snap-x", children: CATS.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/home", className: `group relative shrink-0 w-36 h-44 md:w-44 md:h-52 rounded-2xl overflow-hidden snap-start tap card-enter-${i + 1}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SmartImage, { src: c.src, fallbackSrc: c.fallback, alt: c.label, seed: c.label, eager: true, className: "absolute inset-0", imgClassName: "transition-transform duration-500 ease-out group-hover:scale-110" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-3 left-3 right-3 text-white font-bold text-sm md:text-base leading-tight drop-shadow", children: c.label })
  ] }, c.label)) });
}
const DESTS = [{
  loc: "2000 Chalets",
  area: "Block 501–1000",
  point: "Block Entrance"
}, {
  loc: "Old Auditorium",
  area: "Perimeter 3 (East)",
  point: "VIP Entrance"
}, {
  loc: "RECTEM",
  area: "IT Centre",
  point: "Lab Entrance"
}, {
  loc: "Youth Centre",
  area: "Main Building",
  point: "Front Desk"
}];
function GeoShowcase() {
  const [i, setI] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % DESTS.length), 3e3);
    return () => clearInterval(t);
  }, []);
  const d = DESTS[i];
  const rows = [{
    label: "Location",
    value: d.loc,
    color: "text-white"
  }, {
    label: "Area",
    value: d.area,
    color: "text-brand-light"
  }, {
    label: "Pickup Point",
    value: d.point,
    color: "text-gold"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl overflow-hidden", style: {
    background: "linear-gradient(150deg, oklch(0.18 0.03 155), oklch(0.27 0.06 152))"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-8 p-7 md:p-12 items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gold text-xs font-bold uppercase tracking-[0.2em]", children: "The CampChow Geo-Layer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 text-2xl md:text-4xl font-extrabold text-white leading-tight", children: [
        "No street addresses?",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "No problem."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-white/60 text-sm md:text-base leading-relaxed max-w-md", children: "Redemption City navigates by landmark — so we built delivery around the camp's own language. Pick your location, area, and pickup point. Your rider knows exactly where that is." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/home", className: "tap mt-6 inline-flex items-center gap-2 px-6 h-12 rounded-full bg-gold text-dark font-bold hover:brightness-105 transition", children: [
        "Try it now ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 17 })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/[0.06] border border-white/10 rounded-2xl p-6 backdrop-blur", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-[10px] uppercase tracking-widest font-bold mb-5", children: "Delivering to" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5 tick-in", children: rows.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "geo-step", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-6 w-6 rounded-full border-2 border-brand-mid bg-brand/30 grid place-items-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 12, className: "text-brand-light" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-[10px] uppercase tracking-wider font-semibold leading-none mb-1", children: r.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `font-bold text-base md:text-lg truncate ${r.color}`, children: r.value })
        ] })
      ] }) }, r.label)) }, i),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 pt-4 border-t border-white/10 text-xs text-white/45 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 12, className: "shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tick-in truncate", children: [
          d.loc,
          " › ",
          d.area,
          " › ",
          d.point
        ] }, `bc-${i}`)
      ] })
    ] })
  ] }) });
}
function RoleCards() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/home", className: "tap group relative flex items-center gap-5 bg-brand rounded-2xl px-6 py-6 shadow-xl shadow-brand/25 hover:bg-brand-mid hover:shadow-2xl hover:shadow-brand/30 hover:-translate-y-1 transition-all duration-300", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 rounded-2xl bg-white/15 grid place-items-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { size: 26, strokeWidth: 1.75, className: "text-white" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg md:text-xl font-bold text-white", children: "I am a Customer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold bg-gold text-dark px-2 py-0.5 rounded-full uppercase tracking-wide", children: "No login needed" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-sm leading-snug", children: "Browse vendors, order food, and track delivery to your zone." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 22, className: "text-white/60 shrink-0 group-hover:translate-x-1.5 transition-transform duration-300" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/vendor/login", className: "tap group flex items-center gap-4 bg-card border border-border rounded-2xl px-5 py-5 shadow-sm hover:shadow-lg hover:border-brand/30 hover:-translate-y-1 transition-all duration-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-xl bg-brand-light grid place-items-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { size: 22, strokeWidth: 1.75, className: "text-brand" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-dark", children: "I am a Vendor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-snug", children: "Manage orders, menu, and messages." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 16, className: "text-muted-foreground shrink-0 group-hover:translate-x-1 group-hover:text-brand transition-all duration-300" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 2, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/rider/login", className: "tap group flex items-center gap-4 bg-card border border-border rounded-2xl px-5 py-5 shadow-sm hover:shadow-lg hover:border-gold/40 hover:-translate-y-1 transition-all duration-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-xl bg-gold-light grid place-items-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bike, { size: 22, strokeWidth: 1.75, className: "text-gold" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-dark", children: "I am a Rider" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-snug", children: "Go online, accept deliveries, and earn." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 16, className: "text-muted-foreground shrink-0 group-hover:translate-x-1 group-hover:text-gold transition-all duration-300" })
      ] }) })
    ] })
  ] });
}
function SignalBars({
  level
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-end gap-0.5 h-3", children: [1, 2, 3].map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-1 rounded-sm transition-colors duration-500 ${b <= level ? "bg-current" : "bg-current/25"}`, style: {
    height: `${b * 4}px`
  } }, b)) });
}
function AnimatedPhone() {
  const [state, setState] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const id = setInterval(() => setState((s) => (s + 1) % 3), 3e3);
    return () => clearInterval(id);
  }, []);
  const statusBar = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2.5 text-dark", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold", children: "9:41" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1 transition-colors duration-500 ${state === 0 ? "text-success" : state === 1 ? "text-amber" : "text-error"}`, children: [
      state === 2 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8px] font-bold", children: "2G" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(SignalBars, { level: state === 0 ? 3 : 1 }),
      state === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { size: 10 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(WifiOff, { size: 10 })
    ] })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-56 rounded-[2.4rem] border-[8px] border-dark bg-background p-3 shadow-2xl relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-14 mx-auto rounded-full bg-dark/20 mb-2.5" }),
    statusBar,
    state === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid place-items-center h-6 w-6 rounded-lg bg-brand text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { size: 13 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-extrabold text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand", children: "Camp" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold", children: "Chow" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-[8px] font-bold text-success bg-success/15 px-1.5 py-0.5 rounded-full", children: "Online" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-1.5", children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-lg overflow-hidden card-enter-${i + 1}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10", style: {
          background: ["linear-gradient(135deg,#E8821E,#B5471F)", "linear-gradient(135deg,#C0392B,#6E2516)", "linear-gradient(135deg,#1A6B3C,#0D3B20)", "linear-gradient(135deg,#C98A3A,#7A4E1E)"][i]
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-t-0 border-border rounded-b-lg px-1.5 py-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-3/4 rounded bg-dark/15" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 h-1 w-1/2 rounded bg-dark/10" })
        ] })
      ] }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 rounded-lg bg-brand text-white text-center text-[10px] font-bold py-1.5", children: "Browse Vendors" })
    ] }),
    state === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid place-items-center h-6 w-6 rounded-lg bg-brand text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { size: 13 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-extrabold text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand", children: "Camp" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold", children: "Chow" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-[8px] font-bold text-amber bg-amber/15 px-1.5 py-0.5 rounded-full", children: "Weak signal" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-amber/10 border border-amber/30 p-2.5 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-amber", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(WifiOff, { size: 12 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold", children: "Network unstable" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-muted-foreground mt-1 leading-snug", children: "Your order is safe. It's queued on your phone and will send automatically." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-card border border-border p-2.5 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2 w-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-ping absolute h-full w-full rounded-full bg-amber opacity-75" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative rounded-full h-2 w-2 bg-amber" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold text-dark", children: "1 order queued · syncing…" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 rounded-lg bg-dark text-white text-center text-[10px] font-bold py-1.5", children: "Order saved offline" })
    ] }),
    state === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid place-items-center h-6 w-6 rounded-lg bg-error text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WifiOff, { size: 13 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-extrabold text-xs text-dark", children: "Zero-Data Mode" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-dark text-white p-3 font-mono", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-white/60", children: "USSD · no internet needed" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold mt-1", children: "*737*1*2000#" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-2 h-px bg-white/15" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] leading-relaxed text-white/80", children: "CampChow: Order CC-7F3A confirmed. Rider Emmanuel assigned. Reply 1 to track." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-1.5 text-[9px] text-success font-semibold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-success" }),
        " Works on bare 2G signal · ₦0 data"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-1.5 mt-3", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-1.5 rounded-full transition-all duration-300 ${i === state ? "w-5 bg-brand" : "w-1.5 bg-dark/20"}` }, i)) })
  ] }) });
}
function ResilienceBanner() {
  const feats = [{
    icon: WifiOff,
    title: "Offline-first app",
    sub: "Orders queue on your phone and sync when signal returns"
  }, {
    icon: Smartphone,
    title: "USSD payments",
    sub: "Dial *737# and pay with zero data on bare 2G"
  }, {
    icon: MessageSquare,
    title: "SMS updates",
    sub: "Order status reaches you even when the network dies"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-3xl p-7 md:p-10 grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-center shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedPhone, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-brand text-xs font-bold uppercase tracking-[0.2em]", children: "Built for peak congestion" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-2 text-2xl md:text-3xl font-extrabold text-dark leading-tight", children: [
        "Works even when the",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", { className: "hidden md:block" }),
        " network doesn't"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground text-sm md:text-base max-w-lg", children: "When a million people arrive for a programme, mobile networks collapse. CampChow is engineered for exactly that moment." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 space-y-4", children: feats.map(({
        icon: Icon,
        title,
        sub
      }, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid place-items-center h-10 w-10 rounded-xl bg-brand-light text-brand shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 18, strokeWidth: 1.75 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-dark text-sm", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: sub })
        ] })
      ] }) }, title)) })
    ] })
  ] });
}
function Landing() {
  const navigate = useNavigate();
  const {
    isLoggedIn,
    user
  } = useAuth();
  const [hero, setHero] = reactExports.useState(0);
  const [zoneIdx, setZoneIdx] = reactExports.useState(0);
  const [dim, setDim] = reactExports.useState(0);
  const heroRef = reactExports.useRef(null);
  const catsRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const t = setInterval(() => setHero((h) => (h + 1) % HERO_IMAGES.length), 7e3);
    const z = setInterval(() => setZoneIdx((i) => (i + 1) % HERO_ZONES.length), 2e3);
    return () => {
      clearInterval(t);
      clearInterval(z);
    };
  }, []);
  reactExports.useEffect(() => {
    const onScroll = () => {
      const h = heroRef.current;
      if (!h) return;
      const vh = window.innerHeight;
      const past = Math.min(1, Math.max(0, window.scrollY / (vh * 0.85)));
      setDim(past * 0.85);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref: heroRef, className: "sticky top-0 z-0 md:relative min-h-[92svh] flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(HeroBackdrop, { active: hero }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hero-dim md:hidden", style: {
        opacity: dim
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex-1 flex flex-col items-center justify-center px-4 pt-28 pb-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-3xl mx-auto text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-fade-up", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/85 text-xs font-semibold backdrop-blur", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-gold animate-pulse" }),
          "Redemption City · Ogun State, Nigeria"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-6 font-display text-white animate-fade-up-1 drop-shadow-sm", style: {
          fontSize: "clamp(2.5rem,7vw,3.75rem)",
          lineHeight: 1.08,
          letterSpacing: "-0.02em",
          fontWeight: 800
        }, children: [
          "Discover the best food",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold", children: "anywhere on the camp" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-white/70 text-lg md:text-xl max-w-2xl mx-auto animate-fade-up-2", style: {
          lineHeight: 1.5
        }, children: isLoggedIn && user ? `Welcome back, ${user.name.split(" ")[0]} — your favourite vendors are ready.` : "Over a million people attend programmes here with no way to order food to their seat. Until now." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: (e) => {
          e.preventDefault();
          navigate({
            to: "/home"
          });
        }, className: "mt-8 animate-fade-up-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl flex items-center bg-white rounded-full h-14 md:h-16 pl-4 pr-2 shadow-2xl shadow-black/25 transition-shadow duration-200 focus-within:ring-4 focus-within:ring-gold/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hidden sm:flex items-center gap-1.5 pr-3 text-sm font-semibold text-body shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 16, className: "text-brand" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tick-in inline-block min-w-[92px]", children: HERO_ZONES[zoneIdx] }, zoneIdx)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:block h-7 w-px bg-border shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 18, className: "text-muted-foreground ml-0 sm:ml-3 mr-2 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "flex-1 min-w-0 bg-transparent outline-none text-base md:text-lg text-body placeholder:text-muted-foreground", placeholder: "Search vendors, dishes, or zones…" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "tap shrink-0 h-10 md:h-12 px-5 md:px-7 rounded-full bg-brand text-white text-sm font-bold hover:bg-brand-mid transition-colors duration-200", children: "Search" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 animate-fade-up-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/home", className: "tap h-12 px-8 rounded-full bg-gold text-dark font-bold grid items-center hover:brightness-105 transition", children: "Order Food" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#get-started", className: "tap h-12 px-8 rounded-full bg-white/10 border border-white/30 text-white font-bold grid items-center backdrop-blur hover:bg-white hover:text-brand transition-colors duration-200", children: "Join as Vendor or Rider" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 animate-fade-up-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LiveTicker, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 max-w-2xl mx-auto w-full animate-fade-up-5 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatStrip, {}) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => catsRef.current?.scrollIntoView({
        behavior: "smooth"
      }), className: "relative mx-auto mb-5 grid place-items-center h-10 w-10 rounded-full text-white/70 hover:text-white", "aria-label": "Scroll down", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 26, className: "cue-bounce" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 bg-background rounded-t-[2rem] -mt-8 shadow-[0_-24px_60px_-30px_rgba(0,0,0,0.4)] md:rounded-none md:mt-0 md:shadow-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref: catsRef, className: "pt-14 md:pt-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "h-section text-dark", children: "What's on your mind?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground text-sm md:text-base", children: "Crave it. Tap it. It's on the way." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryRow, {}) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pt-14 md:pt-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(GeoShowcase, {}) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "pt-14 md:pt-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "h-section text-dark text-center", children: "Grow with CampChow" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground text-sm md:text-base text-center", children: "Whether you cook or deliver — there's a place for you." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-7 grid md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/vendor/login", className: "tap group relative block rounded-3xl overflow-hidden min-h-[300px] shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SmartImage, { src: U(imagesData.lifestyle["kitchen-vendor"].src), fallbackSrc: U(imagesData.lifestyle["kitchen-vendor"].fallback), alt: "Kitchen", seed: "vendor kitchen", eager: true, className: "absolute inset-0", imgClassName: "group-hover:scale-105 transition-transform duration-700" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", style: {
              background: "linear-gradient(150deg, oklch(0.16 0.03 155 / 0.92), oklch(0.20 0.04 152 / 0.78))"
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative p-7 flex flex-col justify-between min-h-[300px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-white/15 text-white mb-4 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { size: 28, strokeWidth: 1.75 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "h-card text-white", style: {
                  fontSize: "1.6rem",
                  fontWeight: 800
                }, children: "List your kitchen" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-white/75 t-body", children: "Get discovered by thousands of camp visitors. Manage orders from your phone and get paid automatically every settlement cycle." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-1.5", children: ["Free to join during the pilot", "Dashboard + order management", "Automatic settlements"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 text-white/85 text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-gold shrink-0" }),
                  f
                ] }, f)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 inline-flex items-center gap-2 text-gold font-bold group-hover:gap-3 transition-all", children: [
                "List your kitchen ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 17 })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 2, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/rider/login", className: "tap group relative block rounded-3xl overflow-hidden min-h-[300px] shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SmartImage, { src: U(imagesData.lifestyle["rider-delivery"].src), fallbackSrc: U(imagesData.lifestyle["rider-delivery"].fallback), alt: "Rider", seed: "rider delivery", eager: true, className: "absolute inset-0", imgClassName: "group-hover:scale-105 transition-transform duration-700" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", style: {
              background: "linear-gradient(150deg, oklch(0.45 0.12 78 / 0.92), oklch(0.40 0.10 70 / 0.80))"
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative p-7 flex flex-col justify-between min-h-[300px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-white/20 text-white mb-4 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bike, { size: 28, strokeWidth: 1.75 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "h-card text-white", style: {
                  fontSize: "1.6rem",
                  fontWeight: 800
                }, children: "Ride with CampChow" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-white/85 t-body", children: "Accept deliveries near you, earn transparently on every trip, and build a verified identity on the camp." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-1.5", children: ["Earn per delivery + bonuses", "Set your own hours", "Estate ID verification"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 text-white text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-white shrink-0" }),
                  f
                ] }, f)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 inline-flex items-center gap-2 text-white font-bold group-hover:gap-3 transition-all", children: [
                "Join the rider network ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 17 })
              ] })
            ] })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "get-started", className: "pt-14 md:pt-20 scroll-mt-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "h-section text-dark text-center", children: "Choose how you get started" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground text-sm md:text-base text-center", children: "One platform. Three ways in." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-7 max-w-2xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RoleCards, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 2, className: "mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-center justify-center gap-3", children: [{
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 14 }),
          text: "Verified Camp Riders"
        }, {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 14 }),
          text: "16 Named Zones"
        }, {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 14 }),
          text: "Works on Weak Networks"
        }].map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-card border border-border text-xs font-semibold text-body shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand", children: b.icon }),
          b.text
        ] }, i)) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pt-14 md:pt-20 pb-16 md:pb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResilienceBanner, {}) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}) })
  ] });
}
export {
  Landing as component
};
