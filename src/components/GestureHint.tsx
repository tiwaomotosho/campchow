import { useEffect, useState } from "react";

/**
 * Mobile-only full-screen overlay that fires once per session.
 * Demonstrates horizontal swipe on the category row, then self-destructs
 * on the first tap, scroll, or after 4 s.
 */
export function GestureHint({ onDismiss }: { onDismiss: () => void }) {
  const [leaving, setLeaving] = useState(false);

  const dismiss = () => {
    setLeaving(true);
    setTimeout(onDismiss, 320);
  };

  useEffect(() => {
    const t = setTimeout(dismiss, 4000);
    window.addEventListener("touchstart", dismiss, { once: true, passive: true });
    window.addEventListener("scroll", dismiss, { once: true, passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("touchstart", dismiss);
      window.removeEventListener("scroll", dismiss);
    };
  }, []);

  return (
    <div
      onClick={dismiss}
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center gap-6 pointer-events-auto"
      style={{
        background: "oklch(0.12 0.02 155 / 0.82)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        opacity: leaving ? 0 : 1,
        transition: "opacity 0.32s ease",
      }}
      aria-label="Swipe hint — tap to dismiss"
    >
      {/* animated hand */}
      <div className="relative flex items-center justify-center">
        {/* faint trail lines */}
        <div className="absolute flex items-center gap-1.5" style={{ left: "-48px" }}>
          {[1, 2, 3].map((i) => (
            <span
              key={i}
              className="block h-0.5 rounded-full bg-white"
              style={{
                width: `${i * 10}px`,
                opacity: 0.18 * i,
                animation: `cc-trail 1.6s ${i * 0.08}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>

        {/* hand SVG */}
        <div
          style={{ animation: "cc-swipe 1.6s ease-in-out infinite" }}
          className="text-white drop-shadow-xl"
        >
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <path
              d="M28 10c0-2.2-1.8-4-4-4s-4 1.8-4 4v16l-3.4-3.4A3.96 3.96 0 0 0 10 22.6c0 1.06.42 2.08 1.17 2.83l11.66 11.66A14 14 0 0 0 32.83 41H36c3.86 0 7-3.14 7-7V24c0-2.2-1.8-4-4-4-.7 0-1.36.18-1.94.5A3.98 3.98 0 0 0 33 18c-.9 0-1.73.3-2.4.8A4 4 0 0 0 28 17V10z"
              fill="white"
              fillOpacity=".95"
              stroke="white"
              strokeWidth="0.5"
            />
            <circle cx="40" cy="44" r="8" fill="oklch(0.62 0.13 78)" fillOpacity=".9" />
            <path d="M37 44h6M40 41v6" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <div className="text-center px-8">
        <p className="text-white font-bold text-base leading-snug">Swipe to explore categories</p>
        <p className="mt-1 text-white/55 text-sm">Slide the food tiles left or right</p>
      </div>

      <span className="text-white/35 text-xs font-semibold tracking-wide uppercase">Tap anywhere to continue</span>

      <style>{`
        @keyframes cc-swipe {
          0%   { transform: translateX(0) rotate(-8deg); }
          45%  { transform: translateX(-40px) rotate(-8deg); }
          55%  { transform: translateX(-40px) rotate(-8deg); }
          100% { transform: translateX(0) rotate(-8deg); }
        }
        @keyframes cc-trail {
          0%, 100% { opacity: 0; }
          40%, 60%  { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
