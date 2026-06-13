import { useState, useEffect } from "react";

/**
 * Three-tier image with graceful degradation:
 *   1. primary src  →  2. fallbackSrc  →  3. branded gradient + initials
 * Simple + reliable: no ref-phase state writes, no opacity gating that can
 * strand an image at opacity-0. The <img> is always visible; the shimmer
 * sits behind it and is covered once the image paints.
 */
const PALETTES = [
  ["oklch(0.45 0.11 150)", "oklch(0.30 0.07 152)"],
  ["oklch(0.62 0.13 78)",  "oklch(0.45 0.11 150)"],
  ["oklch(0.56 0.12 152)", "oklch(0.20 0.025 155)"],
  ["oklch(0.50 0.10 120)", "oklch(0.40 0.10 160)"],
];
function initials(name: string) {
  return name.split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");
}
function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

type Tier = "primary" | "fallback" | "gradient";

export function SmartImage({
  src, fallbackSrc, alt, seed, className = "", imgClassName = "", eager = false,
}: {
  src: string;
  fallbackSrc?: string;
  alt: string;
  seed?: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
}) {
  const [tier, setTier] = useState<Tier>("primary");

  // reset to primary whenever the source changes
  useEffect(() => { setTier("primary"); }, [src, fallbackSrc]);

  const activeSrc = tier === "primary" ? src : tier === "fallback" ? fallbackSrc : undefined;
  const name = seed ?? alt;
  const [c1, c2] = PALETTES[hash(name) % PALETTES.length];

  const onError = () => {
    setTier((t) => (t === "primary" && fallbackSrc ? "fallback" : "gradient"));
  };

  return (
    <div className={`relative overflow-hidden bg-muted ${className}`}>
      {tier === "gradient" ? (
        <div className="absolute inset-0 grid place-items-center" style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}>
          <span className="text-white/90 font-extrabold text-3xl tracking-wide select-none">{initials(name)}</span>
        </div>
      ) : (
        <img
          key={activeSrc}
          src={activeSrc}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          onError={onError}
          className={`absolute inset-0 w-full h-full object-cover ${imgClassName}`}
        />
      )}
    </div>
  );
}
