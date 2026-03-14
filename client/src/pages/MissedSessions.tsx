/**
 * MissedSessions — StateFlow Soft Minimalism + Japandi
 * Frosted glass cards, Lora headings, Poppins body, sage/terracotta/slate palette.
 * Compassionate rescheduling flow with no guilt, just flexibility.
 */
import { useState } from "react";
import { ChevronRight, Heart } from "lucide-react";

interface MissedSession {
  id: string;
  emoji: string;
  subject: string;
  topic: string;
  originalTime: string;
  duration: number;
  color: string;
  reason?: string;
}

interface AvailableSlot {
  id: string;
  day: string;
  time: string;
  duration: number;
  capacity: "light" | "moderate" | "heavy";
}

const MISSED_SESSIONS: MissedSession[] = [
  {
    id: "1",
    emoji: "⚗️",
    subject: "Organic Chemistry",
    topic: "Reaction Mechanisms Review",
    originalTime: "Monday 9:00 AM",
    duration: 90,
    color: "#c9956f",
    reason: "Overslept",
  },
  {
    id: "2",
    emoji: "∫",
    subject: "Calculus II",
    topic: "Integration by Parts Practice",
    originalTime: "Tuesday 11:00 AM",
    duration: 60,
    color: "#5a8f7b",
    reason: "Class ran late",
  },
];

const AVAILABLE_SLOTS: AvailableSlot[] = [
  { id: "1", day: "Wednesday", time: "10:00 AM", duration: 90, capacity: "light" },
  { id: "2", day: "Wednesday", time: "2:00 PM", duration: 90, capacity: "light" },
  { id: "3", day: "Thursday", time: "3:00 PM", duration: 90, capacity: "moderate" },
  { id: "4", day: "Friday", time: "4:00 PM", duration: 90, capacity: "light" },
  { id: "5", day: "Saturday", time: "10:00 AM", duration: 120, capacity: "moderate" },
  { id: "6", day: "Saturday", time: "2:00 PM", duration: 120, capacity: "moderate" },
];

const AFFIRMATIONS = [
  "Life happens — you're doing your best! 🌱",
  "Missing one session doesn't define your progress. Let's reschedule and move forward. 💪",
  "You've got this. Flexibility is a strength, not a weakness. ✨",
  "One missed session is just a blip on your journey. You're still on track! 🚀",
  "Rest happens. Rescheduling happens. You're still crushing it! 💫",
];

