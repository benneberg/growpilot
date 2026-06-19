import * as React from "react";
import { LayoutDashboard, TrendingUp, Search, Globe, Github, FileText, Plus, ArrowUpRight, ArrowDownRight, Activity, Zap, Target } from "lucide-react";
import { useAuditStore } from "../store/useAuditStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { Progress } from "./ui/Progress";
import { formatDate, cn } from "../lib/utils";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", score: 65 },
  { name: "Feb", score: 72 },
  { name: "Mar", score: 68 },
  { name: "Apr", score: 78 },
  { name: "May", score: 82 },
  { name: "Jun", score: 84 },
];

export function Dashboard() {
  const { audits, setCurrentAudit } = useAuditStore();
  const latestAudit = audits[0];

  return (
    <div className="mx-auto max-w-7xl py-12">
      <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Growth Dashboard
          </h1>
          <p className="mt-2 text-lg text-slate-500">
            Track your product's growth signals and technical maturity over time.
          </p>
        </div>
        <Button size="lg" className="gap-2 shadow-xl shadow-emerald-200" onClick={() => setCurrentAudit(null)}>
          <Plus className="h-5 w-5" />
          New Audit
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-emerald-100 bg-emerald-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Overall Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">84</span>
              <span className="flex items-center text-xs font-bold text-emerald-600">
                <ArrowUpRight className="h-3 w-3" />
                +12%
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400">vs. last month</p>
          </CardContent>
        </Card>

        <Card className="border-blue-100 bg-blue-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">SEO Visibility</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">76</span>
              <span className="flex items-center text-xs font-bold text-blue-600">
                <ArrowUpRight className="h-3 w-3" />
                +5%
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400">vs. last month</p>
          </CardContent>
        </Card>

        <Card className="border-amber-100 bg-amber-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Tech Maturity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">68</span>
              <span className="flex items-center text-xs font-bold text-amber-600">
                <ArrowDownRight className="h-3 w-3" />
                -2%
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400">vs. last month</p>
          </CardContent>
        </Card>

        <Card className="border-purple-100 bg-purple-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Active Audits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">{audits.length}</span>
            </div>
            <p className="mt-1 text-xs text-slate-400">Total reports generated</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Growth Trend</CardTitle>
            <CardDescription>Your product's overall growth score over the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
                />
                <Area type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest growth signals and audit updates.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {audits.slice(0, 3).map((audit) => (
                <div key={audit.id} className="group flex items-center gap-4 cursor-pointer" onClick={() => setCurrentAudit(audit.id)}>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
                    {audit.input.githubUrl ? <Github className="h-5 w-5" /> : <Globe className="h-5 w-5" />}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate text-sm font-bold text-slate-900">{audit.input.websiteUrl || audit.input.githubUrl}</p>
                    <p className="text-xs text-slate-400">{formatDate(audit.createdAt)}</p>
                  </div>
                  <Badge variant="outline" className="text-[10px] uppercase">{audit.status}</Badge>
                </div>
              ))}
              {audits.length === 0 && (
                <div className="py-8 text-center text-sm text-slate-400">No recent activity</div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-slate-900 text-white">
            <CardHeader>
              <CardTitle className="text-white">Pro Tip</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-400">
                Connect your GitHub repository to get deeper insights into your technical maturity and developer experience.
              </p>
              <Button variant="outline" className="mt-4 w-full border-slate-700 text-white hover:bg-slate-800">
                Connect GitHub
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
