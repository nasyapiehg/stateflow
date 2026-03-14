/**
 * Settings — StateFlow Soft Minimalism + Japandi
 * Course management: create, edit, delete courses with custom colors and weekly hour targets.
 */
import { useState } from "react";
import { Plus, Edit2, Trash2, ChevronDown, Check } from "lucide-react";

interface Course {
  id: string;
  name: string;
  emoji: string;
  color: string;
  weeklyHours: number;
  difficulty: "easy" | "moderate" | "hard";
}

const INITIAL_COURSES: Course[] = [
  { id: "1", name: "Organic Chemistry", emoji: "⚗️", color: "#c9956f", weeklyHours: 10, difficulty: "hard" },
  { id: "2", name: "Biology", emoji: "🧬", color: "#8b7a6b", weeklyHours: 8, difficulty: "hard" },
  { id: "3", name: "Calculus II", emoji: "∫", color: "#5a8f7b", weeklyHours: 6, difficulty: "moderate" },
  { id: "4", name: "Physics", emoji: "⚡", color: "#6b8f7f", weeklyHours: 6, difficulty: "hard" },
];

const COLOR_PRESETS = [
  "#c9956f", // Terracotta
  "#5a8f7b", // Sage
  "#8b7a6b", // Charcoal
  "#6b8f7f", // Dusty Blue
  "#a67c7c", // Muted Plum
  "#7fa8b8", // Slate Blue
  "#9b8fa6", // Lavender
  "#a89b8b", // Warm Gray
];

const EMOJIS = ["⚗️", "🧬", "∫", "⚡", "📚", "🔬", "📊", "💻", "🎨", "🎵", "⚙️", "🌍"];

const DIFFICULTIES = [
  { value: "easy", label: "Easy 🌿", color: "#5a8f7b" },
  { value: "moderate", label: "Moderate 🌳", color: "#c9956f" },
  { value: "hard", label: "Hard 🔥", color: "#8b7a6b" },
];

