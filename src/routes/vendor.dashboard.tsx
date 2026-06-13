import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  LogOut, Bell, ChefHat, Bike, CheckCircle2, Clock, MessageSquare, Store,
  TrendingUp, Wallet, Star, ShieldCheck, Flame, CalendarClock, ArrowUpRight, MapPin, XCircle, History, CornerDownRight, Send,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { naira } from "@/lib/format";
import { toast } from "sonner";

export const Route = createFileRoute("/vendor/dashboard")({
  component: VendorDashboard,
});

type OrderStatus = "new" | "preparing" | "ready" | "completed";
type Order = {
  id: string; ref: string; customer: string;
  items: { name: string; qty: number }[];
  total: number; zone: string; acceptedAt: number; status: OrderStatus;
};

const now = Date.now();
const mins = (m: number) => now - m * 60_000;

const SEED: Order[] = [
  { id: "1", ref: "CC-7F3A", customer: "Sister Funke", items: [{ name: "Jollof Rice + Chicken", qty: 2 }, { name: "Fried Plantain", qty: 1 }], total: 3950, zone: "2000 Chalets · Block 501–1000", acceptedAt: mins(2), status: "new" },
  { id: "2", ref: "CC-8A12", customer: "Brother Tunde", items: [{ name: "White Rice + Egusi", qty: 1 }, { name: "Beef (3 pcs)", qty: 1 }], total: 2100, zone: "Youth Centre · Main Building", acceptedAt: mins(8), status: "preparing" },
  { id: "3", ref: "CC-6E91", customer: "Sister Adaeze", items: [{ name: "Fried Rice + Turkey", qty: 1 }], total: 2000, zone: "Estate 12 · Phase 2", acceptedAt: mins(13), status: "preparing" },
  { id: "4", ref: "CC-5C77", customer: "Brother Samuel", items: [{ name: "Grilled Chicken (full)", qty: 1 }, { name: "Coleslaw", qty: 2 }], total: 1600, zone: "Mission House · Reception", acceptedAt: mins(20), status: "ready" },
  { id: "5", ref: "CC-4B23", customer: "Sister Joy", items: [{ name: "Zobo (cup)", qty: 3 }], total: 750, zone: "Tree of Life · Main Entrance", acceptedAt: mins(64), status: "completed" },
];

const STATUS_META: Record<OrderStatus, { label: string; cls: string; icon: any }> = {
  new:       { label: "New",              cls: "bg-amber/15 text-amber",         icon: Bell },
  preparing: { label: "Preparing",        cls: "bg-blueish/15 text-blueish",     icon: ChefHat },
  ready:     { label: "Ready for Pickup", cls: "bg-purpleish/15 text-purpleish", icon: Bike },
  completed: { label: "Completed",        cls: "bg-success/15 text-success",     icon: CheckCircle2 },
};

const WEEK = [42000, 58000, 51000, 67000, 73000, 61000, 84500]; // last 7 days revenue
const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

function elapsed(fromTs: number) {
  const m = Math.max(0, Math.round((Date.now() - fromTs) / 60_000));
  return m < 1 ? "just now" : `${m} min`;
}

type VReview = { id: string; name: string; rating: number; date: string; comment: string; reply?: string };
const SEED_REVIEWS: VReview[] = [
  { id: "v1", name: "Sister Funke", rating: 5, date: "May 25", comment: "The jollof was smoky and delicious, delivery came straight to my chalet. Excellent!" },
  { id: "v2", name: "Brother Tunde", rating: 4, date: "May 24", comment: "Very good portions and authentic taste. Will order again.", reply: "Thank you Brother Tunde! We appreciate you." },
  { id: "v3", name: "Sister Adaeze", rating: 5, date: "May 23", comment: "Best food on the camp. The fried rice was exceptional." },
  { id: "v4", name: "Brother Samuel", rating: 3, date: "May 22", comment: "Food was good but delivery took a little longer than expected during peak." },
];

