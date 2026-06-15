import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";

/**
 * One-time intro splash (once per session):
 *   Phase 1 — logo blown up large, centered
 *   Phase 2 — logo shrinks + slides left into header position, "CampChow" fades in beside it
 *   Phase 3 — tagline + road appear, bike rides across
 *   Exit    — splash slides up to reveal the page
 *
 * Theme-aware: background and text derive from CSS variables, so the splash is
 * light in light mode and dark in dark mode. SSR-safe: renders nothing until the
 * client decides whether this session has already seen it.
 */
export function SplashScreen() {
  const [show, setShow] = useState<boolean | null>(null);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem("cc-splash-seen");
    if (seen) { setShow(false); return; }
    sessionStorage.setItem("cc-splash-seen", "1");
    setShow(true);
    document.body.style.overflow = "hidden";

    // bike ride: starts 2.3s, lasts 1.5s → finishes at 3.8s. Exit begins after.
    const exitTimer = setTimeout(() => setExiting(true), 3900);
    const doneTimer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
      document.getElementById("cc-pre-splash")?.remove();
    }, 4650);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = "";
    };
  }, []);

  // remove the pre-paint blocking div as soon as the React splash is up
  useEffect(() => {
    if (show) document.getElementById("cc-pre-splash")?.remove();
  }, [show]);

  if (!show) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[200] grid place-items-center overflow-hidden transition-transform duration-700 ease-[cubic-bezier(.76,0,.24,1)] ${
        exiting ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{ background: "var(--color-background)" }}
    >
      <div className="relative grid place-items-center" style={{ minHeight: 160 }}>
        {/* Logo + wordmark assemble together */}
        <div className="splash-lockup flex items-center gap-3">
          <span className="splash-logo grid place-items-center rounded-2xl bg-brand text-primary-foreground shadow-lg">
            <ShoppingCart className="splash-logo-icon" strokeWidth={1.75} />
          </span>
          <span className="splash-word font-extrabold tracking-tight text-4xl sm:text-5xl">
            <span className="text-brand">Camp</span><span className="text-gold">Chow</span>
          </span>
        </div>

        <p className="splash-tagline absolute top-full mt-6 whitespace-nowrap text-sm font-medium tracking-wide" style={{ color: "var(--color-muted-foreground)" }}>
          Food. Delivered anywhere on the camp.
        </p>

        {/* Road + bike */}
        <div className="splash-road absolute left-1/2 -translate-x-1/2 top-[180%] h-px w-[78vw] max-w-[520px]" style={{ background: "color-mix(in oklab, var(--color-foreground) 18%, transparent)" }} />
        <div className="splash-bike absolute top-[180%] -translate-y-1/2 left-0">
          <div className="splash-trail absolute right-full top-1/2 -translate-y-1/2 h-[2px] w-16 rounded-full bg-gradient-to-l from-gold/70 to-transparent" />
          <Bike />
        </div>
      </div>

      <style>{`
        /* Phase 1 → 2: logo starts huge & centered, shrinks to header size.
           We animate a scale on the lockup; the logo box itself is sized for the
           final (small) state, scaled up at the start. */
        @keyframes splashLockup {
          0%   { transform: scale(3.4) translateX(0); opacity: 0; filter: blur(8px); }
          18%  { opacity: 1; filter: blur(0); }
          45%  { transform: scale(3.4) translateX(0); opacity: 1; }
          100% { transform: scale(1) translateX(0); opacity: 1; }
        }
        @keyframes splashWordIn {
          0%, 48% { opacity: 0; transform: translateX(-8px); }
          100%    { opacity: 1; transform: translateX(0); }
        }
        @keyframes splashFadeUp { 0% { opacity: 0; transform: translateY(8px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes splashRoadIn { from { opacity: 0; transform: translateX(-50%) scaleX(0); } to { opacity: 1; transform: translateX(-50%) scaleX(1); } }
        @keyframes splashRide { 0% { left: -12%; } 100% { left: 112%; } }
        @keyframes splashHop { 0%,100% { transform: translateY(-50%); } 25% { transform: translateY(-74%); } 50% { transform: translateY(-50%); } 75% { transform: translateY(-66%); } }
        @keyframes splashWheel { to { transform: rotate(360deg); } }

        .splash-logo { height: 2.5rem; width: 2.5rem; }
        .splash-logo-icon { width: 22px; height: 22px; }
        /* the lockup scales as one unit; transform-origin centered so it stays put */
        .splash-lockup { animation: splashLockup 2.1s cubic-bezier(.65,0,.35,1) both; transform-origin: center; }
        .splash-word { animation: splashWordIn 2.1s cubic-bezier(.65,0,.35,1) both; }
        .splash-tagline { opacity: 0; animation: splashFadeUp 0.6s ease 2.2s both; }
        .splash-road { transform-origin: center; opacity: 0; animation: splashRoadIn 0.5s ease 2.3s both; }
        .splash-bike { animation: splashRide 1.5s cubic-bezier(.45,.05,.55,.95) 2.3s both; }
        .splash-bike > svg { animation: splashHop 0.5s ease-in-out 2.3s 3; transform-origin: center bottom; }
        .splash-wheel { transform-box: fill-box; transform-origin: center; animation: splashWheel 0.45s linear 2.3s infinite; }

        @media (prefers-reduced-motion: reduce) {
          .splash-lockup, .splash-word, .splash-tagline, .splash-road { animation-duration: 0.01s; animation-delay: 0s; opacity: 1; transform: none; }
          .splash-bike { display: none; }
        }
      `}</style>
    </div>
  );
}

function Bike() {
  const gold = "var(--color-gold)";
  return (
    <svg width="56" height="40" viewBox="0 0 56 40" fill="none" className="drop-shadow-[0_4px_10px_rgba(0,0,0,0.25)]">
      <g>
        <circle className="splash-wheel" cx="13" cy="29" r="9" stroke={gold} strokeWidth="2.2" />
        <circle className="splash-wheel" cx="43" cy="29" r="9" stroke={gold} strokeWidth="2.2" />
      </g>
      <circle cx="13" cy="29" r="1.6" fill={gold} />
      <circle cx="43" cy="29" r="1.6" fill={gold} />
      <path d="M13 29 L24 29 L31 16 L20 16 M24 29 L33 16 M43 29 L33 16" stroke="var(--color-foreground)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 16 L33 13 M19 16 L17 13" stroke="var(--color-foreground)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M31 16 L29 13 L26 13" stroke="var(--color-foreground)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
