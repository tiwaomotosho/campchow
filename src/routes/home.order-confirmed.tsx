import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Check, MessageCircle, Phone, Clock, Store, Search, Bike,
  MapPin, ShieldCheck, Star, Navigation, PackageCheck, Soup,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/home/order-confirmed")({
  component: Confirmed,
});

/* ──────────────────────────────────────────────────────────
   PHASE MODEL  (rapid demo timeline ≈ 40s)
   0 received → 1 confirming → 2 accepted → 3 finding
   4 rider found → 5 at vendor → 6 out for delivery
─────────────────────────────────────────────────────────────── */
type Phase = 0 | 1 | 2 | 3 | 4 | 5 | 6;

const MILESTONES = [
  { key: "received",  label: "Order received",          sub: "We've got your order",            icon: Check },
  { key: "confirmed", label: "Order confirmed",         sub: "Vendor accepted your order",      icon: PackageCheck },
  { key: "preparing", label: "Preparing your food",     sub: "The kitchen is cooking",          icon: Soup },
  { key: "finding",   label: "Finding your rider",      sub: "Matching a verified camp rider",  icon: Search },
  { key: "assigned",  label: "Rider assigned",          sub: "Emmanuel is on the way to vendor",icon: Bike },
  { key: "pickup",    label: "Order picked up",         sub: "Rider collected your food",       icon: Store },
  { key: "enroute",   label: "Out for delivery",        sub: "Heading to your location",        icon: Navigation },
] as const;

/* which milestone index is "done" at each phase */
const PHASE_TO_MILESTONE: Record<Phase, number> = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6 };
const ETA_BY_PHASE: Record<Phase, number> = { 0: 28, 1: 27, 2: 25, 3: 24, 4: 20, 5: 16, 6: 11 };

const RIDER = {
  name: "Brother Emmanuel Adeyemi",
  initials: "EA",
  estate: "RC-2024-04821",
  rating: 4.8,
  trips: 143,
  vehicle: "Honda Bajaj · Red",
  plate: "KJA-482-EG",
};

/* ── Confetti (received splash) ─────────────────────────── */
const CONFETTI = Array.from({ length: 18 }, (_, i) => {
  const a = (i / 18) * Math.PI * 2, dist = 70 + (i % 4) * 28;
  return {
    x: Math.round(Math.cos(a) * dist), y: Math.round(Math.sin(a) * dist * 0.85) + 30,
    r: 160 + i * 36, d: (i % 5) * 0.05,
    c: ["oklch(0.45 0.11 150)", "oklch(0.62 0.13 78)", "oklch(0.62 0.17 145)", "oklch(0.56 0.12 152)"][i % 4],
  };
});
function Confetti() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      {CONFETTI.map((p, i) => (
        <span key={i} className="confetti-piece left-1/2 top-1/2" style={{
          background: p.c,
          ["--cx" as string]: `${p.x}px`, ["--cy" as string]: `${p.y}px`,
          ["--cr" as string]: `${p.r}deg`, ["--cd" as string]: `${p.d}s`,
        }} />
      ))}
    </div>
  );
}

