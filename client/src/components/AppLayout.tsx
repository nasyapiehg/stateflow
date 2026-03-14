/**
 * AppLayout — StateFlow Soft Minimalism + Japandi Design
 * Matte cream background, frosted glass cards, Lora serif headings, Poppins geometric body.
 * Sage green, muted terracotta, deep slate palette. Breathable, high-fashion, calm.
 */
import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  CalendarDays,
  BookOpen,
  BarChart3,
  RefreshCw,
  Settings as SettingsIcon,
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
  { href: "/settings", label: "Settings", icon: SettingsIcon, emoji: "⚙️" },
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
    <div className="min-h-screen flex" style={{ background: "#faf9f6" }}>
      {/* Subtle background texture */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" style={{ opacity: 0.02 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle at 20% 50%, #5a8f7b 0%, transparent 50%)",
            opacity: 0.08,
          }}
        />
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 w-64 flex flex-col z-40 transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        style={{
          background: "#faf9f6",
          borderRight: "1px solid #e8e5e0",
        }}
      >
        {/* Logo */}
        <div className="p-6 border-b" style={{ borderColor: "#e8e5e0" }}>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold"
              style={{ background: "#5a8f7b" }}
            >
              SF
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: "#2a2a2a", fontFamily: "'Lora', serif" }}>
                StateFlow
              </p>
              <p className="text-xs" style={{ color: "#8b8b8b", fontFamily: "'Poppins', sans-serif" }}>
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
                className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 block"
                style={{
                  background: isActive ? "rgba(90, 143, 123, 0.08)" : "transparent",
                  color: isActive ? "#5a8f7b" : "#6b6b6b",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "rgba(90, 143, 123, 0.04)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                <span className="text-lg">{item.emoji}</span>
                <span className="text-sm font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {item.label}
                </span>
                {isActive && (
                  <div
                    className="ml-auto w-1 h-5 rounded-full"
                    style={{ background: "#5a8f7b" }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Motivational quote card - frosted glass */}
        <div
          className="mx-4 mb-4 p-4 rounded-lg"
          style={{
            background: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.6)",
          }}
        >
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#5a8f7b" }} />
            <p
              className="text-xs leading-relaxed"
              style={{
                fontFamily: "'Poppins', sans-serif",
                color: "#3a4a52",
                fontStyle: "italic",
                fontWeight: 300,
              }}
            >
              {quote}
            </p>
          </div>
        </div>

        {/* User profile stub */}
        <div className="px-4 pb-6">
          <div
            className="flex items-center gap-3 p-3 rounded-lg"
            style={{
              background: "rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.5)",
            }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
              style={{ background: "#c9956f" }}
            >
              AJ
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="text-sm font-600 truncate"
                style={{ color: "#2a2a2a", fontFamily: "'Lora', serif" }}
              >
                Alex Johnson
              </p>
              <p className="text-xs truncate" style={{ color: "#8b8b8b", fontFamily: "'Poppins', sans-serif" }}>
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
            background: "rgba(250, 249, 246, 0.95)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid #e8e5e0",
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
              style={{ background: "#5a8f7b" }}
            >
              SF
            </div>
            <span className="font-semibold text-sm" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
              StateFlow
            </span>
          </div>
          <button
            className="p-2 rounded-lg transition-colors"
            style={{ background: "rgba(90, 143, 123, 0.08)" }}
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
