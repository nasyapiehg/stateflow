/**
 * WorkloadBalance — StateFlow Aurora Flow Design
 * Workload balance alerts, burnout prevention, and study distribution insights.
 */
import { useState } from "react";
import { CheckCircle2, TrendingUp, Heart, Coffee, Moon, Zap, BarChart2 } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend,
} from "recharts";

const WEEKLY_HOURS = [
  { day: "Mon", planned: 4, actual: 3.5 },
  { day: "Tue", planned: 3, actual: 3 },
  { day: "Wed", planned: 5, actual: 4 },
  { day: "Thu", planned: 4, actual: 5 },
  { day: "Fri", planned: 3, actual: 2 },
  { day: "Sat", planned: 4, actual: 0 },
  { day: "Sun", planned: 2, actual: 0 },
];

const TREND_DATA = [
  { week: "W1", focus: 72, stress: 45, balance: 80 },
  { week: "W2", focus: 68, stress: 55, balance: 72 },
  { week: "W3", focus: 75, stress: 40, balance: 85 },
  { week: "W4", focus: 80, stress: 35, balance: 88 },
  { week: "W5", focus: 65, stress: 60, balance: 70 },
  { week: "Now", focus: 78, stress: 42, balance: 82 },
];

const SUBJECT_LOADS = [
  { subject: "Organic Chem", scheduled: 4.5, needed: 6, color: "#FF6B6B", emoji: "⚗️" },
  { subject: "Biology", scheduled: 5.5, needed: 8, color: "#A78BFA", emoji: "🧬" },
  { subject: "Calculus II", scheduled: 2.5, needed: 3, color: "#4ECDC4", emoji: "∫" },
  { subject: "Physics", scheduled: 1.5, needed: 6, color: "#FFB347", emoji: "⚡" },
  { subject: "English Comp", scheduled: 2, needed: 2, color: "#6FCF97", emoji: "✍️" },
];

interface Alert {
  id: number;
  type: "warning" | "success" | "info";
  title: string;
  message: string;
  action?: string;
  emoji: string;
}

const ALERTS: Alert[] = [
  {
    id: 1,
    type: "warning",
    title: "Physics is falling behind!",
    message: "You've only scheduled 1.5h for Physics this week but need 6h. At this rate, you'll be cramming before the exam.",
    action: "Add study blocks",
    emoji: "⚡",
  },
  {
    id: 2,
    type: "warning",
    title: "Heavy day ahead on Thursday",
    message: "Thursday has 5h of study scheduled — that's close to your daily limit. Consider moving 1h to Wednesday.",
    action: "Rebalance",
    emoji: "📅",
  },
  {
    id: 3,
    type: "success",
    title: "Great balance this week!",
    message: "Your study sessions are well-distributed across subjects. Organic Chemistry and Biology are on track.",
    emoji: "🌟",
  },
  {
    id: 4,
    type: "info",
    title: "Weekend buffer looks good",
    message: "You've kept Saturday afternoon and Sunday morning free. That's healthy — protect that rest time!",
    emoji: "🌿",
  },
];

const WELLNESS_TIPS = [
  { icon: Coffee, tip: "Take a 5-min break every 25 min (Pomodoro technique)", color: "#FFB347" },
  { icon: Moon, tip: "Aim for 7-8 hours of sleep — it consolidates memory!", color: "#A78BFA" },
  { icon: Heart, tip: "Exercise 3x/week improves focus and reduces stress", color: "#FF6B6B" },
  { icon: Zap, tip: "Study your hardest subject when your energy is highest", color: "#4ECDC4" },
];

