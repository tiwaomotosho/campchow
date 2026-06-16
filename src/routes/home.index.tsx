import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search, MapPin, Star, Clock, Zap, ShoppingBag } from "lucide-react";
import { TopNav } from "@/components/TopNav";
import { Footer } from "@/components/Footer";
import { VENDORS, ZONES, CATEGORIES, type Vendor } from "@/lib/data";
import { SmartImage } from "@/components/SmartImage";
import { naira } from "@/lib/format";
import { useFirstSession } from "@/hooks/use-first-session";
import { useIsMobile } from "@/hooks/use-mobile";
import { GestureHint } from "@/components/GestureHint";
import { HelpBanner } from "@/components/HelpBanner";
import { WalkthroughSpotlight } from "@/components/WalkthroughSpotlight";

export const Route = createFileRoute("/home/")({
  head: () => ({
    meta: [
      { title: "Browse Vendors | CampChow" },
      { name: "description", content: "Order from your favourite vendors and get it delivered to your zone." },
    ],
  }),
  component: Home,
});

const matchCategory = (v: Vendor, cat: string) => {
  if (cat === "All") return true;
  return v.category.toLowerCase().includes(cat.toLowerCase().split(" ")[0]);
};

/* ── Skeleton card ───────────────────────────────────────── */
function VendorSkeleton({ index }: { index: number }) {
  return (
    <div className={`bg-card rounded-2xl overflow-hidden border border-border card-enter-${Math.min(index + 1, 10)}`}>
      <div className="h-40 img-shimmer" />
      <div className="p-4 space-y-2.5">
        <div className="h-4 w-3/5 rounded img-shimmer" />
        <div className="h-3 w-2/5 rounded img-shimmer" />
        <div className="mt-3 flex justify-between gap-2">
          <div className="h-3 w-16 rounded img-shimmer" />
          <div className="h-3 w-16 rounded img-shimmer" />
          <div className="h-3 w-14 rounded img-shimmer" />
        </div>
      </div>
    </div>
  );
}

/* ── Real vendor card ────────────────────────────────────── */
function VendorCard({ v, index }: { v: Vendor; index: number }) {
  const enterClass = `card-enter-${Math.min(index + 1, 10)}`;
  const hasOffer = v.open && v.rating >= 4.6;
  return (
    <Link
      to="/home/vendor/$id"
      params={{ id: v.id }}
      className={`group bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${!v.open ? "opacity-60" : ""} ${enterClass}`}
    >
      <div className="relative h-40 bg-muted overflow-hidden">
        <SmartImage
          src={v.cover}
          fallbackSrc={v.coverFallback}
          alt={v.name}
          seed={v.name}
          className="absolute inset-0"
          imgClassName="group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {hasOffer && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-gold text-on-gold text-[10px] font-extrabold uppercase tracking-wide shadow">
            10% off · CAMP10
          </span>
        )}
        <span className={`absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur ${v.open ? "bg-card/90 text-success" : "bg-muted/80 text-muted-foreground"}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${v.open ? "bg-success" : "bg-muted-foreground"}`} />
          {v.open ? "Open" : "Closed"}
        </span>
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-success text-white text-xs font-bold shadow">
          {v.rating} <Star size={10} className="fill-white text-white" />
        </span>
        <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/55 backdrop-blur text-white text-[10px] font-semibold">
          {v.zone}
        </span>
        {!v.open && <div className="absolute inset-0 bg-background/40" />}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-dark leading-tight">{v.name}</h3>
          <span className="text-xs text-muted-foreground shrink-0 mt-0.5">({v.reviews})</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{v.category}</p>
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1"><MapPin size={12} /> {v.distance}</span>
          <span className="inline-flex items-center gap-1"><Clock size={12} /> {v.open ? v.eta : "Closed"}</span>
          <span>Min {naira(v.min)}</span>
        </div>
      </div>
    </Link>
  );
}

