# TODO

## Phase 1 — Make It Work

- [x] **[server.ts]** Add standard `try/catch` block wrapping around the export handler endpoints to prevent crashes during PDF compilation or serialization failures.
  - **Priority**: P0
  - **Impact**: High
  - **Effort**: S
  - **Evidence**: `/server.ts` line 70 routes use stream piping directly to responses without error boundaries.
  - **Recommendation**: Wrap with `try { ... } catch (err) { res.status(500).send("Export failed"); }` block.
  - **Confidence**: High

- [x] **[server.ts]** Configure dedicated `/api/health` health-check endpoints for automated load balancers and containers.
  - **Priority**: P1
  - **Impact**: High
  - **Effort**: S
  - **Evidence**: There are no health endpoints configured in `/server.ts`.
  - **Recommendation**: Expose a quick `app.get("/api/health", (req, res) => res.json({ status: "ok" }))` endpoint.
  - **Confidence**: High

---

## Phase 2 — Make It Reliable

- [x] **[package.json / src/test]** Bootstrap Vitest, React Testing Library, and setup standard test environment configurations.
  - **Priority**: P1
  - **Impact**: High
  - **Effort**: M
  - **Evidence**: No testing dependencies, test runner scripts, or test folders are defined.
  - **Recommendation**: Add `"test": "vitest"` scripts and import testing tools.
  - **Confidence**: High

- [x] **[src/store/useAuditStore.ts]** Connect Zustand with local storage persistence to avoid state clearance upon user reload.
  - **Priority**: P1
  - **Impact**: High
  - **Effort**: S
  - **Evidence**: Refreshing the browser resets the `audits` array to empty in `useAuditStore`.
  - **Recommendation**: Wrap Zustand creator in the `persist` middleware.
  - **Confidence**: High

---

## Phase 3 — Make It Production Ready

- [x] **[server.ts]** Implement an API caching layer on the server-side to cache identical URL audit reports for up to 24 hours.
  - **Priority**: P2
  - **Impact**: Medium
  - **Effort**: M
  - **Evidence**: Repeated runs on identical URLs trigger consecutive Gemini 1.5 Pro API calls.
  - **Recommendation**: Implement `node-cache` or a similar lightweight in-memory cache mapped to source URLs.
  - **Confidence**: High

- [x] **[server.ts / src/components]** Build a session/auth gate middleware (e.g., Firebase Authentication) to secure private audits and exports.
  - **Priority**: P2
  - **Impact**: High
  - **Effort**: L
  - **Evidence**: No auth, sessions, or rate-limiting layers exist currently.
  - **Recommendation**: Setup Firebase Auth and intercept routes with verification tokens.
  - **Confidence**: High

---

## Phase 4 — Future Enhancements

- [x] **[src/components/RemediationView.tsx]** Add code execution/sandbox playgrounds directly inside the recommendation details where users can preview react or html renders.
  - **Priority**: P3
  - **Impact**: Medium
  - **Effort**: L
  - **Evidence**: Code snippets are copy-only; there is no sandbox interactive playground.
  - **Recommendation**: Connect standard lightweight code runners or stackblitz embeds.
  - **Confidence**: High
