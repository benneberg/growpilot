import * as React from "react";
import { AuditScores } from "../types";
import { Card, CardContent } from "./ui/Card";
import { Progress } from "./ui/Progress";
import { cn } from "../lib/utils";

export function ScoreCards({ scores }: { scores: AuditScores }) {
  const items = [
    { label: "SEO", value: scores.seo, color: "bg-emerald-500" },
    { label: "Technical", value: scores.technical, color: "bg-blue-500" },
    { label: "Content", value: scores.contentClarity, color: "bg-amber-500" },
    { label: "Docs", value: scores.docsQuality, color: "bg-purple-500" },
    { label: "GitHub", value: scores.githubMaturity, color: "bg-slate-700" },
    { label: "Conversion", value: scores.conversionReadiness, color: "bg-rose-500" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {items.map((item) => (
        <Card key={item.label} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                {item.label}
              </span>
              <span className="text-sm font-bold text-slate-900">{item.value}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-slate-100">
              <div
                className={cn("h-full rounded-full transition-all duration-1000", item.color)}
                style={{ width: `${item.value}%` }}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
