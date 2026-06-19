import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Search, Globe, Github, FileText, Plus, X, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "./ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { Select } from "./ui/Select";
import { Textarea } from "./ui/Textarea";
import { Badge } from "./ui/Badge";
import { useAuditStore } from "../store/useAuditStore";
import { AuditInput, AuditMode } from "../types";
import { generateAuditReport } from "../lib/gemini";
import { useToast } from "./ui/Toast";

const auditSchema = z.object({
  mode: z.string(),
  websiteUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  docsUrl: z.string().url().optional().or(z.literal("")),
  notes: z.string().optional(),
});

type AuditFormData = z.infer<typeof auditSchema>;

export function AuditLauncher() {
  const { addAudit, setCurrentAudit, setLaunching } = useAuditStore();
  const { addToast } = useToast();
  const [competitors, setCompetitors] = React.useState<string[]>([]);
  const [newCompetitor, setNewCompetitor] = React.useState("");
  const [keywords, setKeywords] = React.useState<string[]>([]);
  const [newKeyword, setNewKeyword] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AuditFormData>({
    resolver: zodResolver(auditSchema),
    defaultValues: {
      mode: "quick_website",
    },
  });

  const onSubmit = async (data: AuditFormData) => {
    try {
      setLaunching(true);
      const input: AuditInput = {
        mode: data.mode as AuditMode,
        websiteUrl: data.websiteUrl || undefined,
        githubUrl: data.githubUrl || undefined,
        docsUrl: data.docsUrl || undefined,
        competitorUrls: competitors.length > 0 ? competitors : undefined,
        keywords: keywords.length > 0 ? keywords : undefined,
        notes: data.notes || undefined,
      };

      const auditId = Math.random().toString(36).substring(2, 9);
      const newAudit = {
        id: auditId,
        workspaceId: "default",
        status: "running" as const,
        mode: input.mode,
        input,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      addAudit(newAudit);
      setCurrentAudit(auditId);

      const report = await generateAuditReport(input);
      
      addAudit({
        ...newAudit,
        status: "completed",
        report,
        updatedAt: new Date().toISOString(),
      });
      
      addToast("Audit completed successfully!", "success");
    } catch (error) {
      console.error(error);
      addToast("Failed to launch audit. Please check your inputs.", "error");
    } finally {
      setLaunching(false);
    }
  };

  const addCompetitor = () => {
    if (newCompetitor && !competitors.includes(newCompetitor)) {
      setCompetitors([...competitors, newCompetitor]);
      setNewCompetitor("");
    }
  };

  const removeCompetitor = (url: string) => {
    setCompetitors(competitors.filter((c) => c !== url));
  };

  const addKeyword = () => {
    if (newKeyword && !keywords.includes(newKeyword)) {
      setKeywords([...keywords, newKeyword]);
      setNewKeyword("");
    }
  };

  const removeKeyword = (kw: string) => {
    setKeywords(keywords.filter((k) => k !== kw));
  };

  return (
    <div className="mx-auto max-w-4xl py-12">
      <div className="mb-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-xl shadow-emerald-200">
          <Sparkles className="h-8 w-8" />
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Launch Your Growth Audit
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-500">
          GrowPilot analyzes your website, docs, and code to generate evidence-backed growth strategies and technical remediation plans.
        </p>
      </div>

      <Card className="border-2 border-emerald-100 shadow-xl shadow-emerald-50/50">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50">
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-emerald-600" />
            Audit Configuration
          </CardTitle>
          <CardDescription>
            Select your audit mode and provide the necessary sources for analysis.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="mode">Audit Mode</Label>
                <Select id="mode" {...register("mode")}>
                  <option value="quick_website">Quick Website Audit</option>
                  <option value="seo_deep_dive">SEO Deep Dive</option>
                  <option value="product_understanding">Product Understanding</option>
                  <option value="github_analysis">GitHub Analysis</option>
                  <option value="docs_analysis">Docs Analysis</option>
                  <option value="competitor_benchmark">Competitor Benchmark</option>
                  <option value="launch_readiness">Launch Readiness</option>
                  <option value="conversion_review">Conversion Review</option>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="websiteUrl">Website URL</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="websiteUrl"
                    placeholder="https://example.com"
                    className="pl-10"
                    {...register("websiteUrl")}
                  />
                </div>
                {errors.websiteUrl && (
                  <p className="text-xs text-red-500">{errors.websiteUrl.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="githubUrl">GitHub Repository</Label>
                <div className="relative">
                  <Github className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="githubUrl"
                    placeholder="https://github.com/org/repo"
                    className="pl-10"
                    {...register("githubUrl")}
                  />
                </div>
                {errors.githubUrl && (
                  <p className="text-xs text-red-500">{errors.githubUrl.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="docsUrl">Documentation URL</Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="docsUrl"
                    placeholder="https://docs.example.com"
                    className="pl-10"
                    {...register("docsUrl")}
                  />
                </div>
                {errors.docsUrl && (
                  <p className="text-xs text-red-500">{errors.docsUrl.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <Label>Competitors</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="https://competitor.com"
                  value={newCompetitor}
                  onChange={(e) => setNewCompetitor(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCompetitor())}
                />
                <Button type="button" variant="outline" onClick={addCompetitor}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {competitors.map((url) => (
                  <Badge key={url} variant="secondary" className="pl-3 pr-1 py-1">
                    {url}
                    <button
                      type="button"
                      onClick={() => removeCompetitor(url)}
                      className="ml-2 rounded-full p-0.5 hover:bg-slate-200"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label>Target Keywords</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g. ai growth platform"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addKeyword())}
                />
                <Button type="button" variant="outline" onClick={addKeyword}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {keywords.map((kw) => (
                  <Badge key={kw} variant="outline" className="pl-3 pr-1 py-1">
                    {kw}
                    <button
                      type="button"
                      onClick={() => removeKeyword(kw)}
                      className="ml-2 rounded-full p-0.5 hover:bg-slate-200"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Context / Notes</Label>
              <Textarea
                id="notes"
                placeholder="Tell us more about your goals, target audience, or specific concerns..."
                className="min-h-[120px]"
                {...register("notes")}
              />
            </div>

            <Button
              type="submit"
              className="w-full py-6 text-lg"
              isLoading={isSubmitting}
            >
              Launch Pilot Audit
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
