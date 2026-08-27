// Auto-extracted TypeScript type definitions
// Generated: 2026-08-27 10:22 UTC
// Types annotated with 'used in:' show cross-file import relationships.


// -- src/components/ui/Badge.tsx --
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "destructive" | "success" | "warning";
}


// -- src/components/ui/Progress.tsx --
export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
}


// -- src/lib/firebaseErrors.ts --
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}
// used in: src/hooks/useFirebaseAuth.ts, src/store/useAuditStore.ts

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}


// -- src/types.ts --
export type AuditMode =
  | "quick_website"
  | "seo_deep_dive"
  | "product_understanding"
  | "github_analysis"
  | "docs_analysis"
  | "competitor_benchmark"
  | "launch_readiness"
  | "conversion_review"
  | "local_seo";
// used in: src/components/AuditLauncher.tsx, src/store/useAuditStore.ts

export type AuditInput = {
  mode: AuditMode;
// used in: src/components/AuditLauncher.tsx, src/lib/gemini.ts, src/store/useAuditStore.ts

export type SourceType =
  | "website_page"
  | "homepage"
  | "pricing_page"
  | "feature_page"
  | "docs_page"
  | "tutorial"
  | "api_reference"
  | "blog_page"
  | "legal_page"
  | "readme"
  | "changelog"
  | "repo_meta"
  | "package_manifest"
  | "source_file"
  | "support_page"
  | "social_proof_page";

export type Source = {
  id: string;

export type EvidenceRef = {
  sourceId: string;
// used in: src/components/CompetitorView.tsx, src/components/EvidenceExplorer.tsx, src/components/EvidenceView.tsx

export type Insight = {
  id: string;
// used in: src/components/AuditOverview.tsx, src/components/ContentMessagingView.tsx, src/components/DocsGithubView.tsx, src/components/FindingsPanel.tsx, src/components/TechnicalSEOView.tsx (+1 more)

export type GeneratedAsset = {
  id: string;
// used in: src/components/CreativeLab.tsx, src/components/CreativeView.tsx, src/lib/gemini.ts

export type Recommendation = {
  id: string;
// used in: src/components/AuditOverview.tsx, src/components/PriorityMatrix.tsx, src/components/RemediationLab.tsx, src/components/RemediationView.tsx, src/lib/gemini.ts

export type AuditScores = {
  seo: number;
// used in: src/components/ScoreCards.tsx

export type ComparisonFinding = {
  type: "competitor_gap" | "change_detected" | "contradiction";
// used in: src/components/CompetitorView.tsx

export type AuditReport = {
  auditId: string;
// used in: src/App.tsx, src/components/AuditOverview.tsx, src/components/AuditTabs.tsx, src/components/CreativeView.tsx, src/lib/gemini.ts

export type AuditStatus = "queued" | "running" | "partial" | "completed" | "failed";

export type AuditRecord = {
  id: string;
// used in: src/hooks/useFirebaseAuth.ts, src/store/useAuditStore.ts
