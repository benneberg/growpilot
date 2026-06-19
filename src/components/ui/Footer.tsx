import * as React from "react";
import { Container } from "./Layout";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white py-12">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-emerald-600 text-white">
              <span className="text-xs font-bold">GP</span>
            </div>
            <span className="text-sm font-semibold text-slate-900">
              GrowPilot by ClarityScope
            </span>
          </div>
          
          <div className="flex items-center gap-8 text-sm text-slate-500">
            <a href="#" className="hover:text-emerald-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Documentation</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Support</a>
          </div>
          
          <div className="text-sm text-slate-400">
            © {new Date().getFullYear()} ClarityScope. All rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
}
