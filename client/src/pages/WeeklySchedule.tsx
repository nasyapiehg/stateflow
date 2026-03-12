/**
 * WeeklySchedule — StateFlow Aurora Flow Design
 * Visual weekly calendar integrating classes, study blocks, and personal commitments.
 */
import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin } from "lucide-react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const FULL_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const HOURS = Array.from({ length: 14 }, (_, i) => i + 7); // 7am to 8pm

type EventType = "class" | "study" | "personal" | "break";

interface CalEvent {
  id: number;
  day: number; // 0=Mon
  startHour: number;
  duration: number; // in hours
  title: string;
  subtitle?: string;
  type: EventType;
  emoji: string;
  color: string;
  bg: string;
}

const EVENTS: CalEvent[] = [
  // Classes
  { id: 1, day: 0, startHour: 9, duration: 1, title: "Organic Chemistry", subtitle: "Chem 301 · Room 204", type: "class", emoji: "⚗️", color: "#E05252", bg: "rgba(255,107,107,0.12)" },
  { id: 2, day: 0, startHour: 14, duration: 1.5, title: "Biology Lab", subtitle: "Bio 210L · Lab B", type: "class", emoji: "🧬", color: "#7C3AED", bg: "rgba(167,139,250,0.12)" },
  { id: 3, day: 1, startHour: 10, duration: 1, title: "Calculus II", subtitle: "Math 152 · Room 110", type: "class", emoji: "∫", color: "#2A9D8F", bg: "rgba(78,205,196,0.12)" },
  { id: 4, day: 1, startHour: 13, duration: 1, title: "Physics", subtitle: "Phys 201 · Room 301", type: "class", emoji: "⚡", color: "#D97706", bg: "rgba(255,179,71,0.12)" },
  { id: 5, day: 2, startHour: 9, duration: 1, title: "Organic Chemistry", subtitle: "Chem 301 · Room 204", type: "class", emoji: "⚗️", color: "#E05252", bg: "rgba(255,107,107,0.12)" },
  { id: 6, day: 2, startHour: 11, duration: 1, title: "Biology", subtitle: "Bio 210 · Room 115", type: "class", emoji: "🧬", color: "#7C3AED", bg: "rgba(167,139,250,0.12)" },
  { id: 7, day: 3, startHour: 10, duration: 1, title: "Calculus II", subtitle: "Math 152 · Room 110", type: "class", emoji: "∫", color: "#2A9D8F", bg: "rgba(78,205,196,0.12)" },
  { id: 8, day: 4, startHour: 9, duration: 1, title: "Organic Chemistry", subtitle: "Chem 301 · Room 204", type: "class", emoji: "⚗️", color: "#E05252", bg: "rgba(255,107,107,0.12)" },
  { id: 9, day: 4, startHour: 13, duration: 1, title: "Physics", subtitle: "Phys 201 · Room 301", type: "class", emoji: "⚡", color: "#D97706", bg: "rgba(255,179,71,0.12)" },
  // Study blocks
  { id: 10, day: 0, startHour: 10.5, duration: 1.5, title: "Study: O-Chem", subtitle: "Reaction mechanisms", type: "study", emoji: "📚", color: "#E05252", bg: "rgba(255,107,107,0.07)" },
  { id: 11, day: 1, startHour: 8, duration: 1.5, title: "Study: Calculus", subtitle: "Integration by parts", type: "study", emoji: "📐", color: "#2A9D8F", bg: "rgba(78,205,196,0.07)" },
  { id: 12, day: 2, startHour: 14, duration: 2, title: "Study: Biology", subtitle: "Cell signaling", type: "study", emoji: "🔬", color: "#7C3AED", bg: "rgba(167,139,250,0.07)" },
  { id: 13, day: 3, startHour: 8, duration: 1, title: "Study: Physics", subtitle: "E&M review", type: "study", emoji: "⚡", color: "#D97706", bg: "rgba(255,179,71,0.07)" },
  { id: 14, day: 3, startHour: 14, duration: 1.5, title: "Study: O-Chem", subtitle: "Lab report prep", type: "study", emoji: "📚", color: "#E05252", bg: "rgba(255,107,107,0.07)" },
  { id: 15, day: 5, startHour: 10, duration: 2, title: "Study: Biology", subtitle: "Midterm prep", type: "study", emoji: "🔬", color: "#7C3AED", bg: "rgba(167,139,250,0.07)" },
  { id: 16, day: 6, startHour: 14, duration: 1.5, title: "Study: Calculus", subtitle: "Practice problems", type: "study", emoji: "📐", color: "#2A9D8F", bg: "rgba(78,205,196,0.07)" },
  // Personal
  { id: 17, day: 0, startHour: 7, duration: 0.5, title: "Morning Yoga", subtitle: "Self-care 🌸", type: "personal", emoji: "🧘", color: "#059669", bg: "rgba(111,207,151,0.1)" },
  { id: 18, day: 2, startHour: 7, duration: 0.5, title: "Morning Run", subtitle: "3 miles", type: "personal", emoji: "🏃", color: "#059669", bg: "rgba(111,207,151,0.1)" },
  { id: 19, day: 4, startHour: 18, duration: 1.5, title: "Study Group", subtitle: "Library Room 3", type: "personal", emoji: "👥", color: "#DB2777", bg: "rgba(253,164,175,0.1)" },
  { id: 20, day: 5, startHour: 18, duration: 2, title: "Free Time", subtitle: "Rest & recharge", type: "break", emoji: "🌿", color: "#059669", bg: "rgba(111,207,151,0.08)" },
  { id: 21, day: 6, startHour: 10, duration: 2, title: "Free Time", subtitle: "Rest & recharge", type: "break", emoji: "🌿", color: "#059669", bg: "rgba(111,207,151,0.08)" },
];

