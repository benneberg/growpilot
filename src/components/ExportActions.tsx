import * as React from "react";
import { Download, FileText, FileJson, Share2, Mail, ExternalLink, Printer } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card";
import { Button } from "./ui/Button";
import { useToast } from "./ui/Toast";

export function ExportActions() {
  const { addToast } = useToast();

  const handleExport = (format: string) => {
    addToast(`Exporting report as ${format.toUpperCase()}...`, "info");
    setTimeout(() => {
      addToast(`Report exported successfully!`, "success");
    }, 2000);
  };

  return (
    <div className="mx-auto max-w-4xl py-12">
      <div className="mb-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-xl shadow-slate-200">
          <Download className="h-8 w-8" />
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900">
          Export & Share
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-500">
          Download your growth audit in various formats or share it directly with your team and stakeholders.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover:border-emerald-200 transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-emerald-600" />
              PDF Report
            </CardTitle>
            <CardDescription>Full visual report with charts and insights.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline" onClick={() => handleExport("pdf")}>
              Download PDF
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:border-blue-200 transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileJson className="h-5 w-5 text-blue-600" />
              JSON Data
            </CardTitle>
            <CardDescription>Raw audit data for custom integrations.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline" onClick={() => handleExport("json")}>
              Download JSON
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:border-amber-200 transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-amber-600" />
              Share Link
            </CardTitle>
            <CardDescription>Generate a secure link to share this report.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline" onClick={() => addToast("Share link copied to clipboard!", "success")}>
              Copy Share Link
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:border-purple-200 transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-purple-600" />
              Email Report
            </CardTitle>
            <CardDescription>Send the report directly to your inbox.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline" onClick={() => addToast("Report sent to your email!", "success")}>
              Send via Email
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
