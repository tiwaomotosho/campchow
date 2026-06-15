import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, X, ShoppingCart, Store, Bike, Home, UtensilsCrossed, LogOut, User, Sun, Moon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useTheme } from "@/hooks/use-theme";

/**
 * Landing header, Zomato-style:
 * – transparent over the hero photo (white logo + links)
 * – becomes solid white with blur + shadow after 24px of scroll
 * – mobile: hamburger opens a dark slide-in panel from the right
 */
export function SiteHeader() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const { isLoggedIn, user, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();

  // close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              className={`tap grid place-items-center h-9 w-9 rounded-full transition-colors ${solid ? "hover:bg-muted text-body" : "text-white hover:bg-white/15"}`}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            {isLoggedIn && user ? (
              <div className="relative" ref={dropRef}>
                <button
                  onClick={() => setDropOpen((v) => !v)}
                  className={`tap flex items-center gap-2 px-3 h-10 rounded-full font-semibold text-sm transition-all duration-200 ${
                    solid ? "bg-muted text-body hover:bg-muted/80" : "bg-white/15 text-white hover:bg-white/25 backdrop-blur"
                  }`}
                >
                  <span className="h-6 w-6 rounded-full bg-brand text-white grid place-items-center text-xs font-bold shrink-0">
                    {user.name[0].toUpperCase()}
                  </span>
                  <span className="max-w-[100px] truncate">{user.name.split(" ")[0]}</span>
                </button>
                {dropOpen && (
                  <div className="absolute right-0 top-12 w-48 bg-card border border-border rounded-2xl shadow-xl p-2 z-50 animate-fade-in">
                    <div className="px-3 py-2 border-b border-border mb-1">
                      <p className="text-xs font-semibold text-dark truncate">{user.name}</p>
                      {user.email && <p className="text-xs text-muted-foreground truncate">{user.email}</p>}
                    </div>
                    <button
                      onClick={() => { logout(); setDropOpen(false); navigate({ to: "/" }); }}
                      className="w-full flex items-center gap-2.5 px-3 h-10 rounded-xl text-sm font-semibold text-error hover:bg-error/10 transition-colors"
                    >
                      <LogOut size={15} /> Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
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
            )}
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
        <div className="p-5 space-y-3">
          {isLoggedIn && user ? (
            <>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10">
                <span className="h-8 w-8 rounded-full bg-brand text-white grid place-items-center text-sm font-bold shrink-0">
                  {user.name[0].toUpperCase()}
                </span>
                <div className="min-w-0">
                  <p className="text-white font-semibold text-sm truncate">{user.name.split(" ")[0]}</p>
                  {user.email && <p className="text-white/50 text-xs truncate">{user.email}</p>}
                </div>
              </div>
              <button
                onClick={() => { logout(); setOpen(false); navigate({ to: "/" }); }}
                className="tap w-full flex items-center justify-center gap-2 h-12 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition"
              >
                <LogOut size={16} /> Sign out
              </button>
            </>
          ) : (
            <Link to="/home" onClick={() => setOpen(false)}
              className="tap flex items-center justify-center h-12 rounded-xl bg-gold text-dark font-bold">
              Get Started
            </Link>
          )}
          <p className="text-[11px] text-white/40 text-center">Built for Redemption City</p>
        </div>
      </aside>
    </>
  );
}
