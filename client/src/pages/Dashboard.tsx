/**
 * Dashboard — StateFlow Aurora Flow Design
 * Main overview: greeting, today's schedule, progress summary,
 * workload snapshot, and motivational elements.
 */
import { useState } from "react";
import { Link } from "wouter";
import {
  BookOpen,
  Clock,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Flame,
  Star,
  ArrowRight,
  Zap,
} from "lucide-react";
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from "recharts";

const TODAY_BLOCKS = [
  { id: 1, subject: "Organic Chemistry", topic: "Reaction Mechanisms Ch. 8", time: "9:00 – 10:30 AM", duration: 90, color: "coral", done: true, emoji: "⚗️" },
  { id: 2, subject: "Calculus II", topic: "Integration by Parts", time: "11:00 AM – 12:00 PM", duration: 60, color: "teal", done: true, emoji: "∫" },
  { id: 3, subject: "Biology", topic: "Cell Signaling Pathways", time: "2:00 – 3:30 PM", duration: 90, color: "violet", done: false, emoji: "🧬" },
  { id: 4, subject: "Physics", topic: "Electromagnetism Review", time: "4:00 – 5:00 PM", duration: 60, color: "amber", done: false, emoji: "⚡" },
];

const UPCOMING_DEADLINES = [
  { subject: "Organic Chemistry", task: "Lab Report #4", daysLeft: 2, urgency: "high", emoji: "⚗️" },
  { subject: "Biology", task: "Midterm Exam", daysLeft: 5, urgency: "medium", emoji: "🧬" },
  { subject: "Calculus II", task: "Problem Set 7", daysLeft: 8, urgency: "low", emoji: "∫" },
];

const WEEKLY_PROGRESS = [
  { name: "Completed", value: 68, fill: "#FF6B6B" },
  { name: "Planned", value: 100, fill: "#EDE9FE" },
];

const SUBJECT_LOADS = [
  { subject: "Organic Chem", hours: 8, target: 10, color: "#FF6B6B", emoji: "⚗️" },
  { subject: "Biology", hours: 6, target: 8, color: "#A78BFA", emoji: "🧬" },
  { subject: "Calculus II", hours: 5, target: 6, color: "#4ECDC4", emoji: "∫" },
  { subject: "Physics", hours: 3, target: 6, color: "#FFB347", emoji: "⚡" },
];

