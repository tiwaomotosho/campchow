import { useEffect, useRef, useState } from "react";

type Rect = { top: number; left: number; width: number; height: number };

interface Step {
  label: string;
  description: string;
  getRect: () => Rect | null;
}

interface Props {
  steps: Step[];
  onDone: () => void;
}

const PAD = 8;

/**
 * Desktop-only (md+) 2-step walkthrough spotlight.
 * Dims the page and punches a rounded cutout around the target element using
 * a large inset box-shadow on a positioned overlay. A tooltip card floats
 * below (or above) the spotlight, with Next / Skip controls.
 */
export function WalkthroughSpotlight({ steps, onDone }: Props) {
  const [step, setStep] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);
  const [leaving, setLeaving] = useState(false);
  const rafRef = useRef<number>(0);

  // Keep rect in sync with the live DOM (handles resize / scroll)
  useEffect(() => {
    const measure = () => {
      const r = steps[step]?.getRect() ?? null;
      setRect(r);
      rafRef.current = requestAnimationFrame(measure);
    };
    rafRef.current = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(rafRef.current);
  }, [step]);

  const finish = () => {
    setLeaving(true);
    setTimeout(onDone, 300);
  };

  const next = () => {
    if (step < steps.length - 1) setStep((s) => s + 1);
    else finish();
  };

  if (!rect) return null;

  const { top, left, width, height } = rect;
  const spotTop = top - PAD;
  const spotLeft = left - PAD;
  const spotW = width + PAD * 2;
  const spotH = height + PAD * 2;

  // Float tooltip below the spotlight; if too close to bottom, flip above
  const viewH = window.innerHeight;
  const tipBelow = spotTop + spotH + 16;
  const flipUp = tipBelow + 160 > viewH;

  return (
    <div
      className="hidden md:block fixed inset-0 z-[70] pointer-events-none"
      style={{ opacity: leaving ? 0 : 1, transition: "opacity 0.3s ease" }}
      aria-label="Onboarding walkthrough"
    >
      {/* dark mask with rectangular cutout via clip-path */}
      <div
        className="absolute inset-0 pointer-events-auto"
        style={{
          background: "oklch(0.12 0.02 155 / 0.78)",
          clipPath: `polygon(
            0 0, 100% 0, 100% 100%, 0 100%,
            0 ${spotTop}px,
            ${spotLeft}px ${spotTop}px,
            ${spotLeft}px ${spotTop + spotH}px,
            ${spotLeft + spotW}px ${spotTop + spotH}px,
            ${spotLeft + spotW}px ${spotTop}px,
            0 ${spotTop}px
          )`,
        }}
        onClick={finish}
      />

      {/* glowing border around the spotlight */}
      <div
        className="absolute rounded-xl pointer-events-none"
        style={{
          top: spotTop,
          left: spotLeft,
          width: spotW,
          height: spotH,
          boxShadow: "0 0 0 2px oklch(0.72 0.14 150), 0 0 24px oklch(0.72 0.14 150 / 0.4)",
          transition: "top 0.35s cubic-bezier(.22,1,.36,1), left 0.35s cubic-bezier(.22,1,.36,1), width 0.35s cubic-bezier(.22,1,.36,1), height 0.35s cubic-bezier(.22,1,.36,1)",
        }}
      />

      {/* tooltip card */}
      <div
        className="absolute pointer-events-auto"
        style={{
          top: flipUp ? spotTop - 16 : tipBelow,
          transform: flipUp ? "translateY(-100%)" : undefined,
          left: Math.max(16, Math.min(spotLeft, window.innerWidth - 340)),
          width: 320,
          transition: "top 0.35s cubic-bezier(.22,1,.36,1), left 0.35s cubic-bezier(.22,1,.36,1)",
        }}
      >
        <div className="bg-card border border-border rounded-2xl shadow-2xl p-5 animate-fade-in">
          {/* step dots */}
          <div className="flex gap-1.5 mb-3">
            {steps.map((_, i) => (
              <span
                key={i}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === step ? "20px" : "6px",
                  background: i === step ? "var(--color-brand)" : "var(--color-border)",
                }}
              />
            ))}
          </div>

          <p className="font-bold text-dark text-sm">{steps[step].label}</p>
          <p className="mt-1 text-muted-foreground text-sm leading-relaxed">{steps[step].description}</p>

          <div className="mt-4 flex items-center justify-between gap-3">
            <button
              onClick={finish}
              className="text-xs text-muted-foreground hover:text-body font-semibold transition-colors"
            >
              Skip tour
            </button>
            <button
              onClick={next}
              className="tap px-5 h-9 rounded-full bg-brand text-white text-sm font-bold hover:bg-brand-mid transition-colors"
            >
              {step < steps.length - 1 ? "Next →" : "Got it"}
            </button>
          </div>
        </div>

        {/* arrow pointing up to spotlight */}
        {!flipUp && (
          <div
            className="absolute -top-2 h-3 w-3 bg-card border-l border-t border-border rotate-45"
            style={{ left: Math.min(spotLeft - Math.max(16, Math.min(spotLeft, window.innerWidth - 340)) + PAD + 12, 280) }}
          />
        )}
      </div>
    </div>
  );
}
