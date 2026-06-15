import { useEffect, useState } from "react";

/**
 * One-time intro splash:
 *   1. "CampChow" assembles (Camp in green, Chow in gold)
 *   2. A bike rides across the screen leaving a motion trail
 *   3. The whole splash slides up to reveal the landing page beneath
 *
 * Plays once per browser session (sessionStorage flag). SSR-safe: renders
 * nothing on the server and on any visit after the first in a session.
 */
export function SplashScreen() {
  // null = undecided (SSR / first paint), true = show, false = skip
  const [show, setShow] = useState<boolean | null>(null);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem("cc-splash-seen");
    if (seen) { setShow(false); return; }
    sessionStorage.setItem("cc-splash-seen", "1");
    setShow(true);

    // lock scroll while playing
    document.body.style.overflow = "hidden";

    // begin exit slide-up near the end of the bike ride
    const exitTimer = setTimeout(() => setExiting(true), 2500);
    // fully remove after the slide-up completes
    const doneTimer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
    }, 3200);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!show) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] grid place-items-center overflow-hidden transition-transform duration-700 ease-[cubic-bezier(.76,0,.24,1)] ${
        exiting ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{ background: "radial-gradient(120% 120% at 50% 40%, oklch(0.24 0.04 155) 0%, oklch(0.16 0.03 155) 60%, oklch(0.12 0.02 155) 100%)" }}
    >
      {/* Wordmark */}
      <div className="relative text-center select-none">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight">
          <span className="splash-word splash-camp inline-block text-[oklch(0.72_0.16_150)]">Camp</span>
          <span className="splash-word splash-chow inline-block text-[oklch(0.80_0.15_85)]">Chow</span>
        </h1>
        <p className="splash-tagline mt-3 text-sm font-medium text-white/45 tracking-wide">
          Food. Delivered anywhere on the camp.
        </p>

        {/* Road line the bike rides along */}
        <div className="splash-road absolute left-1/2 -translate-x-1/2 top-[120%] h-px w-[78vw] max-w-[520px] bg-white/15" />

        {/* Bike */}
        <div className="splash-bike absolute top-[120%] -translate-y-1/2 left-0">
          <div className="splash-trail absolute right-full top-1/2 -translate-y-1/2 h-[2px] w-16 rounded-full bg-gradient-to-l from-[oklch(0.80_0.15_85)]/70 to-transparent" />
          <Bike />
        </div>
      </div>

      <style>{`
        @keyframes splashWordIn {
          0%   { opacity: 0; transform: translateY(14px) scale(0.96); filter: blur(6px); }
          100% { opacity: 1; transform: translateY(0)    scale(1);    filter: blur(0); }
        }
        @keyframes splashFadeIn { from { opacity: 0; } to { opacity: 0.45; } }
        @keyframes splashRoadIn { from { opacity: 0; transform: translateX(-50%) scaleX(0); } to { opacity: 1; transform: translateX(-50%) scaleX(1); } }
        @keyframes splashRide {
          0%   { left: -12%; }
          100% { left: 112%; }
        }
        @keyframes splashHop {
          0%, 100% { transform: translateY(-50%); }
          25%      { transform: translateY(-72%); }
          50%      { transform: translateY(-50%); }
          75%      { transform: translateY(-64%); }
        }
        @keyframes splashWheel { to { transform: rotate(360deg); } }

        .splash-word { animation: splashWordIn 0.6s cubic-bezier(.22,1,.36,1) both; }
        .splash-camp { animation-delay: 0.15s; }
        .splash-chow { animation-delay: 0.42s; }
        .splash-tagline { opacity: 0; animation: splashFadeIn 0.6s ease 0.9s both; }
        .splash-road { transform-origin: center; opacity: 0; animation: splashRoadIn 0.5s ease 1.0s both; }

        /* bike rides across, with a gentle hop on an inner wrapper */
        .splash-bike { animation: splashRide 1.5s cubic-bezier(.45,.05,.55,.95) 1.0s both; }
        .splash-bike > svg { animation: splashHop 0.5s ease-in-out 1.0s 3; transform-origin: center bottom; }
        .splash-wheel { transform-box: fill-box; transform-origin: center; animation: splashWheel 0.45s linear 1.0s infinite; }

        @media (prefers-reduced-motion: reduce) {
          .splash-word, .splash-tagline, .splash-road { animation-duration: 0.01s; animation-delay: 0s; opacity: 1; }
          .splash-bike, .splash-bike > svg, .splash-wheel { animation: none; }
          .splash-bike { display: none; }
        }
      `}</style>
    </div>
  );
}

function Bike() {
  const gold = "oklch(0.80 0.15 85)";
  return (
    <svg width="56" height="40" viewBox="0 0 56 40" fill="none" className="drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)]">
      {/* wheels */}
      <g>
        <circle className="splash-wheel" cx="13" cy="29" r="9" stroke={gold} strokeWidth="2.2" />
        <circle className="splash-wheel" cx="43" cy="29" r="9" stroke={gold} strokeWidth="2.2" />
      </g>
      <circle cx="13" cy="29" r="1.6" fill={gold} />
      <circle cx="43" cy="29" r="1.6" fill={gold} />
      {/* frame */}
      <path d="M13 29 L24 29 L31 16 L20 16 M24 29 L33 16 M43 29 L33 16" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      {/* seat + handle */}
      <path d="M30 16 L33 13 M19 16 L17 13" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M31 16 L29 13 L26 13" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
