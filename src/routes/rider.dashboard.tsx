import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  LogOut, Bike, MapPin, Clock, Package, Wallet, Star, CheckCircle2,
  Navigation, Phone, ShieldCheck, Flame, Trophy, TrendingUp, Target, XCircle, History,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { naira } from "@/lib/format";
import { toast } from "sonner";

export const Route = createFileRoute("/rider/dashboard")({
  component: RiderDashboard,
});

type Delivery = {
  id: string; ref: string; vendor: string; pickup: string; dropoff: string;
  customer: string; distance: string; eta: string; base: number; bonus: number;
  status: "available" | "accepted" | "picked-up" | "delivered";
};

const SEED: Delivery[] = [
  { id: "1", ref: "CC-7F3A", vendor: "Mama Titi's Kitchen", pickup: "Youth Centre", dropoff: "2000 Chalets · Block 501–1000", customer: "Sister Funke", distance: "1.2 km", eta: "8 min", base: 450, bonus: 150, status: "available" },
  { id: "2", ref: "CC-8A12", vendor: "Bread of Life Bakery", pickup: "Old Auditorium", dropoff: "Estate 12 · Phase 2", customer: "Brother Tunde", distance: "1.8 km", eta: "12 min", base: 550, bonus: 200, status: "available" },
  { id: "3", ref: "CC-9C45", vendor: "Sister Bola's Rice", pickup: "Estate 12", dropoff: "Mission House · Reception", customer: "Sister Adaeze", distance: "950 m", eta: "6 min", base: 400, bonus: 100, status: "available" },
];

const DAILY_GOAL = 10_000;

