/**
 * MissedSessions — StateFlow Aurora Flow Design
 * Compassionate rescheduling when sessions are missed.
 * No guilt, just gentle adjustments and encouragement.
 */
import { useState } from "react";
import { RefreshCw, CheckCircle2, Clock, ArrowRight, Sparkles, Heart } from "lucide-react";
import { toast } from "sonner";

interface MissedSession {
  id: number;
  subject: string;
  topic: string;
  originalDay: string;
  originalTime: string;
  duration: number;
  color: string;
  emoji: string;
  rescheduled: boolean;
  reason?: string;
}

interface RescheduleOption {
  day: string;
  time: string;
  label: string;
  available: boolean;
  conflictNote?: string;
}

const MISSED_SESSIONS: MissedSession[] = [
  {
    id: 1,
    subject: "Physics",
    topic: "Electromagnetism Review",
    originalDay: "Monday",
    originalTime: "4:00 PM",
    duration: 60,
    color: "#FFB347",
    emoji: "⚡",
    rescheduled: false,
    reason: "Felt overwhelmed after lab",
  },
  {
    id: 2,
    subject: "Biology",
    topic: "Cell Signaling Pathways",
    originalDay: "Tuesday",
    originalTime: "2:00 PM",
    duration: 90,
    color: "#A78BFA",
    emoji: "🧬",
    rescheduled: false,
    reason: "Doctor's appointment ran long",
  },
  {
    id: 3,
    subject: "Organic Chemistry",
    topic: "Stereochemistry Practice",
    originalDay: "Wednesday",
    originalTime: "3:30 PM",
    duration: 60,
    color: "#FF6B6B",
    emoji: "⚗️",
    rescheduled: true,
  },
];

const RESCHEDULE_OPTIONS: Record<number, RescheduleOption[]> = {
  1: [
    { day: "Thursday", time: "3:00 PM", label: "Thu 3:00 PM", available: true },
    { day: "Friday", time: "10:00 AM", label: "Fri 10:00 AM", available: true },
    { day: "Saturday", time: "11:00 AM", label: "Sat 11:00 AM", available: true },
    { day: "Sunday", time: "2:00 PM", label: "Sun 2:00 PM", available: true },
  ],
  2: [
    { day: "Thursday", time: "4:00 PM", label: "Thu 4:00 PM", available: true },
    { day: "Friday", time: "2:00 PM", label: "Fri 2:00 PM", available: false, conflictNote: "Conflicts with study group" },
    { day: "Saturday", time: "10:00 AM", label: "Sat 10:00 AM", available: true },
    { day: "Sunday", time: "11:00 AM", label: "Sun 11:00 AM", available: true },
  ],
};

const AFFIRMATIONS = [
  "Missing a session happens to everyone — what matters is getting back on track! 🌱",
  "You're not behind, you're just adjusting. That takes strength! 💪",
  "One missed session doesn't define your week. Let's find a better time! 🌟",
  "Life happens! StateFlow is here to help you adapt, not judge. 🤗",
  "Rescheduling is a skill, not a failure. You've got this! ✨",
];

const RECENT_RESCHEDULES = [
  { subject: "Calculus II", from: "Mon 11 AM", to: "Wed 4 PM", emoji: "∫", color: "#4ECDC4" },
  { subject: "Biology", from: "Thu 2 PM", to: "Fri 3 PM", emoji: "🧬", color: "#A78BFA" },
];

