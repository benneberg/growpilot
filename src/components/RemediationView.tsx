import * as React from "react";
import { Code, Terminal, CheckCircle2, AlertTriangle, Copy, ExternalLink, ShieldCheck, Zap, Cpu, Search, Globe, Github, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/Tabs";
import { useToast } from "./ui/Toast";
import { Recommendation } from "../types";
import { cn } from "../lib/utils";

export function RemediationView({ recommendations }: { recommendations: Recommendation[] }) {
  const { addToast } = useToast();
  const techRecs = recommendations.filter(r => r.category === "technical" || r.category === "seo");

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    addToast("Code snippet copied to clipboard!", "success");
  };

  return (
    <div className="mx-auto max-w-5xl py-12">
      <div className="mb-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-200">
          <Code className="h-8 w-8" />
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900">
          Remediation Lab
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-500">
          Actionable code fixes and technical guidance based on your growth audit findings.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Fix Priority</CardTitle>
              <CardDescription>Prioritized technical debt and growth blockers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Critical Fixes</span>
                <Badge variant="destructive">{techRecs.filter(r => r.priority === "critical").length}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">High Impact</span>
                <Badge variant="warning">{techRecs.filter(r => r.priority === "high").length}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Medium Priority</span>
                <Badge variant="outline">{techRecs.filter(r => r.priority === "medium").length}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 text-white">
            <CardHeader>
              <CardTitle className="text-white">Developer Tip</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-400">
                Start with critical SEO fixes to improve your search visibility signals within the next 30 days.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-slate-900">Technical Recommendations</h2>
          <div className="space-y-6">
            {techRecs.map((rec, idx) => (
              <Card key={idx} className="overflow-hidden border-2 border-slate-100 hover:border-indigo-200 transition-all">
                <CardHeader className="bg-slate-50/50">
                  <div className="flex items-center justify-between">
                    <Badge variant={rec.priority === "critical" ? "destructive" : rec.priority === "high" ? "warning" : "outline"} className="uppercase tracking-wider text-[10px]">
                      {rec.priority}
                    </Badge>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Zap className="h-3 w-3 text-amber-500" />
                      {rec.impact} Impact
                    </div>
                  </div>
                  <CardTitle className="mt-2 text-lg">{rec.title}</CardTitle>
                  <CardDescription>{rec.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-slate-900">Implementation Steps</h4>
                    <ul className="space-y-2">
                      {rec.implementationSteps.map((step, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {rec.codeSnippet && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-slate-900">Code Snippet</h4>
                        <Button variant="ghost" size="sm" className="h-8 gap-2 text-xs text-slate-500" onClick={() => handleCopy(rec.codeSnippet!)}>
                          <Copy className="h-3 w-3" />
                          Copy
                        </Button>
                      </div>
                      <div className="relative overflow-hidden rounded-xl bg-slate-900 p-4 font-mono text-xs text-slate-300">
                        <pre className="overflow-x-auto">
                          <code>{rec.codeSnippet}</code>
                        </pre>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
