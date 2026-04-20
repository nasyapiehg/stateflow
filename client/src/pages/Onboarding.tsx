/**
 * Onboarding — StateFlow "Study Your Way" 4-step flow
 * Step 1: Why StateFlow? (value prop)
 * Step 2: Tell Us About You (personalization)
 * Step 3: Your Courses (quick add)
 * Step 4: Your First Week (schedule generation)
 */
import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useLocation } from "wouter";

interface UserProfile {
  name: string;
  school: string;
  major: string;
  year: string;
}

interface Course {
  id: string;
  name: string;
  emoji: string;
  color: string;
  weeklyHours: number;
  difficulty: "Easy" | "Medium" | "Hard";
}

const MAJOR_OPTIONS = ["Biology", "Chemistry", "Physics", "Mathematics", "Pre-Med", "Engineering", "Computer Science", "Other"];
const YEAR_OPTIONS = ["Freshman", "Sophomore", "Junior", "Senior"];
const COLORS = ["#c9956f", "#5a8f7b", "#8b7a6b", "#6b8f7f", "#a89968", "#7a9b8e"];
const EMOJIS = ["🧪", "⚗️", "🧬", "∫", "⚡", "🔬"];

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    school: "",
    major: "",
    year: "",
  });
  const [courses, setCourses] = useState<Course[]>([]);
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    emoji: EMOJIS[0],
    color: COLORS[0],
    weeklyHours: 5,
    difficulty: "Medium",
  });

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else {
      // Save onboarding state and redirect to dashboard
      localStorage.setItem("onboardingComplete", "true");
      localStorage.setItem("userProfile", JSON.stringify(profile));
      localStorage.setItem("courses", JSON.stringify(courses));
      setLocation("/");
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const addCourse = () => {
    if (newCourse.name) {
      setCourses([
        ...courses,
        {
          id: `course-${Date.now()}`,
          name: newCourse.name,
          emoji: newCourse.emoji || EMOJIS[0],
          color: newCourse.color || COLORS[0],
          weeklyHours: newCourse.weeklyHours || 5,
          difficulty: newCourse.difficulty || "Medium",
        },
      ]);
      setNewCourse({
        emoji: EMOJIS[0],
        color: COLORS[0],
        weeklyHours: 5,
        difficulty: "Medium",
      });
    }
  };

  const removeCourse = (id: string) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen" style={{ background: "#faf9f6" }}>
      {/* Progress bar */}
      <div className="h-1 bg-gray-200" style={{ background: "#e8e5e0" }}>
        <div
          className="h-full transition-all"
          style={{
            background: "#5a8f7b",
            width: `${(step / 4) * 100}%`,
          }}
        />
      </div>

      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-2xl">
          {/* Step 1: Why StateFlow? */}
          {step === 1 && (
            <div className="animate-fade-up text-center">
              <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
                Welcome to StateFlow 🌟
              </h1>
              <p className="text-lg mb-8" style={{ fontFamily: "'Poppins', sans-serif", color: "#6b6b6b", fontWeight: 300 }}>
                Most planning apps treat you like a robot. StateFlow treats you like a human.
              </p>
              <div className="space-y-4 mb-8">
                <div
                  className="p-6 rounded-lg"
                  style={{
                    background: "rgba(255, 255, 255, 0.5)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.6)",
                  }}
                >
                  <p className="text-base" style={{ fontFamily: "'Poppins', sans-serif", color: "#6b6b6b", fontWeight: 300 }}>
                    ✓ We know your schedule breaks. We know you'll miss sessions. We know you need flexibility, not guilt.
                  </p>
                </div>
                <div
                  className="p-6 rounded-lg"
                  style={{
                    background: "rgba(255, 255, 255, 0.5)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.6)",
                  }}
                >
                  <p className="text-base" style={{ fontFamily: "'Poppins', sans-serif", color: "#6b6b6b", fontWeight: 300 }}>
                    ✓ StateFlow adapts to you. Not the other way around.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Tell Us About You */}
          {step === 2 && (
            <div className="animate-fade-up">
              <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
                Tell Us About You
              </h2>
              <p className="text-sm mb-6" style={{ fontFamily: "'Poppins', sans-serif", color: "#6b6b6b", fontWeight: 300 }}>
                This helps us tailor StateFlow to your needs
              </p>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold" style={{ fontFamily: "'Poppins', sans-serif", color: "#2a2a2a" }}>
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full mt-2 p-3 rounded-lg border"
                    style={{
                      background: "rgba(255, 255, 255, 0.5)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255, 255, 255, 0.6)",
                      fontFamily: "'Poppins', sans-serif",
                      color: "#2a2a2a",
                    }}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold" style={{ fontFamily: "'Poppins', sans-serif", color: "#2a2a2a" }}>
                    School/University
                  </label>
                  <input
                    type="text"
                    placeholder="Your school"
                    value={profile.school}
                    onChange={(e) => setProfile({ ...profile, school: e.target.value })}
                    className="w-full mt-2 p-3 rounded-lg border"
                    style={{
                      background: "rgba(255, 255, 255, 0.5)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255, 255, 255, 0.6)",
                      fontFamily: "'Poppins', sans-serif",
                      color: "#2a2a2a",
                    }}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold" style={{ fontFamily: "'Poppins', sans-serif", color: "#2a2a2a" }}>
                    Major
                  </label>
                  <select
                    value={profile.major}
                    onChange={(e) => setProfile({ ...profile, major: e.target.value })}
                    className="w-full mt-2 p-3 rounded-lg border"
                    style={{
                      background: "rgba(255, 255, 255, 0.5)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255, 255, 255, 0.6)",
                      fontFamily: "'Poppins', sans-serif",
                      color: "#2a2a2a",
                    }}
                  >
                    <option value="">Select a major</option>
                    {MAJOR_OPTIONS.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold" style={{ fontFamily: "'Poppins', sans-serif", color: "#2a2a2a" }}>
                    Year
                  </label>
                  <select
                    value={profile.year}
                    onChange={(e) => setProfile({ ...profile, year: e.target.value })}
                    className="w-full mt-2 p-3 rounded-lg border"
                    style={{
                      background: "rgba(255, 255, 255, 0.5)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255, 255, 255, 0.6)",
                      fontFamily: "'Poppins', sans-serif",
                      color: "#2a2a2a",
                    }}
                  >
                    <option value="">Select your year</option>
                    {YEAR_OPTIONS.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Your Courses */}
          {step === 3 && (
            <div className="animate-fade-up">
              <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
                Your Courses
              </h2>
              <p className="text-sm mb-6" style={{ fontFamily: "'Poppins', sans-serif", color: "#6b6b6b", fontWeight: 300 }}>
                Add your courses — you can add more later
              </p>

              {/* Course list */}
              <div className="space-y-3 mb-6">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="p-4 rounded-lg flex items-center justify-between"
                    style={{
                      background: "rgba(255, 255, 255, 0.5)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255, 255, 255, 0.6)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{course.emoji}</span>
                      <div>
                        <p className="font-semibold text-sm" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
                          {course.name}
                        </p>
                        <p className="text-xs" style={{ fontFamily: "'Poppins', sans-serif", color: "#8b8b8b", fontWeight: 300 }}>
                          {course.weeklyHours}h/week · {course.difficulty}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeCourse(course.id)}
                      className="text-xs px-2 py-1 rounded"
                      style={{ background: "rgba(201, 149, 111, 0.1)", color: "#c9956f" }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              {/* Add course form */}
              <div
                className="p-4 rounded-lg space-y-3"
                style={{
                  background: "rgba(255, 255, 255, 0.5)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.6)",
                }}
              >
                <input
                  type="text"
                  placeholder="Course name (e.g., Organic Chemistry I)"
                  value={newCourse.name || ""}
                  onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                  className="w-full p-2 rounded text-sm"
                  style={{
                    background: "rgba(255, 255, 255, 0.3)",
                    border: "1px solid rgba(255, 255, 255, 0.6)",
                    fontFamily: "'Poppins', sans-serif",
                    color: "#2a2a2a",
                  }}
                />
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-xs" style={{ fontFamily: "'Poppins', sans-serif", color: "#8b8b8b" }}>
                      Emoji
                    </label>
                    <select
                      value={newCourse.emoji || EMOJIS[0]}
                      onChange={(e) => setNewCourse({ ...newCourse, emoji: e.target.value })}
                      className="w-full p-2 rounded text-sm mt-1"
                      style={{
                        background: "rgba(255, 255, 255, 0.3)",
                        border: "1px solid rgba(255, 255, 255, 0.6)",
                        fontFamily: "'Poppins', sans-serif",
                        color: "#2a2a2a",
                      }}
                    >
                      {EMOJIS.map((e) => (
                        <option key={e} value={e}>
                          {e}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs" style={{ fontFamily: "'Poppins', sans-serif", color: "#8b8b8b" }}>
                      Hours/week
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={newCourse.weeklyHours || 5}
                      onChange={(e) => setNewCourse({ ...newCourse, weeklyHours: parseInt(e.target.value) })}
                      className="w-full p-2 rounded text-sm mt-1"
                      style={{
                        background: "rgba(255, 255, 255, 0.3)",
                        border: "1px solid rgba(255, 255, 255, 0.6)",
                        fontFamily: "'Poppins', sans-serif",
                        color: "#2a2a2a",
                      }}
                    />
                  </div>
                  <div>
                    <label className="text-xs" style={{ fontFamily: "'Poppins', sans-serif", color: "#8b8b8b" }}>
                      Difficulty
                    </label>
                    <select
                      value={newCourse.difficulty || "Medium"}
                      onChange={(e) => setNewCourse({ ...newCourse, difficulty: e.target.value as "Easy" | "Medium" | "Hard" })}
                      className="w-full p-2 rounded text-sm mt-1"
                      style={{
                        background: "rgba(255, 255, 255, 0.3)",
                        border: "1px solid rgba(255, 255, 255, 0.6)",
                        fontFamily: "'Poppins', sans-serif",
                        color: "#2a2a2a",
                      }}
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={addCourse}
                  className="w-full p-2 rounded font-semibold text-sm transition-all"
                  style={{
                    background: "#5a8f7b",
                    color: "#faf9f6",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Add Course
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Your First Week */}
          {step === 4 && (
            <div className="animate-fade-up">
              <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
                Your First Week
              </h2>
              <p className="text-sm mb-6" style={{ fontFamily: "'Poppins', sans-serif", color: "#6b6b6b", fontWeight: 300 }}>
                We've generated a study plan based on your courses. You can change this anytime.
              </p>

              <div
                className="p-6 rounded-lg text-center"
                style={{
                  background: "rgba(255, 255, 255, 0.5)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.6)",
                }}
              >
                <p className="text-4xl mb-3">📚</p>
                <p className="font-semibold mb-2" style={{ fontFamily: "'Lora', serif", color: "#2a2a2a" }}>
                  {courses.length} courses ready to go
                </p>
                <p className="text-sm" style={{ fontFamily: "'Poppins', sans-serif", color: "#6b6b6b", fontWeight: 300 }}>
                  {courses.reduce((sum, c) => sum + c.weeklyHours, 0)} hours/week planned
                </p>
                <p className="text-xs mt-4" style={{ fontFamily: "'Poppins', sans-serif", color: "#8b8b8b", fontWeight: 300 }}>
                  Your study blocks are ready in the Dashboard. Start with today's first session!
                </p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12 gap-4">
            <button
              onClick={handlePrev}
              disabled={step === 1}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50"
              style={{
                background: step === 1 ? "transparent" : "rgba(255, 255, 255, 0.5)",
                color: "#2a2a2a",
                fontFamily: "'Poppins', sans-serif",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.6)",
              }}
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={
                (step === 2 && !profile.name) ||
                (step === 3 && courses.length === 0)
              }
              className="flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-all disabled:opacity-50"
              style={{
                background: "#5a8f7b",
                color: "#faf9f6",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {step === 4 ? "Let's Go!" : "Next"}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
