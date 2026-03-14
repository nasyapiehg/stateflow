/**
 * AppLayout — StateFlow Zen-Minimalist Design
 * High-fashion glassmorphism with muted sage, charcoal, terracotta accents.
 * Breathable, sophisticated, organic. Soft shadows and generous whitespace.
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
  "You're doing amazing — one step at a time. 🌱",
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
    <div className="min-h-screen flex" style={{ background: "#F5F5F5" }}>
      {/* Subtle background texture */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" style={{ opacity: 0.02 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle at 20% 50%, #6B8E7F 0%, transparent 50%)",
            opacity: 0.1,
          }}
        />
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 w-64 flex flex-col z-40 transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        style={{
          background: "#F5F5F5",
          borderRight: "1px solid #E5E5E5",
        }}
      >
        {/* Logo */}
        <div className="p-6 border-b" style={{ borderColor: "#E5E5E5" }}>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold"
              style={{ background: "#6B8E7F" }}
            >
              SF
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: "#2C2C2C", fontFamily: "'Outfit', sans-serif" }}>
                StateFlow
              </p>
              <p className="text-xs" style={{ color: "#8B8B8B", fontFamily: "'Nunito', sans-serif" }}>
                Study your way
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = location === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 block"
                style={{
                  background: isActive ? "#E8EDE9" : "transparent",
                  color: isActive ? "#4A5A52" : "#6B6B6B",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "#F0F0F0";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                <span className="text-lg">{item.emoji}</span>
                <span className="text-sm font-medium" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  {item.label}
                </span>
                {isActive && (
                  <div
                    className="ml-auto w-1.5 h-1.5 rounded-full"
                    style={{ background: "#6B8E7F" }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Motivational quote card */}
        <div
          className="mx-4 mb-4 p-4 rounded-2xl"
          style={{
            background: "rgba(232, 237, 233, 0.6)",
            border: "1px solid rgba(107, 142, 127, 0.15)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#6B8E7F" }} />
            <p
              className="text-xs leading-relaxed"
              style={{
                fontFamily: "'Nunito', sans-serif",
                color: "#4A5A52",
                fontStyle: "italic",
              }}
            >
              {quote}
            </p>
          </div>
        </div>

        {/* User profile stub */}
        <div className="px-4 pb-6">
          <div
            className="flex items-center gap-3 p-3 rounded-2xl"
            style={{
              background: "rgba(232, 237, 233, 0.4)",
              border: "1px solid #E5E5E5",
            }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
              style={{ background: "#7FA8B8" }}
            >
              AJ
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="text-sm font-600 truncate"
                style={{ color: "#2C2C2C", fontFamily: "'Outfit', sans-serif" }}
              >
                Alex Johnson
              </p>
              <p className="text-xs truncate" style={{ color: "#8B8B8B", fontFamily: "'Nunito', sans-serif" }}>
                Pre-Med · Year 2
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Mobile header */}
        <header
          className="lg:hidden flex items-center justify-between px-4 py-4"
          style={{
            background: "rgba(245, 245, 245, 0.95)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid #E5E5E5",
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold"
              style={{ background: "#6B8E7F" }}
            >
              SF
            </div>
            <span className="font-semibold text-sm" style={{ fontFamily: "'Outfit', sans-serif", color: "#2C2C2C" }}>
              StateFlow
            </span>
          </div>
          <button
            className="p-2 rounded-xl transition-colors"
            style={{ background: "#E8EDE9" }}
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
