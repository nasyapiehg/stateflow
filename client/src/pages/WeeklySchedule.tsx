/**
 * WeeklySchedule — StateFlow Zen-Minimalist
 * High-fashion glassmorphism with muted palette and generous spacing.
 */
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ScheduleEvent {
  id: string;
  title: string;
  time: string;
  duration: number;
  type: "class" | "study" | "personal" | "break";
  emoji: string;
  color: string;
}

const SCHEDULE_DATA: Record<string, ScheduleEvent[]> = {
  Mon: [
    { id: "1", title: "Morning Yoga", time: "7:00 AM", duration: 45, type: "personal", emoji: "🧘", color: "#9B8FA6" },
    { id: "2", title: "Organic Chemistry", time: "9:00 AM", duration: 75, type: "class", emoji: "⚗️", color: "#D4A574" },
    { id: "3", title: "Study: O-Chem", time: "11:00 AM", duration: 90, type: "study", emoji: "📚", color: "#D4A574" },
    { id: "4", title: "Biology Lab", time: "2:00 PM", duration: 120, type: "class", emoji: "🧬", color: "#9B8FA6" },
  ],
  Tue: [
    { id: "5", title: "Morning Run", time: "7:00 AM", duration: 45, type: "personal", emoji: "🏃", color: "#7FA8B8" },
    { id: "6", title: "Calculus II", time: "9:00 AM", duration: 75, type: "class", emoji: "∫", color: "#7FA8B8" },
    { id: "7", title: "Study: Calculus", time: "11:00 AM", duration: 90, type: "study", emoji: "📐", color: "#7FA8B8" },
    { id: "8", title: "Physics", time: "2:00 PM", duration: 75, type: "class", emoji: "⚡", color: "#A89B8B" },
  ],
  Wed: [
    { id: "9", title: "Organic Chemistry", time: "9:00 AM", duration: 75, type: "class", emoji: "⚗️", color: "#D4A574" },
    { id: "10", title: "Biology", time: "11:00 AM", duration: 75, type: "class", emoji: "🧬", color: "#9B8FA6" },
    { id: "11", title: "Study: Biology", time: "2:00 PM", duration: 90, type: "study", emoji: "🔬", color: "#9B8FA6" },
  ],
  Thu: [
    { id: "12", title: "Calculus II", time: "9:00 AM", duration: 75, type: "class", emoji: "∫", color: "#7FA8B8" },
    { id: "13", title: "Study: Physics", time: "11:00 AM", duration: 90, type: "study", emoji: "⚡", color: "#A89B8B" },
    { id: "14", title: "Study: O-Chem", time: "3:00 PM", duration: 90, type: "study", emoji: "📚", color: "#D4A574" },
  ],
  Fri: [
    { id: "15", title: "Organic Chemistry", time: "9:00 AM", duration: 75, type: "class", emoji: "⚗️", color: "#D4A574" },
    { id: "16", title: "Physics", time: "2:00 PM", duration: 75, type: "class", emoji: "⚡", color: "#A89B8B" },
    { id: "17", title: "Study Group", time: "5:00 PM", duration: 120, type: "study", emoji: "👥", color: "#6B8E7F" },
  ],
  Sat: [
    { id: "18", title: "Study: Biology", time: "10:00 AM", duration: 120, type: "study", emoji: "🔬", color: "#9B8FA6" },
    { id: "19", title: "Free Time", time: "1:00 PM", duration: 240, type: "personal", emoji: "🌿", color: "#6B8E7F" },
  ],
  Sun: [
    { id: "20", title: "Study: Calculus", time: "10:00 AM", duration: 90, type: "study", emoji: "📐", color: "#7FA8B8" },
    { id: "21", title: "Free Time", time: "2:00 PM", duration: 300, type: "personal", emoji: "🌿", color: "#6B8E7F" },
  ],
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TYPE_COLORS: Record<string, string> = {
  class: "#D4A574",
  study: "#9B8FA6",
  personal: "#6B8E7F",
  break: "#E5E5E5",
};

export default function WeeklySchedule() {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-6xl">
      {/* Header */}
      <div className="animate-fade-up flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-bold" style={{ fontFamily: "'Outfit', sans-serif", color: "#2C2C2C" }}>
            Weekly Schedule <span style={{ display: "inline-block" }}>📅</span>
          </h2>
          <p className="mt-2 text-sm" style={{ color: "#6B6B6B", fontFamily: "'Nunito', sans-serif" }}>
            March 10 – 16, 2026 · Your classes, study blocks, and personal time in one view
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs" style={{ color: "#6B6B6B", fontFamily: "'Nunito', sans-serif" }}>
        {[
          { label: "Class", color: "#D4A574" },
          { label: "Study", color: "#9B8FA6" },
          { label: "Personal", color: "#6B8E7F" },
          { label: "Break", color: "#E5E5E5" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: item.color }}
            />
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Day selector */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {DAYS.map((day, idx) => (
          <button
            key={day}
            onClick={() => setSelectedDay(selectedDay === day ? null : day)}
            className="px-4 py-2 rounded-xl font-medium text-sm flex-shrink-0 transition-all"
            style={{
              background: selectedDay === day ? "#E8EDE9" : "#F9F9F7",
              color: selectedDay === day ? "#4A5A52" : "#6B6B6B",
              border: "1px solid #E5E5E5",
              fontFamily: "'Nunito', sans-serif",
            }}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Schedule grid */}
      <div
        className="glass-card rounded-2xl p-6 overflow-x-auto"
        style={{
          background: "rgba(250, 250, 248, 0.7)",
          border: "1px solid rgba(107, 142, 127, 0.1)",
        }}
      >
        <div className="grid grid-cols-7 gap-4 min-w-max lg:min-w-full">
          {DAYS.map((day) => (
            <div key={day} className="min-w-max lg:min-w-0">
              <p
                className="text-xs font-bold mb-3 text-center"
                style={{ color: "#2C2C2C", fontFamily: "'Outfit', sans-serif" }}
              >
                {day}
              </p>
              <div className="space-y-2">
                {SCHEDULE_DATA[day]?.map((event) => (
                  <div
                    key={event.id}
                    className="p-2 rounded-lg text-xs cursor-pointer transition-all hover:shadow-soft"
                    style={{
                      background: event.color,
                      color: "#FAFAF8",
                      fontFamily: "'Nunito', sans-serif",
                      opacity: 0.85,
                    }}
                  >
                    <p className="font-semibold">{event.emoji}</p>
                    <p className="mt-1 line-clamp-2">{event.title}</p>
                    <p className="mt-1 opacity-90">{event.time}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected day detail */}
      {selectedDay && (
        <div
          className="glass-card rounded-2xl p-6 animate-fade-up"
          style={{
            background: "rgba(250, 250, 248, 0.7)",
            border: "1px solid rgba(107, 142, 127, 0.1)",
          }}
        >
          <h3 className="text-lg font-bold mb-4" style={{ fontFamily: "'Outfit', sans-serif", color: "#2C2C2C" }}>
            {selectedDay}'s Schedule
          </h3>
          <div className="space-y-3">
            {SCHEDULE_DATA[selectedDay]?.map((event) => (
              <div
                key={event.id}
                className="flex items-start gap-4 p-4 rounded-xl"
                style={{ background: "#F9F9F7" }}
              >
                <div
                  className="w-1 h-16 rounded-full flex-shrink-0"
                  style={{ background: event.color }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{event.emoji}</span>
                    <p className="font-semibold text-sm" style={{ color: "#2C2C2C", fontFamily: "'Outfit', sans-serif" }}>
                      {event.title}
                    </p>
                  </div>
                  <p className="text-xs mt-2" style={{ color: "#6B6B6B", fontFamily: "'Nunito', sans-serif" }}>
                    {event.time} · {event.duration} min
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
