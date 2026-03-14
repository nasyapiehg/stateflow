/**
 * WorkloadBalance — StateFlow Soft Minimalism + Japandi
 * Frosted glass cards, Lora headings, Poppins body, sage/terracotta/slate palette.
 */
import { BarChart, Bar, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { AlertCircle, Leaf } from "lucide-react";

const WEEKLY_HOURS = [
  { day: "Mon", planned: 5, actual: 5 },
  { day: "Tue", planned: 4, actual: 3.5 },
  { day: "Wed", planned: 5, actual: 5 },
  { day: "Thu", planned: 5, actual: 4.5 },
  { day: "Fri", planned: 3, actual: 3 },
  { day: "Sat", planned: 2, actual: 2 },
  { day: "Sun", planned: 1, actual: 1 },
];

const TREND_DATA = [
  { week: "W1", focus: 75, balance: 80, stress: 45 },
  { week: "W2", focus: 78, balance: 82, stress: 40 },
  { week: "W3", focus: 80, balance: 85, stress: 35 },
  { week: "W4", focus: 82, balance: 88, stress: 30 },
  { week: "W5", focus: 85, balance: 90, stress: 25 },
  { week: "Now", focus: 88, balance: 92, stress: 20 },
];

const SUBJECT_LOAD = [
  { subject: "Organic Chem", emoji: "⚗️", hours: 4.5, target: 6, color: "#c9956f" },
  { subject: "Biology", emoji: "🧬", hours: 5.5, target: 8, color: "#8b7a6b" },
  { subject: "Calculus II", emoji: "∫", hours: 2.5, target: 3, color: "#5a8f7b" },
  { subject: "Physics", emoji: "⚡", hours: 1.5, target: 6, color: "#6b8f7f" },
  { subject: "English Comp", emoji: "✍️", hours: 2, target: 2, color: "#5a8f7b" },
];

const ALERTS = [
  {
    id: "1",
    type: "warning",
    emoji: "⚡",
    title: "Physics is falling behind!",
    description: "You've only scheduled 1.5h for Physics this week but need 6h. At this rate, you'll be cramming before the exam.",
    action: "Add study blocks →",
  },
  {
    id: "2",
    type: "info",
    emoji: "📅",
    title: "Heavy day ahead on Thursday",
    description: "Thursday has 5h of study scheduled — that's close to your daily limit. Consider moving 1h to Wednesday.",
    action: "Rebalance →",
  },
  {
    id: "3",
    type: "success",
    emoji: "🌟",
    title: "Great balance this week!",
    description: "Your study sessions are well-distributed across subjects. Organic Chemistry and Biology are on track.",
  },
  {
    id: "4",
    type: "success",
    emoji: "🌿",
    title: "Weekend buffer looks good",
    description: "You've kept Saturday afternoon and Sunday morning free. That's healthy — protect that rest time!",
  },
];

const BURNOUT_TIPS = [
  "Take a 5-min break every 25 min (Pomodoro technique)",
  "Aim for 7-8 hours of sleep — it consolidates memory!",
  "Exercise 3x/week improves focus and reduces stress",
  "Study your hardest subject when your energy is highest",
];

export default function WorkloadBalance() {
  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-6xl">
      {/* Header */}
      <div className="animate-fade-up">
        <h2 className="text-3xl font-bold" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
          Workload Balance
        </h2>
        <p className="mt-2 text-sm" style={{ fontFamily: "'Poppins', sans-serif", color: "#6b6b6b", fontWeight: 300 }}>
          Keeping your study load sustainable — because rest is part of the process too 🌱
        </p>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-up-delay-1">
        {[
          { label: "Balance Score", value: "82", unit: "/100", color: "#5a8f7b" },
          { label: "Planned Hours", value: "25h", unit: "this week", color: "#c9956f" },
          { label: "Completed Hours", value: "17.5h", unit: "70% done", color: "#8b7a6b" },
          { label: "Daily Average", value: "3.5h", unit: "weekdays", color: "#5a8f7b" },
          { label: "Rest Days", value: "2", unit: "Sat + Sun protected", color: "#6b8f7f" },
        ].map((metric, idx) => (
          <div
            key={idx}
            className="rounded-lg p-4"
            style={{
              background: "rgba(255, 255, 255, 0.4)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
            }}
          >
            <p className="text-xs mb-1" style={{ fontFamily: "'Poppins', sans-serif", color: "#8b8b8b", fontWeight: 300 }}>
              {metric.label}
            </p>
            <p className="text-2xl font-bold" style={{ fontFamily: "'Lora', serif", color: metric.color }}>
              {metric.value}
            </p>
            <p className="text-xs mt-1" style={{ fontFamily: "'Poppins', sans-serif", color: "#8b8b8b", fontWeight: 300 }}>
              {metric.unit}
            </p>
          </div>
        ))}
      </div>

      {/* Balance alerts */}
      <div className="space-y-3 animate-fade-up-delay-2">
        <h3 className="text-lg font-bold" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
          Balance Alerts
        </h3>
        {ALERTS.map((alert) => (
          <div
            key={alert.id}
            className="rounded-lg p-4 flex items-start gap-4"
            style={{
              background:
                alert.type === "warning"
                  ? "rgba(201, 149, 111, 0.08)"
                  : alert.type === "success"
                    ? "rgba(90, 143, 123, 0.08)"
                    : "rgba(107, 143, 127, 0.08)",
              border:
                alert.type === "warning"
                  ? "1px solid rgba(201, 149, 111, 0.2)"
                  : alert.type === "success"
                    ? "1px solid rgba(90, 143, 123, 0.2)"
                    : "1px solid rgba(107, 143, 127, 0.2)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="text-lg flex-shrink-0">{alert.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
                {alert.title}
              </p>
              <p className="text-xs mt-1" style={{ fontFamily: "'Poppins', sans-serif", color: "#6b6b6b", fontWeight: 300 }}>
                {alert.description}
              </p>
              {alert.action && (
                <button
                  className="text-xs font-semibold mt-2 px-3 py-1 rounded-lg"
                  style={{
                    background:
                      alert.type === "warning"
                        ? "rgba(201, 149, 111, 0.2)"
                        : alert.type === "success"
                          ? "rgba(90, 143, 123, 0.2)"
                          : "rgba(107, 143, 127, 0.2)",
                    color:
                      alert.type === "warning"
                        ? "#c9956f"
                        : alert.type === "success"
                          ? "#5a8f7b"
                          : "#6b8f7f",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {alert.action}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 animate-fade-up-delay-2">
        {/* Daily hours chart */}
        <div
          className="rounded-lg p-5"
          style={{
            background: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.6)",
          }}
        >
          <h3 className="font-bold text-sm mb-4" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
            Daily Study Hours
          </h3>
          <div style={{ minHeight: 180 }}>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={WEEKLY_HOURS} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(90, 143, 123, 0.1)" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fontFamily: "'Poppins', sans-serif", fill: "#8b8b8b" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fontFamily: "'Poppins', sans-serif", fill: "#8b8b8b" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "#faf9f6", border: "1px solid #e8e5e0", borderRadius: "8px" }}
                  formatter={(v: number) => [`${v}h`]}
                />
                <Bar dataKey="planned" fill="rgba(90, 143, 123, 0.2)" radius={[6, 6, 0, 0]} name="Planned" />
                <Bar dataKey="actual" fill="#5a8f7b" radius={[6, 6, 0, 0]} name="Actual" />
                <Legend wrapperStyle={{ fontSize: 11, fontFamily: "'Poppins', sans-serif" }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Trend line chart */}
        <div
          className="rounded-lg p-5"
          style={{
            background: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.6)",
          }}
        >
          <h3 className="font-bold text-sm mb-4" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
            6-Week Wellness Trends
          </h3>
          <div style={{ minHeight: 180 }}>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={TREND_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(90, 143, 123, 0.1)" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fontFamily: "'Poppins', sans-serif", fill: "#8b8b8b" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fontFamily: "'Poppins', sans-serif", fill: "#8b8b8b" }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ background: "#faf9f6", border: "1px solid #e8e5e0", borderRadius: "8px" }}
                />
                <Line type="monotone" dataKey="focus" stroke="#5a8f7b" strokeWidth={2.5} dot={false} name="Focus" />
                <Line type="monotone" dataKey="balance" stroke="#c9956f" strokeWidth={2.5} dot={false} name="Balance" />
                <Line type="monotone" dataKey="stress" stroke="#a67c7c" strokeWidth={2.5} dot={false} strokeDasharray="4 4" name="Stress" />
                <Legend wrapperStyle={{ fontSize: 11, fontFamily: "'Poppins', sans-serif" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Subject coverage */}
      <div
        className="rounded-lg p-5 animate-fade-up-delay-2"
        style={{
          background: "rgba(255, 255, 255, 0.4)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.6)",
        }}
      >
        <h3 className="font-bold text-sm mb-4" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
          Subject Coverage This Week
        </h3>
        <div className="space-y-3">
          {SUBJECT_LOAD.map((subject, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium" style={{ fontFamily: "'Poppins', sans-serif", color: "#2a2a2a" }}>
                  {subject.emoji} {subject.subject}
                </p>
                <p className="text-xs" style={{ fontFamily: "'Poppins', sans-serif", color: "#8b8b8b", fontWeight: 300 }}>
                  {subject.hours}h / {subject.target}h
                </p>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: "#e8e5e0" }}>
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    background: subject.color,
                    width: `${(subject.hours / subject.target) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Burnout prevention tips */}
      <div
        className="rounded-lg p-5 animate-fade-up-delay-2"
        style={{
          background: "rgba(90, 143, 123, 0.08)",
          border: "1px solid rgba(90, 143, 123, 0.2)",
          backdropFilter: "blur(8px)",
        }}
      >
        <h3 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
          <Leaf className="w-4 h-4" style={{ color: "#5a8f7b" }} />
          Burnout Prevention Tips 💚
        </h3>
        <div className="space-y-2">
          {BURNOUT_TIPS.map((tip, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-xs font-bold mt-0.5" style={{ color: "#5a8f7b" }}>✦</span>
              <p className="text-xs" style={{ fontFamily: "'Poppins', sans-serif", color: "#6b6b6b", fontWeight: 300 }}>
                {tip}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
