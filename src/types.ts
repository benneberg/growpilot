/**
 * GrowPilot Technical Implementation Types
 */

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

export type AuditInput = {
  mode: AuditMode;
  websiteUrl?: string;
  docsUrl?: string;
  githubUrl?: string;
  sitemapUrl?: string;
  competitorUrls?: string[];
  keywords?: string[];
  notes?: string;
  files?: string[]; // file IDs
  includeLinkedSources?: boolean;
};

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
  sourceType: SourceType;
  location: string; // url or file path
  title?: string;
  discoveredFrom?: string;
  relevanceScore?: number;
  fetchStatus?: "pending" | "ok" | "error" | "skipped";
};

export type EvidenceRef = {
  sourceId: string;
  location: string;
  excerpt?: string;
  confidence?: number;
};

export type Insight = {
  id: string;
  category:
    | "seo"
    | "technical"
    | "content"
    | "docs"
    | "github"
    | "conversion"
    | "brand"
    | "competitor";
  severity: "low" | "medium" | "high" | "critical";
  claim: string;
  observedOrInferred: "observed" | "inferred";
  evidence: EvidenceRef[];
  confidence: number; // 0-1
  impact: "low" | "medium" | "high";
  effort: "low" | "medium" | "high";
  owner?: "engineering" | "seo" | "content" | "design" | "marketing" | "product";
};

export type GeneratedAsset = {
  id: string;
  assetType:
    | "ad_copy"
    | "social_post"
    | "meta_rewrite"
    | "schema_snippet"
    | "landing_copy"
    | "landing_headline"
    | "content_brief"
    | "comparison_outline"
    | "code_fix";
  type?: GeneratedAsset["assetType"];
  content: string;
  format?: "text" | "html" | "json" | "code";
  platform?: string;
  title?: string;
};

export type Recommendation = {
  id: string;
  title: string;
  category: Insight["category"];
  rationale: string;
  description?: string;
  steps: string[];
  implementationSteps?: string[];
  expectedImpact: string;
  impact?: "low" | "medium" | "high";
  effort: "low" | "medium" | "high";
  priority?: "low" | "medium" | "high" | "critical";
  owner?: Insight["owner"];
  relatedInsightIds: string[];
  assets?: GeneratedAsset[];
  codeSnippet?: string;
};

export type AuditScores = {
  seo: number;
  technical: number;
  contentClarity: number;
  docsQuality: number;
  githubMaturity: number;
  conversionReadiness: number;
  alignment: number;
  confidence: number;
};

export type ComparisonFinding = {
  type: "competitor_gap" | "change_detected" | "contradiction";
  summary: string;
  evidence: EvidenceRef[];
  confidence: number;
};

export type AuditReport = {
  auditId: string;
  summary: string;
  scores: AuditScores;
  insights: Insight[];
  recommendations: Recommendation[];
  comparisons?: ComparisonFinding[];
  evidenceIndex: EvidenceRef[];
  evidence?: EvidenceRef[];
  generatedAssets?: GeneratedAsset[];
  coverage: {
    sourceCount: number;
    sourceTypes: SourceType[];
    missingCriticalSources: string[];
  };
};

export type AuditStatus = "queued" | "running" | "partial" | "completed" | "failed";

export type AuditRecord = {
  id: string;
  workspaceId: string;
  userId?: string;
  status: AuditStatus;
  mode: AuditMode;
  input: AuditInput;
  report?: AuditReport;
  createdAt: string;
  updatedAt: string;
};
