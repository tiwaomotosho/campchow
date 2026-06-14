import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
const PALETTES = [
  ["oklch(0.45 0.11 150)", "oklch(0.30 0.07 152)"],
  ["oklch(0.62 0.13 78)", "oklch(0.45 0.11 150)"],
  ["oklch(0.56 0.12 152)", "oklch(0.20 0.025 155)"],
  ["oklch(0.50 0.10 120)", "oklch(0.40 0.10 160)"]
];
function initials(name) {
  return name.split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");
}
function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = h * 31 + s.charCodeAt(i) | 0;
  return Math.abs(h);
}
function SmartImage({
  src,
  fallbackSrc,
  alt,
  seed,
  className = "",
  imgClassName = "",
  eager = false
}) {
  const [tier, setTier] = reactExports.useState("primary");
  reactExports.useEffect(() => {
    setTier("primary");
  }, [src, fallbackSrc]);
  const activeSrc = tier === "primary" ? src : tier === "fallback" ? fallbackSrc : void 0;
  const name = seed ?? alt;
  const [c1, c2] = PALETTES[hash(name) % PALETTES.length];
  const onError = () => {
    setTier((t) => t === "primary" && fallbackSrc ? "fallback" : "gradient");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `relative overflow-hidden bg-muted ${className}`, children: tier === "gradient" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid place-items-center", style: { background: `linear-gradient(135deg, ${c1}, ${c2})` }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/90 font-extrabold text-3xl tracking-wide select-none", children: initials(name) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      src: activeSrc,
      alt,
      loading: eager ? "eager" : "lazy",
      onError,
      className: `absolute inset-0 w-full h-full object-cover ${imgClassName}`
    },
    activeSrc
  ) });
}
export {
  SmartImage as S
};
