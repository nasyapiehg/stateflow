/**
 * Settings — StateFlow Soft Minimalism + Japandi
 * Profile editing, course management, PDF syllabus import, and recurring events.
 */
import { useState } from "react";
import { Plus, Edit2, Trash2, Check, Upload, Calendar, Clock, Repeat2 } from "lucide-react";

interface Course {
  id: string;
  name: string;
  emoji: string;
  color: string;
  weeklyHours: number;
  difficulty: "easy" | "moderate" | "hard";
}

interface UserProfile {
  name: string;
  major: string;
  school: string;
  year: "1st" | "2nd" | "3rd" | "4th";
  goals: string;
}

interface RecurringEvent {
  id: string;
  name: string;
  type: "extracurricular" | "event";
  emoji: string;
  startTime: string;
  endTime: string;
  daysOfWeek: number[]; // 0=Sun, 1=Mon, etc.
  color: string;
}

interface ExtractedAssignment {
  id: string;
  courseId: string;
  title: string;
  dueDate: string;
  type: "assignment" | "exam" | "project";
  estimatedHours: number;
}

const INITIAL_COURSES: Course[] = [
  { id: "1", name: "Organic Chemistry", emoji: "⚗️", color: "#c9956f", weeklyHours: 10, difficulty: "hard" },
  { id: "2", name: "Biology", emoji: "🧬", color: "#8b7a6b", weeklyHours: 8, difficulty: "hard" },
  { id: "3", name: "Calculus II", emoji: "∫", color: "#5a8f7b", weeklyHours: 6, difficulty: "moderate" },
  { id: "4", name: "Physics", emoji: "⚡", color: "#6b8f7f", weeklyHours: 6, difficulty: "hard" },
];

const INITIAL_PROFILE: UserProfile = {
  name: "Alex Johnson",
  major: "Pre-Medicine",
  school: "State University",
  year: "2nd",
  goals: "Maintain 3.8+ GPA and excel in science courses",
};

const INITIAL_EVENTS: RecurringEvent[] = [
  {
    id: "1",
    name: "Basketball Practice",
    type: "extracurricular",
    emoji: "🏀",
    startTime: "18:00",
    endTime: "19:30",
    daysOfWeek: [1, 3, 5], // Mon, Wed, Fri
    color: "#c9956f",
  },
  {
    id: "2",
    name: "Lab Session",
    type: "event",
    emoji: "🔬",
    startTime: "14:00",
    endTime: "16:00",
    daysOfWeek: [2, 4], // Tue, Thu
    color: "#5a8f7b",
  },
];

const COLOR_PRESETS = [
  "#c9956f", "#5a8f7b", "#8b7a6b", "#6b8f7f",
  "#a67c7c", "#7fa8b8", "#9b8fa6", "#a89b8b",
];

