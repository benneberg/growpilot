import * as React from "react";
import { Code, Copy, Check, Download, ExternalLink, Terminal, ShieldCheck, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/Tabs";
import { Recommendation } from "../types";
import { cn } from "../lib/utils";
import { useToast } from "./ui/Toast";

export function RemediationLab({ recommendations }: { recommendations: Recommendation[] }) {
  const { addToast } = useToast();
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    addToast("Copied to clipboard!", "success");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="mx-auto max-w-5xl py-12">
      <div className="mb-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-xl shadow-slate-200">
          <Code className="h-8 w-8" />
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900">
          Remediation Lab
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-500">
          Turn audit findings into production-ready code fixes, metadata rewrites, and technical schema.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Fix Categories</p>
            <div className="flex flex-col gap-1">
              {["SEO", "Technical", "Content", "Docs", "GitHub", "Conversion"].map((cat) => (
                <Button key={cat} variant="ghost" className="justify-start text-sm">
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-8">
          {recommendations.map((rec) => (
            <Card key={rec.id} className="overflow-hidden border-2 border-slate-100 shadow-lg shadow-slate-50/50">
              <CardHeader className="bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{rec.category}</Badge>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <ShieldCheck className="h-3 w-3" />
                    Verified Fix
                  </div>
                </div>
                <CardTitle className="mt-2">{rec.title}</CardTitle>
                <CardDescription>{rec.rationale}</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs value="implementation" onValueChange={() => {}} className="w-full">
                  <TabsList className="w-full justify-start rounded-none border-b border-slate-100 bg-white px-6 py-4">
                    <TabsTrigger value="implementation" className="text-xs">Implementation</TabsTrigger>
                    <TabsTrigger value="code" className="text-xs">Code Snippet</TabsTrigger>
                    <TabsTrigger value="preview" className="text-xs">Preview</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="implementation" className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                        <Terminal className="h-4 w-4 text-emerald-600" />
                        Step-by-Step Guide
                      </div>
                      <div className="space-y-3">
                        {rec.steps.map((step, idx) => (
                          <div key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-500">
                              {idx + 1}
                            </div>
                            {step}
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="code" className="p-0">
                    <div className="relative">
                      <div className="absolute right-4 top-4 flex gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="h-8 bg-white/10 text-white hover:bg-white/20"
                          onClick={() => copyToClipboard("// Example code snippet for " + rec.title, rec.id)}
                        >
                          {copiedId === rec.id ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        </Button>
                      </div>
                      <pre className="overflow-x-auto bg-slate-900 p-6 text-sm text-slate-300">
                        <code>
                          {`// GrowPilot Generated Fix
// Category: ${rec.category}
// Impact: ${rec.expectedImpact}

export function Remediation() {
  // Implementation details for ${rec.title}
  // 1. ${rec.steps[0]}
  // 2. ${rec.steps[1] || "Verify changes"}
  
  return (
    <div className="fix-container">
      {/* Optimized structure */}
    </div>
  );
}`}
                        </code>
                      </pre>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
