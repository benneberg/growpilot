import * as React from "react";
import { 
  BarChart3, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  ExternalLink, 
  ChevronRight, 
  Zap, 
  Target, 
  ShieldCheck, 
  Clock, 
  User, 
  ArrowUpRight,
  Download,
  Share2,
  RefreshCw,
  Search,
  Globe,
  Github,
  FileText
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer, 
  Cell,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";
import ReactMarkdown from "react-markdown";
import { AuditReport as AuditReportType, Insight, Recommendation } from "../types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Progress } from "./ui/Progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/Tabs";
import { Button } from "./ui/Button";
import { cn, formatDate } from "../lib/utils";
import { Tooltip } from "./ui/Tooltip";
import { useAuditStore } from "../store/useAuditStore";

export function AuditOverview({ report }: { report: AuditReportType }) {
  const scoreData = [
    { name: "SEO", value: report.scores.seo },
    { name: "Technical", value: report.scores.technical },
    { name: "Content", value: report.scores.contentClarity },
    { name: "Docs", value: report.scores.docsQuality },
    { name: "GitHub", value: report.scores.githubMaturity },
    { name: "Conversion", value: report.scores.conversionReadiness },
    { name: "Alignment", value: report.scores.alignment },
  ];

  const radarData = scoreData.map(s => ({ subject: s.name, A: s.value, fullMark: 100 }));

  return (
    <div className="space-y-8">
      {/* Summary & Scores */}
      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Executive Summary</CardTitle>
            <CardDescription>High-level overview of findings and strategic direction.</CardDescription>
          </CardHeader>
          <CardContent className="prose prose-slate max-w-none">
            <ReactMarkdown>{report.summary}</ReactMarkdown>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Growth Scores</CardTitle>
            <CardDescription>Performance across key dimensions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Score"
                    dataKey="A"
                    stroke="#059669"
                    fill="#10b981"
                    fillOpacity={0.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-3">
              {scoreData.map((s) => (
                <div key={s.name} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-600">{s.name}</span>
                    <span className="text-slate-900">{s.value}%</span>
                  </div>
                  <Progress value={s.value} className="h-1.5" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">Overall Confidence</p>
              <ShieldCheck className="h-5 w-5 text-emerald-500" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <h3 className="text-3xl font-bold text-slate-900">{report.scores.confidence}%</h3>
              <Badge variant="success" className="bg-emerald-100 text-emerald-700 border-emerald-200">High</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">Sources Analyzed</p>
              <Globe className="h-5 w-5 text-blue-500" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <h3 className="text-3xl font-bold text-slate-900">{report.coverage.sourceCount}</h3>
              <span className="text-xs text-slate-400">Pages & Repos</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">Critical Issues</p>
              <AlertTriangle className="h-5 w-5 text-amber-500" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <h3 className="text-3xl font-bold text-slate-900">
                {report.insights.filter(i => i.severity === "critical").length}
              </h3>
              <span className="text-xs text-slate-400">Require Action</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">Recs Generated</p>
              <Zap className="h-5 w-5 text-purple-500" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <h3 className="text-3xl font-bold text-slate-900">{report.recommendations.length}</h3>
              <span className="text-xs text-slate-400">Prioritized Tasks</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
