import * as React from "react";
import { Search, Globe, Github, FileText, CheckCircle2, ExternalLink, ChevronRight, Info, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card";
import { Input } from "./ui/Input";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { EvidenceRef } from "../types";
import { cn } from "../lib/utils";

export function EvidenceExplorer({ evidence }: { evidence: EvidenceRef[] }) {
  const [search, setSearch] = React.useState("");

  const filteredEvidence = evidence.filter(
    (ev) =>
      ev.location.toLowerCase().includes(search.toLowerCase()) ||
      ev.excerpt?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-5xl py-12">
      <div className="mb-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-200">
          <ShieldCheck className="h-8 w-8" />
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900">
          Evidence Explorer
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-500">
          Verify every claim made in the audit by exploring the original sources and excerpts used for analysis.
        </p>
      </div>

      <div className="mb-8 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search evidence by location or excerpt..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">All Sources</Badge>
          <Badge variant="outline">Website Only</Badge>
          <Badge variant="outline">GitHub Only</Badge>
        </div>
      </div>

      <div className="space-y-4">
        {filteredEvidence.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-slate-300">
              <Search className="h-8 w-8" />
            </div>
            <p className="text-lg font-bold text-slate-400">No evidence found</p>
            <p className="text-sm text-slate-300">Try adjusting your search or filters.</p>
          </div>
        ) : (
          filteredEvidence.map((ev, idx) => (
            <Card key={idx} className="overflow-hidden border-2 border-slate-100 hover:border-blue-200 transition-all">
              <div className="flex flex-col md:flex-row">
                <div className="flex flex-col items-center justify-center border-b border-slate-100 bg-slate-50 p-6 md:w-48 md:border-b-0 md:border-r">
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                    {ev.location.includes("github.com") ? <Github className="h-6 w-6 text-slate-600" /> : 
                     ev.location.includes("docs") ? <FileText className="h-6 w-6 text-slate-600" /> : 
                     <Globe className="h-6 w-6 text-slate-600" />}
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Source ID</p>
                  <p className="text-sm font-bold text-slate-900">#{ev.sourceId}</p>
                </div>
                
                <div className="flex-1 p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Verified Source</Badge>
                      <span className="text-xs text-slate-400 truncate max-w-[200px] md:max-w-md">
                        {ev.location}
                      </span>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={ev.location} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                  
                  <div className="rounded-xl bg-slate-50 p-6">
                    <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                      <Info className="h-3 w-3" />
                      Original Excerpt
                    </div>
                    <p className="text-sm leading-relaxed text-slate-700 italic">
                      "{ev.excerpt || "No excerpt available for this source."}"
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
