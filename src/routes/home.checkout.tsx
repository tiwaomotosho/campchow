import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { useMemo, useState, useEffect } from "react";
import { ArrowLeft, Check, MapPin, Wallet, Smartphone, CreditCard, Loader2, Zap } from "lucide-react";
import { TopNav } from "@/components/TopNav";
import { useCart } from "@/lib/cart-context";
import { naira } from "@/lib/format";
import { LOCATIONS, getAreas, getPickupPoints, BANKS } from "@/lib/data";

export const Route = createFileRoute("/home/checkout")({
  component: Checkout,
});

const DELIVERY = 300;
type Step = 1 | 2 | 3;
type Pay = "cash" | "ussd" | "card";

function Checkout() {
  const navigate = useNavigate();
  const { user, isLoggedIn, requireAuth } = useAuth();
  const { items, subtotal, clear } = useCart();
  const [step, setStep] = useState<Step>(1);

  // Step 1
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loc, setLoc] = useState("");
  const [area, setArea] = useState("");
  const [pickup, setPickup] = useState("");
  const [notes, setNotes] = useState("");

  // pre-fill identity from the signed-in user; gate guests into auth
  useEffect(() => {
    if (user) {
      setName((n) => n || user.name);
      if (user.phone) setPhone((p) => p || user.phone!.replace(/^\+\d+\s*/, ""));
    }
  }, [user]);
  useEffect(() => {
    if (!isLoggedIn) requireAuth("Sign in to confirm your delivery details and place your order.");
  }, [isLoggedIn]);

  // Step 2
  const [pay, setPay] = useState<Pay>("cash");
  const [bank, setBank] = useState<string>("");
  const [card, setCard] = useState({ num: "", exp: "", cvv: "" });

  // Step 3
  const [placing, setPlacing] = useState(false);

  const service = Math.round(subtotal * 0.05);
  const total = subtotal + DELIVERY + service;

  const step1Valid = name.trim() && /^[0-9+\s-]{7,}$/.test(phone) && loc && area && pickup;
  const step2Valid = pay === "cash" || (pay === "ussd" && bank) || (pay === "card" && card.num && card.exp && card.cvv);

  const place = () => {
    setPlacing(true);
    setTimeout(() => {
      clear();
      navigate({ to: "/home/order-confirmed" });
    }, 1500);
  };

  if (items.length === 0 && !placing) {
    return (
      <div className="min-h-screen bg-background">
        <TopNav />
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <p className="text-muted-foreground">Your cart is empty.</p>
          <Link to="/home" className="mt-4 inline-flex px-5 h-11 items-center rounded-full bg-brand text-primary-foreground font-semibold">Browse vendors</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main className="mx-auto max-w-3xl px-4 py-6 pb-20 pb-safe" style={{ paddingBottom: "max(5rem, env(safe-area-inset-bottom))" }}>
        <button onClick={() => step === 1 ? navigate({ to: "/home/cart" }) : setStep((step - 1) as Step)}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-brand mb-4">
          <ArrowLeft size={16} /> Back
        </button>
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-dark">Checkout</h1>
          {step === 1 && (
            <button
              onClick={() => {
                setName("Adeola Johnson");
                setPhone("0812 345 6789");
                setLoc("2000 Chalets");
                setArea("Block 501–1000");
                setPickup("Block Entrance");
                setNotes("Call when you reach the block entrance.");
              }}
              className="tap inline-flex items-center gap-1.5 px-3.5 h-9 rounded-full bg-gold-light border border-gold/30 text-gold text-xs font-bold hover:brightness-105 transition"
            >
              <Zap size={13} /> Fill demo details
            </button>
          )}
        </div>

        <StepIndicator step={step} />

        {step === 1 && (
          <section key="s1" className="animate-fade-up mt-6 bg-card rounded-2xl border border-border p-5 space-y-5">
            <Field label="Full Name" required>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Brother Daniel" className={inputCls} />
            </Field>
            <Field label="Phone Number" required>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="08012345678" inputMode="tel" className={inputCls} />
            </Field>

            <div>
              <p className="text-sm font-semibold text-dark mb-2 inline-flex items-center gap-1.5"><MapPin size={15} className="text-brand" /> Delivery Location <span className="text-error">*</span></p>
              <div className="grid gap-3">
                <Select value={loc} onChange={(v) => { setLoc(v); setArea(""); setPickup(""); }} placeholder="Select Location" options={LOCATIONS} />
                <Select value={area} onChange={(v) => { setArea(v); setPickup(""); }} placeholder="Select Area" options={loc ? getAreas(loc) : []} disabled={!loc} />
                <Select value={pickup} onChange={setPickup} placeholder="Select Pickup Point" options={loc && area ? getPickupPoints(loc, area) : []} disabled={!area} />
              </div>
              {loc && area && pickup && (
                <div className="mt-3 p-3 rounded-xl bg-brand-light text-brand text-sm font-semibold inline-flex items-center gap-2">
                  <MapPin size={16} /> {loc} › {area} › {pickup}
                </div>
              )}
            </div>

            <Field label="Delivery Notes (optional)">
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Landmarks, instructions, etc." className={`${inputCls} py-3 resize-none`} />
            </Field>

            <button
              disabled={!step1Valid}
              onClick={() => setStep(2)}
              className="w-full h-12 rounded-xl bg-brand text-primary-foreground font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-mid transition"
            >
              Continue to Payment
            </button>
          </section>
        )}

        {step === 2 && (
          <section key="s2" className="animate-fade-up mt-6 bg-card rounded-2xl border border-border p-5 space-y-3">
            <PayCard active={pay === "cash"} onClick={() => setPay("cash")} icon={<Wallet className="text-brand" />} title="Cash on Delivery" subtitle="Pay your rider when your order arrives" />
            <PayCard active={pay === "ussd"} onClick={() => setPay("ussd")} icon={<Smartphone className="text-blueish" />} title="Pay with USSD" subtitle="Select your bank and dial. No internet needed." />
            {pay === "ussd" && (
              <div className="pl-4 pt-1 space-y-3">
                <Select value={bank} onChange={setBank} placeholder="Select bank" options={BANKS.map((b) => `${b.name} ${b.code}`)} />
                {bank && (
                  <div className="p-3 rounded-xl bg-success/10 border border-success/30 text-success font-semibold text-sm">
                    Dial <span className="font-mono">{bank.split(" ").pop()}</span> on your phone to complete payment
                  </div>
                )}
              </div>
            )}
            <PayCard active={pay === "card"} onClick={() => setPay("card")} icon={<CreditCard className="text-gold" />} title="Pay with Card" subtitle="Visa, Mastercard, Verve" />
            {pay === "card" && (
              <div className="pl-4 pt-1 grid gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2"><input placeholder="Card number" value={card.num} onChange={(e) => setCard({ ...card, num: e.target.value })} className={inputCls} /></div>
                <input placeholder="MM/YY" value={card.exp} onChange={(e) => setCard({ ...card, exp: e.target.value })} className={inputCls} />
                <input placeholder="CVV" value={card.cvv} onChange={(e) => setCard({ ...card, cvv: e.target.value })} className={inputCls} />
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button onClick={() => setStep(1)} className="flex-1 h-12 rounded-xl border border-border font-semibold">Back</button>
              <button disabled={!step2Valid} onClick={() => setStep(3)} className="flex-1 h-12 rounded-xl bg-brand text-primary-foreground font-bold disabled:opacity-50">Review Order</button>
            </div>
          </section>
        )}

        {step === 3 && (
          <section key="s3" className="animate-fade-up mt-6 space-y-4">
            <div className="bg-card rounded-2xl border border-border p-5">
              <h3 className="font-bold text-dark mb-3">Order Items</h3>
              <div className="divide-y divide-border">
                {items.map((it) => (
                  <div key={it.id} className="flex justify-between py-2 text-sm">
                    <span className="text-body">{it.qty}× {it.name}</span>
                    <span className="font-semibold">{naira(it.price * it.qty)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border p-5 space-y-3 text-sm">
              <Row label="Customer"><span className="font-semibold">{name}</span></Row>
              <Row label="Phone"><span className="font-semibold">{phone}</span></Row>
              <Row label="Delivery"><span className="font-semibold text-right">{loc} › {area} › {pickup}</span></Row>
              {notes && <Row label="Notes"><span className="font-semibold text-right">{notes}</span></Row>}
              <Row label="Payment">
                <span className="font-semibold">
                  {pay === "cash" && "Cash on Delivery"}
                  {pay === "ussd" && `USSD · ${bank}`}
                  {pay === "card" && `Card · ${card.num.slice(-4).padStart(4, "•")}`}
                </span>
              </Row>
            </div>

            <div className="bg-card rounded-2xl border border-border p-5 space-y-2 text-sm">
              <Row label="Subtotal">{naira(subtotal)}</Row>
              <Row label="Delivery">{naira(DELIVERY)}</Row>
              <Row label="Service Fee">{naira(service)}</Row>
              <div className="pt-3 mt-2 border-t border-border flex justify-between">
                <span className="font-bold text-dark">Total</span>
                <span className="font-extrabold text-xl text-dark">{naira(total)}</span>
              </div>
            </div>

            <button onClick={place} disabled={placing} className="tap w-full h-14 rounded-2xl bg-brand text-primary-foreground font-bold text-base hover:bg-brand-mid transition inline-flex items-center justify-center gap-2 disabled:opacity-80">
              {placing ? <><Loader2 className="animate-spin" size={20} /> Placing order…</> : <>Place Order · {naira(total)}</>}
            </button>
          </section>
        )}
      </main>
    </div>
  );
}

const inputCls = "w-full h-11 px-4 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand text-sm";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm font-semibold text-dark mb-1.5 block">{label} {required && <span className="text-error">*</span>}</label>
      {children}
    </div>
  );
}

function Select({ value, onChange, placeholder, options, disabled }: { value: string; onChange: (v: string) => void; placeholder: string; options: string[]; disabled?: boolean }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`${inputCls} disabled:opacity-50 disabled:cursor-not-allowed appearance-none bg-no-repeat`}
      style={{
        backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%234A6355' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
        backgroundPosition: "right 0.85rem center",
      }}
    >
      <option value="">{placeholder}</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

function PayCard({ active, onClick, icon, title, subtitle }: { active: boolean; onClick: () => void; icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <button onClick={onClick} className={`w-full flex items-start gap-3 p-4 rounded-xl border-2 text-left transition ${active ? "border-brand bg-brand-light/50" : "border-border bg-card hover:border-brand/40"}`}>
      <span className="h-10 w-10 rounded-xl bg-background grid place-items-center shrink-0">{icon}</span>
      <span className="flex-1">
        <span className="block font-semibold text-dark">{title}</span>
        <span className="block text-sm text-muted-foreground">{subtitle}</span>
      </span>
      <span className={`h-5 w-5 rounded-full border-2 grid place-items-center shrink-0 ${active ? "border-brand bg-brand" : "border-border"}`}>
        {active && <Check size={12} className="text-primary-foreground" strokeWidth={3} />}
      </span>
    </button>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-body">{children}</span>
    </div>
  );
}

function StepIndicator({ step }: { step: Step }) {
  const labels = ["Delivery", "Payment", "Review"];
  return (
    <div className="mt-5 flex items-center gap-2">
      {labels.map((l, i) => {
        const n = (i + 1) as Step;
        const done = n < step;
        const active = n === step;
        return (
          <div key={l} className="flex-1 flex items-center gap-2">
            <div className={`h-8 w-8 rounded-full grid place-items-center text-sm font-bold shrink-0 ${done ? "bg-brand text-primary-foreground" : active ? "bg-brand text-primary-foreground ring-4 ring-brand-light" : "bg-muted text-muted-foreground"}`}>
              {done ? <Check size={16} /> : n}
            </div>
            <span className={`text-sm font-semibold hidden sm:inline ${active ? "text-dark" : "text-muted-foreground"}`}>{l}</span>
            {i < labels.length - 1 && <div className={`flex-1 h-0.5 ${done ? "bg-brand" : "bg-border"}`} />}
          </div>
        );
      })}
    </div>
  );
}
