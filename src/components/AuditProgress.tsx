import * as React from "react";
import { motion } from "motion/react";
import { Search, Globe, Github, FileText, Cpu, Zap, ShieldCheck, Sparkles, Loader2 } from "lucide-react";
import { Card, CardContent } from "./ui/Card";
import { Progress } from "./ui/Progress";

const stages = [
  { id: "normalize", label: "Normalizing Inputs", icon: Search },
  { id: "discover", label: "Discovering Sources", icon: Globe },
  { id: "fetch", label: "Fetching Snapshots", icon: Zap },
  { id: "classify", label: "Classifying Content", icon: Cpu },
  { id: "extract", label: "Extracting Signals", icon: ShieldCheck },
  { id: "synthesize", label: "AI Synthesis", icon: Sparkles },
];

export function AuditProgress() {
  const [currentStage, setCurrentStage] = React.useState(0);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const stageInterval = setInterval(() => {
      setCurrentStage((prev) => (prev < stages.length - 1 ? prev + 1 : prev));
    }, 3000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev < 95 ? prev + Math.random() * 2 : prev));
    }, 200);

    return () => {
      clearInterval(stageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center py-24">
      <div className="relative mb-12">
        <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400/20" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-emerald-600 text-white shadow-2xl shadow-emerald-200">
          <Loader2 className="h-12 w-12 animate-spin" />
        </div>
      </div>

      <div className="mb-12 text-center">
        <h2 className="mb-2 text-3xl font-bold tracking-tight text-slate-900">
          Analyzing Growth Signals
        </h2>
        <p className="text-slate-500">
          GrowPilot is crawling your sources and synthesizing technical insights...
        </p>
      </div>

      <Card className="w-full overflow-hidden border-2 border-emerald-100 shadow-xl shadow-emerald-50/50">
        <CardContent className="p-8">
          <div className="mb-8 space-y-2">
            <div className="flex justify-between text-sm font-bold uppercase tracking-widest text-slate-400">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {stages.map((stage, idx) => {
              const Icon = stage.icon;
              const isActive = idx === currentStage;
              const isCompleted = idx < currentStage;

              return (
                <div
                  key={stage.id}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border p-4 transition-all",
                    isActive ? "border-emerald-200 bg-emerald-50 shadow-sm" : 
                    isCompleted ? "border-slate-100 bg-slate-50 opacity-60" : 
                    "border-slate-100 bg-white opacity-40"
                  )}
                >
                  <div className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg",
                    isActive ? "bg-emerald-600 text-white" : 
                    isCompleted ? "bg-emerald-100 text-emerald-600" : 
                    "bg-slate-100 text-slate-400"
                  )}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className={cn(
                    "text-sm font-medium",
                    isActive ? "text-emerald-900" : 
                    isCompleted ? "text-emerald-700" : 
                    "text-slate-400"
                  )}>
                    {stage.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="active-dot"
                      className="ml-auto h-2 w-2 rounded-full bg-emerald-600"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
