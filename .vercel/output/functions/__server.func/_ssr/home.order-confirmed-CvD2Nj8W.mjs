import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { a as Check, o as Clock, a3 as Navigation, B as Bike, c as Search, a4 as Soup, a5 as PackageCheck, d as Store, b as MapPin, S as ShieldCheck, n as Star, a6 as MessageCircle, P as Phone } from "../_libs/lucide-react.mjs";
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
const MILESTONES = [{
  key: "received",
  label: "Order received",
  sub: "We've got your order",
  icon: Check
}, {
  key: "confirmed",
  label: "Order confirmed",
  sub: "Vendor accepted your order",
  icon: PackageCheck
}, {
  key: "preparing",
  label: "Preparing your food",
  sub: "The kitchen is cooking",
  icon: Soup
}, {
  key: "finding",
  label: "Finding your rider",
  sub: "Matching a verified camp rider",
  icon: Search
}, {
  key: "assigned",
  label: "Rider assigned",
  sub: "Emmanuel is on the way to vendor",
  icon: Bike
}, {
  key: "pickup",
  label: "Order picked up",
  sub: "Rider collected your food",
  icon: Store
}, {
  key: "enroute",
  label: "Out for delivery",
  sub: "Heading to your location",
  icon: Navigation
}];
const PHASE_TO_MILESTONE = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6
};
const ETA_BY_PHASE = {
  0: 28,
  1: 27,
  2: 25,
  3: 24,
  4: 20,
  5: 16,
  6: 11
};
const RIDER = {
  name: "Brother Emmanuel Adeyemi",
  initials: "EA",
  estate: "RC-2024-04821",
  rating: 4.8,
  trips: 143,
  vehicle: "Honda Bajaj · Red",
  plate: "KJA-482-EG"
};
const CONFETTI = Array.from({
  length: 18
}, (_, i) => {
  const a = i / 18 * Math.PI * 2, dist = 70 + i % 4 * 28;
  return {
    x: Math.round(Math.cos(a) * dist),
    y: Math.round(Math.sin(a) * dist * 0.85) + 30,
    r: 160 + i * 36,
    d: i % 5 * 0.05,
    c: ["oklch(0.45 0.11 150)", "oklch(0.62 0.13 78)", "oklch(0.62 0.17 145)", "oklch(0.56 0.12 152)"][i % 4]
  };
});
function Confetti() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none", "aria-hidden": true, children: CONFETTI.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "confetti-piece left-1/2 top-1/2", style: {
    background: p.c,
    ["--cx"]: `${p.x}px`,
    ["--cy"]: `${p.y}px`,
    ["--cr"]: `${p.r}deg`,
    ["--cd"]: `${p.d}s`
  } }, i)) });
}
function RouteMap({
  phase
}) {
  const bikePct = phase < 4 ? 0 : phase === 4 ? 12 : phase === 5 ? 18 : 72;
  const showBike = phase >= 4;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-40 rounded-2xl overflow-hidden border border-border bg-[oklch(0.95_0.02_150)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-60", style: {
      backgroundImage: "linear-gradient(oklch(0.90 0.02 150) 1px, transparent 1px), linear-gradient(90deg, oklch(0.90 0.02 150) 1px, transparent 1px)",
      backgroundSize: "26px 26px"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -left-6 -top-6 h-24 w-24 rounded-full bg-success/10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-8 bottom-2 h-20 w-28 rounded-full bg-brand/10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "absolute inset-0 w-full h-full", viewBox: "0 0 400 160", preserveAspectRatio: "none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M 60 110 C 150 110, 180 50, 330 56", fill: "none", stroke: "oklch(0.45 0.11 150)", strokeWidth: "3", strokeDasharray: "7 6", strokeLinecap: "round", opacity: "0.55" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute", style: {
      left: "11%",
      top: "60%"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center -translate-x-1/2 -translate-y-1/2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid place-items-center h-8 w-8 rounded-full bg-brand text-white shadow-lg ring-4 ring-brand/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Store, { size: 15 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 text-[9px] font-bold text-brand bg-white/90 px-1.5 py-0.5 rounded shadow-sm", children: "Vendor" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute", style: {
      left: "82%",
      top: "35%"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center -translate-x-1/2 -translate-y-1/2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid place-items-center h-8 w-8 rounded-full bg-gold text-white shadow-lg ring-4 ring-gold/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 15 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 text-[9px] font-bold text-gold bg-white/90 px-1.5 py-0.5 rounded shadow-sm", children: "You" })
    ] }) }),
    showBike && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute transition-all duration-[1500ms] ease-in-out", style: {
      left: `${11 + bikePct * 0.71}%`,
      top: `${60 - bikePct * 0.34}%`
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid place-items-center h-9 w-9 rounded-full bg-white text-brand shadow-xl ring-2 ring-brand -translate-x-1/2 -translate-y-1/2 pulse-ring", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bike, { size: 17 }) }) })
  ] });
}
function Timeline({
  phase
}) {
  const reached = PHASE_TO_MILESTONE[phase];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "relative", children: MILESTONES.map((m, i) => {
    const done = i < reached;
    const active = i === reached;
    const Icon = m.icon;
    const last = i === MILESTONES.length - 1;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "relative flex gap-4 pb-6 last:pb-0", children: [
      !last && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-[18px] top-9 bottom-0 w-0.5 overflow-hidden bg-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `block w-full transition-all duration-700 ${done ? "h-full bg-brand" : active ? "h-full timeline-sweep" : "h-0"}` }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `relative z-10 grid place-items-center h-9 w-9 rounded-full shrink-0 transition-all duration-500
              ${done ? "bg-brand text-white" : active ? "bg-brand text-white ring-4 ring-brand-light pulse-ring" : "bg-muted text-muted-foreground"}`, children: done ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 17, strokeWidth: 3 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 16, strokeWidth: 2 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `pt-1 transition-opacity duration-500 ${i > reached ? "opacity-45" : "opacity-100"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `font-bold text-sm ${active ? "text-brand" : "text-dark"}`, children: m.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: m.sub }),
        active && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-brand", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-brand animate-pulse" }),
          " In progress…"
        ] })
      ] })
    ] }, m.key);
  }) });
}
function RiderCard({
  compact = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-2xl border border-border bg-card ${compact ? "p-4" : "p-5"} animate-slide-up`, children: [
    !compact && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase font-semibold tracking-wider text-success inline-flex items-center gap-1.5 mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 13, strokeWidth: 2.5 }),
      " Verified Camp Rider"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 rounded-full bg-brand text-white grid place-items-center font-bold text-xl", children: RIDER.initials }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-success grid place-items-center ring-2 ring-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 12, className: "text-white" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-dark leading-tight", children: RIDER.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-body mt-0.5 inline-flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 13, className: "fill-gold text-gold" }),
          " ",
          RIDER.rating,
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            "· ",
            RIDER.trips,
            " deliveries"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
          RIDER.vehicle,
          " · ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: RIDER.plate })
        ] })
      ] })
    ] }),
    !compact && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 px-3 py-2 rounded-lg bg-brand-light text-brand text-xs font-semibold inline-flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 13 }),
        " Estate ID: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: RIDER.estate })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => toast.info("Opening secure chat with your rider…"), className: "tap h-11 rounded-xl bg-brand-light text-brand font-semibold inline-flex items-center justify-center gap-2 hover:bg-brand-light/80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 16 }),
          " Message"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => toast.info("Connecting via masked number…"), className: "tap h-11 rounded-xl bg-brand text-white font-semibold inline-flex items-center justify-center gap-2 hover:bg-brand-mid", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 16 }),
          " Call"
        ] })
      ] })
    ] })
  ] });
}
function RiderSearch() {
  const ghosts = ["Verified rider · 0.4 km", "Verified rider · 0.7 km", "Verified rider · 1.1 km"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-dark inline-flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 16, className: "text-brand" }),
      " Matching you with a rider…"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Verified camp riders near the vendor" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-2.5", children: ghosts.map((g, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-xl border border-border p-2.5 overflow-hidden relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full img-shimmer shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-28 rounded img-shimmer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 h-2.5 w-20 rounded img-shimmer" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: g })
    ] }, i)) })
  ] });
}
function Confirmed() {
  const navigate = useNavigate();
  const [phase, setPhase] = reactExports.useState(0);
  const [showSplash, setShowSplash] = reactExports.useState(true);
  const firedFound = reactExports.useRef(false);
  const firedEnroute = reactExports.useRef(false);
  reactExports.useEffect(() => {
    const timers = [];
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));
    at(2600, () => setShowSplash(false));
    at(3e3, () => setPhase(1));
    at(8e3, () => setPhase(2));
    at(13e3, () => setPhase(3));
    at(21e3, () => {
      setPhase(4);
      if (!firedFound.current) {
        firedFound.current = true;
        toast.success("🛵 Rider found!", {
          description: "Emmanuel is heading to the vendor."
        });
      }
    });
    at(29e3, () => setPhase(5));
    at(38e3, () => {
      setPhase(6);
      if (!firedEnroute.current) {
        firedEnroute.current = true;
        toast.success("🛵 On the way!", {
          description: "Your food is en route to your location."
        });
      }
    });
    return () => timers.forEach(clearTimeout);
  }, []);
  const eta = ETA_BY_PHASE[phase];
  if (showSplash) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 grid place-items-center px-6 text-center animate-fade-in", style: {
      background: "linear-gradient(160deg, oklch(0.20 0.025 155), oklch(0.30 0.07 152))"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto h-28 w-28 rounded-full bg-success grid place-items-center animate-checkmark pulse-ring", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Confetti, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 56, className: "text-white", strokeWidth: 3 })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-7 text-3xl font-extrabold text-white animate-fade-up-1", children: "Order Received!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-white/60 animate-fade-up-2", children: "We're confirming with the kitchen…" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white/80 text-sm font-mono animate-fade-up-3", children: "CC-20260525-7F3A" })
    ] }) });
  }
  const headline = phase >= 6 ? "Your food is on the way" : phase >= 4 ? "Rider assigned to your order" : phase >= 3 ? "Finding your rider" : phase >= 1 ? "Preparing your order" : "Order received";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-30 bg-card/95 backdrop-blur border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl px-4 h-16 flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-dark truncate", children: headline }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: "CC-20260525-7F3A" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "shrink-0 inline-flex items-center gap-1.5 px-3 h-9 rounded-full bg-gold-light text-gold font-bold text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 14 }),
        " ~",
        eta,
        " min"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-2xl px-4 py-6 space-y-4 pb-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `rounded-2xl p-5 transition-colors duration-500 ${phase >= 6 ? "bg-brand text-white" : "bg-card border border-border"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `grid place-items-center h-11 w-11 rounded-xl shrink-0 ${phase >= 6 ? "bg-white/15" : "bg-brand-light"}`, children: phase >= 6 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { size: 20, className: "text-white" }) : phase >= 4 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Bike, { size: 20, className: "text-brand" }) : phase >= 3 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 20, className: "text-brand" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Soup, { size: 20, className: "text-brand" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `font-bold ${phase >= 6 ? "text-white" : "text-dark"}`, children: MILESTONES[PHASE_TO_MILESTONE[phase]].label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-sm ${phase >= 6 ? "text-white/75" : "text-muted-foreground"}`, children: phase >= 6 ? "Mama Titi's Kitchen → 2000 Chalets · Block Entrance · ~1.4 km" : MILESTONES[PHASE_TO_MILESTONE[phase]].sub })
        ] })
      ] }) }),
      phase >= 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(RouteMap, { phase }),
      phase === 3 && /* @__PURE__ */ jsxRuntimeExports.jsx(RiderSearch, {}),
      phase >= 4 && /* @__PURE__ */ jsxRuntimeExports.jsx(RiderCard, { compact: false }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-dark mb-4", children: "Order progress" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Timeline, { phase })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-dark", children: "Delivering to" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-brand bg-brand-light px-2 py-0.5 rounded-full", children: "Geo-Layer" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-body inline-flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 15, className: "text-brand" }),
          " 2000 Chalets › Block 501–1000 › Block Entrance"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
        to: "/home"
      }), className: "tap w-full h-12 rounded-xl bg-brand text-white font-bold hover:bg-brand-mid transition", children: "Order Again" })
    ] })
  ] });
}
export {
  Confirmed as component
};
