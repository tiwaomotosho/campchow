import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { T as TopNav } from "./TopNav-D1fXHo1t.mjs";
import { a as useCart } from "./router-0qYA4BIB.mjs";
import { n as naira } from "./format-BZgr6J6c.mjs";
import "../_libs/sonner.mjs";
import { A as ArrowLeft, m as ShoppingBag, a7 as Minus, a8 as Plus, X, a as Check, a9 as CircleAlert } from "../_libs/lucide-react.mjs";
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
const DELIVERY = 300;
function Cart() {
  const {
    items,
    setQty,
    remove,
    subtotal
  } = useCart();
  const [promo, setPromo] = reactExports.useState("");
  const [promoState, setPromoState] = reactExports.useState("idle");
  const discount = promoState === "valid" ? Math.round(subtotal * 0.1) : 0;
  const service = Math.round(subtotal * 0.05);
  const total = Math.max(0, subtotal + DELIVERY + service - discount);
  const applyPromo = () => {
    setPromoState(promo.trim().toUpperCase() === "CAMP10" ? "valid" : "invalid");
  };
  const empty = items.length === 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TopNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-3xl px-4 py-6 pb-32", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/home", className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-brand mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 16 }),
        " Continue shopping"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-dark", children: "Your Cart" }),
      empty ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 text-center py-16 bg-card rounded-2xl border border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto h-16 w-16 rounded-full bg-brand-light grid place-items-center text-brand", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 28 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 font-bold text-lg text-dark", children: "Your cart is empty" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Add some delicious meals to get started." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/home", className: "mt-6 inline-flex items-center px-5 h-11 rounded-full bg-brand text-primary-foreground font-semibold", children: "Browse vendors" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 bg-card rounded-2xl border border-border divide-y divide-border", children: items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: it.image, alt: it.name, className: "h-16 w-16 rounded-xl object-cover bg-muted" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-dark truncate", children: it.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: naira(it.price) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center bg-background border border-border rounded-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty(it.id, it.qty - 1), className: "h-8 w-8 grid place-items-center text-brand", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 14 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 text-center text-sm font-bold", children: it.qty }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty(it.id, it.qty + 1), className: "h-8 w-8 grid place-items-center text-brand", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => remove(it.id), className: "h-8 w-8 grid place-items-center rounded-full text-muted-foreground hover:bg-error/10 hover:text-error", "aria-label": "Remove", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 }) })
        ] }, it.id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 bg-card rounded-2xl border border-border p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-dark mb-2", children: "Promo code" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: promo, onChange: (e) => {
              setPromo(e.target.value);
              setPromoState("idle");
            }, placeholder: "Enter code (try CAMP10)", className: "flex-1 h-11 px-4 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand text-sm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: applyPromo, className: "px-5 h-11 rounded-xl bg-dark text-white text-sm font-semibold", children: "Apply" })
          ] }),
          promoState === "valid" && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-success inline-flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 14 }),
            " CAMP10 applied — 10% off subtotal"
          ] }),
          promoState === "invalid" && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-error inline-flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 14 }),
            " Invalid promo code"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 bg-card rounded-2xl border border-border p-5 space-y-2.5 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: naira(subtotal) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Delivery Fee" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: naira(DELIVERY) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Service Fee (5%)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: naira(service) })
          ] }),
          discount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-success", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Discount (CAMP10)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
              "-",
              naira(discount)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-3 mt-2 border-t border-border flex justify-between text-base", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-dark", children: "Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-extrabold text-dark text-xl", children: naira(total) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/home/checkout", className: "mt-5 flex items-center justify-center h-14 rounded-2xl bg-brand text-primary-foreground font-bold text-base shadow-sm hover:bg-brand-mid transition", children: [
          "Proceed to Checkout · ",
          naira(total)
        ] })
      ] })
    ] })
  ] });
}
export {
  Cart as component
};