export default function MissedSessions() {
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const affirmation = AFFIRMATIONS[Math.floor(Date.now() / 86400000) % AFFIRMATIONS.length];

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-4xl">
      {/* Header */}
      <div className="animate-fade-up">
        <h2 className="text-3xl font-bold" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
          Missed Sessions 🔄
        </h2>
        <p className="mt-2 text-sm" style={{ fontFamily: "'Poppins', sans-serif", color: "#6b6b6b", fontWeight: 300 }}>
          No judgment, just a gentle reschedule. Life happens — let's adapt your plan.
        </p>
      </div>

      {/* Affirmation card */}
      <div
        className="rounded-lg p-5 flex items-start gap-3 animate-fade-up-delay-1"
        style={{
          background: "rgba(90, 143, 123, 0.08)",
          border: "1px solid rgba(90, 143, 123, 0.2)",
          backdropFilter: "blur(8px)",
        }}
      >
        <Heart className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#5a8f7b" }} />
        <p
          className="text-sm"
          style={{
            fontFamily: "'Poppins', sans-serif",
            color: "#5a8f7b",
            fontWeight: 300,
            fontStyle: "italic",
          }}
        >
          {affirmation}
        </p>
      </div>

      {/* Missed sessions list */}
      {MISSED_SESSIONS.length > 0 ? (
        <div className="space-y-4 animate-fade-up-delay-2">
          {MISSED_SESSIONS.map((session) => (
            <div
              key={session.id}
              className="rounded-lg overflow-hidden"
              style={{
                background: "rgba(255, 255, 255, 0.4)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.6)",
              }}
            >
              {/* Session card */}
              <div
                className="p-5 cursor-pointer hover:bg-opacity-80 transition-all"
                onClick={() => setSelectedSession(selectedSession === session.id ? null : session.id)}
                style={{
                  background: selectedSession === session.id ? `linear-gradient(135deg, ${session.color}15, ${session.color}08)` : "transparent",
                  borderBottom: selectedSession === session.id ? "1px solid rgba(255, 255, 255, 0.5)" : "none",
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{session.emoji}</span>
                      <h3 className="font-bold text-sm" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
                        {session.subject}
                      </h3>
                    </div>
                    <p className="text-xs mb-2" style={{ fontFamily: "'Poppins', sans-serif", color: "#6b6b6b", fontWeight: 300 }}>
                      {session.topic}
                    </p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <p className="text-xs" style={{ fontFamily: "'Poppins', sans-serif", color: "#8b8b8b", fontWeight: 300 }}>
                        📅 {session.originalTime}
                      </p>
                      <p className="text-xs" style={{ fontFamily: "'Poppins', sans-serif", color: "#8b8b8b", fontWeight: 300 }}>
                        ⏱️ {session.duration} min
                      </p>
                      {session.reason && (
                        <span
                          className="text-xs px-2 py-1 rounded-lg"
                          style={{
                            background: `${session.color}20`,
                            color: session.color,
                            fontFamily: "'Poppins', sans-serif",
                          }}
                        >
                          {session.reason}
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronRight
                    className="w-5 h-5 flex-shrink-0 mt-1 transition-transform"
                    style={{
                      color: "#8b8b8b",
                      transform: selectedSession === session.id ? "rotate(90deg)" : "rotate(0deg)",
                    }}
                  />
                </div>
              </div>

              {/* Reschedule options */}
              {selectedSession === session.id && (
                <div className="p-5 space-y-4 border-t" style={{ borderColor: "rgba(255, 255, 255, 0.3)" }}>
                  <p className="text-xs font-bold" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
                    Pick a new time:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {AVAILABLE_SLOTS.map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => setSelectedSlot(slot.id)}
                        className="p-3 rounded-lg text-left transition-all"
                        style={{
                          background: selectedSlot === slot.id ? `${session.color}20` : "rgba(255, 255, 255, 0.3)",
                          border: selectedSlot === slot.id ? `2px solid ${session.color}` : "1px solid rgba(255, 255, 255, 0.5)",
                          color: "#2a2a2a",
                        }}
                      >
                        <p className="text-xs font-semibold" style={{ fontFamily: "'Lora', serif" }}>
                          {slot.day}
                        </p>
                        <p className="text-xs mt-1" style={{ fontFamily: "'Poppins', sans-serif", color: "#6b6b6b", fontWeight: 300 }}>
                          {slot.time}
                        </p>
                        <p
                          className="text-xs mt-1"
                          style={{
                            fontFamily: "'Poppins', sans-serif",
                            color: session.color,
                            fontWeight: 300,
                          }}
                        >
                          {slot.duration} min
                        </p>
                      </button>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2 pt-2">
                    <button
                      className="flex-1 px-4 py-2 rounded-lg font-medium text-sm"
                      style={{
                        background: selectedSlot ? session.color : "#e8e5e0",
                        color: selectedSlot ? "#faf9f6" : "#8b8b8b",
                        fontFamily: "'Poppins', sans-serif",
                        cursor: selectedSlot ? "pointer" : "not-allowed",
                        opacity: selectedSlot ? 1 : 0.5,
                      }}
                      disabled={!selectedSlot}
                    >
                      Reschedule ✨
                    </button>
                    <button
                      className="flex-1 px-4 py-2 rounded-lg font-medium text-sm"
                      style={{
                        background: "rgba(255, 255, 255, 0.3)",
                        color: "#6b6b6b",
                        fontFamily: "'Poppins', sans-serif",
                        border: "1px solid rgba(255, 255, 255, 0.5)",
                      }}
                    >
                      Skip for now
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div
          className="rounded-lg p-8 text-center animate-fade-up-delay-2"
          style={{
            background: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.6)",
          }}
        >
          <p className="text-2xl mb-2">✨</p>
          <p className="font-bold text-sm" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
            No missed sessions!
          </p>
          <p className="text-xs mt-2" style={{ fontFamily: "'Poppins', sans-serif", color: "#6b6b6b", fontWeight: 300 }}>
            You're staying on top of your study plan. That's amazing! 🌟
          </p>
        </div>
      )}

      {/* Tips */}
      <div
        className="rounded-lg p-5 animate-fade-up-delay-2"
        style={{
          background: "rgba(255, 255, 255, 0.4)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.6)",
        }}
      >
        <h3 className="font-bold text-sm mb-3" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
          How to avoid missed sessions
        </h3>
        <ul className="space-y-2">
          {[
            "Set phone reminders 15 min before each session",
            "Schedule study blocks during your peak energy hours",
            "Build in a 1-hour buffer for unexpected delays",
            "If you know you'll miss it, reschedule early — don't wait",
          ].map((tip, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-xs font-bold mt-0.5" style={{ color: "#5a8f7b" }}>
                ✦
              </span>
              <p className="text-xs" style={{ fontFamily: "'Poppins', sans-serif", color: "#6b6b6b", fontWeight: 300 }}>
                {tip}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
