# ARCHITECTURE

## HIGH-LEVEL ARCHITECTURE
GrowPilot is a modern full-stack web application designed with a single-page frontend and a lightweight companion backend proxy.
- **Frontend**: Single Page Application built on React 19, Vite 6, and styled with Tailwind CSS. Interactivity and layout transitions are powered by Framer Motion.
- **Backend**: Express (Node.js) server. It performs two roles: serves compiled frontend static files in production, and acts as a secure, authenticated proxy for downstream Gemini API requests and PDF rendering tasks.
- **Confidence**: High (Observed in `package.json`, `server.ts`, and `src/main.tsx`).

---

## COMPONENT BREAKDOWN

```text
+--------------------------------------------------------------+
|                          REACT CLIENT                        |
|                                                              |
|   +-------------------+  +--------------------------------+  |
|   |    Onboarding     |  |         Dashboard View         |  |
|   +-------------------+  +--------------------------------+  |
|                                                              |
|   +-------------------+  +--------------------------------+  |
|   |   Audit Launcher  |  |    Role-Specific action plans  |  |
|   +-------------------+  +--------------------------------+  |
|                                                              |
|   +-------------------+  +--------------------------------+  |
|   |   Creative View   |  |        Zustand Storage         |  |
|   +-------------------+  +--------------------------------+  |
+------------------------------+-------------------------------+
                               |
                   HTTPS       |  API Routes
                               v
+--------------------------------------------------------------+
|                        EXPRESS BACKEND                       |
|                                                              |
|   +-------------------+  +--------------------------------+  |
|   |  Vite Middleware  |  |   Secure Gemini Client Proxy   |  |
|   +-------------------+  +--------------------------------+  |
|                                                              |
|   +-------------------+  +--------------------------------+  |
|   |  PDFKit Compiler  |  |      Asset Static Serving      |  |
|   +-------------------+  +--------------------------------+  |
+--------------------------------------------------------------+
```

### 1. `Onboarding.tsx`
Guides new users through value propositions, modes, confidence index scores, and usage strategies.

### 2. `AuditLauncher.tsx`
Collects audit scopes (URLs, keywords, mode parameters) and starts the audit trigger sequences.

### 3. `RemediationView.tsx`
Interactive growth matrix displaying customized, role-oriented fixes (Engineering, SEO, Marketing, Product, Design, Content) along with copyable source code.

### 4. `CreativeView.tsx`
Marketing variance lab compiling ad/social/landing copy assets with direct additions using Gemini model loops.

---

## DATA FLOW

### Source of Truth
- **Transient Memory**: The central source of truth for the active audit list and active audit state is the client-side Zustand store `useAuditStore`.
- **Database**: **None**.

### State Management Flow
1. User provides targets in `AuditLauncher`.
2. Launcher invokes backend API routes.
3. Server executes structured outputs querying through Gemini.
4. Server returns structured JSON payload to React.
5. Zustand store saves the new record and transitions layouts.

- **Confidence**: High (Directly verified by the structure in `useAuditStore.ts` and `gemini.ts`).

---

## EXTERNAL INTEGRATIONS
- **Google Gemini API**: Accessed securely on the server-side via the `@google/genai` Node.js SDK, utilizing the `gemini-1.5-pro` model with strict schema validation.
- **Confidence**: High (Directly supported by `/src/lib/gemini.ts`).

---

## DEPLOYMENT MODEL
- **Container Ingress**: The application compiles to static assets inside `/dist` using `vite build`.
- **Server Binding**: The Express server binds to host `0.0.0.0` and port `3000`, rendering it ready for Cloud Run, Docker-compose, or Kubernetes pods.
- **Confidence**: High (Verified in `server.ts` and `package.json` scripts).

---

## OBSERVABILITY MODEL
- **Terminal output**: Minimal stdout reporting on port initialization.
- **Telemetry**: No APM tracking, profiling, or error sinks are defined.
- **Confidence**: High.

---

## ARCHITECTURAL RISKS
1. **Volatile Local Storage**: All reports are in-memory. Clearing browser cache resets work.
2. **Synchronous Backend Blocks**: On-the-fly PDF creation and API fetching run on the main node thread. Under high concurrent traffic, this could block event loops.

---

## RECOMMENDED IMPROVEMENTS
1. **Firebase integration**: Add Firestore database synchronization to enable a durable, persistent historical timeline.
2. **Worker threads**: Move PDF compilation and long-running API fetches to background worker threads.
3. **Structured Logging**: Introduce `pino` to get JSON structured logs for security reviews.
