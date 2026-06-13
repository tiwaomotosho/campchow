import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Download, Search, Wallet, Bike, Star } from "lucide-react";
import { Logo } from "@/components/Logo";
import { naira } from "@/lib/format";
import { toast } from "sonner";

export const Route = createFileRoute("/rider/transactions")({
  component: RiderTransactions,
});

type Trip = { date: string; ref: string; vendor: string; zone: string; distance: string; base: number; bonus: number; rating: number };

const DATA: Trip[] = [
  { date: "2026-05-25", ref: "CC-7F3A", vendor: "Mama Titi's Kitchen", zone: "2000 Chalets", distance: "1.2 km", base: 450, bonus: 150, rating: 5 },
  { date: "2026-05-25", ref: "CC-8A12", vendor: "Canaan Land Bakery", zone: "Estate 12", distance: "1.8 km", base: 550, bonus: 200, rating: 5 },
  { date: "2026-05-25", ref: "CC-9C45", vendor: "Mimi's Naija Kitchen", zone: "Mission House", distance: "950 m", base: 400, bonus: 100, rating: 4 },
  { date: "2026-05-24", ref: "CC-5C77", vendor: "Shalom Restaurant", zone: "Canaan Land", distance: "2.1 km", base: 600, bonus: 250, rating: 5 },
  { date: "2026-05-24", ref: "CC-4B23", vendor: "Delta Kitchen", zone: "Main Gate", distance: "2.4 km", base: 650, bonus: 300, rating: 5 },
  { date: "2026-05-24", ref: "CC-3A88", vendor: "Calvary Kitchen", zone: "Emmanuel Park", distance: "750 m", base: 400, bonus: 100, rating: 4 },
  { date: "2026-05-23", ref: "CC-2B14", vendor: "Grace Table Cafe", zone: "White House", distance: "1.1 km", base: 450, bonus: 150, rating: 5 },
  { date: "2026-05-23", ref: "CC-1F90", vendor: "Glory Shawarma", zone: "RECTEM", distance: "2.6 km", base: 700, bonus: 350, rating: 5 },
];

function RiderTransactions() {
  const [q, setQ] = useState("");
  const rows = useMemo(() => DATA.filter((t) => {
    if (!q.trim()) return true;
    const s = q.toLowerCase();
    return t.vendor.toLowerCase().includes(s) || t.ref.toLowerCase().includes(s) || t.zone.toLowerCase().includes(s);
  }), [q]);

  const weekTotal = DATA.reduce((s, t) => s + t.base + t.bonus, 0);
  const monthTotal = weekTotal * 4 + 3200;
  const avgRating = (DATA.reduce((s, t) => s + t.rating, 0) / DATA.length).toFixed(1);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 bg-card border-b border-border">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link to="/rider/dashboard" className="grid place-items-center h-9 w-9 rounded-full hover:bg-muted text-body"><ArrowLeft size={20} /></Link>
            <Logo />
          </div>
          <button onClick={() => toast.info("Export — coming soon")} className="inline-flex items-center gap-2 px-3 h-9 rounded-full bg-muted text-muted-foreground text-sm font-semibold cursor-not-allowed">
            <Download size={15} /> Export <span className="text-[10px] bg-gold-light text-gold px-1.5 py-0.5 rounded-full font-bold">SOON</span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl font-bold text-dark">Earnings History</h1>
        <p className="text-muted-foreground text-sm mt-1">Brother Emmanuel Adeyemi · RC-2024-04821</p>

        <div className="mt-4 grid gap-3 grid-cols-2 lg:grid-cols-3">
          <Stat icon={<Wallet className="text-gold" />} label="This week" value={naira(weekTotal)} />
          <Stat icon={<Wallet className="text-brand" />} label="This month" value={naira(monthTotal)} />
          <Stat icon={<Star className="text-gold" />} label="Avg rating" value={`${avgRating} ★`} />
        </div>

        <div className="mt-6 relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by vendor, reference, or zone…" className="w-full h-11 pl-10 pr-4 rounded-xl bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand" />
        </div>

        <div className="mt-4 bg-card border border-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Reference</th>
                  <th className="px-4 py-3 font-semibold">Vendor</th>
                  <th className="px-4 py-3 font-semibold hidden md:table-cell">Drop-off</th>
                  <th className="px-4 py-3 font-semibold hidden sm:table-cell">Distance</th>
                  <th className="px-4 py-3 font-semibold text-right">Base</th>
                  <th className="px-4 py-3 font-semibold text-right hidden sm:table-cell">Bonus</th>
                  <th className="px-4 py-3 font-semibold text-right">Earned</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((t, i) => (
                  <tr key={t.ref} className={`border-t border-border ${i % 2 ? "bg-background/40" : ""}`}>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{t.date}</td>
                    <td className="px-4 py-3 font-mono text-xs">{t.ref}</td>
                    <td className="px-4 py-3 font-medium text-dark">{t.vendor}</td>
                    <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">{t.zone}</td>
                    <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground"><span className="inline-flex items-center gap-1"><Bike size={12} /> {t.distance}</span></td>
                    <td className="px-4 py-3 text-right text-muted-foreground">{naira(t.base)}</td>
                    <td className="px-4 py-3 text-right hidden sm:table-cell text-gold font-semibold">+{naira(t.bonus)}</td>
                    <td className="px-4 py-3 text-right font-bold text-dark whitespace-nowrap">{naira(t.base + t.bonus)}</td>
                  </tr>
                ))}
                {rows.length === 0 && <tr><td colSpan={8} className="px-4 py-10 text-center text-muted-foreground">No trips match your search.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
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
