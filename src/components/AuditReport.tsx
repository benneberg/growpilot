import * as React from "react";
import { useAuditStore } from "../store/useAuditStore";
import { ReportHeader } from "./ReportHeader";
import { AuditTabs } from "./AuditTabs";
import { Skeleton } from "./ui/Skeleton";

export function AuditReport() {
  const { audits, currentAuditId } = useAuditStore();
  const audit = audits.find((a) => a.id === currentAuditId);

  if (!audit) return null;

  if (audit.status === "running") {
    return (
      <div className="mx-auto max-w-7xl py-12 px-4 space-y-8">
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Skeleton className="h-24 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
        </div>
        <Skeleton className="h-[600px] rounded-xl" />
      </div>
    );
  }

  if (!audit.report) return null;

  return (
    <div className="min-h-screen bg-white pb-24">
      <ReportHeader auditId={audit.id} />
      <AuditTabs report={audit.report} />
    </div>
  );
}
