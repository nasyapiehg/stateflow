/**
 * Dashboard — StateFlow Zen-Minimalist
 * High-fashion glassmorphism, muted sage/terracotta/plum accents,
 * soft shadows, generous whitespace, organic rounded corners.
 */
import { Flame, ChevronRight, CheckCircle2 } from "lucide-react";

interface StudyBlock {
  id: string;
  subject: string;
  topic: string;
  time: string;
  duration: number;
  completed: boolean;
  emoji: string;
  color: string;
}

const TODAY_BLOCKS: StudyBlock[] = [
  {
    id: "1",
    subject: "Organic Chemistry",
    topic: "Reaction Mechanisms Ch. 8",
    time: "9:00 – 10:30 AM",
    duration: 90,
    completed: true,
    emoji: "⚗️",
    color: "#D4A574",
  },
  {
    id: "2",
    subject: "Calculus II",
    topic: "Integration by Parts",
    time: "11:00 AM – 12:00 PM",
    duration: 60,
    completed: true,
    emoji: "∫",
    color: "#7FA8B8",
  },
  {
    id: "3",
    subject: "Biology",
    topic: "Cell Signaling Pathways",
    time: "2:00 – 3:30 PM",
    duration: 90,
    completed: false,
    emoji: "🧬",
    color: "#9B8FA6",
  },
  {
    id: "4",
    subject: "Physics",
    topic: "Electromagnetism Review",
    time: "4:00 – 5:00 PM",
    duration: 60,
    completed: false,
    emoji: "⚡",
    color: "#A89B8B",
  },
];

const UPCOMING_DEADLINES = [
  { subject: "Organic Chemistry", task: "Lab Report #6", daysLeft: 2, emoji: "⚗️" },
  { subject: "Biology", task: "Midterm Exam", daysLeft: 5, emoji: "🧬" },
  { subject: "Calculus II", task: "Problem Set 7", daysLeft: 8, emoji: "∫" },
];

const SUBJECT_LOAD = [
  { subject: "Organic Chem", emoji: "⚗️", hours: 8, target: 10, color: "#D4A574" },
  { subject: "Biology", emoji: "🧬", hours: 6, target: 8, color: "#9B8FA6" },
  { subject: "Calculus II", emoji: "∫", hours: 5, target: 6, color: "#7FA8B8" },
  { subject: "Physics", emoji: "⚡", hours: 3, target: 6, color: "#A89B8B" },
];

