import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Zomato-style scroll reveal: children fade up the first time
 * they enter the viewport. Pure IntersectionObserver — no deps.
 */
export function Reveal({
  children, delay = 0, className = "",
}: { children: ReactNode; delay?: 0 | 1 | 2 | 3; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -10px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const delayCls = delay ? ` reveal-delay-${delay}` : "";
  return (
    <div ref={ref} className={`reveal${visible ? " is-visible" : ""}${delayCls} ${className}`}>
      {children}
    </div>
  );
}
