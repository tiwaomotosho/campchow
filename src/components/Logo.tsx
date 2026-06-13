import { ShoppingCart } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const text = size === "lg" ? "text-3xl" : size === "sm" ? "text-lg" : "text-xl";
  const icon = size === "lg" ? 28 : size === "sm" ? 18 : 22;
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <span className="grid place-items-center h-9 w-9 rounded-xl bg-brand text-primary-foreground shadow-sm">
        <ShoppingCart size={icon} strokeWidth={1.75} />
      </span>
      <span className={`font-extrabold tracking-tight ${text}`}>
        <span className="text-brand">Camp</span>
        <span className="text-gold">Chow</span>
      </span>
    </Link>
  );
}