export default function Settings() {
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Course>>({
    name: "",
    emoji: "📚",
    color: COLOR_PRESETS[0],
    weeklyHours: 5,
    difficulty: "moderate",
  });

  const handleAddCourse = () => {
    if (!formData.name || !formData.emoji || !formData.color) return;

    if (editingId) {
      setCourses(courses.map((c) => (c.id === editingId ? { ...c, ...formData } : c)));
      setEditingId(null);
    } else {
      const newCourse: Course = {
        id: Date.now().toString(),
        name: formData.name || "",
        emoji: formData.emoji || "📚",
        color: formData.color || COLOR_PRESETS[0],
        weeklyHours: formData.weeklyHours || 5,
        difficulty: formData.difficulty || "moderate",
      };
      setCourses([...courses, newCourse]);
    }

    setFormData({ name: "", emoji: "📚", color: COLOR_PRESETS[0], weeklyHours: 5, difficulty: "moderate" });
    setShowForm(false);
  };

  const handleEditCourse = (course: Course) => {
    setFormData(course);
    setEditingId(course.id);
    setShowForm(true);
  };

  const handleDeleteCourse = (id: string) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  const handleCancel = () => {
    setFormData({ name: "", emoji: "📚", color: COLOR_PRESETS[0], weeklyHours: 5, difficulty: "moderate" });
    setEditingId(null);
    setShowForm(false);
  };

  const totalWeeklyHours = courses.reduce((sum, c) => sum + c.weeklyHours, 0);

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-4xl">
      {/* Header */}
      <div className="animate-fade-up">
        <h2 className="text-3xl font-bold" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
          Settings ⚙️
        </h2>
        <p className="mt-2 text-sm" style={{ fontFamily: "'Poppins', sans-serif", color: "#6b6b6b", fontWeight: 300 }}>
          Customize your courses, set weekly targets, and personalize your study experience.
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-up-delay-1">
        {[
          { label: "Active Courses", value: courses.length, color: "#5a8f7b" },
          { label: "Weekly Target", value: `${totalWeeklyHours}h`, color: "#c9956f" },
          { label: "Daily Average", value: `${(totalWeeklyHours / 7).toFixed(1)}h`, color: "#8b7a6b" },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="rounded-lg p-4"
            style={{
              background: "rgba(255, 255, 255, 0.4)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
            }}
          >
            <p className="text-xs mb-1" style={{ fontFamily: "'Poppins', sans-serif", color: "#8b8b8b", fontWeight: 300 }}>
              {stat.label}
            </p>
            <p className="text-2xl font-bold" style={{ fontFamily: "'Lora', serif", color: stat.color }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Add/Edit Course Form */}
      {showForm && (
        <div
          className="rounded-lg p-6 space-y-4 animate-fade-up-delay-1"
          style={{
            background: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.6)",
          }}
        >
          <h3 className="font-bold text-sm" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
            {editingId ? "Edit Course" : "Create New Course"}
          </h3>

          {/* Course Name */}
          <div>
            <label className="text-xs font-semibold" style={{ fontFamily: "'Poppins', sans-serif", color: "#2a2a2a" }}>
              Course Name
            </label>
            <input
              type="text"
              value={formData.name || ""}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Organic Chemistry"
              className="w-full mt-2 px-3 py-2 rounded-lg text-sm"
              style={{
                background: "rgba(255, 255, 255, 0.5)",
                border: "1px solid rgba(255, 255, 255, 0.5)",
                fontFamily: "'Poppins', sans-serif",
                color: "#2a2a2a",
              }}
            />
          </div>

          {/* Emoji Selector */}
          <div>
            <label className="text-xs font-semibold" style={{ fontFamily: "'Poppins', sans-serif", color: "#2a2a2a" }}>
              Course Icon
            </label>
            <div className="grid grid-cols-6 gap-2 mt-2">
              {EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setFormData({ ...formData, emoji })}
                  className="p-2 rounded-lg text-lg transition-all"
                  style={{
                    background: formData.emoji === emoji ? "rgba(90, 143, 123, 0.2)" : "rgba(255, 255, 255, 0.3)",
                    border: formData.emoji === emoji ? "2px solid #5a8f7b" : "1px solid rgba(255, 255, 255, 0.5)",
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Color Picker */}
          <div>
            <label className="text-xs font-semibold" style={{ fontFamily: "'Poppins', sans-serif", color: "#2a2a2a" }}>
              Course Color
            </label>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {COLOR_PRESETS.map((color) => (
                <button
                  key={color}
                  onClick={() => setFormData({ ...formData, color })}
                  className="w-full h-10 rounded-lg transition-all flex items-center justify-center"
                  style={{
                    background: color,
                    border: formData.color === color ? "3px solid #2a2a2a" : "1px solid rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {formData.color === color && <Check className="w-4 h-4" style={{ color: "#faf9f6" }} />}
                </button>
              ))}
            </div>
          </div>

          {/* Weekly Hours Target */}
          <div>
            <label className="text-xs font-semibold" style={{ fontFamily: "'Poppins', sans-serif", color: "#2a2a2a" }}>
              Weekly Hours Target
            </label>
            <div className="flex items-center gap-3 mt-2">
              <input
                type="range"
                min="1"
                max="20"
                value={formData.weeklyHours || 5}
                onChange={(e) => setFormData({ ...formData, weeklyHours: parseInt(e.target.value) })}
                className="flex-1"
                style={{ cursor: "pointer" }}
              />
              <span
                className="text-sm font-bold px-3 py-1 rounded-lg"
                style={{
                  background: `${formData.color}20`,
                  color: formData.color,
                  fontFamily: "'Poppins', sans-serif",
                  minWidth: "50px",
                  textAlign: "center",
                }}
              >
                {formData.weeklyHours}h
              </span>
            </div>
          </div>

          {/* Difficulty Level */}
          <div>
            <label className="text-xs font-semibold" style={{ fontFamily: "'Poppins', sans-serif", color: "#2a2a2a" }}>
              Difficulty Level
            </label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {DIFFICULTIES.map((diff) => (
                <button
                  key={diff.value}
                  onClick={() => setFormData({ ...formData, difficulty: diff.value as any })}
                  className="p-2 rounded-lg text-xs font-semibold transition-all"
                  style={{
                    background: formData.difficulty === diff.value ? `${diff.color}20` : "rgba(255, 255, 255, 0.3)",
                    color: formData.difficulty === diff.value ? diff.color : "#6b6b6b",
                    border: formData.difficulty === diff.value ? `2px solid ${diff.color}` : "1px solid rgba(255, 255, 255, 0.5)",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {diff.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={handleAddCourse}
              className="flex-1 px-4 py-2 rounded-lg font-medium text-sm"
              style={{
                background: "#5a8f7b",
                color: "#faf9f6",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {editingId ? "Save Changes" : "Create Course"}
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-2 rounded-lg font-medium text-sm"
              style={{
                background: "rgba(255, 255, 255, 0.3)",
                color: "#6b6b6b",
                fontFamily: "'Poppins', sans-serif",
                border: "1px solid rgba(255, 255, 255, 0.5)",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Courses List */}
      <div className="space-y-3 animate-fade-up-delay-2">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
            Your Courses ({courses.length})
          </h3>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold"
              style={{
                background: "#5a8f7b",
                color: "#faf9f6",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              <Plus className="w-4 h-4" />
              Add Course
            </button>
          )}
        </div>

        {courses.map((course) => (
          <div
            key={course.id}
            className="rounded-lg p-4 flex items-center justify-between gap-4"
            style={{
              background: "rgba(255, 255, 255, 0.4)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
            }}
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center text-lg"
                style={{ background: `${course.color}20` }}
              >
                {course.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
                  {course.name}
                </p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span
                    className="text-xs px-2 py-0.5 rounded-lg"
                    style={{
                      background: `${course.color}20`,
                      color: course.color,
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    {course.weeklyHours}h/week
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-lg"
                    style={{
                      background: "rgba(90, 143, 123, 0.1)",
                      color: "#5a8f7b",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    {DIFFICULTIES.find((d) => d.value === course.difficulty)?.label}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleEditCourse(course)}
                className="p-2 rounded-lg transition-all"
                style={{
                  background: "rgba(255, 255, 255, 0.3)",
                  color: "#6b6b6b",
                }}
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDeleteCourse(course.id)}
                className="p-2 rounded-lg transition-all"
                style={{
                  background: "rgba(255, 255, 255, 0.3)",
                  color: "#a67c7c",
                }}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

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
          Tips for Setting Weekly Targets 💡
        </h3>
        <ul className="space-y-2">
          {[
            "Set realistic targets based on your course difficulty and credit hours",
            "Easy courses: 3-5h/week | Moderate: 5-8h/week | Hard: 8-12h/week",
            "Your daily average is calculated from your total weekly target",
            "Adjust targets anytime — StateFlow will rebalance your schedule",
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
