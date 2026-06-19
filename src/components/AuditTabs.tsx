import * as React from "react";
import { LayoutDashboard, Search, Type, Github, Target, Code, Sparkles, ShieldCheck, Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/Tabs";
import { AuditOverview } from "./AuditOverview";
import { TechnicalSEOView } from "./TechnicalSEOView";
import { ContentMessagingView } from "./ContentMessagingView";
import { DocsGithubView } from "./DocsGithubView";
import { CompetitorView } from "./CompetitorView";
import { RemediationView } from "./RemediationView";
import { CreativeView } from "./CreativeView";
import { EvidenceView } from "./EvidenceView";
import { ExportActions } from "./ExportActions";
import { AuditReport } from "../types";

export function AuditTabs({ report }: { report: AuditReport }) {
  return (
    <div className="mx-auto max-w-7xl py-8">
      <Tabs defaultValue="overview" className="space-y-8">
        <div className="sticky top-0 z-10 -mx-4 overflow-x-auto bg-white/80 px-4 py-2 backdrop-blur-md md:mx-0 md:px-0">
          <TabsList className="bg-slate-100/50 p-1">
            <TabsTrigger value="overview" className="gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="seo" className="gap-2">
              <Search className="h-4 w-4" />
              SEO
            </TabsTrigger>
            <TabsTrigger value="content" className="gap-2">
              <Type className="h-4 w-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="tech" className="gap-2">
              <Github className="h-4 w-4" />
              Tech
            </TabsTrigger>
            <TabsTrigger value="competitors" className="gap-2">
              <Target className="h-4 w-4" />
              Competitors
            </TabsTrigger>
            <TabsTrigger value="remediation" className="gap-2">
              <Code className="h-4 w-4" />
              Remediation
            </TabsTrigger>
            <TabsTrigger value="creative" className="gap-2">
              <Sparkles className="h-4 w-4" />
              Creative
            </TabsTrigger>
            <TabsTrigger value="evidence" className="gap-2">
              <ShieldCheck className="h-4 w-4" />
              Evidence
            </TabsTrigger>
            <TabsTrigger value="export" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview">
          <AuditOverview report={report} />
        </TabsContent>
        <TabsContent value="seo">
          <TechnicalSEOView insights={report.insights} />
        </TabsContent>
        <TabsContent value="content">
          <ContentMessagingView insights={report.insights} />
        </TabsContent>
        <TabsContent value="tech">
          <DocsGithubView insights={report.insights} />
        </TabsContent>
        <TabsContent value="competitors">
          <CompetitorView comparisons={report.comparisons} />
        </TabsContent>
        <TabsContent value="remediation">
          <RemediationView recommendations={report.recommendations} />
        </TabsContent>
        <TabsContent value="creative">
          <CreativeView report={report} />
        </TabsContent>
        <TabsContent value="evidence">
          <EvidenceView evidence={report.evidence} />
        </TabsContent>
        <TabsContent value="export">
          <ExportActions />
        </TabsContent>
      </Tabs>
    </div>
  );
}
