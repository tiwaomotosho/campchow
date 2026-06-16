import { useState } from "react";
import { X, Lightbulb } from "lucide-react";

/**
 * Mobile-only dismissible tip strip shown once per session, anchored just
 * below the TopNav. Vanishes on tap of the X or after navigating away.
 */
export function HelpBanner({ onDismiss }: { onDismiss: () => void }) {
  const [leaving, setLeaving] = useState(false);

  const dismiss = () => {
    setLeaving(true);
    setTimeout(onDismiss, 260);
  };

  return (
    <div
      className="md:hidden overflow-hidden"
      style={{
        maxHeight: leaving ? 0 : "64px",
        opacity: leaving ? 0 : 1,
        transition: "max-height 0.26s ease, opacity 0.26s ease",
      }}
    >
      <div className="flex items-center gap-3 px-4 py-2.5 bg-brand-light border-b border-brand/20">
        <span className="grid place-items-center h-7 w-7 rounded-full bg-brand/15 text-brand shrink-0">
          <Lightbulb size={14} strokeWidth={2} />
        </span>
        <p className="flex-1 text-xs font-semibold text-brand leading-snug">
          Tip: Tap any vendor card to view their menu and add items to your cart.
        </p>
        <button
          onClick={dismiss}
          aria-label="Dismiss tip"
          className="grid place-items-center h-7 w-7 rounded-full hover:bg-brand/15 text-brand/60 shrink-0 transition-colors"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
