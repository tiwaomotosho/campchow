import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { Z as ZONES } from "./router-0qYA4BIB.mjs";
import { f as Shield, b as MapPin, Z as Zap, g as ShoppingCart, I as Instagram, T as Twitter, F as Facebook, Y as Youtube, l as Linkedin } from "../_libs/lucide-react.mjs";
function Footer() {
  const zones = ZONES.filter((z) => z !== "All Zones");
  const socials = [Instagram, Twitter, Facebook, Youtube, Linkedin];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { style: { background: "oklch(0.14 0.02 155)" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-white/8 px-4 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-6xl flex flex-wrap items-center justify-center gap-x-8 gap-y-2", children: [
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 13 }), text: "Verified Camp Riders — Estate ID required" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 13 }), text: "16 named zones across Redemption City" },
      { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 13 }), text: "Resilient on weak networks — USSD supported" }
    ].map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 text-[11px] font-semibold text-white/55", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold", children: b.icon }),
      b.text
    ] }, i)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 py-12 grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1.4fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid place-items-center h-9 w-9 rounded-xl bg-brand text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { size: 20, strokeWidth: 1.75 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-extrabold tracking-tight text-xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white", children: "Camp" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold", children: "Chow" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-white/45 max-w-xs leading-relaxed", children: "Built for the Camp. Made for the Community. The commerce and delivery platform for Redemption City." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex items-center gap-2", children: socials.map((Icon, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "#",
            onClick: (e) => e.preventDefault(),
            className: "grid place-items-center h-9 w-9 rounded-full bg-white/8 text-white/55 hover:text-white hover:bg-white/15 transition-colors duration-200",
            "aria-label": "Social link",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 16, strokeWidth: 1.75 })
          },
          i
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-white/85 uppercase tracking-wider text-xs mb-4", children: "Company" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2.5 text-white/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-white transition-colors duration-200", children: "Home" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/home", className: "hover:text-white transition-colors duration-200", children: "Order Food" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#how-it-works", className: "hover:text-white transition-colors duration-200", children: "How It Works" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", onClick: (e) => e.preventDefault(), className: "hover:text-white transition-colors duration-200", children: "Kingdom Hack 3.0" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-white/85 uppercase tracking-wider text-xs mb-4", children: "For Partners" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/vendor/login", className: "inline-flex items-center gap-1.5 text-gold font-bold hover:brightness-110 transition-colors duration-200", children: "🍽️ List your kitchen →" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/rider/login", className: "inline-flex items-center gap-1.5 text-gold font-bold hover:brightness-110 transition-colors duration-200", children: "🛵 Ride with CampChow →" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/vendor/login", className: "text-white/50 hover:text-white transition-colors duration-200", children: "Vendor Portal" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/rider/login", className: "text-white/50 hover:text-white transition-colors duration-200", children: "Rider Portal" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-white/85 uppercase tracking-wider text-xs mb-4", children: "Zones We Serve" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-x-4 gap-y-2 text-white/45", children: zones.map((z) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/home", className: "hover:text-white transition-colors duration-200 truncate", children: z }, z)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-white/8 px-4 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto max-w-6xl text-[11px] leading-relaxed text-white/35 text-center md:text-left", children: "By continuing past this page, you agree to our Terms of Service and Privacy Policy. A Kingdom Hack 3.0 project · Track B: Commerce and Last-Mile Distribution. 2026 © CampChow™ · Built for Redemption City, Ogun State, Nigeria." }) })
  ] });
}
export {
  Footer as F
};
