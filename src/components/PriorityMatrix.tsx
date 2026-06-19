import * as React from "react";
import { Zap, Target, ArrowUpRight, ShieldCheck, Clock, User } from "lucide-react";
import { Recommendation } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { cn } from "../lib/utils";

export function PriorityMatrix({ recommendations }: { recommendations: Recommendation[] }) {
  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "high": return <Zap className="h-4 w-4 text-amber-500" />;
      case "medium": return <Target className="h-4 w-4 text-emerald-500" />;
      case "low": return <ArrowUpRight className="h-4 w-4 text-slate-400" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">Priority Matrix</h2>
        <div className="flex gap-2">
          <Badge variant="outline" className="cursor-pointer hover:bg-slate-50">High Impact</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-slate-50">Low Effort</Badge>
        </div>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => (
          <Card key={rec.id} className="group overflow-hidden border-2 border-transparent hover:border-slate-200 transition-all">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="flex flex-col items-center justify-center border-b border-slate-100 bg-slate-50 p-5 md:w-32 md:border-b-0 md:border-r">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
                    {getImpactIcon(rec.expectedImpact)}
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Impact</p>
                  <p className="text-xs font-bold text-slate-900">{rec.expectedImpact}</p>
                </div>
                
                <div className="flex-1 p-5">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">{rec.category}</Badge>
                    <Badge variant="outline" className="flex items-center gap-1 text-[10px] uppercase tracking-wider">
                      <Clock className="h-3 w-3" />
                      {rec.effort} Effort
                    </Badge>
                    {rec.owner && (
                      <Badge variant="outline" className="flex items-center gap-1 text-[10px] uppercase tracking-wider">
                        <User className="h-3 w-3" />
                        {rec.owner}
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="mb-1 text-base font-bold text-slate-900">{rec.title}</h3>
                  <p className="line-clamp-2 text-xs text-slate-500">{rec.rationale}</p>
                </div>

                <div className="flex items-center justify-center bg-slate-50 p-5 md:w-20">
                  <Button variant="ghost" size="icon" className="h-10 w-10 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    <ArrowUpRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