const EMOJIS = ["⚗️", "🧬", "∫", "⚡", "📚", "🔬", "📊", "💻", "🎨", "🎵", "🏀", "🎭"];

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const DIFFICULTIES = [
  { value: "easy", label: "Easy 🌿", color: "#5a8f7b" },
  { value: "moderate", label: "Moderate 🌳", color: "#c9956f" },
  { value: "hard", label: "Hard 🔥", color: "#8b7a6b" },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState<"profile" | "courses" | "syllabus" | "events">("profile");
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState<UserProfile>(INITIAL_PROFILE);

  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [courseFormData, setCourseFormData] = useState<Partial<Course>>({
    name: "",
    emoji: "📚",
    color: COLOR_PRESETS[0],
    weeklyHours: 5,
    difficulty: "moderate",
  });

  const [events, setEvents] = useState<RecurringEvent[]>(INITIAL_EVENTS);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [eventFormData, setEventFormData] = useState<Partial<RecurringEvent>>({
    name: "",
    type: "extracurricular",
    emoji: "🏀",
    startTime: "18:00",
    endTime: "19:00",
    daysOfWeek: [],
    color: COLOR_PRESETS[0],
  });

  const [extractedAssignments, setExtractedAssignments] = useState<ExtractedAssignment[]>([
    {
      id: "1",
      courseId: "1",
      title: "Reaction Mechanism Problem Set",
      dueDate: "2026-03-21",
      type: "assignment",
      estimatedHours: 3,
    },
    {
      id: "2",
      courseId: "1",
      title: "Midterm Exam",
      dueDate: "2026-04-05",
      type: "exam",
      estimatedHours: 8,
    },
  ]);

  const [showSyllabusUpload, setShowSyllabusUpload] = useState(false);

  // Profile handlers
  const handleSaveProfile = () => {
    setProfile(profileForm);
    setEditingProfile(false);
  };

  // Course handlers
  const handleAddCourse = () => {
    if (!courseFormData.name || !courseFormData.emoji || !courseFormData.color) return;

    if (editingCourseId) {
      setCourses(courses.map((c) => (c.id === editingCourseId ? { ...c, ...courseFormData } : c)));
      setEditingCourseId(null);
    } else {
      const newCourse: Course = {
        id: Date.now().toString(),
        name: courseFormData.name || "",
        emoji: courseFormData.emoji || "📚",
        color: courseFormData.color || COLOR_PRESETS[0],
        weeklyHours: courseFormData.weeklyHours || 5,
        difficulty: courseFormData.difficulty || "moderate",
      };
      setCourses([...courses, newCourse]);
    }

    setCourseFormData({ name: "", emoji: "📚", color: COLOR_PRESETS[0], weeklyHours: 5, difficulty: "moderate" });
    setShowCourseForm(false);
  };

  const handleEditCourse = (course: Course) => {
    setCourseFormData(course);
    setEditingCourseId(course.id);
    setShowCourseForm(true);
  };

  const handleDeleteCourse = (id: string) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  // Event handlers
  const handleAddEvent = () => {
    if (!eventFormData.name || !eventFormData.daysOfWeek || eventFormData.daysOfWeek.length === 0) return;

    if (editingEventId) {
      setEvents(events.map((e) => (e.id === editingEventId ? { ...e, ...eventFormData } : e)));
      setEditingEventId(null);
    } else {
      const newEvent: RecurringEvent = {
        id: Date.now().toString(),
        name: eventFormData.name || "",
        type: eventFormData.type || "extracurricular",
        emoji: eventFormData.emoji || "🏀",
        startTime: eventFormData.startTime || "18:00",
        endTime: eventFormData.endTime || "19:00",
        daysOfWeek: eventFormData.daysOfWeek || [],
        color: eventFormData.color || COLOR_PRESETS[0],
      };
      setEvents([...events, newEvent]);
    }

    setEventFormData({
      name: "",
      type: "extracurricular",
      emoji: "🏀",
      startTime: "18:00",
      endTime: "19:00",
      daysOfWeek: [],
      color: COLOR_PRESETS[0],
    });
    setShowEventForm(false);
  };

  const handleEditEvent = (event: RecurringEvent) => {
    setEventFormData(event);
    setEditingEventId(event.id);
    setShowEventForm(true);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  const toggleDayOfWeek = (day: number) => {
    const current = eventFormData.daysOfWeek || [];
    if (current.includes(day)) {
      setEventFormData({ ...eventFormData, daysOfWeek: current.filter((d) => d !== day) });
    } else {
      setEventFormData({ ...eventFormData, daysOfWeek: [...current, day].sort() });
    }
  };

  const handleCancelForms = () => {
    setCourseFormData({ name: "", emoji: "📚", color: COLOR_PRESETS[0], weeklyHours: 5, difficulty: "moderate" });
    setEditingCourseId(null);
    setShowCourseForm(false);
    setEventFormData({
      name: "",
      type: "extracurricular",
      emoji: "🏀",
      startTime: "18:00",
      endTime: "19:00",
      daysOfWeek: [],
      color: COLOR_PRESETS[0],
    });
    setEditingEventId(null);
    setShowEventForm(false);
  };

  const handleSyllabusUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Mock PDF extraction - in production, you'd use a PDF library
      alert(`📄 Syllabus uploaded: ${file.name}\n\nMock extraction:\n- 2 assignments detected\n- 1 exam detected\n- ~12 hours estimated study time\n\nReview and edit extracted items below.`);
      setShowSyllabusUpload(false);
    }
  };

  const handleDeleteAssignment = (id: string) => {
    setExtractedAssignments(extractedAssignments.filter((a) => a.id !== id));
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-5xl">
      {/* Header */}
      <div className="animate-fade-up">
        <h2 className="text-3xl font-bold" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
          Settings ⚙️
        </h2>
        <p className="mt-2 text-sm" style={{ fontFamily: "'Poppins', sans-serif", color: "#6b6b6b", fontWeight: 300 }}>
          Manage your profile, courses, syllabi, and calendar events.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 flex-wrap animate-fade-up-delay-1">
        {[
          { id: "profile", label: "👤 Profile", icon: "👤" },
          { id: "courses", label: "📚 Courses", icon: "📚" },
          { id: "syllabus", label: "📄 Syllabi", icon: "📄" },
          { id: "events", label: "📅 Events", icon: "📅" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              background: activeTab === tab.id ? "#5a8f7b" : "rgba(255, 255, 255, 0.3)",
              color: activeTab === tab.id ? "#faf9f6" : "#6b6b6b",
              fontFamily: "'Poppins', sans-serif",
              border: activeTab === tab.id ? "none" : "1px solid rgba(255, 255, 255, 0.5)",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="space-y-4 animate-fade-up-delay-1">
          {!editingProfile ? (
            <div
              className="rounded-lg p-6"
              style={{
                background: "rgba(255, 255, 255, 0.4)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.6)",
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-bold text-lg" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
                  Your Profile
                </h3>
                <button
                  onClick={() => {
                    setProfileForm(profile);
                    setEditingProfile(true);
                  }}
                  className="px-3 py-1 rounded-lg text-xs font-semibold"
                  style={{
                    background: "#5a8f7b",
                    color: "#faf9f6",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Edit Profile
                </button>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { label: "Name", value: profile.name },
                  { label: "Major", value: profile.major },
                  { label: "School", value: profile.school },
                  { label: "Year", value: profile.year },
                  { label: "Goals", value: profile.goals, fullWidth: true },
                ].map((field, idx) => (
                  <div key={idx} className={field.fullWidth ? "col-span-2 lg:col-span-3" : ""}>
                    <p className="text-xs font-semibold" style={{ fontFamily: "'Poppins', sans-serif", color: "#8b8b8b" }}>
                      {field.label}
                    </p>
                    <p className="text-sm mt-1" style={{ fontFamily: "'Poppins', sans-serif", color: "#2a2a2a", fontWeight: 500 }}>
                      {field.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div
              className="rounded-lg p-6 space-y-4"
              style={{
                background: "rgba(255, 255, 255, 0.4)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.6)",
              }}
            >
              <h3 className="font-bold text-sm" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
                Edit Profile
              </h3>

              {[
                { key: "name", label: "Full Name", type: "text" },
                { key: "major", label: "Major", type: "text" },
                { key: "school", label: "School", type: "text" },
                { key: "goals", label: "Goals & Aspirations", type: "textarea" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-xs font-semibold" style={{ fontFamily: "'Poppins', sans-serif", color: "#2a2a2a" }}>
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      value={profileForm[field.key as keyof UserProfile]}
                      onChange={(e) => setProfileForm({ ...profileForm, [field.key]: e.target.value })}
                      className="w-full mt-2 px-3 py-2 rounded-lg text-sm"
                      style={{
                        background: "rgba(255, 255, 255, 0.5)",
                        border: "1px solid rgba(255, 255, 255, 0.5)",
                        fontFamily: "'Poppins', sans-serif",
                        color: "#2a2a2a",
                        minHeight: "80px",
                        resize: "vertical",
                      }}
                    />
                  ) : field.key === "year" ? (
                    <select
                      value={profileForm.year}
                      onChange={(e) => setProfileForm({ ...profileForm, year: e.target.value as any })}
                      className="w-full mt-2 px-3 py-2 rounded-lg text-sm"
                      style={{
                        background: "rgba(255, 255, 255, 0.5)",
                        border: "1px solid rgba(255, 255, 255, 0.5)",
                        fontFamily: "'Poppins', sans-serif",
                        color: "#2a2a2a",
                      }}
                    >
                      <option value="1st">1st Year</option>
                      <option value="2nd">2nd Year</option>
                      <option value="3rd">3rd Year</option>
                      <option value="4th">4th Year</option>
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      value={profileForm[field.key as keyof UserProfile]}
                      onChange={(e) => setProfileForm({ ...profileForm, [field.key]: e.target.value })}
                      className="w-full mt-2 px-3 py-2 rounded-lg text-sm"
                      style={{
                        background: "rgba(255, 255, 255, 0.5)",
                        border: "1px solid rgba(255, 255, 255, 0.5)",
                        fontFamily: "'Poppins', sans-serif",
                        color: "#2a2a2a",
                      }}
                    />
                  )}
                </div>
              ))}

              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 px-4 py-2 rounded-lg font-medium text-sm"
                  style={{
                    background: "#5a8f7b",
                    color: "#faf9f6",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Save Profile
                </button>
                <button
                  onClick={() => setEditingProfile(false)}
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
        </div>
      )}

      {/* Courses Tab */}
      {activeTab === "courses" && (
        <div className="space-y-4 animate-fade-up-delay-1">
          {showCourseForm && (
            <div
              className="rounded-lg p-6 space-y-4"
              style={{
                background: "rgba(255, 255, 255, 0.4)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.6)",
              }}
            >
              <h3 className="font-bold text-sm" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
                {editingCourseId ? "Edit Course" : "Create New Course"}
              </h3>

              <div>
                <label className="text-xs font-semibold" style={{ fontFamily: "'Poppins', sans-serif", color: "#2a2a2a" }}>
                  Course Name
                </label>
                <input
                  type="text"
                  value={courseFormData.name || ""}
                  onChange={(e) => setCourseFormData({ ...courseFormData, name: e.target.value })}
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

              <div>
                <label className="text-xs font-semibold" style={{ fontFamily: "'Poppins', sans-serif", color: "#2a2a2a" }}>
                  Course Icon
                </label>
                <div className="grid grid-cols-6 gap-2 mt-2">
                  {EMOJIS.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setCourseFormData({ ...courseFormData, emoji })}
                      className="p-2 rounded-lg text-lg transition-all"
                      style={{
                        background: courseFormData.emoji === emoji ? "rgba(90, 143, 123, 0.2)" : "rgba(255, 255, 255, 0.3)",
                        border: courseFormData.emoji === emoji ? "2px solid #5a8f7b" : "1px solid rgba(255, 255, 255, 0.5)",
                      }}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold" style={{ fontFamily: "'Poppins', sans-serif", color: "#2a2a2a" }}>
                  Course Color
                </label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {COLOR_PRESETS.map((color) => (
                    <button
                      key={color}
                      onClick={() => setCourseFormData({ ...courseFormData, color })}
                      className="w-full h-10 rounded-lg transition-all flex items-center justify-center"
                      style={{
                        background: color,
                        border: courseFormData.color === color ? "3px solid #2a2a2a" : "1px solid rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      {courseFormData.color === color && <Check className="w-4 h-4" style={{ color: "#faf9f6" }} />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold" style={{ fontFamily: "'Poppins', sans-serif", color: "#2a2a2a" }}>
                  Weekly Hours Target
                </label>
                <div className="flex items-center gap-3 mt-2">
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={courseFormData.weeklyHours || 5}
                    onChange={(e) => setCourseFormData({ ...courseFormData, weeklyHours: parseInt(e.target.value) })}
                    className="flex-1"
                    style={{ cursor: "pointer" }}
                  />
                  <span
                    className="text-sm font-bold px-3 py-1 rounded-lg"
                    style={{
                      background: `${courseFormData.color}20`,
                      color: courseFormData.color,
                      fontFamily: "'Poppins', sans-serif",
                      minWidth: "50px",
                      textAlign: "center",
                    }}
                  >
                    {courseFormData.weeklyHours}h
                  </span>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold" style={{ fontFamily: "'Poppins', sans-serif", color: "#2a2a2a" }}>
                  Difficulty Level
                </label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {DIFFICULTIES.map((diff) => (
                    <button
                      key={diff.value}
                      onClick={() => setCourseFormData({ ...courseFormData, difficulty: diff.value as any })}
                      className="p-2 rounded-lg text-xs font-semibold transition-all"
                      style={{
                        background: courseFormData.difficulty === diff.value ? `${diff.color}20` : "rgba(255, 255, 255, 0.3)",
                        color: courseFormData.difficulty === diff.value ? diff.color : "#6b6b6b",
                        border: courseFormData.difficulty === diff.value ? `2px solid ${diff.color}` : "1px solid rgba(255, 255, 255, 0.5)",
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      {diff.label}
                    </button>
                  ))}
                </div>
              </div>

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
                  {editingCourseId ? "Save Changes" : "Create Course"}
                </button>
                <button
                  onClick={handleCancelForms}
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

          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
              Your Courses ({courses.length})
            </h3>
            {!showCourseForm && (
              <button
                onClick={() => setShowCourseForm(true)}
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

          <div className="space-y-3">
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
                    </div>
                  </div>
                </div>

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
        </div>
      )}

      {/* Syllabus Tab */}
      {activeTab === "syllabus" && (
        <div className="space-y-4 animate-fade-up-delay-1">
          {!showSyllabusUpload && (
            <button
              onClick={() => setShowSyllabusUpload(true)}
              className="w-full rounded-lg p-6 border-2 border-dashed flex flex-col items-center gap-2 transition-all"
              style={{
                borderColor: "#5a8f7b",
                background: "rgba(90, 143, 123, 0.05)",
              }}
            >
              <Upload className="w-6 h-6" style={{ color: "#5a8f7b" }} />
              <p className="font-semibold text-sm" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
                Upload Course Syllabus (PDF)
              </p>
              <p className="text-xs" style={{ fontFamily: "'Poppins', sans-serif", color: "#8b8b8b", fontWeight: 300 }}>
                We'll automatically extract due dates, assignments, and exams
              </p>
            </button>
          )}

          {showSyllabusUpload && (
            <div
              className="rounded-lg p-6 space-y-4"
              style={{
                background: "rgba(255, 255, 255, 0.4)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.6)",
              }}
            >
              <h3 className="font-bold text-sm" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
                Select Course & Upload Syllabus
              </h3>

              <div>
                <label className="text-xs font-semibold" style={{ fontFamily: "'Poppins', sans-serif", color: "#2a2a2a" }}>
                  Which course is this syllabus for?
                </label>
                <select
                  className="w-full mt-2 px-3 py-2 rounded-lg text-sm"
                  style={{
                    background: "rgba(255, 255, 255, 0.5)",
                    border: "1px solid rgba(255, 255, 255, 0.5)",
                    fontFamily: "'Poppins', sans-serif",
                    color: "#2a2a2a",
                  }}
                >
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.emoji} {course.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold" style={{ fontFamily: "'Poppins', sans-serif", color: "#2a2a2a" }}>
                  Upload PDF
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleSyllabusUpload}
                  className="w-full mt-2"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    color: "#2a2a2a",
                  }}
                />
              </div>

              <button
                onClick={() => setShowSyllabusUpload(false)}
                className="w-full px-4 py-2 rounded-lg font-medium text-sm"
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
          )}

          {extractedAssignments.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-bold text-sm" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
                Extracted Assignments & Exams
              </h3>
              {extractedAssignments.map((assignment) => {
                const course = courses.find((c) => c.id === assignment.courseId);
                return (
                  <div
                    key={assignment.id}
                    className="rounded-lg p-4 flex items-center justify-between gap-4"
                    style={{
                      background: "rgba(255, 255, 255, 0.4)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255, 255, 255, 0.6)",
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
                        {assignment.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span
                          className="text-xs px-2 py-0.5 rounded-lg"
                          style={{
                            background: "rgba(90, 143, 123, 0.1)",
                            color: "#5a8f7b",
                            fontFamily: "'Poppins', sans-serif",
                          }}
                        >
                          {assignment.type}
                        </span>
                        <span
                          className="text-xs px-2 py-0.5 rounded-lg"
                          style={{
                            background: "rgba(201, 149, 111, 0.1)",
                            color: "#c9956f",
                            fontFamily: "'Poppins', sans-serif",
                          }}
                        >
                          📅 {assignment.dueDate}
                        </span>
                        <span
                          className="text-xs px-2 py-0.5 rounded-lg"
                          style={{
                            background: "rgba(139, 122, 107, 0.1)",
                            color: "#8b7a6b",
                            fontFamily: "'Poppins', sans-serif",
                          }}
                        >
                          ⏱️ {assignment.estimatedHours}h
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteAssignment(assignment.id)}
                      className="p-2 rounded-lg transition-all"
                      style={{
                        background: "rgba(255, 255, 255, 0.3)",
                        color: "#a67c7c",
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Events Tab */}
      {activeTab === "events" && (
        <div className="space-y-4 animate-fade-up-delay-1">
          {showEventForm && (
            <div
              className="rounded-lg p-6 space-y-4"
              style={{
                background: "rgba(255, 255, 255, 0.4)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.6)",
              }}
            >
              <h3 className="font-bold text-sm" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
                {editingEventId ? "Edit Event" : "Create New Event"}
              </h3>

              <div>
                <label className="text-xs font-semibold" style={{ fontFamily: "'Poppins', sans-serif", color: "#2a2a2a" }}>
                  Event Name
                </label>
                <input
                  type="text"
                  value={eventFormData.name || ""}
                  onChange={(e) => setEventFormData({ ...eventFormData, name: e.target.value })}
                  placeholder="e.g., Basketball Practice"
                  className="w-full mt-2 px-3 py-2 rounded-lg text-sm"
                  style={{
                    background: "rgba(255, 255, 255, 0.5)",
                    border: "1px solid rgba(255, 255, 255, 0.5)",
                    fontFamily: "'Poppins', sans-serif",
                    color: "#2a2a2a",
                  }}
                />
              </div>

              <div>
                <label className="text-xs font-semibold" style={{ fontFamily: "'Poppins', sans-serif", color: "#2a2a2a" }}>
                  Type
                </label>
                <div className="flex gap-2 mt-2">
                  {["extracurricular", "event"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setEventFormData({ ...eventFormData, type: type as any })}
                      className="flex-1 px-3 py-2 rounded-lg text-xs font-semibold transition-all"
                      style={{
                        background: eventFormData.type === type ? "#5a8f7b" : "rgba(255, 255, 255, 0.3)",
                        color: eventFormData.type === type ? "#faf9f6" : "#6b6b6b",
                        fontFamily: "'Poppins', sans-serif",
                        border: eventFormData.type === type ? "none" : "1px solid rgba(255, 255, 255, 0.5)",
                      }}
                    >
                      {type === "extracurricular" ? "🎭 Extracurricular" : "📅 Event"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold" style={{ fontFamily: "'Poppins', sans-serif", color: "#2a2a2a" }}>
                  Icon
                </label>
                <div className="grid grid-cols-6 gap-2 mt-2">
                  {EMOJIS.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setEventFormData({ ...eventFormData, emoji })}
                      className="p-2 rounded-lg text-lg transition-all"
                      style={{
                        background: eventFormData.emoji === emoji ? "rgba(90, 143, 123, 0.2)" : "rgba(255, 255, 255, 0.3)",
                        border: eventFormData.emoji === emoji ? "2px solid #5a8f7b" : "1px solid rgba(255, 255, 255, 0.5)",
                      }}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold" style={{ fontFamily: "'Poppins', sans-serif", color: "#2a2a2a" }}>
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={eventFormData.startTime || "18:00"}
                    onChange={(e) => setEventFormData({ ...eventFormData, startTime: e.target.value })}
                    className="w-full mt-2 px-3 py-2 rounded-lg text-sm"
                    style={{
                      background: "rgba(255, 255, 255, 0.5)",
                      border: "1px solid rgba(255, 255, 255, 0.5)",
                      fontFamily: "'Poppins', sans-serif",
                      color: "#2a2a2a",
                    }}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold" style={{ fontFamily: "'Poppins', sans-serif", color: "#2a2a2a" }}>
                    End Time
                  </label>
                  <input
                    type="time"
                    value={eventFormData.endTime || "19:00"}
                    onChange={(e) => setEventFormData({ ...eventFormData, endTime: e.target.value })}
                    className="w-full mt-2 px-3 py-2 rounded-lg text-sm"
                    style={{
                      background: "rgba(255, 255, 255, 0.5)",
                      border: "1px solid rgba(255, 255, 255, 0.5)",
                      fontFamily: "'Poppins', sans-serif",
                      color: "#2a2a2a",
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold" style={{ fontFamily: "'Poppins', sans-serif", color: "#2a2a2a" }}>
                  Repeat On (Select Days)
                </label>
                <div className="grid grid-cols-7 gap-2 mt-2">
                  {DAYS_OF_WEEK.map((day, idx) => (
                    <button
                      key={idx}
                      onClick={() => toggleDayOfWeek(idx)}
                      className="p-2 rounded-lg text-xs font-semibold transition-all"
                      style={{
                        background: (eventFormData.daysOfWeek || []).includes(idx) ? "#5a8f7b" : "rgba(255, 255, 255, 0.3)",
                        color: (eventFormData.daysOfWeek || []).includes(idx) ? "#faf9f6" : "#6b6b6b",
                        fontFamily: "'Poppins', sans-serif",
                        border: (eventFormData.daysOfWeek || []).includes(idx) ? "none" : "1px solid rgba(255, 255, 255, 0.5)",
                      }}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold" style={{ fontFamily: "'Poppins', sans-serif", color: "#2a2a2a" }}>
                  Color
                </label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {COLOR_PRESETS.map((color) => (
                    <button
                      key={color}
                      onClick={() => setEventFormData({ ...eventFormData, color })}
                      className="w-full h-10 rounded-lg transition-all flex items-center justify-center"
                      style={{
                        background: color,
                        border: eventFormData.color === color ? "3px solid #2a2a2a" : "1px solid rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      {eventFormData.color === color && <Check className="w-4 h-4" style={{ color: "#faf9f6" }} />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleAddEvent}
                  className="flex-1 px-4 py-2 rounded-lg font-medium text-sm"
                  style={{
                    background: "#5a8f7b",
                    color: "#faf9f6",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {editingEventId ? "Save Changes" : "Create Event"}
                </button>
                <button
                  onClick={handleCancelForms}
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

          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
              Your Events & Extracurriculars ({events.length})
            </h3>
            {!showEventForm && (
              <button
                onClick={() => setShowEventForm(true)}
                className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold"
                style={{
                  background: "#5a8f7b",
                  color: "#faf9f6",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                <Plus className="w-4 h-4" />
                Add Event
              </button>
            )}
          </div>

          <div className="space-y-3">
            {events.map((event) => (
              <div
                key={event.id}
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
                    style={{ background: `${event.color}20` }}
                  >
                    {event.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
                      {event.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span
                        className="text-xs px-2 py-0.5 rounded-lg"
                        style={{
                          background: `${event.color}20`,
                          color: event.color,
                          fontFamily: "'Poppins', sans-serif",
                        }}
                      >
                        🕐 {event.startTime} – {event.endTime}
                      </span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-lg"
                        style={{
                          background: "rgba(90, 143, 123, 0.1)",
                          color: "#5a8f7b",
                          fontFamily: "'Poppins', sans-serif",
                        }}
                      >
                        🔄 {event.daysOfWeek.map((d) => DAYS_OF_WEEK[d]).join(", ")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditEvent(event)}
                    className="p-2 rounded-lg transition-all"
                    style={{
                      background: "rgba(255, 255, 255, 0.3)",
                      color: "#6b6b6b",
                    }}
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
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
        </div>
      )}
    </div>
  );
}
