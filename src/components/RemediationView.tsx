import * as React from "react";
import { Code, Terminal, CheckCircle2, AlertTriangle, Copy, ExternalLink, ShieldCheck, Zap, Cpu, Search, Globe, Github, FileText, User, Award, Layout, Flame } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { useToast } from "./ui/Toast";
import { Recommendation } from "../types";
import { cn } from "../lib/utils";

type RoleType = "engineering" | "marketing" | "seo" | "product" | "design" | "content";

interface RoleMetadata {
  id: RoleType;
  title: string;
  icon: React.ReactNode;
  bgGradient: string;
  textMuted: string;
  badgeStyle: string;
  guidance: string;
}

export function RemediationView({ recommendations }: { recommendations: Recommendation[] }) {
  const { addToast } = useToast();
  const [selectedRole, setSelectedRole] = React.useState<RoleType>("engineering");

  const roles: RoleMetadata[] = [
    {
      id: "engineering",
      title: "Engineering",
      icon: <Code className="h-5 w-5" />,
      bgGradient: "from-blue-600 to-indigo-600 shadow-blue-100",
      textMuted: "text-blue-100",
      badgeStyle: "bg-blue-50 text-blue-700 border-blue-100",
      guidance: "Implement technical fixes, optimize code quality, configure proper web vitals, and clean up dead code and dependencies."
    },
    {
      id: "seo",
      title: "SEO Specialist",
      icon: <Search className="h-5 w-5" />,
      bgGradient: "from-emerald-600 to-teal-600 shadow-emerald-100",
      textMuted: "text-emerald-100",
      badgeStyle: "bg-emerald-50 text-emerald-700 border-emerald-100",
      guidance: "Optimize search engine signals, refine robots.txt/sitemaps, set meta tags, and structured JSON-LD schema snippets."
    },
    {
      id: "marketing",
      title: "Marketing & Growth",
      icon: <Zap className="h-5 w-5" />,
      bgGradient: "from-purple-600 to-pink-600 shadow-purple-100",
      textMuted: "text-purple-100",
      badgeStyle: "bg-purple-50 text-purple-700 border-purple-100",
      guidance: "Increase conversion rate optimization (CRO), run ad campaign A/B trials, and configure analytics / tracking scripts."
    },
    {
      id: "product",
      title: "Product Manager",
      icon: <Cpu className="h-5 w-5" />,
      bgGradient: "from-slate-700 to-slate-900 shadow-slate-200",
      textMuted: "text-slate-300",
      badgeStyle: "bg-slate-100 text-slate-800 border-slate-200",
      guidance: "Align feature prioritization with market gaps, address core onboarding friction, and enhance value proposition logic."
    },
    {
      id: "content",
      title: "Content Strategist",
      icon: <FileText className="h-5 w-5" />,
      bgGradient: "from-amber-500 to-orange-600 shadow-amber-100",
      textMuted: "text-amber-100",
      badgeStyle: "bg-amber-50 text-amber-700 border-amber-100",
      guidance: "Clarify technical documentation, enrich developer tutorials, and rewrite confusing or complex copy."
    },
    {
      id: "design",
      title: "UX/UI Designer",
      icon: <Layout className="h-5 w-5" />,
      bgGradient: "from-rose-500 to-red-600 shadow-rose-100",
      textMuted: "text-rose-100",
      badgeStyle: "bg-rose-50 text-rose-700 border-rose-100",
      guidance: "Refine responsive behaviors, enhance layout visual hierarchy, increase contrast, and improve mobile interactive targets."
    }
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    addToast("Code snippet copied to clipboard!", "success");
  };

  const getRoleFromRec = (rec: Recommendation): RoleType => {
    if (!rec.owner) return "product";
    const owner = rec.owner.toLowerCase();
    if (owner === "engineering" || owner === "tech" || owner === "technical") return "engineering";
    if (owner === "seo") return "seo";
    if (owner === "marketing" || owner === "growth") return "marketing";
    if (owner === "product" || owner === "pm") return "product";
    if (owner === "content" || owner === "copy") return "content";
    if (owner === "design" || owner === "ux" || owner === "ui") return "design";
    return "product";
  };

  // Group recommendations by their target role
  const groupedRecs = recommendations.reduce<Record<RoleType, Recommendation[]>>((acc, rec) => {
    const role = getRoleFromRec(rec);
    if (!acc[role]) acc[role] = [];
    acc[role].push(rec);
    return acc;
  }, {
    engineering: [],
    seo: [],
    marketing: [],
    product: [],
    content: [],
    design: []
  });

  const activeRecs = groupedRecs[selectedRole] || [];
  const activeRoleMeta = roles.find(r => r.id === selectedRole)!;

  return (
    <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-200">
          <Award className="h-8 w-8" />
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900">
          Role-Specific Action Plans
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-500">
          Personalized growth checklists, technical code fixes, and strategy guides categorized by likely owner.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Left Sidebar Roles Switcher */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm space-y-2">
            <h3 className="px-3 mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">
              Select Role Plan
            </h3>
            <div className="space-y-1.5">
              {roles.map((role) => {
                const count = (groupedRecs[role.id] || []).length;
                const isSelected = selectedRole === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left",
                      isSelected
                        ? "bg-indigo-50 text-indigo-900 border-l-4 border-indigo-600 font-semibold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={cn(
                        "p-1.5 rounded-lg",
                        isSelected ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-500"
                      )}>
                        {role.icon}
                      </div>
                      <span>{role.title}</span>
                    </div>
                    {count > 0 && (
                      <Badge variant={isSelected ? "default" : "outline"} className={cn(
                        "rounded-full px-2 py-0.5 text-xs",
                        isSelected ? "bg-indigo-600 text-white" : "text-slate-500"
                      )}>
                        {count}
                      </Badge>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Statistics Summary Card */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold text-slate-900">Audit Fix Progress</CardTitle>
              <CardDescription className="text-xs">Role priorities overview.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3.5 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Flame className="h-4 w-4 text-red-500 shrink-0" />
                  Critical Priority
                </span>
                <Badge variant="destructive">
                  {recommendations.filter(r => r.priority === "critical").length}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
                  High Impact
                </span>
                <Badge variant="warning">
                  {recommendations.filter(r => r.priority === "high").length}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  Medium & Low
                </span>
                <Badge variant="outline">
                  {recommendations.filter(r => r.priority === "medium" || r.priority === "low").length}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Main Recommendations List */}
        <div className="lg:col-span-3 space-y-6">
          {/* Header Dashboard Banner for Selected Role */}
          <div className={cn(
            "rounded-2xl p-6 bg-gradient-to-r text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4",
            activeRoleMeta.bgGradient
          )}>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-white/20 rounded-xl">
                  {activeRoleMeta.icon}
                </div>
                <h2 className="text-2xl font-bold tracking-tight">
                  {activeRoleMeta.title} Action Plan
                </h2>
              </div>
              <p className={cn("text-sm max-w-xl leading-relaxed", activeRoleMeta.textMuted)}>
                {activeRoleMeta.guidance}
              </p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-3xl font-extrabold">{activeRecs.length}</div>
              <div className="text-xs uppercase tracking-wider opacity-75 font-semibold">Recommendations</div>
            </div>
          </div>

          {activeRecs.length === 0 ? (
            <Card className="flex flex-col items-center justify-center py-16 text-center border-dashed border-2 border-slate-200">
              <div className="mb-4 rounded-full bg-slate-50 p-6">
                <ShieldCheck className="h-12 w-12 text-slate-300" />
              </div>
              <h3 className="text-lg font-medium text-slate-900">All clear for this role!</h3>
              <p className="mx-auto max-w-xs text-sm text-slate-500 mt-1">
                No active critical action plan items detected for the {activeRoleMeta.title} role in this GrowPilot audit.
              </p>
            </Card>
          ) : (
            <div className="space-y-6">
              {activeRecs.map((rec, idx) => {
                const stepList = rec.implementationSteps || rec.steps || [];
                return (
                  <Card key={rec.id || idx} className="overflow-hidden border border-slate-200/80 hover:shadow-md transition-all duration-200">
                    <CardHeader className="bg-slate-50/50 pb-4 border-b border-slate-100">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Badge variant={rec.priority === "critical" ? "destructive" : rec.priority === "high" ? "warning" : "outline"} className="uppercase tracking-wider text-[10px]">
                            {rec.priority || "Medium"}
                          </Badge>
                          <Badge variant="outline" className={cn("capitalize text-[10px]", activeRoleMeta.badgeStyle)}>
                            {rec.category}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <div className="flex items-center gap-1">
                            <Zap className="h-3.5 w-3.5 text-amber-500" />
                            <span className="font-semibold text-slate-700">{rec.impact || rec.expectedImpact || "High"} Impact</span>
                          </div>
                          <span className="text-slate-300">|</span>
                          <span className="text-slate-500">Effort: <strong className="text-slate-700 capitalize">{rec.effort}</strong></span>
                        </div>
                      </div>
                      <CardTitle className="mt-3 text-xl text-slate-900 font-bold leading-tight">{rec.title}</CardTitle>
                      <CardDescription className="text-slate-600 mt-1 text-sm leading-relaxed">{rec.rationale}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                          <Terminal className="h-4 w-4 text-indigo-600 shrink-0" />
                          Tailored Implementation Plan
                        </h4>
                        <ul className="space-y-3">
                          {stepList.map((step, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {rec.codeSnippet && (
                        <div className="space-y-2 pt-2 border-t border-slate-100">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                              <Code className="h-4 w-4 text-blue-600 shrink-0" />
                              Actionable Code Fix / Configuration
                            </h4>
                            <Button variant="ghost" size="sm" className="h-8 gap-2 text-xs text-slate-500" onClick={() => handleCopy(rec.codeSnippet!)}>
                              <Copy className="h-3 w-3" />
                              Copy Code
                            </Button>
                          </div>
                          <div className="relative overflow-hidden rounded-xl bg-slate-900 p-4 font-mono text-xs text-slate-300">
                            <pre className="overflow-x-auto">
                              <code>{rec.codeSnippet}</code>
                            </pre>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

