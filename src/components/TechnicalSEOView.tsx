import * as React from "react";
import { Search, Globe, Github, FileText, CheckCircle2, AlertTriangle, Info, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Progress } from "./ui/Progress";
import { Insight } from "../types";
import { cn } from "../lib/utils";

export function TechnicalSEOView({ insights }: { insights: Insight[] }) {
  const seoInsights = insights.filter(i => i.category === "seo" || i.category === "technical");

  return (
    <div className="mx-auto max-w-5xl py-12">
      <div className="mb-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-xl shadow-emerald-200">
          <Search className="h-8 w-8" />
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900">
          Technical SEO Audit
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-500">
          Deep analysis of your site's technical structure, indexability, and search visibility signals.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO Health</CardTitle>
              <CardDescription>Overall technical SEO performance.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center justify-center py-6">
                <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-8 border-emerald-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-emerald-600">84%</span>
                  </div>
                  <svg className="h-full w-full -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      fill="transparent"
                      stroke="#10b981"
                      strokeWidth="8"
                      strokeDasharray="351.858"
                      strokeDashoffset={351.858 * (1 - 0.84)}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Indexability</span>
                  <Badge variant="success">Good</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Schema Markup</span>
                  <Badge variant="warning">Partial</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Core Web Vitals</span>
                  <Badge variant="success">Pass</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-slate-900">SEO Findings</h2>
          <div className="space-y-4">
            {seoInsights.map((insight) => (
              <Card key={insight.id} className="overflow-hidden border-2 border-slate-100 hover:border-emerald-200 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", 
                      insight.severity === "critical" ? "bg-red-50 text-red-600" : 
                      insight.severity === "high" ? "bg-orange-50 text-orange-600" : 
                      "bg-emerald-50 text-emerald-600"
                    )}>
                      {insight.severity === "critical" ? <AlertTriangle className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="uppercase tracking-wider text-[10px]">{insight.severity}</Badge>
                        <span className="text-xs text-slate-400">{Math.round(insight.confidence * 100)}% Confidence</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">{insight.claim}</h3>
                      <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600 italic">
                        "{insight.evidence[0]?.excerpt}"
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