export default function Dashboard() {
  const totalCount = TODAY_BLOCKS.length;
  const completedCount = TODAY_BLOCKS.filter((b) => b.completed).length;
  const streakDays = 7;
  const weekProgress = 68;

  const getHour = new Date().getHours();
  const greeting =
    getHour < 12 ? "Good morning" : getHour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-5xl">
      {/* Header greeting with hero */}
      <div className="animate-fade-up">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-3xl font-bold" style={{ fontFamily: "'Outfit', sans-serif", color: "#2C2C2C" }}>
              {greeting}, Alex! 👋
            </h2>
            <p className="mt-2 text-base" style={{ color: "#6B6B6B", fontFamily: "'Nunito', sans-serif" }}>
              You've got {totalCount - completedCount} study sessions left today. You're doing great!
            </p>
          </div>
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-2xl animate-breathe"
            style={{
              background: "rgba(212, 165, 116, 0.1)",
              border: "1px solid rgba(212, 165, 116, 0.3)",
              backdropFilter: "blur(8px)",
            }}
          >
            <Flame className="w-5 h-5" style={{ color: "#A67C7C" }} />
            <span className="font-bold text-lg" style={{ color: "#8B6B6B", fontFamily: "'Outfit', sans-serif" }}>
              {streakDays}
            </span>
            <span className="text-sm font-medium" style={{ color: "#6B6B6B", fontFamily: "'Nunito', sans-serif" }}>
              day streak 🔥
            </span>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up-delay-1">
        {[
          { label: "Sessions Today", value: `${completedCount}/${totalCount}`, icon: "✓", color: "#7FA8B8" },
          { label: "Study Hours", value: "4.5h", icon: "⏱", color: "#6B8E7F" },
          { label: "Week Progress", value: `${weekProgress}%`, icon: "📈", color: "#D4A574" },
          { label: "Focus Score", value: "87", icon: "⭐", color: "#9B8FA6" },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="glass-card p-4 rounded-2xl"
            style={{
              background: "rgba(250, 250, 248, 0.6)",
              border: "1px solid rgba(107, 142, 127, 0.1)",
            }}
          >
            <p className="text-xs mb-2" style={{ color: "#8B8B8B", fontFamily: "'Nunito', sans-serif" }}>
              {stat.label}
            </p>
            <p className="text-2xl font-bold" style={{ color: stat.color, fontFamily: "'Outfit', sans-serif" }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid lg:grid-cols-3 gap-6 animate-fade-up-delay-2">
        {/* Today's study blocks */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold" style={{ fontFamily: "'Outfit', sans-serif", color: "#2C2C2C" }}>
              Today's Study Blocks
            </h3>
            <a
              href="/schedule"
              className="text-sm flex items-center gap-1"
              style={{ color: "#6B8E7F", fontFamily: "'Nunito', sans-serif" }}
            >
              View all <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div className="space-y-3">
            {TODAY_BLOCKS.map((block) => (
              <div
                key={block.id}
                className="glass-card rounded-2xl p-4 flex items-start gap-4 cursor-pointer transition-all hover:shadow-soft"
                style={{
                  background: "rgba(250, 250, 248, 0.7)",
                  border: "1px solid rgba(107, 142, 127, 0.1)",
                  opacity: block.completed ? 0.7 : 1,
                }}
              >
                <div
                  className="w-1 h-16 rounded-full flex-shrink-0"
                  style={{ background: block.color }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2">
                    <span className="text-lg">{block.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm" style={{ color: "#2C2C2C", fontFamily: "'Outfit', sans-serif" }}>
                        {block.subject}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "#8B8B8B", fontFamily: "'Nunito', sans-serif" }}>
                        {block.topic}
                      </p>
                    </div>
                    {block.completed && (
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#6B8E7F" }} />
                    )}
                  </div>
                  <p className="text-xs mt-2" style={{ color: "#6B6B6B", fontFamily: "'Nunito', sans-serif" }}>
                    {block.time} · {block.duration} min
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Weekly progress */}
          <div
            className="glass-card rounded-2xl p-5"
            style={{
              background: "rgba(250, 250, 248, 0.7)",
              border: "1px solid rgba(107, 142, 127, 0.1)",
            }}
          >
            <h4 className="text-sm font-bold mb-4" style={{ fontFamily: "'Outfit', sans-serif", color: "#2C2C2C" }}>
              Weekly Progress
            </h4>
            <div className="flex items-center justify-center mb-4">
              <div style={{ position: "relative", width: 120, height: 120 }}>
                <svg viewBox="0 0 120 120" style={{ width: "100%", height: "100%" }}>
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#E5E5E5"
                    strokeWidth="8"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#D4A574"
                    strokeWidth="8"
                    strokeDasharray={`${(weekProgress / 100) * 314} 314`}
                    strokeLinecap="round"
                    style={{ transform: "rotate(-90deg)", transformOrigin: "60px 60px" }}
                  />
                </svg>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p className="text-2xl font-bold" style={{ color: "#D4A574", fontFamily: "'Outfit', sans-serif" }}>
                    {weekProgress}%
                  </p>
                  <p className="text-xs" style={{ color: "#8B8B8B", fontFamily: "'Nunito', sans-serif" }}>
                    of weekly goal
                  </p>
                </div>
              </div>
            </div>
            <p className="text-xs text-center" style={{ color: "#6B6B6B", fontFamily: "'Nunito', sans-serif" }}>
              17 / 25 hrs
            </p>
          </div>

          {/* Subject load */}
          <div
            className="glass-card rounded-2xl p-5"
            style={{
              background: "rgba(250, 250, 248, 0.7)",
              border: "1px solid rgba(107, 142, 127, 0.1)",
            }}
          >
            <h4 className="text-sm font-bold mb-4" style={{ fontFamily: "'Outfit', sans-serif", color: "#2C2C2C" }}>
              Subject Load
            </h4>
            <div className="space-y-3">
              {SUBJECT_LOAD.map((subject, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium" style={{ color: "#2C2C2C", fontFamily: "'Nunito', sans-serif" }}>
                      {subject.emoji} {subject.subject}
                    </p>
                    <p className="text-xs" style={{ color: "#8B8B8B", fontFamily: "'Nunito', sans-serif" }}>
                      {subject.hours}/{subject.target}h
                    </p>
                  </div>
                  <div
                    className="h-2 rounded-full"
                    style={{ background: "#E5E5E5" }}
                  >
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

          {/* Upcoming deadlines */}
          <div
            className="glass-card rounded-2xl p-5"
            style={{
              background: "rgba(250, 250, 248, 0.7)",
              border: "1px solid rgba(107, 142, 127, 0.1)",
            }}
          >
            <h4 className="text-sm font-bold mb-4" style={{ fontFamily: "'Outfit', sans-serif", color: "#2C2C2C" }}>
              Upcoming Deadlines
            </h4>
            <div className="space-y-2">
              {UPCOMING_DEADLINES.map((deadline, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg" style={{ background: "#F9F9F7" }}>
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-sm">{deadline.emoji}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-medium truncate" style={{ color: "#2C2C2C", fontFamily: "'Nunito', sans-serif" }}>
                        {deadline.task}
                      </p>
                      <p className="text-xs truncate" style={{ color: "#8B8B8B", fontFamily: "'Nunito', sans-serif" }}>
                        {deadline.subject}
                      </p>
                    </div>
                  </div>
                  <p
                    className="text-xs font-bold flex-shrink-0"
                    style={{ color: deadline.daysLeft <= 2 ? "#A67C7C" : "#6B8E7F", fontFamily: "'Outfit', sans-serif" }}
                  >
                    {deadline.daysLeft}d
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Today's progress bar */}
      <div className="animate-fade-up-delay-2">
        <div
          className="glass-card rounded-2xl p-5"
          style={{
            background: "rgba(250, 250, 248, 0.7)",
            border: "1px solid rgba(107, 142, 127, 0.1)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold" style={{ fontFamily: "'Outfit', sans-serif", color: "#2C2C2C" }}>
              Today's progress
            </p>
            <p className="text-sm font-bold" style={{ color: "#D4A574", fontFamily: "'Outfit', sans-serif" }}>
              {Math.round((completedCount / totalCount) * 100)}%
            </p>
          </div>
          <div
            className="h-2 rounded-full overflow-hidden"
            style={{ background: "#E5E5E5" }}
          >
            <div
              className="h-full rounded-full transition-all"
              style={{
                background: "linear-gradient(90deg, #D4A574, #6B8E7F)",
                width: `${(completedCount / totalCount) * 100}%`,
              }}
            />
          </div>
          <p className="text-xs mt-3" style={{ color: "#6B6B6B", fontFamily: "'Nunito', sans-serif" }}>
            {totalCount - completedCount} more sessions to go — keep it up!
          </p>
        </div>
      </div>
    </div>
  );
}