export default function MissedSessions() {
  const [sessions, setSessions] = useState<MissedSession[]>(MISSED_SESSIONS);
  const [selectedSession, setSelectedSession] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showReasonInput, setShowReasonInput] = useState<number | null>(null);
  const [reasonText, setReasonText] = useState("");

  const affirmation = AFFIRMATIONS[Math.floor(Date.now() / 3600000) % AFFIRMATIONS.length];

  const handleReschedule = (sessionId: number) => {
    if (!selectedSlot) {
      toast.error("Please select a time slot first!");
      return;
    }
    setSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, rescheduled: true } : s))
    );
    setSelectedSession(null);
    setSelectedSlot(null);
    toast.success("Session rescheduled! 🎉 Your schedule has been updated.", {
      description: "Check your Weekly Schedule to see the new time.",
    });
  };

  const handleMarkSkip = (sessionId: number) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, rescheduled: true } : s))
    );
    toast("Session marked as skipped.", {
      description: "No worries — we'll adjust your study plan accordingly.",
    });
  };

  const pendingCount = sessions.filter((s) => !s.rescheduled).length;
  const rescheduledCount = sessions.filter((s) => s.rescheduled).length;

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-4xl">
      {/* Header */}
      <div className="animate-fade-up">
        <h2 className="text-3xl font-bold" style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.22 0.04 280)" }}>
          Missed Sessions 🔄
        </h2>
        <p className="mt-1 text-sm" style={{ color: "oklch(0.5 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>
          Life happens! Let's find better times for these sessions — no stress, just flexibility.
        </p>
      </div>

      {/* Affirmation banner */}
      <div
        className="rounded-2xl p-4 flex items-start gap-3 animate-breathe animate-fade-up-delay-1"
        style={{
          background: "linear-gradient(135deg, rgba(111,207,151,0.12), rgba(78,205,196,0.1))",
          border: "1px solid rgba(111,207,151,0.3)",
        }}
      >
        <Heart className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#6FCF97" }} />
        <p className="text-sm leading-relaxed" style={{ color: "oklch(0.3 0.06 160)", fontFamily: "'Nunito', sans-serif", fontStyle: "italic" }}>
          {affirmation}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 animate-fade-up-delay-2">
        {[
          { label: "Needs Rescheduling", value: pendingCount, color: "#FFB347", bg: "rgba(255,179,71,0.1)", border: "rgba(255,179,71,0.25)" },
          { label: "Rescheduled", value: rescheduledCount, color: "#4ECDC4", bg: "rgba(78,205,196,0.1)", border: "rgba(78,205,196,0.25)" },
          { label: "This Week Total", value: sessions.length, color: "#A78BFA", bg: "rgba(167,139,250,0.1)", border: "rgba(167,139,250,0.25)" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl p-4 text-center" style={{ background: stat.bg, border: `1px solid ${stat.border}` }}>
            <p className="text-2xl font-bold" style={{ color: stat.color, fontFamily: "'Outfit', sans-serif" }}>{stat.value}</p>
            <p className="text-xs mt-1" style={{ color: "oklch(0.5 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Missed sessions */}
      <div className="space-y-4 animate-fade-up-delay-3">
        <h3 className="font-bold" style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.22 0.04 280)" }}>
          Sessions to Reschedule
        </h3>

        {sessions.filter((s) => !s.rescheduled).length === 0 && (
          <div className="text-center py-12 rounded-2xl" style={{ background: "rgba(111,207,151,0.08)", border: "1px solid rgba(111,207,151,0.2)" }}>
            <span className="text-4xl">🎉</span>
            <p className="mt-3 font-bold" style={{ color: "oklch(0.3 0.06 160)", fontFamily: "'Outfit', sans-serif" }}>
              All caught up!
            </p>
            <p className="text-sm mt-1" style={{ color: "oklch(0.5 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>
              No missed sessions to reschedule. You're doing amazing!
            </p>
          </div>
        )}

        {sessions.filter((s) => !s.rescheduled).map((session) => {
          const isExpanded = selectedSession === session.id;
          const options = RESCHEDULE_OPTIONS[session.id] || [];

          return (
            <div
              key={session.id}
              className="glass-card rounded-2xl overflow-hidden"
              style={{ border: `1px solid ${session.color}30` }}
            >
              {/* Session info */}
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{session.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm" style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.22 0.04 280)" }}>
                        {session.subject}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(255,179,71,0.12)", color: "#D97706" }}>
                        Missed
                      </span>
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: "oklch(0.45 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>
                      {session.topic}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-xs flex items-center gap-1" style={{ color: "oklch(0.55 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>
                        <Clock className="w-3 h-3" />
                        {session.originalDay} at {session.originalTime} · {session.duration} min
                      </span>
                    </div>
                    {session.reason && (
                      <p className="text-xs mt-1 italic" style={{ color: "oklch(0.6 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>
                        Reason: {session.reason}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => {
                      setSelectedSession(isExpanded ? null : session.id);
                      setSelectedSlot(null);
                    }}
                    className="flex-1 py-2 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-1.5"
                    style={{ background: "linear-gradient(135deg, #4ECDC4, #A78BFA)" }}
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    {isExpanded ? "Hide options" : "Find a new time"}
                  </button>
                  <button
                    onClick={() => handleMarkSkip(session.id)}
                    className="px-3 py-2 rounded-xl text-xs font-semibold"
                    style={{ background: "rgba(0,0,0,0.05)", color: "oklch(0.5 0.04 280)" }}
                  >
                    Skip it
                  </button>
                </div>
              </div>

              {/* Reschedule options */}
              {isExpanded && (
                <div className="border-t px-4 pb-4 pt-3" style={{ borderColor: "rgba(0,0,0,0.06)", background: "rgba(255,255,255,0.5)" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4" style={{ color: "#A78BFA" }} />
                    <p className="text-xs font-semibold" style={{ color: "oklch(0.35 0.04 280)", fontFamily: "'Outfit', sans-serif" }}>
                      Available time slots this week:
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {options.map((opt) => (
                      <button
                        key={opt.label}
                        disabled={!opt.available}
                        onClick={() => setSelectedSlot(opt.label)}
                        className="p-2.5 rounded-xl text-xs font-semibold text-left transition-all"
                        style={{
                          background: !opt.available
                            ? "rgba(0,0,0,0.04)"
                            : selectedSlot === opt.label
                            ? "linear-gradient(135deg, rgba(78,205,196,0.2), rgba(167,139,250,0.2))"
                            : "rgba(255,255,255,0.8)",
                          border: selectedSlot === opt.label
                            ? "2px solid #4ECDC4"
                            : "1px solid rgba(167,139,250,0.2)",
                          color: !opt.available ? "oklch(0.7 0.02 280)" : "oklch(0.3 0.04 280)",
                          fontFamily: "'Nunito', sans-serif",
                          opacity: !opt.available ? 0.6 : 1,
                        }}
                      >
                        <div className="flex items-center gap-1.5">
                          {selectedSlot === opt.label && <CheckCircle2 className="w-3 h-3" style={{ color: "#4ECDC4" }} />}
                          <span>{opt.label}</span>
                        </div>
                        {opt.conflictNote && (
                          <p className="text-xs mt-0.5" style={{ color: "#E05252" }}>{opt.conflictNote}</p>
                        )}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => handleReschedule(session.id)}
                    disabled={!selectedSlot}
                    className="w-full py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all"
                    style={{
                      background: selectedSlot ? "linear-gradient(135deg, #FF6B6B, #FFB347)" : "rgba(0,0,0,0.08)",
                      color: selectedSlot ? "white" : "oklch(0.6 0.02 280)",
                    }}
                  >
                    Confirm Reschedule <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Recently rescheduled */}
      {sessions.filter((s) => s.rescheduled).length > 0 && (
        <div className="space-y-3 animate-fade-up-delay-4">
          <h3 className="font-bold" style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.22 0.04 280)" }}>
            Recently Rescheduled ✓
          </h3>
          {sessions.filter((s) => s.rescheduled).map((session) => (
            <div
              key={session.id}
              className="flex items-center gap-3 p-3 rounded-2xl"
              style={{ background: "rgba(111,207,151,0.08)", border: "1px solid rgba(111,207,151,0.2)" }}
            >
              <span className="text-xl">{session.emoji}</span>
              <div className="flex-1">
                <p className="text-sm font-semibold" style={{ color: "oklch(0.3 0.04 280)", fontFamily: "'Outfit', sans-serif" }}>
                  {session.subject} — {session.topic}
                </p>
                <p className="text-xs" style={{ color: "oklch(0.55 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>
                  Handled! Your schedule has been updated.
                </p>
              </div>
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: "#6FCF97" }} />
            </div>
          ))}
        </div>
      )}

      {/* Tips for avoiding missed sessions */}
      <div
        className="rounded-2xl p-5 animate-fade-up-delay-5"
        style={{ background: "linear-gradient(135deg, rgba(167,139,250,0.08), rgba(78,205,196,0.06))", border: "1px solid rgba(167,139,250,0.2)" }}
      >
        <h3 className="font-bold text-sm mb-3" style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.22 0.04 280)" }}>
          Tips to stay on track 💡
        </h3>
        <div className="space-y-2">
          {[
            "Set gentle reminders 15 minutes before each study session",
            "Keep sessions short (45-90 min) — easier to commit to!",
            "Have a backup slot planned for each session just in case",
            "Be honest with yourself about your energy levels when scheduling",
          ].map((tip, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-sm mt-0.5">✦</span>
              <p className="text-sm" style={{ color: "oklch(0.4 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
