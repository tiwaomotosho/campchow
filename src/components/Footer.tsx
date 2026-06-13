import { Link } from "@tanstack/react-router";
import { ShoppingCart, Instagram, Twitter, Facebook, Youtube, Linkedin, Shield, MapPin, Zap } from "lucide-react";
import { ZONES } from "@/lib/data";

/**
 * Zomato-style global footer: deep dark background, white wordmark,
 * link columns, social row, zones grid (our "countries"), legal line.
 */
export function Footer() {
  const zones = ZONES.filter((z) => z !== "All Zones");
  const socials = [Instagram, Twitter, Facebook, Youtube, Linkedin];

  return (
    <footer style={{ background: "oklch(0.14 0.02 155)" }}>
      {/* trust strip */}
      <div className="border-b border-white/8 px-4 py-4">
        <div className="mx-auto max-w-6xl flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {[
            { icon: <Shield size={13} />, text: "Verified Camp Riders — Estate ID required" },
            { icon: <MapPin size={13} />, text: "16 named zones across Redemption City" },
            { icon: <Zap size={13} />, text: "Resilient on weak networks — USSD supported" },
          ].map((b, i) => (
            <span key={i} className="inline-flex items-center gap-2 text-[11px] font-semibold text-white/55">
              <span className="text-gold">{b.icon}</span>
              {b.text}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1.4fr]">
        {/* brand */}
        <div>
          <Link to="/" className="inline-flex items-center gap-2">
            <span className="grid place-items-center h-9 w-9 rounded-xl bg-brand text-white">
              <ShoppingCart size={20} strokeWidth={1.75} />
            </span>
            <span className="font-extrabold tracking-tight text-xl">
              <span className="text-white">Camp</span><span className="text-gold">Chow</span>
            </span>
          </Link>
          <p className="mt-4 text-sm text-white/45 max-w-xs leading-relaxed">
            Built for the Camp. Made for the Community. The commerce and delivery platform for Redemption City.
          </p>
          <div className="mt-5 flex items-center gap-2">
            {socials.map((Icon, i) => (
              <a
                key={i}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="grid place-items-center h-9 w-9 rounded-full bg-white/8 text-white/55 hover:text-white hover:bg-white/15 transition-colors duration-200"
                aria-label="Social link"
              >
                <Icon size={16} strokeWidth={1.75} />
              </a>
            ))}
          </div>
        </div>

        {/* company */}
        <div className="text-sm">
          <h4 className="font-bold text-white/85 uppercase tracking-wider text-xs mb-4">Company</h4>
          <ul className="space-y-2.5 text-white/50">
            <li><Link to="/" className="hover:text-white transition-colors duration-200">Home</Link></li>
            <li><Link to="/home" className="hover:text-white transition-colors duration-200">Order Food</Link></li>
            <li><a href="#how-it-works" className="hover:text-white transition-colors duration-200">How It Works</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors duration-200">Kingdom Hack 3.0</a></li>
          </ul>
        </div>

        {/* partners */}
        <div className="text-sm">
          <h4 className="font-bold text-white/85 uppercase tracking-wider text-xs mb-4">For Partners</h4>
          <ul className="space-y-2.5">
            <li><Link to="/vendor/login" className="inline-flex items-center gap-1.5 text-gold font-bold hover:brightness-110 transition-colors duration-200">🍽️ List your kitchen →</Link></li>
            <li><Link to="/rider/login" className="inline-flex items-center gap-1.5 text-gold font-bold hover:brightness-110 transition-colors duration-200">🛵 Ride with CampChow →</Link></li>
            <li><Link to="/vendor/login" className="text-white/50 hover:text-white transition-colors duration-200">Vendor Portal</Link></li>
            <li><Link to="/rider/login" className="text-white/50 hover:text-white transition-colors duration-200">Rider Portal</Link></li>
          </ul>
        </div>

        {/* zones we serve — the "global" grid */}
        <div className="text-sm">
          <h4 className="font-bold text-white/85 uppercase tracking-wider text-xs mb-4">Zones We Serve</h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-white/45">
            {zones.map((z) => (
              <Link key={z} to="/home" className="hover:text-white transition-colors duration-200 truncate">{z}</Link>
            ))}
          </div>
        </div>
      </div>

      {/* legal */}
      <div className="border-t border-white/8 px-4 py-6">
        <p className="mx-auto max-w-6xl text-[11px] leading-relaxed text-white/35 text-center md:text-left">
          By continuing past this page, you agree to our Terms of Service and Privacy Policy.
          A Kingdom Hack 3.0 project · Track B: Commerce and Last-Mile Distribution.
          2026 © CampChow™ · Built for Redemption City, Ogun State, Nigeria.
        </p>
      </div>
    </footer>
  );
}
