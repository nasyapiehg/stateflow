/**
 * StudyPlanner — StateFlow Soft Minimalism + Japandi
 * Frosted glass cards, Lora headings, Poppins body, sage/terracotta/slate palette.
 */
import { Plus } from "lucide-react";

interface Assignment {
  id: string;
  emoji: string;
  title: string;
  subject: string;
  daysLeft: number;
  totalHours: number;
  scheduledHours: number;
  difficulty: "light" | "moderate" | "heavy";
  blocks: number;
  color: string;
  sessions: Array<{
    title: string;
    day: string;
    time: string;
    duration: number;
  }>;
}

const ASSIGNMENTS: Assignment[] = [
  {
    id: "1",
    emoji: "⚗️",
    title: "Lab Report #4",
    subject: "Organic Chemistry",
    daysLeft: 2,
    totalHours: 4,
    scheduledHours: 4,
    difficulty: "heavy",
    blocks: 3,
    color: "#c9956f",
    sessions: [
      { title: "Reaction mechanisms review", day: "Mon", time: "10:30 AM", duration: 90 },
      { title: "Lab data analysis", day: "Tue", time: "3:00 PM", duration: 60 },
      { title: "Write report draft", day: "Wed", time: "4:00 PM", duration: 90 },
    ],
  },
  {
    id: "2",
    emoji: "🧬",
    title: "Midterm Exam Prep",
    subject: "Biology",
    daysLeft: 5,
    totalHours: 8,
    scheduledHours: 7.5,
    difficulty: "heavy",
    blocks: 4,
    color: "#8b7a6b",
    sessions: [
      { title: "Cell biology review", day: "Wed", time: "2:00 PM", duration: 120 },
      { title: "Genetics practice", day: "Thu", time: "10:00 AM", duration: 90 },
      { title: "Ecology concepts", day: "Fri", time: "3:00 PM", duration: 90 },
      { title: "Full practice exam", day: "Sat", time: "10:00 AM", duration: 120 },
    ],
  },
  {
    id: "3",
    emoji: "∫",
    title: "Problem Set 7",
    subject: "Calculus II",
    daysLeft: 8,
    totalHours: 3,
    scheduledHours: 2.5,
    difficulty: "moderate",
    blocks: 2,
    color: "#5a8f7b",
    sessions: [
      { title: "Problems 1-5 (integration)", day: "Tue", time: "11:00 AM", duration: 90 },
      { title: "Problems 6-10 (applications)", day: "Thu", time: "2:00 PM", duration: 60 },
    ],
  },
];

export default function StudyPlanner() {
  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-4xl">
      {/* Header */}
      <div className="animate-fade-up">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-3xl font-bold" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
              Study Planner 📚
            </h2>
            <p className="mt-2 text-sm" style={{ fontFamily: "'Poppins', sans-serif", color: "#6b6b6b", fontWeight: 300 }}>
              Add your assignments and let StateFlow break them into manageable study sessions
            </p>
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm"
            style={{
              background: "#5a8f7b",
              color: "#faf9f6",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            <Plus className="w-4 h-4" />
            Add Assignment
          </button>
        </div>
      </div>

      {/* Info box */}
      <div
        className="rounded-lg p-5 animate-fade-up-delay-1"
        style={{
          background: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.5)",
        }}
      >
        <h3 className="font-bold text-sm mb-2" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
          How StateFlow breaks down your work
        </h3>
        <p className="text-xs" style={{ fontFamily: "'Poppins', sans-serif", color: "#6b6b6b", fontWeight: 300 }}>
          StateFlow looks at your due dates, estimated hours, and difficulty level to create realistic study sessions — no cramming, no overwhelm. Sessions are spaced out and scheduled around your existing classes and commitments.
        </p>
      </div>

      {/* Assignments */}
      <div className="space-y-4 animate-fade-up-delay-2">
        {ASSIGNMENTS.map((assignment) => (
          <div
            key={assignment.id}
            className="rounded-lg overflow-hidden"
            style={{
              background: "rgba(255, 255, 255, 0.4)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
            }}
          >
            {/* Header */}
            <div
              className="p-5 cursor-pointer hover:bg-opacity-80 transition-all"
              style={{
                background: `linear-gradient(135deg, ${assignment.color}15, ${assignment.color}08)`,
                borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-lg">{assignment.emoji}</span>
                    <h3 className="font-bold text-sm" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
                      {assignment.title}
                    </h3>
                    <span
                      className="text-xs font-semibold px-2 py-1 rounded-lg"
                      style={{
                        background: `${assignment.color}20`,
                        color: assignment.color,
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      {assignment.daysLeft}d left
                    </span>
                  </div>
                  <p className="text-xs" style={{ fontFamily: "'Poppins', sans-serif", color: "#6b6b6b", fontWeight: 300 }}>
                    {assignment.subject} · {assignment.totalHours}h · {assignment.difficulty === "heavy" ? "🌳" : assignment.difficulty === "moderate" ? "🌿" : "🌱"} {assignment.difficulty}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-semibold" style={{ color: assignment.color, fontFamily: "'Lora', serif" }}>
                    ✨ {assignment.blocks} blocks
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-3">
                <div
                  className="h-1.5 rounded-full overflow-hidden"
                  style={{ background: "#e8e5e0" }}
                >
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      background: assignment.color,
                      width: `${(assignment.scheduledHours / assignment.totalHours) * 100}%`,
                    }}
                  />
                </div>
                <p className="text-xs mt-2" style={{ fontFamily: "'Poppins', sans-serif", color: "#6b6b6b", fontWeight: 300 }}>
                  🌳 {assignment.scheduledHours}h scheduled of {assignment.totalHours}h needed
                </p>
              </div>
            </div>

            {/* Sessions */}
            <div className="p-5 space-y-3">
              <p className="text-xs font-bold" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
                Generated study sessions:
              </p>
              {assignment.sessions.map((session, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg"
                  style={{ background: "rgba(255, 255, 255, 0.3)" }}
                >
                  <div
                    className="w-1 h-12 rounded-full flex-shrink-0"
                    style={{ background: assignment.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
                      {session.title}
                    </p>
                    <p className="text-xs mt-1" style={{ fontFamily: "'Poppins', sans-serif", color: "#6b6b6b", fontWeight: 300 }}>
                      {session.day} at {session.time}
                    </p>
                  </div>
                  <p
                    className="text-xs font-semibold flex-shrink-0"
                    style={{ fontFamily: "'Poppins', sans-serif", color: assignment.color }}
                  >
                    {session.duration} min
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
