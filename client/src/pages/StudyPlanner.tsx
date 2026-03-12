/**
 * StudyPlanner — StateFlow Aurora Flow Design
 * Break weekly coursework into manageable study sessions.
 * Add assignments, set difficulty, and auto-generate study blocks.
 */
import { useState } from "react";
import { Plus, Trash2, BookOpen, ChevronDown, ChevronUp, Sparkles, Check } from "lucide-react";
import { toast } from "sonner";

type Difficulty = "light" | "moderate" | "heavy";

interface Assignment {
  id: number;
  subject: string;
  title: string;
  dueDate: string;
  estimatedHours: number;
  difficulty: Difficulty;
  color: string;
  emoji: string;
  generated: boolean;
}

interface StudyBlock {
  id: number;
  assignmentId: number;
  day: string;
  time: string;
  duration: number;
  topic: string;
}

const SUBJECTS = [
  { name: "Organic Chemistry", emoji: "⚗️", color: "coral" },
  { name: "Biology", emoji: "🧬", color: "violet" },
  { name: "Calculus II", emoji: "∫", color: "teal" },
  { name: "Physics", emoji: "⚡", color: "amber" },
  { name: "English Comp", emoji: "✍️", color: "mint" },
  { name: "Other", emoji: "📚", color: "coral" },
];

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  light: "Light 🌱",
  moderate: "Moderate 🌿",
  heavy: "Heavy 🌳",
};

const DIFFICULTY_HOURS: Record<Difficulty, number> = {
  light: 1,
  moderate: 2,
  heavy: 3,
};

const INITIAL_ASSIGNMENTS: Assignment[] = [
  { id: 1, subject: "Organic Chemistry", title: "Lab Report #4", dueDate: "2026-03-14", estimatedHours: 4, difficulty: "heavy", color: "coral", emoji: "⚗️", generated: true },
  { id: 2, subject: "Biology", title: "Midterm Exam Prep", dueDate: "2026-03-17", estimatedHours: 8, difficulty: "heavy", color: "violet", emoji: "🧬", generated: true },
  { id: 3, subject: "Calculus II", title: "Problem Set 7", dueDate: "2026-03-20", estimatedHours: 3, difficulty: "moderate", color: "teal", emoji: "∫", generated: true },
];

const GENERATED_BLOCKS: StudyBlock[] = [
  { id: 1, assignmentId: 1, day: "Monday", time: "10:30 AM", duration: 90, topic: "Reaction mechanisms review" },
  { id: 2, assignmentId: 1, day: "Tuesday", time: "3:00 PM", duration: 60, topic: "Lab data analysis" },
  { id: 3, assignmentId: 1, day: "Wednesday", time: "4:00 PM", duration: 90, topic: "Write report draft" },
  { id: 4, assignmentId: 2, day: "Wednesday", time: "2:00 PM", duration: 120, topic: "Cell signaling pathways" },
  { id: 5, assignmentId: 2, day: "Thursday", time: "8:00 AM", duration: 90, topic: "Genetics review" },
  { id: 6, assignmentId: 2, day: "Friday", time: "2:00 PM", duration: 120, topic: "Practice exam questions" },
  { id: 7, assignmentId: 2, day: "Saturday", time: "10:00 AM", duration: 120, topic: "Full mock exam" },
  { id: 8, assignmentId: 3, day: "Thursday", time: "2:00 PM", duration: 60, topic: "Integration by parts" },
  { id: 9, assignmentId: 3, day: "Sunday", time: "2:00 PM", duration: 90, topic: "Practice problems set" },
];

