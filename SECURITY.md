# Security Policy

## Supported Versions

Security updates and bug fixes are actively supported for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

---

## Reporting a Vulnerability

We take the security of GrowPilot seriously. If you discover a security vulnerability, please follow these guidelines:

1. **Do not create a public issue.**
2. Send a detailed report describing the vulnerability, reproduction steps, and potential impact to the project maintainers.
3. Maintain confidentiality until a patch has been developed, tested, and released.

---

## Security Practices in GrowPilot

- **API Secrets**: All secret keys (such as `GEMINI_API_KEY`) are kept strictly server-side inside the Express backend proxy and are never transmitted to or embedded in the client browser bundle.
- **Database Rules**: Firestore access is enforced via strict, role-aware, ownership-checked `firestore.rules`.
- **Minimal Permissions**: Automated CI workflows are strictly configured with least-privilege `contents: read` permissions.
