import React from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft, Star, Clock, MapPin, Minus, Plus, ShoppingBag,
  Flame, Leaf, Award, ShieldCheck, Lock, ShoppingCart,
} from "lucide-react";
import { VENDORS, getVendorMenu, type MenuItem } from "@/lib/data";
import { naira } from "@/lib/format";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { SmartImage } from "@/components/SmartImage";

export const Route = createFileRoute("/home/vendor/$id")({
  component: VendorMenu,
});

const tagStyle = {
  Popular: "bg-gold-light text-gold",
  Spicy:   "bg-error/15 text-error",
  Vegan:   "bg-success/15 text-success",
  Halal:   "bg-blueish/15 text-blueish",
} as const;
const tagIcon = { Popular: Award, Spicy: Flame, Vegan: Leaf, Halal: ShieldCheck } as const;

function Tag({ label }: { label: keyof typeof tagStyle }) {
  const Icon = tagIcon[label];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${tagStyle[label]}`}>
      <Icon size={11} strokeWidth={2} /> {label}
    </span>
  );
}

function ItemRow({ item, vendorId, locked }: { item: MenuItem; vendorId: string; locked: boolean }) {
  const { items, add, setQty } = useCart();
  const { isLoggedIn, requireAuth } = useAuth();
  const line = items.find((l) => l.id === item.id);
  return (
    <div className="flex gap-4 py-4 border-b border-border last:border-0">
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-dark">{item.name}</h4>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{item.description}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {item.tags?.map((t) => <Tag key={t} label={t} />)}
        </div>
        <p className="mt-3 font-bold text-lg text-dark">{naira(item.price)}</p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <SmartImage
          src={item.image}
          fallbackSrc={item.imageFallback}
          alt={item.name}
          seed={item.name}
          className="h-[90px] w-[90px] rounded-xl bg-muted shrink-0"
        />
        {locked ? (
          <span className="inline-flex items-center gap-1 px-3 h-9 rounded-full bg-muted text-muted-foreground text-sm font-semibold cursor-not-allowed">
            <Lock size={13} /> Closed
          </span>
        ) : line ? (
          <div className="inline-flex items-center bg-card border border-brand rounded-full overflow-hidden shadow-sm">
            <button onClick={() => setQty(item.id, line.qty - 1)} className="h-9 w-9 grid place-items-center text-brand hover:bg-brand-light"><Minus size={15} /></button>
            <span className="w-7 text-center text-sm font-bold">{line.qty}</span>
            <button onClick={() => setQty(item.id, line.qty + 1)} className="h-9 w-9 grid place-items-center text-brand hover:bg-brand-light"><Plus size={15} /></button>
          </div>
        ) : (
          <button onClick={() => isLoggedIn ? add(item, vendorId) : requireAuth("Sign in to start your order and add items to cart.", item, vendorId)}
            className="tap px-4 h-9 rounded-full bg-brand text-primary-foreground text-sm font-semibold hover:bg-brand-mid transition shadow-sm">
            Add
          </button>
        )}
      </div>
    </div>
  );
}


/* ── Reviews ──────────────────────────────────────────── */
const REVIEWS_DATA: Record<string, { name: string; rating: number; date: string; comment: string }[]> = {
  default: [
    { name: "Sister Funke", rating: 5, date: "May 25", comment: "Absolutely delicious! The jollof rice was smoky and the chicken was perfectly grilled. Delivery was fast. The rider came straight to my chalet entrance." },
    { name: "Brother Tunde", rating: 4, date: "May 24", comment: "Very good food. The portions are generous and the taste is authentic. Only wish the egusi had a bit more stock. Will definitely order again." },
    { name: "Sister Adaeze", rating: 5, date: "May 23", comment: "Best food on the camp period. Mama Titi's kitchen never disappoints. The fried rice was exceptional." },
    { name: "Brother Samuel", rating: 5, date: "May 22", comment: "Ordered for myself and my family of 4. Everyone was happy. The moin moin was a bonus surprise!" },
    { name: "Sister Grace", rating: 4, date: "May 21", comment: "Consistently good. This is my go-to every programme. The zobo is refreshing and very reasonably priced." },
  ],
};

function ReviewStars({ n }: { n: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1,2,3,4,5].map(i=>(
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={i<=n?"oklch(0.62 0.13 78)":"oklch(0.85 0.01 150)"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </span>
  );
}

function ReviewsSection({ vendorId, isLoggedIn, requireAuth }: { vendorId: string; isLoggedIn: boolean; requireAuth: (r?:string)=>void }) {
  const [showAll, setShowAll] = React.useState(false);
  const all = REVIEWS_DATA[vendorId] ?? REVIEWS_DATA.default;
  const visible = (!isLoggedIn || !showAll) ? all.slice(0,2) : all;
  const avg = (all.reduce((s,r)=>s+r.rating,0)/all.length).toFixed(1);
  return (
    <section className="pt-6 scroll-mt-16">
      <div className="flex items-center justify-between gap-3 mx-auto max-w-3xl px-4 mb-3">
        <h2 className="text-lg font-bold text-dark inline-flex items-center gap-2">
          Reviews
          <span className="inline-flex items-center gap-1 text-sm font-normal text-muted-foreground">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="oklch(0.62 0.13 78)"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            {avg} · {all.length} reviews
          </span>
        </h2>
        {isLoggedIn && (
          <button onClick={()=>toast.info("Leave a review after placing an order")} className="tap px-3 h-8 rounded-full bg-brand-light text-brand text-xs font-bold hover:bg-brand-light/80">Write a review</button>
        )}
      </div>
      <div className="mx-auto max-w-3xl px-4 space-y-3">
        {visible.map((r,i)=>(
          <div key={i} className="bg-card border border-border rounded-2xl p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="h-9 w-9 rounded-full bg-brand text-white grid place-items-center font-bold text-sm shrink-0">{r.name[0]}</span>
                <div><p className="font-semibold text-dark text-sm">{r.name}</p><ReviewStars n={r.rating}/></div>
              </div>
              <span className="text-xs text-muted-foreground shrink-0">{r.date}</span>
            </div>
            <p className="mt-2.5 text-sm text-body leading-relaxed">{r.comment}</p>
          </div>
        ))}

        {/* guest blur gate */}
        {!isLoggedIn && (
          <div className="relative">
            <div className="pointer-events-none select-none rounded-2xl overflow-hidden">
              <div className="bg-card border border-border rounded-2xl p-4 opacity-40 blur-[3px]">
                <div className="flex items-center gap-2.5 mb-2"><span className="h-9 w-9 rounded-full bg-muted"/><div className="space-y-1.5"><div className="h-3 w-24 rounded bg-muted"/><div className="h-2.5 w-16 rounded bg-muted"/></div></div>
                <div className="space-y-1"><div className="h-3 w-full rounded bg-muted"/><div className="h-3 w-3/4 rounded bg-muted"/></div>
              </div>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/80 backdrop-blur-sm rounded-2xl border border-border">
              <p className="text-sm font-semibold text-dark text-center px-4">Sign in to read all {all.length} reviews</p>
              <button onClick={()=>requireAuth("Sign in to read the full community reviews.")} className="tap px-5 h-9 rounded-full bg-brand text-white text-sm font-bold hover:bg-brand-mid">Sign in</button>
            </div>
          </div>
        )}

        {isLoggedIn && !showAll && all.length > 2 && (
          <button onClick={()=>setShowAll(true)} className="tap w-full h-10 rounded-xl border border-border text-sm font-semibold text-body hover:bg-muted transition">
            Show all {all.length} reviews
          </button>
        )}
      </div>
    </section>
  );
}

function VendorMenu() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { count, subtotal } = useCart();
  const { isLoggedIn, requireAuth } = useAuth();
  const vendor = VENDORS.find((v) => v.id === id) ?? VENDORS[0];
  const menu = useMemo(() => getVendorMenu(vendor), [vendor]);
  const locked = !vendor.open;
  const [activeSection, setActiveSection] = useState(menu[0]?.id ?? "");
  const [showStickyBar, setShowStickyBar] = useState(false);
  const coverRef = useRef<HTMLDivElement>(null);

  // sticky back-bar appears once the cover scrolls out of view
  useEffect(() => {
    const el = coverRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setShowStickyBar(!e.isIntersecting),
      { threshold: 0, rootMargin: "-60px 0px 0px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* sticky back bar — always reachable (fixes desktop "scroll to top" issue) */}
      <div className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${showStickyBar ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}>
        <div className="bg-card/95 backdrop-blur border-b border-border">
          <div className="mx-auto max-w-3xl px-4 h-14 flex items-center justify-between gap-3">
            <button onClick={() => navigate({ to: "/home" })} className="inline-flex items-center gap-2 font-semibold text-body hover:text-brand">
              <ArrowLeft size={18} /> <span className="truncate max-w-[180px]">{vendor.name}</span>
            </button>
            <Link to="/home/cart" className="relative grid place-items-center h-10 w-10 rounded-full hover:bg-muted">
              <ShoppingCart size={20} className="text-body" />
              {count > 0 && <span className="absolute -top-0.5 -right-0.5 h-5 min-w-5 px-1 rounded-full bg-gold text-white text-[11px] font-bold grid place-items-center">{count}</span>}
            </Link>
          </div>
        </div>
      </div>

      {/* Cover */}
      <div ref={coverRef} className="relative h-[200px] md:h-[260px] bg-muted">
        <SmartImage src={vendor.cover} fallbackSrc={vendor.coverFallback} alt={vendor.name} seed={vendor.name} eager className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
        <button onClick={() => navigate({ to: "/home" })}
          className="absolute top-4 left-4 h-10 w-10 grid place-items-center rounded-full bg-card/90 backdrop-blur text-body shadow tap" aria-label="Back">
          <ArrowLeft size={20} />
        </button>
      </div>

      {/* Content: gentle gradient lets the photo breathe; desktop side-bleeds for depth */}
      <div className="relative z-10">
        {/* desktop side transparency — left and right edges bleed to background */}
        <div className="hidden md:block absolute inset-y-0 left-0 w-16 pointer-events-none z-20" style={{background:"linear-gradient(to right, var(--color-background), transparent)"}}/>
        <div className="hidden md:block absolute inset-y-0 right-0 w-16 pointer-events-none z-20" style={{background:"linear-gradient(to left, var(--color-background), transparent)"}}/>
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent to-background pointer-events-none" />
        <div className="relative bg-background">
        {/* Vendor header — subtle glass */}
        <div className="mx-auto max-w-3xl px-4 -mt-12">
          <div className="bg-card/95 backdrop-blur-sm rounded-2xl border border-border shadow-lg p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h1 className="text-2xl font-bold text-dark">{vendor.name}</h1>
                <p className="text-sm text-muted-foreground">{vendor.category}</p>
              </div>
              <span className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${vendor.open ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${vendor.open ? "bg-success" : "bg-muted-foreground"}`} />
                {vendor.open ? "Open" : "Closed"}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1"><Star size={14} className="fill-gold text-gold" /> <strong className="text-body">{vendor.rating}</strong> ({vendor.reviews})</span>
              <span className="inline-flex items-center gap-1"><Clock size={14} /> {vendor.open ? vendor.eta : "Closed now"}</span>
              <span className="inline-flex items-center gap-1"><MapPin size={14} /> {vendor.zone} · {vendor.distance}</span>
              <span>Min {naira(vendor.min)}</span>
            </div>
          </div>
        </div>

        {/* Closed banner */}
        {locked && (
          <div className="mx-auto max-w-3xl px-4 mt-4">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-muted border border-border">
              <Lock size={18} className="text-muted-foreground mt-0.5 shrink-0" />
              <div className="text-sm">
                <p className="font-semibold text-dark">This kitchen is currently closed</p>
                <p className="text-muted-foreground mt-0.5">You can browse the full menu below. Ordering reopens during programme hours.</p>
              </div>
            </div>
          </div>
        )}

        {/* Section tabs */}
        {menu.length > 1 && (
          <div className="sticky top-0 z-20 mt-6 bg-background/95 backdrop-blur border-y border-border">
            <div className="mx-auto max-w-3xl px-4 flex gap-2 overflow-x-auto scrollbar-none h-12 items-center">
              {menu.map((s) => (
                <a key={s.id} href={`#sec-${s.id}`} onClick={() => setActiveSection(s.id)}
                  className={`shrink-0 px-4 h-8 rounded-full text-sm font-semibold grid items-center transition ${activeSection === s.id ? "bg-brand text-primary-foreground" : "text-muted-foreground hover:text-body"}`}>
                  {s.title}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Menu sections */}
        <div className="mx-auto max-w-3xl px-4 mt-2">
          {menu.map((s) => (
            <section key={s.id} id={`sec-${s.id}`} className="pt-6 scroll-mt-16">
              <h2 className="text-lg font-bold text-dark">{s.title}</h2>
              <div className="mt-2 bg-card rounded-2xl border border-border px-5">
                {s.items.map((it) => <ItemRow key={it.id} item={it} vendorId={vendor.id} locked={locked} />)}
              </div>
            </section>
          ))}
        </div>
        </div>
        <ReviewsSection vendorId={vendor.id} isLoggedIn={isLoggedIn} requireAuth={requireAuth} />
        <div className="pb-16" />
      </div>

      {/* Floating cart bar */}
      {count > 0 && !locked && (
        <div className="fixed bottom-4 left-4 right-4 z-40 animate-slide-up">
          <Link to="/home/cart"
            className="tap mx-auto max-w-3xl flex items-center justify-between gap-3 bg-brand text-primary-foreground px-5 h-14 rounded-2xl shadow-xl hover:bg-brand-mid transition">
            <span className="inline-flex items-center gap-2 font-semibold">
              <ShoppingBag size={18} /> View Cart · {count} {count === 1 ? "item" : "items"}
            </span>
            <span className="font-bold text-lg">{naira(subtotal)}</span>
          </Link>
        </div>
      )}
    </div>
  );
}
