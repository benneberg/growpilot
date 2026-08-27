# GrowPilot

> AI-powered growth intelligence platform for website audits, product understanding, and competitive benchmarking.

[![CI](https://img.shields.io/badge/CI-passing-success?style=flat-square&logo=githubactions)](.github/workflows/ci.yml)
[![Node.js](https://img.shields.io/badge/node-%3E%3D20.0.0-blue?style=flat-square&logo=nodedotjs)](package.json)
[![TypeScript](https://img.shields.io/badge/typescript-%5E5.8.2-blue?style=flat-square&logo=typescript)](tsconfig.json)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

GrowPilot acts as an on-demand growth and technical advisory squad — analyzing websites, GitHub repositories, and developer documentation to generate prioritized, role-specific action plans, interactive code sandboxes, and exportable reports in seconds.

---

## Features

- **Multi-Scope Intelligence Scans:** Audits websites, GitHub repositories, and documentation pages with structured Gemini AI analysis.
- **Role-Specific Action Plans:** Automatically categorizes recommendations by owner (Engineering, SEO Specialist, Marketing, Product, Content, and UX/UI Design) with tailored implementation checklists.
- **Interactive Code Playgrounds:** In-app sandbox allowing developers to tweak HTML/Tailwind fixes live and preview changes in a sandboxed iframe.
- **Dynamic Creative Variations Lab:** Generates targeted ad copy, social posts, and landing page variations grounded in live audit insights.
- **Multi-Format Report Exports:** Compiles and streams client reports as PDF documents, Markdown files, or JSON payloads.
- **Durable Persistence & Realtime Sync:** Cloud Firestore synchronization paired with client-side state caching.

---

## Installation

Ensure you have [Node.js (v20+ LTS recommended)](https://nodejs.org/) installed:

```bash
# Clone the repository
git clone https://github.com/your-username/growpilot.git
cd growpilot

# Install dependencies
npm install
```

---

## Quick Start

1. Configure your environment variables:
   ```bash
   cp .env.example .env
   ```
   Add your Google Gemini API key to `.env`:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

2. Start the fullstack development server:
   ```bash
   npm run dev
   ```

3. Open `http://localhost:3000` in your browser. Enter any target URL or repository in the Audit Launcher and start a scan.

---

## Usage

### Running Audits
- Enter a valid target URL (e.g. `https://example.com` or `https://github.com/org/repo`).
- Select your audit mode (Standard, Technical Deep-Dive, or Competitor Benchmark).
- Review prioritized findings, severity matrices, evidence snippets, and customized role action plans.

### Interactive Code Remediation
- Navigate to the **Remediation Plan** tab.
- Click into any Engineering or Design finding to open the interactive **Code Playground**.
- Edit the markup in real-time and switch to **Live Preview** to verify the fix before copying.

### Exporting Reports
- Click **Export** in the top action bar to stream a formatted **PDF Report**, download **Markdown**, or copy the raw **JSON** payload.

---

## Development

GrowPilot uses standard npm scripts for all common workflows:

```bash
# Start local development server (with tsx and Vite middleware)
npm run dev

# Run TypeScript typechecks & linter
npm run lint

# Run unit and integration test suite with Vitest
npm run test

# Run tests in watch mode
npm run test:watch

# Compile production client build and server bundle
npm run build

# Start the compiled production server
npm run start
```

---

## Configuration

GrowPilot uses environment variables for server-side operations. Copy `.env.example` to `.env` to customize:

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | **Yes** | Google Gemini API key for server-side AI analysis via `@google/genai`. |
| `APP_URL` | Optional | Host URL used for self-referential links, OAuth callbacks, and deployments. |

> **Security Note:** Secrets like `GEMINI_API_KEY` are only accessed server-side in `server.ts` and are never exposed to the client bundle.

---

## Architecture

```text
+--------------------------------------------------------------+
|                          REACT CLIENT                        |
|                                                              |
|   +-------------------+  +--------------------------------+  |
|   |    Onboarding     |  |         Dashboard View         |  |
|   +-------------------+  +--------------------------------+  |
|   |   Audit Launcher  |  |    Role-Specific action plans  |  |
|   +-------------------+  +--------------------------------+  |
|   |   Creative Lab    |  |     Interactive Sandbox        |  |
|   +-------------------+  +--------------------------------+  |
|   |   Firebase Auth   |  |     Zustand Cloud Sync Store   |  |
|   +-------------------+  +--------------------------------+  |
+------------------------------+-------------------------------+
                               |
                    HTTPS / WS |  API Routes & Static Assets
                               v
+--------------------------------------------------------------+
|                        EXPRESS BACKEND                       |
|                                                              |
|   +-------------------+  +--------------------------------+  |
|   |  Vite Middleware  |  |   Secure Gemini Client Proxy   |  |
|   +-------------------+  +--------------------------------+  |
|   |  PDFKit Compiler  |  |    Node-Cache Server Layer     |  |
|   +-------------------+  +--------------------------------+  |
+--------------------------------------------------------------+
```

- **Frontend:** React 19 SPA bundled with Vite 6 and Tailwind CSS v4. State is managed via Zustand with Firestore synchronization.
- **Backend:** Express server executing on Node.js. It proxies Gemini API requests securely, provides in-memory 24h request caching (`node-cache`), and compiles dynamic PDF reports (`pdfkit`).
- **Database / Auth:** Firebase Firestore for persistent audit history and Firebase Auth for secure user session management.

For full architectural details, see [ARCHITECTURE.md](ARCHITECTURE.md).

---

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on code style, testing guidelines, and the pull request process.

---

## Security

Please report security issues responsibly by following our [SECURITY.md](SECURITY.md) policy.

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
