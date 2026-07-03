# TESTING_DELTA

## Existing Test Strategy
The repository currently lacks automated unit, integration, and E2E test suites. The only verification mechanism is the compiler check `tsc --noEmit` which runs during the linting phase.

## Coverage Gaps
- **Store state management**: The Zustand store `useAuditStore.ts` does not have unit tests checking audits loading, adding, and updating.
- **UI Views & Interactivity**: The core interactive panels like `RemediationView` (role action plans switcher) and `CreativeView` (variation generator) have zero component testing.
- **Backend Endpoints**: The PDF, Markdown, and JSON export streams in `server.ts` lack integration tests to verify header types and stream termination.

---

## Recommended Framework
**Vitest** (for ultra-fast unit testing running natively on Vite) paired with **React Testing Library** (for UI component testing) and **Supertest** (for Express backend API integration tests).

### Directory Structure
```text
/
├── src/
│   ├── test/
│   │   └── setup.ts                # Test setup and mock definitions
│   └── components/
│       └── __tests__/
│           ├── RemediationView.test.tsx  # Interactive role actions test
│           └── Dashboard.test.tsx        # Growth Dashboard stats test
└── server.test.ts                  # Express export endpoints test
```

---

## Bootstrap Test File

Here is the recommended configuration file to bootstrap testing:

### `src/test/setup.ts`
```typescript
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Automatically clean up React DOM after each test
afterEach(() => {
  cleanup();
});

// Mock clipboard API
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: vi.fn().mockImplementation(() => Promise.resolve()),
  },
  configurable: true,
});

// Mock window matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
```

---

## Three High-Value Test Cases

### 1. `useAuditStore.ts` - State Updates
Verifies that adding and updating audits behaves correctly in our store, preserving chronological ordering and correct states.
```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { useAuditStore } from '../store/useAuditStore';
import { AuditRecord } from '../types';

describe('useAuditStore', () => {
  beforeEach(() => {
    useAuditStore.getState().setAudits([]);
  });

  it('should successfully add a new audit record', () => {
    const mockAudit: AuditRecord = {
      id: 'aud_test',
      status: 'completed',
      createdAt: new Date().toISOString(),
      input: { mode: 'quick_website', websiteUrl: 'https://test.com' },
      report: {
        auditId: 'aud_test',
        summary: 'Test summary',
        scores: { seo: 90, technical: 80, contentClarity: 70, docsQuality: 60, githubMaturity: 50, conversionReadiness: 40, alignment: 30, confidence: 1 },
        insights: [],
        recommendations: [],
        evidenceIndex: [],
        coverage: { sourceCount: 1, sourceTypes: ['web'], missingCriticalSources: [] }
      }
    };

    useAuditStore.getState().addAudit(mockAudit);
    expect(useAuditStore.getState().audits).toHaveLength(1);
    expect(useAuditStore.getState().audits[0].id).toBe('aud_test');
  });
});
```

### 2. `RemediationView.tsx` - Role Switcher and Filters
Verifies that selecting different role tabs correctly filters the action plan checklist to match the target roles.
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { RemediationView } from '../RemediationView';
import { Recommendation } from '../../types';

const mockRecommendations: Recommendation[] = [
  {
    id: 'rec_eng',
    title: 'Minify JavaScript Bundles',
    category: 'technical',
    rationale: 'Reduce TTI',
    steps: ['Run build analyzer', 'Configure chunk split'],
    expectedImpact: 'High',
    effort: 'medium',
    owner: 'engineering',
    relatedInsightIds: []
  },
  {
    id: 'rec_seo',
    title: 'Implement Alt Attributes',
    category: 'seo',
    rationale: 'Improve image ranking',
    steps: ['Add descriptive alt fields to assets'],
    expectedImpact: 'Medium',
    effort: 'low',
    owner: 'seo',
    relatedInsightIds: []
  }
];

describe('RemediationView Role Filters', () => {
  it('renders engineering plan items by default', () => {
    render(<RemediationView recommendations={mockRecommendations} />);
    expect(screen.getByText('Minify JavaScript Bundles')).toBeInTheDocument();
    expect(screen.queryByText('Implement Alt Attributes')).not.toBeInTheDocument();
  });

  it('switches views and renders SEO items when SEO tab is clicked', () => {
    render(<RemediationView recommendations={mockRecommendations} />);
    const seoButton = screen.getByRole('button', { name: /SEO Specialist/i });
    fireEvent.click(seoButton);
    expect(screen.getByText('Implement Alt Attributes')).toBeInTheDocument();
    expect(screen.queryByText('Minify JavaScript Bundles')).not.toBeInTheDocument();
  });
});
```

### 3. `server.ts` - Export Formats Endpoint Integration
Verifies that the backend export route correctly branches format handling and serves the matching MIME types.
```typescript
import request from 'supertest';
import { describe, it, expect } from 'vitest';
import express from 'express';

// Supertest mock server runner
describe('GET /api/v1/audits/:auditId/export', () => {
  it('should return PDF binary file for pdf format request', async () => {
    const res = await request('http://localhost:3000')
      .get('/api/v1/audits/aud_123/export')
      .query({ format: 'pdf' });
    
    expect(res.status).toBe(200);
    expect(res.header['content-type']).toBe('application/pdf');
    expect(res.header['content-disposition']).toContain('attachment');
  });

  it('should return Markdown documentation for markdown format request', async () => {
    const res = await request('http://localhost:3000')
      .get('/api/v1/audits/aud_123/export')
      .query({ format: 'markdown' });
    
    expect(res.status).toBe(200);
    expect(res.header['content-type']).toContain('text/markdown');
  });
});
```