function RiderDashboard() {
  const [online, setOnline] = useState(true);
  const [deliveries, setDeliveries] = useState<Delivery[]>(SEED);
  const [lastEarned, setLastEarned] = useState<Delivery | null>(null);
  const [confirmCancel, setConfirmCancel] = useState(false);

  const accept = (id: string) => {
    setDeliveries((prev) => prev.map((d) => d.id === id ? { ...d, status: "accepted" } : d));
    toast.success("Delivery accepted. Head to vendor for pickup.");
  };
  const advance = (id: string) => {
    setDeliveries((prev) => prev.map((d) => {
      if (d.id !== id) return d;
      const nx: Delivery["status"] = d.status === "accepted" ? "picked-up" : "delivered";
      if (nx === "picked-up") toast.success("Marked as picked up. Navigate to drop-off.");
      else { toast.success("Delivery complete. Earnings added."); setLastEarned({ ...d, status: "delivered" }); }
      return { ...d, status: nx };
    }));
  };

  const cancelActive = () => {
    setDeliveries((prev) => prev.map((d) => (d.status === "accepted" || d.status === "picked-up") ? { ...d, status: "available" } : d));
    setConfirmCancel(false);
    toast.error("Delivery cancelled", { description: "Re-offered to nearby riders. This may affect your acceptance rate." });
  };

  const earnedFromDeliveries = deliveries.filter((d) => d.status === "delivered").reduce((s, d) => s + d.base + d.bonus, 0);
  const earningsToday = earnedFromDeliveries + 4200;
  const completed = deliveries.filter((d) => d.status === "delivered").length + 7;
  const active = deliveries.find((d) => d.status === "accepted" || d.status === "picked-up");
  const available = deliveries.filter((d) => d.status === "available");
  const goalPct = Math.min(100, Math.round((earningsToday / DAILY_GOAL) * 100));

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 bg-card border-b border-border">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="hidden sm:inline-flex px-2 py-1 rounded-full bg-gold-light text-xs font-semibold text-gold">Rider</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => { setOnline(!online); toast(online ? "You are now offline" : "You're online — looking for deliveries"); }}
              className={`tap inline-flex items-center gap-2 px-3 h-9 rounded-full text-sm font-semibold border transition ${online ? "bg-success/15 text-success border-success/30" : "bg-muted text-muted-foreground border-border"}`}>
              <span className={`h-2 w-2 rounded-full ${online ? "bg-success animate-pulse" : "bg-muted-foreground"}`} />
              {online ? "Online" : "Offline"}
            </button>
            <Link to="/rider/transactions" className="h-9 w-9 grid place-items-center rounded-full hover:bg-muted text-muted-foreground" aria-label="History"><History size={18} /></Link>
            <Link to="/" className="h-9 w-9 grid place-items-center rounded-full hover:bg-muted text-muted-foreground" aria-label="Logout"><LogOut size={18} /></Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        {/* Identity card */}
        <div className="rounded-2xl p-5 text-white" style={{ background: "linear-gradient(150deg, oklch(0.20 0.025 155), oklch(0.30 0.07 152))" }}>
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <div className="h-16 w-16 rounded-2xl bg-white/15 grid place-items-center font-bold text-2xl text-white">EA</div>
              <span className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-success grid place-items-center ring-2 ring-[oklch(0.25_0.05_153)]"><ShieldCheck size={12} className="text-white" /></span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-white">Brother Emmanuel Adeyemi</h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold text-dark text-[11px] font-bold"><Trophy size={11} /> Top 10%</span>
              </div>
              <p className="text-sm text-white/65 inline-flex items-center gap-2 mt-0.5">
                <span className="inline-flex items-center gap-1"><Star size={13} className="fill-gold text-gold" /> 4.8</span>
                · <span className="font-mono">RC-2024-04821</span>
              </p>
              <p className="text-xs text-white/45 mt-0.5">Honda Bajaj · Red · KJA-482-EG</p>
            </div>
          </div>
          {/* badges */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 text-white text-xs font-semibold"><Flame size={12} className="text-gold" /> 5-day streak</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 text-white text-xs font-semibold"><Package size={12} className="text-gold" /> 143 lifetime</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 text-white text-xs font-semibold"><CheckCircle2 size={12} className="text-gold" /> 96% acceptance</span>
          </div>
        </div>

        {/* Daily goal progress */}
        <div className="mt-4 bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <p className="font-bold text-dark inline-flex items-center gap-2"><Target size={17} className="text-brand" /> Today's earnings goal</p>
            <p className="text-sm font-semibold text-muted-foreground">{naira(earningsToday)} <span className="text-muted-foreground/60">/ {naira(DAILY_GOAL)}</span></p>
          </div>
          <div className="mt-3 h-3 rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-brand to-brand-mid transition-all duration-700" style={{ width: `${goalPct}%` }} />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{goalPct}% there — {naira(Math.max(0, DAILY_GOAL - earningsToday))} to go. Keep riding!</p>
        </div>

        {/* Stats */}
        <div className="mt-4 grid gap-3 grid-cols-2 lg:grid-cols-4">
          <Stat icon={<Wallet className="text-gold" />} label="Earnings today" value={naira(earningsToday)} />
          <Stat icon={<Package className="text-brand" />} label="Completed today" value={completed} />
          <Stat icon={<Clock className="text-blueish" />} label="Online time" value="3h 24m" />
          <Stat icon={<TrendingUp className="text-success" />} label="Per hour" value={naira(Math.round(earningsToday / 3.4))} />
        </div>

        {/* Earnings breakdown of last completed */}
        {lastEarned && (
          <div className="mt-4 bg-success/10 border border-success/30 rounded-2xl p-5 animate-slide-up">
            <p className="font-bold text-dark inline-flex items-center gap-2"><CheckCircle2 size={17} className="text-success" /> Delivery complete · {lastEarned.ref}</p>
            <div className="mt-3 space-y-1.5 text-sm">
              <Row label="Base fare"><span>{naira(lastEarned.base)}</span></Row>
              <Row label="Distance bonus"><span>{naira(lastEarned.bonus)}</span></Row>
              <div className="pt-2 mt-1 border-t border-success/30 flex justify-between font-bold text-dark">
                <span>You earned</span><span className="text-success">+{naira(lastEarned.base + lastEarned.bonus)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Active delivery */}
        {active && (
          <section className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">Active Delivery</h2>
            <div className="bg-brand text-primary-foreground rounded-2xl p-5 shadow-md">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-xs opacity-80">#{active.ref}</p>
                  <p className="font-bold text-lg">{active.vendor} → {active.customer}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">{active.status === "accepted" ? "Pickup" : "Delivering"}</span>
              </div>
              {/* route summary */}
              <div className="mt-4 flex items-center gap-3 rounded-xl bg-white/10 p-3 text-sm">
                <Navigation size={16} className="shrink-0" />
                <span className="font-semibold">{active.pickup} → {active.dropoff.split(" · ")[0]}</span>
                <span className="ml-auto inline-flex items-center gap-1 text-white/80"><Bike size={13} /> {active.distance} · {active.eta}</span>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 text-sm">
                <div className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0" /><div><p className="opacity-80 text-xs">Pickup</p><p className="font-semibold">{active.pickup}</p></div></div>
                <div className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-gold" /><div><p className="opacity-80 text-xs">Drop-off</p><p className="font-semibold">{active.dropoff}</p></div></div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between gap-3">
                <span className="font-extrabold text-xl">+{naira(active.base + active.bonus)}</span>
                <div className="flex gap-2">
                  <button onClick={() => setConfirmCancel(true)} className="tap h-10 w-10 grid place-items-center rounded-full bg-white/15 hover:bg-white/25" aria-label="Cancel delivery"><XCircle size={17} /></button>
                  <button onClick={() => toast.info("Connecting via masked number…")} className="tap h-10 w-10 grid place-items-center rounded-full bg-white/15 hover:bg-white/25"><Phone size={16} /></button>
                  <button onClick={() => advance(active.id)} className="tap px-5 h-10 rounded-full bg-white text-brand font-bold hover:bg-white/90 transition">
                    {active.status === "accepted" ? "Confirm Pickup" : "Mark Delivered"}
                  </button>
                </div>
              </div>
              {confirmCancel && (
                <div className="mt-3 flex items-center justify-between gap-2 rounded-xl bg-white/10 p-3 animate-fade-in">
                  <span className="text-sm font-semibold text-white">Cancel this delivery?</span>
                  <div className="flex gap-2">
                    <button onClick={() => setConfirmCancel(false)} className="tap px-3 h-9 rounded-full bg-white/15 text-white text-sm font-semibold">Keep</button>
                    <button onClick={cancelActive} className="tap px-4 h-9 rounded-full bg-white text-error text-sm font-bold">Yes, cancel</button>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Available */}
        <section className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Available Deliveries</h2>
            <span className="text-xs text-muted-foreground">{available.length} near you</span>
          </div>
          <div className="mt-3 grid gap-3 lg:grid-cols-2">
            {available.map((d) => (
              <div key={d.id} className="bg-card border border-border rounded-2xl p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">#{d.ref}</p>
                    <p className="font-bold text-dark">{d.vendor}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-lg text-gold">+{naira(d.base + d.bonus)}</span>
                    <p className="text-[10px] text-muted-foreground">incl. {naira(d.bonus)} bonus</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 rounded-xl bg-background border border-border p-2.5 text-sm">
                  <Navigation size={14} className="text-brand shrink-0" />
                  <span className="font-semibold text-body truncate">{d.pickup} → {d.dropoff.split(" · ")[0]}</span>
                  <span className="ml-auto text-xs text-muted-foreground inline-flex items-center gap-1 shrink-0"><Bike size={12} /> {d.distance} · {d.eta}</span>
                </div>
                <div className="mt-4 flex items-center justify-end">
                  <button onClick={() => accept(d.id)} disabled={!!active}
                    className="tap px-5 h-9 rounded-full bg-brand text-primary-foreground font-semibold hover:bg-brand-mid disabled:opacity-40 disabled:cursor-not-allowed">
                    Accept
                  </button>
                </div>
              </div>
            ))}
            {available.length === 0 && (
              <p className="col-span-full text-center py-10 text-muted-foreground bg-card rounded-2xl border border-border">
                <CheckCircle2 className="mx-auto text-success mb-2" /> No new deliveries right now. Sit tight.
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-4">
      <span className="h-9 w-9 rounded-xl bg-background grid place-items-center">{icon}</span>
      <p className="mt-3 text-2xl font-extrabold text-dark">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="flex justify-between text-body"><span className="text-muted-foreground">{label}</span>{children}</div>;
}
