import { Link } from "@tanstack/react-router";
import { Menu, X, ShoppingCart, Store, Bike, Home, UtensilsCrossed } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Landing header, Zomato-style:
 * – transparent over the hero photo (white logo + links)
 * – becomes solid white with blur + shadow after 24px of scroll
 * – mobile: hamburger opens a dark slide-in panel from the right
 */
export function SiteHeader() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const linkCls = solid
    ? "text-body hover:text-brand"
    : "text-white/85 hover:text-white";

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          solid ? "bg-card/95 backdrop-blur shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo — recolours with the header */}
          <Link to="/" className="flex items-center gap-2">
            <span className={`grid place-items-center h-9 w-9 rounded-xl transition-colors duration-300 ${solid ? "bg-brand text-white" : "bg-white/15 text-white backdrop-blur"}`}>
              <ShoppingCart size={20} strokeWidth={1.75} />
            </span>
            <span className="font-extrabold tracking-tight text-xl">
              <span className={solid ? "text-brand" : "text-white"}>Camp</span>
              <span className="text-gold">Chow</span>
            </span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/home" className={`text-sm font-semibold transition-colors duration-200 ${linkCls}`}>Order Food</Link>
            <Link to="/vendor/login" className={`text-sm font-semibold transition-colors duration-200 ${linkCls}`}>For Vendors</Link>
            <Link to="/rider/login" className={`text-sm font-semibold transition-colors duration-200 ${linkCls}`}>For Riders</Link>
            <Link
              to="/home"
              className={`tap text-sm font-bold px-5 h-10 rounded-full grid items-center transition-all duration-200 ${
                solid
                  ? "bg-brand text-white hover:bg-brand-mid"
                  : "bg-white text-brand hover:bg-white/90"
              }`}
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(true)}
            className={`md:hidden grid place-items-center h-10 w-10 rounded-full transition-colors ${solid ? "text-body hover:bg-muted" : "text-white hover:bg-white/10"}`}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Backdrop */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/55 animate-fade-in md:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Slide-in panel */}
      <aside className={`menu-panel ${open ? "open" : ""} fixed inset-y-0 right-0 z-50 w-[290px] md:hidden flex flex-col`}
        style={{ background: "linear-gradient(160deg, oklch(0.20 0.025 155), oklch(0.28 0.06 152))" }}>
        <div className="flex items-center justify-between px-5 h-16">
          <span className="font-extrabold text-xl"><span className="text-white">Camp</span><span className="text-gold">Chow</span></span>
          <button onClick={() => setOpen(false)} className="grid place-items-center h-10 w-10 rounded-full text-white/80 hover:bg-white/10" aria-label="Close menu">
            <X size={22} />
          </button>
        </div>
        <nav className="flex-1 px-3 pt-4 space-y-1">
          {[
            { to: "/", label: "Home", icon: Home },
            { to: "/home", label: "Order Food", icon: UtensilsCrossed },
            { to: "/vendor/login", label: "Vendor Portal", icon: Store },
            { to: "/rider/login", label: "Rider Portal", icon: Bike },
          ].map(({ to, label, icon: Icon }) => (
            <Link
              key={label}
              to={to}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 h-12 rounded-xl text-white/85 font-semibold hover:bg-white/10 transition-colors"
            >
              <Icon size={19} strokeWidth={1.75} className="text-gold" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-5">
          <Link to="/home" onClick={() => setOpen(false)}
            className="tap flex items-center justify-center h-12 rounded-xl bg-gold text-dark font-bold">
            Get Started
          </Link>
          <p className="mt-4 text-[11px] text-white/40 text-center">Built for Redemption City</p>
        </div>
      </aside>
    </>
  );
}
