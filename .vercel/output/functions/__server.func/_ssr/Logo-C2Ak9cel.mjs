import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { g as ShoppingCart } from "../_libs/lucide-react.mjs";
function Logo({ size = "md" }) {
  const text = size === "lg" ? "text-3xl" : size === "sm" ? "text-lg" : "text-xl";
  const icon = size === "lg" ? 28 : size === "sm" ? 18 : 22;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 group", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid place-items-center h-9 w-9 rounded-xl bg-brand text-primary-foreground shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { size: icon, strokeWidth: 1.75 }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `font-extrabold tracking-tight ${text}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand", children: "Camp" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold", children: "Chow" })
    ] })
  ] });
}
export {
  Logo as L
};
