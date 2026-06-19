import { create } from 'zustand';
import { AuditRecord, AuditInput, AuditMode } from '../types';

interface AuditState {
  audits: AuditRecord[];
  currentAuditId: string | null;
  isLaunching: boolean;
  setAudits: (audits: AuditRecord[]) => void;
  addAudit: (audit: AuditRecord) => void;
  updateAudit: (id: string, updates: Partial<AuditRecord>) => void;
  setCurrentAudit: (id: string | null) => void;
  setLaunching: (isLaunching: boolean) => void;
}

export const useAuditStore = create<AuditState>((set) => ({
  audits: [],
  currentAuditId: null,
  isLaunching: false,
  setAudits: (audits) => set({ audits }),
  addAudit: (audit) => set((state) => ({ audits: [audit, ...state.audits] })),
  updateAudit: (id, updates) =>
    set((state) => ({
      audits: state.audits.map((a) => (a.id === id ? { ...a, ...updates } : a)),
    })),
  setCurrentAudit: (id) => set({ currentAuditId: id }),
  setLaunching: (isLaunching) => set({ isLaunching }),
}));
