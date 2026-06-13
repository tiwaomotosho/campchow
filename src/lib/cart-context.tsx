import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { MAMA_TITI_MENU, type MenuItem } from "./data";

export type CartLine = {
  id: string;
  name: string;
  price: number;
  image: string;
  imageFallback?: string;
  qty: number;
  vendorId: string;
};

type Ctx = {
  items: CartLine[];
  count: number;
  subtotal: number;
  add: (item: MenuItem, vendorId: string) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartCtx = createContext<Ctx | null>(null);

const seedFromMenu = (id: string) => {
  for (const s of MAMA_TITI_MENU) {
    const f = s.items.find((i) => i.id === id);
    if (f) return f;
  }
  return null;
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>(() => {
    // Pre-populate per spec
    const seed: CartLine[] = [];
    const r1 = seedFromMenu("mt-r1");
    const s3 = seedFromMenu("mt-s3");
    if (r1) seed.push({ id: r1.id, name: r1.name, price: r1.price, image: r1.image, imageFallback: r1.imageFallback, qty: 2, vendorId: "mama-titi" });
    if (s3) seed.push({ id: s3.id, name: s3.name, price: s3.price, image: s3.image, imageFallback: s3.imageFallback, qty: 1, vendorId: "mama-titi" });
    return seed;
  });

  // hydrate from sessionStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = sessionStorage.getItem("cc-cart");
    if (raw) {
      try { setItems(JSON.parse(raw)); } catch {}
    }
  }, []);
  useEffect(() => {
    if (typeof window === "undefined") return;
    sessionStorage.setItem("cc-cart", JSON.stringify(items));
  }, [items]);

  const add = (item: MenuItem, vendorId: string) => {
    setItems((prev) => {
      const found = prev.find((p) => p.id === item.id);
      if (found) return prev.map((p) => p.id === item.id ? { ...p, qty: p.qty + 1 } : p);
      return [...prev, { id: item.id, name: item.name, price: item.price, image: item.image, imageFallback: item.imageFallback, qty: 1, vendorId }];
    });
  };
  const setQty = (id: string, qty: number) => {
    setItems((prev) => qty <= 0 ? prev.filter((p) => p.id !== id) : prev.map((p) => p.id === id ? { ...p, qty } : p));
  };
  const remove = (id: string) => setItems((prev) => prev.filter((p) => p.id !== id));
  const clear = () => setItems([]);

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartCtx.Provider value={{ items, count, subtotal, add, setQty, remove, clear }}>
      {children}
    </CartCtx.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
