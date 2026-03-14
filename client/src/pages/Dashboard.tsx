/**
 * Dashboard — StateFlow Soft Minimalism + Japandi
 * Frosted glass cards, Lora headings, Poppins body, sage/terracotta/slate palette.
 */
import { CheckCircle2, Flame } from "lucide-react";

interface StudyBlock {
  id: string;
  emoji: string;
  subject: string;
  topic: string;
  time: string;
  duration: number;
  color: string;
  completed: boolean;
}

interface Deadline {
  id: string;
  emoji: string;
  title: string;
  subject: string;
  daysLeft: number;
  color: string;
}

const TODAY_BLOCKS: StudyBlock[] = [
  {
    id: "1",
    emoji: "⚗️",
    subject: "Organic Chemistry",
    topic: "Reaction Mechanisms Ch. 8",
    time: "9:00 – 10:30 AM",
    duration: 90,
    color: "#c9956f",
    completed: false,
  },
  {
    id: "2",
    emoji: "∫",
    subject: "Calculus II",
    topic: "Integration by Parts",
    time: "11:00 AM – 12:00 PM",
    duration: 60,
    color: "#5a8f7b",
    completed: false,
  },
  {
    id: "3",
    emoji: "🧬",
    subject: "Biology",
    topic: "Cell Signaling Pathways",
    time: "2:00 – 3:30 PM",
    duration: 90,
    color: "#8b7a6b",
    completed: false,
  },
  {
    id: "4",
    emoji: "⚡",
    subject: "Physics",
    topic: "Electromagnetism Review",
    time: "4:00 – 5:00 PM",
    duration: 60,
    color: "#6b8f7f",
    completed: false,
  },
];

const UPCOMING_DEADLINES: Deadline[] = [
  { id: "1", emoji: "📋", title: "Lab Report #6", subject: "Organic Chemistry", daysLeft: 2, color: "#c9956f" },
  { id: "2", emoji: "📝", title: "Midterm Exam", subject: "Biology", daysLeft: 5, color: "#8b7a6b" },
  { id: "3", emoji: "📊", title: "Problem Set 7", subject: "Calculus II", daysLeft: 8, color: "#5a8f7b" },
];

const SUBJECT_LOAD = [
  { subject: "Organic Chemistry", emoji: "⚗️", hours: 8, target: 10, color: "#c9956f" },
  { subject: "Biology", emoji: "🧬", hours: 6.5, target: 8, color: "#8b7a6b" },
  { subject: "Calculus II", emoji: "∫", hours: 5, target: 6, color: "#5a8f7b" },
  { subject: "Physics", emoji: "⚡", hours: 3, target: 6, color: "#6b8f7f" },
];

