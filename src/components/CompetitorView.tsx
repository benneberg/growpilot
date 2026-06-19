import * as React from "react";
import { Search, Globe, Github, FileText, CheckCircle2, AlertTriangle, Info, ShieldCheck, Target, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Progress } from "./ui/Progress";
import { ComparisonFinding, EvidenceRef } from "../types";
import { cn } from "../lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/Table";

export function CompetitorView({ comparisons }: { comparisons: ComparisonFinding[] }) {
  return (
    <div className="mx-auto max-w-5xl py-12">
      <div className="mb-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-600 text-white shadow-xl shadow-amber-200">
          <Target className="h-8 w-8" />
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900">
          Competitor Benchmark
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-500">
          Compare your product's growth signals against key competitors to identify gaps and opportunities.
        </p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Feature Gap Analysis</CardTitle>
            <CardDescription>Direct comparison of key features and growth levers.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Feature / Signal</TableHead>
                  <TableHead>Your Product</TableHead>
                  <TableHead>Competitor A</TableHead>
                  <TableHead>Competitor B</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { feature: "AI Integration", you: true, compA: true, compB: false },
                  { feature: "Public Docs", you: true, compA: true, compB: true },
                  { feature: "Open Source", you: true, compA: false, compB: false },
                  { feature: "Self-Serve", you: false, compA: true, compB: true },
                  { feature: "API Access", you: true, compA: true, compB: false },
                ].map((row) => (
                  <TableRow key={row.feature}>
                    <TableCell className="font-medium">{row.feature}</TableCell>
                    <TableCell>{row.you ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <XCircle className="h-4 w-4 text-slate-300" />}</TableCell>
                    <TableCell>{row.compA ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <XCircle className="h-4 w-4 text-slate-300" />}</TableCell>
                    <TableCell>{row.compB ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <XCircle className="h-4 w-4 text-slate-300" />}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {comparisons.map((finding, idx) => (
            <Card key={idx} className="overflow-hidden border-2 border-slate-100 hover:border-amber-200 transition-all">
              <CardHeader className="bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="uppercase tracking-wider text-[10px] text-amber-700 bg-amber-50 border-amber-100">
                    {finding.type.replace("_", " ")}
                  </Badge>
                  <span className="text-xs text-slate-400">{Math.round(finding.confidence * 100)}% Confidence</span>
                </div>
                <CardTitle className="mt-2 text-lg">{finding.summary}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600 italic">
                  "{finding.evidence[0]?.excerpt || "Strategic gap identified based on competitive analysis."}"
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function XCircle({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="15" y1="9" x2="9" y2="15"></line>
      <line x1="9" y1="9" x2="15" y2="15"></line>
    </svg>
  );
}
