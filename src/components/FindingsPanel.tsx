import * as React from "react";
import { AlertTriangle, CheckCircle2, Info, ArrowUpRight, ShieldCheck } from "lucide-react";
import { Insight } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { cn } from "../lib/utils";

export function FindingsPanel({ insights }: { insights: Insight[] }) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-red-600 bg-red-50 border-red-100";
      case "high": return "text-orange-600 bg-orange-50 border-orange-100";
      case "medium": return "text-amber-600 bg-amber-50 border-amber-100";
      case "low": return "text-emerald-600 bg-emerald-50 border-emerald-100";
      default: return "text-slate-600 bg-slate-50 border-slate-100";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">Key Findings</h2>
        <div className="flex gap-2">
          <Badge variant="outline" className="cursor-pointer hover:bg-slate-50">Critical</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-slate-50">High</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-slate-50">Medium</Badge>
        </div>
      </div>

      <div className="grid gap-4">
        {insights.map((insight) => (
          <Card key={insight.id} className="group relative overflow-hidden border-2 border-transparent hover:border-slate-200 transition-all">
            <div className={cn("absolute left-0 top-0 h-full w-1", 
              insight.severity === "critical" ? "bg-red-500" : 
              insight.severity === "high" ? "bg-orange-500" : 
              insight.severity === "medium" ? "bg-amber-500" : "bg-emerald-500"
            )} />
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={cn("uppercase tracking-wider text-[10px]", getSeverityColor(insight.severity))}>
                      {insight.severity}
                    </Badge>
                    <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">{insight.category}</Badge>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{insight.claim}</h3>
                  <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    <div className="flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3" />
                      {Math.round(insight.confidence * 100)}% Confidence
                    </div>
                    <div className="flex items-center gap-1">
                      <ArrowUpRight className="h-3 w-3" />
                      {insight.impact} Impact
                    </div>
                  </div>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
