import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth, a as useCart, L as LOCATIONS, g as getAreas, b as getPickupPoints, B as BANKS } from "./router-0qYA4BIB.mjs";
import { T as TopNav } from "./TopNav-D1fXHo1t.mjs";
import { n as naira } from "./format-BZgr6J6c.mjs";
import "../_libs/sonner.mjs";
import { A as ArrowLeft, Z as Zap, b as MapPin, t as Wallet, i as Smartphone, z as CreditCard, L as LoaderCircle, a as Check } from "../_libs/lucide-react.mjs";
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
import "./Logo-C2Ak9cel.mjs";
const DELIVERY = 300;
function Checkout() {
  const navigate = useNavigate();
  const {
    user,
    isLoggedIn,
    requireAuth
  } = useAuth();
  const {
    items,
    subtotal,
    clear
  } = useCart();
  const [step, setStep] = reactExports.useState(1);
  const [name, setName] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [loc, setLoc] = reactExports.useState("");
  const [area, setArea] = reactExports.useState("");
  const [pickup, setPickup] = reactExports.useState("");
  const [notes, setNotes] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (user) {
      setName((n) => n || user.name);
      if (user.phone) setPhone((p) => p || user.phone.replace(/^\+\d+\s*/, ""));
    }
  }, [user]);
  reactExports.useEffect(() => {
    if (!isLoggedIn) requireAuth("Sign in to confirm your delivery details and place your order.");
  }, [isLoggedIn]);
  const [pay, setPay] = reactExports.useState("cash");
  const [bank, setBank] = reactExports.useState("");
  const [card, setCard] = reactExports.useState({
    num: "",
    exp: "",
    cvv: ""
  });
  const [placing, setPlacing] = reactExports.useState(false);
  const service = Math.round(subtotal * 0.05);
  const total = subtotal + DELIVERY + service;
  const step1Valid = name.trim() && /^[0-9+\s-]{7,}$/.test(phone) && loc && area && pickup;
  const step2Valid = pay === "cash" || pay === "ussd" && bank || pay === "card" && card.num && card.exp && card.cvv;
  const place = () => {
    setPlacing(true);
    setTimeout(() => {
      clear();
      navigate({
        to: "/home/order-confirmed"
      });
    }, 1500);
  };
  if (items.length === 0 && !placing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TopNav, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-4 py-16 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Your cart is empty." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/home", className: "mt-4 inline-flex px-5 h-11 items-center rounded-full bg-brand text-primary-foreground font-semibold", children: "Browse vendors" })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TopNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-3xl px-4 py-6 pb-20 pb-safe", style: {
      paddingBottom: "max(5rem, env(safe-area-inset-bottom))"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => step === 1 ? navigate({
        to: "/home/cart"
      }) : setStep(step - 1), className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-brand mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 16 }),
        " Back"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-dark", children: "Checkout" }),
        step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
          setName("Adeola Johnson");
          setPhone("0812 345 6789");
          setLoc("2000 Chalets");
          setArea("Block 501–1000");
          setPickup("Block Entrance");
          setNotes("Call when you reach the block entrance.");
        }, className: "tap inline-flex items-center gap-1.5 px-3.5 h-9 rounded-full bg-gold-light border border-gold/30 text-gold text-xs font-bold hover:brightness-105 transition", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 13 }),
          " Fill demo details"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StepIndicator, { step }),
      step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "animate-fade-up mt-6 bg-card rounded-2xl border border-border p-5 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Full Name", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: name, onChange: (e) => setName(e.target.value), placeholder: "e.g. Brother Daniel", className: inputCls }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Phone Number", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: phone, onChange: (e) => setPhone(e.target.value), placeholder: "08012345678", inputMode: "tel", className: inputCls }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-dark mb-2 inline-flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 15, className: "text-brand" }),
            " Delivery Location ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-error", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { value: loc, onChange: (v) => {
              setLoc(v);
              setArea("");
              setPickup("");
            }, placeholder: "Select Location", options: LOCATIONS }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { value: area, onChange: (v) => {
              setArea(v);
              setPickup("");
            }, placeholder: "Select Area", options: loc ? getAreas(loc) : [], disabled: !loc }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { value: pickup, onChange: setPickup, placeholder: "Select Pickup Point", options: loc && area ? getPickupPoints(loc, area) : [], disabled: !area })
          ] }),
          loc && area && pickup && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 p-3 rounded-xl bg-brand-light text-brand text-sm font-semibold inline-flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 16 }),
            " ",
            loc,
            " › ",
            area,
            " › ",
            pickup
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Delivery Notes (optional)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: notes, onChange: (e) => setNotes(e.target.value), rows: 3, placeholder: "Landmarks, instructions, etc.", className: `${inputCls} py-3 resize-none` }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: !step1Valid, onClick: () => setStep(2), className: "w-full h-12 rounded-xl bg-brand text-primary-foreground font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-mid transition", children: "Continue to Payment" })
      ] }, "s1"),
      step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "animate-fade-up mt-6 bg-card rounded-2xl border border-border p-5 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PayCard, { active: pay === "cash", onClick: () => setPay("cash"), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "text-brand" }), title: "Cash on Delivery", subtitle: "Pay your rider when your order arrives" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PayCard, { active: pay === "ussd", onClick: () => setPay("ussd"), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "text-blueish" }), title: "Pay with USSD", subtitle: "Select your bank and dial. No internet needed." }),
        pay === "ussd" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pl-4 pt-1 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { value: bank, onChange: setBank, placeholder: "Select bank", options: BANKS.map((b) => `${b.name} ${b.code}`) }),
          bank && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-xl bg-success/10 border border-success/30 text-success font-semibold text-sm", children: [
            "Dial ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: bank.split(" ").pop() }),
            " on your phone to complete payment"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PayCard, { active: pay === "card", onClick: () => setPay("card"), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "text-gold" }), title: "Pay with Card", subtitle: "Visa, Mastercard, Verve" }),
        pay === "card" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pl-4 pt-1 grid gap-3 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { placeholder: "Card number", value: card.num, onChange: (e) => setCard({
            ...card,
            num: e.target.value
          }), className: inputCls }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { placeholder: "MM/YY", value: card.exp, onChange: (e) => setCard({
            ...card,
            exp: e.target.value
          }), className: inputCls }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { placeholder: "CVV", value: card.cvv, onChange: (e) => setCard({
            ...card,
            cvv: e.target.value
          }), className: inputCls })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setStep(1), className: "flex-1 h-12 rounded-xl border border-border font-semibold", children: "Back" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: !step2Valid, onClick: () => setStep(3), className: "flex-1 h-12 rounded-xl bg-brand text-primary-foreground font-bold disabled:opacity-50", children: "Review Order" })
        ] })
      ] }, "s2"),
      step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "animate-fade-up mt-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-dark mb-3", children: "Order Items" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between py-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-body", children: [
              it.qty,
              "× ",
              it.name
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: naira(it.price * it.qty) })
          ] }, it.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border p-5 space-y-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Customer", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: name }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Phone", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: phone }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Delivery", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-right", children: [
            loc,
            " › ",
            area,
            " › ",
            pickup
          ] }) }),
          notes && /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Notes", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-right", children: notes }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Payment", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
            pay === "cash" && "Cash on Delivery",
            pay === "ussd" && `USSD · ${bank}`,
            pay === "card" && `Card · ${card.num.slice(-4).padStart(4, "•")}`
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border p-5 space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Subtotal", children: naira(subtotal) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Delivery", children: naira(DELIVERY) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Service Fee", children: naira(service) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-3 mt-2 border-t border-border flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-dark", children: "Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-extrabold text-xl text-dark", children: naira(total) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: place, disabled: placing, className: "tap w-full h-14 rounded-2xl bg-brand text-primary-foreground font-bold text-base hover:bg-brand-mid transition inline-flex items-center justify-center gap-2 disabled:opacity-80", children: placing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "animate-spin", size: 20 }),
          " Placing order…"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "Place Order · ",
          naira(total)
        ] }) })
      ] }, "s3")
    ] })
  ] });
}
const inputCls = "w-full h-11 px-4 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand text-sm";
function Field({
  label,
  required,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-sm font-semibold text-dark mb-1.5 block", children: [
      label,
      " ",
      required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-error", children: "*" })
    ] }),
    children
  ] });
}
function Select({
  value,
  onChange,
  placeholder,
  options,
  disabled
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value, onChange: (e) => onChange(e.target.value), disabled, className: `${inputCls} disabled:opacity-50 disabled:cursor-not-allowed appearance-none bg-no-repeat`, style: {
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%234A6355' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
    backgroundPosition: "right 0.85rem center"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: placeholder }),
    options.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o, children: o }, o))
  ] });
}
function PayCard({
  active,
  onClick,
  icon,
  title,
  subtitle
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick, className: `w-full flex items-start gap-3 p-4 rounded-xl border-2 text-left transition ${active ? "border-brand bg-brand-light/50" : "border-border bg-card hover:border-brand/40"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-10 w-10 rounded-xl bg-background grid place-items-center shrink-0", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block font-semibold text-dark", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-sm text-muted-foreground", children: subtitle })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-5 w-5 rounded-full border-2 grid place-items-center shrink-0 ${active ? "border-brand bg-brand" : "border-border"}`, children: active && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 12, className: "text-primary-foreground", strokeWidth: 3 }) })
  ] });
}
function Row({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-body", children })
  ] });
}
function StepIndicator({
  step
}) {
  const labels = ["Delivery", "Payment", "Review"];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex items-center gap-2", children: labels.map((l, i) => {
    const n = i + 1;
    const done = n < step;
    const active = n === step;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-8 w-8 rounded-full grid place-items-center text-sm font-bold shrink-0 ${done ? "bg-brand text-primary-foreground" : active ? "bg-brand text-primary-foreground ring-4 ring-brand-light" : "bg-muted text-muted-foreground"}`, children: done ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 16 }) : n }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-sm font-semibold hidden sm:inline ${active ? "text-dark" : "text-muted-foreground"}`, children: l }),
      i < labels.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex-1 h-0.5 ${done ? "bg-brand" : "bg-border"}` })
    ] }, l);
  }) });
}
export {
  Checkout as component
};
