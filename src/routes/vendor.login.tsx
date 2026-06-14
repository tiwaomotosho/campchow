import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Store, ArrowLeft, Mail, Lock, Eye, EyeOff, Zap, User, MapPin, Clock, ChevronRight, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/Logo";
import { toast } from "sonner";

export const Route = createFileRoute("/vendor/login")({ component: VendorLogin });

type Mode = "choice" | "signin" | "register" | "hours" | "pending";

const ZONES = ["Youth Centre","2000 Chalets","Old Auditorium","Mission House","RECTEM","Emmanuel Park","Estate 12","Estate 13","The Pavilion","Canaan Land"];
const CATS  = ["Local Nigerian","Fast Food","Pastries","Beverages","Protein & Grills","Local Soup","Snacks & Drinks","Rice Dishes"];

function VendorShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="px-4 pt-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-brand"><ArrowLeft size={16}/> Back</Link>
      </div>
      <main className="flex-1 grid place-items-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center gap-3 mb-6">
            <span className="h-14 w-14 rounded-2xl bg-brand-light text-brand grid place-items-center"><Store size={28} strokeWidth={1.75}/></span>
            <Logo/>
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Vendor Portal</span>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}

function VendorLogin() {
  const navigate = useNavigate();
  const [mode, setMode]       = useState<Mode>("choice");
  const [loading, setLoading] = useState(false);
  // sign-in fields
  const [email, setEmail]     = useState("");
  const [pwd, setPwd]         = useState("");
  const [show, setShow]       = useState(false);
  // register step 1
  const [name, setName]       = useState("");
  const [cat, setCat]         = useState("");
  const [zone, setZone]       = useState("");
  const [phone, setPhone]     = useState("");
  // register step 2 (hours) — simple toggles
  const [days, setDays]       = useState<string[]>(["Mon","Tue","Wed","Thu","Fri","Sat"]);

  const fillDemo = () => { setEmail("mamatitiskitchen@campchow.app"); setPwd("demo1234"); };
  const fillReg  = () => { setName("Mama Titi's Kitchen"); setCat("Local Nigerian"); setZone("Youth Centre"); setPhone("08012345678"); };

  const goSignIn = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate({ to: "/vendor/dashboard" }); }, 1200);
  };
  const goRegHours = () => { if (!name || !zone) { toast.error("Please fill all fields"); return; } setMode("hours"); };
  const goPending  = () => { setLoading(true); setTimeout(() => { setLoading(false); setMode("pending"); }, 1000); };

  const inp = "w-full h-11 pl-10 pr-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand text-sm transition";



  if (mode === "pending") return (
    <VendorShell>
      <div className="bg-card border border-border rounded-2xl p-8 shadow-sm text-center">
        <div className="h-16 w-16 rounded-full bg-amber/15 grid place-items-center mx-auto mb-4"><ShieldCheck size={32} className="text-amber"/></div>
        <h2 className="text-xl font-bold text-dark">Application received!</h2>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">Your kitchen has been submitted for review. We'll verify your details and activate your account within <strong>24 hours</strong>.</p>
        <div className="mt-6 p-4 rounded-xl bg-amber/10 border border-amber/20 text-left space-y-2">
          <p className="text-xs font-bold uppercase text-amber tracking-wider">What happens next</p>
          <p className="text-sm text-body">1. We verify your estate presence and contact</p>
          <p className="text-sm text-body">2. You receive a confirmation message</p>
          <p className="text-sm text-body">3. Your menu goes live to camp visitors</p>
        </div>
        <Link to="/" className="tap mt-6 inline-flex items-center justify-center w-full h-12 rounded-xl bg-brand text-white font-bold hover:bg-brand-mid">Return Home</Link>
      </div>
    </VendorShell>
  );

  if (mode === "hours") return (
    <VendorShell>
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <h1 className="text-xl font-bold text-dark">Opening hours</h1>
        <p className="text-sm text-muted-foreground mt-1">Which days is your kitchen open?</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => (
            <button key={d} onClick={() => setDays(p => p.includes(d) ? p.filter(x=>x!==d) : [...p,d])}
              className={`tap px-4 h-10 rounded-full text-sm font-semibold border transition ${days.includes(d)?"bg-brand text-white border-brand":"bg-background border-border text-body"}`}>{d}</button>
          ))}
        </div>
        <p className="mt-5 text-sm text-muted-foreground">Typical hours: <strong className="text-dark">7:00 AM – 9:00 PM</strong> <span className="text-muted-foreground">(can be updated from dashboard)</span></p>
        <button onClick={goPending} className="tap mt-6 w-full h-12 rounded-xl bg-brand text-white font-bold hover:bg-brand-mid transition disabled:opacity-50" disabled={loading}>
          {loading ? "Submitting…" : "Submit Application →"}
        </button>
      </div>
    </VendorShell>
  );

  if (mode === "register") return (
    <VendorShell>
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-dark">List your kitchen</h1>
          <button onClick={fillReg} className="tap inline-flex items-center gap-1 px-3 h-8 rounded-full bg-gold-light text-gold text-xs font-bold"><Zap size={12}/> Fill demo</button>
        </div>
        <div className="space-y-4">
          <Field label="Kitchen / Restaurant name">
            <div className="relative"><Store size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"/>
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Mama Titi's Kitchen" className={inp}/></div>
          </Field>
          <Field label="Category">
            <select value={cat} onChange={e=>setCat(e.target.value)} className={inp+" pl-3"}>
              <option value="">Select category…</option>
              {CATS.map(c=><option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Primary zone">
            <div className="relative"><MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"/>
              <select value={zone} onChange={e=>setZone(e.target.value)} className={inp}>
                <option value="">Select zone…</option>
                {ZONES.map(z=><option key={z}>{z}</option>)}
              </select></div>
          </Field>
          <Field label="Phone number">
            <div className="relative"><User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"/>
              <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="08012345678" className={inp}/></div>
          </Field>
        </div>
        <button onClick={goRegHours} className="tap mt-6 w-full h-12 rounded-xl bg-brand text-white font-bold hover:bg-brand-mid transition">Continue <ChevronRight size={16} className="inline"/></button>
        <p className="mt-4 text-center text-xs text-muted-foreground">Already listed? <button onClick={()=>setMode("signin")} className="text-brand font-semibold">Sign in</button></p>
      </div>
    </VendorShell>
  );

  if (mode === "signin") return (
    <VendorShell>
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-dark">Welcome back</h1>
          <button onClick={fillDemo} className="tap inline-flex items-center gap-1 px-3 h-8 rounded-full bg-gold-light text-gold text-xs font-bold"><Zap size={12}/> Demo login</button>
        </div>
        <div className="space-y-4">
          <Field label="Email">
            <div className="relative"><Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"/>
              <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="kitchen@example.com" className={inp}/></div>
          </Field>
          <Field label="Password">
            <div className="relative"><Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"/>
              <input value={pwd} onChange={e=>setPwd(e.target.value)} type={show?"text":"password"} placeholder="••••••••" className={inp+" pr-10"}/>
              <button type="button" onClick={()=>setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{show?<EyeOff size={15}/>:<Eye size={15}/>}</button>
            </div>
          </Field>
        </div>
        <button onClick={goSignIn} disabled={loading} className="tap mt-6 w-full h-12 rounded-xl bg-brand text-white font-bold hover:bg-brand-mid transition disabled:opacity-50">
          {loading ? "Signing in…" : "Login as Vendor"}
        </button>
        <p className="mt-4 text-center text-xs text-muted-foreground">New kitchen? <button onClick={()=>setMode("register")} className="text-brand font-semibold">List your kitchen</button></p>
      </div>
    </VendorShell>
  );

  // choice screen
  return (
    <VendorShell>
      <div className="space-y-3">
        <button onClick={()=>setMode("signin")} className="tap w-full flex items-center gap-4 bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-brand/30 hover:-translate-y-0.5 transition-all">
          <span className="h-12 w-12 rounded-xl bg-brand-light grid place-items-center shrink-0"><Store size={22} className="text-brand"/></span>
          <div className="flex-1 text-left"><p className="font-bold text-dark">Sign in to my kitchen</p><p className="text-sm text-muted-foreground">Existing vendor dashboard</p></div>
          <ChevronRight size={18} className="text-muted-foreground"/>
        </button>
        <button onClick={()=>setMode("register")} className="tap w-full flex items-center gap-4 bg-gradient-to-r from-brand to-brand-mid rounded-2xl p-5 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
          <span className="h-12 w-12 rounded-xl bg-white/15 grid place-items-center shrink-0"><Store size={22} className="text-white"/></span>
          <div className="flex-1 text-left"><p className="font-bold text-white">List my kitchen</p><p className="text-sm text-white/70">Register a new vendor account</p></div>
          <ChevronRight size={18} className="text-white/70"/>
        </button>
        <p className="text-center text-xs text-muted-foreground pt-2">Free to join during the pilot phase · CampChow Redemption City</p>
      </div>
    </VendorShell>
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
