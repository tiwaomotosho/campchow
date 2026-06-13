import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Download, TrendingUp, Wallet, CreditCard, Calendar } from "lucide-react";
import { Logo } from "@/components/Logo";
import { naira } from "@/lib/format";
import { toast } from "sonner";

export const Route = createFileRoute("/vendor/earnings")({ component: VendorEarnings });

type Row = { date: string; ref: string; gross: number; commission: number; net: number; method: string; settled: boolean };

const DATA: Row[] = [
  { date:"2026-05-25", ref:"CC-7F3A", gross:3950, commission:316, net:3634, method:"Transfer", settled:true },
  { date:"2026-05-25", ref:"CC-8A12", gross:2100, commission:168, net:1932, method:"USSD",     settled:true },
  { date:"2026-05-25", ref:"CC-6E91", gross:2000, commission:160, net:1840, method:"Card",     settled:true },
  { date:"2026-05-24", ref:"CC-5C77", gross:1600, commission:128, net:1472, method:"Cash",     settled:true },
  { date:"2026-05-24", ref:"CC-4B23", gross:750,  commission:60,  net:690,  method:"USSD",     settled:true },
  { date:"2026-05-24", ref:"CC-3A88", gross:2850, commission:228, net:2622, method:"Transfer", settled:true },
  { date:"2026-05-23", ref:"CC-2B14", gross:4200, commission:336, net:3864, method:"Card",     settled:true },
  { date:"2026-05-23", ref:"CC-1F90", gross:1800, commission:144, net:1656, method:"Transfer", settled:false },
  { date:"2026-05-23", ref:"CC-0E5C", gross:2400, commission:192, net:2208, method:"USSD",     settled:false },
  { date:"2026-05-22", ref:"CC-9D77", gross:3100, commission:248, net:2852, method:"Card",     settled:true },
];

function VendorEarnings() {
  const [period, setPeriod] = useState<"week"|"month">("week");
  const rows = period === "week" ? DATA : DATA;
  const gross  = rows.reduce((s,r)=>s+r.gross,0);
  const commission = rows.reduce((s,r)=>s+r.commission,0);
  const net    = rows.reduce((s,r)=>s+r.net,0);
  const pending = rows.filter(r=>!r.settled).reduce((s,r)=>s+r.net,0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 bg-card border-b border-border">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link to="/vendor/dashboard" className="grid place-items-center h-9 w-9 rounded-full hover:bg-muted text-body"><ArrowLeft size={20}/></Link>
            <Logo/>
          </div>
          <button onClick={()=>toast.info("Export — coming soon")} className="inline-flex items-center gap-2 px-3 h-9 rounded-full bg-muted text-muted-foreground text-sm font-semibold cursor-not-allowed">
            <Download size={15}/> Export <span className="text-[10px] bg-gold-light text-gold px-1.5 py-0.5 rounded-full font-bold">SOON</span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-dark">Earnings History</h1>
            <p className="text-muted-foreground text-sm mt-0.5">Mama Titi's Kitchen · audit trail</p>
          </div>
          <div className="flex gap-2">
            {(["week","month"] as const).map(p=>(
              <button key={p} onClick={()=>setPeriod(p)} className={`tap px-4 h-9 rounded-full text-sm font-semibold border transition ${period===p?"bg-brand text-white border-brand":"bg-card border-border text-body"}`}>
                {p==="week"?"This week":"This month"}
              </button>
            ))}
          </div>
        </div>

        {/* Summary cards */}
        <div className="mt-5 grid gap-3 grid-cols-2 lg:grid-cols-4">
          <SCard icon={<Wallet className="text-gold"/>}    label="Gross revenue"    value={naira(gross)}      />
          <SCard icon={<CreditCard className="text-error"/>} label="CampChow commission (8%)" value={naira(commission)} sub="deducted" />
          <SCard icon={<TrendingUp className="text-success"/>} label="Net payout"   value={naira(net)}        />
          <SCard icon={<Calendar className="text-amber"/>} label="Pending settlement" value={naira(pending)}  sub="next cycle" />
        </div>

        {/* Payout schedule */}
        <div className="mt-4 p-4 rounded-xl bg-brand-light border border-brand/20 flex items-start gap-3">
          <Calendar size={18} className="text-brand mt-0.5 shrink-0"/>
          <div className="text-sm">
            <p className="font-semibold text-dark">Next settlement: <strong>Tomorrow, 9:00 AM</strong></p>
            <p className="text-muted-foreground">Settled directly to your GTBank account ending ****4821. Commission is deducted before transfer.</p>
          </div>
        </div>

        {/* Table */}
        <div className="mt-5 bg-card border border-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground text-left">
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Reference</th>
                  <th className="px-4 py-3 font-semibold text-right">Gross</th>
                  <th className="px-4 py-3 font-semibold text-right hidden sm:table-cell">Commission</th>
                  <th className="px-4 py-3 font-semibold text-right">Net</th>
                  <th className="px-4 py-3 font-semibold hidden md:table-cell">Method</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r,i)=>(
                  <tr key={r.ref} className={`border-t border-border ${i%2?"bg-background/40":""}`}>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{r.date}</td>
                    <td className="px-4 py-3 font-mono text-xs">{r.ref}</td>
                    <td className="px-4 py-3 text-right text-dark">{naira(r.gross)}</td>
                    <td className="px-4 py-3 text-right text-error hidden sm:table-cell">-{naira(r.commission)}</td>
                    <td className="px-4 py-3 text-right font-bold text-dark">{naira(r.net)}</td>
                    <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">{r.method}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold ${r.settled?"bg-success/15 text-success":"bg-amber/15 text-amber"}`}>
                        {r.settled?"Settled":"Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-border bg-muted/30">
                  <td colSpan={2} className="px-4 py-3 font-bold text-dark">TOTAL</td>
                  <td className="px-4 py-3 text-right font-bold text-dark">{naira(gross)}</td>
                  <td className="px-4 py-3 text-right font-bold text-error hidden sm:table-cell">-{naira(commission)}</td>
                  <td className="px-4 py-3 text-right font-bold text-success">{naira(net)}</td>
                  <td colSpan={2} className="px-4 py-3"/>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function SCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub?: string }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-4">
      <span className="h-9 w-9 rounded-xl bg-background grid place-items-center">{icon}</span>
      <p className="mt-3 text-xl font-extrabold text-dark">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
      {sub && <p className="text-[11px] text-muted-foreground">{sub}</p>}
    </div>
  );
}
