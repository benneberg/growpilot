# GrowPilot — Growth Intelligence Platform

GrowPilot is an AI-powered full-stack growth intelligence and repository audit platform. It analyzes websites, GitHub repositories, and technical documentation to surface evidence-backed SEO, marketing, and technical recommendations, alongside customized role-specific action plans, initial creative asset variations, and exportable reports.

---

## 🚀 Overview

GrowPilot behaves like an on-demand consulting team consisting of a Staff Engineer, SRE, Security Analyst, SEO Specialist, Marketer, and Product Manager. It turns product ecosystem URLs into granular, prioritized growth checklists in under a minute.

---

## ✨ Verified Features

- **Multi-Scope Scans**: Scans websites, public GitHub repositories, and developer documentation.
- **Role-Specific Action Plans**: Dynamically groups technical and marketing recommendations by likely owners (Engineering, SEO Specialist, Marketing & Growth, Product Manager, Content Strategist, UX/UI Designer) with tailored implementation checklists.
- **Dynamic Creative Variations Lab**: Generates custom variants of ad copy, social posts, and landing page headlines using live audit insights.
- **Multi-Format Exports**: Instantly compiles and downloads reports as **PDFs (via PDFKit)**, **Markdown files**, or **JSON data**.
- **Interactive Onboarding Modal**: Provides step-by-step introduction to the GrowPilot ecosystem.
- **Analytics Dashboards**: Beautiful charts tracking overall score metrics over time.

---

## 🏗️ Architecture Summary

GrowPilot is engineered with a modular, secure full-stack architecture:
- **Frontend**: Single Page Application built on **React 19**, **Vite 6**, and **Tailwind CSS**. State management is handled with **Zustand**. Fluid UI transitions are driven by **Framer Motion**.
- **Backend**: **Express (Node.js)** server. It acts as a static server in production and hosts endpoints for dynamic PDF compiling and secure **Google Gemini 1.5 Pro API** proxying (via `@google/genai` SDK), keeping secrets out of the browser.

---

## 🛠️ Installation

Ensure you have [Node.js (v18+)](https://nodejs.org/) installed, then run:

```bash
# Clone or locate the project directory
cd react-example

# Install core dependencies
npm install
```

---

## ⚙️ Configuration

Create a `.env` file in the root directory (using `.env.example` as a template):

```env
# Server-side secrets (never exposed to browser)
GEMINI_API_KEY=your_google_gemini_api_key_here
```

---

## 💻 Usage

### Start Development Server
This boots the full-stack server (React frontend + Express API) on port `3000`:
```bash
npm run dev
```
Open your browser to `http://localhost:3000` to interact with GrowPilot.

### Run Code Linter & Typechecks
```bash
npm run lint
```

---

## 🧪 Testing

GrowPilot is configured for Vitest and React Testing Library. To execute tests (once bootstrapped as per `TESTING_DELTA.md`):

```bash
# Run unit and integration tests
npm run test
```

---

## 📦 Build

To build the static React assets into the `/dist` directory for production deployment:

```bash
npm run build
```

---

## 🚢 Deployment

The Express backend compiles and serves production assets out of the `/dist` folder. 

To deploy to hosting systems (such as Cloud Run or Docker containers):
1. Configure your environment variable `GEMINI_API_KEY` on your cloud provider.
2. Ensure the container binds to host `0.0.0.0` and port `3000` (handled automatically by `server.ts`).
3. Start the server using:
   ```bash
   node server.ts
   ```
