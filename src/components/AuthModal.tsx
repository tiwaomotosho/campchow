import { useEffect, useRef, useState } from "react";
import {
  X, ArrowLeft, Phone, Mail, ChevronDown, Check, Loader2, ShieldCheck, Zap, Sparkles,
} from "lucide-react";
import { useAuth, type User } from "@/lib/auth-context";
import { toast } from "sonner";

type Screen = "choice" | "phone" | "otp" | "profile" | "email" | "signin" | "welcome";

const DEMO_NAMES = ["Adebayo Okafor", "Chiamaka Eze", "Tunde Bakare", "Ngozi Okonkwo", "Emeka Nwosu"];
const COUNTRIES = [
  { flag: "🇳🇬", code: "+234", name: "Nigeria" },
  { flag: "🇬🇭", code: "+233", name: "Ghana" },
  { flag: "🇰🇪", code: "+254", name: "Kenya" },
  { flag: "🇿🇦", code: "+27",  name: "South Africa" },
  { flag: "🇬🇧", code: "+44",  name: "United Kingdom" },
  { flag: "🇺🇸", code: "+1",   name: "United States" },
];
const rand = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];

export function AuthModal() {
  const { _modalOpen, _reason, _close, login } = useAuth();
  const [screen, setScreen] = useState<Screen>("choice");
  const [loadingLabel, setLoadingLabel] = useState<string | null>(null);

  // phone path state
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [ccOpen, setCcOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [secs, setSecs] = useState(30);

  // profile / email
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pendingMethod, setPendingMethod] = useState<User["method"]>("phone");
  const [welcomeName, setWelcomeName] = useState("");

  useEffect(() => {
    document.body.style.overflow = _modalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [_modalOpen]);

  // reset to first screen whenever it reopens
  useEffect(() => {
    if (_modalOpen) { setScreen("choice"); setLoadingLabel(null); setOtp(["","","","","",""]); setPhone(""); setName(""); setEmail(""); }
  }, [_modalOpen]);

  /* ── OTP countdown ── */
  useEffect(() => {
    if (screen !== "otp") return;
    setSecs(30);
    const id = setInterval(() => setSecs((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [screen]);

  // auto-fill OTP when timer hits zero
  useEffect(() => {
    if (screen !== "otp" || secs > 0) return;
    const code = Array.from({ length: 6 }, () => String(Math.floor(Math.random() * 10)));
    code.forEach((d, i) => setTimeout(() => {
      setOtp((prev) => { const n = [...prev]; n[i] = d; return n; });
      if (i === 5) setTimeout(() => finishOtp(true), 400);
    }, i * 110));
  }, [secs, screen]);

  if (!_modalOpen) return null;

  /* ── flows ── */
  const ssoLogin = (method: "google" | "apple") => {
    setLoadingLabel(method === "google" ? "Connecting to Google…" : "Connecting to Apple…");
    setTimeout(() => {
      const nm = rand(DEMO_NAMES);
      setLoadingLabel(null);
      finishWelcome({ name: nm, method, email: `${nm.split(" ")[0].toLowerCase()}@gmail.com` });
    }, 1500);
  };

  const onOtpChange = (i: number, val: string) => {
    const digit = val.replace(/\D/g, "").slice(-1);
    setOtp((prev) => { const n = [...prev]; n[i] = digit; return n; });
    if (digit && i < 5) otpRefs.current[i + 1]?.focus();
    if (digit && i === 5) setTimeout(() => finishOtp(false), 250);
  };
  const onOtpPaste = (e: React.ClipboardEvent) => {
    const txt = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (txt.length) { setOtp(txt.padEnd(6, "").split("").slice(0, 6)); if (txt.length === 6) setTimeout(() => finishOtp(false), 300); }
  };
  const finishOtp = (auto: boolean) => {
    setLoadingLabel("Verifying…");
    setTimeout(() => { setLoadingLabel(null); setPendingMethod("phone"); setScreen("profile"); if (auto) toast.info("Code auto-filled for demo"); }, 700);
  };

  const finishWelcome = (u: User) => {
    login(u);                       // sets session + closes modal flag handled below
    setWelcomeName(u.name.split(" ")[0]);
    setScreen("welcome");
    setTimeout(() => {
      _close();
      toast.success(`🎉 Welcome, ${u.name.split(" ")[0]}!`, { description: "You can now place orders and earn rewards." });
    }, 1900);
  };

  const fillDemo = () => { setName("Adeola Johnson"); setEmail("adeola.johnson@campchow.app"); };

  /* ── shell ── */
  const Backdrop = (
    <div className="fixed inset-0 z-[60] bg-black/55 animate-fade-in" onClick={_close} />
  );

  const header = (back?: () => void) => (
    <div className="flex items-center justify-between mb-5">
      {back ? (
        <button onClick={back} className="grid place-items-center h-9 w-9 -ml-1 rounded-full hover:bg-muted text-body"><ArrowLeft size={20} /></button>
      ) : <span className="w-9" />}
      <span className="font-extrabold text-lg"><span className="text-brand">Camp</span><span className="text-gold">Chow</span></span>
      <button onClick={_close} className="grid place-items-center h-9 w-9 -mr-1 rounded-full hover:bg-muted text-body"><X size={20} /></button>
    </div>
  );

  const loadingOverlay = loadingLabel && (
    <div className="absolute inset-0 z-10 grid place-items-center bg-card/85 backdrop-blur rounded-t-3xl sm:rounded-3xl">
      <div className="text-center">
        <Loader2 size={32} className="text-brand animate-spin mx-auto" />
        <p className="mt-3 font-semibold text-body">{loadingLabel}</p>
      </div>
    </div>
  );

  let body: React.ReactNode;

  if (screen === "welcome") {
    body = (
      <div className="text-center py-6" style={{ minHeight: 320 }}>
        <div className="mx-auto h-24 w-24 rounded-full bg-success grid place-items-center animate-checkmark pulse-ring">
          <Check size={48} className="text-white" strokeWidth={3} />
        </div>
        <h2 className="mt-6 text-2xl font-extrabold text-dark">Welcome to CampChow, {welcomeName}!</h2>
        <p className="mt-2 text-muted-foreground">Your account is ready. Let's find you something delicious.</p>
      </div>
    );
  } else if (screen === "choice") {
    body = (
      <>
        {header()}
        <h2 className="text-xl font-extrabold text-dark text-center">Join the Camp's food network</h2>
        <p className="mt-1 text-sm text-muted-foreground text-center">{_reason || "Order from your favourite vendors, track your rider, and earn rewards."}</p>
        <div className="mt-6 space-y-2.5">
          <button onClick={() => ssoLogin("google")} className="tap w-full h-12 rounded-xl border border-border bg-card font-semibold text-body inline-flex items-center justify-center gap-2.5 hover:bg-muted transition">
            <GoogleG /> Continue with Google
          </button>
          <button onClick={() => ssoLogin("apple")} className="tap w-full h-12 rounded-xl bg-foreground text-background font-semibold inline-flex items-center justify-center gap-2.5 hover:opacity-90 transition">
            <AppleLogo /> Continue with Apple
          </button>
          <button onClick={() => setScreen("phone")} className="tap w-full h-12 rounded-xl bg-brand text-white font-semibold inline-flex items-center justify-center gap-2.5 hover:bg-brand-mid transition">
            <Phone size={18} /> Continue with Phone
          </button>
        </div>
        <div className="my-4 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex-1 h-px bg-border" /> or <span className="flex-1 h-px bg-border" />
        </div>
        <button onClick={() => { setPendingMethod("email"); setScreen("email"); }} className="tap w-full h-11 rounded-xl border border-border font-semibold text-body inline-flex items-center justify-center gap-2 hover:bg-muted transition">
          <Mail size={17} /> Sign up with Email
        </button>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <button onClick={() => setScreen("signin")} className="font-semibold text-brand hover:underline">Sign in</button>
        </p>
        <button onClick={_close} className="mt-3 w-full text-center text-xs text-muted-foreground hover:text-body">Continue browsing as guest</button>
      </>
    );
  } else if (screen === "phone") {
    body = (
      <>
        {header(() => setScreen("choice"))}
        <h2 className="text-xl font-extrabold text-dark">What's your number?</h2>
        <p className="mt-1 text-sm text-muted-foreground">We'll send a one-time code to verify it's you.</p>
        <div className="mt-6 flex gap-2">
          <div className="relative">
            <button onClick={() => setCcOpen((v) => !v)} className="h-12 px-3 rounded-xl border border-border bg-card font-semibold text-body inline-flex items-center gap-1.5 hover:bg-muted">
              <span className="text-lg leading-none">{country.flag}</span> {country.code} <ChevronDown size={15} />
            </button>
            {ccOpen && (
              <div className="absolute top-14 left-0 z-20 w-56 max-h-60 overflow-auto bg-card border border-border rounded-xl shadow-xl p-1">
                {COUNTRIES.map((c) => (
                  <button key={c.code} onClick={() => { setCountry(c); setCcOpen(false); }} className="w-full flex items-center gap-2 px-3 h-10 rounded-lg hover:bg-muted text-left text-sm">
                    <span className="text-lg">{c.flag}</span> <span className="flex-1">{c.name}</span> <span className="text-muted-foreground">{c.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <input
            autoFocus inputMode="numeric" value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/[^\d ]/g, ""))}
            placeholder="0812 345 6789"
            className="flex-1 h-12 px-4 rounded-xl border border-border bg-card text-[15px] focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
          />
        </div>
        <button
          onClick={() => setScreen("otp")}
          disabled={phone.replace(/\D/g, "").length < 7}
          className="tap mt-6 w-full h-12 rounded-xl bg-brand text-white font-bold hover:bg-brand-mid transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Send Code
        </button>
        <p className="mt-4 text-center text-xs text-muted-foreground inline-flex items-center gap-1.5 justify-center w-full">
          <ShieldCheck size={13} className="text-success" /> Your number stays private. Demo only — no real SMS sent.
        </p>
      </>
    );
  } else if (screen === "otp") {
    const pct = (secs / 30) * 100;
    body = (
      <>
        {header(() => setScreen("phone"))}
        <h2 className="text-xl font-extrabold text-dark">Enter your code</h2>
        <p className="mt-1 text-sm text-muted-foreground">Sent to {country.code} {phone || "0812 345 6789"}</p>
        <div className="mt-6 flex justify-between gap-2" onPaste={onOtpPaste}>
          {otp.map((d, i) => (
            <input
              key={i} ref={(el) => { otpRefs.current[i] = el; }}
              value={d} inputMode="numeric" maxLength={1}
              onChange={(e) => onOtpChange(i, e.target.value)}
              onKeyDown={(e) => { if (e.key === "Backspace" && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus(); }}
              className="w-12 h-14 text-center text-2xl font-bold rounded-xl border-2 border-border bg-card focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition"
            />
          ))}
        </div>
        <div className="mt-6 flex flex-col items-center gap-2">
          <div className="relative h-14 w-14">
            <svg className="h-14 w-14 -rotate-90" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="17" fill="none" stroke="var(--color-border)" strokeWidth="3" />
              <circle cx="20" cy="20" r="17" fill="none" stroke="var(--color-brand)" strokeWidth="3"
                strokeDasharray={2 * Math.PI * 17} strokeDashoffset={(2 * Math.PI * 17) * (1 - pct / 100)}
                strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s linear" }} />
            </svg>
            <span className="absolute inset-0 grid place-items-center text-sm font-bold text-brand">{Math.max(0, secs)}</span>
          </div>
          <p className="text-xs text-muted-foreground">Enter any 6 digits, or wait — we'll auto-fill for the demo.</p>
        </div>
      </>
    );
  } else if (screen === "profile") {
    body = (
      <>
        {header(() => setScreen("choice"))}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-dark">Almost there.</h2>
            <p className="mt-1 text-sm text-muted-foreground">Just a few details to set up your account.</p>
          </div>
          <button onClick={fillDemo} className="tap inline-flex items-center gap-1.5 px-3 h-9 rounded-full bg-gold-light border border-gold/30 text-gold text-xs font-bold hover:brightness-105 shrink-0">
            <Zap size={13} /> Fill demo
          </button>
        </div>
        <div className="mt-5 space-y-3">
          <Field label="Full name"><input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Sister Funke Adeyemi" className="auth-input" /></Field>
          <Field label="Email (optional)"><input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="auth-input" /></Field>
        </div>
        <button onClick={() => finishWelcome({ name: name.trim() || "Adeola Johnson", email: email || undefined, phone: `${country.code} ${phone}`, method: pendingMethod })}
          className="tap mt-6 w-full h-12 rounded-xl bg-brand text-white font-bold hover:bg-brand-mid transition">
          Create My Account
        </button>
      </>
    );
  } else if (screen === "email") {
    body = (
      <>
        {header(() => setScreen("choice"))}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-dark">Sign up with email</h2>
            <p className="mt-1 text-sm text-muted-foreground">Quick and easy — no password rules to fight.</p>
          </div>
          <button onClick={fillDemo} className="tap inline-flex items-center gap-1.5 px-3 h-9 rounded-full bg-gold-light border border-gold/30 text-gold text-xs font-bold hover:brightness-105 shrink-0">
            <Zap size={13} /> Fill demo
          </button>
        </div>
        <div className="mt-5 space-y-3">
          <Field label="Full name"><input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Brother Samuel" className="auth-input" /></Field>
          <Field label="Email"><input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="auth-input" /></Field>
          <Field label="Password"><input type="password" defaultValue="" placeholder="••••••••" className="auth-input" /></Field>
        </div>
        <button onClick={() => finishWelcome({ name: name.trim() || "Adeola Johnson", email: email || "adeola.johnson@campchow.app", method: "email" })}
          className="tap mt-6 w-full h-12 rounded-xl bg-brand text-white font-bold hover:bg-brand-mid transition">
          Create Account
        </button>
      </>
    );
  } else { // signin
    body = (
      <>
        {header(() => setScreen("choice"))}
        <h2 className="text-xl font-extrabold text-dark">Welcome back</h2>
        <p className="mt-1 text-sm text-muted-foreground">Sign in to your CampChow account.</p>
        <div className="mt-5 space-y-3">
          <Field label="Phone or email"><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Phone number or email" className="auth-input" /></Field>
          <Field label="Password"><input type="password" placeholder="••••••••" className="auth-input" /></Field>
        </div>
        <button onClick={() => toast.info("Reset link sent — check your inbox.")} className="mt-2 text-xs font-semibold text-brand hover:underline">Forgot password?</button>
        <button onClick={() => finishWelcome({ name: "Adeola Johnson", method: "email", email: "adeola.johnson@campchow.app" })}
          className="tap mt-5 w-full h-12 rounded-xl bg-brand text-white font-bold hover:bg-brand-mid transition">
          Sign In
        </button>
      </>
    );
  }

  return (
    <>
      {Backdrop}
      {/* bottom sheet on mobile, centred modal on desktop */}
      <div className="fixed z-[60] inset-x-0 bottom-0 sm:inset-0 sm:grid sm:place-items-center sm:p-4 pointer-events-none">
        <div className="relative pointer-events-auto w-full sm:max-w-md bg-card rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 pb-8 animate-slide-up sm:animate-fade-in max-h-[92vh] overflow-y-auto">
          {/* grab handle on mobile */}
          <div className="sm:hidden mx-auto h-1.5 w-12 rounded-full bg-border mb-4" />
          {loadingOverlay}
          {body}
        </div>
      </div>
    </>
  );
}


function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function GoogleG() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.9 2.4 30.3 0 24 0 14.6 0 6.4 5.4 2.5 13.2l7.9 6.1C12.3 13.2 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.5 3-2.2 5.5-4.7 7.2l7.3 5.7C43.9 38 46.5 31.8 46.5 24.5z"/><path fill="#FBBC05" d="M10.4 28.3c-.5-1.5-.8-3-.8-4.6s.3-3.1.8-4.6l-7.9-6.1C.9 16.3 0 20 0 24s.9 7.7 2.5 11l7.9-6.7z"/><path fill="#34A853" d="M24 48c6.3 0 11.6-2.1 15.5-5.7l-7.3-5.7c-2 1.4-4.7 2.3-8.2 2.3-6.3 0-11.7-3.7-13.6-9.1l-7.9 6.1C6.4 42.6 14.6 48 24 48z"/></svg>
  );
}
function AppleLogo() {
  return <svg width="16" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.05 12.5c0-2.5 2-3.7 2.1-3.8-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.1-2.9.9-3.6.9-.8 0-1.9-.9-3.1-.8-1.6 0-3.1.9-3.9 2.4-1.7 2.9-.4 7.2 1.2 9.5.8 1.1 1.7 2.4 3 2.3 1.2-.1 1.6-.8 3.1-.8 1.4 0 1.8.8 3.1.7 1.3 0 2.1-1.1 2.9-2.3.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.5-1-2.6-3.7zM14.6 4.6c.7-.8 1.1-2 1-3.1-1 0-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1.1.1 2.1-.5 2.8-1.3z"/></svg>;
}
