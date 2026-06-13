import { useState, useEffect, useRef } from "react";

/**
 * Three-tier image with graceful degradation:
 *   1. primary src  →  2. fallbackSrc  →  3. branded gradient + initials
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
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const name = seed ?? alt;
  const [c1, c2] = PALETTES[hash(name) % PALETTES.length];

  // reset only when the actual source changes
  useEffect(() => {
    setTier("primary");
    setLoaded(false);
  }, [src]);

  const activeSrc = tier === "primary" ? src : tier === "fallback" ? fallbackSrc : undefined;

  const onError = () => {
    setLoaded(false);
    setTier((t) => (t === "primary" && fallbackSrc ? "fallback" : "gradient"));
  };

  // catch images that were already cached before React attached onLoad
  const attachRef = (el: HTMLImageElement | null) => {
    imgRef.current = el;
    if (el && el.complete && el.naturalWidth > 0 && !loaded) {
      setLoaded(true);
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {tier !== "gradient" && !loaded && <div className="absolute inset-0 img-shimmer" />}

      {tier === "gradient" && (
        <div className="absolute inset-0 grid place-items-center" style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}>
          <span className="text-white/90 font-extrabold text-3xl tracking-wide select-none">{initials(name)}</span>
        </div>
      )}

      {tier !== "gradient" && activeSrc && (
        <img
          key={activeSrc}
          ref={attachRef}
          src={activeSrc}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          onLoad={() => setLoaded(true)}
          onError={onError}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"} ${imgClassName}`}
        />
      )}
    </div>
  );
}
