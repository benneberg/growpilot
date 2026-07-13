# ARCHITECTURE

## HIGH-LEVEL ARCHITECTURE
GrowPilot is a modern full-stack web application designed with a single-page frontend and a lightweight companion backend proxy, integrated with robust server-side caching and a cloud database.
- **Frontend**: Single Page Application built on React 19, Vite 6, and styled with Tailwind CSS. Interactivity and layout transitions are powered by Framer Motion.
- **Backend**: Express (Node.js) server. It serves compiled frontend static files in production, acts as a secure proxy for Gemini API requests and PDF rendering, and implements a server-side cache for identical requests.
- **Database / Auth**: Firebase Firestore provides a real-time, durable cloud persistence layer. Firebase Authentication handles secure user sessions and guards individual user records.

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
|   |   Creative Lab    |  |     Interactive Sandbox        |  |
|   +-------------------+  +--------------------------------+  |
|                                                              |
|   +-------------------+  +--------------------------------+  |
|   |   Firebase Auth   |  |     Zustand Cloud Sync Store   |  |
|   +-------------------+  +--------------------------------+  |
+------------------------------+-------------------------------+
                               |
                    HTTPS      |  API Routes / Firestore Sync
                               v
+--------------------------------------------------------------+
|                        EXPRESS BACKEND                       |
|                                                              |
|   +-------------------+  +--------------------------------+  |
|   |  Vite Middleware  |  |   Secure Gemini Client Proxy   |  |
|   +-------------------+  +--------------------------------+  |
|                                                              |
|   +-------------------+  +--------------------------------+  |
|   |  PDFKit Compiler  |  |    Node-Cache Server Layer     |  |
|   +-------------------+  +--------------------------------+  |
+------------------------------+-------------------------------+
                               |
                               v
+--------------------------------------------------------------+
|                      FIREBASE BACKEND                        |
|                                                              |
|   +-------------------+  +--------------------------------+  |
|   |   Firestore DB    |  |     Firebase Authentication    |  |
|   +-------------------+  +--------------------------------+  |
+--------------------------------------------------------------+
```

### 1. `Onboarding.tsx`
Guides new users through value propositions, modes, confidence index scores, and usage strategies.

### 2. `AuditLauncher.tsx`
Collects audit scopes (URLs, keywords, mode parameters) and starts the audit trigger sequences.

### 3. `RemediationView.tsx`
Interactive growth matrix displaying customized, role-oriented fixes (Engineering, SEO, Marketing, Product, Design, Content) along with copyable source code.

### 4. `CodePlayground` (Sandbox)
Embedded interactive code playground inside `RemediationView.tsx` where developers can tweak HTML/Tailwind fixes in a live editable text area and run code inside a sandboxed iframe with instant visual rendering.

### 5. `CreativeView.tsx` (Creative Lab)
Marketing variance lab compiling ad/social/landing copy assets with direct additions using Gemini model loops.

---

## DATA FLOW

### Source of Truth
- **Durable Cloud Persistence**: Firebase Firestore (`audits` collection) is the primary remote source of truth for user-generated audit records. Each audit is tied to a user ID.
- **Client Sync**: Zustand store `useAuditStore` manages transient local state with persistent `localStorage` fallback, syncing with Firestore records via real-time snapshot listeners whenever a user is authenticated.

### State Management Flow
1. User logs in (via Google or Anonymous Auth) or accesses as a guest.
2. User triggers a new website audit in `AuditLauncher`.
3. The launcher posts to `/api/v1/generate-audit`.
4. The server checks the `NodeCache` layer for identical URL + mode queries. If a hit is found, it serves it instantly. If not, it requests a structured audit report from Gemini.
5. The frontend adds the active audit to Zustand and automatically persists the record to Firestore if the user is authenticated.
6. The user can view, export, edit, and preview recommendations in real-time.

---

## SECURITY & COMPLIANCE
- **Google Gemini API**: Accessed securely on the server-side via the `@google/genai` Node.js SDK, keeping secrets out of the browser.
- **Firestore Security Rules**: Fully hardened rules in `firestore.rules` enforcing strict tiered-identity checks (only authenticated owners can read or write their own documents) and input schema validations.
- **Structured Error Tracing**: Employs detailed custom error builders (`handleFirestoreError`) to diagnose database permissions and state issues reliably.

---

## TESTING
- **Vitest & React Testing Library**: Built-in test suite covering Zustand state mutations, local persistence, component rendering, and UI states.
- **Run Tests**: `npm run test` or `npm run test:ui`.
