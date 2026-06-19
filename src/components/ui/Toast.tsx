import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { create } from "zustand";
import { cn } from "../../lib/utils";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (message: string, type: ToastType) => void;
  removeToast: (id: string) => void;
}

export const useToast = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (message, type) => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 5000);
  },
  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));

export function Toaster() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={cn(
              "flex w-80 items-start gap-3 rounded-2xl p-4 shadow-lg ring-1 ring-black/5",
              toast.type === "success" && "bg-emerald-50 text-emerald-900",
              toast.type === "error" && "bg-red-50 text-red-900",
              toast.type === "info" && "bg-slate-50 text-slate-900"
            )}
          >
            <div className="mt-0.5">
              {toast.type === "success" && <CheckCircle2 className="h-5 w-5 text-emerald-600" />}
              {toast.type === "error" && <AlertCircle className="h-5 w-5 text-red-600" />}
              {toast.type === "info" && <Info className="h-5 w-5 text-slate-600" />}
            </div>
            <div className="flex-1 text-sm font-medium">{toast.message}</div>
            <button
              onClick={() => removeToast(toast.id)}
              className="rounded-lg p-1 hover:bg-black/5"
            >
              <X className="h-4 w-4 opacity-50" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