export default function Dashboard() {
  const [completedBlocks, setCompletedBlocks] = useState<number[]>([1, 2]);
  const completedCount = completedBlocks.length;
  const totalCount = TODAY_BLOCKS.length;
  const streakDays = 7;

  const toggleBlock = (id: number) => {
    setCompletedBlocks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const getHour = new Date().getHours();
  const greeting =
    getHour < 12 ? "Good morning" : getHour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-5xl">
      {/* Hero welcome banner */}
      <div
        className="rounded-3xl overflow-hidden relative animate-fade-up"
        style={{ minHeight: 160 }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663431192836/478L6thcgpxizQh5ucrFaJ/stateflow-hero-bg-7oTwgMyVTBCyxUDMjMJqVw.webp)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.55,
          }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.4))" }} />
        <div className="relative p-6 flex items-center gap-6">
          <div className="flex-1">
            <h2 className="text-3xl font-bold" style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.18 0.06 280)" }}>
              {greeting}, Alex! 👋
            </h2>
            <p className="mt-1 text-base" style={{ color: "oklch(0.35 0.05 280)", fontFamily: "'Nunito', sans-serif" }}>
              You've got {totalCount - completedCount} study sessions left today. You're doing great!
            </p>
            <div className="flex items-center gap-2 mt-3 px-3 py-1.5 rounded-2xl inline-flex w-fit animate-breathe" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,179,71,0.4)" }}>
              <Flame className="w-4 h-4" style={{ color: "#FF6B6B" }} />
              <span className="font-bold" style={{ color: "#E05252", fontFamily: "'Outfit', sans-serif" }}>{streakDays}</span>
              <span className="text-sm font-medium" style={{ color: "#D97706", fontFamily: "'Nunito', sans-serif" }}>day streak 🔥</span>
            </div>
          </div>
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663431192836/478L6thcgpxizQh5ucrFaJ/stateflow-study-illustration-WyBg3J4GWJbFNcj6NvCbgB.webp"
            alt="Student studying"
            className="w-32 h-32 object-contain flex-shrink-0 hidden sm:block"
            style={{ filter: "drop-shadow(0 4px 12px rgba(167,139,250,0.2))" }}
          />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up-delay-1">
        {[
          { label: "Sessions Today", value: `${completedCount}/${totalCount}`, icon: CheckCircle2, color: "#4ECDC4", bg: "rgba(78,205,196,0.1)", border: "rgba(78,205,196,0.25)" },
          { label: "Study Hours", value: "4.5h", icon: Clock, color: "#A78BFA", bg: "rgba(167,139,250,0.1)", border: "rgba(167,139,250,0.25)" },
          { label: "Week Progress", value: "68%", icon: TrendingUp, color: "#FF6B6B", bg: "rgba(255,107,107,0.1)", border: "rgba(255,107,107,0.25)" },
          { label: "Focus Score", value: "87", icon: Star, color: "#FFB347", bg: "rgba(255,179,71,0.1)", border: "rgba(255,179,71,0.25)" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="glass-card rounded-2xl p-4"
            style={{ background: stat.bg, border: `1px solid ${stat.border}` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
              <span className="text-xs font-medium" style={{ color: "oklch(0.5 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>{stat.label}</span>
            </div>
            <p className="text-2xl font-bold" style={{ color: "oklch(0.22 0.04 280)", fontFamily: "'Outfit', sans-serif" }}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Today's study blocks */}
        <div className="lg:col-span-2 space-y-4 animate-fade-up-delay-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold" style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.22 0.04 280)" }}>
              Today's Study Blocks
            </h3>
            <Link href="/schedule">
              <span className="text-sm flex items-center gap-1 font-medium" style={{ color: "#A78BFA", fontFamily: "'Nunito', sans-serif" }}>
                View all <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>

          <div className="space-y-3">
            {TODAY_BLOCKS.map((block) => {
              const isDone = completedBlocks.includes(block.id);
              return (
                <div
                  key={block.id}
                  className={`study-block ${block.color}`}
                  style={{ opacity: isDone ? 0.75 : 1 }}
                  onClick={() => toggleBlock(block.id)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{block.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm" style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.22 0.04 280)" }}>
                          {block.subject}
                        </span>
                        {isDone && (
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(111,207,151,0.15)", color: "#059669" }}>
                            ✓ Done
                          </span>
                        )}
                      </div>
                      <p className="text-xs mt-0.5 truncate" style={{ color: "oklch(0.5 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>
                        {block.topic}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs font-medium" style={{ color: "oklch(0.45 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>
                        {block.time}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "oklch(0.6 0.04 280)" }}>
                        {block.duration} min
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold" style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.3 0.04 280)" }}>
                Today's progress
              </span>
              <span className="text-sm font-bold" style={{ color: "#FF6B6B" }}>
                {Math.round((completedCount / totalCount) * 100)}%
              </span>
            </div>
            <div className="h-3 rounded-full" style={{ background: "rgba(167,139,250,0.15)" }}>
              <div
                className="progress-aurora h-3"
                style={{ width: `${(completedCount / totalCount) * 100}%` }}
              />
            </div>
            <p className="text-xs mt-2" style={{ color: "oklch(0.55 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>
              {completedCount === totalCount
                ? "🎉 All done for today! Amazing work!"
                : `${totalCount - completedCount} more session${totalCount - completedCount !== 1 ? "s" : ""} to go — keep it up!`}
            </p>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4 animate-fade-up-delay-3">
          {/* Weekly progress radial */}
          <div className="glass-card rounded-2xl p-5">
            <h3 className="text-sm font-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.22 0.04 280)" }}>
              Weekly Progress
            </h3>
            <div className="flex items-center gap-4">
              <div style={{ width: 80, height: 80 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="100%"
                    data={WEEKLY_PROGRESS}
                    startAngle={90}
                    endAngle={-270}
                  >
                    <RadialBar dataKey="value" cornerRadius={4} />
                    <Tooltip formatter={(v) => `${v}%`} />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div>
                <p className="text-2xl font-bold" style={{ color: "#FF6B6B", fontFamily: "'Outfit', sans-serif" }}>68%</p>
                <p className="text-xs" style={{ color: "oklch(0.55 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>of weekly goal</p>
                <p className="text-xs mt-1" style={{ color: "oklch(0.55 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>17 / 25 hrs</p>
              </div>
            </div>
          </div>

          {/* Subject load bars */}
          <div className="glass-card rounded-2xl p-5">
            <h3 className="text-sm font-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.22 0.04 280)" }}>
              Subject Load
            </h3>
            <div className="space-y-3">
              {SUBJECT_LOADS.map((s) => (
                <div key={s.subject}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium" style={{ color: "oklch(0.35 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>
                      {s.emoji} {s.subject}
                    </span>
                    <span className="text-xs" style={{ color: "oklch(0.55 0.04 280)" }}>{s.hours}/{s.target}h</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: "rgba(0,0,0,0.06)" }}>
                    <div
                      className="h-2 rounded-full transition-all duration-700"
                      style={{ width: `${(s.hours / s.target) * 100}%`, background: s.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming deadlines */}
          <div className="glass-card rounded-2xl p-5">
            <h3 className="text-sm font-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.22 0.04 280)" }}>
              Upcoming Deadlines
            </h3>
            <div className="space-y-2.5">
              {UPCOMING_DEADLINES.map((d) => (
                <div key={d.task} className="flex items-center gap-3">
                  <span className="text-lg">{d.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate" style={{ color: "oklch(0.25 0.04 280)", fontFamily: "'Outfit', sans-serif" }}>{d.task}</p>
                    <p className="text-xs" style={{ color: "oklch(0.55 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>{d.subject}</p>
                  </div>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0"
                    style={{
                      background: d.urgency === "high" ? "rgba(255,107,107,0.12)" : d.urgency === "medium" ? "rgba(255,179,71,0.12)" : "rgba(111,207,151,0.12)",
                      color: d.urgency === "high" ? "#E05252" : d.urgency === "medium" ? "#D97706" : "#059669",
                    }}
                  >
                    {d.daysLeft}d
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick action banner */}
      <div
        className="rounded-2xl p-5 flex items-center gap-4 animate-fade-up-delay-4"
        style={{
          background: "linear-gradient(135deg, rgba(78,205,196,0.12), rgba(167,139,250,0.12))",
          border: "1px solid rgba(78,205,196,0.25)",
        }}
      >
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #4ECDC4, #A78BFA)" }}>
          <Zap className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm" style={{ color: "oklch(0.22 0.04 280)", fontFamily: "'Outfit', sans-serif" }}>
            Missed a session? No worries!
          </p>
          <p className="text-xs mt-0.5" style={{ color: "oklch(0.5 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>
            StateFlow will help you reschedule and keep your week balanced.
          </p>
        </div>
        <Link href="/missed">
          <button
            className="text-sm font-semibold px-4 py-2 rounded-xl flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #4ECDC4, #A78BFA)", color: "white" }}
          >
            Reschedule →
          </button>
        </Link>
      </div>
    </div>
  );
}
