import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ShoppingCart, Store, Bike, ArrowRight, MapPin, Search,
  ChevronDown, Shield, Zap, Smartphone, MessageSquare, WifiOff, Wifi, Star,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { SmartImage } from "@/components/SmartImage";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CampChow — Food. Delivered Anywhere on the Camp." },
      { name: "description", content: "The three-sided food ordering and last-mile delivery platform built exclusively for Redemption City." },
    ],
  }),
  component: Landing,
});

/* ─────────────────────────────────────────────────────────
   HERO — crossfading food photography with Ken Burns drift
──────────────────────────────────────────────────────────── */
import imagesData from "@/lib/images.json";
const U = (id: string) => `${imagesData._baseUrl}${id}${imagesData._params}`;
const img = (q: string) => `https://images.unsplash.com/${q}?auto=format&fit=crop&w=1600&q=75`;
const HERO_ZONES = ["Youth Centre", "2000 Chalets", "RECTEM", "Emmanuel Park", "Estate 12"];
const HERO_IMAGES = (imagesData.hero as string[]).map(U);

function HeroBackdrop({ active }: { active: number }) {
  return (
    <div className="absolute inset-0 hero-gradient overflow-hidden">
      {/* perpetual Ken Burns drift on the whole stack; pure crossfade between layers */}
      <div className="absolute inset-0 kenburns">
        {HERO_IMAGES.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            aria-hidden
            onError={(e) => { e.currentTarget.style.display = "none"; }}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ease-in-out ${i === active ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>
      {/* brand-tinted dark overlay so white text always reads */}
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.16_0.03_155/.72)] via-[oklch(0.16_0.03_155/.5)] to-[oklch(0.14_0.03_155/.88)]" />
    </div>
  );
}

/* ── Live order ticker ──────────────────────────────────── */
const TICKER = [
  "Order delivered to Estate 12 · just now",
  "Mama Titi's Kitchen accepted an order · 1 min ago",
  "Rider Emmanuel went online near Youth Centre · 2 min ago",
  "Order delivered to 2000 Chalets · 3 min ago",
  "New vendor onboarded: Glory Shawarma · 5 min ago",
];
function LiveTicker() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % TICKER.length), 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 border border-white/15 backdrop-blur text-white/85 text-xs font-medium overflow-hidden">
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
      </span>
      <span key={i} className="tick-in whitespace-nowrap">{TICKER[i]}</span>
    </div>
  );
}

/* ── Count-up stat ──────────────────────────────────────── */
function useCountUp(target: number, duration = 1200) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return v;
}
const fmt = (v: number) =>
  v >= 1_000_000 ? `${Math.round(v / 100_000) / 10}M+` :
  v >= 1_000 ? `${Math.round(v / 1_000)}K+` : `${v}`;

function StatStrip() {
  const visitors = useCountUp(1_000_000, 1600);
  const residents = useCountUp(200_000, 1400);
  const zones = useCountUp(16, 1000);
  const stats = [
    { label: fmt(visitors), sub: "peak visitors" },
    { label: `${zones}`, sub: "camp zones" },
    { label: fmt(residents), sub: "residents" },
    { label: "4.8★", sub: "rider rating" },
  ];
  return (
    <div className="grid grid-cols-4 gap-2 md:gap-3">
      {stats.map((s, i) => (
        <div key={i} className="bg-white/[0.08] border border-white/12 rounded-xl px-2 py-3 text-center backdrop-blur">
          <p className="font-extrabold text-white text-base md:text-xl leading-none tabular-nums">{s.label}</p>
          <p className="text-white/50 text-[10px] md:text-xs mt-1">{s.sub}</p>
        </div>
      ))}
    </div>
  );
}

