import * as React from "react";
import { Sparkles, Type, Share2, Download, Copy, ExternalLink, ShieldCheck, Zap, Cpu, Search, Globe, Github, FileText, Layout, Image as ImageIcon, Plus, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { useToast } from "./ui/Toast";
import { AuditReport, GeneratedAsset } from "../types";
import { cn } from "../lib/utils";
import { generateCreativeVariations } from "../lib/gemini";
import { useAuditStore } from "../store/useAuditStore";

export function CreativeView({ report }: { report: AuditReport }) {
  const { addToast } = useToast();
  const { updateAudit } = useAuditStore();
  const [isGenerating, setIsGenerating] = React.useState<string | null>(null);

  const assets = report.generatedAssets || [];

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    addToast("Content copied to clipboard!", "success");
  };

  const handleGenerateVariations = async (type: GeneratedAsset["assetType"]) => {
    try {
      setIsGenerating(type);
      const variations = await generateCreativeVariations(
        assets,
        type,
        report.insights,
        report.recommendations
      );

      const updatedReport = {
        ...report,
        generatedAssets: [...assets, ...variations]
      };

      updateAudit(report.auditId, { report: updatedReport });
      addToast(`Generated 3 variations for ${type.replace("_", " ")}!`, "success");
    } catch (error) {
      console.error(error);
      addToast("Failed to generate variations.", "error");
    } finally {
      setIsGenerating(null);
    }
  };

  const assetTypes: { label: string; type: GeneratedAsset["assetType"] }[] = [
    { label: "Ad Copy", type: "ad_copy" },
    { label: "Social Posts", type: "social_post" },
    { label: "Landing Headlines", type: "landing_headline" },
    { label: "Landing Page Copy", type: "landing_copy" },
  ];

  return (
    <div className="mx-auto max-w-5xl py-12">
      <div className="mb-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-xl shadow-purple-200">
          <Sparkles className="h-8 w-8" />
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900">
          Creative Lab
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-500">
          AI-powered marketing assets, copy, and creative briefs generated based on your growth audit.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Creative Inventory</CardTitle>
              <CardDescription>Click + to generate 3 more variations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {assetTypes.map(({ label, type }) => (
                <div key={type} className="flex items-center justify-between text-sm">
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-900">{label}</span>
                    <span className="text-xs text-slate-500">
                      {assets.filter(a => a.assetType === type).length} variants
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-purple-600 hover:bg-purple-50"
                    disabled={!!isGenerating}
                    onClick={() => handleGenerateVariations(type)}
                  >
                    {isGenerating === type ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-slate-900 text-white">
            <CardHeader>
              <CardTitle className="text-white">Creative Strategy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-400">
                GrowPilot uses your audit's highest confidence insights to ensure messaging is evidence-backed and aligned with your product's technical reality.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-8">
          {assetTypes.map(({ label, type }) => {
            const filteredAssets = assets.filter(a => a.assetType === type);
            if (filteredAssets.length === 0) return null;

            return (
              <div key={type} className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    {label}
                    <Badge variant="outline" className="text-[10px]">
                      {filteredAssets.length}
                    </Badge>
                  </h2>
                </div>
                <div className="space-y-4">
                  {filteredAssets.map((asset, idx) => (
                    <Card key={asset.id || idx} className="overflow-hidden border-2 border-slate-100 hover:border-purple-200 transition-all">
                      <CardHeader className="bg-slate-50/50 py-3">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="uppercase tracking-wider text-[10px] text-purple-700 bg-purple-50 border-purple-100">
                            {asset.type?.replace("_", " ") || asset.assetType?.replace("_", " ") || "Asset"}
                          </Badge>
                          {asset.platform && (
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                              <Layout className="h-3 w-3" />
                              {asset.platform}
                            </div>
                          )}
                        </div>
                        {asset.title && <CardTitle className="mt-1 text-base">{asset.title}</CardTitle>}
                      </CardHeader>
                      <CardContent className="p-5 space-y-4">
                        <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap italic">
                          "{asset.content}"
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-[11px] text-slate-500" onClick={() => handleCopy(asset.content)}>
                              <Copy className="h-3 w-3" />
                              Copy
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-[11px] text-slate-500" onClick={() => addToast("Asset exported successfully!", "success")}>
                              <Download className="h-3 w-3" />
                              Export
                            </Button>
                          </div>
                          <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-[11px] text-slate-500">
                            <Share2 className="h-3 w-3" />
                            Share
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}

          {assets.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 rounded-full bg-slate-50 p-6">
                <Sparkles className="h-12 w-12 text-slate-300" />
              </div>
              <h3 className="text-lg font-medium text-slate-900">No creative assets yet</h3>
              <p className="mx-auto max-w-xs text-sm text-slate-500">
                Click the + build buttons in the inventory to generate content variations based on your audit.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
