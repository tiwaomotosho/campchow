import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { L as Logo } from "./Logo-C2Ak9cel.mjs";
import { a as useCart, u as useAuth } from "./router-0qYA4BIB.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { h as Menu, g as ShoppingCart, p as ClipboardList, q as Heart, r as LogOut, s as User, X, H as House, U as UtensilsCrossed, d as Store, B as Bike } from "../_libs/lucide-react.mjs";
function TopNav() {
  const { count } = useCart();
  const { user, isLoggedIn, logout, requireAuth } = useAuth();
  const prevCount = reactExports.useRef(count);
  const [popping, setPopping] = reactExports.useState(false);
  const [open, setOpen] = reactExports.useState(false);
  const [menuOpen, setMenuOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (count > prevCount.current) {
      setPopping(true);
      const t = setTimeout(() => setPopping(false), 350);
      prevCount.current = count;
      return () => clearTimeout(t);
    }
    prevCount.current = count;
  }, [count]);
  reactExports.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  const initials = user?.name.split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("") ?? "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-40 bg-card/90 backdrop-blur border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setOpen(true), className: "md:hidden grid place-items-center h-10 w-10 -ml-2 rounded-full text-body hover:bg-muted", "aria-label": "Open menu", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { size: 22 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {})
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden md:flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/home", className: "px-4 h-9 rounded-full text-sm font-semibold text-body hover:text-brand hover:bg-brand-light transition flex items-center", children: "Browse Vendors" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#how-it-works", className: "px-4 h-9 rounded-full text-sm font-semibold text-body hover:text-brand hover:bg-brand-light transition flex items-center", children: "How It Works" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/home/cart", className: "relative grid place-items-center h-10 w-10 rounded-full hover:bg-muted transition", "aria-label": `Cart — ${count} items`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { size: 22, strokeWidth: 1.75, className: "text-body" }),
          count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `absolute -top-0.5 -right-0.5 h-5 min-w-5 px-1 rounded-full bg-gold text-white text-[11px] font-bold grid place-items-center ${popping ? "animate-badge-pop" : ""}`, children: count })
        ] }),
        isLoggedIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMenuOpen((v) => !v), className: "h-9 w-9 rounded-full bg-brand text-white grid place-items-center font-bold text-sm hover:bg-brand-mid transition", "aria-label": "Account", children: initials }),
          menuOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-30", onClick: () => setMenuOpen(false) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-0 top-11 z-40 w-52 bg-card border border-border rounded-xl shadow-xl p-1.5 animate-fade-in", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Signed in as" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-dark truncate", children: user?.name })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-border my-1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
                setMenuOpen(false);
                toast.info("Order history — coming soon");
              }, className: "w-full flex items-center gap-2.5 px-3 h-10 rounded-lg hover:bg-muted text-sm text-body", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { size: 16, className: "text-brand" }),
                " Order History"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
                setMenuOpen(false);
                toast.info("Saved addresses — coming soon");
              }, className: "w-full flex items-center gap-2.5 px-3 h-10 rounded-lg hover:bg-muted text-sm text-body", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 16, className: "text-brand" }),
                " Saved Places"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-border my-1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
                setMenuOpen(false);
                logout();
                toast("Signed out");
              }, className: "w-full flex items-center gap-2.5 px-3 h-10 rounded-lg hover:bg-muted text-sm text-error", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 16 }),
                " Sign Out"
              ] })
            ] })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => requireAuth(), className: "tap hidden sm:inline-flex items-center gap-1.5 px-4 h-9 rounded-full bg-brand text-white text-sm font-bold hover:bg-brand-mid transition", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 15 }),
          " Sign in"
        ] })
      ] })
    ] }) }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 bg-black/55 animate-fade-in md:hidden", onClick: () => setOpen(false) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "aside",
      {
        className: `menu-panel ${open ? "open" : ""} fixed inset-y-0 left-0 z-50 w-[280px] md:hidden flex flex-col`,
        style: { background: "linear-gradient(160deg, oklch(0.20 0.025 155), oklch(0.28 0.06 152))", transform: open ? "translateX(0)" : "translateX(-100%)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 h-16", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-extrabold text-xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white", children: "Camp" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold", children: "Chow" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setOpen(false), className: "grid place-items-center h-10 w-10 rounded-full text-white/80 hover:bg-white/10", "aria-label": "Close menu", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 22 }) })
          ] }),
          isLoggedIn && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-3 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-10 w-10 rounded-full bg-white/15 text-white grid place-items-center font-bold", children: initials }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-semibold truncate", children: user?.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/45 text-xs", children: "Signed in" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 px-3 pt-2 space-y-1", children: [
            { to: "/", label: "Home", icon: House },
            { to: "/home", label: "Browse Vendors", icon: UtensilsCrossed },
            { to: "/vendor/login", label: "Vendor Portal", icon: Store },
            { to: "/rider/login", label: "Rider Portal", icon: Bike }
          ].map(({ to, label, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to, onClick: () => setOpen(false), className: "flex items-center gap-3 px-4 h-12 rounded-xl text-white/85 font-semibold hover:bg-white/10 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 19, strokeWidth: 1.75, className: "text-gold" }),
            label
          ] }, label)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5", children: isLoggedIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
            setOpen(false);
            logout();
            toast("Signed out");
          }, className: "tap w-full h-12 rounded-xl bg-white/10 text-white font-bold flex items-center justify-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 17 }),
            " Sign Out"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
            setOpen(false);
            requireAuth();
          }, className: "tap w-full h-12 rounded-xl bg-gold text-dark font-bold flex items-center justify-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 17 }),
            " Sign in / Sign up"
          ] }) })
        ]
      }
    )
  ] });
}
export {
  TopNav as T
};
