import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Bike, ArrowLeft, Lock, Eye, EyeOff, Zap, User, MapPin, ChevronRight, ShieldCheck, Smartphone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { toast } from "sonner";

export const Route = createFileRoute("/rider/login")({ component: RiderLogin });

type Mode = "choice" | "signin" | "register" | "pending";

const ZONES = ["Youth Centre","2000 Chalets","Old Auditorium","Mission House","RECTEM","Emmanuel Park","Estate 12","Estate 13","The Pavilion","Main Gate"];
const VEHICLES = ["Motorbike","Bicycle","On foot"];

function RiderLogin() {
  const navigate = useNavigate();
  const [mode, setMode]       = useState<Mode>("choice");
  const [loading, setLoading] = useState(false);
  // sign-in
  const [riderId, setRiderId] = useState("");
  const [pwd, setPwd]         = useState("");
  const [show, setShow]       = useState(false);
  // register
  const [name, setName]       = useState("");
  const [phone, setPhone]     = useState("");
  const [estateId, setEstateId] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [zone, setZone]       = useState("");

  const fillDemo = () => { setRiderId("RC-2024-04821"); setPwd("demo1234"); };
  const fillReg  = () => { setName("Brother Emmanuel Adeyemi"); setPhone("08012345678"); setEstateId("RC-2024-04821"); setVehicle("Motorbike"); setZone("Youth Centre"); };

  const goSignIn = () => { setLoading(true); setTimeout(()=>{ setLoading(false); navigate({to:"/rider/dashboard"}); },1200); };
  const goPending = () => {
    if (!name||!estateId||!vehicle) { toast.error("Please fill all required fields"); return; }
    setLoading(true); setTimeout(()=>{ setLoading(false); setMode("pending"); },1000);
  };

  const inp = "w-full h-11 pl-10 pr-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold text-sm transition";

  const Shell = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="px-4 pt-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-brand"><ArrowLeft size={16}/> Back</Link>
      </div>
      <main className="flex-1 grid place-items-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center gap-3 mb-6">
            <span className="h-14 w-14 rounded-2xl bg-gold-light text-gold grid place-items-center"><Bike size={28} strokeWidth={1.75}/></span>
            <Logo/>
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Rider Portal</span>
          </div>
          {children}
        </div>
      </main>
    </div>
  );

  if (mode === "pending") return (
    <Shell>
      <div className="bg-card border border-border rounded-2xl p-8 shadow-sm text-center">
        <div className="h-16 w-16 rounded-full bg-amber/15 grid place-items-center mx-auto mb-4"><ShieldCheck size={32} className="text-amber"/></div>
        <h2 className="text-xl font-bold text-dark">Application submitted!</h2>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">We're verifying your estate ID <strong className="text-dark font-mono">{estateId}</strong>. You'll be notified once activated.</p>
        <div className="mt-6 p-4 rounded-xl bg-amber/10 border border-amber/20 text-left space-y-2">
          <p className="text-xs font-bold uppercase text-amber tracking-wider">Verification steps</p>
          <p className="text-sm text-body">1. Estate ID verified against camp records</p>
          <p className="text-sm text-body">2. Phone confirmation sent</p>
          <p className="text-sm text-body">3. Go Online toggle activated on your dashboard</p>
        </div>
        <Link to="/" className="tap mt-6 inline-flex items-center justify-center w-full h-12 rounded-xl bg-gold text-dark font-bold hover:brightness-105 transition">Return Home</Link>
      </div>
    </Shell>
  );

  if (mode === "register") return (
    <Shell>
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-dark">Join the rider network</h1>
          <button onClick={fillReg} className="tap inline-flex items-center gap-1 px-3 h-8 rounded-full bg-gold-light text-gold text-xs font-bold"><Zap size={12}/> Fill demo</button>
        </div>
        <div className="space-y-4">
          <Field label="Full name">
            <div className="relative"><User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"/>
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Brother Emmanuel Adeyemi" className={inp}/></div>
          </Field>
          <Field label="Phone number">
            <div className="relative"><Smartphone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"/>
              <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="08012345678" className={inp}/></div>
          </Field>
          <Field label="Redemption City Estate ID">
            <div className="relative"><ShieldCheck size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"/>
              <input value={estateId} onChange={e=>setEstateId(e.target.value)} placeholder="RC-2024-XXXXX" className={inp+" font-mono"}/></div>
            <p className="text-[11px] text-muted-foreground mt-1">Your estate ID is used to verify you are a camp resident.</p>
          </Field>
          <Field label="Vehicle type">
            <div className="flex gap-2 flex-wrap">
              {VEHICLES.map(v=>(
                <button key={v} onClick={()=>setVehicle(v)} className={`tap px-4 h-10 rounded-full text-sm font-semibold border transition ${vehicle===v?"bg-gold text-dark border-gold":"bg-background border-border text-body"}`}>{v}</button>
              ))}
            </div>
          </Field>
          <Field label="Preferred delivery zone">
            <div className="relative"><MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"/>
              <select value={zone} onChange={e=>setZone(e.target.value)} className={inp}>
                <option value="">Select zone…</option>
                {ZONES.map(z=><option key={z}>{z}</option>)}
              </select></div>
          </Field>
        </div>
        <button onClick={goPending} disabled={loading} className="tap mt-6 w-full h-12 rounded-xl bg-gold text-dark font-bold hover:brightness-105 transition disabled:opacity-50">
          {loading?"Submitting…":"Submit Application"}
        </button>
        <p className="mt-4 text-center text-xs text-muted-foreground">Already registered? <button onClick={()=>setMode("signin")} className="text-brand font-semibold">Sign in</button></p>
      </div>
    </Shell>
  );

  if (mode === "signin") return (
    <Shell>
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-dark">Welcome back, rider</h1>
          <button onClick={fillDemo} className="tap inline-flex items-center gap-1 px-3 h-8 rounded-full bg-gold-light text-gold text-xs font-bold"><Zap size={12}/> Demo login</button>
        </div>
        <div className="space-y-4">
          <Field label="Estate ID or Phone">
            <div className="relative"><ShieldCheck size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"/>
              <input value={riderId} onChange={e=>setRiderId(e.target.value)} placeholder="RC-2024-04821" className={inp+" font-mono"}/></div>
          </Field>
          <Field label="Password">
            <div className="relative"><Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"/>
              <input value={pwd} onChange={e=>setPwd(e.target.value)} type={show?"text":"password"} placeholder="••••••••" className={inp+" pr-10"}/>
              <button type="button" onClick={()=>setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{show?<EyeOff size={15}/>:<Eye size={15}/>}</button>
            </div>
          </Field>
        </div>
        <button onClick={goSignIn} disabled={loading} className="tap mt-6 w-full h-12 rounded-xl bg-gold text-dark font-bold hover:brightness-105 transition disabled:opacity-50">
          {loading?"Signing in…":"Login as Rider"}
        </button>
        <p className="mt-4 text-center text-xs text-muted-foreground">New rider? <button onClick={()=>setMode("register")} className="text-brand font-semibold">Join the network</button></p>
      </div>
    </Shell>
  );

  // choice
  return (
    <Shell>
      <div className="space-y-3">
        <button onClick={()=>setMode("signin")} className="tap w-full flex items-center gap-4 bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-gold/30 hover:-translate-y-0.5 transition-all">
          <span className="h-12 w-12 rounded-xl bg-gold-light grid place-items-center shrink-0"><Bike size={22} className="text-gold"/></span>
          <div className="flex-1 text-left"><p className="font-bold text-dark">Sign in to my account</p><p className="text-sm text-muted-foreground">Existing rider dashboard</p></div>
          <ChevronRight size={18} className="text-muted-foreground"/>
        </button>
        <button onClick={()=>setMode("register")} className="tap w-full flex items-center gap-4 rounded-2xl p-5 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all" style={{background:"linear-gradient(135deg, oklch(0.62 0.13 78), oklch(0.50 0.11 70))"}}>
          <span className="h-12 w-12 rounded-xl bg-white/20 grid place-items-center shrink-0"><Bike size={22} className="text-white"/></span>
          <div className="flex-1 text-left"><p className="font-bold text-white">Join the rider network</p><p className="text-sm text-white/70">Register with your estate ID</p></div>
          <ChevronRight size={18} className="text-white/70"/>
        </button>
        <p className="text-center text-xs text-muted-foreground pt-2">Requires a valid Redemption City estate ID</p>
      </div>
    </Shell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">{label}</span>
      {children}
    </label>
  );
}
