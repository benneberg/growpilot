import * as React from "react";
import { Search, History, Clock, ChevronRight, Trash2, MoreVertical } from "lucide-react";
import { useAuditStore } from "../store/useAuditStore";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { formatDate, cn } from "../lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";

export function HistorySidebar() {
  const { audits, currentAuditId, setCurrentAudit } = useAuditStore();

  return (
    <Card className="h-full border-0 bg-white shadow-none">
      <CardHeader className="px-4 py-6">
        <CardTitle className="flex items-center gap-2 text-lg">
          <History className="h-5 w-5 text-emerald-600" />
          Audit History
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2 py-0">
        <div className="space-y-1">
          {audits.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-300">
                <Clock className="h-6 w-6" />
              </div>
              <p className="text-sm font-medium text-slate-400">No audits yet</p>
              <p className="text-xs text-slate-300">Your audit history will appear here.</p>
            </div>
          ) : (
            audits.map((audit) => (
              <div
                key={audit.id}
                onClick={() => setCurrentAudit(audit.id)}
                className={cn(
                  "group relative flex cursor-pointer items-center justify-between rounded-xl p-3 transition-all hover:bg-slate-50",
                  currentAuditId === audit.id ? "bg-emerald-50 text-emerald-900 shadow-sm ring-1 ring-emerald-100" : "text-slate-600"
                )}
              >
                <div className="flex-1 overflow-hidden">
                  <div className="mb-1 flex items-center gap-2">
                    <Badge variant="outline" className="h-4 px-1.5 text-[10px] uppercase tracking-wider">
                      {audit.mode.replace("_", " ")}
                    </Badge>
                    <span className="text-[10px] text-slate-400">
                      {formatDate(audit.createdAt)}
                    </span>
                  </div>
                  <p className="truncate text-sm font-bold">
                    {audit.input.websiteUrl || audit.input.githubUrl || "Untitled Audit"}
                  </p>
                </div>
                
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="right" className="w-40">
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <ChevronRight className="h-4 w-4 text-slate-300" />
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
