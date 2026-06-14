import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { L as Logo } from "./Logo-C2Ak9cel.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { S as ShieldCheck, Z as Zap, s as User, i as Smartphone, b as MapPin, x as Lock, E as EyeOff, y as Eye, B as Bike, w as ChevronRight, A as ArrowLeft } from "../_libs/lucide-react.mjs";
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
const ZONES = ["Youth Centre", "2000 Chalets", "Old Auditorium", "Mission House", "RECTEM", "Emmanuel Park", "Estate 12", "Estate 13", "The Pavilion", "Main Gate"];
const VEHICLES = ["Motorbike", "Bicycle", "On foot"];
function RiderLogin() {
  const navigate = useNavigate();
  const [mode, setMode] = reactExports.useState("choice");
  const [loading, setLoading] = reactExports.useState(false);
  const [riderId, setRiderId] = reactExports.useState("");
  const [pwd, setPwd] = reactExports.useState("");
  const [show, setShow] = reactExports.useState(false);
  const [name, setName] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [estateId, setEstateId] = reactExports.useState("");
  const [vehicle, setVehicle] = reactExports.useState("");
  const [zone, setZone] = reactExports.useState("");
  const fillDemo = () => {
    setRiderId("RC-2024-04821");
    setPwd("demo1234");
  };
  const fillReg = () => {
    setName("Brother Emmanuel Adeyemi");
    setPhone("08012345678");
    setEstateId("RC-2024-04821");
    setVehicle("Motorbike");
    setZone("Youth Centre");
  };
  const goSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate({
        to: "/rider/dashboard"
      });
    }, 1200);
  };
  const goPending = () => {
    if (!name || !estateId || !vehicle) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMode("pending");
    }, 1e3);
  };
  const inp = "w-full h-11 pl-10 pr-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold text-sm transition";
  const Shell = ({
    children
  }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-brand", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 16 }),
      " Back"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 grid place-items-center px-4 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-14 w-14 rounded-2xl bg-gold-light text-gold grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bike, { size: 28, strokeWidth: 1.75 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground", children: "Rider Portal" })
      ] }),
      children
    ] }) })
  ] });
  if (mode === "pending") return /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-8 shadow-sm text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-full bg-amber/15 grid place-items-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 32, className: "text-amber" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-dark", children: "Application submitted!" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-2 leading-relaxed", children: [
      "We're verifying your estate ID ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-dark font-mono", children: estateId }),
      ". You'll be notified once activated."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 p-4 rounded-xl bg-amber/10 border border-amber/20 text-left space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase text-amber tracking-wider", children: "Verification steps" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-body", children: "1. Estate ID verified against camp records" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-body", children: "2. Phone confirmation sent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-body", children: "3. Go Online toggle activated on your dashboard" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "tap mt-6 inline-flex items-center justify-center w-full h-12 rounded-xl bg-gold text-dark font-bold hover:brightness-105 transition", children: "Return Home" })
  ] }) });
  if (mode === "register") return /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-6 shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-dark", children: "Join the rider network" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: fillReg, className: "tap inline-flex items-center gap-1 px-3 h-8 rounded-full bg-gold-light text-gold text-xs font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 12 }),
        " Fill demo"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Full name", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 15, className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: name, onChange: (e) => setName(e.target.value), placeholder: "e.g. Brother Emmanuel Adeyemi", className: inp })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Phone number", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { size: 15, className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: phone, onChange: (e) => setPhone(e.target.value), placeholder: "08012345678", className: inp })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "Redemption City Estate ID", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 15, className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: estateId, onChange: (e) => setEstateId(e.target.value), placeholder: "RC-2024-XXXXX", className: inp + " font-mono" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-1", children: "Your estate ID is used to verify you are a camp resident." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Vehicle type", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: VEHICLES.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setVehicle(v), className: `tap px-4 h-10 rounded-full text-sm font-semibold border transition ${vehicle === v ? "bg-gold text-dark border-gold" : "bg-background border-border text-body"}`, children: v }, v)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Preferred delivery zone", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 15, className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: zone, onChange: (e) => setZone(e.target.value), className: inp, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select zone…" }),
          ZONES.map((z) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: z }, z))
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: goPending, disabled: loading, className: "tap mt-6 w-full h-12 rounded-xl bg-gold text-dark font-bold hover:brightness-105 transition disabled:opacity-50", children: loading ? "Submitting…" : "Submit Application" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-center text-xs text-muted-foreground", children: [
      "Already registered? ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMode("signin"), className: "text-brand font-semibold", children: "Sign in" })
    ] })
  ] }) });
  if (mode === "signin") return /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-6 shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-dark", children: "Welcome back, rider" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: fillDemo, className: "tap inline-flex items-center gap-1 px-3 h-8 rounded-full bg-gold-light text-gold text-xs font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 12 }),
        " Demo login"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Estate ID or Phone", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 15, className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: riderId, onChange: (e) => setRiderId(e.target.value), placeholder: "RC-2024-04821", className: inp + " font-mono" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Password", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 15, className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: pwd, onChange: (e) => setPwd(e.target.value), type: show ? "text" : "password", placeholder: "••••••••", className: inp + " pr-10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShow(!show), className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground", children: show ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 15 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 15 }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: goSignIn, disabled: loading, className: "tap mt-6 w-full h-12 rounded-xl bg-gold text-dark font-bold hover:brightness-105 transition disabled:opacity-50", children: loading ? "Signing in…" : "Login as Rider" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-center text-xs text-muted-foreground", children: [
      "New rider? ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMode("register"), className: "text-brand font-semibold", children: "Join the network" })
    ] })
  ] }) });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setMode("signin"), className: "tap w-full flex items-center gap-4 bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-gold/30 hover:-translate-y-0.5 transition-all", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-12 w-12 rounded-xl bg-gold-light grid place-items-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bike, { size: 22, className: "text-gold" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-dark", children: "Sign in to my account" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Existing rider dashboard" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 18, className: "text-muted-foreground" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setMode("register"), className: "tap w-full flex items-center gap-4 rounded-2xl p-5 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all", style: {
      background: "linear-gradient(135deg, oklch(0.62 0.13 78), oklch(0.50 0.11 70))"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-12 w-12 rounded-xl bg-white/20 grid place-items-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bike, { size: 22, className: "text-white" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-white", children: "Join the rider network" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/70", children: "Register with your estate ID" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 18, className: "text-white/70" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground pt-2", children: "Requires a valid Redemption City estate ID" })
  ] }) });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5", children: label }),
    children
  ] });
}
export {
  RiderLogin as component
};
