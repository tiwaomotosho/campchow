import { Link } from "@tanstack/react-router";
import { ShoppingCart, Menu, X, Home, UtensilsCrossed, Store, Bike, User as UserIcon, LogOut, ClipboardList, Heart, Sun, Moon } from "lucide-react";
import { Logo } from "./Logo";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { toast } from "sonner";

export function TopNav() {
  const { count } = useCart();
  const { user, isLoggedIn, logout, requireAuth } = useAuth();
  const { theme, toggle } = useTheme();
  const prevCount = useRef(count);
  const [popping, setPopping] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (count > prevCount.current) {
      setPopping(true);
      const t = setTimeout(() => setPopping(false), 350);
      prevCount.current = count;
      return () => clearTimeout(t);
    }
    prevCount.current = count;
  }, [count]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const initials = user?.name.split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("") ?? "";

  return (
    <>
      <header className="sticky top-0 z-40 bg-card/90 backdrop-blur border-b border-border">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button onClick={() => setOpen(true)} className="md:hidden grid place-items-center h-10 w-10 -ml-2 rounded-full text-body hover:bg-muted" aria-label="Open menu"><Menu size={22} /></button>
            <Logo />
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <Link to="/home" className="px-4 h-9 rounded-full text-sm font-semibold text-body hover:text-brand hover:bg-brand-light transition flex items-center">Browse Vendors</Link>
            <a href="#how-it-works" className="px-4 h-9 rounded-full text-sm font-semibold text-body hover:text-brand hover:bg-brand-light transition flex items-center">How It Works</a>
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={toggle} aria-label="Toggle dark mode" className="grid place-items-center h-10 w-10 rounded-full hover:bg-muted transition text-body">
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Link to="/home/cart" className="relative grid place-items-center h-10 w-10 rounded-full hover:bg-muted transition" aria-label={`Cart — ${count} items`}>
              <ShoppingCart size={22} strokeWidth={1.75} className="text-body" />
              {count > 0 && <span className={`absolute -top-0.5 -right-0.5 h-5 min-w-5 px-1 rounded-full bg-gold text-white text-[11px] font-bold grid place-items-center ${popping ? "animate-badge-pop" : ""}`}>{count}</span>}
            </Link>

            {isLoggedIn ? (
              <div className="relative">
                <button onClick={() => setMenuOpen((v) => !v)} className="h-9 w-9 rounded-full bg-brand text-white grid place-items-center font-bold text-sm hover:bg-brand-mid transition" aria-label="Account">
                  {initials}
                </button>
                {menuOpen && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setMenuOpen(false)} />
                    <div className="absolute right-0 top-11 z-40 w-52 bg-card border border-border rounded-xl shadow-xl p-1.5 animate-fade-in">
                      <div className="px-3 py-2">
                        <p className="text-xs text-muted-foreground">Signed in as</p>
                        <p className="font-semibold text-dark truncate">{user?.name}</p>
                      </div>
                      <div className="h-px bg-border my-1" />
                      <button onClick={() => { setMenuOpen(false); toast.info("Order history — coming soon"); }} className="w-full flex items-center gap-2.5 px-3 h-10 rounded-lg hover:bg-muted text-sm text-body"><ClipboardList size={16} className="text-brand" /> Order History</button>
                      <button onClick={() => { setMenuOpen(false); toast.info("Saved addresses — coming soon"); }} className="w-full flex items-center gap-2.5 px-3 h-10 rounded-lg hover:bg-muted text-sm text-body"><Heart size={16} className="text-brand" /> Saved Places</button>
                      <div className="h-px bg-border my-1" />
                      <button onClick={() => { setMenuOpen(false); logout(); toast("Signed out"); }} className="w-full flex items-center gap-2.5 px-3 h-10 rounded-lg hover:bg-muted text-sm text-error"><LogOut size={16} /> Sign Out</button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button onClick={() => requireAuth()} className="tap hidden sm:inline-flex items-center gap-1.5 px-4 h-9 rounded-full bg-brand text-white text-sm font-bold hover:bg-brand-mid transition">
                <UserIcon size={15} /> Sign in
              </button>
            )}
          </div>
        </div>
      </header>

      {open && <div className="fixed inset-0 z-50 bg-black/55 animate-fade-in md:hidden" onClick={() => setOpen(false)} />}
      <aside className={`menu-panel ${open ? "open" : ""} fixed inset-y-0 left-0 z-50 w-[280px] md:hidden flex flex-col`}
        style={{ background: "linear-gradient(160deg, oklch(0.20 0.025 155), oklch(0.28 0.06 152))", transform: open ? "translateX(0)" : "translateX(-100%)" }}>
        <div className="flex items-center justify-between px-5 h-16">
          <span className="font-extrabold text-xl"><span className="text-white">Camp</span><span className="text-gold">Chow</span></span>
          <button onClick={() => setOpen(false)} className="grid place-items-center h-10 w-10 rounded-full text-white/80 hover:bg-white/10" aria-label="Close menu"><X size={22} /></button>
        </div>
        {isLoggedIn && (
          <div className="px-5 pb-3 flex items-center gap-3">
            <span className="h-10 w-10 rounded-full bg-white/15 text-white grid place-items-center font-bold">{initials}</span>
            <div className="min-w-0"><p className="text-white font-semibold truncate">{user?.name}</p><p className="text-white/45 text-xs">Signed in</p></div>
          </div>
        )}
        <nav className="flex-1 px-3 pt-2 space-y-1">
          {[
            { to: "/", label: "Home", icon: Home },
            { to: "/home", label: "Browse Vendors", icon: UtensilsCrossed },
            { to: "/vendor/login", label: "Vendor Portal", icon: Store },
            { to: "/rider/login", label: "Rider Portal", icon: Bike },
          ].map(({ to, label, icon: Icon }) => (
            <Link key={label} to={to} onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 h-12 rounded-xl text-white/85 font-semibold hover:bg-white/10 transition-colors">
              <Icon size={19} strokeWidth={1.75} className="text-gold" />{label}
            </Link>
          ))}
        </nav>
        <div className="px-3 pb-2">
          <button onClick={toggle} className="w-full flex items-center gap-3 px-4 h-12 rounded-xl text-white/85 font-semibold hover:bg-white/10 transition-colors">
            {theme === "dark" ? <Sun size={19} className="text-gold" /> : <Moon size={19} className="text-gold" />}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
        <div className="p-5 pt-0">
          {isLoggedIn ? (
            <button onClick={() => { setOpen(false); logout(); toast("Signed out"); }} className="tap w-full h-12 rounded-xl bg-white/10 text-white font-bold flex items-center justify-center gap-2"><LogOut size={17} /> Sign Out</button>
          ) : (
            <button onClick={() => { setOpen(false); requireAuth(); }} className="tap w-full h-12 rounded-xl bg-gold text-dark font-bold flex items-center justify-center gap-2"><UserIcon size={17} /> Sign in / Sign up</button>
          )}
        </div>
      </aside>
    </>
  );
}
