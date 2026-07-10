import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAuditStore } from './useAuditStore';
import { AuditRecord } from '../types';

vi.mock('../lib/firebase', () => ({
  db: {},
  auth: { currentUser: null }
}));

vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  setDoc: vi.fn()
}));

describe('useAuditStore', () => {
  beforeEach(() => {
    useAuditStore.setState({ audits: [], currentAuditId: null, isLaunching: false });
  });

  it('should initialize with empty state', () => {
    const state = useAuditStore.getState();
    expect(state.audits).toEqual([]);
    expect(state.currentAuditId).toBeNull();
    expect(state.isLaunching).toBe(false);
  });

  it('should add an audit', () => {
    const mockAudit = { id: '1', workspaceId: 'ws1', status: 'completed', mode: 'comprehensive', input: {}, createdAt: '', updatedAt: '' } as unknown as AuditRecord;
    useAuditStore.getState().addAudit(mockAudit);
    
    const state = useAuditStore.getState();
    expect(state.audits.length).toBe(1);
    expect(state.audits[0].id).toBe('1');
  });

  it('should update an audit', () => {
    const mockAudit = { id: '1', workspaceId: 'ws1', status: 'running', mode: 'comprehensive', input: {}, createdAt: '', updatedAt: '' } as unknown as AuditRecord;
    useAuditStore.getState().addAudit(mockAudit);
    
    useAuditStore.getState().updateAudit('1', { status: 'completed' });
    
    const state = useAuditStore.getState();
    expect(state.audits[0].status).toBe('completed');
  });

  it('should set current audit', () => {
    useAuditStore.getState().setCurrentAudit('123');
    expect(useAuditStore.getState().currentAuditId).toBe('123');
  });
});
