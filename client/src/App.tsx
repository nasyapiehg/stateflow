import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Dashboard from "./pages/Dashboard";
import WeeklySchedule from "./pages/WeeklySchedule";
import StudyPlanner from "./pages/StudyPlanner";
import WorkloadBalance from "./pages/WorkloadBalance";
import MissedSessions from "./pages/MissedSessions";
import Settings from "./pages/Settings";
import Onboarding from "./pages/Onboarding";
import ExamMode from "./pages/ExamMode";
import AppLayout from "./components/AppLayout";

function Router() {
  const isOnboarded = localStorage.getItem("onboardingComplete");

  if (!isOnboarded) {
    return (
      <Switch>
        <Route path="/onboarding" component={Onboarding} />
        <Route component={Onboarding} />
      </Switch>
    );
  }

  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/schedule" component={WeeklySchedule} />
        <Route path="/planner" component={StudyPlanner} />
        <Route path="/balance" component={WorkloadBalance} />
        <Route path="/missed" component={MissedSessions} />
        <Route path="/settings" component={Settings} />
        <Route path="/exam-mode" component={ExamMode} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
