import { useState, useEffect, useCallback } from "react";

/**
 * Three-tier image with graceful degradation:
 *   1. primary src  →  2. fallbackSrc  →  3. branded gradient + initials
 *
 * POSITIONING — two usage modes:
 *
 *   A) Component controls its own size (pass a sizing className like "h-40 w-full"):
 *        <SmartImage src={…} className="h-40 w-full rounded-xl" />
 *      The wrapper div is `relative` so the absolute-positioned img fills it.
 *
 *   B) Parent controls the size (pass "absolute inset-0" to fill a relative parent):
 *        <SmartImage src={…} className="absolute inset-0" />
 *      When className contains "absolute", we must NOT add `relative` — doing so
 *      resets the stacking context and the wrapper collapses to zero height because
 *      its only child (the img) is absolutely positioned with no intrinsic size.
 *      This was the root cause of all blank tiles: the SmartImage div was 0×0.
 *
 * SSR/HYDRATION SAFETY:
 *   The browser starts loading <img> tags the instant it parses the SSR'd HTML,
 *   before React hydrates and attaches `onError`. React does not replay missed
 *   media events. We close that race by checking `complete && naturalWidth === 0`
 *   in a ref callback — if true, the error happened pre-hydration and we degrade now.
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

  useEffect(() => { setTier("primary"); }, [src, fallbackSrc]);

  const activeSrc = tier === "primary" ? src : tier === "fallback" ? fallbackSrc : undefined;
  const name = seed ?? alt;
  const [c1, c2] = PALETTES[hash(name) % PALETTES.length];

  const degrade = useCallback(() => {
    setTier((t) => (t === "primary" && fallbackSrc ? "fallback" : "gradient"));
  }, [fallbackSrc]);

  const inspectOnMount = useCallback((node: HTMLImageElement | null) => {
    if (node && node.complete && node.naturalWidth === 0) degrade();
  }, [degrade]);

  // If the caller passes "absolute inset-0" (fill-parent mode), do NOT add
  // `relative` — it would override `absolute` and collapse the div to 0×0.
  const isAbsolute = className.includes("absolute");
  const wrapperClass = isAbsolute
    ? `overflow-hidden bg-muted ${className}`
    : `relative overflow-hidden bg-muted ${className}`;

  return (
    <div className={wrapperClass}>
      {tier === "gradient" ? (
        <div
          className="absolute inset-0 grid place-items-center"
          style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
        >
          <span className="text-white/90 font-extrabold text-3xl tracking-wide select-none">
            {initials(name)}
          </span>
        </div>
      ) : (
        <img
          key={activeSrc}
          ref={inspectOnMount}
          src={activeSrc}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          onError={degrade}
          className={`absolute inset-0 w-full h-full object-cover ${imgClassName}`}
        />
      )}
    </div>
  );
}
