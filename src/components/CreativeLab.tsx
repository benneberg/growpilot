import * as React from "react";
import { Sparkles, Copy, Check, Download, Share2, Type, Image as ImageIcon, Send, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/Tabs";
import { GeneratedAsset } from "../types";
import { cn } from "../lib/utils";
import { useToast } from "./ui/Toast";

export function CreativeLab({ assets }: { assets: GeneratedAsset[] }) {
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
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-xl shadow-emerald-200">
          <Sparkles className="h-8 w-8" />
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900">
          Creative Lab
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-500">
          Generate high-converting copy, social posts, and ad creative based on your audit findings.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {assets.map((asset) => (
          <Card key={asset.id} className="overflow-hidden border-2 border-slate-100 shadow-lg shadow-slate-50/50 hover:border-emerald-200 transition-all">
            <CardHeader className="bg-slate-50/50">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="uppercase tracking-wider text-[10px]">
                  {asset.assetType.replace("_", " ")}
                </Badge>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Sparkles className="h-3 w-3 text-emerald-500" />
                  AI Generated
                </div>
              </div>
              <CardTitle className="mt-2 text-lg">
                {asset.assetType === "ad_copy" ? "Ad Campaign Copy" : 
                 asset.assetType === "social_post" ? "Social Media Post" : 
                 asset.assetType === "landing_copy" ? "Landing Page Hero" : "Content Brief"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="relative rounded-xl bg-slate-50 p-6 text-sm text-slate-700 leading-relaxed min-h-[150px]">
                <div className="absolute right-2 top-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => copyToClipboard(asset.content, asset.id)}
                  >
                    {copiedId === asset.id ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                {asset.content}
              </div>
              
              <div className="mt-6 flex items-center justify-between gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button variant="primary" size="sm" className="flex-1">
                  <Send className="mr-2 h-4 w-4" />
                  Publish
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Placeholder for more assets */}
        <Card className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 bg-slate-50/50 p-12 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-300 shadow-sm ring-1 ring-slate-200">
            <Plus className="h-6 w-6" />
          </div>
          <p className="text-sm font-bold text-slate-400">Generate More</p>
          <p className="text-xs text-slate-300">Create more assets based on this audit.</p>
          <Button variant="outline" size="sm" className="mt-4">
            New Creative Task
          </Button>
        </Card>
      </div>
    </div>
  );
}

function Plus({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}