function VendorDashboard() {
  const [orders, setOrders] = useState<Order[]>(SEED);
  const [online, setOnline] = useState(true);
  const [tab, setTab] = useState<"all" | OrderStatus>("all");
  const [cancelId, setCancelId] = useState<string | null>(null);
  const [view, setView] = useState<"orders" | "reviews">("orders");
  const [reviews, setReviews] = useState<VReview[]>(SEED_REVIEWS);
  const [replyId, setReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [, force] = useState(0);

  // live ticking timers
  useEffect(() => {
    const t = setInterval(() => force((n) => n + 1), 15_000);
    return () => clearInterval(t);
  }, []);

  const advance = (id: string) => {
    setOrders((prev) => prev.map((o) => {
      if (o.id !== id) return o;
      const next: Record<OrderStatus, OrderStatus> = { new: "preparing", preparing: "ready", ready: "completed", completed: "completed" };
      const nx = next[o.status];
      toast.success(`Order ${o.ref} → ${STATUS_META[nx].label}`);
      return { ...o, status: nx, acceptedAt: nx === "preparing" ? Date.now() : o.acceptedAt };
    }));
  };

  const cancelOrder = (id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
    setCancelId(null);
    toast.error("Order cancelled", { description: "The customer has been notified and refunded." });
  };

  const submitReply = (id: string) => {
    if (!replyText.trim()) return;
    setReviews((prev) => prev.map((r) => r.id === id ? { ...r, reply: replyText.trim() } : r));
    setReplyId(null); setReplyText("");
    toast.success("Reply posted");
  };
  const reviewAvg = (reviews.reduce((s2, r) => s2 + r.rating, 0) / reviews.length).toFixed(1);

  const filtered = tab === "all" ? orders : orders.filter((o) => o.status === tab);
  const revenueToday = orders.reduce((s, o) => s + o.total, 0);
  const newCount = orders.filter((o) => o.status === "new").length;
  const prepCount = orders.filter((o) => o.status === "preparing").length;
  const weekTotal = WEEK.reduce((a, b) => a + b, 0);
  const maxBar = Math.max(...WEEK);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-card border-b border-border">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="hidden sm:inline-flex px-2 py-1 rounded-full bg-muted text-xs font-semibold text-muted-foreground">Vendor</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => { setOnline(!online); toast(online ? "You are now offline" : "You are now accepting orders"); }}
              className={`tap inline-flex items-center gap-2 px-3 h-9 rounded-full text-sm font-semibold border transition ${online ? "bg-success/15 text-success border-success/30" : "bg-muted text-muted-foreground border-border"}`}>
              <span className={`h-2 w-2 rounded-full ${online ? "bg-success animate-pulse" : "bg-muted-foreground"}`} />
              {online ? "Online" : "Offline"}
            </button>
            <Link to="/" className="h-9 w-9 grid place-items-center rounded-full hover:bg-muted text-muted-foreground" aria-label="Logout"><LogOut size={18} /></Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        {/* Profile card */}
        <div className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4">
          <span className="h-14 w-14 rounded-2xl bg-brand-light text-brand grid place-items-center shrink-0"><Store size={24} strokeWidth={1.75} /></span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-dark truncate">Mama Titi's Kitchen</h1>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/15 text-success text-[11px] font-bold shrink-0"><ShieldCheck size={11} /> Verified</span>
            </div>
            <p className="text-sm text-muted-foreground inline-flex items-center gap-2 mt-0.5">
              <span className="inline-flex items-center gap-1"><Star size={13} className="fill-gold text-gold" /> 4.8</span>
              · 312 reviews · Youth Centre Area
            </p>
          </div>
        </div>

        {/* Earnings strip */}
        <div className="mt-4 grid gap-3 md:grid-cols-[1.4fr_1fr]">
          {/* revenue + sparkline */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase font-semibold tracking-wider text-muted-foreground">Revenue · this week</p>
                <p className="mt-1 text-3xl font-extrabold text-dark">{naira(weekTotal)}</p>
                <p className="mt-1 text-sm text-success font-semibold inline-flex items-center gap-1"><ArrowUpRight size={14} /> +15% vs last week</p>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gold-light text-gold text-xs font-bold"><Flame size={12} /> 5-day streak</span>
            </div>
            {/* sparkline */}
            <div className="mt-4 flex items-end justify-between gap-2" style={{ height: 120 }}>
              {WEEK.map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1.5 h-full">
                  <span className="text-[9px] font-semibold text-muted-foreground">{Math.round(v / 1000)}k</span>
                  <div
                    className="w-full max-w-[26px] rounded-t-md bg-gradient-to-t from-brand to-brand-mid transition-all duration-700"
                    style={{ height: `${Math.max(8, Math.round((v / maxBar) * 84))}px` }}
                    title={naira(v)}
                  />
                  <span className="text-[10px] text-muted-foreground">{DAYS[i]}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-4">
              <Link to="/vendor/transactions" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"><History size={14}/> Transactions</Link>
              <Link to="/vendor/earnings" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:underline"><Wallet size={14}/> Earnings history</Link>
            </div>
          </div>

          {/* payout card */}
          <div className="rounded-2xl p-5 text-white" style={{ background: "linear-gradient(150deg, oklch(0.20 0.025 155), oklch(0.30 0.07 152))" }}>
            <p className="text-xs uppercase font-semibold tracking-wider text-white/60 inline-flex items-center gap-1.5"><Wallet size={13} /> Next payout</p>
            <p className="mt-1 text-3xl font-extrabold">{naira(revenueToday)}</p>
            <p className="text-sm text-white/60 mt-0.5">Pending settlement</p>
            <div className="mt-4 pt-4 border-t border-white/15 flex items-center gap-2 text-sm">
              <CalendarClock size={15} className="text-gold" />
              <span className="text-white/80">Pays out <strong className="text-white">tomorrow, 9:00 AM</strong></span>
            </div>
            <p className="mt-2 text-xs text-white/45">GTBank · ****4821 · auto-settlement</p>
          </div>
        </div>

        {/* View switcher */}
        <div className="mt-6 inline-flex p-1 rounded-full bg-muted">
          <button onClick={() => setView("orders")} className={`px-5 h-9 rounded-full text-sm font-semibold transition ${view === "orders" ? "bg-card shadow-sm text-dark" : "text-muted-foreground"}`}>Orders</button>
          <button onClick={() => setView("reviews")} className={`px-5 h-9 rounded-full text-sm font-semibold transition inline-flex items-center gap-1.5 ${view === "reviews" ? "bg-card shadow-sm text-dark" : "text-muted-foreground"}`}>
            <Star size={14} className="fill-gold text-gold" /> Reviews
          </button>
        </div>

        {/* Quick stats */}
        <div className="mt-4 grid gap-3 grid-cols-2 lg:grid-cols-4">
          <Stat icon={<Bell className="text-amber" />} label="New orders" value={newCount} />
          <Stat icon={<ChefHat className="text-blueish" />} label="Preparing" value={prepCount} />
          <Stat icon={<TrendingUp className="text-brand" />} label="Orders today" value={orders.length} />
          <Stat icon={<Wallet className="text-gold" />} label="Earned today" value={naira(revenueToday)} />
        </div>

        {view === "orders" && (<>
        {/* Tabs */}
        <div className="mt-6 flex gap-2 overflow-x-auto scrollbar-none">
          {(["all", "new", "preparing", "ready", "completed"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`shrink-0 px-4 h-9 rounded-full text-sm font-semibold border transition ${tab === t ? "bg-brand text-primary-foreground border-brand" : "bg-card border-border text-body hover:border-brand/40"}`}>
              {t === "all" ? "All orders" : STATUS_META[t].label}
            </button>
          ))}
        </div>

        {/* Orders */}
        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          {filtered.map((o) => {
            const meta = STATUS_META[o.status];
            const Icon = meta.icon;
            const showTimer = o.status === "preparing" || o.status === "new";
            return (
              <div key={o.id} className="bg-card border border-border rounded-2xl p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">#{o.ref}</p>
                    <p className="font-bold text-dark">{o.customer}</p>
                    <p className="text-xs text-muted-foreground inline-flex items-center gap-1 mt-0.5"><MapPin size={12} /> {o.zone}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 ${meta.cls}`}>
                    <Icon size={12} /> {meta.label}
                  </span>
                </div>
                <ul className="mt-3 space-y-1 text-sm text-body">
                  {o.items.map((it, idx) => (
                    <li key={idx} className="flex gap-2"><span className="text-muted-foreground">{it.qty}×</span> {it.name}</li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-border">
                  {cancelId === o.id ? (
                    <div className="flex items-center justify-between gap-2 animate-fade-in">
                      <span className="text-sm font-semibold text-error">Cancel this order?</span>
                      <div className="flex gap-2">
                        <button onClick={() => setCancelId(null)} className="tap px-3 h-9 rounded-full bg-muted text-body text-sm font-semibold">Keep</button>
                        <button onClick={() => cancelOrder(o.id)} className="tap px-4 h-9 rounded-full bg-error text-white text-sm font-bold">Yes, cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-extrabold text-lg text-dark">{naira(o.total)}</span>
                        {showTimer && (
                          <span className="ml-2 inline-flex items-center gap-1 text-xs font-semibold text-amber">
                            <Clock size={12} /> {elapsed(o.acceptedAt)}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {(o.status === "new" || o.status === "preparing") && (
                          <button onClick={() => setCancelId(o.id)} className="tap h-9 w-9 grid place-items-center rounded-full bg-error/10 text-error hover:bg-error/20" aria-label="Cancel order"><XCircle size={16} /></button>
                        )}
                        <button onClick={() => toast.info("Opening chat…")} className="tap h-9 w-9 grid place-items-center rounded-full bg-muted text-body hover:bg-muted/70" aria-label="Message"><MessageSquare size={15} /></button>
                        {o.status !== "completed" && (
                          <button onClick={() => advance(o.id)} className="tap px-4 h-9 rounded-full bg-brand text-primary-foreground text-sm font-semibold hover:bg-brand-mid">
                            {o.status === "new" && "Accept"}
                            {o.status === "preparing" && "Mark Ready"}
                            {o.status === "ready" && "Mark Picked Up"}
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && <p className="col-span-full text-center py-12 text-muted-foreground">No orders in this view.</p>}
        </div>
        </>)}

        {view === "reviews" && (
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="h-card text-dark">Customer Reviews</h2>
              <span className="inline-flex items-center gap-1 text-sm text-muted-foreground"><Star size={14} className="fill-gold text-gold" /> {reviewAvg} · {reviews.length} reviews</span>
            </div>
            <div className="grid gap-3 lg:grid-cols-2">
              {reviews.map((r) => (
                <div key={r.id} className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="h-9 w-9 rounded-full bg-brand text-white grid place-items-center font-bold text-sm">{r.name[0]}</span>
                      <div>
                        <p className="font-semibold text-dark text-sm">{r.name}</p>
                        <span className="inline-flex gap-0.5">{[1,2,3,4,5].map(i => <Star key={i} size={12} className={i <= r.rating ? "fill-gold text-gold" : "text-border"} />)}</span>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{r.date}</span>
                  </div>
                  <p className="mt-2.5 text-sm text-body leading-relaxed">{r.comment}</p>

                  {r.reply ? (
                    <div className="mt-3 ml-4 pl-3 border-l-2 border-brand/30 bg-brand-light/40 rounded-r-lg p-3">
                      <p className="text-xs font-bold text-brand inline-flex items-center gap-1.5"><CornerDownRight size={12} /> Owner response</p>
                      <p className="mt-1 text-sm text-body">{r.reply}</p>
                    </div>
                  ) : replyId === r.id ? (
                    <div className="mt-3 flex gap-2 animate-fade-in">
                      <input autoFocus value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Write a public response…"
                        className="flex-1 h-10 px-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand" />
                      <button onClick={() => submitReply(r.id)} className="tap h-10 px-4 rounded-xl bg-brand text-white text-sm font-bold inline-flex items-center gap-1.5"><Send size={14} /> Post</button>
                    </div>
                  ) : (
                    <button onClick={() => { setReplyId(r.id); setReplyText(""); }} className="tap mt-3 inline-flex items-center gap-1.5 px-3 h-9 rounded-full bg-muted text-body text-sm font-semibold hover:bg-muted/70">
                      <CornerDownRight size={14} /> Reply as owner
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
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
