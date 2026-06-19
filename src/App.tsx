import * as React from "react";
import { useAuditStore } from "./store/useAuditStore";
import { Navbar } from "./components/ui/Navbar";
import { Footer } from "./components/ui/Footer";
import { AuditLauncher } from "./components/AuditLauncher";
import { AuditProgress } from "./components/AuditProgress";
import { AuditReport } from "./components/AuditReport";
import { Dashboard } from "./components/Dashboard";
import { HistoryView } from "./components/HistoryView";
import { SettingsView } from "./components/SettingsView";
import { Toaster } from "./components/ui/Toast";
import { PageTransition } from "./components/ui/Layout";
import { Onboarding } from "./components/Onboarding";

export default function App() {
  const { audits, currentAuditId, isLaunching } = useAuditStore();
  const [activeView, setActiveView] = React.useState<"dashboard" | "history" | "settings">("dashboard");
  const [showOnboarding, setShowOnboarding] = React.useState(false);

  React.useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem("growpilot_onboarding_completed");
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem("growpilot_onboarding_completed", "true");
    setShowOnboarding(false);
  };

  const currentAudit = audits.find((a) => a.id === currentAuditId);

  const renderContent = () => {
    if (currentAudit) {
      if (currentAudit.status === "running") {
        return <AuditProgress />;
      }
      return <AuditReport />;
    }

    if (isLaunching) {
      return <AuditProgress />;
    }

    switch (activeView) {
      case "dashboard":
        return <Dashboard />;
      case "history":
        return <HistoryView />;
      case "settings":
        return <SettingsView />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
        <Navbar 
          onNavigate={(view: any) => setActiveView(view)} 
          activeView={activeView}
        />
        
        <main className="relative z-0">
          <PageTransition key={currentAuditId || activeView}>
            {renderContent()}
          </PageTransition>
        </main>

        <Footer />
      </div>
      <Toaster />
      {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}
    </>
  );
}
