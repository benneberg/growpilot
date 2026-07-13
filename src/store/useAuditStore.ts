import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuditRecord, AuditInput, AuditMode } from '../types';
import { db, auth } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firebaseErrors';

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

export const useAuditStore = create<AuditState>()(
  persist(
    (set, get) => ({
      audits: [],
      currentAuditId: null,
      isLaunching: false,
      setAudits: (audits) => set({ audits }),
      addAudit: async (audit) => {
        const currentUser = auth.currentUser;
        const auditWithUser = currentUser ? { ...audit, userId: currentUser.uid } : audit;
        
        set((state) => ({ audits: [auditWithUser, ...state.audits] }));
        
        if (currentUser) {
          const path = `audits/${auditWithUser.id}`;
          try {
            await setDoc(doc(db, 'audits', auditWithUser.id), auditWithUser);
          } catch (e) {
            handleFirestoreError(e, OperationType.WRITE, path);
          }
        }
      },
      updateAudit: async (id, updates) => {
        set((state) => ({
          audits: state.audits.map((a) => (a.id === id ? { ...a, ...updates } : a)),
        }));
        
        const currentUser = auth.currentUser;
        if (currentUser) {
          const updatedAudit = get().audits.find(a => a.id === id);
          if (updatedAudit) {
            const path = `audits/${id}`;
            try {
              await setDoc(doc(db, 'audits', id), updatedAudit, { merge: true });
            } catch (e) {
              handleFirestoreError(e, OperationType.WRITE, path);
            }
          }
        }
      },
      setCurrentAudit: (id) => set({ currentAuditId: id }),
      setLaunching: (isLaunching) => set({ isLaunching }),
    }),
    {
      name: 'audit-storage',
      partialize: (state) => ({ audits: state.audits }),
    }
  )
);