export default function StudyPlanner() {
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);
  const [blocks] = useState<StudyBlock[]>(GENERATED_BLOCKS);
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    subject: "Organic Chemistry",
    title: "",
    dueDate: "",
    estimatedHours: 2,
    difficulty: "moderate" as Difficulty,
  });

  const handleAddAssignment = () => {
    if (!newAssignment.title || !newAssignment.dueDate) {
      toast.error("Please fill in the assignment title and due date!");
      return;
    }
    const subj = SUBJECTS.find((s) => s.name === newAssignment.subject) || SUBJECTS[0];
    const newItem: Assignment = {
      id: Date.now(),
      subject: newAssignment.subject,
      title: newAssignment.title,
      dueDate: newAssignment.dueDate,
      estimatedHours: newAssignment.estimatedHours,
      difficulty: newAssignment.difficulty,
      color: subj.color,
      emoji: subj.emoji,
      generated: false,
    };
    setAssignments((prev) => [...prev, newItem]);
    setNewAssignment({ subject: "Organic Chemistry", title: "", dueDate: "", estimatedHours: 2, difficulty: "moderate" });
    setShowAddForm(false);
    toast.success("Assignment added! 🎉 Ready to generate study blocks.");
  };

  const handleGenerate = (id: number) => {
    setAssignments((prev) => prev.map((a) => (a.id === id ? { ...a, generated: true } : a)));
    toast.success("✨ Study blocks generated! Check your Weekly Schedule.");
  };

  const handleDelete = (id: number) => {
    setAssignments((prev) => prev.filter((a) => a.id !== id));
    toast("Assignment removed.", { description: "Your schedule has been updated." });
  };

  const getBlocksForAssignment = (id: number) => blocks.filter((b) => b.assignmentId === id);

  const getDaysUntil = (dateStr: string) => {
    const due = new Date(dateStr);
    const now = new Date();
    return Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-4xl">
      {/* Header */}
      <div className="animate-fade-up flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-bold" style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.22 0.04 280)" }}>
            Study Planner 📚
          </h2>
          <p className="mt-1 text-sm" style={{ color: "oklch(0.5 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>
            Add your assignments and let StateFlow break them into manageable study sessions
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-white transition-all"
          style={{ background: "linear-gradient(135deg, #FF6B6B, #FFB347)", boxShadow: "0 4px 14px rgba(255,107,107,0.3)" }}
        >
          <Plus className="w-4 h-4" />
          Add Assignment
        </button>
      </div>

      {/* Add form */}
      {showAddForm && (
        <div className="glass-card rounded-2xl p-5 animate-fade-up" style={{ border: "1px solid rgba(255,107,107,0.2)" }}>
          <h3 className="font-bold mb-4" style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.22 0.04 280)" }}>
            New Assignment ✨
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold mb-1 block" style={{ color: "oklch(0.45 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>Subject</label>
              <select
                className="w-full rounded-xl px-3 py-2 text-sm"
                style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(167,139,250,0.25)", fontFamily: "'Outfit', sans-serif", color: "oklch(0.25 0.04 280)" }}
                value={newAssignment.subject}
                onChange={(e) => setNewAssignment((p) => ({ ...p, subject: e.target.value }))}
              >
                {SUBJECTS.map((s) => (
                  <option key={s.name} value={s.name}>{s.emoji} {s.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold mb-1 block" style={{ color: "oklch(0.45 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>Assignment Title</label>
              <input
                className="w-full rounded-xl px-3 py-2 text-sm"
                style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(167,139,250,0.25)", fontFamily: "'Outfit', sans-serif", color: "oklch(0.25 0.04 280)" }}
                placeholder="e.g., Problem Set 8"
                value={newAssignment.title}
                onChange={(e) => setNewAssignment((p) => ({ ...p, title: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-xs font-semibold mb-1 block" style={{ color: "oklch(0.45 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>Due Date</label>
              <input
                type="date"
                className="w-full rounded-xl px-3 py-2 text-sm"
                style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(167,139,250,0.25)", fontFamily: "'Outfit', sans-serif", color: "oklch(0.25 0.04 280)" }}
                value={newAssignment.dueDate}
                onChange={(e) => setNewAssignment((p) => ({ ...p, dueDate: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-xs font-semibold mb-1 block" style={{ color: "oklch(0.45 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>Estimated Hours</label>
              <input
                type="number"
                min={0.5}
                max={40}
                step={0.5}
                className="w-full rounded-xl px-3 py-2 text-sm"
                style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(167,139,250,0.25)", fontFamily: "'Outfit', sans-serif", color: "oklch(0.25 0.04 280)" }}
                value={newAssignment.estimatedHours}
                onChange={(e) => setNewAssignment((p) => ({ ...p, estimatedHours: parseFloat(e.target.value) }))}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold mb-2 block" style={{ color: "oklch(0.45 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>Difficulty</label>
              <div className="flex gap-3">
                {(["light", "moderate", "heavy"] as Difficulty[]).map((d) => (
                  <button
                    key={d}
                    onClick={() => setNewAssignment((p) => ({ ...p, difficulty: d }))}
                    className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all"
                    style={{
                      background: newAssignment.difficulty === d ? "linear-gradient(135deg, #A78BFA, #C4B5FD)" : "rgba(255,255,255,0.6)",
                      color: newAssignment.difficulty === d ? "white" : "oklch(0.45 0.04 280)",
                      border: "1px solid rgba(167,139,250,0.2)",
                      fontFamily: "'Nunito', sans-serif",
                    }}
                  >
                    {DIFFICULTY_LABELS[d]}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleAddAssignment}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg, #FF6B6B, #FFB347)" }}
            >
              Add & Generate Blocks ✨
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold"
              style={{ background: "rgba(0,0,0,0.05)", color: "oklch(0.45 0.04 280)" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* How it works tip */}
      <div className="alert-info p-4 rounded-2xl flex items-start gap-3 animate-fade-up-delay-1">
        <Sparkles className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#A78BFA" }} />
        <div>
          <p className="text-sm font-semibold" style={{ color: "oklch(0.3 0.08 280)", fontFamily: "'Outfit', sans-serif" }}>
            How StateFlow breaks down your work
          </p>
          <p className="text-xs mt-1 leading-relaxed" style={{ color: "oklch(0.45 0.06 280)", fontFamily: "'Nunito', sans-serif" }}>
            StateFlow looks at your due dates, estimated hours, and difficulty level to create realistic study sessions — no cramming, no overwhelm. Sessions are spaced out and scheduled around your existing classes and commitments.
          </p>
        </div>
      </div>

      {/* Assignments list */}
      <div className="space-y-4 animate-fade-up-delay-2">
        {assignments.map((assignment) => {
          const daysLeft = getDaysUntil(assignment.dueDate);
          const assignBlocks = getBlocksForAssignment(assignment.id);
          const isExpanded = expandedId === assignment.id;
          const urgency = daysLeft <= 2 ? "high" : daysLeft <= 5 ? "medium" : "low";

          return (
            <div key={assignment.id} className={`study-block ${assignment.color} rounded-2xl`} style={{ padding: 0, overflow: "hidden" }}>
              {/* Assignment header */}
              <div
                className="p-4 cursor-pointer"
                onClick={() => setExpandedId(isExpanded ? null : assignment.id)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{assignment.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm" style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.22 0.04 280)" }}>
                        {assignment.title}
                      </span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{
                          background: urgency === "high" ? "rgba(255,107,107,0.12)" : urgency === "medium" ? "rgba(255,179,71,0.12)" : "rgba(111,207,151,0.12)",
                          color: urgency === "high" ? "#E05252" : urgency === "medium" ? "#D97706" : "#059669",
                        }}
                      >
                        {daysLeft <= 0 ? "Due today!" : `${daysLeft}d left`}
                      </span>
                      {assignment.generated && (
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(167,139,250,0.12)", color: "#7C3AED" }}>
                          ✨ {assignBlocks.length} blocks
                        </span>
                      )}
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: "oklch(0.5 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>
                      {assignment.subject} · {assignment.estimatedHours}h · {DIFFICULTY_LABELS[assignment.difficulty]}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {!assignment.generated && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleGenerate(assignment.id); }}
                        className="text-xs px-3 py-1.5 rounded-xl font-semibold text-white"
                        style={{ background: "linear-gradient(135deg, #A78BFA, #C4B5FD)" }}
                      >
                        Generate
                      </button>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(assignment.id); }}
                      className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" style={{ color: "#E05252" }} />
                    </button>
                    {isExpanded ? <ChevronUp className="w-4 h-4" style={{ color: "oklch(0.5 0.04 280)" }} /> : <ChevronDown className="w-4 h-4" style={{ color: "oklch(0.5 0.04 280)" }} />}
                  </div>
                </div>

                {/* Hours progress */}
                <div className="mt-3">
                  <div className="h-1.5 rounded-full" style={{ background: "rgba(0,0,0,0.06)" }}>
                    <div
                      className="h-1.5 rounded-full transition-all duration-700"
                      style={{
                        width: `${Math.min(100, (assignBlocks.reduce((acc, b) => acc + b.duration / 60, 0) / assignment.estimatedHours) * 100)}%`,
                        background: assignment.color === "coral" ? "#FF6B6B" : assignment.color === "violet" ? "#A78BFA" : assignment.color === "teal" ? "#4ECDC4" : "#FFB347",
                      }}
                    />
                  </div>
                  <p className="text-xs mt-1" style={{ color: "oklch(0.55 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>
                    {assignBlocks.reduce((acc, b) => acc + b.duration / 60, 0).toFixed(1)}h scheduled of {assignment.estimatedHours}h needed
                  </p>
                </div>
              </div>

              {/* Expanded blocks */}
              {isExpanded && assignment.generated && (
                <div className="border-t px-4 pb-4 pt-3 space-y-2" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                  <p className="text-xs font-semibold mb-2" style={{ color: "oklch(0.45 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>
                    Generated study sessions:
                  </p>
                  {assignBlocks.map((block) => (
                    <div key={block.id} className="flex items-center gap-3 p-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.7)" }}>
                      <BookOpen className="w-4 h-4 flex-shrink-0" style={{ color: "oklch(0.55 0.04 280)" }} />
                      <div className="flex-1">
                        <p className="text-xs font-semibold" style={{ color: "oklch(0.3 0.04 280)", fontFamily: "'Outfit', sans-serif" }}>{block.topic}</p>
                        <p className="text-xs" style={{ color: "oklch(0.55 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>{block.day} at {block.time}</p>
                      </div>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: "rgba(167,139,250,0.1)", color: "#7C3AED" }}>
                        {block.duration} min
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {isExpanded && !assignment.generated && (
                <div className="border-t px-4 pb-4 pt-3 text-center" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                  <p className="text-sm" style={{ color: "oklch(0.55 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>
                    Click "Generate" to create personalized study blocks for this assignment! ✨
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {assignments.length === 0 && (
        <div className="text-center py-16 animate-fade-up">
          <span className="text-5xl">📋</span>
          <p className="mt-4 font-semibold" style={{ color: "oklch(0.45 0.04 280)", fontFamily: "'Outfit', sans-serif" }}>No assignments yet!</p>
          <p className="text-sm mt-1" style={{ color: "oklch(0.6 0.04 280)", fontFamily: "'Nunito', sans-serif" }}>Add your first assignment to get started.</p>
        </div>
      )}
    </div>
  );
}
