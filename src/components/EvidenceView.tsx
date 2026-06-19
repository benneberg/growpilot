import * as React from "react";
import { Search, Globe, Github, FileText, CheckCircle2, AlertTriangle, Info, ShieldCheck, ExternalLink, Filter, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { EvidenceRef } from "../types";
import { cn } from "../lib/utils";

export function EvidenceView({ evidence }: { evidence: EvidenceRef[] }) {
  const [search, setSearch] = React.useState("");

  const filteredEvidence = evidence.filter(
    (e) =>
      e.sourceId.toLowerCase().includes(search.toLowerCase()) ||
      e.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      e.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-5xl py-12">
      <div className="mb-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-xl shadow-slate-200">
          <ShieldCheck className="h-8 w-8" />
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900">
          Evidence Explorer
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-500">
          Verify every claim made in your growth audit against the original source data from your website, GitHub, and docs.
        </p>
      </div>

      <div className="mb-8 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search evidence by source, excerpt, or location..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="grid gap-6">
        {filteredEvidence.map((ref, idx) => (
          <Card key={idx} className="overflow-hidden border-2 border-slate-100 hover:border-slate-300 transition-all">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="w-full border-b border-slate-100 bg-slate-50/50 p-6 md:w-64 md:border-b-0 md:border-r">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm">
                    {ref.sourceId.includes("github") ? <Github className="h-5 w-5" /> : 
                     ref.sourceId.includes("docs") ? <FileText className="h-5 w-5" /> : 
                     <Globe className="h-5 w-5" />}
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Source ID</p>
                    <p className="truncate text-sm font-bold text-slate-900">{ref.sourceId}</p>
                  </div>
                  <div className="mt-4 space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Location</p>
                    <p className="truncate text-xs text-slate-500">{ref.location}</p>
                  </div>
                </div>
                <div className="flex-1 p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
                      Confidence: {Math.round(ref.confidence * 100)}%
                    </Badge>
                    <Button variant="ghost" size="sm" className="h-8 gap-2 text-xs text-slate-500">
                      View Source
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="rounded-xl border border-slate-100 bg-white p-4">
                    <p className="text-sm leading-relaxed text-slate-600 italic">
                      "{ref.excerpt}"
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                    <Info className="h-3 w-3" />
                    This evidence supports 3 insights in your report.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
