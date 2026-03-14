/**
 * WeeklySchedule — StateFlow Soft Minimalism + Japandi
 * Frosted glass cards, Lora headings, Poppins body, sage/terracotta/slate palette.
 */
import { useState, useMemo } from "react";

interface ScheduleEvent {
  id: string;
  title: string;
  time: string;
  duration: number;
  type: "class" | "study" | "personal" | "break" | "extracurricular" | "event";
  emoji: string;
  color: string;
}

interface RecurringEvent {
  id: string;
  name: string;
  type: "extracurricular" | "event";
  emoji: string;
  startTime: string;
  endTime: string;
  daysOfWeek: number[];
  color: string;
}

const SCHEDULE_DATA: Record<string, ScheduleEvent[]> = {
  Mon: [
    { id: "1", title: "Morning Yoga", time: "7:00 AM", duration: 45, type: "personal", emoji: "🧘", color: "#5a8f7b" },
    { id: "2", title: "Organic Chemistry", time: "9:00 AM", duration: 75, type: "class", emoji: "⚗️", color: "#c9956f" },
    { id: "3", title: "Study: O-Chem", time: "11:00 AM", duration: 90, type: "study", emoji: "📚", color: "#c9956f" },
    { id: "4", title: "Biology Lab", time: "2:00 PM", duration: 120, type: "class", emoji: "🧬", color: "#8b7a6b" },
  ],
  Tue: [
    { id: "5", title: "Morning Run", time: "7:00 AM", duration: 45, type: "personal", emoji: "🏃", color: "#5a8f7b" },
    { id: "6", title: "Calculus II", time: "9:00 AM", duration: 75, type: "class", emoji: "∫", color: "#5a8f7b" },
    { id: "7", title: "Study: Calculus", time: "11:00 AM", duration: 90, type: "study", emoji: "📐", color: "#5a8f7b" },
    { id: "8", title: "Physics", time: "2:00 PM", duration: 75, type: "class", emoji: "⚡", color: "#6b8f7f" },
  ],
  Wed: [
    { id: "9", title: "Organic Chemistry", time: "9:00 AM", duration: 75, type: "class", emoji: "⚗️", color: "#c9956f" },
    { id: "10", title: "Biology", time: "11:00 AM", duration: 75, type: "class", emoji: "🧬", color: "#8b7a6b" },
    { id: "11", title: "Study: Biology", time: "2:00 PM", duration: 90, type: "study", emoji: "🔬", color: "#8b7a6b" },
  ],
  Thu: [
    { id: "12", title: "Calculus II", time: "9:00 AM", duration: 75, type: "class", emoji: "∫", color: "#5a8f7b" },
    { id: "13", title: "Study: Physics", time: "11:00 AM", duration: 90, type: "study", emoji: "⚡", color: "#6b8f7f" },
    { id: "14", title: "Study: O-Chem", time: "3:00 PM", duration: 90, type: "study", emoji: "📚", color: "#c9956f" },
  ],
  Fri: [
    { id: "15", title: "Organic Chemistry", time: "9:00 AM", duration: 75, type: "class", emoji: "⚗️", color: "#c9956f" },
    { id: "16", title: "Physics", time: "2:00 PM", duration: 75, type: "class", emoji: "⚡", color: "#6b8f7f" },
    { id: "17", title: "Study Group", time: "5:00 PM", duration: 120, type: "study", emoji: "👥", color: "#5a8f7b" },
  ],
  Sat: [
    { id: "18", title: "Study: Biology", time: "10:00 AM", duration: 120, type: "study", emoji: "🔬", color: "#8b7a6b" },
    { id: "19", title: "Free Time", time: "1:00 PM", duration: 240, type: "personal", emoji: "🌿", color: "#5a8f7b" },
  ],
  Sun: [
    { id: "20", title: "Study: Calculus", time: "10:00 AM", duration: 90, type: "study", emoji: "📐", color: "#5a8f7b" },
    { id: "21", title: "Free Time", time: "2:00 PM", duration: 300, type: "personal", emoji: "🌿", color: "#5a8f7b" },
  ],
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Mock recurring events from Settings
const RECURRING_EVENTS: RecurringEvent[] = [
  {
    id: "e1",
    name: "Basketball Practice",
    type: "extracurricular",
    emoji: "🏀",
    startTime: "18:00",
    endTime: "19:30",
    daysOfWeek: [1, 3, 5], // Mon, Wed, Fri
    color: "#c9956f",
  },
  {
    id: "e2",
    name: "Lab Session",
    type: "event",
    emoji: "🔬",
    startTime: "14:00",
    endTime: "16:00",
    daysOfWeek: [2, 4], // Tue, Thu
    color: "#5a8f7b",
  },
];

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Helper function to add recurring events to schedule
function getScheduleWithRecurringEvents(): Record<string, ScheduleEvent[]> {
  const schedule: Record<string, ScheduleEvent[]> = {};
  
  // Deep copy SCHEDULE_DATA to avoid mutations
  Object.keys(SCHEDULE_DATA).forEach((day) => {
    schedule[day] = [...SCHEDULE_DATA[day]];
  });
  
  let eventCounter = 0;
  RECURRING_EVENTS.forEach((event) => {
    event.daysOfWeek.forEach((dayIndex: number) => {
      const dayName = DAYS_OF_WEEK[dayIndex];
      if (dayName && schedule[dayName]) {
        // Convert time to minutes for sorting
        const [hours, minutes] = event.startTime.split(":").map(Number);
        const startMinutes = hours * 60 + minutes;
        
        const scheduleEvent: ScheduleEvent = {
          id: `${event.id}-${dayName}-${eventCounter++}`,
          title: event.name,
          time: event.startTime,
          duration: (parseInt(event.endTime.split(":")[0]) * 60 + parseInt(event.endTime.split(":")[1])) - startMinutes,
          type: event.type,
          emoji: event.emoji,
          color: event.color,
        };
        
        schedule[dayName].push(scheduleEvent);
        schedule[dayName].sort((a, b) => {
          const aTime = parseInt(a.time.split(":")[0]) * 60 + parseInt(a.time.split(":")[1]);
          const bTime = parseInt(b.time.split(":")[0]) * 60 + parseInt(b.time.split(":")[1]);
          return aTime - bTime;
        });
      }
    });
  });
  
  return schedule;
}

export default function WeeklySchedule() {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const scheduleWithEvents = useMemo(() => getScheduleWithRecurringEvents(), []);

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-6xl">
      {/* Header */}
      <div className="animate-fade-up">
        <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
          Weekly Schedule 📅
        </h2>
        <p className="text-sm" style={{ fontFamily: "'Poppins', sans-serif", color: "#6b6b6b", fontWeight: 300 }}>
          March 10 – 16, 2026 · Your classes, study blocks, and personal time in one view
        </p>
      </div>

      {/* Day selector */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {DAYS.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(selectedDay === day ? null : day)}
            className="px-4 py-2 rounded-lg font-medium text-sm flex-shrink-0 transition-all"
            style={{
              background: selectedDay === day ? "rgba(90, 143, 123, 0.15)" : "rgba(255, 255, 255, 0.3)",
              color: selectedDay === day ? "#5a8f7b" : "#6b6b6b",
              border: "1px solid rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(8px)",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Schedule grid */}
      <div
        className="rounded-lg p-6 overflow-x-auto"
        style={{
          background: "rgba(255, 255, 255, 0.4)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.6)",
        }}
      >
        <div className="grid grid-cols-7 gap-4 min-w-max lg:min-w-full">
          {DAYS.map((day) => (
            <div key={day} className="min-w-max lg:min-w-0">
              <p
                className="text-xs font-bold mb-3 text-center"
                style={{ color: "#2a2a2a", fontFamily: "'Lora', serif" }}
              >
                {day}
              </p>
              <div className="space-y-2">
                {SCHEDULE_DATA[day]?.map((event) => (
                  <div
                    key={event.id}
                    className="p-2 rounded-lg text-xs cursor-pointer transition-all hover:shadow-md"
                    style={{
                      background: event.color,
                      color: "#faf9f6",
                      fontFamily: "'Poppins', sans-serif",
                      opacity: 0.85,
                    }}
                  >
                    <p className="font-semibold">{event.emoji}</p>
                    <p className="mt-1 line-clamp-2">{event.title}</p>
                    <p className="mt-1 opacity-90 text-xs">{event.time}</p>
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
          className="rounded-lg p-6 animate-fade-up"
          style={{
            background: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.6)",
          }}
        >
          <h3 className="text-lg font-bold mb-4" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
            {selectedDay}'s Schedule
          </h3>
          <div className="space-y-3">
            {scheduleWithEvents[selectedDay]?.map((event) => (
              <div
                key={event.id}
                className="flex items-start gap-4 p-4 rounded-lg"
                style={{ background: "rgba(255, 255, 255, 0.3)" }}
              >
                <div
                  className="w-1 h-16 rounded-full flex-shrink-0"
                  style={{ background: event.color }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{event.emoji}</span>
                    <p className="font-semibold text-sm" style={{ color: "#2a2a2a", fontFamily: "'Lora', serif" }}>
                      {event.title}
                    </p>
                  </div>
                  <p className="text-xs mt-2" style={{ color: "#6b6b6b", fontFamily: "'Poppins', sans-serif", fontWeight: 300 }}>
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