/* ── Page ────────────────────────────────────────────────── */
function Home() {
  const [query, setQuery] = useState("");
  const [zone, setZone] = useState("All Zones");
  const [cat, setCat] = useState("All");

  /* ── onboarding state ── */
  const isFirst = useFirstSession("cc-home-visited");
  const isMobile = useIsMobile();

  // Skeleton loading: show shimmer for ~600 ms on mobile, ~350 ms on desktop,
  // but only on the very first page load of the session.
  const [skelLoading, setSkelLoading] = useState(isFirst);
  useEffect(() => {
    if (!isFirst) return;
    const t = setTimeout(() => setSkelLoading(false), isMobile ? 600 : 350);
    return () => clearTimeout(t);
  }, [isFirst, isMobile]);

  // Mobile: gesture hint overlay (shows immediately; dismissed by user or timeout)
  const [showGestureHint, setShowGestureHint] = useState(isFirst);

  // Mobile: persistent tip banner below TopNav
  const [showBanner, setShowBanner] = useState(isFirst);

  // Desktop: 2-step walkthrough spotlight (waits for skeleton to clear)
  const [showSpotlight, setShowSpotlight] = useState(false);
  useEffect(() => {
    if (!isFirst || isMobile === undefined) return;
    if (isMobile) return; // mobile gets gesture hint instead
    if (!skelLoading) {
      // small delay so the grid has painted before we spotlight the search bar
      const t = setTimeout(() => setShowSpotlight(true), 200);
      return () => clearTimeout(t);
    }
  }, [isFirst, isMobile, skelLoading]);

  /* ── refs for spotlight targets ── */
  const searchRef = useRef<HTMLDivElement>(null);
  const zoneRowRef = useRef<HTMLDivElement>(null);

  const spotlightSteps = [
    {
      label: "Search vendors or dishes",
      description: "Type a keyword — vendor name, food type, or dish — to instantly filter your results.",
      getRect: () => searchRef.current?.getBoundingClientRect() ?? null,
    },
    {
      label: "Filter by camp zone",
      description: "Tap any zone pill to see only vendors delivering to that part of Redemption City.",
      getRect: () => zoneRowRef.current?.getBoundingClientRect() ?? null,
    },
  ];

  /* ── vendor filtering ── */
  const filtered = useMemo(() => {
    return VENDORS.filter((v) => {
      if (zone !== "All Zones" && v.zone !== zone) return false;
      if (!matchCategory(v, cat)) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const hay = v.searchable ?? `${v.name} ${v.category}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [query, zone, cat]);

  return (
    <div className="min-h-screen bg-background">
      {/* ── Mobile gesture hint overlay (first session only) ── */}
      {isFirst && showGestureHint && isMobile && (
        <GestureHint onDismiss={() => setShowGestureHint(false)} />
      )}

      {/* ── Desktop walkthrough spotlight (first session only) ── */}
      {isFirst && showSpotlight && !isMobile && (
        <WalkthroughSpotlight
          steps={spotlightSteps}
          onDone={() => setShowSpotlight(false)}
        />
      )}

      <TopNav />

      {/* ── Mobile help banner (first session only) ── */}
      {isFirst && showBanner && (
        <HelpBanner onDismiss={() => setShowBanner(false)} />
      )}

      <main className="mx-auto max-w-6xl px-4 pb-12">
        {/* Hero */}
        <section className="pt-8 pb-4 animate-fade-up">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-dark">
            Food. Delivered Anywhere on the Camp.
          </h1>
          <p className="mt-2 text-muted-foreground max-w-xl">
            Order from your favourite vendors and get it delivered to your zone.
          </p>
        </section>

        {/* Search */}
        <div ref={searchRef} className="relative animate-fade-up-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search vendors or dishes..."
            className="w-full h-12 pl-11 pr-4 rounded-xl bg-card border border-border text-[15px] focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
          />
        </div>

        {/* Peak banner */}
        <div className="mt-4 flex items-start gap-3 p-4 rounded-xl bg-gold-light border border-gold/30 animate-fade-up-1">
          <span className="grid place-items-center h-9 w-9 rounded-lg bg-gold/15 text-gold shrink-0">
            <Zap size={18} strokeWidth={1.75} className="animate-pulse" />
          </span>
          <div className="text-sm">
            <p className="font-semibold text-dark">Peak Programme Mode Active</p>
            <p className="text-muted-foreground">Higher demand expected. Order early for faster delivery.</p>
          </div>
        </div>

        {/* Location bar */}
        <div className="mt-4 flex items-center justify-between gap-3 p-3 rounded-xl bg-card border border-border animate-fade-up-1">
          <div className="flex items-center gap-2 text-sm text-body">
            <MapPin size={16} className="text-brand shrink-0" />
            Showing vendors near you —{" "}
            <strong className="font-semibold">Youth Centre Area</strong>
          </div>
          <button className="text-sm font-semibold text-brand hover:underline shrink-0">
            Change
          </button>
        </div>

        {/* Zone filter */}
        <div ref={zoneRowRef} className="mt-6 animate-fade-up-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Zones</p>
          <div className="flex gap-2 overflow-x-auto scrollbar-none -mx-4 px-4">
            {ZONES.map((z) => (
              <button
                key={z}
                onClick={() => setZone(z)}
                className={`shrink-0 px-4 h-9 rounded-full border text-sm font-medium transition-all ${zone === z ? "bg-brand text-primary-foreground border-brand shadow-sm" : "bg-card border-border text-body hover:border-brand/40"}`}
              >
                {z}
              </button>
            ))}
          </div>
        </div>

        {/* Category filter */}
        <div className="mt-4 animate-fade-up-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Categories</p>
          <div className="flex gap-2 overflow-x-auto scrollbar-none -mx-4 px-4">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`shrink-0 px-4 h-9 rounded-full border text-sm font-medium transition-all ${cat === c ? "bg-gold text-on-gold border-gold shadow-sm" : "bg-card border-border text-body hover:border-gold/40"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Results label */}
        {(zone !== "All Zones" || cat !== "All" || query) && !skelLoading && (
          <p className="mt-5 text-sm text-muted-foreground animate-fade-in">
            {filtered.length} vendor{filtered.length !== 1 ? "s" : ""} found
            {zone !== "All Zones" ? ` in ${zone}` : ""}
            {cat !== "All" ? ` · ${cat}` : ""}
          </p>
        )}

        {/* Vendor grid — skeletons on first session load, real cards thereafter */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skelLoading
            ? Array.from({ length: 6 }, (_, i) => <VendorSkeleton key={i} index={i} />)
            : filtered.map((v, i) => <VendorCard key={v.id} v={v} index={i} />)
          }
        </div>

        {/* Empty state */}
        {!skelLoading && filtered.length === 0 && (
          <div className="mt-8 text-center py-16 bg-card rounded-2xl border border-border animate-fade-in">
            <div className="mx-auto h-16 w-16 rounded-full bg-brand-light grid place-items-center mb-4">
              <ShoppingBag size={26} className="text-brand" />
            </div>
            <h3 className="font-bold text-dark">No vendors match your filters</h3>
            <p className="mt-1 text-sm text-muted-foreground">Try a different zone or category.</p>
            <button
              onClick={() => { setZone("All Zones"); setCat("All"); setQuery(""); }}
              className="mt-4 px-5 h-10 rounded-full bg-brand text-primary-foreground text-sm font-semibold hover:bg-brand-mid transition"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* How It Works */}
        <section id="how-it-works" className="mt-16">
          <h2 className="text-2xl font-bold text-dark text-center">How It Works</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { n: 1, t: "Browse & build", d: "Browse vendors sorted by proximity and build your order from the freshest dishes." },
              { n: 2, t: "Choose your zone", d: "Select your camp zone, area, and pickup point. No street address needed." },
              { n: 3, t: "Rider delivers", d: "A verified camp rider with a confirmed estate ID brings it straight to you." },
            ].map((s) => (
              <div key={s.n} className={`p-6 rounded-2xl bg-card border border-border card-enter-${s.n}`}>
                <div className="h-10 w-10 rounded-full bg-brand text-primary-foreground grid place-items-center font-bold text-lg">{s.n}</div>
                <h3 className="mt-4 font-bold text-dark">{s.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
