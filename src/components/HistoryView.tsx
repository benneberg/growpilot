import * as React from "react";
import { History, Search, Clock, ChevronRight, Trash2, MoreVertical, Globe, Github, FileText } from "lucide-react";
import { useAuditStore } from "../store/useAuditStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { formatDate, cn } from "../lib/utils";
import { Input } from "./ui/Input";

export function HistoryView() {
  const { audits, setCurrentAudit } = useAuditStore();
  const [search, setSearch] = React.useState("");

  const filteredAudits = audits.filter(
    (a) =>
      a.input.websiteUrl?.toLowerCase().includes(search.toLowerCase()) ||
      a.input.githubUrl?.toLowerCase().includes(search.toLowerCase()) ||
      a.mode.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-5xl py-12">
      <div className="mb-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-xl shadow-emerald-200">
          <History className="h-8 w-8" />
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900">
          Audit History
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-500">
          Access all your past growth audits, compare results over time, and track your product's progress.
        </p>
      </div>

      <div className="mb-8 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search audits by URL or mode..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">All Audits</Badge>
          <Badge variant="outline">Completed</Badge>
          <Badge variant="outline">Running</Badge>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredAudits.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-slate-300">
              <Clock className="h-8 w-8" />
            </div>
            <p className="text-lg font-bold text-slate-400">No audits found</p>
            <p className="text-sm text-slate-300">Launch your first audit to see it here.</p>
            <Button variant="primary" className="mt-6" onClick={() => setCurrentAudit(null)}>
              Launch New Audit
            </Button>
          </div>
        ) : (
          filteredAudits.map((audit) => (
            <Card
              key={audit.id}
              className="group cursor-pointer overflow-hidden border-2 border-slate-100 hover:border-emerald-200 transition-all"
              onClick={() => setCurrentAudit(audit.id)}
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
                      {audit.input.githubUrl ? <Github className="h-6 w-6" /> : 
                       audit.input.docsUrl ? <FileText className="h-6 w-6" /> : 
                       <Globe className="h-6 w-6" />}
                    </div>
                    <div>
                      <div className="mb-1 flex items-center gap-2">
                        <Badge variant="outline" className="uppercase tracking-wider text-[10px]">
                          {audit.mode.replace("_", " ")}
                        </Badge>
                        <span className="text-xs text-slate-400">
                          {formatDate(audit.createdAt)}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {audit.input.websiteUrl || audit.input.githubUrl || "Untitled Audit"}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Status</p>
                      <Badge variant={audit.status === "completed" ? "success" : "warning"}>
                        {audit.status}
                      </Badge>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      <ChevronRight className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