/* ── Mini "map" illustration (CSS only) ─────────────────── */
function RouteMap({ phase }: { phase: Phase }) {
  // bike progress along the route: vendor(0%) → destination(100%)
  const bikePct = phase < 4 ? 0 : phase === 4 ? 12 : phase === 5 ? 18 : 72;
  const showBike = phase >= 4;
  return (
    <div className="relative h-40 rounded-2xl overflow-hidden border border-border bg-[oklch(0.95_0.02_150)]">
      {/* faux map grid */}
      <div className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.90 0.02 150) 1px, transparent 1px), linear-gradient(90deg, oklch(0.90 0.02 150) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }} />
      {/* soft blobs = green areas */}
      <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-success/10" />
      <div className="absolute right-8 bottom-2 h-20 w-28 rounded-full bg-brand/10" />

      {/* route line */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 160" preserveAspectRatio="none">
        <path d="M 60 110 C 150 110, 180 50, 330 56" fill="none"
          stroke="oklch(0.45 0.11 150)" strokeWidth="3" strokeDasharray="7 6" strokeLinecap="round" opacity="0.55" />
      </svg>

      {/* vendor pin */}
      <div className="absolute" style={{ left: "11%", top: "60%" }}>
        <div className="flex flex-col items-center -translate-x-1/2 -translate-y-1/2">
          <span className="grid place-items-center h-8 w-8 rounded-full bg-brand text-white shadow-lg ring-4 ring-brand/20">
            <Store size={15} />
          </span>
          <span className="mt-1 text-[9px] font-bold text-brand bg-white/90 px-1.5 py-0.5 rounded shadow-sm">Vendor</span>
        </div>
      </div>

      {/* destination pin */}
      <div className="absolute" style={{ left: "82%", top: "35%" }}>
        <div className="flex flex-col items-center -translate-x-1/2 -translate-y-1/2">
          <span className="grid place-items-center h-8 w-8 rounded-full bg-gold text-white shadow-lg ring-4 ring-gold/20">
            <MapPin size={15} />
          </span>
          <span className="mt-1 text-[9px] font-bold text-gold bg-white/90 px-1.5 py-0.5 rounded shadow-sm">You</span>
        </div>
      </div>

      {/* moving bike */}
      {showBike && (
        <div className="absolute transition-all duration-[1500ms] ease-in-out"
          style={{ left: `${11 + bikePct * 0.71}%`, top: `${60 - bikePct * 0.34}%` }}>
          <span className="grid place-items-center h-9 w-9 rounded-full bg-card text-brand shadow-xl ring-2 ring-brand -translate-x-1/2 -translate-y-1/2 pulse-ring">
            <Bike size={17} />
          </span>
        </div>
      )}
    </div>
  );
}

