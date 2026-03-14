/**
 * MissedSessions — StateFlow Zen-Minimalist
 * Compassionate rescheduling with no guilt, just flexibility.
 */
import { CheckCircle2, AlertCircle } from "lucide-react";

interface MissedSession {
  id: string;
  emoji: string;
  subject: string;
  topic: string;
  originalTime: string;
  duration: number;
  reason: string;
  color: string;
}

interface RescheduledSession {
  id: string;
  emoji: string;
  subject: string;
  topic: string;
  newTime: string;
  color: string;
}

const MISSED_SESSIONS: MissedSession[] = [
  {
    id: "1",
    emoji: "⚡",
    subject: "Physics",
    topic: "Electromagnetism Review",
    originalTime: "Monday at 4:00 PM",
    duration: 60,
    reason: "Felt overwhelmed after lab",
    color: "#A89B8B",
  },
  {
    id: "2",
    emoji: "🧬",
    subject: "Biology",
    topic: "Cell Signaling Pathways",
    originalTime: "Tuesday at 2:00 PM",
    duration: 90,
    reason: "Doctor's appointment ran long",
    color: "#9B8FA6",
  },
];

const RESCHEDULED_SESSIONS: RescheduledSession[] = [
  {
    id: "1",
    emoji: "⚗️",
    subject: "Organic Chemistry",
    topic: "Stereochemistry Practice",
    newTime: "Wednesday at 3:00 PM",
    color: "#D4A574",
  },
];

const TIPS = [
  "Set gentle reminders 15 minutes before each study session",
  "Keep sessions short (45-90 min) — easier to commit to!",
  "Have a backup slot planned for each session just in case",
  "Be honest with yourself about your energy levels when scheduling",
];

export default function MissedSessions() {
  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-4xl">
      {/* Header */}
      <div className="animate-fade-up">
        <h2 className="text-3xl font-bold" style={{ fontFamily: "'Outfit', sans-serif", color: "#2C2C2C" }}>
          Missed Sessions 🔄
        </h2>
        <p className="mt-2 text-sm" style={{ color: "#6B6B6B", fontFamily: "'Nunito', sans-serif" }}>
          Life happens! Let's find better times for these sessions — no stress, just flexibility.
        </p>
      </div>

      {/* Compassionate message */}
      <div
        className="glass-card rounded-2xl p-5 animate-fade-up-delay-1"
        style={{
          background: "rgba(232, 237, 233, 0.4)",
          border: "1px solid rgba(107, 142, 127, 0.2)",
        }}
      >
        <p className="text-sm" style={{ color: "#4A5A52", fontFamily: "'Nunito', sans-serif" }}>
          Missing a session happens to everyone — what matters is getting back on track! 🌱
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 animate-fade-up-delay-1">
        {[
          { label: "Needs Rescheduling", value: MISSED_SESSIONS.length, color: "#D4A574" },
          { label: "Rescheduled", value: RESCHEDULED_SESSIONS.length, color: "#6B8E7F" },
          { label: "This Week Total", value: MISSED_SESSIONS.length + RESCHEDULED_SESSIONS.length, color: "#7FA8B8" },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="glass-card rounded-2xl p-4 text-center"
            style={{
              background: "rgba(250, 250, 248, 0.7)",
              border: "1px solid rgba(107, 142, 127, 0.1)",
            }}
          >
            <p className="text-2xl font-bold" style={{ color: stat.color, fontFamily: "'Outfit', sans-serif" }}>
              {stat.value}
            </p>
            <p className="text-xs mt-1" style={{ color: "#8B8B8B", fontFamily: "'Nunito', sans-serif" }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Missed sessions */}
      <div className="space-y-4 animate-fade-up-delay-2">
        <h3 className="text-lg font-bold" style={{ fontFamily: "'Outfit', sans-serif", color: "#2C2C2C" }}>
          Sessions to Reschedule
        </h3>
        {MISSED_SESSIONS.map((session) => (
          <div
            key={session.id}
            className="glass-card rounded-2xl p-5"
            style={{
              background: "rgba(250, 250, 248, 0.7)",
              border: "1px solid rgba(107, 142, 127, 0.1)",
            }}
          >
            <div className="flex items-start gap-4 mb-4">
              <div
                className="w-1 h-20 rounded-full flex-shrink-0"
                style={{ background: session.color }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{session.emoji}</span>
                  <h4 className="font-bold text-sm" style={{ fontFamily: "'Outfit', sans-serif", color: "#2C2C2C" }}>
                    {session.subject}
                  </h4>
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-lg"
                    style={{
                      background: `${session.color}20`,
                      color: session.color,
                      fontFamily: "'Outfit', sans-serif",
                    }}
                  >
                    Missed
                  </span>
                </div>
                <p className="text-xs" style={{ color: "#6B6B6B", fontFamily: "'Nunito', sans-serif" }}>
                  {session.topic}
                </p>
                <p className="text-xs mt-2" style={{ color: "#8B8B8B", fontFamily: "'Nunito', sans-serif" }}>
                  {session.originalTime} · {session.duration} min
                </p>
                <p className="text-xs mt-1" style={{ color: "#6B6B6B", fontFamily: "'Nunito', sans-serif", fontStyle: "italic" }}>
                  Reason: {session.reason}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                className="flex-1 px-4 py-2 rounded-xl text-sm font-medium"
                style={{
                  background: `linear-gradient(135deg, ${session.color}30, ${session.color}15)`,
                  color: session.color,
                  fontFamily: "'Nunito', sans-serif",
                }}
              >
                Find a new time
              </button>
              <button
                className="flex-1 px-4 py-2 rounded-xl text-sm font-medium"
                style={{
                  background: "#F0F0F0",
                  color: "#6B6B6B",
                  fontFamily: "'Nunito', sans-serif",
                }}
              >
                Skip it
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Rescheduled sessions */}
      {RESCHEDULED_SESSIONS.length > 0 && (
        <div className="space-y-4 animate-fade-up-delay-2">
          <h3 className="text-lg font-bold" style={{ fontFamily: "'Outfit', sans-serif", color: "#2C2C2C" }}>
            Recently Rescheduled ✓
          </h3>
          {RESCHEDULED_SESSIONS.map((session) => (
            <div
              key={session.id}
              className="glass-card rounded-2xl p-5 flex items-start gap-4"
              style={{
                background: "rgba(107, 142, 127, 0.08)",
                border: "1px solid rgba(107, 142, 127, 0.2)",
              }}
            >
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#6B8E7F" }} />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm" style={{ fontFamily: "'Outfit', sans-serif", color: "#2C2C2C" }}>
                  {session.emoji} {session.subject} — {session.topic}
                </p>
                <p className="text-xs mt-1" style={{ color: "#6B6B6B", fontFamily: "'Nunito', sans-serif" }}>
                  Handled! Your schedule has been updated.
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tips */}
      <div
        className="glass-card rounded-2xl p-5 animate-fade-up-delay-2"
        style={{
          background: "rgba(127, 168, 184, 0.08)",
          border: "1px solid rgba(127, 168, 184, 0.2)",
        }}
      >
        <h3 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ fontFamily: "'Outfit', sans-serif", color: "#2C2C2C" }}>
          <AlertCircle className="w-4 h-4" style={{ color: "#7FA8B8" }} />
          Tips to stay on track 💡
        </h3>
        <div className="space-y-2">
          {TIPS.map((tip, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-xs font-bold mt-0.5" style={{ color: "#7FA8B8" }}>✦</span>
              <p className="text-xs" style={{ color: "#6B6B6B", fontFamily: "'Nunito', sans-serif" }}>
                {tip}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