export default function WorkloadBalance() {
  const [dismissedAlerts, setDismissedAlerts] = useState<number[]>([]);
  const activeAlerts = ALERTS.filter((a) => !dismissedAlerts.includes(a.id));

  const totalPlanned = WEEKLY_HOURS.reduce((acc, d) => acc + d.planned, 0);
  const totalActual = WEEKLY_HOURS.reduce((acc, d) => acc + d.actual, 0);
  const balanceScore = 82;

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-5xl">
      {/* Header */}
      <div className="animate-fade-up">
        <h2 className="text-3xl font-bold" style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.22 0.04 280)" }}>
          Workload Balance
        </h2>
        <p className="mt-1 text-sm" style={{ color: "oklch(0.5 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>
          Keeping your study load sustainable — because rest is part of the process too 🌱
        </p>
      </div>

      {/* Balance score + summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-up-delay-1">
        <div
          className="sm:col-span-1 rounded-2xl p-5 flex flex-col items-center justify-center text-center"
          style={{ background: "linear-gradient(135deg, rgba(78,205,196,0.12), rgba(167,139,250,0.1))", border: "1px solid rgba(78,205,196,0.25)" }}
        >
          <div className="relative w-24 h-24 mb-3">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(167,139,250,0.15)" strokeWidth="10" />
              <circle
                cx="50" cy="50" r="40" fill="none"
                stroke="#4ECDC4" strokeWidth="10"
                strokeDasharray={`${2 * Math.PI * 40 * balanceScore / 100} ${2 * Math.PI * 40}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold" style={{ color: "oklch(0.22 0.04 280)", fontFamily: "'Outfit', sans-serif" }}>{balanceScore}</span>
              <span className="text-xs" style={{ color: "oklch(0.55 0.04 280)" }}>/100</span>
            </div>
          </div>
          <p className="font-bold text-sm" style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.25 0.04 280)" }}>Balance Score</p>
          <p className="text-xs mt-1" style={{ color: "oklch(0.55 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>Looking good! 🌟</p>
        </div>

        <div className="sm:col-span-2 grid grid-cols-2 gap-4">
          {[
            { label: "Planned Hours", value: `${totalPlanned}h`, sub: "this week", icon: BarChart2, color: "#A78BFA", bg: "rgba(167,139,250,0.1)", border: "rgba(167,139,250,0.25)" },
            { label: "Completed Hours", value: `${totalActual}h`, sub: `${Math.round((totalActual / totalPlanned) * 100)}% done`, icon: CheckCircle2, color: "#4ECDC4", bg: "rgba(78,205,196,0.1)", border: "rgba(78,205,196,0.25)" },
            { label: "Daily Average", value: `${(totalActual / 5).toFixed(1)}h`, sub: "weekdays", icon: TrendingUp, color: "#FFB347", bg: "rgba(255,179,71,0.1)", border: "rgba(255,179,71,0.25)" },
            { label: "Rest Days", value: "2", sub: "Sat + Sun protected", icon: Heart, color: "#FF6B6B", bg: "rgba(255,107,107,0.1)", border: "rgba(255,107,107,0.25)" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl p-4" style={{ background: stat.bg, border: `1px solid ${stat.border}` }}>
              <div className="flex items-center gap-2 mb-1">
                <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                <span className="text-xs font-medium" style={{ color: "oklch(0.5 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>{stat.label}</span>
              </div>
              <p className="text-2xl font-bold" style={{ color: "oklch(0.22 0.04 280)", fontFamily: "'Outfit', sans-serif" }}>{stat.value}</p>
              <p className="text-xs mt-0.5" style={{ color: "oklch(0.6 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts */}
      {activeAlerts.length > 0 && (
        <div className="space-y-3 animate-fade-up-delay-2">
          <h3 className="font-bold" style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.22 0.04 280)" }}>
            Balance Alerts
          </h3>
          {activeAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 flex items-start gap-3 ${alert.type === "warning" ? "alert-warning" : alert.type === "success" ? "alert-success" : "alert-info"}`}
            >
              <span className="text-xl flex-shrink-0">{alert.emoji}</span>
              <div className="flex-1">
                <p className="font-semibold text-sm" style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.22 0.04 280)" }}>
                  {alert.title}
                </p>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: "oklch(0.45 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>
                  {alert.message}
                </p>
                {alert.action && (
                  <button className="mt-2 text-xs font-semibold px-3 py-1 rounded-lg" style={{ background: "rgba(167,139,250,0.15)", color: "#7C3AED" }}>
                    {alert.action} →
                  </button>
                )}
              </div>
              <button
                onClick={() => setDismissedAlerts((p) => [...p, alert.id])}
                className="text-xs px-2 py-1 rounded-lg flex-shrink-0"
                style={{ color: "oklch(0.55 0.04 280)", background: "rgba(0,0,0,0.04)" }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 animate-fade-up-delay-3">
        {/* Daily hours bar chart */}
        <div className="glass-card rounded-2xl p-5">
          <h3 className="font-bold text-sm mb-4" style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.22 0.04 280)" }}>
            Daily Study Hours
          </h3>
          <div style={{ minHeight: 180 }}>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={WEEKLY_HOURS} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(167,139,250,0.1)" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fontFamily: "'Nunito', sans-serif", fill: "oklch(0.55 0.04 280)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fontFamily: "'Nunito', sans-serif", fill: "oklch(0.55 0.04 280)" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: "1px solid rgba(167,139,250,0.2)", fontFamily: "'Nunito', sans-serif", fontSize: 12 }}
                formatter={(v: number) => [`${v}h`]}
              />
              <Bar dataKey="planned" fill="rgba(167,139,250,0.3)" radius={[6, 6, 0, 0]} name="Planned" />
              <Bar dataKey="actual" fill="#A78BFA" radius={[6, 6, 0, 0]} name="Actual" />
              <Legend wrapperStyle={{ fontSize: 11, fontFamily: "'Nunito', sans-serif" }} />
            </BarChart>
          </ResponsiveContainer>
          </div>
        </div>

        {/* Trend line chart */}
        <div className="glass-card rounded-2xl p-5">
          <h3 className="font-bold text-sm mb-4" style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.22 0.04 280)" }}>
            6-Week Wellness Trends
          </h3>
          <div style={{ minHeight: 180 }}>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={TREND_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(167,139,250,0.1)" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fontFamily: "'Nunito', sans-serif", fill: "oklch(0.55 0.04 280)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fontFamily: "'Nunito', sans-serif", fill: "oklch(0.55 0.04 280)" }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: "1px solid rgba(167,139,250,0.2)", fontFamily: "'Nunito', sans-serif", fontSize: 12 }}
              />
              <Line type="monotone" dataKey="focus" stroke="#4ECDC4" strokeWidth={2.5} dot={false} name="Focus" />
              <Line type="monotone" dataKey="balance" stroke="#A78BFA" strokeWidth={2.5} dot={false} name="Balance" />
              <Line type="monotone" dataKey="stress" stroke="#FF6B6B" strokeWidth={2.5} dot={false} strokeDasharray="4 4" name="Stress" />
              <Legend wrapperStyle={{ fontSize: 11, fontFamily: "'Nunito', sans-serif" }} />
            </LineChart>
          </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Subject load breakdown */}
      <div className="glass-card rounded-2xl p-5 animate-fade-up-delay-4">
        <h3 className="font-bold mb-4" style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.22 0.04 280)" }}>
          Subject Coverage This Week
        </h3>
        <div className="space-y-4">
          {SUBJECT_LOADS.map((s) => {
            const pct = Math.min(100, (s.scheduled / s.needed) * 100);
            const status = pct >= 90 ? "on-track" : pct >= 50 ? "behind" : "critical";
            return (
              <div key={s.subject}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{s.emoji}</span>
                    <span className="text-sm font-semibold" style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.25 0.04 280)" }}>{s.subject}</span>
                    {status === "critical" && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(255,107,107,0.12)", color: "#E05252" }}>
                        Needs attention!
                      </span>
                    )}
                    {status === "on-track" && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(111,207,151,0.12)", color: "#059669" }}>
                        On track ✓
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-medium" style={{ color: "oklch(0.5 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>
                    {s.scheduled}h / {s.needed}h
                  </span>
                </div>
                <div className="h-3 rounded-full" style={{ background: "rgba(0,0,0,0.06)" }}>
                  <div
                    className="h-3 rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, background: s.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Wellness tips */}
      <div className="animate-fade-up-delay-5">
        <h3 className="font-bold mb-4" style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.22 0.04 280)" }}>
          Burnout Prevention Tips 💚
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {WELLNESS_TIPS.map((tip, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-4 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(167,139,250,0.12)" }}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${tip.color}20` }}
              >
                <tip.icon className="w-4 h-4" style={{ color: tip.color }} />
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "oklch(0.35 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>
                {tip.tip}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
