import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, X, ShoppingBag, Check, AlertCircle, ArrowLeft } from "lucide-react";
import { TopNav } from "@/components/TopNav";
import { SmartImage } from "@/components/SmartImage";
import { useCart } from "@/lib/cart-context";
import { naira } from "@/lib/format";

export const Route = createFileRoute("/home/cart")({
  component: Cart,
});

const DELIVERY = 300;

function Cart() {
  const { items, setQty, remove, subtotal } = useCart();
  const [promo, setPromo] = useState("");
  const [promoState, setPromoState] = useState<"idle" | "valid" | "invalid">("idle");

  const discount = promoState === "valid" ? Math.round(subtotal * 0.1) : 0;
  const service = Math.round(subtotal * 0.05);
  const total = Math.max(0, subtotal + DELIVERY + service - discount);

  const applyPromo = () => {
    setPromoState(promo.trim().toUpperCase() === "CAMP10" ? "valid" : "invalid");
  };

  const empty = items.length === 0;

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main className="mx-auto max-w-3xl px-4 py-6 pb-32">
        <Link to="/home" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-brand mb-4">
          <ArrowLeft size={16} /> Continue shopping
        </Link>
        <h1 className="text-2xl font-bold text-dark">Your Cart</h1>

        {empty ? (
          <div className="mt-12 text-center py-16 bg-card rounded-2xl border border-border">
            <div className="mx-auto h-16 w-16 rounded-full bg-brand-light grid place-items-center text-brand">
              <ShoppingBag size={28} />
            </div>
            <h3 className="mt-4 font-bold text-lg text-dark">Your cart is empty</h3>
            <p className="mt-1 text-sm text-muted-foreground">Add some delicious meals to get started.</p>
            <Link to="/home" className="mt-6 inline-flex items-center px-5 h-11 rounded-full bg-brand text-primary-foreground font-semibold">
              Browse vendors
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-4 bg-card rounded-2xl border border-border divide-y divide-border">
              {items.map((it) => (
                <div key={it.id} className="flex items-center gap-3 p-4">
                  <SmartImage src={it.image} fallbackSrc={it.imageFallback} alt={it.name} seed={it.name} className="h-16 w-16 rounded-xl shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-dark truncate">{it.name}</h4>
                    <p className="text-sm text-muted-foreground">{naira(it.price)}</p>
                  </div>
                  <div className="inline-flex items-center bg-background border border-border rounded-full">
                    <button onClick={() => setQty(it.id, it.qty - 1)} className="h-8 w-8 grid place-items-center text-brand"><Minus size={14} /></button>
                    <span className="w-6 text-center text-sm font-bold">{it.qty}</span>
                    <button onClick={() => setQty(it.id, it.qty + 1)} className="h-8 w-8 grid place-items-center text-brand"><Plus size={14} /></button>
                  </div>
                  <button onClick={() => remove(it.id)} className="h-8 w-8 grid place-items-center rounded-full text-muted-foreground hover:bg-error/10 hover:text-error" aria-label="Remove">
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Promo */}
            <div className="mt-4 bg-card rounded-2xl border border-border p-4">
              <p className="text-sm font-semibold text-dark mb-2">Promo code</p>
              <div className="flex gap-2">
                <input
                  value={promo}
                  onChange={(e) => { setPromo(e.target.value); setPromoState("idle"); }}
                  placeholder="Enter code (try CAMP10)"
                  className="flex-1 h-11 px-4 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand text-sm"
                />
                <button onClick={applyPromo} className="px-5 h-11 rounded-xl bg-dark text-white text-sm font-semibold">
                  Apply
                </button>
              </div>
              {promoState === "valid" && (
                <p className="mt-2 text-sm text-success inline-flex items-center gap-1.5"><Check size={14} /> CAMP10 applied. 10% off subtotal</p>
              )}
              {promoState === "invalid" && (
                <p className="mt-2 text-sm text-error inline-flex items-center gap-1.5"><AlertCircle size={14} /> Invalid promo code</p>
              )}
            </div>

            {/* Breakdown */}
            <div className="mt-4 bg-card rounded-2xl border border-border p-5 space-y-2.5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-semibold">{naira(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Delivery Fee</span><span className="font-semibold">{naira(DELIVERY)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Service Fee (5%)</span><span className="font-semibold">{naira(service)}</span></div>
              {discount > 0 && (
                <div className="flex justify-between text-success"><span>Discount (CAMP10)</span><span className="font-semibold">-{naira(discount)}</span></div>
              )}
              <div className="pt-3 mt-2 border-t border-border flex justify-between text-base">
                <span className="font-bold text-dark">Total</span>
                <span className="font-extrabold text-dark text-xl">{naira(total)}</span>
              </div>
            </div>

            <Link
              to="/home/checkout"
              className="mt-5 flex items-center justify-center h-14 rounded-2xl bg-brand text-primary-foreground font-bold text-base shadow-sm hover:bg-brand-mid transition"
            >
              Proceed to Checkout · {naira(total)}
            </Link>
          </>
        )}
      </main>
    </div>
  );
}
