import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Download, Search, TrendingUp, Wallet, Package } from "lucide-react";
import { Logo } from "@/components/Logo";
import { naira } from "@/lib/format";
import { toast } from "sonner";

export const Route = createFileRoute("/vendor/transactions")({
  component: VendorTransactions,
});

type Txn = { date: string; ref: string; customer: string; items: number; total: number; zone: string; status: "Completed" | "Cancelled" | "Refunded" };

const DATA: Txn[] = [
  { date: "2026-05-25", ref: "CC-7F3A", customer: "Sister Funke", items: 3, total: 3950, zone: "2000 Chalets", status: "Completed" },
  { date: "2026-05-25", ref: "CC-8A12", customer: "Brother Tunde", items: 2, total: 2100, zone: "Youth Centre", status: "Completed" },
  { date: "2026-05-25", ref: "CC-6E91", customer: "Sister Adaeze", items: 1, total: 2000, zone: "Estate 12", status: "Completed" },
  { date: "2026-05-24", ref: "CC-5C77", customer: "Brother Samuel", items: 3, total: 1600, zone: "Mission House", status: "Completed" },
  { date: "2026-05-24", ref: "CC-4B23", customer: "Sister Joy", items: 3, total: 750, zone: "Tree of Life", status: "Refunded" },
  { date: "2026-05-24", ref: "CC-3A88", customer: "Brother Paul", items: 2, total: 2850, zone: "Canaan Land", status: "Completed" },
  { date: "2026-05-23", ref: "CC-2B14", customer: "Sister Grace", items: 4, total: 4200, zone: "Prayer City", status: "Completed" },
  { date: "2026-05-23", ref: "CC-1F90", customer: "Brother Daniel", items: 1, total: 1800, zone: "The Pavilion", status: "Cancelled" },
  { date: "2026-05-23", ref: "CC-0E5C", customer: "Sister Mary", items: 2, total: 2400, zone: "Emmanuel Park", status: "Completed" },
  { date: "2026-05-22", ref: "CC-9D77", customer: "Brother John", items: 3, total: 3100, zone: "New Auditorium (Shimawa)", status: "Completed" },
];

const STATUS_CLS: Record<Txn["status"], string> = {
  Completed: "bg-success/15 text-success",
  Cancelled: "bg-error/15 text-error",
  Refunded: "bg-amber/15 text-amber",
};

function VendorTransactions() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"all" | Txn["status"]>("all");

  const rows = useMemo(() => DATA.filter((t) => {
    if (status !== "all" && t.status !== status) return false;
    if (q.trim()) { const s = q.toLowerCase(); if (!t.customer.toLowerCase().includes(s) && !t.ref.toLowerCase().includes(s) && !t.zone.toLowerCase().includes(s)) return false; }
    return true;
  }), [q, status]);

  const completed = DATA.filter((t) => t.status === "Completed");
  const gross = completed.reduce((s, t) => s + t.total, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 bg-card border-b border-border">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link to="/vendor/dashboard" className="grid place-items-center h-9 w-9 rounded-full hover:bg-muted text-body"><ArrowLeft size={20} /></Link>
            <Logo />
          </div>
          <button onClick={() => toast.info("Export — coming soon")} className="inline-flex items-center gap-2 px-3 h-9 rounded-full bg-muted text-muted-foreground text-sm font-semibold cursor-not-allowed">
            <Download size={15} /> Export <span className="text-[10px] bg-gold-light text-gold px-1.5 py-0.5 rounded-full font-bold">SOON</span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl font-bold text-dark">Transaction History</h1>
        <p className="text-muted-foreground text-sm mt-1">Mama Titi's Kitchen · all orders</p>

        {/* summary */}
        <div className="mt-4 grid gap-3 grid-cols-2 lg:grid-cols-3">
          <Stat icon={<Wallet className="text-gold" />} label="Gross completed" value={naira(gross)} />
          <Stat icon={<Package className="text-brand" />} label="Total orders" value={DATA.length} />
          <Stat icon={<TrendingUp className="text-success" />} label="Completion rate" value="80%" />
        </div>

        {/* filters */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by reference, customer, or zone…" className="w-full h-11 pl-10 pr-4 rounded-xl bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand" />
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-none">
            {(["all", "Completed", "Cancelled", "Refunded"] as const).map((s) => (
              <button key={s} onClick={() => setStatus(s)} className={`shrink-0 px-4 h-11 rounded-xl text-sm font-semibold border transition ${status === s ? "bg-brand text-white border-brand" : "bg-card border-border text-body hover:border-brand/40"}`}>{s === "all" ? "All" : s}</button>
            ))}
          </div>
        </div>

        {/* table */}
        <div className="mt-4 bg-card border border-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Reference</th>
                  <th className="px-4 py-3 font-semibold">Customer</th>
                  <th className="px-4 py-3 font-semibold hidden sm:table-cell">Items</th>
                  <th className="px-4 py-3 font-semibold hidden md:table-cell">Zone</th>
                  <th className="px-4 py-3 font-semibold text-right">Total</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((t, i) => (
                  <tr key={t.ref} className={`border-t border-border ${i % 2 ? "bg-background/40" : ""}`}>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{t.date}</td>
                    <td className="px-4 py-3 font-mono text-xs">{t.ref}</td>
                    <td className="px-4 py-3 font-medium text-dark">{t.customer}</td>
                    <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground">{t.items}</td>
                    <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">{t.zone}</td>
                    <td className="px-4 py-3 text-right font-bold text-dark whitespace-nowrap">{naira(t.total)}</td>
                    <td className="px-4 py-3"><span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold ${STATUS_CLS[t.status]}`}>{t.status}</span></td>
                  </tr>
                ))}
                {rows.length === 0 && <tr><td colSpan={7} className="px-4 py-10 text-center text-muted-foreground">No transactions match your filters.</td></tr>}
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