/* ── Vertical milestone timeline (Uber-style) ───────────── */
function Timeline({ phase }: { phase: Phase }) {
  const reached = PHASE_TO_MILESTONE[phase];
  return (
    <ol className="relative">
      {MILESTONES.map((m, i) => {
        const done = i < reached;
        const active = i === reached;
        const Icon = m.icon;
        const last = i === MILESTONES.length - 1;
        return (
          <li key={m.key} className="relative flex gap-4 pb-6 last:pb-0">
            {/* connector line */}
            {!last && (
              <span className="absolute left-[18px] top-9 bottom-0 w-0.5 overflow-hidden bg-border">
                <span className={`block w-full transition-all duration-700 ${done ? "h-full bg-brand" : active ? "h-full timeline-sweep" : "h-0"}`} />
              </span>
            )}
            {/* node */}
            <span className={`relative z-10 grid place-items-center h-9 w-9 rounded-full shrink-0 transition-all duration-500
              ${done ? "bg-brand text-white" : active ? "bg-brand text-white ring-4 ring-brand-light pulse-ring" : "bg-muted text-muted-foreground"}`}>
              {done ? <Check size={17} strokeWidth={3} /> : <Icon size={16} strokeWidth={2} />}
            </span>
            {/* text */}
            <div className={`pt-1 transition-opacity duration-500 ${i > reached ? "opacity-45" : "opacity-100"}`}>
              <p className={`font-bold text-sm ${active ? "text-brand" : "text-dark"}`}>{m.label}</p>
              <p className="text-xs text-muted-foreground">{m.sub}</p>
              {active && <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-brand"><span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" /> In progress…</span>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* ── Rider identity card ────────────────────────────────── */
function RiderCard({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`rounded-2xl border border-border bg-card ${compact ? "p-4" : "p-5"} animate-slide-up`}>
      {!compact && (
        <p className="text-xs uppercase font-semibold tracking-wider text-success inline-flex items-center gap-1.5 mb-3">
          <ShieldCheck size={13} strokeWidth={2.5} /> Verified Camp Rider
        </p>
      )}
      <div className="flex items-center gap-4">
        <div className="relative shrink-0">
          <div className="h-14 w-14 rounded-full bg-brand text-white grid place-items-center font-bold text-xl">{RIDER.initials}</div>
          <span className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-success grid place-items-center ring-2 ring-card">
            <ShieldCheck size={12} className="text-white" />
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-dark leading-tight">{RIDER.name}</p>
          <p className="text-sm text-body mt-0.5 inline-flex items-center gap-1">
            <Star size={13} className="fill-gold text-gold" /> {RIDER.rating}
            <span className="text-muted-foreground">· {RIDER.trips} deliveries</span>
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {RIDER.vehicle} · <span className="font-mono">{RIDER.plate}</span>
          </p>
        </div>
      </div>
      {!compact && (
        <>
          <div className="mt-3 px-3 py-2 rounded-lg bg-brand-light text-brand text-xs font-semibold inline-flex items-center gap-1.5">
            <ShieldCheck size={13} /> Estate ID: <span className="font-mono">{RIDER.estate}</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button onClick={() => toast.info("Opening secure chat with your rider…")}
              className="tap h-11 rounded-xl bg-brand-light text-brand font-semibold inline-flex items-center justify-center gap-2 hover:bg-brand-light/80">
              <MessageCircle size={16} /> Message
            </button>
            <button onClick={() => toast.info("Connecting via masked number…")}
              className="tap h-11 rounded-xl bg-brand text-white font-semibold inline-flex items-center justify-center gap-2 hover:bg-brand-mid">
              <Phone size={16} /> Call
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ── Searching-riders skeleton ──────────────────────────── */
function RiderSearch() {
  const ghosts = ["Verified rider · 0.4 km", "Verified rider · 0.7 km", "Verified rider · 1.1 km"];
  return (
    <div className="rounded-2xl border border-border bg-card p-5 animate-fade-in">
      <p className="font-bold text-dark inline-flex items-center gap-2">
        <Search size={16} className="text-brand" /> Matching you with a rider…
      </p>
      <p className="text-sm text-muted-foreground mt-1">Verified camp riders near the vendor</p>
      <div className="mt-4 space-y-2.5">
        {ghosts.map((g, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border border-border p-2.5 overflow-hidden relative">
            <div className="h-10 w-10 rounded-full img-shimmer shrink-0" />
            <div className="flex-1">
              <div className="h-3 w-28 rounded img-shimmer" />
              <div className="mt-1.5 h-2.5 w-20 rounded img-shimmer" />
            </div>
            <span className="text-xs text-muted-foreground">{g}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Confirmed() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>(0);
  const [showSplash, setShowSplash] = useState(true);
  const firedFound = useRef(false);
  const firedEnroute = useRef(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));

    at(2600, () => setShowSplash(false));
    at(3000, () => setPhase(1));   // confirming
    at(8000, () => setPhase(2));   // accepted → preparing
    at(13000, () => setPhase(3));  // finding rider
    at(21000, () => {              // rider found
      setPhase(4);
      if (!firedFound.current) { firedFound.current = true; toast.success("🛵 Rider found!", { description: "Emmanuel is heading to the vendor." }); }
    });
    at(29000, () => setPhase(5));  // at vendor / picked up
    at(38000, () => {              // out for delivery
      setPhase(6);
      if (!firedEnroute.current) { firedEnroute.current = true; toast.success("🛵 On the way!", { description: "Your food is en route to your location." }); }
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  const eta = ETA_BY_PHASE[phase];

  /* ── Received splash ── */
  if (showSplash) {
    return (
      <div className="fixed inset-0 z-50 grid place-items-center px-6 text-center animate-fade-in"
        style={{ background: "linear-gradient(160deg, oklch(0.20 0.025 155), oklch(0.30 0.07 152))" }}>
        <div>
          <div className="relative mx-auto h-28 w-28 rounded-full bg-success grid place-items-center animate-checkmark pulse-ring">
            <Confetti />
            <Check size={56} className="text-white" strokeWidth={3} />
          </div>
          <h1 className="mt-7 text-3xl font-extrabold text-white animate-fade-up-1">Order Received!</h1>
          <p className="mt-2 text-white/60 animate-fade-up-2">We're confirming with the kitchen…</p>
          <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white/80 text-sm font-mono animate-fade-up-3">
            CC-20260525-7F3A
          </div>
        </div>
      </div>
    );
  }

  const headline =
    phase >= 6 ? "Your food is on the way" :
    phase >= 4 ? "Rider assigned to your order" :
    phase >= 3 ? "Finding your rider" :
    phase >= 1 ? "Preparing your order" : "Order received";

  return (
    <div className="min-h-screen bg-background">
      {/* sticky tracking header */}
      <header className="sticky top-0 z-30 bg-card/95 backdrop-blur border-b border-border">
        <div className="mx-auto max-w-2xl px-4 h-16 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="font-bold text-dark truncate">{headline}</p>
            <p className="text-xs text-muted-foreground font-mono">CC-20260525-7F3A</p>
          </div>
          <span className="shrink-0 inline-flex items-center gap-1.5 px-3 h-9 rounded-full bg-gold-light text-gold font-bold text-sm">
            <Clock size={14} /> ~{eta} min
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-6 space-y-4 pb-24">
        {/* live status card */}
        <div className={`rounded-2xl p-5 transition-colors duration-500 ${phase >= 6 ? "bg-brand text-white" : "bg-card border border-border"}`}>
          <div className="flex items-center gap-3">
            <span className={`grid place-items-center h-11 w-11 rounded-xl shrink-0 ${phase >= 6 ? "bg-white/15" : "bg-brand-light"}`}>
              {phase >= 6
                ? <Navigation size={20} className="text-white" />
                : phase >= 4 ? <Bike size={20} className="text-brand" />
                : phase >= 3 ? <Search size={20} className="text-brand" />
                : <Soup size={20} className="text-brand" />}
            </span>
            <div className="min-w-0">
              <p className={`font-bold ${phase >= 6 ? "text-white" : "text-dark"}`}>{MILESTONES[PHASE_TO_MILESTONE[phase]].label}</p>
              <p className={`text-sm ${phase >= 6 ? "text-white/75" : "text-muted-foreground"}`}>
                {phase >= 6 ? "Mama Titi's Kitchen to 2000 Chalets, Block Entrance, about 1.4 km"
                  : MILESTONES[PHASE_TO_MILESTONE[phase]].sub}
              </p>
            </div>
          </div>
        </div>

        {/* map appears once we're locating/with a rider */}
        {phase >= 2 && <RouteMap phase={phase} />}

        {/* rider zone: searching skeleton → full card → compact card */}
        {phase === 3 && <RiderSearch />}
        {phase >= 4 && <RiderCard compact={false} />}

        {/* timeline */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-bold text-dark mb-4">Order progress</h3>
          <Timeline phase={phase} />
        </div>

        {/* order summary */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="font-bold text-dark">Delivering to</p>
            <span className="text-xs font-semibold text-brand bg-brand-light px-2 py-0.5 rounded-full">Geo-Layer</span>
          </div>
          <p className="mt-2 text-sm text-body inline-flex items-center gap-1.5">
            <MapPin size={15} className="text-brand" /> 2000 Chalets › Block 501–1000 › Block Entrance
          </p>
        </div>

        {/* CTAs */}
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => navigate({ to: "/" })}
            className="tap h-12 rounded-xl border border-border bg-card text-body font-bold hover:bg-muted transition">
            Back to Home
          </button>
          <button onClick={() => navigate({ to: "/home" })}
            className="tap h-12 rounded-xl bg-brand text-white font-bold hover:bg-brand-mid transition">
            Order Again
          </button>
        </div>
      </main>
    </div>
  );
}