/* ── Category tiles ("What's on your mind?") ───────────── */
const CT = imagesData.categoryTiles as Record<string, { src: string; fallback: string }>;
const CATS = [
  { label: "Jollof & Rice", src: U(CT["jollof-rice"].src), fallback: U(CT["jollof-rice"].fallback) },
  { label: "Grills & Suya", src: U(CT["grills-suya"].src), fallback: U(CT["grills-suya"].fallback) },
  { label: "Pastries",      src: U(CT["pastries"].src),    fallback: U(CT["pastries"].fallback) },
  { label: "Pepper Soup",   src: U(CT["pepper-soup"].src), fallback: U(CT["pepper-soup"].fallback) },
  { label: "Drinks",        src: U(CT["drinks"].src),      fallback: U(CT["drinks"].fallback) },
  { label: "Shawarma",      src: U(CT["shawarma"].src),    fallback: U(CT["shawarma"].fallback) },
];
function CategoryRow() {
  return (
    <div className="flex gap-4 overflow-x-auto scrollbar-none -mx-4 px-4 snap-x">
      {CATS.map((c, i) => (
        <Link
          key={c.label}
          to="/home"
          className={`group relative shrink-0 w-36 h-44 md:w-44 md:h-52 rounded-2xl overflow-hidden snap-start tap card-enter-${i + 1}`}
        >
          <SmartImage
            src={c.src}
            fallbackSrc={c.fallback}
            alt={c.label}
            seed={c.label}
            eager
            className="absolute inset-0"
            imgClassName="transition-transform duration-500 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
          <span className="absolute bottom-3 left-3 right-3 text-white font-bold text-sm md:text-base leading-tight drop-shadow">
            {c.label}
          </span>
        </Link>
      ))}
    </div>
  );
}