export default function Dashboard() {
  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-6xl">
      {/* Welcome hero */}
      <div className="animate-fade-up">
        <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
          Good evening, Alex! 👋
        </h1>
        <p className="text-sm" style={{ fontFamily: "'Poppins', sans-serif", color: "#6b6b6b", fontWeight: 300 }}>
          You've got 2 study sessions left today. You're doing great!
        </p>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up-delay-1">
        {[
          { label: "Sessions Today", value: "2/4", color: "#5a8f7b", icon: "📚" },
          { label: "Study Hours", value: "4.5h", color: "#c9956f", icon: "⏱️" },
          { label: "Week Progress", value: "68%", color: "#8b7a6b", icon: "📈" },
          { label: "Focus Score", value: "87", color: "#3a4a52", icon: "🎯" },
        ].map((metric, idx) => (
          <div
            key={idx}
            className="rounded-lg p-4 transition-all hover:shadow-lg"
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
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid lg:grid-cols-3 gap-6 animate-fade-up-delay-2">
        {/* Today's study blocks */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
            Today's Study Blocks
          </h2>
          <div className="space-y-3">
            {TODAY_BLOCKS.map((block) => (
              <div
                key={block.id}
                className="rounded-lg p-4 flex items-start gap-4 transition-all hover:shadow-md cursor-pointer"
                style={{
                  background: "rgba(255, 255, 255, 0.4)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.6)",
                }}
              >
                <div
                  className="w-1 h-16 rounded-full flex-shrink-0"
                  style={{ background: block.color }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{block.emoji}</span>
                    <p className="font-semibold text-sm" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
                      {block.subject}
                    </p>
                  </div>
                  <p className="text-xs mb-2" style={{ fontFamily: "'Poppins', sans-serif", color: "#6b6b6b", fontWeight: 300 }}>
                    {block.topic}
                  </p>
                  <p className="text-xs" style={{ fontFamily: "'Poppins', sans-serif", color: "#8b8b8b", fontWeight: 300 }}>
                    {block.time} · {block.duration} min
                  </p>
                </div>
                <button
                  className="flex-shrink-0 p-2 rounded-lg transition-all"
                  style={{
                    background: block.completed ? "#5a8f7b" : "rgba(90, 143, 123, 0.1)",
                  }}
                >
                  <CheckCircle2 className="w-5 h-5" style={{ color: block.completed ? "#faf9f6" : "#5a8f7b" }} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          {/* Streak */}
          <div
            className="rounded-lg p-5"
            style={{
              background: "rgba(255, 255, 255, 0.4)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-5 h-5" style={{ color: "#c9956f" }} />
              <p className="font-semibold text-sm" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
                7 day streak 🔥
              </p>
            </div>
            <p className="text-xs" style={{ fontFamily: "'Poppins', sans-serif", color: "#6b6b6b", fontWeight: 300 }}>
              You're on fire! Keep studying consistently to build momentum.
            </p>
          </div>

          {/* Weekly progress ring */}
          <div
            className="rounded-lg p-5 text-center"
            style={{
              background: "rgba(255, 255, 255, 0.4)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
            }}
          >
            <p className="text-xs mb-3" style={{ fontFamily: "'Poppins', sans-serif", color: "#8b8b8b", fontWeight: 300 }}>
              Weekly Progress
            </p>
            <div className="relative w-24 h-24 mx-auto mb-3">
              <svg className="w-full h-full" viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="50" cy="50" r="45" fill="none" stroke="#e8e5e0" strokeWidth="8" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#c9956f"
                  strokeWidth="8"
                  strokeDasharray={`${68 * 2.83} 283`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-xl font-bold" style={{ fontFamily: "'Lora', serif", color: "#c9956f" }}>
                  68%
                </p>
              </div>
            </div>
            <p className="text-xs" style={{ fontFamily: "'Poppins', sans-serif", color: "#6b6b6b", fontWeight: 300 }}>
              17 / 25 hrs
            </p>
          </div>

          {/* Upcoming deadlines */}
          <div
            className="rounded-lg p-5"
            style={{
              background: "rgba(255, 255, 255, 0.4)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
            }}
          >
            <p className="font-semibold text-sm mb-3" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
              Upcoming Deadlines
            </p>
            <div className="space-y-2">
              {UPCOMING_DEADLINES.map((deadline) => (
                <div key={deadline.id} className="flex items-start gap-2">
                  <span className="text-sm flex-shrink-0">{deadline.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
                      {deadline.title}
                    </p>
                    <p className="text-xs" style={{ fontFamily: "'Poppins', sans-serif", color: "#8b8b8b", fontWeight: 300 }}>
                      {deadline.subject}
                    </p>
                  </div>
                  <p className="text-xs font-semibold flex-shrink-0" style={{ fontFamily: "'Poppins', sans-serif", color: deadline.color }}>
                    {deadline.daysLeft}d
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Subject load */}
      <div
        className="rounded-lg p-6 animate-fade-up-delay-2"
        style={{
          background: "rgba(255, 255, 255, 0.4)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.6)",
        }}
      >
        <h3 className="font-semibold text-sm mb-4" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
          Subject Load
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
    </div>
  );
}
