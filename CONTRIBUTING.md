# Contributing to GrowPilot

Thank you for your interest in contributing to GrowPilot! We welcome pull requests, bug reports, and feature proposals.

---

## 🛠️ Development Setup

### Prerequisites
- [Node.js (v20 or v22 LTS)](https://nodejs.org/)
- `npm` (v10+)

### Setup Instructions
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/growpilot.git
   cd growpilot
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy the example environment configuration:
   ```bash
   cp .env.example .env
   ```
   Provide your `GEMINI_API_KEY` in `.env`.

4. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Navigate to `http://localhost:3000`.

---

## 🧪 Testing and Verification

Before submitting changes, ensure all quality checks pass:

```bash
# Typecheck / Lint
npm run lint

# Run the test suite
npm run test

# Validate production build
npm run build
```

---

## 📋 Pull Request Guidelines

1. Create a feature branch with a descriptive name (`feature/my-feature` or `fix/issue-description`).
2. Make granular, logically focused commits.
3. Add unit or integration tests for new features and bug fixes.
4. Ensure CI checks pass cleanly.
5. Provide a clear description in your Pull Request explaining the problem, changes made, and verification steps.

---

## 📜 Code of Conduct

Contributors are expected to adhere to respectful, collaborative, and constructive community standards.
