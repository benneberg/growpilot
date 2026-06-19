import * as React from "react";
import { Download, Share2, Globe, Github, FileText, Calendar, Clock, ChevronLeft, MoreVertical, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { useAuditStore } from "../store/useAuditStore";
import { formatDate, cn } from "../lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/DropdownMenu";

export function ReportHeader({ auditId }: { auditId: string }) {
  const { audits, setCurrentAudit } = useAuditStore();
  const audit = audits.find((a) => a.id === auditId);

  if (!audit) return null;

  return (
    <div className="mx-auto max-w-7xl py-8">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="h-10 w-10 p-0 text-slate-500" onClick={() => setCurrentAudit(null)}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
            {audit.input.githubUrl ? <Github className="h-6 w-6" /> : 
             audit.input.docsUrl ? <FileText className="h-6 w-6" /> : 
             <Globe className="h-6 w-6" />}
          </div>
          <div>
            <div className="mb-1 flex items-center gap-2">
              <Badge variant="outline" className="uppercase tracking-wider text-[10px] text-emerald-700 bg-emerald-50 border-emerald-100">
                {audit.mode.replace("_", " ")}
              </Badge>
              <span className="text-xs text-slate-400">
                {formatDate(audit.createdAt)}
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {audit.input.websiteUrl || audit.input.githubUrl || "Untitled Audit"}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-10 w-10 p-0 text-slate-500">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="gap-2">
                <ExternalLink className="h-4 w-4" />
                View Live Site
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 text-red-600">
                Delete Audit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-slate-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-400 shadow-sm">
                <Calendar className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Generated On</p>
                <p className="text-sm font-bold text-slate-900">{formatDate(audit.createdAt)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-400 shadow-sm">
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Audit Duration</p>
                <p className="text-sm font-bold text-slate-900">42 seconds</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-400 shadow-sm">
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Sources Analyzed</p>
                <p className="text-sm font-bold text-slate-900">12 pages, 1 repo</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
