/**
 * AppLayout — StateFlow Aurora Flow Design
 * Persistent sidebar with gradient accents, aurora orb decorations,
 * and frosted glass navigation. Friendly, zen, encouraging.
 */
import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  CalendarDays,
  BookOpen,
  BarChart3,
  RefreshCw,
  Sparkles,
  Menu,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard, emoji: "🌟" },
  { href: "/schedule", label: "Weekly Schedule", icon: CalendarDays, emoji: "📅" },
  { href: "/planner", label: "Study Planner", icon: BookOpen, emoji: "📚" },
  { href: "/balance", label: "Workload Balance", icon: BarChart3, emoji: "⚖️" },
  { href: "/missed", label: "Missed Sessions", icon: RefreshCw, emoji: "🔄" },
];

const MOTIVATIONAL_QUOTES = [
  "You're doing amazing — one step at a time! 🌱",
  "Progress over perfection, always. ✨",
  "Rest is part of the process too. 💫",
  "Every study session counts. Keep going! 🚀",
  "You've got this — believe in yourself! 🌈",
];

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const quote = MOTIVATIONAL_QUOTES[Math.floor(Date.now() / 86400000) % MOTIVATIONAL_QUOTES.length];

  return (
    <div className="min-h-screen flex" style={{ background: "oklch(0.975 0.008 280)" }}>
      {/* Aurora background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="aurora-orb"
          style={{
            width: 500,
            height: 500,
            top: -100,
            left: -100,
            background: "radial-gradient(circle, #FF6B6B 0%, #FFB347 100%)",
          }}
        />
        <div
          className="aurora-orb"
          style={{
            width: 400,
            height: 400,
            bottom: -80,
            right: -80,
            background: "radial-gradient(circle, #4ECDC4 0%, #45B7D1 100%)",
            animationDelay: "8s",
          }}
        />
        <div
          className="aurora-orb"
          style={{
            width: 300,
            height: 300,
            top: "40%",
            right: "20%",
            background: "radial-gradient(circle, #A78BFA 0%, #C4B5FD 100%)",
            animationDelay: "4s",
          }}
        />
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-40 flex flex-col
          w-72 transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:flex
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{
          background: "rgba(255,255,255,0.82)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRight: "1px solid rgba(167,139,250,0.15)",
          boxShadow: "4px 0 32px rgba(167,139,250,0.08)",
        }}
      >
        {/* Logo */}
        <div className="px-6 pt-7 pb-5">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-white text-lg font-bold shadow-lg"
              style={{ background: "linear-gradient(135deg, #FF6B6B 0%, #FFB347 50%, #A78BFA 100%)" }}
            >
              SF
            </div>
            <div>
              <h1 className="text-xl font-bold" style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.22 0.04 280)" }}>
                StateFlow
              </h1>
              <p className="text-xs" style={{ color: "oklch(0.55 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>
                Study your way 🌸
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-6 mb-4" style={{ height: 1, background: "linear-gradient(90deg, rgba(255,107,107,0.2), rgba(167,139,250,0.2), transparent)" }} />

        {/* Nav */}
        <nav className="flex-1 px-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`nav-item ${isActive ? "active" : ""}`}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="text-lg">{item.emoji}</span>
                  <span style={{ fontFamily: "'Outfit', sans-serif" }}>{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 rounded-full" style={{ background: "linear-gradient(135deg, #FF6B6B, #A78BFA)" }} />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Motivational quote card */}
        <div className="mx-4 mb-4 p-4 rounded-2xl relative overflow-hidden" style={{ border: "1px solid rgba(167,139,250,0.2)" }}>
          <div className="absolute inset-0" style={{ backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663431192836/478L6thcgpxizQh5ucrFaJ/stateflow-wellness-bg-bRWGTGLG2CKmFVkTfuUTrW.webp)`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.25 }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.5))" }} />
          <div className="relative">
            <div className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#A78BFA" }} />
              <p className="text-xs leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif", color: "oklch(0.4 0.06 280)", fontStyle: "italic" }}>
                {quote}
              </p>
            </div>
          </div>
        </div>

        {/* User profile stub */}
        <div className="px-4 pb-6">
          <div className="flex items-center gap-3 p-3 rounded-2xl" style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(167,139,250,0.15)" }}>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
              style={{ background: "linear-gradient(135deg, #4ECDC4, #45B7D1)" }}
            >
              AJ
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-600 truncate" style={{ color: "oklch(0.25 0.04 280)", fontFamily: "'Outfit', sans-serif", fontWeight: 600 }}>
                Alex Johnson
              </p>
              <p className="text-xs truncate" style={{ color: "oklch(0.55 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>
                Pre-Med · Year 2
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center justify-between px-4 py-4" style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(167,139,250,0.15)" }}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold" style={{ background: "linear-gradient(135deg, #FF6B6B, #A78BFA)" }}>
              SF
            </div>
            <span className="font-bold text-lg" style={{ fontFamily: "'Outfit', sans-serif" }}>StateFlow</span>
          </div>
          <button
            className="p-2 rounded-xl"
            style={{ background: "rgba(167,139,250,0.1)" }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
