import * as React from "react";
import { cn } from "../../lib/utils";

export interface SwitchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
        <input
          type="checkbox"
          className={cn(
            "peer absolute h-full w-full cursor-pointer opacity-0",
            className
          )}
          ref={ref}
          {...props}
        />
        <div className="h-6 w-11 rounded-full bg-slate-200 transition-colors peer-checked:bg-emerald-600" />
        <div className="absolute left-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-5" />
      </div>
    );
  }
);
Switch.displayName = "Switch";

export { Switch };
