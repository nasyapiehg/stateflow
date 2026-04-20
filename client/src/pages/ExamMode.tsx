/**
 * ExamMode — StateFlow Exam Mode feature
 * Helps students prepare for midterms/finals with adaptive scheduling and burnout prevention
 */
import { useState } from "react";
import { AlertCircle, Zap, TrendingUp, Calendar } from "lucide-react";

interface Exam {
  id: string;
  subject: string;
  emoji: string;
  daysUntil: number;
  prepProgress: number;
  color: string;
}

const SAMPLE_EXAMS: Exam[] = [
  { id: "1", subject: "Organic Chemistry", emoji: "⚗️", daysUntil: 5, prepProgress: 60, color: "#c9956f" },
  { id: "2", subject: "Biology", emoji: "🧬", daysUntil: 7, prepProgress: 45, color: "#8b7a6b" },
  { id: "3", subject: "Calculus II", emoji: "∫", daysUntil: 10, prepProgress: 30, color: "#5a8f7b" },
];

export default function ExamMode() {
  const [isExamModeActive, setIsExamModeActive] = useState(false);
  const [selectedExams, setSelectedExams] = useState<string[]>([]);
  const [examDuration, setExamDuration] = useState("2weeks");

  const toggleExamSelection = (examId: string) => {
    setSelectedExams((prev) =>
      prev.includes(examId) ? prev.filter((id) => id !== examId) : [...prev, examId]
    );
  };

  const activateExamMode = () => {
    if (selectedExams.length > 0) {
      setIsExamModeActive(true);
      localStorage.setItem("examModeActive", "true");
      localStorage.setItem("selectedExams", JSON.stringify(selectedExams));
    }
  };

  const deactivateExamMode = () => {
    setIsExamModeActive(false);
    setSelectedExams([]);
    localStorage.removeItem("examModeActive");
    localStorage.removeItem("selectedExams");
  };

  if (isExamModeActive) {
    return (
      <div className="p-6 lg:p-8 space-y-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
              Exam Mode Active 🎯
            </h1>
            <p className="text-sm" style={{ fontFamily: "'Poppins', sans-serif", color: "#6b6b6b", fontWeight: 300 }}>
              Your study plan is optimized for exam prep. You've got this!
            </p>
          </div>
          <button
            onClick={deactivateExamMode}
            className="px-4 py-2 rounded-lg font-semibold transition-all"
            style={{
              background: "rgba(201, 149, 111, 0.1)",
              color: "#c9956f",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Exit Exam Mode
          </button>
        </div>

        {/* Exam Timeline */}
        <div
          className="rounded-lg p-6"
          style={{
            background: "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.6)",
          }}
        >
          <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
            Exam Timeline
          </h2>
          <div className="space-y-3">
            {SAMPLE_EXAMS.filter((e) => selectedExams.includes(e.id)).map((exam) => (
              <div
                key={exam.id}
                className="p-4 rounded-lg border-l-4"
                style={{
                  background: "rgba(255, 255, 255, 0.3)",
                  borderLeftColor: exam.color,
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{exam.emoji}</span>
                    <div>
                      <p className="font-semibold" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
                        {exam.subject}
                      </p>
                      <p className="text-xs" style={{ fontFamily: "'Poppins', sans-serif", color: "#8b8b8b", fontWeight: 300 }}>
                        {exam.daysUntil} days until exam
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold" style={{ color: exam.color }}>
                      {exam.prepProgress}%
                    </p>
                    <p className="text-xs" style={{ fontFamily: "'Poppins', sans-serif", color: "#8b8b8b", fontWeight: 300 }}>
                      prep complete
                    </p>
                  </div>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "#e8e5e0" }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      background: exam.color,
                      width: `${exam.prepProgress}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pressure Gauge */}
        <div
          className="rounded-lg p-6"
          style={{
            background: "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.6)",
          }}
        >
          <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
            Pressure Gauge
          </h2>
          <div className="grid lg:grid-cols-3 gap-4">
            {[
              { label: "Overall Prep", value: 45, color: "#c9956f" },
              { label: "Daily Study Cap", value: "4.5h / 6h", color: "#5a8f7b" },
              { label: "Burnout Risk", value: "Low", color: "#8b7a6b" },
            ].map((metric, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg text-center"
                style={{
                  background: "rgba(255, 255, 255, 0.3)",
                }}
              >
                <p className="text-xs mb-2" style={{ fontFamily: "'Poppins', sans-serif", color: "#8b8b8b", fontWeight: 300 }}>
                  {metric.label}
                </p>
                <p className="text-2xl font-bold" style={{ fontFamily: "'Lora', serif", color: metric.color }}>
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Adaptive Study Blocks */}
        <div
          className="rounded-lg p-6"
          style={{
            background: "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.6)",
          }}
        >
          <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
            Adaptive Study Blocks
          </h2>
          <p className="text-sm mb-4" style={{ fontFamily: "'Poppins', sans-serif", color: "#6b6b6b", fontWeight: 300 }}>
            Your study sessions are optimized for focus and burnout prevention (45 min blocks with 15 min breaks)
          </p>
          <div className="space-y-2">
            {[
              { time: "9:00 - 9:45 AM", subject: "Organic Chemistry", color: "#c9956f" },
              { time: "10:00 - 10:45 AM", subject: "Organic Chemistry", color: "#c9956f" },
              { time: "11:00 AM - 12:00 PM", subject: "Break", color: "#e8e5e0" },
              { time: "12:00 - 12:45 PM", subject: "Biology", color: "#8b7a6b" },
              { time: "1:00 - 1:45 PM", subject: "Biology", color: "#8b7a6b" },
            ].map((block, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg flex items-center justify-between"
                style={{
                  background: "rgba(255, 255, 255, 0.3)",
                  borderLeft: `4px solid ${block.color}`,
                }}
              >
                <div>
                  <p className="text-sm font-semibold" style={{ fontFamily: "'Poppins', sans-serif", color: "#2a2a2a" }}>
                    {block.time}
                  </p>
                  <p className="text-xs" style={{ fontFamily: "'Poppins', sans-serif", color: "#8b8b8b", fontWeight: 300 }}>
                    {block.subject}
                  </p>
                </div>
                <button
                  className="px-3 py-1 rounded text-xs font-semibold transition-all"
                  style={{
                    background: block.color,
                    color: "#faf9f6",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {block.subject === "Break" ? "Rest" : "Start"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Panic Button */}
        <div
          className="rounded-lg p-6 text-center"
          style={{
            background: "rgba(217, 119, 6, 0.1)",
            border: "2px solid rgba(217, 119, 6, 0.3)",
          }}
        >
          <AlertCircle className="w-8 h-8 mx-auto mb-3" style={{ color: "#d97706" }} />
          <p className="font-semibold mb-2" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
            Need to reschedule everything?
          </p>
          <p className="text-sm mb-4" style={{ fontFamily: "'Poppins', sans-serif", color: "#6b6b6b", fontWeight: 300 }}>
            One tap to redistribute your study blocks across available time slots
          </p>
          <button
            className="px-6 py-2 rounded-lg font-semibold transition-all"
            style={{
              background: "#d97706",
              color: "#faf9f6",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Reschedule Everything
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-6xl">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
          Exam Mode 🎯
        </h1>
        <p className="text-sm" style={{ fontFamily: "'Poppins', sans-serif", color: "#6b6b6b", fontWeight: 300 }}>
          Prepare for midterms and finals with adaptive scheduling and burnout prevention
        </p>
      </div>

      {/* Info cards */}
      <div className="grid lg:grid-cols-3 gap-4">
        {[
          { icon: "📅", title: "Exam Timeline", desc: "See all your exams with countdown timers" },
          { icon: "⚡", title: "Adaptive Blocks", desc: "45-min focused sessions with smart breaks" },
          { icon: "🛡️", title: "Burnout Prevention", desc: "Max 6h/day study to stay healthy" },
        ].map((card, idx) => (
          <div
            key={idx}
            className="rounded-lg p-4"
            style={{
              background: "rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
            }}
          >
            <p className="text-2xl mb-2">{card.icon}</p>
            <p className="font-semibold text-sm mb-1" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
              {card.title}
            </p>
            <p className="text-xs" style={{ fontFamily: "'Poppins', sans-serif", color: "#6b6b6b", fontWeight: 300 }}>
              {card.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Select exams */}
      <div
        className="rounded-lg p-6"
        style={{
          background: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.6)",
        }}
      >
        <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
          Select Exams to Prepare For
        </h2>
        <div className="space-y-3">
          {SAMPLE_EXAMS.map((exam) => (
            <div
              key={exam.id}
              className="p-4 rounded-lg flex items-center gap-3 cursor-pointer transition-all hover:shadow-md"
              style={{
                background: selectedExams.includes(exam.id) ? "rgba(90, 143, 123, 0.1)" : "rgba(255, 255, 255, 0.3)",
                border: selectedExams.includes(exam.id) ? "2px solid #5a8f7b" : "1px solid rgba(255, 255, 255, 0.6)",
              }}
              onClick={() => toggleExamSelection(exam.id)}
            >
              <input
                type="checkbox"
                checked={selectedExams.includes(exam.id)}
                onChange={() => toggleExamSelection(exam.id)}
                className="w-5 h-5 rounded"
                style={{
                  accentColor: "#5a8f7b",
                }}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{exam.emoji}</span>
                  <p className="font-semibold" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
                    {exam.subject}
                  </p>
                </div>
                <p className="text-xs" style={{ fontFamily: "'Poppins', sans-serif", color: "#8b8b8b", fontWeight: 300 }}>
                  {exam.daysUntil} days until exam
                </p>
              </div>
              <p className="text-sm font-semibold" style={{ color: exam.color }}>
                {exam.prepProgress}% ready
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Duration selector */}
      <div
        className="rounded-lg p-6"
        style={{
          background: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.6)",
        }}
      >
        <h2 className="text-lg font-bold mb-4" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
          Prep Duration
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: "1week", label: "1 Week" },
            { value: "2weeks", label: "2 Weeks" },
            { value: "3weeks", label: "3 Weeks" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setExamDuration(option.value)}
              className="p-3 rounded-lg font-semibold transition-all"
              style={{
                background: examDuration === option.value ? "#5a8f7b" : "rgba(255, 255, 255, 0.3)",
                color: examDuration === option.value ? "#faf9f6" : "#2a2a2a",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Activate button */}
      <button
        onClick={activateExamMode}
        disabled={selectedExams.length === 0}
        className="w-full py-3 rounded-lg font-semibold transition-all disabled:opacity-50"
        style={{
          background: selectedExams.length > 0 ? "#5a8f7b" : "#e8e5e0",
          color: selectedExams.length > 0 ? "#faf9f6" : "#8b8b8b",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        Activate Exam Mode
      </button>
    </div>
  );
}
