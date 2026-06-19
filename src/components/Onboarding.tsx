import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Search, Globe, Github, FileText, ShieldCheck, Sparkles, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/Button";
import { Card, CardContent } from "./ui/Card";
import { cn } from "../lib/utils";

interface OnboardingStep {
  title: string;
  description: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export function Onboarding({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = React.useState(0);

  const steps: OnboardingStep[] = [
    {
      title: "Welcome to GrowPilot",
      description: "Your AI-powered growth intelligence platform.",
      icon: <Sparkles className="h-8 w-8 text-emerald-600" />,
      content: (
        <div className="space-y-4">
          <p className="text-slate-600">
            GrowPilot analyzes your entire product ecosystem to find growth opportunities, fix technical debt, and benchmark against competitors.
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-center">
              <Globe className="mx-auto mb-2 h-6 w-6 text-emerald-600" />
              <div className="text-xs font-bold">Websites</div>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-center">
              <Github className="mx-auto mb-2 h-6 w-6 text-slate-900" />
              <div className="text-xs font-bold">GitHub</div>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-center">
              <FileText className="mx-auto mb-2 h-6 w-6 text-blue-600" />
              <div className="text-xs font-bold">Docs</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Launch Content-Rich Audits",
      description: "Deep technical and marketing analysis.",
      icon: <Search className="h-8 w-8 text-blue-600" />,
      content: (
        <div className="space-y-4 text-sm text-slate-600">
          <p>
            Choose from multiple audit modes like <strong>Quick Website</strong> or <strong>SEO Deep Dive</strong>.
          </p>
          <ul className="space-y-2">
            <li className="flex gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Provide your Website URL for SEO and content checks.</span>
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Connect GitHub to analyze repo maturity and code quality.</span>
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Link Documentation to ensure user-readiness and technical clarity.</span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "Evidence-Grounded Insights",
      description: "We don't just guess, we verify.",
      icon: <ShieldCheck className="h-8 w-8 text-emerald-600" />,
      content: (
        <div className="space-y-4 text-sm text-slate-600">
          <p>
            Every insight we provide is backed by <strong>Evidence</strong>. Look for the shield icon in your reports.
          </p>
          <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
            <div className="mb-2 flex items-center gap-2 font-bold text-emerald-900">
              <ShieldCheck className="h-4 w-4" />
              Confidence Scores (0-100)
            </div>
            <p className="text-xs text-emerald-700">
              We provide a confidence score for every claim. Higher scores mean we found direct evidence. Lower scores indicate inferences based on common patterns.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Ready to Start?",
      description: "Launch your first growth pilot today.",
      icon: <CheckCircle2 className="h-8 w-8 text-emerald-600" />,
      content: (
        <div className="space-y-4 text-center">
          <p className="text-slate-600">
            Let's get started by launching your first audit. You can enter a website URL right now.
          </p>
          <Button onClick={onComplete} className="w-full py-6 text-lg">
            Complete Onboarding
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      ),
    },
  ];

  const next = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setCurrentStep((s) => Math.max(s - 1, 0));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <Card className="overflow-hidden border-2 border-emerald-100 shadow-2xl">
          <CardContent className="p-0">
            <div className="relative h-2 bg-slate-100">
              <motion.div
                className="absolute inset-y-0 left-0 bg-emerald-600"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
            <div className="p-8">
              <div className="mb-8 flex justify-center">
                <div className="rounded-2xl bg-slate-50 p-4 shadow-inner">
                  {steps[currentStep].icon}
                </div>
              </div>
              <div className="mb-6 text-center">
                <h2 className="mb-2 text-2xl font-bold text-slate-900">
                  {steps[currentStep].title}
                </h2>
                <p className="text-slate-500">
                  {steps[currentStep].description}
                </p>
              </div>
              <div className="mb-10 min-h-[160px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {steps[currentStep].content}
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {currentStep < steps.length - 1 && (
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    onClick={prev}
                    className={cn(currentStep === 0 && "invisible")}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <div className="flex gap-1">
                    {steps.map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          "h-1.5 w-1.5 rounded-full transition-all",
                          i === currentStep ? "w-4 bg-emerald-600" : "bg-slate-200"
                        )}
                      />
                    ))}
                  </div>
                  <Button onClick={next}>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