const TYPE_LABELS: Record<EventType, string> = {
  class: "Class",
  study: "Study",
  personal: "Personal",
  break: "Break",
};

const TYPE_COLORS: Record<EventType, string> = {
  class: "#E05252",
  study: "#7C3AED",
  personal: "#059669",
  break: "#2A9D8F",
};

export default function WeeklySchedule() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const today = new Date().getDay(); // 0=Sun, adjust to Mon=0
  const todayIdx = today === 0 ? 6 : today - 1;

  const HOUR_HEIGHT = 64; // px per hour

  const filteredEvents = selectedDay !== null
    ? EVENTS.filter((e) => e.day === selectedDay)
    : EVENTS;

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-6xl">
      {/* Header */}
      <div className="animate-fade-up flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-bold" style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.22 0.04 280)" }}>
            Weekly Schedule <span style={{ display: "inline-block" }}>📅</span>
          </h2>
          <p className="mt-1 text-sm" style={{ color: "oklch(0.5 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>
            March 10 – 16, 2026 · Your classes, study blocks, and personal time in one view
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl glass-card hover:shadow-md transition-all">
            <ChevronLeft className="w-4 h-4" style={{ color: "oklch(0.45 0.04 280)" }} />
          </button>
          <span className="text-sm font-semibold px-3 py-1.5 rounded-xl glass-card" style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.3 0.04 280)" }}>
            This Week
          </span>
          <button className="p-2 rounded-xl glass-card hover:shadow-md transition-all">
            <ChevronRight className="w-4 h-4" style={{ color: "oklch(0.45 0.04 280)" }} />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 animate-fade-up-delay-1">
        {(Object.entries(TYPE_LABELS) as [EventType, string][]).map(([type, label]) => (
          <div key={type} className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "oklch(0.45 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>
            <div className="w-3 h-3 rounded-full" style={{ background: TYPE_COLORS[type] }} />
            {label}
          </div>
        ))}
        <div className="ml-auto flex gap-2">
          {DAYS.map((d, i) => (
            <button
              key={d}
              onClick={() => setSelectedDay(selectedDay === i ? null : i)}
              className="text-xs px-3 py-1.5 rounded-xl font-semibold transition-all"
              style={{
                background: selectedDay === i ? "linear-gradient(135deg, #FF6B6B, #A78BFA)" : i === todayIdx ? "rgba(78,205,196,0.15)" : "rgba(255,255,255,0.6)",
                color: selectedDay === i ? "white" : i === todayIdx ? "#2A9D8F" : "oklch(0.45 0.04 280)",
                border: i === todayIdx && selectedDay !== i ? "1px solid rgba(78,205,196,0.4)" : "1px solid transparent",
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar grid */}
      <div className="glass-card rounded-2xl overflow-hidden animate-fade-up-delay-2" style={{ border: "1px solid rgba(167,139,250,0.15)" }}>
        <div className="flex">
          {/* Time column */}
          <div className="flex-shrink-0 w-16 border-r" style={{ borderColor: "rgba(167,139,250,0.1)" }}>
            <div className="h-10 border-b" style={{ borderColor: "rgba(167,139,250,0.1)" }} />
            {HOURS.map((h) => (
              <div
                key={h}
                className="flex items-start justify-end pr-2 pt-1 text-xs"
                style={{ height: HOUR_HEIGHT, color: "oklch(0.6 0.04 280)", fontFamily: "'Nunito', sans-serif" }}
              >
                {h === 12 ? "12pm" : h > 12 ? `${h - 12}pm` : `${h}am`}
              </div>
            ))}
          </div>

          {/* Day columns */}
          <div className="flex-1 overflow-x-auto">
            <div className="flex min-w-[600px]">
              {DAYS.map((day, dayIdx) => {
                const isToday = dayIdx === todayIdx;
                const isSelected = selectedDay === dayIdx;
                const isFiltered = selectedDay !== null && !isSelected;
                const dayEvents = EVENTS.filter((e) => e.day === dayIdx);

                return (
                  <div
                    key={day}
                    className="flex-1 border-r last:border-r-0 relative"
                    style={{
                      borderColor: "rgba(167,139,250,0.1)",
                      opacity: isFiltered ? 0.35 : 1,
                      transition: "opacity 0.2s ease",
                    }}
                  >
                    {/* Day header */}
                    <div
                      className="h-10 flex items-center justify-center border-b text-xs font-bold"
                      style={{
                        borderColor: "rgba(167,139,250,0.1)",
                        background: isToday ? "linear-gradient(135deg, rgba(78,205,196,0.1), rgba(167,139,250,0.08))" : "transparent",
                        color: isToday ? "#2A9D8F" : "oklch(0.4 0.04 280)",
                        fontFamily: "'Outfit', sans-serif",
                      }}
                    >
                      {day}
                      {isToday && <span className="ml-1 w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#4ECDC4" }} />}
                    </div>

                    {/* Hour grid */}
                    <div className="relative" style={{ height: HOURS.length * HOUR_HEIGHT }}>
                      {HOURS.map((h) => (
                        <div
                          key={h}
                          className="absolute w-full border-b"
                          style={{
                            top: (h - 7) * HOUR_HEIGHT,
                            height: HOUR_HEIGHT,
                            borderColor: "rgba(167,139,250,0.06)",
                          }}
                        />
                      ))}

                      {/* Events */}
                      {dayEvents.map((event) => {
                        const top = (event.startHour - 7) * HOUR_HEIGHT;
                        const height = event.duration * HOUR_HEIGHT - 4;
                        return (
                          <div
                            key={event.id}
                            className="absolute left-1 right-1 rounded-xl px-2 py-1 overflow-hidden cursor-pointer hover:shadow-md transition-all"
                            style={{
                              top: top + 2,
                              height,
                              background: event.bg,
                              borderLeft: `3px solid ${event.color}`,
                            }}
                          >
                            <div className="flex items-center gap-1">
                              <span className="text-xs">{event.emoji}</span>
                              <span className="text-xs font-semibold truncate" style={{ color: event.color, fontFamily: "'Outfit', sans-serif" }}>
                                {event.title}
                              </span>
                            </div>
                            {height > 40 && event.subtitle && (
                              <p className="text-xs mt-0.5 truncate" style={{ color: "oklch(0.55 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>
                                {event.subtitle}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Day summary when selected */}
      {selectedDay !== null && (
        <div className="glass-card rounded-2xl p-5 animate-fade-up">
          <h3 className="font-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.22 0.04 280)" }}>
            {FULL_DAYS[selectedDay]} — {EVENTS.filter((e) => e.day === selectedDay).length} events
          </h3>
          <div className="space-y-2">
            {EVENTS.filter((e) => e.day === selectedDay).sort((a, b) => a.startHour - b.startHour).map((event) => {
              const startH = Math.floor(event.startHour);
              const startM = (event.startHour % 1) * 60;
              const endHour = event.startHour + event.duration;
              const endH = Math.floor(endHour);
              const endM = (endHour % 1) * 60;
              const fmt = (h: number, m: number) => `${h > 12 ? h - 12 : h}:${m.toString().padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
              return (
                <div key={event.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: event.bg, border: `1px solid ${event.color}22` }}>
                  <span className="text-xl">{event.emoji}</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: event.color, fontFamily: "'Outfit', sans-serif" }}>{event.title}</p>
                    {event.subtitle && <p className="text-xs" style={{ color: "oklch(0.55 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>{event.subtitle}</p>}
                  </div>
                  <div className="text-xs text-right" style={{ color: "oklch(0.5 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>
                    <p>{fmt(startH, startM)}</p>
                    <p>{fmt(endH, endM)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
