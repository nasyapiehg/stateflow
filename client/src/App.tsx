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
import AppLayout from "./components/AppLayout";

function Router() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/schedule" component={WeeklySchedule} />
        <Route path="/planner" component={StudyPlanner} />
        <Route path="/balance" component={WorkloadBalance} />
        <Route path="/missed" component={MissedSessions} />
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