/* ── Cycling geo destinations — the signature moment ───── */
const DESTS = [
  { loc: "2000 Chalets",   area: "Block 501–1000",      point: "Block Entrance" },
  { loc: "Old Auditorium", area: "Perimeter 3 (East)",  point: "VIP Entrance" },
  { loc: "RECTEM",         area: "IT Centre",            point: "Lab Entrance" },
  { loc: "Youth Centre",   area: "Main Building",        point: "Front Desk" },
];
function GeoShowcase() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % DESTS.length), 3000);
    return () => clearInterval(t);
  }, []);
  const d = DESTS[i];
  const rows = [
    { label: "Location",     value: d.loc,   color: "text-white" },
    { label: "Area",         value: d.area,  color: "text-brand-light" },
    { label: "Pickup Point", value: d.point, color: "text-gold" },
  ];
  return (
    <div className="rounded-3xl overflow-hidden" style={{ background: "linear-gradient(150deg, oklch(0.18 0.03 155), oklch(0.27 0.06 152))" }}>
      <div className="grid md:grid-cols-2 gap-8 p-7 md:p-12 items-center">
        <div>
          <p className="text-gold text-xs font-bold uppercase tracking-[0.2em]">The CampChow Geo-Layer</p>
          <h2 className="mt-3 text-2xl md:text-4xl font-extrabold text-white leading-tight">
            No street addresses?<br />No problem.
          </h2>
          <p className="mt-4 text-white/60 text-sm md:text-base leading-relaxed max-w-md">
            Redemption City navigates by landmark — so we built delivery around the camp's own
            language. Pick your location, area, and pickup point. Your rider knows exactly where that is.
          </p>
          <Link to="/home" className="tap mt-6 inline-flex items-center gap-2 px-6 h-12 rounded-full bg-gold text-dark font-bold hover:brightness-105 transition">
            Try it now <ArrowRight size={17} />
          </Link>
        </div>
        <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-6 backdrop-blur">
          <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold mb-5">Delivering to</p>
          <div key={i} className="space-y-5 tick-in">
            {rows.map((r) => (
              <div key={r.label} className="geo-step">
                <div className="flex items-center gap-3">
                  <span className="h-6 w-6 rounded-full border-2 border-brand-mid bg-brand/30 grid place-items-center shrink-0">
                    <MapPin size={12} className="text-brand-light" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-white/40 text-[10px] uppercase tracking-wider font-semibold leading-none mb-1">{r.label}</p>
                    <p className={`font-bold text-base md:text-lg truncate ${r.color}`}>{r.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-white/10 text-xs text-white/45 flex items-center gap-2">
            <MapPin size={12} className="shrink-0" />
            <span key={`bc-${i}`} className="tick-in truncate">{d.loc} › {d.area} › {d.point}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Role cards ─────────────────────────────────────────── */
function RoleCards() {
  return (
    <div className="space-y-3">
      <Reveal>
        <Link
          to="/home"
          className="tap group relative flex items-center gap-5 bg-brand rounded-2xl px-6 py-6 shadow-xl shadow-brand/25 hover:bg-brand-mid hover:shadow-2xl hover:shadow-brand/30 hover:-translate-y-1 transition-all duration-300"
        >
          <div className="h-14 w-14 rounded-2xl bg-white/15 grid place-items-center shrink-0">
            <ShoppingCart size={26} strokeWidth={1.75} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-0.5">
              <h3 className="text-lg md:text-xl font-bold text-white">I am a Customer</h3>
              <span className="text-[10px] font-bold bg-gold text-dark px-2 py-0.5 rounded-full uppercase tracking-wide">No login needed</span>
            </div>
            <p className="text-white/70 text-sm leading-snug">Browse vendors, order food, and track delivery to your zone.</p>
          </div>
          <ArrowRight size={22} className="text-white/60 shrink-0 group-hover:translate-x-1.5 transition-transform duration-300" />
        </Link>
      </Reveal>

      <div className="grid gap-3 md:grid-cols-2">
        <Reveal delay={1}>
          <Link to="/vendor/login" className="tap group flex items-center gap-4 bg-card border border-border rounded-2xl px-5 py-5 shadow-sm hover:shadow-lg hover:border-brand/30 hover:-translate-y-1 transition-all duration-300">
            <div className="h-12 w-12 rounded-xl bg-brand-light grid place-items-center shrink-0">
              <Store size={22} strokeWidth={1.75} className="text-brand" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-dark">I am a Vendor</h3>
              <p className="text-muted-foreground text-sm leading-snug">Manage orders, menu, and messages.</p>
            </div>
            <ArrowRight size={16} className="text-muted-foreground shrink-0 group-hover:translate-x-1 group-hover:text-brand transition-all duration-300" />
          </Link>
        </Reveal>
        <Reveal delay={2}>
          <Link to="/rider/login" className="tap group flex items-center gap-4 bg-card border border-border rounded-2xl px-5 py-5 shadow-sm hover:shadow-lg hover:border-gold/40 hover:-translate-y-1 transition-all duration-300">
            <div className="h-12 w-12 rounded-xl bg-gold-light grid place-items-center shrink-0">
              <Bike size={22} strokeWidth={1.75} className="text-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-dark">I am a Rider</h3>
              <p className="text-muted-foreground text-sm leading-snug">Go online, accept deliveries, and earn.</p>
            </div>
            <ArrowRight size={16} className="text-muted-foreground shrink-0 group-hover:translate-x-1 group-hover:text-gold transition-all duration-300" />
          </Link>
        </Reveal>
      </div>
    </div>
  );
}

/* ── Resilience / app banner ────────────────────────────── */
function SignalBars({ level }: { level: number }) {
  // level 0..3
  return (
    <span className="inline-flex items-end gap-0.5 h-3">
      {[1, 2, 3].map((b) => (
        <span key={b} className={`w-1 rounded-sm transition-colors duration-500 ${b <= level ? "bg-current" : "bg-current/25"}`} style={{ height: `${b * 4}px` }} />
      ))}
    </span>
  );
}

function AnimatedPhone() {
  // 0 = Full PWA, 1 = Weak signal (queued), 2 = USSD zero-data
  const [state, setState] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setState((s) => (s + 1) % 3), 3000);
    return () => clearInterval(id);
  }, []);

  const statusBar = (
    <div className="flex items-center justify-between mb-2.5 text-dark">
      <span className="text-[9px] font-bold">9:41</span>
      <span className={`inline-flex items-center gap-1 transition-colors duration-500 ${state === 0 ? "text-success" : state === 1 ? "text-amber" : "text-error"}`}>
        {state === 2 ? <span className="text-[8px] font-bold">2G</span> : <SignalBars level={state === 0 ? 3 : 1} />}
        {state === 0 ? <Wifi size={10} /> : <WifiOff size={10} />}
      </span>
    </div>
  );

  return (
    <div className="mx-auto">
      <div className="w-56 rounded-[2.4rem] border-[8px] border-dark bg-background p-3 shadow-2xl relative overflow-hidden">
        <div className="h-1 w-14 mx-auto rounded-full bg-dark/20 mb-2.5" />
        {statusBar}

        {/* STATE 0 — Full PWA */}
        {state === 0 && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="grid place-items-center h-6 w-6 rounded-lg bg-brand text-white"><ShoppingCart size={13} /></span>
              <span className="font-extrabold text-xs"><span className="text-brand">Camp</span><span className="text-gold">Chow</span></span>
              <span className="ml-auto text-[8px] font-bold text-success bg-success/15 px-1.5 py-0.5 rounded-full">Online</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[0,1,2,3].map((i) => (
                <div key={i} className={`rounded-lg overflow-hidden card-enter-${i+1}`}>
                  <div className="h-10" style={{ background: ["linear-gradient(135deg,#E8821E,#B5471F)","linear-gradient(135deg,#C0392B,#6E2516)","linear-gradient(135deg,#1A6B3C,#0D3B20)","linear-gradient(135deg,#C98A3A,#7A4E1E)"][i] }} />
                  <div className="bg-card border border-t-0 border-border rounded-b-lg px-1.5 py-1">
                    <div className="h-1.5 w-3/4 rounded bg-dark/15" />
                    <div className="mt-1 h-1 w-1/2 rounded bg-dark/10" />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 rounded-lg bg-brand text-white text-center text-[10px] font-bold py-1.5">Browse Vendors</div>
          </div>
        )}

        {/* STATE 1 — Weak signal, order queued offline */}
        {state === 1 && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="grid place-items-center h-6 w-6 rounded-lg bg-brand text-white"><ShoppingCart size={13} /></span>
              <span className="font-extrabold text-xs"><span className="text-brand">Camp</span><span className="text-gold">Chow</span></span>
              <span className="ml-auto text-[8px] font-bold text-amber bg-amber/15 px-1.5 py-0.5 rounded-full">Weak signal</span>
            </div>
            <div className="rounded-xl bg-amber/10 border border-amber/30 p-2.5 mb-2">
              <div className="flex items-center gap-1.5 text-amber"><WifiOff size={12} /><span className="text-[10px] font-bold">Network unstable</span></div>
              <p className="text-[9px] text-muted-foreground mt-1 leading-snug">Your order is safe. It's queued on your phone and will send automatically.</p>
            </div>
            <div className="rounded-xl bg-card border border-border p-2.5 flex items-center gap-2">
              <span className="relative flex h-2 w-2"><span className="animate-ping absolute h-full w-full rounded-full bg-amber opacity-75" /><span className="relative rounded-full h-2 w-2 bg-amber" /></span>
              <span className="text-[10px] font-semibold text-dark">1 order queued · syncing…</span>
            </div>
            <div className="mt-2 rounded-lg bg-dark text-white text-center text-[10px] font-bold py-1.5">Order saved offline</div>
          </div>
        )}

        {/* STATE 2 — USSD zero-data */}
        {state === 2 && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="grid place-items-center h-6 w-6 rounded-lg bg-error text-white"><WifiOff size={13} /></span>
              <span className="font-extrabold text-xs text-dark">Zero-Data Mode</span>
            </div>
            <div className="rounded-xl bg-dark text-white p-3 font-mono">
              <p className="text-[10px] text-white/60">USSD · no internet needed</p>
              <p className="text-sm font-bold mt-1">*737*1*2000#</p>
              <div className="my-2 h-px bg-white/15" />
              <p className="text-[9px] leading-relaxed text-white/80">CampChow: Order CC-7F3A confirmed. Rider Emmanuel assigned. Reply 1 to track.</p>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-[9px] text-success font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-success" /> Works on bare 2G signal · ₦0 data
            </div>
          </div>
        )}

        {/* progress dots */}
        <div className="flex justify-center gap-1.5 mt-3">
          {[0,1,2].map((i) => (
            <span key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === state ? "w-5 bg-brand" : "w-1.5 bg-dark/20"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ResilienceBanner() {
  const feats = [
    { icon: WifiOff,       title: "Offline-first app", sub: "Orders queue on your phone and sync when signal returns" },
    { icon: Smartphone,    title: "USSD payments",     sub: "Dial *737# and pay with zero data on bare 2G" },
    { icon: MessageSquare, title: "SMS updates",       sub: "Order status reaches you even when the network dies" },
  ];
  return (
    <div className="bg-card border border-border rounded-3xl p-7 md:p-10 grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-center shadow-sm">
      <AnimatedPhone />
      <div>
        <p className="text-brand text-xs font-bold uppercase tracking-[0.2em]">Built for peak congestion</p>
        <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-dark leading-tight">
          Works even when the<br className="hidden md:block" /> network doesn't
        </h2>
        <p className="mt-3 text-muted-foreground text-sm md:text-base max-w-lg">
          When a million people arrive for a programme, mobile networks collapse. CampChow is engineered for exactly that moment.
        </p>
        <div className="mt-6 space-y-4">
          {feats.map(({ icon: Icon, title, sub }, i) => (
            <Reveal key={title} delay={(i as 0 | 1 | 2)}>
              <div className="flex items-start gap-3.5">
                <span className="grid place-items-center h-10 w-10 rounded-xl bg-brand-light text-brand shrink-0"><Icon size={18} strokeWidth={1.75} /></span>
                <div>
                  <p className="font-bold text-dark text-sm">{title}</p>
                  <p className="text-muted-foreground text-sm">{sub}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   PAGE
──────────────────────────────────────────────────────────── */
function Landing() {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();
  const [hero, setHero] = useState(0);
  const [zoneIdx, setZoneIdx] = useState(0);
  const [dim, setDim] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const catsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setInterval(() => setHero((h) => (h + 1) % HERO_IMAGES.length), 7000);
    const z = setInterval(() => setZoneIdx((i) => (i + 1) % HERO_ZONES.length), 2000);
    return () => { clearInterval(t); clearInterval(z); };
  }, []);

  // hero darkens as it scrolls out of view (mobile layered effect)
  useEffect(() => {
    const onScroll = () => {
      const h = heroRef.current;
      if (!h) return;
      const vh = window.innerHeight;
      const past = Math.min(1, Math.max(0, window.scrollY / (vh * 0.85)));
      setDim(past * 0.85);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* ══ HERO — sticky on mobile only; content scrolls over it ══ */}
      <section ref={heroRef} className="sticky top-0 z-0 md:relative min-h-[92svh] flex flex-col">
        <HeroBackdrop active={hero} />
        {/* darkening overlay as hero leaves view */}
        <div className="hero-dim md:hidden" style={{ opacity: dim }} />

        <div className="relative flex-1 flex flex-col items-center justify-center px-4 pt-28 pb-20">
          <div className="w-full max-w-3xl mx-auto text-center">
            {/* location chip */}
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/85 text-xs font-semibold backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                Redemption City · Ogun State, Nigeria
              </span>
            </div>

            {/* headline */}
            <h1 className="mt-6 font-display text-white animate-fade-up-1 drop-shadow-sm" style={{fontSize:"clamp(2.5rem,7vw,3.75rem)",lineHeight:1.08,letterSpacing:"-0.02em",fontWeight:800}}>
              Discover the best food<br />
              <span className="text-gold">anywhere on the camp</span>
            </h1>
            <p className="mt-5 text-white/70 text-lg md:text-xl max-w-2xl mx-auto animate-fade-up-2" style={{lineHeight:1.5}}>
              {isLoggedIn && user
                ? `Welcome back, ${user.name.split(" ")[0]} — your favourite vendors are ready.`
                : "Over a million people attend programmes here with no way to order food to their seat. Until now."}
            </p>

            {/* THE search bar */}
            <form
              onSubmit={(e) => { e.preventDefault(); navigate({ to: "/home" }); }}
              className="mt-8 animate-fade-up-3"
            >
              <div className="mx-auto max-w-2xl flex items-center bg-white rounded-full h-14 md:h-16 pl-4 pr-2 shadow-2xl shadow-black/25 transition-shadow duration-200 focus-within:ring-4 focus-within:ring-gold/40">
                <span className="hidden sm:flex items-center gap-1.5 pr-3 text-sm font-semibold text-body shrink-0">
                  <MapPin size={16} className="text-brand" />
                  <span key={zoneIdx} className="tick-in inline-block min-w-[92px]">{HERO_ZONES[zoneIdx]}</span>
                </span>
                <span className="hidden sm:block h-7 w-px bg-border shrink-0" />
                <Search size={18} className="text-muted-foreground ml-0 sm:ml-3 mr-2 shrink-0" />
                <input
                  className="flex-1 min-w-0 bg-transparent outline-none text-base md:text-lg text-body placeholder:text-muted-foreground"
                  placeholder="Search vendors, dishes, or zones…"
                />
                <button type="submit" className="tap shrink-0 h-10 md:h-12 px-5 md:px-7 rounded-full bg-brand text-white text-sm font-bold hover:bg-brand-mid transition-colors duration-200">
                  Search
                </button>
              </div>
            </form>

            {/* dual CTAs — Zomato's "Order Food / Dining Out" */}
            <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 animate-fade-up-4">
              <Link to="/home" className="tap h-12 px-8 rounded-full bg-gold text-dark font-bold grid items-center hover:brightness-105 transition">
                Order Food
              </Link>
              <a href="#get-started" className="tap h-12 px-8 rounded-full bg-white/10 border border-white/30 text-white font-bold grid items-center backdrop-blur hover:bg-white hover:text-brand transition-colors duration-200">
                Join as Vendor or Rider
              </a>
            </div>

            {/* live ticker */}
            <div className="mt-8 animate-fade-up-5">
              <LiveTicker />
            </div>

            {/* stats */}
            <div className="mt-8 max-w-2xl mx-auto w-full animate-fade-up-5 pb-4">
              <StatStrip />
            </div>
          </div>
        </div>

        {/* scroll cue */}
        <button
          onClick={() => catsRef.current?.scrollIntoView({ behavior: "smooth" })}
          className="relative mx-auto mb-5 grid place-items-center h-10 w-10 rounded-full text-white/70 hover:text-white"
          aria-label="Scroll down"
        >
          <ChevronDown size={26} className="cue-bounce" />
        </button>
      </section>

      {/* ══ BELOW THE FOLD — lifts up and over the sticky hero ══ */}
      <div className="relative z-10 bg-background rounded-t-[2rem] -mt-8 shadow-[0_-24px_60px_-30px_rgba(0,0,0,0.4)] md:rounded-none md:mt-0 md:shadow-none">
      <div className="mx-auto max-w-6xl px-4">

        {/* What's on your mind? */}
        <section ref={catsRef} className="pt-14 md:pt-20">
          <Reveal>
            <h2 className="h-section text-dark">What's on your mind?</h2>
            <p className="mt-1 text-muted-foreground text-sm md:text-base">Crave it. Tap it. It's on the way.</p>
          </Reveal>
          <div className="mt-6">
            <CategoryRow />
          </div>
        </section>

        {/* Geo-layer showcase */}
        <section className="pt-14 md:pt-20">
          <Reveal>
            <GeoShowcase />
          </Reveal>
        </section>

        {/* Vendor + Rider acquisition */}
        <section className="pt-14 md:pt-20">
          <Reveal>
            <h2 className="h-section text-dark text-center">Grow with CampChow</h2>
            <p className="mt-1 text-muted-foreground text-sm md:text-base text-center">Whether you cook or deliver — there's a place for you.</p>
          </Reveal>
          <div className="mt-7 grid md:grid-cols-2 gap-4">
            <Reveal delay={1}>
              <Link to="/vendor/login" className="tap group relative block rounded-3xl overflow-hidden min-h-[300px] shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <SmartImage src={U((imagesData.lifestyle as Record<string,{src:string;fallback:string}>)["kitchen-vendor"].src)} fallbackSrc={U((imagesData.lifestyle as Record<string,{src:string;fallback:string}>)["kitchen-vendor"].fallback)} alt="Kitchen" seed="vendor kitchen" eager className="absolute inset-0" imgClassName="group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0" style={{background:"linear-gradient(150deg, oklch(0.16 0.03 155 / 0.92), oklch(0.20 0.04 152 / 0.78))"}} />
                <div className="relative p-7 flex flex-col justify-between min-h-[300px]">
                  <div>
                    <span className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-white/15 text-white mb-4 backdrop-blur"><Store size={28} strokeWidth={1.75}/></span>
                    <h3 className="h-card text-white" style={{fontSize:"1.6rem",fontWeight:800}}>List your kitchen</h3>
                    <p className="mt-2 text-white/75 t-body">Get discovered by thousands of camp visitors. Manage orders from your phone and get paid automatically every settlement cycle.</p>
                    <ul className="mt-4 space-y-1.5">
                      {["Free to join during the pilot","Dashboard + order management","Automatic settlements"].map(f=>(
                        <li key={f} className="flex items-center gap-2 text-white/85 text-sm"><span className="h-1.5 w-1.5 rounded-full bg-gold shrink-0"/>{f}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 text-gold font-bold group-hover:gap-3 transition-all">List your kitchen <ArrowRight size={17}/></div>
                </div>
              </Link>
            </Reveal>
            <Reveal delay={2}>
              <Link to="/rider/login" className="tap group relative block rounded-3xl overflow-hidden min-h-[300px] shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <SmartImage src={U((imagesData.lifestyle as Record<string,{src:string;fallback:string}>)["rider-delivery"].src)} fallbackSrc={U((imagesData.lifestyle as Record<string,{src:string;fallback:string}>)["rider-delivery"].fallback)} alt="Rider" seed="rider delivery" eager className="absolute inset-0" imgClassName="group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0" style={{background:"linear-gradient(150deg, oklch(0.45 0.12 78 / 0.92), oklch(0.40 0.10 70 / 0.80))"}} />
                <div className="relative p-7 flex flex-col justify-between min-h-[300px]">
                  <div>
                    <span className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-white/20 text-white mb-4 backdrop-blur"><Bike size={28} strokeWidth={1.75}/></span>
                    <h3 className="h-card text-white" style={{fontSize:"1.6rem",fontWeight:800}}>Ride with CampChow</h3>
                    <p className="mt-2 text-white/85 t-body">Accept deliveries near you, earn transparently on every trip, and build a verified identity on the camp.</p>
                    <ul className="mt-4 space-y-1.5">
                      {["Earn per delivery + bonuses","Set your own hours","Estate ID verification"].map(f=>(
                        <li key={f} className="flex items-center gap-2 text-white text-sm"><span className="h-1.5 w-1.5 rounded-full bg-white shrink-0"/>{f}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 text-white font-bold group-hover:gap-3 transition-all">Join the rider network <ArrowRight size={17}/></div>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>

        {/* Roles */}
        <section id="get-started" className="pt-14 md:pt-20 scroll-mt-24">
          <Reveal>
            <h2 className="h-section text-dark text-center">Choose how you get started</h2>
            <p className="mt-1 text-muted-foreground text-sm md:text-base text-center">One platform. Three ways in.</p>
          </Reveal>
          <div className="mt-7 max-w-2xl mx-auto">
            <RoleCards />
          </div>
          {/* trust chips */}
          <Reveal delay={2} className="mt-8">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { icon: <Shield size={14} />, text: "Verified Camp Riders" },
                { icon: <MapPin size={14} />, text: "16 Named Zones" },
                { icon: <Zap size={14} />, text: "Works on Weak Networks" },
              ].map((b, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-card border border-border text-xs font-semibold text-body shadow-sm">
                  <span className="text-brand">{b.icon}</span>
                  {b.text}
                </span>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Resilience banner */}
        <section className="pt-14 md:pt-20 pb-16 md:pb-24">
          <Reveal>
            <ResilienceBanner />
          </Reveal>
        </section>
      </div>
      </div>

      <div className="relative z-10 bg-background">
        <Footer />
      </div>
    </div>
  );
}
